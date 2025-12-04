'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { TIPS } from '@/data/tips';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const LeSaviezVousSection = () => {
  const { theme, darkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextTip = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TIPS.length);
  }, []);

  const prevTip = () => {
    setCurrentIndex((prev) => (prev - 1 + TIPS.length) % TIPS.length);
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextTip();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, nextTip]);

  const currentTip = TIPS[currentIndex];

  return (
    <div className="mb-6">
      {/* Card with pink gradient */}
      <div
        className="relative p-5 rounded-3xl overflow-hidden"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, rgba(236,72,153,0.25) 0%, rgba(255,182,193,0.15) 50%, rgba(200,220,240,0.1) 100%)'
            : 'linear-gradient(135deg, rgba(255,182,193,0.5) 0%, rgba(255,218,225,0.4) 50%, rgba(220,240,250,0.3) 100%)',
          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,182,193,0.3)'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          {/* Icon + Title */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: darkMode
                  ? 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)'
                  : 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)'
              }}
            >
              <span className="text-base">💡</span>
            </div>
            <span
              className="text-xs font-bold tracking-wide uppercase"
              style={{ color: '#EC4899' }}
            >
              Le saviez-vous ?
            </span>
          </div>

          {/* Counter */}
          <span
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(236,72,153,0.1)',
              color: darkMode ? 'rgba(255,255,255,0.6)' : '#EC4899'
            }}
          >
            {currentIndex + 1}/{TIPS.length}
          </span>
        </div>

        {/* Content - Large text */}
        <p
          className="text-base font-medium leading-relaxed mb-6 min-h-[60px]"
          style={{ color: theme.textPrimary }}
        >
          {currentTip.contenu}
        </p>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          {/* Left arrow */}
          <button
            onClick={prevTip}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{
              background: darkMode ? 'rgba(236,72,153,0.2)' : 'rgba(236,72,153,0.15)'
            }}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: '#EC4899' }} />
          </button>

          {/* Dots */}
          <div className="flex gap-1.5 items-center">
            {TIPS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-4' : 'w-2'
                }`}
                style={{
                  background: index === currentIndex
                    ? '#EC4899'
                    : darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(236,72,153,0.25)'
                }}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={nextTip}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{
              background: darkMode ? 'rgba(236,72,153,0.2)' : 'rgba(236,72,153,0.15)'
            }}
          >
            <ChevronRight className="w-5 h-5" style={{ color: '#EC4899' }} />
          </button>
        </div>
      </div>
    </div>
  );
};
