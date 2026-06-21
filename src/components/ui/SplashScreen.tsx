'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getBlur } from '@/data/imageBlur';
import { useTheme } from '@/contexts/ThemeContext';

export const SplashScreen = () => {
  const { darkMode } = useTheme();
  const [phase, setPhase] = useState<'visible' | 'fadeOut' | 'hidden'>('visible');

  const splashImage = darkMode ? '/images/splash-bg-dark.jpg' : '/images/splash-bg.jpg';

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase('fadeOut'), 2000);
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
      {/* Image de fond (light ou dark) */}
      <Image
        src={splashImage}
        alt=""
        fill
        className="object-cover"
        priority
        placeholder="blur"
        blurDataURL={getBlur(splashImage)}
      />

      {/* Overlay adapté au mode */}
      <div
        className="absolute inset-0"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse 85% 65% at center 45%, rgba(15,10,5,0.6) 0%, rgba(10,8,5,0.3) 50%, transparent 80%)'
            : 'radial-gradient(ellipse 80% 60% at center 45%, rgba(255,250,245,0.8) 0%, rgba(255,248,240,0.4) 45%, transparent 75%)',
        }}
      />

      {/* Logo central */}
      <div className="relative flex flex-col items-center animate-splash-logo">
        {/* Goutte / Icône */}
        <div
          className="w-20 h-20 mb-4 animate-splash-bounce relative"
          style={{
            background: 'linear-gradient(135deg, #FF69B4 0%, #8B5CF6 50%, #06B6D4 100%)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            boxShadow: darkMode
              ? '0 8px 32px rgba(139, 92, 246, 0.5), 0 0 60px rgba(255,105,180,0.2)'
              : '0 8px 32px rgba(139, 92, 246, 0.4)',
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
          className="font-display text-5xl font-extrabold tracking-tight bg-clip-text text-transparent relative"
          style={{
            backgroundImage: 'linear-gradient(120deg, #FF69B4 0%, #8B5CF6 55%, #06B6D4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: darkMode ? 'drop-shadow(0 2px 8px rgba(139,92,246,0.5))' : 'none',
          }}
        >
          cleanz
        </h1>

        {/* Tagline */}
        <p
          className="text-sm font-semibold tracking-wide mt-2 animate-splash-tagline"
          style={{ color: darkMode ? '#C4B5FD' : '#7C3AED' }}
        >
          L&apos;entretien naturel
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
