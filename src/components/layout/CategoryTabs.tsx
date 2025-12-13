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
    <div className="flex gap-2 overflow-x-auto pt-1 pb-5 -mx-4 px-4 scrollbar-hide">
      {tabs.map((tab) => {
        const cat = CATEGORIES.find(c => c.nom === tab);
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all flex-shrink-0"
            style={isActive
              ? {
                  background: 'linear-gradient(135deg, #FF69B4 0%, #DDA0DD 50%, #4FD1C5 100%)',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(255,105,180,0.35)'
                }
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
                    : '0 2px 8px rgba(0,0,0,0.04)'
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
