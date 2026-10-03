'use client';

import React, { createContext, useContext, useSyncExternalStore, useEffect, ReactNode } from 'react';
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

const THEME_KEY = 'cleanz-theme-mode';
const THEME_EVENT = 'cleanz:theme-change';
let sessionMode: ThemeMode | undefined;

function readThemeSnapshot(): string {
  let mode = sessionMode;
  if (!mode) {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'system') mode = saved;
    } catch { /* A restricted store still supports the system appearance. */ }
  }
  mode ||= 'system';
  const dark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  return `${mode}:${dark ? 'dark' : 'light'}`;
}

function subscribeTheme(listener: () => void) {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== THEME_KEY) return;
    sessionMode = undefined;
    listener();
  };
  media.addEventListener('change', listener);
  window.addEventListener(THEME_EVENT, listener);
  window.addEventListener('storage', onStorage);
  return () => {
    media.removeEventListener('change', listener);
    window.removeEventListener(THEME_EVENT, listener);
    window.removeEventListener('storage', onStorage);
  };
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // The server snapshot preserves hydration. React then reads the real saved
  // appearance before the launch overlay reveals the first interactive screen.
  const snapshot = useSyncExternalStore(subscribeTheme, readThemeSnapshot, () => 'system:light');
  const [mode, appearance] = snapshot.split(':');
  const themeMode = mode as ThemeMode;
  const darkMode = appearance === 'dark';

  useEffect(() => {
    // Read the live preference even during the initial server-snapshot pass:
    // never undo the dark class already set by the pre-paint bootstrap script.
    const dark = readThemeSnapshot().endsWith(':dark');
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    root.dataset.splashTheme = dark ? 'dark' : 'light';
    root.style.colorScheme = dark ? 'dark' : 'light';
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach(meta => {
      meta.content = dark ? '#1E1038' : '#FFE5F1';
    });
  }, [snapshot]);

  const setThemeMode = (mode: ThemeMode) => {
    sessionMode = mode;
    try { localStorage.setItem(THEME_KEY, mode); } catch { /* Keep this session's selection. */ }
    window.dispatchEvent(new Event(THEME_EVENT));
  };
  const toggleTheme = () => {
    const modes: ThemeMode[] = ['system', 'light', 'dark'];
    setThemeMode(modes[(modes.indexOf(themeMode) + 1) % modes.length]);
  };
  const theme = darkMode ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ darkMode, theme, themeMode, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
