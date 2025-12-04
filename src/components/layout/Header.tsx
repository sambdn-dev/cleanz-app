'use client';

import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  onAccountClick: () => void;
}

export const Header = ({ onAccountClick }: HeaderProps) => {
  const { theme } = useTheme();

  return (
    <header className="pt-8 pb-4 mb-2">
      <div className="flex items-center justify-between">
        <div className="w-10" />
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight" style={{ color: '#FF69B4' }}>
            clean<span style={{ color: '#4FD1C5' }}>z</span>
          </h1>
          <p className="text-[11px] font-medium tracking-wide uppercase mt-0.5" style={{ color: '#E879A9' }}>
            L'entretien naturel, simplifié
          </p>
        </div>
        <button
          onClick={onAccountClick}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          style={{ background: 'rgba(255,255,255,0.8)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B7A9E" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </div>
    </header>
  );
};
