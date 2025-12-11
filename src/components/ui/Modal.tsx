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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            className="relative w-full max-w-md max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ background: theme.bgModal }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header with gradient */}
            {headerContent && (
              <div
                className="relative px-6 pt-6 pb-8 flex-shrink-0"
                style={{ background: headerGradient || 'linear-gradient(135deg, #F472B6 0%, #8B5CF6 50%, #06B6D4 100%)' }}
              >
                {/* Decorative circles */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="absolute top-4 right-16 w-20 h-20 bg-white/10 rounded-full blur-xl"
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="absolute bottom-0 left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                />

                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="relative z-10"
                >
                  {headerContent}
                </motion.div>
              </div>
            )}

            {/* Scrollable content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
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
