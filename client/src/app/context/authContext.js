'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { register, login, logout, getProfile } from '../lib/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile().then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  const handleRegister = async (name, email, password) => {
    const data = await register(name, email, password);
    setUser(data.user);
  };

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    setUser(data.user);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleRegister, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
