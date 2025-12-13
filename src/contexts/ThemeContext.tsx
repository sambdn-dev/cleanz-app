'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme } from '@/types';

export type ThemeMode = 'system' | 'light' | 'dark';

const themes: { light: Theme; dark: Theme } = {
  light: {
    bgPrimary: 'linear-gradient(180deg, #FFE5F1 0%, #E8D5F2 25%, #D4E5F7 50%, #E5F7F3 75%, #FFF5E5 100%)',
    bgCard: 'rgba(255,255,255,0.75)',
    bgCardSolid: 'rgba(255,255,255,0.92)',
    bgInput: 'rgba(255,255,255,0.85)',
    bgNav: 'rgba(255,255,255,0.92)',
    bgModal: 'white',
    bgHover: 'rgba(255,230,245,0.6)',
    bgSection: 'rgba(255,240,250,0.4)',
    textPrimary: '#2D1F3D',
    textSecondary: '#5A4A6A',
    textMuted: '#9B8AAB',
    borderLight: 'rgba(216,180,254,0.3)',
    borderCard: 'rgba(255,255,255,0.7)',
    accentPink: '#FF69B4',
    accentCyan: '#4FD1C5',
    shadowCard: '0 4px 20px rgba(255,105,180,0.08)',
  },
  dark: {
    bgPrimary: 'linear-gradient(180deg, #1A0A2E 0%, #2D1B4E 30%, #1E3A5F 60%, #0D2137 100%)',
    bgCard: 'rgba(45,27,78,0.7)',
    bgCardSolid: 'rgba(45,27,78,0.92)',
    bgInput: 'rgba(45,27,78,0.85)',
    bgNav: 'rgba(26,10,46,0.95)',
    bgModal: '#2D1B4E',
    bgHover: 'rgba(75,45,110,0.6)',
    bgSection: 'rgba(45,27,78,0.5)',
    textPrimary: '#F5E6FF',
    textSecondary: '#D4B8E8',
    textMuted: '#9B7AB8',
    borderLight: 'rgba(182,130,255,0.25)',
    borderCard: 'rgba(182,130,255,0.2)',
    accentPink: '#FF85C0',
    accentCyan: '#5EEAD4',
    shadowCard: '0 4px 25px rgba(182,130,255,0.15)',
  }
};

interface ThemeContextType {
  darkMode: boolean;
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  // Detect system preference
  useEffect(() => {
    // Check initial system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPrefersDark(mediaQuery.matches);

    // Listen for system preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Load saved theme mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('cleanz-theme-mode') as ThemeMode | null;
    if (savedMode && ['system', 'light', 'dark'].includes(savedMode)) {
      setThemeModeState(savedMode);
    }
  }, []);

  // Calculate actual dark mode based on themeMode and system preference
  const darkMode = themeMode === 'system' ? systemPrefersDark : themeMode === 'dark';

  // Update document class when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('cleanz-theme-mode', mode);
  };

  // Legacy toggle function (cycles through: system -> light -> dark -> system)
  const toggleTheme = () => {
    const modes: ThemeMode[] = ['system', 'light', 'dark'];
    const currentIndex = modes.indexOf(themeMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setThemeMode(nextMode);
  };

  const theme = darkMode ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ darkMode, theme, themeMode, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
