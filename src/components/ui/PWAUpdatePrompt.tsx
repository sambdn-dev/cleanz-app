'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { RefreshCw, X, Sparkles } from 'lucide-react';

export const PWAUpdatePrompt = () => {
  const { darkMode } = useTheme();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    let registration: ServiceWorkerRegistration | null = null;

    // URL stable : le CONTENU de /sw.js change à chaque déploiement (SHA intégré),
    // donc registration.update() détecte la MAJ sans recharger la page.
    // updateViaCache:'none' force le navigateur à toujours re-télécharger le script.
    navigator.serviceWorker
      .register('/sw.js', { updateViaCache: 'none' })
      .then((reg) => {
        registration = reg;

        const promptFor = (worker: ServiceWorker | null) => {
          if (worker && navigator.serviceWorker.controller) {
            setWaitingWorker(worker);
            setShowUpdateModal(true);
          }
        };

        // Un worker est déjà en attente (MAJ détectée avant le montage)
        if (reg.waiting) promptFor(reg.waiting);

        // Nouvelle version trouvée → on guette son passage à "installed"
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker?.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') promptFor(newWorker);
          });
        });

        // Vérifie tout de suite
        reg.update().catch(() => {});
      })
      .catch(() => {
        /* enregistrement impossible (ex. navigation privée) : on ignore */
      });

    // Recharge la page une fois le nouveau worker actif (après clic « Actualiser »)
    let refreshing = false;
    const onControllerChange = () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    };
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    // Vérifie une MAJ régulièrement ET quand l'app revient au premier plan
    // (essentiel pour une PWA qu'on rouvre depuis l'écran d'accueil).
    const checkForUpdate = () => registration?.update().catch(() => {});
    const interval = setInterval(checkForUpdate, 30 * 1000);
    const onVisible = () => { if (document.visibilityState === 'visible') checkForUpdate(); };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
    };
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    setShowUpdateModal(false);
  };

  const handleDismiss = () => {
    setShowUpdateModal(false);
  };

  if (!showUpdateModal) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-sm p-6 rounded-3xl"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, #1F2937 0%, #111827 100%)'
            : 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 rounded-full transition-colors"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
          }}
        >
          <X className="w-4 h-4" style={{ color: darkMode ? '#9CA3AF' : '#6B7280' }} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #FF69B4 0%, #8B5CF6 100%)',
              boxShadow: '0 8px 20px rgba(255, 105, 180, 0.3)'
            }}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold text-center mb-2"
          style={{ color: darkMode ? '#F9FAFB' : '#111827' }}
        >
          Nouvelle version disponible !
        </h3>

        {/* Description */}
        <p
          className="text-sm text-center mb-6 leading-relaxed"
          style={{ color: darkMode ? '#9CA3AF' : '#6B7280' }}
        >
          De nouvelles recettes et améliorations sont prêtes. Actualisez pour en profiter !
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleDismiss}
            className="flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all active:scale-95"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              color: darkMode ? '#D1D5DB' : '#4B5563'
            }}
          >
            Plus tard
          </button>
          <button
            onClick={handleUpdate}
            className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm text-white transition-all active:scale-95 flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #FF69B4 0%, #8B5CF6 100%)',
              boxShadow: '0 4px 12px rgba(255, 105, 180, 0.3)'
            }}
          >
            <RefreshCw className="w-4 h-4" />
            Actualiser
          </button>
        </div>
      </div>
    </>
  );
};
