'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const cards = [
  {
    icon: '💰',
    title: 'ÉCONOMIES',
    value: '280€',
    numericValue: 280,
    suffix: '€',
    subtitle: 'par an en moyenne',
    detail: '7 ingrédients remplacent 50+ produits',
    gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 50%, #6EE7B7 100%)',
    bgLight: 'rgba(16,185,129,0.15)',
    dotColor: '#10B981'
  },
  {
    icon: '🌍',
    title: 'PLANÈTE',
    value: '-85%',
    numericValue: 85,
    suffix: '%',
    prefix: '-',
    subtitle: 'de plastique',
    detail: '40 flacons évités par an',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #93C5FD 100%)',
    bgLight: 'rgba(59,130,246,0.15)',
    dotColor: '#3B82F6'
  },
  {
    icon: '🏥',
    title: 'SANTÉ',
    value: '0',
    numericValue: 0,
    suffix: '',
    subtitle: 'toxique',
    detail: 'Zéro perturbateur endocrinien',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 50%, #FBCFE8 100%)',
    bgLight: 'rgba(236,72,153,0.15)',
    dotColor: '#EC4899'
  },
  {
    icon: '✨',
    title: 'SIMPLICITÉ',
    value: '7',
    numericValue: 7,
    suffix: '',
    subtitle: 'essentiels',
    detail: 'Pour toute la maison, jardin & auto',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #FDE68A 100%)',
    bgLight: 'rgba(245,158,11,0.15)',
    dotColor: '#F59E0B'
  },
];

export const EconomiesWidget = () => {
  const { theme, darkMode } = useTheme();
  const [activeCard, setActiveCard] = useState(0);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animation du compteur au scroll (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Animate each value
            cards.forEach((card, index) => {
              const targetValue = card.numericValue;
              const duration = 2000;
              const steps = 40;
              const increment = targetValue / steps;
              let current = 0;

              const interval = setInterval(() => {
                current += increment;
                if (current >= targetValue) {
                  setAnimatedValues(prev => {
                    const newValues = [...prev];
                    newValues[index] = targetValue;
                    return newValues;
                  });
                  clearInterval(interval);
                } else {
                  setAnimatedValues(prev => {
                    const newValues = [...prev];
                    newValues[index] = Math.floor(current);
                    return newValues;
                  });
                }
              }, duration / steps);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (widgetRef.current) observer.observe(widgetRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Auto-rotation du carrousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getDisplayValue = (index: number) => {
    const card = cards[index];
    const value = animatedValues[index];
    return `${card.prefix || ''}${value}${card.suffix}`;
  };

  return (
    <div
      ref={widgetRef}
      className="mt-6 mb-5 rounded-3xl overflow-hidden relative p-5"
      style={{
        background: darkMode
          ? 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(59,130,246,0.12) 25%, rgba(236,72,153,0.12) 50%, rgba(245,158,11,0.12) 75%, rgba(16,185,129,0.12) 100%)'
          : 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(59,130,246,0.08) 25%, rgba(236,72,153,0.08) 50%, rgba(245,158,11,0.08) 75%, rgba(16,185,129,0.08) 100%)',
        border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)'
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-green-400 opacity-60 animate-bounce-gentle" style={{ animationDelay: '0s' }} />
        <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-blue-400 opacity-50 animate-bounce-gentle" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-12 left-1/4 w-2 h-2 rounded-full bg-pink-400 opacity-60 animate-bounce-gentle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-6 right-1/3 w-2 h-2 rounded-full bg-amber-400 opacity-50 animate-bounce-gentle" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 50%, #EC4899 100%)' }}
        >
          <span className="text-lg">🌱</span>
        </div>
        <div>
          <h3 className="text-sm font-bold" style={{ color: theme.textPrimary }}>
            Pourquoi passer au naturel ?
          </h3>
          <p className="text-[10px]" style={{ color: theme.textMuted }}>
            Comparatif avec les produits industriels
          </p>
        </div>
      </div>

      {/* Carrousel principal */}
      <div className="relative h-32 mb-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="absolute inset-0 rounded-2xl p-4 transition-all duration-700 ease-out"
            style={{
              background: card.gradient,
              opacity: activeCard === index ? 1 : 0,
              transform: activeCard === index ? 'translateX(0) scale(1)' : 'translateX(20px) scale(0.95)',
              pointerEvents: activeCard === index ? 'auto' : 'none',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
            }}
          >
            <div className="flex items-start justify-between h-full">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{card.icon}</span>
                    <span className="text-xs font-bold text-white/90 uppercase tracking-wider">
                      {card.title}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">
                      {getDisplayValue(index)}
                    </span>
                    <span className="text-sm font-medium text-white/80">{card.subtitle}</span>
                  </div>
                </div>
                <p className="text-xs text-white/70 font-medium">{card.detail}</p>
              </div>
              {/* Grande icône à droite */}
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">{card.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicateurs dots */}
      <div className="flex justify-center gap-2 mb-4">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => setActiveCard(index)}
            className="transition-all duration-300"
            style={{
              width: activeCard === index ? '20px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: activeCard === index
                ? card.dotColor
                : darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'
            }}
          />
        ))}
      </div>

      {/* Mini stats cliquables */}
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => setActiveCard(index)}
            className="p-2 rounded-xl text-center transition-all duration-300"
            style={{
              background: activeCard === index ? card.bgLight : 'transparent',
              transform: activeCard === index ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <span className="text-lg block mb-0.5">{card.icon}</span>
            <span className="text-[9px] font-bold block" style={{ color: theme.textPrimary }}>
              {getDisplayValue(index)}
            </span>
          </button>
        ))}
      </div>

      {/* Message de conclusion */}
      <div
        className="mt-4 p-3 rounded-xl text-center"
        style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
      >
        <p className="text-[11px] leading-relaxed" style={{ color: theme.textSecondary }}>
          <span className="font-bold" style={{ color: theme.textPrimary }}>1 foyer français</span> utilise en moyenne{' '}
          <span className="font-bold text-pink-500">50+ produits chimiques</span> différents. Avec Cleanz,{' '}
          <span className="font-bold text-green-500">7 ingrédients naturels</span> suffisent ! 🌿
        </p>
      </div>
    </div>
  );
};
