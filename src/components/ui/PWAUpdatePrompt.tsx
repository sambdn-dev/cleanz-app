'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { RefreshCw, X } from 'lucide-react';

export const PWAUpdatePrompt = () => {
  const { darkMode, theme } = useTheme();
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

    // Recharge la page une fois le nouveau worker actif (après clic « Actualiser »).
    //
    // ⚠️ PERFORMANCE : `controllerchange` se déclenche AUSSI à la toute première
    // visite, quand le service worker s'installe et appelle `clients.claim()`.
    // Recharger dans ce cas faisait charger la page DEUX FOIS à chaque première
    // ouverture — la cause principale de la lenteur au démarrage. On ne recharge
    // donc que s'il y avait déjà un worker aux commandes (vraie mise à jour).
    const avaitUnControleur = !!navigator.serviceWorker.controller;
    let refreshing = false;
    const onControllerChange = () => {
      if (!avaitUnControleur) return;
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

  const brandGradient = 'linear-gradient(135deg, #FF69B4 0%, #8B5CF6 50%, #06B6D4 100%)';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Modal — même famille visuelle que la modale « Nouveautés » */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-sm rounded-3xl overflow-hidden animate-slideUp"
        style={{
          background: darkMode ? '#2D1B4E' : 'white',
          boxShadow: '0 25px 60px rgba(0,0,0,0.32)',
        }}
      >
        {/* Bandeau dégradé doux (design system Cleanz) */}
        <div
          className="relative px-5 pt-5 pb-5 overflow-hidden"
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, rgba(255,133,192,0.24) 0%, rgba(167,139,250,0.20) 50%, rgba(94,234,212,0.18) 100%)'
              : 'linear-gradient(135deg, #FFE5F1 0%, #F0E5FB 50%, #E5F7F3 100%)',
          }}
        >
          {/* Blob décoratif */}
          <div
            className="absolute -top-12 -right-10 w-36 h-36 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)' }}
          />

          {/* Fermer */}
          <button
            onClick={handleDismiss}
            aria-label="Plus tard"
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90"
            style={{ background: darkMode ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.7)' }}
          >
            <X className="w-4 h-4" style={{ color: theme.textSecondary }} />
          </button>

          {/* Pastille + label */}
          <div className="relative flex items-center gap-3 mb-3">
            <div
              className="w-11 h-11 rounded-2xl overflow-hidden flex-shrink-0"
              style={{ boxShadow: '0 8px 18px rgba(139,92,246,0.35)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/icon.svg" alt="Cleanz" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: theme.accentPink }}>
                Mise à jour
              </p>
              <p className="text-[11px] font-semibold" style={{ color: theme.textMuted }}>
                Une version plus fraîche est prête
              </p>
            </div>
          </div>

          {/* Titre éditorial */}
          <h3
            className="relative font-display text-2xl font-extrabold leading-tight"
            style={{ color: theme.textPrimary }}
          >
            Nouvelle version disponible
          </h3>
        </div>

        {/* Corps */}
        <div className="px-5 pt-4 pb-5">
          <p className="text-sm leading-relaxed mb-5" style={{ color: theme.textSecondary }}>
            De nouvelles recettes et améliorations vous attendent. Actualisez pour en profiter
            en un instant.
          </p>

          {/* Boutons (CTA principal plus large) */}
          <div className="flex gap-2.5">
            <button
              onClick={handleDismiss}
              className="flex-1 py-3 px-4 rounded-2xl font-semibold text-sm transition-all active:scale-95"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                color: theme.textSecondary,
              }}
            >
              Plus tard
            </button>
            <button
              onClick={handleUpdate}
              className="flex-[1.5] py-3 px-4 rounded-2xl font-bold text-sm text-white transition-all active:scale-95 flex items-center justify-center gap-2"
              style={{ background: brandGradient, boxShadow: '0 8px 22px rgba(139,92,246,0.38)' }}
            >
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
