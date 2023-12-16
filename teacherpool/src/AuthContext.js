import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for the authentication state and user data on initial load
    const storedAuthState = localStorage.getItem('isAuthenticated');
    const storedUserData = localStorage.getItem('userData');

    if (storedAuthState) {
      setIsAuthenticated(JSON.parse(storedAuthState));
    }

    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, []);

  const login = (userData) => {
    // Perform your login logic
    setIsAuthenticated(true);
    
    // Store the updated authentication state and user data in local storage
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
    localStorage.setItem('userData', JSON.stringify(userData));

    setUser(userData);
  };

  const logout = () => {
    // Perform your logout logic
    setIsAuthenticated(false);
    
    // Remove the authentication state and user data from local storage on logout
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
