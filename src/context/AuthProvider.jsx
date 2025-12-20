// src/context/AuthProvider.jsx

import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

import {
  login as apiLogin,
  logout as apiLogout,
  registerUser as apiRegister,
} from "../services/auth";

import {
  getAccessToken,
  getAccessExpiresAt,
  setAccessToken,
  clearAccessToken,
  refreshAccessToken,
} from "../services/api";

export function AuthProvider({ children }) {
  const [access, setAccess] = useState(() => getAccessToken());
  const [expiresAt, setExpiresAt] = useState(() => getAccessExpiresAt());
  const [isAuthReady, setIsAuthReady] = useState(false);

  const isAuthenticated = !!access;

  const syncFromApi = useCallback(() => {
    setAccess(getAccessToken());
    setExpiresAt(getAccessExpiresAt());
  }, []);

  // локальный выход (без запроса)
  const localSignOut = useCallback(() => {
    clearAccessToken();
    syncFromApi();
    setIsAuthReady(true);
  }, [syncFromApi]);

  // ✅ Логин — тут должны появляться токены
  const signIn = useCallback(
    async ({ login, password }) => {
      await apiLogin({ login, password }); // access сохранится через apiFetch/saveAccessFromResponseHeaders
      syncFromApi();
      setIsAuthReady(true);
    },
    [apiLogin, syncFromApi]
  );

  // ✅ Регистрация — только создание пользователя, БЕЗ токенов
  const signUp = useCallback(
    async ({ name, surname, username, email, password }) => {
      await apiRegister({ name, surname, username, email, password });
      // токенов после /users нет — автологин делается отдельно через signIn()
    },
    [apiRegister]
  );

  const signOut = useCallback(async () => {
    try {
      await apiLogout();
    } finally {
      localSignOut();
    }
  }, [apiLogout, localSignOut]);

  // 🧩 Legacy: если где-то ещё приходит {access_token,...} напрямую
  const setTokens = useCallback(
    (tokens) => {
      if (tokens?.access_token) {
        setAccessToken(tokens.access_token, tokens.access_expires_at);
      }
      syncFromApi();
      setIsAuthReady(true);
    },
    [syncFromApi]
  );

  // silent refresh on start (по refresh cookie)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (getAccessToken()) {
          if (!cancelled) {
            syncFromApi();
            setIsAuthReady(true);
          }
          return;
        }

        const ok = await refreshAccessToken().catch(() => false);

        if (!cancelled) {
          if (ok) syncFromApi();
          setIsAuthReady(true);
        }
      } catch {
        if (!cancelled) setIsAuthReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [syncFromApi]);

  // auto refresh before expire
  useEffect(() => {
    if (!expiresAt) return;

    const EARLY_MS = 15_000;
    const msLeft = Math.max(0, expiresAt - Date.now() - EARLY_MS);

    const t = setTimeout(() => {
      refreshAccessToken()
        .then((ok) => (ok ? syncFromApi() : localSignOut()))
        .catch(() => localSignOut());
    }, msLeft);

    return () => clearTimeout(t);
  }, [expiresAt, syncFromApi, localSignOut]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isAuthReady,
      access_token: access,
      access_expires_at: expiresAt,

      signIn,
      signUp,
      signOut,

      setTokens,
      localSignOut,
    }),
    [
      isAuthenticated,
      isAuthReady,
      access,
      expiresAt,
      signIn,
      signUp,
      signOut,
      setTokens,
      localSignOut,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

