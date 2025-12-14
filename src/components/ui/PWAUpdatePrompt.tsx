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

    const handleServiceWorkerUpdate = () => {
      navigator.serviceWorker.ready.then((registration) => {
        // Check for updates periodically
        registration.update();

        // Listen for new service worker waiting
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available
                setWaitingWorker(newWorker);
                setShowUpdateModal(true);
              }
            });
          }
        });

        // Check if there's already a waiting worker
        if (registration.waiting && navigator.serviceWorker.controller) {
          setWaitingWorker(registration.waiting);
          setShowUpdateModal(true);
        }
      });

      // Handle controller change (when skipWaiting is called)
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    };

    handleServiceWorkerUpdate();

    // Check for updates every 5 minutes
    const interval = setInterval(() => {
      navigator.serviceWorker.ready.then((registration) => {
        registration.update();
      });
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
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
