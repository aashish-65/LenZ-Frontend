import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const navigate = useNavigate();

  // Update user state after login
  const login = (token, userData) => {
    setAuthToken(token);
    setUser(userData);
    localStorage.setItem('authToken', token);
  };

  // Clear user state on logout
  const logout = useCallback(() => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    navigate('/login');
  }, [navigate]);

  // Verify token or fetch user details on initial load
  useEffect(() => {
    const verifyAuth = async () => {
      if (authToken) {
        try {
          const response = await fetch('https://lenz-backend.onrender.com/api/auth/verify', {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          const data = await response.json();
          if (response.ok) {
            setUser(data.user);
          } else {
            logout();
          }
        } catch (error) {
          console.error('Error verifying auth token:', error);
          logout();
        }
      }
    };
    verifyAuth();
  }, [authToken, logout]);

  return (
    <AuthContext.Provider value={{ user, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
