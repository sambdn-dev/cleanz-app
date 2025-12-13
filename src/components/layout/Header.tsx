'use client';

import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  onAccountClick: () => void;
}

export const Header = ({ onAccountClick }: HeaderProps) => {
  const { theme, darkMode } = useTheme();

  return (
    <header className="pt-8 pb-4 mb-2">
      <div className="flex items-center justify-between">
        <div className="w-10" />
        <div className="text-center">
          <h1
            className="text-3xl font-black tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: darkMode
                ? 'linear-gradient(135deg, #FF85C0 0%, #A78BFA 50%, #4FD1C5 100%)'
                : 'linear-gradient(135deg, #FF69B4 0%, #8B5CF6 50%, #06B6D4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            cleanz
          </h1>
          <p
            className="text-[11px] font-medium tracking-wide uppercase mt-0.5"
            style={{ color: darkMode ? theme.textMuted : '#E879A9' }}
          >
            L'entretien naturel, simplifié
          </p>
        </div>
        <button
          onClick={onAccountClick}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          style={{
            background: darkMode ? 'rgba(45,27,78,0.8)' : 'rgba(255,255,255,0.8)',
            boxShadow: darkMode
              ? '0 2px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(182,130,255,0.2)'
              : '0 2px 8px rgba(0,0,0,0.1)',
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
