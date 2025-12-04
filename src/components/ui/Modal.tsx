'use client';

import { X, ArrowLeft } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  headerGradient?: string;
  headerContent?: ReactNode;
}

// Default pastel gradient (pink to mint with teal accents)
const DEFAULT_GRADIENT = 'linear-gradient(135deg, #FFB6C1 0%, #E8D5E0 25%, #B5E8E3 50%, #98D4C8 75%, #7FCEC5 100%)';

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-md max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-slideUp"
        style={{ background: theme.bgModal }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header with gradient */}
        {headerContent && (
          <div
            className="relative px-6 pt-6 pb-8 flex-shrink-0 overflow-hidden"
            style={{ background: headerGradient || DEFAULT_GRADIENT }}
          >
            {/* Decorative circles - mint/teal */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-40"
              style={{ background: 'radial-gradient(circle, rgba(127,206,197,0.6) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
            />
            <div className="absolute bottom-0 right-1/4 w-24 h-24 rounded-full opacity-30"
              style={{ background: 'radial-gradient(circle, rgba(181,232,227,0.8) 0%, transparent 70%)', transform: 'translateY(30%)' }}
            />
            <div className="absolute top-1/2 left-0 w-20 h-20 rounded-full opacity-25"
              style={{ background: 'radial-gradient(circle, rgba(152,212,200,0.6) 0%, transparent 70%)', transform: 'translate(-30%, -50%)' }}
            />

            {/* Back/Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-full bg-white/30 hover:bg-white/40 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>

            <div className="relative z-10 mt-8">
              {headerContent}
            </div>
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
