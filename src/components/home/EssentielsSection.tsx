'use client';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { INGREDIENTS } from '@/data/ingredients';
import { Ingredient } from '@/types';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface EssentielsSectionProps {
  onIngredientClick: (ingredient: Ingredient) => void;
  onViewAll: () => void;
}

const bgColors = [
  'bg-rose-400',
  'bg-sky-400',
  'bg-amber-400',
  'bg-violet-500',
  'bg-emerald-400',
  'bg-pink-400',
  'bg-cyan-500'
];

export const EssentielsSection = ({ onIngredientClick, onViewAll }: EssentielsSectionProps) => {
  const essentiels = INGREDIENTS.filter(i => i.essentiel);

  return (
    <motion.div
      className="mb-5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <SectionTitle
        icon={Sparkles}
        iconColor="text-amber-500"
        action="Tout voir →"
        onAction={onViewAll}
      >
        Les 7 essentiels
      </SectionTitle>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {essentiels.map((ing, index) => (
          <motion.button
            key={ing.id}
            onClick={() => onIngredientClick(ing)}
            className={`flex-shrink-0 w-20 p-3 rounded-2xl text-center ${bgColors[index]}`}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.06,
              type: 'spring',
              stiffness: 400,
              damping: 15,
            }}
            whileHover={{ scale: 1.1, y: -5, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-2xl block mb-1"
              whileHover={{ scale: 1.2, rotate: [0, -15, 15, 0] }}
              transition={{ duration: 0.4 }}
            >
              {ing.emoji}
            </motion.span>
            <span className="text-[9px] font-semibold text-white leading-tight line-clamp-2">{ing.nom}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
