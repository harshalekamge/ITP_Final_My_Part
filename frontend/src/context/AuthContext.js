import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5001/auth/me", {
        withCredentials: true,
      });
      setUser(response.data.user || null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const login = async (email, password) => {
    const response = await axios.post(
      "http://localhost:5001/auth/login",
      { email, password },
      { withCredentials: true }
    );
    setUser(response.data.user);
    return response.data.user;
  };

  const logout = async () => {
    await axios.post("http://localhost:5001/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "admin",
      login,
      logout,
      refreshAuth,
    }),
    [loading, refreshAuth, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
