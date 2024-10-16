// NavBar.tsx

import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { account } from '../appwrite';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="bg-gray-300 p-4 flex justify-between items-center">
      <div className="logo">
        <img src="/src/assets/spin-and-save.png" alt="Logo" className="w-16 h-auto" />
      </div>
      <nav className="navbar">
        <ul className="flex space-x-6 items-center" >
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/home" className="text-black font-bold underline">Home</Link>
              </li>
              <li>
                <Link to="/profile" className="text-black font-bold">Perfil</Link>
              </li>
              <li className="nav-item relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative z-10 block w-8 h-8 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <img
                    src="/src/assets/user.svg"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1" ref={dropdownRef}>
                    <p className="px-4 py-2 text-gray-700">Hello, {userName}</p>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="text-black font-bold">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-black font-bold">Registrar</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
