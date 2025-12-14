'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Home, Zap, Sparkles, FlaskConical, Heart } from 'lucide-react';

export type NavTab = 'Accueil' | 'Appareils' | 'Recettes' | 'Ingrédients' | 'Favoris';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const navItems: { icon: typeof Home; label: NavTab }[] = [
  { icon: Home, label: 'Accueil' },
  { icon: Zap, label: 'Appareils' },
  { icon: Sparkles, label: 'Recettes' },
  { icon: FlaskConical, label: 'Ingrédients' },
  { icon: Heart, label: 'Favoris' },
];

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { theme } = useTheme();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: theme.bgNav,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 -4px 30px rgba(255,105,180,0.1)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        transform: 'translateZ(0)', // Force GPU layer for better fixed positioning on iOS
      }}
    >
      <div className="max-w-md mx-auto px-6 pt-3 pb-2 flex justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.label;
          const isFavoris = item.label === 'Favoris';
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => onTabChange(item.label)}
              className="flex flex-col items-center gap-1 transition-all relative min-w-[56px]"
              style={{ color: isActive ? (isFavoris ? '#EC4899' : '#FF69B4') : '#9B8AAB' }}
            >
              <Icon
                className="w-6 h-6"
                strokeWidth={isActive ? 2.5 : 2}
                fill={isActive ? 'currentColor' : 'none'}
              />
              <span className="text-[11px] font-medium">{item.label}</span>
              {/* Active indicator line */}
              {isActive && (
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                  style={{ background: isFavoris ? '#EC4899' : '#FF69B4' }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
