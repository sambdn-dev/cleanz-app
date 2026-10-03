'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { CATEGORIES } from '@/data/categories';

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const CategoryTabs = ({ activeTab, onTabChange }: CategoryTabsProps) => {
  const { theme, darkMode } = useTheme();
  const tabs = ['Tout', ...CATEGORIES.map(c => c.nom)];

  return (
    <div className="flex gap-2 overflow-x-auto py-2 -mx-4 px-4 scrollbar-hide">
      {tabs.map((tab) => {
        const cat = CATEGORIES.find(c => c.nom === tab);
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            aria-pressed={isActive}
            className={`min-h-[44px] ${isActive ? 'cleanz-gradient-button cleanz-gradient-button--selected' : ''} flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all flex-shrink-0`}
            style={isActive
              ? undefined
              : {
                  background: darkMode
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(255,255,255,0.85)',
                  color: darkMode ? theme.textSecondary : '#6B5B7A',
                  border: darkMode
                    ? '1px solid rgba(255,255,255,0.1)'
                    : '1px solid rgba(0,0,0,0.05)',
                  boxShadow: darkMode
                    ? 'none'
                    : '0 1px 4px rgba(0,0,0,0.04)'
                }
            }
          >
            {cat?.emoji || '✨'}<span>{tab}</span>
          </button>
        );
      })}
    </div>
  );
};
