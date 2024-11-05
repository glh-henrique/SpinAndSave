import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Loading from './components/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresAuth: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiresAuth }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Loading />
    );
  }

  const redirectPath = requiresAuth ? "/login" : location.state?.from?.pathname || "/home";
  const shouldRedirect = requiresAuth ? !isAuthenticated : isAuthenticated;

  return shouldRedirect ? <Navigate to={redirectPath} state={{ from: location }} replace /> : <>{children}</>;
};

export default ProtectedRoute;
