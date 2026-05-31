import { createContext, useContext, useMemo, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("skillbiz_user") || "null"));

  const saveUser = (data) => {
    localStorage.setItem("skillbiz_user", JSON.stringify(data));
    setUser(data);
  };

  const login = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    saveUser(data);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    saveUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("skillbiz_user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, register, logout, setUser: saveUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
