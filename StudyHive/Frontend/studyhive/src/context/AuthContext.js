// Frontend/studyhive/src/context/AuthContext.js

import { createContext, useState, useContext, useEffect } from 'react';
import { signup, login } from '../api/authService'; // Your signup and login API calls
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext(); // Create a new context

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Will hold { id, role, email }
  const [token, setToken] = useState(null);

  // Check if token exists on page reload (persistent login)
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decoded = jwtDecode(storedToken);

      setUser({
        id: decoded.userId,
        role: decoded.role,
        email: decoded.email,
      });
      setToken(storedToken);
    }
  }, []);

  // Handle signup
  const handleSignup = async (formData) => {
    try {
      const data = await signup(formData); // { token: '...' }
  
      if (!data.token) {
        throw new Error("Signup did not return a valid token.");
      }
  
      localStorage.setItem('token', data.token); // Save token first
      setToken(data.token);
  
    
      const decoded = jwtDecode(data.token);
  
      
      setUser({
        id: decoded.userId,
        role: decoded.role,
        email: decoded.email,
      });
  
    } catch (err) {
      console.error(err.response?.data?.message || err.message || "SignUp Failed.");
      throw new Error(err.response?.data?.message || err.message || "SignUp Failed.");
    }
  };
  

  // Handle login
  const handleLogin = async (formData) => {
    try {
      const data = await login(formData); // { token: '...' }

      if(!data.token){
        throw new Error("Login failed: token missing.");
      }

      const decoded = jwtDecode(data.token);


      setUser({
        userId: decoded.userId,
        role: decoded.role,
        email: decoded.email,
      });

      setToken(data.token);
      localStorage.setItem('token', data.token); // Save token for persistence

      return data;// Return the api response

    } catch (err) {
      console.error(err.message);
      throw err;
    }
  };

  // Handle logout
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

// Custom hook for easier access
export const useAuth = () => useContext(AuthContext);
