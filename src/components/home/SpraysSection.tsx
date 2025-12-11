'use client';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { SPRAYS_INDISPENSABLES } from '@/data/sprays';
import { Spray } from '@/types';
import { motion } from 'framer-motion';

interface SpraysSectionProps {
  onSprayClick: (spray: Spray) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 18,
      mass: 0.8
    }
  }
};

export const SpraysSection = ({ onSprayClick }: SpraysSectionProps) => {
  return (
    <motion.div
      className="mb-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 25
      }}
    >
      <SectionTitle badge="Recettes maison">
        <span className="text-base mr-2">🧴</span>Les Indispensables
      </SectionTitle>
      <motion.div
        className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {SPRAYS_INDISPENSABLES.map((spray) => (
          <motion.button
            key={spray.id}
            onClick={() => onSprayClick(spray)}
            className="flex-shrink-0 w-28 p-3 rounded-2xl text-center relative overflow-hidden group"
            style={{
              background: spray.gradient,
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
            }}
            variants={itemVariants}
            whileHover={{
              scale: 1.08,
              y: -8,
              boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 15
              }
            }}
            whileTap={{
              scale: 0.95,
              transition: { type: 'spring', stiffness: 400, damping: 20 }
            }}
          >
            {/* Shimmer effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />

            <span className="absolute top-1.5 right-1.5 text-[8px] bg-white/30 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full font-semibold">
              {spray.badge}
            </span>
            <motion.span
              className="text-2xl block mb-1 relative z-10"
              whileHover={{
                scale: 1.2,
                transition: { type: 'spring', stiffness: 400, damping: 12 }
              }}
            >
              {spray.emoji}
            </motion.span>
            <span className="text-[10px] font-bold text-white leading-tight line-clamp-2 relative z-10">
              {spray.nom}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};
