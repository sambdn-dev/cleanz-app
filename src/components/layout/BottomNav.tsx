'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Home, Zap, Sparkles, FlaskConical, Heart } from 'lucide-react';

export type NavTab = 'Accueil' | 'Appareils' | 'Astuces' | 'Ingrédients' | 'Favoris';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const navItems: { icon: typeof Home; label: NavTab }[] = [
  { icon: Home, label: 'Accueil' },
  { icon: Zap, label: 'Appareils' },
  { icon: Sparkles, label: 'Astuces' },
  { icon: FlaskConical, label: 'Ingrédients' },
  { icon: Heart, label: 'Favoris' },
];

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { theme, darkMode } = useTheme();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      {/* Safe-area gradient fade so content scrolls cleanly behind the pill */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28"
        style={{
          background: darkMode
            ? 'linear-gradient(to top, rgba(13,12,20,0.65) 0%, transparent 100%)'
            : 'linear-gradient(to top, rgba(255,255,255,0.45) 0%, transparent 100%)',
        }}
      />

      {/* Floating pill */}
      <nav
        className="pointer-events-auto absolute left-1/2 -translate-x-1/2 bottom-[calc(env(safe-area-inset-bottom)+16px)] flex items-center gap-1 px-2.5 py-2 rounded-[30px]"
        style={{
          background: darkMode ? 'rgba(28,22,40,0.72)' : 'rgba(255,255,255,0.62)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: `1px solid ${darkMode ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.85)'}`,
          boxShadow: darkMode
            ? '0 12px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)'
            : '0 12px 40px rgba(149,108,180,0.22), inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.label;
          const isFavoris = item.label === 'Favoris';
          const Icon = item.icon;
          const activeColor = isFavoris ? '#EC4899' : theme.accentPink;

          return (
            <button
              key={item.label}
              onClick={() => onTabChange(item.label)}
              aria-label={item.label}
              className="relative flex items-center justify-center w-[52px] h-[52px] rounded-[20px] transition-all duration-300 active:scale-90"
            >
              {/* Active highlight */}
              <span
                className="absolute inset-0 rounded-[20px] transition-all duration-300"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'scale(1)' : 'scale(0.6)',
                  background: darkMode
                    ? 'linear-gradient(135deg, rgba(255,133,192,0.22) 0%, rgba(94,234,212,0.18) 100%)'
                    : 'linear-gradient(135deg, rgba(255,105,180,0.16) 0%, rgba(79,209,197,0.14) 100%)',
                  boxShadow: isActive
                    ? `inset 0 0 0 1px ${darkMode ? 'rgba(255,133,192,0.35)' : 'rgba(255,105,180,0.28)'}`
                    : 'none',
                }}
              />
              <Icon
                className="relative w-[23px] h-[23px] transition-all duration-300"
                strokeWidth={isActive ? 2.5 : 2}
                fill={isActive && isFavoris ? 'currentColor' : 'none'}
                style={{ color: isActive ? activeColor : theme.textMuted }}
              />
              {/* Active dot indicator */}
              <span
                className="absolute bottom-1 w-1 h-1 rounded-full transition-all duration-300"
                style={{
                  opacity: isActive ? 1 : 0,
                  background: activeColor,
                }}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
};
