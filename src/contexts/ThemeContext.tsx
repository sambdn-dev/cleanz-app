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
    bgPrimary: 'linear-gradient(165deg, #1E1038 0%, #2D1B4E 20%, #3D2266 40%, #2E3A5F 65%, #1A3550 85%, #162840 100%)',
    bgCard: 'rgba(55,35,90,0.65)',
    bgCardSolid: 'rgba(55,35,90,0.88)',
    bgInput: 'rgba(60,40,95,0.75)',
    bgNav: 'rgba(30,16,56,0.92)',
    bgModal: '#3D2266',
    bgHover: 'rgba(85,55,120,0.6)',
    bgSection: 'rgba(55,35,90,0.5)',
    textPrimary: '#F8F0FF',
    textSecondary: '#DCC8F0',
    textMuted: '#A88DC8',
    borderLight: 'rgba(192,150,255,0.28)',
    borderCard: 'rgba(192,150,255,0.22)',
    accentPink: '#FF85C0',
    accentCyan: '#5EEAD4',
    shadowCard: '0 4px 25px rgba(182,130,255,0.18)',
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
