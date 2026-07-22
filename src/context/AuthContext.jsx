import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { getAuthToken, setAuthToken, getUserData, setUserData } from '../api/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getAuthToken());
  const [user, setUserState] = useState(getUserData());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      const storedToken = getAuthToken();
      if (storedToken) {
        try {
          const res = await api.get('/user');
          if (res.success && res.data) {
            setUserState(res.data);
            setUserData(res.data);
          }
        } catch (err) {
          console.warn('Session expired or invalid token:', err);
          setAuthToken(null);
          setUserData(null);
          setTokenState(null);
          setUserState(null);
        }
      }
      setLoading(false);
    }
    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
    if (res.data?.access_token) {
      const accessToken = res.data.access_token;
      const userObj = res.data.user;
      setAuthToken(accessToken);
      setUserData(userObj);
      setTokenState(accessToken);
      setUserState(userObj);
    }
    return res;
  };

  const register = async (payload) => {
    const res = await api.post('/register', payload);
    if (res.data?.access_token) {
      const accessToken = res.data.access_token;
      const userObj = res.data.user;
      setAuthToken(accessToken);
      setUserData(userObj);
      setTokenState(accessToken);
      setUserState(userObj);
    }
    return res;
  };

  const logout = async () => {
    try {
      if (token) {
        await api.post('/logout');
      }
    } catch (e) {
      console.warn('Logout endpoint error:', e);
    } finally {
      setAuthToken(null);
      setUserData(null);
      setTokenState(null);
      setUserState(null);
    }
  };

  const updateProfile = (updatedUser) => {
    if (!updatedUser) return;
    setUserState((prevUser) => {
      const merged = { ...(prevUser || {}), ...updatedUser };
      setUserData(merged);
      return merged;
    });
  };

  const value = {
    token,
    user,
    role: user?.role || null,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!token && !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
