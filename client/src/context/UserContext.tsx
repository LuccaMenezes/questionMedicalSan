import React, { createContext, useContext, ReactNode, useState } from 'react';
import api from '@/utils/api';

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, senha: string) => Promise<void>;
  logout: () => void;
  register: (username: string, senha: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, senha: string) => {
    try {
      const response = await api.post('/users/login', { email, senha });
      const { token, user } = response.data;
      setUser(user);
      localStorage.setItem('token', token);
      window.location.href = '/primeiraPergunta';
    } catch (error) {
      console.error('Erro ao fazer requisição de login:', error);
      throw new Error('Não foi possível realizar o login. Verifique suas credenciais.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
    setUser(null);
  };


  const register = async (username: string, senha: string) => {
    setUser({ id: '1', username });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
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
