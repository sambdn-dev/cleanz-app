'use client';

import { CATEGORIES } from '@/data/categories';

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const CategoryTabs = ({ activeTab, onTabChange }: CategoryTabsProps) => {
  const tabs = ['Tout', ...CATEGORIES.map(c => c.nom)];

  return (
    <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
      {tabs.map((tab) => {
        const cat = CATEGORIES.find(c => c.nom === tab);
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all"
            style={isActive
              ? {
                  background: 'linear-gradient(135deg, #FF69B4 0%, #DDA0DD 50%, #4FD1C5 100%)',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(255,105,180,0.35)'
                }
              : {
                  background: 'rgba(255,255,255,0.7)',
                  color: '#8B7A9E'
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
