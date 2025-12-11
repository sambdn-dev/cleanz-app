'use client';

import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  headerGradient?: string;
  headerContent?: ReactNode;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1]
    }
  }
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 30
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 24,
      mass: 0.9
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1]
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15,
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export function Modal({ isOpen, onClose, children, headerGradient, headerContent }: ModalProps) {
  const { theme } = useTheme();

  // Block body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              background: theme.bgModal,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header with gradient */}
            {headerContent && (
              <div
                className="relative px-6 pt-6 pb-8 flex-shrink-0 overflow-hidden"
                style={{ background: headerGradient || 'linear-gradient(135deg, #F472B6 0%, #8B5CF6 50%, #06B6D4 100%)' }}
              >
                {/* Decorative circles with smooth animations */}
                <motion.div
                  initial={{ scale: 0, opacity: 0, x: 20 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2,
                    type: 'spring',
                    stiffness: 200,
                    damping: 20
                  }}
                  className="absolute top-4 right-16 w-20 h-20 bg-white/10 rounded-full blur-xl"
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                    type: 'spring',
                    stiffness: 200,
                    damping: 20
                  }}
                  className="absolute bottom-0 left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                />

                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.15,
                    type: 'spring',
                    stiffness: 400,
                    damping: 20
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 90,
                    transition: { type: 'spring', stiffness: 400, damping: 15 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1,
                    type: 'spring',
                    stiffness: 250,
                    damping: 22
                  }}
                  className="relative z-10"
                >
                  {headerContent}
                </motion.div>
              </div>
            )}

            {/* Scrollable content */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 overflow-y-auto overscroll-contain px-6 py-6"
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
