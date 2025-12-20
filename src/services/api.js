// src/services/api.js

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

// access token in memory
let ACCESS_TOKEN = null;
let ACCESS_EXPIRES_AT = null;

export function getAccessToken() {
  return ACCESS_TOKEN;
}
export function getAccessExpiresAt() {
  return ACCESS_EXPIRES_AT;
}
export function clearAccessToken() {
  ACCESS_TOKEN = null;
  ACCESS_EXPIRES_AT = null;
}
export function setAccessToken(token) {
  ACCESS_TOKEN = token || null;
  ACCESS_EXPIRES_AT = null;
}

const APP_ID = 1;

function getOrCreateDeviceId() {
  const key = "device_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    localStorage.setItem(key, id);
  }
  return id;
}

// читает access из Authorization: Bearer <token>
export function saveAccessFromResponseHeaders(headers) {
  const auth = headers?.get?.("Authorization") || headers?.get?.("authorization");
  if (!auth) return;

  const [scheme, token] = auth.split(" ");
  if (scheme && token && /^Bearer$/i.test(scheme)) {
    setAccessToken(token.trim());
  }
}

// универсальный fetch
export async function apiFetch(path, opts = {}) {
  const { method = "GET", body, headers = {}, withAuth = true } = opts;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE}${normalizedPath}`;

  const h = new Headers(headers);

  // обязательные заголовки для бэка
  h.set("X-App-Id", String(APP_ID));
  h.set("X-Device-Id", getOrCreateDeviceId());

  // JSON content-type если есть body
  if (body !== undefined) {
    if (!h.has("Content-Type")) h.set("Content-Type", "application/json");
  }

  // Authorization если нужно
  if (withAuth) {
    const token = getAccessToken();
    if (token) h.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url, {
    method,
    headers: h,
    body: body === undefined ? undefined : JSON.stringify(body),
    credentials: "include", // важно для refresh-cookie
  });

  const ct = res.headers.get("Content-Type") || "";
  let data = null;

  if (ct.includes("application/json")) {
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  } else {
    try {
      data = await res.text();
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    const err = new Error("API Error");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return { status: res.status, data, headers: res.headers };
}

// ===== single-flight refresh (чтобы не было 2 запросов) =====
let refreshInFlight = null;

export async function refreshAccessToken() {
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
    const res = await apiFetch("/auth/refresh", {
      method: "POST",
      withAuth: false,
    });

    // access из header
    saveAccessFromResponseHeaders(res.headers);

    // fallback: access в body
    if (!getAccessToken() && res?.data?.access_token) {
      setAccessToken(res.data.access_token);
    }

    const token = getAccessToken();
    if (!token) {
      const err = new Error("Refresh не вернул access_token");
      err.status = 500;
      throw err;
    }

    return token;
  })();

  try {
    return await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
}
