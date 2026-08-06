'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getBlur } from '@/data/imageBlur';
import { useTheme } from '@/contexts/ThemeContext';

export const SplashScreen = () => {
  const { darkMode } = useTheme();
  const [phase, setPhase] = useState<'visible' | 'fadeOut' | 'hidden'>('visible');
  const [imgLoaded, setImgLoaded] = useState(false);

  const splashImage = darkMode ? '/images/splash-bg-dark.jpg' : '/images/splash-bg.jpg';

  /**
   * L'effacement lui-même est piloté par CSS (classe `splash-auto-out`), donc
   * calé sur la peinture de la page et non sur l'hydratation JavaScript, qui
   * arrive une à deux secondes plus tard sur un téléphone modeste.
   *
   * Le JavaScript ne sert plus qu'à retirer le nœud du DOM une fois l'animation
   * terminée. Si l'hydratation intervient après coup, on retire directement.
   */
  useEffect(() => {
    const FIN_ANIMATION = 1050; // 620 ms d'attente + 360 ms de fondu, arrondi

    if (performance.now() > FIN_ANIMATION) {
      setPhase('hidden');
      return;
    }
    const timer = setTimeout(
      () => setPhase('hidden'),
      FIN_ANIMATION - performance.now()
    );
    return () => clearTimeout(timer);
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div
      className="splash-auto-out fixed inset-0 z-[9999] flex items-center justify-center"
      aria-hidden
    >
      {/* Image de fond (light ou dark) avec déblur progressif au chargement */}
      <Image
        src={splashImage}
        alt=""
        fill
        className="object-cover"
        priority
        // `sizes` explicite : sans lui, le préchargement et la balise <img>
        // choisissaient deux tailles différentes → l'image était téléchargée
        // DEUX fois. L'image est de toute façon floutée puis voilée : une
        // petite définition et une qualité modeste suffisent.
        sizes="60vw"
        quality={55}
        placeholder="blur"
        blurDataURL={getBlur(splashImage)}
        onLoad={() => setImgLoaded(true)}
        style={{
          filter: imgLoaded ? 'blur(0px)' : 'blur(22px)',
          transform: imgLoaded ? 'scale(1)' : 'scale(1.08)',
          transition: 'filter 0.9s ease-out, transform 0.9s ease-out',
        }}
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
        {/* Halo subtil derrière le logo (fait ressortir logo + typo sans être trop marqué) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"
          style={{
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: darkMode
              ? 'radial-gradient(circle, rgba(20,14,30,0.45) 0%, transparent 65%)'
              : 'radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 65%)',
          }}
        />

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
          style={{
            color: darkMode ? '#C4B5FD' : '#7C3AED',
            textShadow: darkMode ? '0 1px 6px rgba(0,0,0,0.4)' : '0 1px 6px rgba(255,255,255,0.6)',
          }}
        >
          L&apos;entretien naturel, simplifié.
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
