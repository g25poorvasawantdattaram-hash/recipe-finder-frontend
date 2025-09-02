import React, { createContext, useContext, useState } from "react";
import api, { setAuthToken } from './api';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function register(username, email, password) {
    await api.post("/api/auth/register", { username, email, password });
    // auto-login after register
    await login(email, password);
  }

  async function login(email, password) {
    const { data } = await api.post("/api/auth/login", { email, password });
    setAuthToken(data.token);
    setUser(data.user);
  }

  function logout() {
    setUser(null);
    setAuthToken(null);
  }

  const value = { user, register, login, logout };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
