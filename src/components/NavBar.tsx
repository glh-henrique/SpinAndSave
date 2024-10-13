// NavBar.tsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { account } from '../appwrite';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get();
        setIsAuthenticated(true);
        setUserName(user.name || user.email);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Função para lidar com o logout
  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      navigate('/'); // Redireciona para a página de login após logout
    } catch (error) {
      console.error('Erro ao encerrar a sessão:', error);
      alert('Erro ao encerrar a sessão. Por favor, tente novamente.');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/home">Minha Aplicação</Link>
      </div>
      <ul className="navbar-links">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/profile">Perfil</Link>
            </li>
            <li>
              <span className="user-name">Olá, {userName}</span>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Registrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
