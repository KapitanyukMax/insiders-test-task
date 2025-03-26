'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { register, login, logout, getProfile, resetPassword } from '../lib/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile().then((data) => {
      setUser(data?.user);
      setLoading(false);
    });
  }, []);

  const handleRegister = async (name, email, password) => {
    const data = await register(name, email, password);

    if (data.error) {
      throw new Error(data.error);
    }

    setUser(data.user);
  };

  const handleLogin = async (email, password) => {
    const data = await login(email, password);

    if (data.error) {
      throw new Error(data.error);
    }

    setUser(data.user);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const handleResetPassword = async (email) => {
    const res = await resetPassword(email);
    return res.message;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleRegister, handleLogin, handleLogout, handleResetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
