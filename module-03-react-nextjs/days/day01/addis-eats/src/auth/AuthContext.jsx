import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const STORAGE_KEY = "addis-eats-auth-user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to restore auth session:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (phone, name = "Customer") => {
    const userData = { phone, name, loggedInAt: new Date().toISOString() };
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;
}
