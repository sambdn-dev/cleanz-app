'use client';

import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  headerGradient?: string;
  headerContent?: ReactNode;
  useDarkHeaderText?: boolean;
}

export function Modal({ isOpen, onClose, children, headerGradient, headerContent, useDarkHeaderText = false }: ModalProps) {
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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
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
            className="relative px-6 pt-6 pb-8 flex-shrink-0"
            style={{ background: headerGradient || 'linear-gradient(135deg, #F472B6 0%, #8B5CF6 50%, #06B6D4 100%)' }}
          >
            {/* Decorative circles */}
            <div className="absolute top-4 right-16 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            <div className="absolute bottom-0 left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

            {/* Close button - larger touch area with smaller visible icon */}
            <button
              onClick={onClose}
              className="absolute top-0 right-0 p-5 group"
            >
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
                style={{
                  background: useDarkHeaderText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)',
                }}
              >
                <X
                  className="w-5 h-5"
                  style={{ color: useDarkHeaderText ? '#374151' : '#FFFFFF' }}
                />
              </span>
            </button>

            <div className="relative z-10">
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
