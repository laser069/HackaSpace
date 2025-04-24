import React from 'react';
import { Navigate } from 'react-router-dom';

// A higher-order component to protect routes based on authentication and/or role
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If a required role is specified and doesn't match the user's role, redirect to home
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
