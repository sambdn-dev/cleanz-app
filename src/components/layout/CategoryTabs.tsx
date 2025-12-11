'use client';

import { CATEGORIES } from '@/data/categories';
import { motion } from 'framer-motion';

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const CategoryTabs = ({ activeTab, onTabChange }: CategoryTabsProps) => {
  const tabs = ['Tout', ...CATEGORIES.map(c => c.nom)];

  return (
    <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
      {tabs.map((tab, index) => {
        const cat = CATEGORIES.find(c => c.nom === tab);
        const isActive = activeTab === tab;

        return (
          <motion.button
            key={tab}
            onClick={() => onTabChange(tab)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold flex-shrink-0"
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.05,
              type: 'spring',
              stiffness: 400,
              damping: 25
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-base">{cat?.emoji || '✨'}</span>
            <span>{tab}</span>
          </motion.button>
        );
      })}
    </div>
  );
};
