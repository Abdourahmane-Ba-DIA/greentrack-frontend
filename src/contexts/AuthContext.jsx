// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '../services/api';
import api, { setAuthToken } from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // init: set token header and get user
  useEffect(() => {
    const init = async () => {
      if (token) {
        try {
          setAuthToken(token);
          const res = await AuthService.getUser();
          setUser(res.data);
        } catch (err) {
          console.warn('Token invalid or expired', err);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    init();
  }, [token]);

  const login = async ({ email, password }) => {
    const res = await AuthService.login({ email, password });
    const t = res.data.token;
    if (!t) throw new Error('No token returned from API');
    localStorage.setItem('token', t);
    setAuthToken(t);
    setToken(t);
    setUser(res.data.user);
    return res;
  };

  const register = async (payload) => {
    const res = await AuthService.register(payload);
    const t = res.data.token;
    if (!t) throw new Error('No token returned from API');
    localStorage.setItem('token', t);
    setAuthToken(t);
    setToken(t);
    setUser(res.data.user);
    return res;
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (e) {
      // ignore server errors but still clear local
    }
    localStorage.removeItem('token');
    setAuthToken(null);
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
