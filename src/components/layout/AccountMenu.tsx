'use client';

import { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface AccountMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: string) => void;
}

export const AccountMenu = ({ isOpen, onClose, onNavigate }: AccountMenuProps) => {
  const { darkMode, theme, themeMode, setThemeMode } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavigate = (page: string) => {
    onNavigate?.(page);
    onClose();
  };

  const menuItemBaseStyle = {
    color: theme.textPrimary,
  };

  const bientotBadgeStyle = {
    background: 'linear-gradient(135deg, #FFB6C1 0%, #DDA0DD 100%)',
    color: 'white',
  };

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      {/* Overlay with blur */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Menu dropdown */}
      <div
        ref={menuRef}
        className="absolute top-20 right-4 w-72 rounded-2xl overflow-hidden animate-slideDown"
        style={{
          background: theme.bgModal,
          boxShadow: darkMode
            ? '0 10px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(182,130,255,0.2)'
            : '0 10px 40px rgba(255,105,180,0.15), 0 0 0 1px rgba(255,255,255,0.8)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-4 border-b"
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, rgba(255,105,180,0.15) 0%, rgba(79,209,197,0.15) 100%)'
              : 'linear-gradient(135deg, rgba(255,105,180,0.1) 0%, rgba(79,209,197,0.1) 100%)',
            borderColor: theme.borderLight,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #FF69B4 0%, #4FD1C5 100%)',
              }}
            >
              <span className="text-2xl">👋</span>
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>
                Mon compte
              </p>
              <p className="text-xs" style={{ color: theme.textMuted }}>
                Bienvenue sur Cleanz
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2">
          {/* Theme selector */}
          <div
            className="px-3 py-3 rounded-xl"
            style={menuItemBaseStyle}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">{darkMode ? '🌙' : '☀️'}</span>
              <span className="text-sm font-medium">Apparence</span>
            </div>
            {/* Theme options */}
            <div
              className="flex rounded-lg p-1 gap-1"
              style={{
                background: darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)',
              }}
            >
              {[
                { mode: 'system' as const, label: 'Système', icon: '💻' },
                { mode: 'light' as const, label: 'Clair', icon: '☀️' },
                { mode: 'dark' as const, label: 'Sombre', icon: '🌙' },
              ].map(({ mode, label, icon }) => (
                <button
                  key={mode}
                  className="flex-1 py-2 px-2 rounded-md text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1"
                  style={{
                    background: themeMode === mode
                      ? (darkMode ? 'rgba(79,209,197,0.3)' : 'white')
                      : 'transparent',
                    color: themeMode === mode ? theme.textPrimary : theme.textMuted,
                    boxShadow: themeMode === mode
                      ? (darkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)')
                      : 'none',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setThemeMode(mode);
                  }}
                >
                  <span className="text-sm">{icon}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mes favoris - with navigation */}
          <button
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors"
            style={menuItemBaseStyle}
            onClick={() => handleNavigate('favoris')}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.bgHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <span className="text-xl">❤️</span>
            <span className="flex-1 text-left text-sm font-medium">Mes favoris</span>
            <ChevronRight className="w-4 h-4" style={{ color: theme.textMuted }} />
          </button>

          {/* Mon compte - Bientôt */}
          <button
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors cursor-default"
            style={menuItemBaseStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.bgHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <span className="text-xl">👤</span>
            <span className="flex-1 text-left text-sm font-medium">Mon compte</span>
            <span
              className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
              style={bientotBadgeStyle}
            >
              Bientôt
            </span>
          </button>

          {/* Ma liste de courses - Bientôt */}
          <button
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors cursor-default"
            style={menuItemBaseStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.bgHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <span className="text-xl">🛒</span>
            <span className="flex-1 text-left text-sm font-medium">Ma liste de courses</span>
            <span
              className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
              style={bientotBadgeStyle}
            >
              Bientôt
            </span>
          </button>

          {/* Mes appareils - Bientôt */}
          <button
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors cursor-default"
            style={menuItemBaseStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.bgHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <span className="text-xl">📱</span>
            <span className="flex-1 text-left text-sm font-medium">Mes appareils</span>
            <span
              className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
              style={bientotBadgeStyle}
            >
              Bientôt
            </span>
          </button>
        </div>

        {/* Footer */}
        <div
          className="p-3 border-t"
          style={{ borderColor: theme.borderLight }}
        >
          <p className="text-[10px] text-center" style={{ color: theme.textMuted }}>
            Cleanz v1.0 • Made with 💚
          </p>
        </div>
      </div>
    </div>
  );
};
