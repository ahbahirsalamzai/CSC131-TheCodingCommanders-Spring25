import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { signup, login } from "../api/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ ...decoded, token });
        console.log("AuthContext initialized with user:", decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  // 🔐 Signup handler
  const handleSignup = async (formData) => {
    try {
      const res = await signup(formData);
      return res; // Let the component handle toast & redirection
    } catch (err) {
      console.error("Signup failed:", err);
      throw err;
    }
  };

  // 🔓 Login handler
  const handleLogin = async (formData) => {
    try {
      const data = await login(formData);

      if (!data.token) throw new Error("Login failed: token missing.");

      localStorage.setItem("token", data.token);
      const decoded = jwtDecode(data.token);
      setUser({ ...decoded, token: data.token });

      return data;
    } catch (err) {
      console.error("Login error:", err.message);
      throw err;
    }
  };

  // 🚪 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout, handleSignup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
