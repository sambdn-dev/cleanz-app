'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Home, Zap, ScanLine, Sparkles, FlaskConical } from 'lucide-react';

export type NavTab = 'Accueil' | 'Appareils' | 'Scan IA' | 'Recettes' | 'Ingrédients';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const navItems: { icon: typeof Home; label: NavTab }[] = [
  { icon: Home, label: 'Accueil' },
  { icon: Zap, label: 'Appareils' },
  { icon: ScanLine, label: 'Scan IA' },
  { icon: Sparkles, label: 'Recettes' },
  { icon: FlaskConical, label: 'Ingrédients' },
];

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { theme } = useTheme();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        background: theme.bgNav,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 -4px 30px rgba(255,105,180,0.1)'
      }}
    >
      <div className="max-w-md mx-auto px-4 py-3 flex justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.label;
          const isScan = item.label === 'Scan IA';
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => onTabChange(item.label)}
              className={`flex flex-col items-center gap-0.5 transition-all ${isScan ? '-mt-4' : ''}`}
              style={{ color: isActive ? '#FF69B4' : '#9B8AAB' }}
            >
              {isScan ? (
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, #FF69B4 0%, #DDA0DD 50%, #4FD1C5 100%)'
                      : 'linear-gradient(135deg, #FFB6C1 0%, #DDA0DD 50%, #B0E0E6 100%)',
                    boxShadow: '0 4px 15px rgba(255,105,180,0.3)'
                  }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
              ) : (
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              )}
              <span className={`text-[10px] font-medium ${isScan ? 'mt-1' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
