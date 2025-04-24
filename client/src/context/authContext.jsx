// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Optional loader

  // Fetch user data if token exists in localStorage
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('http://localhost:5000/api/user/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data); // Set user data if token is valid
        } catch (err) {
          console.error('Error fetching user:', err);
          localStorage.removeItem('token'); // Remove token if error occurs
        }
      }
      setLoading(false); // Stop loading once check is complete
    };

    fetchUser();
  }, []);

  // Login function to set user and token
  const login = (userData, token) => {
    setUser(userData); // Set user data in context
    localStorage.setItem('token', token); // Store token in localStorage
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
