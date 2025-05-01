import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { signup, login } from "../api/authService"; // <-- now importing login

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

  // 🔐 Performs full login using email/password and backend API
  const performLogin = async (credentials) => {
    try {
      const data = await login(credentials);
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

  // ✅ Sets user context directly from an already-decoded token (e.g., after signup or token restore)
  const handleLogin = (userObject) => {
    if (userObject && userObject.token) {
      localStorage.setItem("token", userObject.token);
      setUser(userObject);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleSignup = async (formData) => {
    try {
      const res = await signup(formData);
      return res;
    } catch (err) {
      console.error("Signup failed:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        performLogin,  // Use for login with email/password
        handleLogin,   // Use to store an already-decoded user
        handleLogout,
        handleSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
