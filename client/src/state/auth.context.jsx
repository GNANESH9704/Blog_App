
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();
export function useAuth(){ return useContext(AuthContext); }

export function AuthProvider({ children }){
  const [user, setUser] = useState(()=>{
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(()=>{
    if(user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = async (payload) => {
    const res = await api.post('/auth/login', payload);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data;
  };
  const register = async (payload) => {
    const res = await api.post('/auth/register', payload);
    return res.data;
  };
  const logout = ()=>{ localStorage.removeItem('token'); setUser(null); };

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}
