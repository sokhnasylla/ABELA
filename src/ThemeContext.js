// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [backgroundImage, setBackgroundImage] = useState(
    'url("../../assets/default-background.jpg")'
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const changeBackgroundImage = (url) => {
    setBackgroundImage(`url("${url}")`);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, backgroundImage, changeBackgroundImage }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
