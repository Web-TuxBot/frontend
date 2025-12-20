// src/services/auth.js
import {
  apiFetch,
  saveAccessFromResponseHeaders,
  clearAccessToken,
  getAccessToken,
  getAccessExpiresAt,
  setAccessToken,
} from "./api";

function buildLoginPayload(login, password) {
  return {
    email_or_name: String(login ?? "").trim(),
    password: String(password ?? ""),
  };
}

export async function registerUser({ username, email, password }) {
  const payload = {
    username: String(username ?? "").trim(),
    email: String(email ?? "").trim(),
    password: String(password ?? ""),
  };

  const res = await apiFetch("/auth/register", {
    method: "POST",
    body: payload,
    withAuth: false,
  });

  return res.data;
}

export async function login({ login, password }) {
  const res = await apiFetch("/auth/login", {
    method: "POST",
    body: buildLoginPayload(login, password),
    withAuth: false,
  });

  // access из header
  saveAccessFromResponseHeaders(res.headers);

  // fallback: если вдруг access пока приходит в body
  if (!getAccessToken() && res?.data?.access_token) {
    setAccessToken(res.data.access_token);
  }

  const access = getAccessToken();
  if (!access) {
    const err = new Error("Сервер не вернул access_token после входа.");
    err.status = 500;
    throw err;
  }

  return {
    access_token: access,
    access_expires_at: getAccessExpiresAt(),
  };
}

export async function logout() {
  try {
    await apiFetch("/auth/logout", {
      method: "POST",
      withAuth: true, // <-- отправит Authorization автоматически
    });
  } finally {
    clearAccessToken();
  }
}
