"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '@/lib/theme';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState(false);

  // Get system preference
  const getSystemPreference = (): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };

  // Get stored theme preference
  const getStoredTheme = (): ThemeMode => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme-mode');
      return (stored as ThemeMode) || 'system';
    }
    return 'system';
  };

  // Update HTML element class for Tailwind CSS
  const updateHtmlClass = (dark: boolean) => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement;
      if (dark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  };

  // Initialize theme
  useEffect(() => {
    const storedMode = getStoredTheme();
    setMode(storedMode);
    
    if (storedMode === 'system') {
      const systemDark = getSystemPreference();
      setIsDark(systemDark);
      updateHtmlClass(systemDark);
    } else {
      const isDarkMode = storedMode === 'dark';
      setIsDark(isDarkMode);
      updateHtmlClass(isDarkMode);
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDark(e.matches);
        updateHtmlClass(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [mode]);

  // Update theme when mode changes
  useEffect(() => {
    if (mode === 'system') {
      const systemDark = getSystemPreference();
      setIsDark(systemDark);
      updateHtmlClass(systemDark);
    } else {
      const isDarkMode = mode === 'dark';
      setIsDark(isDarkMode);
      updateHtmlClass(isDarkMode);
    }
  }, [mode]);

  // Store theme preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme-mode', mode);
    }
  }, [mode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light';
    setMode(newMode);
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const currentTheme = isDark ? darkTheme : lightTheme;

  const value = {
    mode,
    isDark,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 