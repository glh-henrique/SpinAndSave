import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwrite';
import { useMessage } from './MessageContext';

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showMessage } = useMessage();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.getSession('current');
        if (session) {
          const userAccount = await account.get();
          setUser({
            id: userAccount.$id,
            name: userAccount.name,
            email: userAccount.email,
          });
        }
      } catch (error) {
        console.log('No active session.');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);

      const userAccount = await account.get();

      if (!userAccount.emailVerification) {
        showMessage("Por favor, verifique seu e-mail antes de fazer login.", 'info');
        await account.createVerification("https://spin-and-save.vercel.app/email-verification");
        await account.deleteSession("current");
        return;
      }

      setUser({
        id: userAccount.$id,
        name: userAccount.name,
        email: userAccount.email,
      });

      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
