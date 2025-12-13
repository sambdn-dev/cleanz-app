'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { X, Share, Plus } from 'lucide-react';

export const PWAInstallPrompt = () => {
  const { theme, darkMode } = useTheme();
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already dismissed
    const dismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (dismissed) return;

    // Check if already installed (standalone mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as Navigator & { standalone?: boolean }).standalone
      || document.referrer.includes('android-app://');

    if (isStandalone) return;

    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Show prompt after a delay
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div
      className="fixed bottom-20 left-4 right-4 z-40 rounded-2xl p-4 shadow-lg animate-slideUp"
      style={{
        background: darkMode
          ? 'linear-gradient(135deg, rgba(45,27,78,0.98) 0%, rgba(30,58,95,0.98) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,240,252,0.98) 100%)',
        border: darkMode
          ? '1px solid rgba(255,255,255,0.1)'
          : '1px solid rgba(255,105,180,0.2)',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {/* Close button */}
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-2 rounded-full transition-colors"
        style={{
          background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
        }}
      >
        <X className="w-4 h-4" style={{ color: theme.textMuted }} />
      </button>

      {/* Content */}
      <div className="flex items-start gap-3 pr-8">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #FF69B4 0%, #8B5CF6 50%, #06B6D4 100%)',
          }}
        >
          <span className="text-2xl">💧</span>
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-sm mb-1" style={{ color: theme.textPrimary }}>
            Installer Cleanz
          </h3>
          <p className="text-xs leading-relaxed mb-3" style={{ color: theme.textSecondary }}>
            Pour une meilleure expérience, ajoutez l'application à votre écran d'accueil !
          </p>

          {isIOS ? (
            <div
              className="flex items-center gap-2 text-xs p-2 rounded-lg"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                color: theme.textSecondary,
              }}
            >
              <span>Appuyez sur</span>
              <Share className="w-4 h-4 text-blue-500" />
              <span>puis</span>
              <span className="font-semibold" style={{ color: theme.textPrimary }}>
                "Sur l'écran d'accueil"
              </span>
            </div>
          ) : (
            <div
              className="flex items-center gap-2 text-xs p-2 rounded-lg"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                color: theme.textSecondary,
              }}
            >
              <span>Appuyez sur</span>
              <span className="font-semibold">⋮</span>
              <span>puis</span>
              <Plus className="w-4 h-4" />
              <span className="font-semibold" style={{ color: theme.textPrimary }}>
                "Installer"
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
