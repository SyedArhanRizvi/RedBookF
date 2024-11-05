import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [userAuth, setUserAuth] = useState(false); // e.g., for storing user info
  const [theme, setTheme] = useState('dark'); // e.g., for theme management

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <AppContext.Provider value={{ theme, setTheme, userAuth, setUserAuth, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);