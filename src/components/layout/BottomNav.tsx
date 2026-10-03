'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Home, Zap, BookOpen, Wrench, CalendarDays } from 'lucide-react';
import { haptic } from '@/utils/haptics';

export type NavTab = 'Accueil' | 'Planning' | 'Appareils' | 'Recettes' | 'Matériel';

interface BottomNavProps {
  activeTab: NavTab | null;
  onTabChange: (tab: NavTab) => void;
}

const navItems: { icon: typeof Home; label: NavTab }[] = [
  { icon: Home, label: 'Accueil' },
  { icon: CalendarDays, label: 'Planning' },
  { icon: Zap, label: 'Appareils' },
  { icon: BookOpen, label: 'Recettes' },
  { icon: Wrench, label: 'Matériel' },
];

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { theme, darkMode } = useTheme();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div
        className="absolute bottom-0 left-0 right-0 h-36"
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          maskImage: 'linear-gradient(to top, black 35%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 35%, transparent 100%)',
          background: darkMode
            ? 'linear-gradient(to top, rgba(13,12,20,0.55), transparent)'
            : 'linear-gradient(to top, rgba(255,255,255,0.55), transparent)',
        }}
      />
      <nav
        aria-label="Navigation principale"
        className="pointer-events-auto absolute left-1/2 -translate-x-1/2 flex items-center rounded-[28px]"
        style={{
          width: 'calc(100vw - 24px)',
          maxWidth: 460,
          bottom: 'max(10px, env(safe-area-inset-bottom, 0px))',
          padding: 8,
          gap: 2,
          background: darkMode ? 'rgba(24,18,36,0.88)' : 'rgba(255,255,255,0.82)',
          border: `1px solid ${theme.borderLight}`,
          backdropFilter: 'blur(44px) saturate(180%)',
          WebkitBackdropFilter: 'blur(44px) saturate(180%)',
          boxShadow: darkMode
            ? '0 12px 35px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)'
            : '0 12px 35px rgba(149,108,180,0.22), inset 0 1px 0 rgba(255,255,255,1)',
        }}
      >
        {navItems.map(({ icon: Icon, label }) => {
          const isActive = activeTab === label;
          return (
            <button
              key={label}
              onClick={() => { haptic('selection'); onTabChange(label); }}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex flex-col items-center justify-center rounded-[20px] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                flex: '1 1 0',
                minWidth: 0,
                height: 60,
                gap: 5,
                color: isActive ? theme.accentPink : theme.textSecondary,
                outlineColor: theme.accentPink,
              }}
            >
              <span
                className="absolute inset-0 rounded-[20px] transition-opacity duration-200"
                style={{
                  opacity: isActive ? 1 : 0,
                  background: darkMode
                    ? 'linear-gradient(135deg, rgba(255,133,192,0.22), rgba(94,234,212,0.18))'
                    : 'linear-gradient(135deg, rgba(255,105,180,0.16), rgba(79,209,197,0.14))',
                  boxShadow: `inset 0 0 0 1px ${darkMode ? 'rgba(255,133,192,0.35)' : 'rgba(255,105,180,0.28)'}`,
                }}
              />
              <Icon className="relative shrink-0" size={23} strokeWidth={isActive ? 2.2 : 1.8}
                fill={isActive ? 'currentColor' : 'none'} fillOpacity={isActive ? 0.15 : 0} aria-hidden="true" />
              <span className="relative font-semibold leading-none whitespace-nowrap" style={{ fontSize: 11 }}>{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
