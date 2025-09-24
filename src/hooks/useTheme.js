// hooks/useTheme.js
import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [colorTheme, setColorTheme] = useState(() => {
    return localStorage.getItem('colorTheme') || 'blue';
  });

  useEffect(() => {
    applyTheme(isDarkMode, colorTheme);
  }, [isDarkMode, colorTheme]);

  const applyTheme = (darkMode, color) => {
    const html = document.documentElement;
    
    if (darkMode) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
    
    html.setAttribute('data-color-theme', color);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const changeColorTheme = (theme) => {
    setColorTheme(theme);
    localStorage.setItem('colorTheme', theme);
  };

  return {
    isDarkMode,
    colorTheme,
    toggleDarkMode,
    changeColorTheme
  };
};