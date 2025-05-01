import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { signup } from "../api/authService"; // Correct import

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

  // Signup handler for SignUp page
  const handleSignup = async (formData) => {
    try {
      const res = await signup(formData);
      return res; // Let the component handle toasts and navigation
    } catch (err) {
      console.error("Signup failed:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleLogout, handleSignup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
