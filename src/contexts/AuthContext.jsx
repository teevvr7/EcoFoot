import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem('ecofoot-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    console.log('Logging in:', email);
    const userData = {
      email,
      displayName: email.split('@')[0],
      uid: 'user-' + Date.now()
    };
    setUser(userData);
    localStorage.setItem('ecofoot-user', JSON.stringify(userData));
    return Promise.resolve();
  };

  const signup = (email, password, displayName) => {
    console.log('Signing up:', email, displayName);
    const userData = {
      email,
      displayName: displayName || email.split('@')[0],
      uid: 'user-' + Date.now()
    };
    setUser(userData);
    localStorage.setItem('ecofoot-user', JSON.stringify(userData));
    return Promise.resolve();
  };

  const logout = () => {
    console.log('Logging out');
    setUser(null);
    localStorage.removeItem('ecofoot-user');
    return Promise.resolve();
  };

  const value = {
    user,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}