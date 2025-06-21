// client/src/components/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('access_token');
  const location = useLocation();

  if (!token) {
    // redirige vers login et stocke la page demandée dans l'état
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
