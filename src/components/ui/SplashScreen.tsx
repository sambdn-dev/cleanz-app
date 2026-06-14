'use client';

import { useState, useEffect } from 'react';

export const SplashScreen = () => {
  const [phase, setPhase] = useState<'visible' | 'fadeOut' | 'hidden'>('visible');

  useEffect(() => {
    // Phase 1: Afficher l'animation (1.8s)
    const fadeTimer = setTimeout(() => setPhase('fadeOut'), 1800);
    // Phase 2: Cacher complètement après le fade (0.5s)
    const hideTimer = setTimeout(() => setPhase('hidden'), 2300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #FFE5F1 0%, #E8D5F2 25%, #D4E5F7 50%, #E5F7F3 75%, #FFF5E5 100%)',
        opacity: phase === 'fadeOut' ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: phase === 'fadeOut' ? 'none' : 'auto',
      }}
    >
      {/* Cercles décoratifs animés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-72 h-72 rounded-full animate-splash-circle-1"
          style={{
            top: '15%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(255,105,180,0.35) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full animate-splash-circle-2"
          style={{
            top: '10%',
            right: '-5%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
            filter: 'blur(35px)',
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full animate-splash-circle-3"
          style={{
            bottom: '5%',
            left: '20%',
            background: 'radial-gradient(circle, rgba(79,209,197,0.3) 0%, transparent 70%)',
            filter: 'blur(45px)',
          }}
        />
      </div>

      {/* Logo central */}
      <div className="relative flex flex-col items-center animate-splash-logo">
        {/* Glow derrière le logo */}
        <div
          className="absolute w-40 h-40 rounded-full animate-splash-glow"
          style={{
            background: 'radial-gradient(circle, rgba(255,105,180,0.4) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Logo texte */}
        <h1
          className="text-6xl font-black tracking-tight bg-clip-text text-transparent relative"
          style={{
            backgroundImage: 'linear-gradient(120deg, #FF69B4 0%, #8B5CF6 55%, #06B6D4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          cleanz
        </h1>

        {/* Tagline */}
        <p
          className="text-sm font-medium tracking-wide mt-2 animate-splash-tagline"
          style={{ color: '#E879A9' }}
        >
          L'entretien naturel, simplifié
        </p>

        {/* Loader dots */}
        <div className="flex gap-1.5 mt-6">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full animate-splash-dot"
              style={{
                background: 'linear-gradient(135deg, #FF69B4, #8B5CF6)',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
