'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export const SplashScreen = () => {
  const [phase, setPhase] = useState<'visible' | 'fadeOut' | 'hidden'>('visible');

  useEffect(() => {
    // Phase 1: Afficher l'animation (2s)
    const fadeTimer = setTimeout(() => setPhase('fadeOut'), 2000);
    // Phase 2: Cacher complètement après le fade (0.5s)
    const hideTimer = setTimeout(() => setPhase('hidden'), 2500);

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
        opacity: phase === 'fadeOut' ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: phase === 'fadeOut' ? 'none' : 'auto',
      }}
    >
      {/* Image de fond */}
      <Image
        src="/images/splash-bg.jpg"
        alt=""
        fill
        className="object-cover"
        priority
      />

      {/* Overlay central pour lisibilité du logo */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at center, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 50%, transparent 80%)',
        }}
      />

      {/* Logo central */}
      <div className="relative flex flex-col items-center animate-splash-logo">
        {/* Goutte / Icône */}
        <div
          className="w-20 h-20 mb-4 animate-splash-bounce"
          style={{
            background: 'linear-gradient(135deg, #FF69B4 0%, #8B5CF6 50%, #06B6D4 100%)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4)',
          }}
        >
          {/* Reflet sur la goutte */}
          <div
            className="absolute top-3 left-4 w-4 h-6 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.4)',
              transform: 'rotate(-20deg)',
            }}
          />
        </div>

        {/* Logo texte */}
        <h1
          className="text-5xl font-black tracking-tight bg-clip-text text-transparent relative"
          style={{
            backgroundImage: 'linear-gradient(120deg, #FF69B4 0%, #8B5CF6 55%, #06B6D4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
          }}
        >
          cleanz
        </h1>

        {/* Tagline */}
        <p
          className="text-sm font-semibold tracking-wide mt-2 animate-splash-tagline"
          style={{ color: '#7C3AED' }}
        >
          L'entretien naturel
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
