// src/components/RouteGuard.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const RouteGuard = ({ children, isPublic }) => {
  const { authToken } = useContext(AuthContext);

  // Public route: user should be logged out (no auth token)
  if (isPublic && authToken) {
    return <Navigate to="/dashboard" />;
  }

  // Private route: user should be logged in (must have auth token)
  if (!isPublic && !authToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default React.memo(RouteGuard);
