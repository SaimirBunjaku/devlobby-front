import React, { useState } from 'react';

export const DarkModeContext = React.createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = (event) => {
    event.stopPropagation();
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
