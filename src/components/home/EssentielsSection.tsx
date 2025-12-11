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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 18,
      mass: 0.8
    }
  }
};

export const EssentielsSection = ({ onIngredientClick, onViewAll }: EssentielsSectionProps) => {
  const essentiels = INGREDIENTS.filter(i => i.essentiel);

  return (
    <motion.div
      className="mb-5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4 }}
    >
      <SectionTitle
        icon={Sparkles}
        iconColor="text-amber-500"
        action="Tout voir →"
        onAction={onViewAll}
      >
        Les 7 essentiels
      </SectionTitle>
      <motion.div
        className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {essentiels.map((ing, index) => (
          <motion.button
            key={ing.id}
            onClick={() => onIngredientClick(ing)}
            className={`flex-shrink-0 w-20 p-3 rounded-2xl text-center shadow-lg ${bgColors[index]}`}
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              y: -8,
              boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
              transition: {
                type: 'spring',
                stiffness: 350,
                damping: 15
              }
            }}
            whileTap={{
              scale: 0.95,
              transition: { type: 'spring', stiffness: 400, damping: 20 }
            }}
          >
            <motion.span
              className="text-2xl block mb-1"
              whileHover={{
                scale: 1.15,
                transition: { type: 'spring', stiffness: 400, damping: 12 }
              }}
            >
              {ing.emoji}
            </motion.span>
            <span className="text-[9px] font-semibold text-white leading-tight line-clamp-2">
              {ing.nom}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};
