'use client';

import { useState, useRef } from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SPRAYS_INDISPENSABLES } from '@/data/sprays';
import { Spray } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronRight } from 'lucide-react';

interface SpraysSwipeDeckProps {
  onSprayClick: (spray: Spray) => void;
}

const SWIPE_THRESHOLD = 90;

export const SpraysSwipeDeck = ({ onSprayClick }: SpraysSwipeDeckProps) => {
  const { theme, darkMode } = useTheme();
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const moved = useRef(false);

  const total = SPRAYS_INDISPENSABLES.length;

  // Up to 3 cards stacked (current + 2 behind)
  const visible = [0, 1, 2]
    .map((offset) => ({ offset, spray: SPRAYS_INDISPENSABLES[(index + offset) % total] }))
    .reverse(); // render back cards first

  const goNext = () => {
    setIndex((i) => (i + 1) % total);
    setDrag(0);
  };

  const handleStart = (clientX: number) => {
    startX.current = clientX;
    moved.current = false;
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - startX.current;
    if (Math.abs(delta) > 5) moved.current = true;
    setDrag(delta);
  };

  const handleEnd = (spray: Spray) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(drag) > SWIPE_THRESHOLD) {
      // Animate the card flying off then advance
      setDrag(drag > 0 ? 600 : -600);
      setTimeout(goNext, 180);
    } else if (!moved.current) {
      // Treat as a tap -> open modal
      onSprayClick(spray);
      setDrag(0);
    } else {
      setDrag(0);
    }
  };

  return (
    <div className="mb-5">
      <SectionTitle badge="Glissez ou tapez">
        <span className="text-base mr-2">🧴</span>Les Indispensables
      </SectionTitle>

      {/* Card stack */}
      <div className="relative h-44 mt-1" style={{ perspective: '1000px' }}>
        {visible.map(({ offset, spray }) => {
          const isTop = offset === 0;
          const rotate = isTop ? drag / 18 : 0;
          const translateX = isTop ? drag : 0;
          const scale = 1 - offset * 0.05;
          const translateY = offset * 12;
          const opacity = offset === 2 ? 0.6 : 1;

          return (
            <div
              key={`${spray.id}-${offset}`}
              onMouseDown={isTop ? (e) => handleStart(e.clientX) : undefined}
              onMouseMove={isTop ? (e) => handleMove(e.clientX) : undefined}
              onMouseUp={isTop ? () => handleEnd(spray) : undefined}
              onMouseLeave={isTop && isDragging ? () => handleEnd(spray) : undefined}
              onTouchStart={isTop ? (e) => handleStart(e.touches[0].clientX) : undefined}
              onTouchMove={isTop ? (e) => handleMove(e.touches[0].clientX) : undefined}
              onTouchEnd={isTop ? () => handleEnd(spray) : undefined}
              className="absolute inset-0 rounded-3xl p-5 flex flex-col justify-between overflow-hidden select-none"
              style={{
                background: spray.gradient,
                transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                opacity,
                zIndex: 10 - offset,
                boxShadow: isTop
                  ? '0 12px 30px rgba(0,0,0,0.20)'
                  : '0 6px 16px rgba(0,0,0,0.12)',
                transition: isDragging && isTop ? 'none' : 'transform 0.3s ease, opacity 0.3s ease',
                cursor: isTop ? (isDragging ? 'grabbing' : 'grab') : 'default',
                touchAction: 'pan-y',
              }}
            >
              {/* Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-white/30 text-white px-2.5 py-1 rounded-full font-semibold backdrop-blur-sm">
                  {spray.badge}
                </span>
                <span className="text-4xl">{spray.emoji}</span>
              </div>

              {/* Title + ingredients preview */}
              <div>
                <h3 className="text-white font-bold text-lg leading-tight mb-1">{spray.nom}</h3>
                <div className="flex flex-wrap gap-1">
                  {spray.ingredients.slice(0, 3).map((ing, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-white/20 text-white/90 px-2 py-0.5 rounded-full font-medium"
                    >
                      {ing.nom}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tap hint */}
              {isTop && (
                <div className="absolute bottom-3 right-4 flex items-center gap-1 text-white/80 text-[10px] font-medium">
                  Détails <ChevronRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {SPRAYS_INDISPENSABLES.map((s, i) => (
          <span
            key={s.id}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === index ? 18 : 6,
              height: 6,
              background: i === index ? theme.accentPink : (darkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)'),
            }}
          />
        ))}
      </div>
    </div>
  );
};
