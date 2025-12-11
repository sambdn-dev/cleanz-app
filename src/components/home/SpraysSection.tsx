'use client';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { SPRAYS_INDISPENSABLES } from '@/data/sprays';
import { Spray } from '@/types';
import { motion } from 'framer-motion';

interface SpraysSectionProps {
  onSprayClick: (spray: Spray) => void;
}

export const SpraysSection = ({ onSprayClick }: SpraysSectionProps) => {
  return (
    <motion.div
      className="mb-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <SectionTitle badge="Recettes maison">
        <span className="text-base mr-2">🧴</span>Les Indispensables
      </SectionTitle>
      <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {SPRAYS_INDISPENSABLES.map((spray, index) => (
          <motion.button
            key={spray.id}
            onClick={() => onSprayClick(spray)}
            className="flex-shrink-0 w-28 p-3 rounded-2xl text-center relative overflow-hidden"
            style={{ background: spray.gradient, boxShadow: '0 4px 15px rgba(0,0,0,0.15)' }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute top-1.5 right-1.5 text-[8px] bg-white/30 text-white px-1.5 py-0.5 rounded-full font-semibold">
              {spray.badge}
            </span>
            <motion.span
              className="text-2xl block mb-1"
              whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.3 }}
            >
              {spray.emoji}
            </motion.span>
            <span className="text-[10px] font-bold text-white leading-tight line-clamp-2">{spray.nom}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
