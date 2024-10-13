import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { account } from "./appwrite";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Verifica se o usuário está logado e se o e-mail está verificado
    const checkAuth = async () => {
      try {
        const user = await account.get();
        if (!user.emailVerification) {
          alert("Por favor, verifique seu e-mail antes de acessar esta página.");
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
