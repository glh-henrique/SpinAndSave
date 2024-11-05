import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresAuth: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiresAuth }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  const redirectPath = requiresAuth ? "/login" : location.state?.from?.pathname || "/home";
  const shouldRedirect = requiresAuth ? !isAuthenticated : isAuthenticated;

  return shouldRedirect ? <Navigate to={redirectPath} state={{ from: location }} replace /> : <>{children}</>;
};

export default ProtectedRoute;
