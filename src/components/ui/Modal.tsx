'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getBlur } from '@/data/imageBlur';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  headerGradient?: string;
  headerImageUrl?: string;
  /** Variante sombre/cosy de la photo d'en-tête, utilisée en mode sombre si fournie. */
  headerImageUrlDark?: string;
  headerContent?: ReactNode;
  useDarkHeaderText?: boolean;
}

export function Modal({ isOpen, onClose, children, headerGradient, headerImageUrl, headerImageUrlDark, headerContent, useDarkHeaderText = false }: ModalProps) {
  const { theme, darkMode } = useTheme();
  // En mode sombre, privilégie la photo cosy dédiée si elle existe, sinon repli sur la photo claire.
  const effectiveImageUrl = (darkMode && headerImageUrlDark) ? headerImageUrlDark : headerImageUrl;
  // Si l'image échoue à charger (fichier manquant), repli propre sur le dégradé.
  // On mémorise l'URL qui a échoué : si l'URL change, l'image est retentée
  // sans avoir besoin d'un effet de réinitialisation.
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const hasImage = !!effectiveImageUrl && failedUrl !== effectiveImageUrl;

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
        {/* Header with gradient or image */}
        {headerContent && (
          <div
            className="relative flex-shrink-0 overflow-hidden modal-grain"
            style={{ background: headerGradient || 'linear-gradient(135deg, #F472B6 0%, #8B5CF6 50%, #06B6D4 100%)' }}
          >
            {/* Photo de couverture plein cadre */}
            {hasImage && (
              <>
                <Image
                  src={effectiveImageUrl!}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                  placeholder={getBlur(effectiveImageUrl!) ? 'blur' : 'empty'}
                  blurDataURL={getBlur(effectiveImageUrl!)}
                  onError={() => setFailedUrl(effectiveImageUrl!)}
                  priority
                />
                {/* Voile dégradé plus profond en bas pour ancrer le titre */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                {/* Léger flou en haut (fondu vers le bas) : fait ressortir le titre + le ✕ sans masquer la photo */}
                <div
                  className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                  style={{
                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(5px)',
                    maskImage: 'linear-gradient(to bottom, black 32%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 32%, transparent 100%)',
                  }}
                />
              </>
            )}

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="absolute top-0 right-0 p-5 z-20"
            >
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
                style={{
                  background: hasImage ? 'rgba(0,0,0,0.4)' : (useDarkHeaderText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)'),
                  backdropFilter: hasImage ? 'blur(4px)' : undefined,
                }}
              >
                <X
                  className="w-5 h-5"
                  style={{ color: hasImage ? '#FFFFFF' : (useDarkHeaderText ? '#374151' : '#FFFFFF') }}
                />
              </span>
            </button>

            {/* Content avec padding — pr-14 réserve la place du bouton Fermer (✕) */}
            <div className="relative z-10 pl-6 pr-14 pt-6 pb-7">
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
