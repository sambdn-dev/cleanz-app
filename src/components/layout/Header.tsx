'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  onAccountClick: () => void;
}

const getGreeting = (): string => {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'Bonjour';
  if (h >= 12 && h < 18) return 'Bel après-midi';
  if (h >= 18 && h < 23) return 'Bonsoir';
  return 'Bonne nuit';
};

export const Header = ({ onAccountClick }: HeaderProps) => {
  const { theme, darkMode } = useTheme();
  // Compute greeting after mount to avoid SSR/client mismatch
  const [greeting, setGreeting] = useState('Bonjour');
  useEffect(() => setGreeting(getGreeting()), []);

  return (
    <header className="pt-3 pb-3 mb-2">
      <div className="flex items-end justify-between">
        <div>
          <p
            className="text-[13px] font-medium tracking-wide"
            style={{ color: theme.textMuted }}
          >
            {greeting} 👋
          </p>
          <h1
            className="font-display text-[34px] leading-none font-extrabold tracking-tight bg-clip-text text-transparent mt-0.5"
            style={{
              backgroundImage: darkMode
                ? 'linear-gradient(120deg, #FF85C0 0%, #A78BFA 55%, #5EEAD4 100%)'
                : 'linear-gradient(120deg, #FF69B4 0%, #8B5CF6 55%, #06B6D4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            cleanz
          </h1>
        </div>

        <button
          onClick={onAccountClick}
          aria-label="Mon compte"
          className="w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          style={{
            background: darkMode ? 'rgba(45,27,78,0.7)' : 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${darkMode ? 'rgba(182,130,255,0.2)' : 'rgba(255,255,255,0.9)'}`,
            boxShadow: darkMode
              ? '0 4px 14px rgba(0,0,0,0.35)'
              : '0 4px 14px rgba(149,108,180,0.18)',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={darkMode ? theme.textSecondary : '#8B7A9E'}
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </div>
    </header>
  );
};
