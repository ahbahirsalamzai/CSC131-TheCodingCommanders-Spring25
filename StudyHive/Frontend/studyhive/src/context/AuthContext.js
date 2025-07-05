import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { signup } from "../api/authService"; //  import this

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ ...decoded, token }); // ✅ include token in user object
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
      const decoded = jwtDecode(userObject.token);
      setUser({ ...decoded, token: userObject.token }); // ✅ decoded and saved
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleSignup = async (formData) => {
    try {
      const res = await signup(formData);
      const decoded = jwtDecode(res.token);
      localStorage.setItem("token", res.token);
      setUser({ ...decoded, token: res.token }); // ✅ decoded and saved after signup
      return res; // Let the calling component handle the rest
    } catch (err) {
      console.error("Signup failed:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout, handleSignup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
