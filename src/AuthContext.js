import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiCall from './utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initialize user and token state
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

  // Login function to set token and user state
  const login = useCallback((token, userData) => {
    setAuthToken(token);
    setUser(userData);
    localStorage.setItem('authToken', token);
  }, []);

  // Logout function to clear token and user state
  const logout = useCallback(() => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    navigate('/login');
  }, [navigate]);

  // Memoize values passed to context to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    authToken,
    login,
    logout
  }), [user, authToken, login, logout]);

  // Verify token or fetch user details only when `authToken` changes
  useEffect(() => {
    const verifyAuth = async () => {
      if (authToken) {
        try {
          const data = await apiCall('/auth/verify', 'GET'); // Using the API utility
          setUser(data.user);
        } catch (error) {
          console.error('Error verifying auth token:', error.message);
          logout();
        }
      }
    };
    verifyAuth();
  }, [authToken, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
