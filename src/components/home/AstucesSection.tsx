'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ASTUCES_DU_JOUR } from '@/data/astuces';
import { Astuce } from '@/types';
import { Star, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface AstucesSectionProps {
  onAstuceClick: (astuce: Astuce) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.98
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 20,
      mass: 0.8
    }
  }
};

export const AstucesSection = ({ onAstuceClick }: AstucesSectionProps) => {
  const { theme, darkMode } = useTheme();

  return (
    <motion.div
      className="mb-5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4 }}
    >
      <SectionTitle
        badge="Recettes express"
      >
        <span className="text-base mr-2">✨</span>Astuces du jour
      </SectionTitle>

      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-30px' }}
      >
        {ASTUCES_DU_JOUR.map((astuce) => (
          <motion.button
            key={astuce.id}
            onClick={() => onAstuceClick(astuce)}
            className="w-full rounded-2xl overflow-hidden text-left group"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.85)',
              border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
              boxShadow: darkMode
                ? '0 4px 15px rgba(0,0,0,0.2)'
                : '0 4px 20px rgba(0,0,0,0.06)'
            }}
            variants={cardVariants}
            whileHover={{
              scale: 1.015,
              y: -3,
              boxShadow: darkMode
                ? '0 10px 30px rgba(0,0,0,0.3)'
                : '0 10px 35px rgba(0,0,0,0.1)',
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20
              }
            }}
            whileTap={{
              scale: 0.99,
              transition: { type: 'spring', stiffness: 400, damping: 25 }
            }}
          >
            <div className="flex items-stretch">
              {/* Gradient accent bar */}
              <motion.div
                className="w-1.5 flex-shrink-0 origin-top"
                style={{ background: astuce.gradient }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.15
                }}
              />

              {/* Content */}
              <div className="flex-1 p-4">
                <div className="flex items-start gap-3">
                  {/* Emoji with gradient background */}
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: astuce.gradient }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { type: 'spring', stiffness: 400, damping: 15 }
                    }}
                  >
                    <span className="text-2xl">{astuce.emoji}</span>
                  </motion.div>

                  {/* Text content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm mb-1" style={{ color: theme.textPrimary }}>
                      {astuce.titre}
                    </h4>
                    <p
                      className="text-xs leading-relaxed line-clamp-2"
                      style={{ color: theme.textSecondary }}
                    >
                      {astuce.resume}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold" style={{ color: theme.textPrimary }}>
                          {astuce.note}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" style={{ color: theme.textMuted }} />
                        <span className="text-xs" style={{ color: theme.textMuted }}>
                          {astuce.duree}
                        </span>
                      </div>
                      {/* Ingredients tags */}
                      <div className="flex gap-1 flex-wrap">
                        {astuce.ingredients.slice(0, 2).map((ing, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded-full"
                            style={{
                              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                              color: theme.textMuted
                            }}
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Arrow with smooth animation */}
                  <motion.div
                    className="flex-shrink-0 self-center"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <ChevronRight
                      className="w-5 h-5 transition-colors group-hover:text-purple-500"
                      style={{ color: theme.textMuted }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};
