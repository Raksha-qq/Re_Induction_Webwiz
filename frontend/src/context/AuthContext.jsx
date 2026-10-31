import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); }
    catch { return null; }
  });
  const [application, setApplication] = useState(null);
  const [applicationLoading, setApplicationLoading] = useState(Boolean(localStorage.getItem("token")));
  const [applicationError, setApplicationError] = useState("");

  const refreshApplication = useCallback(async () => {
    if (!localStorage.getItem("token")) {
      setApplication(null);
      setApplicationLoading(false);
      return null;
    }
    setApplicationLoading(true);
    setApplicationError("");
    try {
      const response = await api.get("/applications/me");
      const current = response.data?.application ?? null;
      setApplication(current);
      return current;
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        setApplication(null);
      } else {
        setApplicationError(error.response?.data?.message || "Could not load application status.");
      }
      return null;
    } finally {
      setApplicationLoading(false);
    }
  }, []);

  const login = useCallback((newToken, newUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser || null);
    setApplication(null);
    setApplicationLoading(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setApplication(null);
    setApplicationError("");
    setApplicationLoading(false);
  }, []);

  useEffect(() => {
    if (token) refreshApplication();
    else {
      setApplication(null);
      setApplicationLoading(false);
    }
  }, [token, refreshApplication]);

  const value = useMemo(() => ({
    token, user, application, applicationLoading, applicationError,
    isAuthenticated: Boolean(token), login, logout, refreshApplication,
    setApplication,
  }), [token, user, application, applicationLoading, applicationError, login, logout, refreshApplication]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
