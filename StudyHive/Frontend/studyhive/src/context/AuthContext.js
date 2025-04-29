import { createContext, useState, useContext, useEffect } from 'react';
import { signup, login } from '../api/authService';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // ✅ Check token in localStorage on page load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser({
          id: decoded.userId,
          role: decoded.role,
          email: decoded.email,
        });
        setToken(storedToken);
      } catch (err) {
        console.error("Invalid token in localStorage:", err.message);
        localStorage.removeItem('token'); // Remove if corrupted
      }
    }
  }, []);

  // 🔐 Signup handler
  const handleSignup = async (formData) => {
    try {
      const data = await signup(formData);

      if (!data.token) throw new Error("Signup failed: token missing.");

      localStorage.setItem('token', data.token); // ✅ Save first
      const decoded = jwtDecode(data.token);
      setUser({ id: decoded.userId, role: decoded.role, email: decoded.email });
      setToken(data.token);
    } catch (err) {
      console.error("Signup error:", err.message);
      throw err;
    }
  };

  // 🔓 Login handler
  const handleLogin = async (formData) => {
    try {
      const data = await login(formData);

      if (!data.token) throw new Error("Login failed: token missing.");

      localStorage.setItem('token', data.token); // ✅ Save first
      const decoded = jwtDecode(data.token);
      setUser({ id: decoded.userId, role: decoded.role, email: decoded.email });
      setToken(data.token);

      return data;
    } catch (err) {
      console.error("Login error:", err.message);
      throw err;
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, handleSignup, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
