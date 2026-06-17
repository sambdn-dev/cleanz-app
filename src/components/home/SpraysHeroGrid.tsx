'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SPRAYS_INDISPENSABLES } from '@/data/sprays';
import { getBlur } from '@/data/imageBlur';
import { Spray } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { shouldUseDarkText } from '@/utils/gradientUtils';
import { haptic } from '@/utils/haptics';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface SpraysHeroGridProps {
  onSprayClick: (spray: Spray) => void;
}

const TOTAL = SPRAYS_INDISPENSABLES.length;
const SWIPE_THRESHOLD = 55;

// Couleurs distinctes pour les bandes de produit dans le flacon (fallback sans photo)
const BAND_COLORS = ['#5BA0F2', '#37C9A6', '#F4B740', '#EF7DAE', '#A78BFA', '#22CCD6'];

// Convertit une quantité texte en millilitres approximatifs (pour les proportions)
const toMl = (q: string): number => {
  const lower = q.toLowerCase().replace(',', '.');
  const num = parseFloat(lower) || 1;
  if (lower.includes('ml')) return num;
  if (lower.includes('c.à.s') || lower.includes('c.a.s') || lower.includes('soupe')) return num * 15;
  if (lower.includes('c.à.c') || lower.includes('c.a.c') || lower.includes('café')) return num * 5;
  if (lower.includes('goutte')) return num * 0.05;
  return num;
};

// Calcule les proportions visibles (chaque ingrédient a un minimum pour rester visible)
const getBands = (spray: Spray) => {
  const volumes = spray.ingredients.map((i) => toMl(i.quantite));
  const total = volumes.reduce((a, b) => a + b, 0) || 1;
  const MIN = 0.09;
  let props = volumes.map((v) => Math.max(v / total, MIN));
  const sum = props.reduce((a, b) => a + b, 0);
  props = props.map((p) => p / sum);
  return spray.ingredients.map((ing, i) => ({
    nom: ing.nom,
    quantite: ing.quantite,
    prop: props[i],
    color: BAND_COLORS[i % BAND_COLORS.length],
  }));
};

// Flacon spray en SVG, rempli de bandes proportionnelles (fallback sans photo)
const SprayBottle = ({ bands }: { bands: ReturnType<typeof getBands> }) => {
  const TOP = 62;
  const BOTTOM = 166;
  const H = BOTTOM - TOP;
  let yCursor = BOTTOM;
  const rects = bands.map((b, i) => {
    const h = b.prop * H;
    const y = yCursor - h;
    yCursor = y;
    return <rect key={i} x="32" y={y} width="56" height={h + 0.5} fill={b.color} />;
  });

  return (
    <svg viewBox="0 0 112 178" className="w-full h-full" style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.18))' }}>
      <defs>
        <clipPath id="bottleBody">
          <rect x="32" y="60" width="56" height="106" rx="16" />
        </clipPath>
        <linearGradient id="glassShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="35%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <rect x="48" y="46" width="24" height="16" fill="rgba(255,255,255,0.92)" />
      <rect x="44" y="22" width="42" height="26" rx="8" fill="rgba(255,255,255,0.92)" />
      <rect x="14" y="28" width="32" height="9" rx="4" fill="rgba(255,255,255,0.92)" />
      <path d="M48 36 L34 52 L43 55 L54 40 Z" fill="rgba(255,255,255,0.82)" />
      <rect x="32" y="60" width="56" height="106" rx="16" fill="rgba(255,255,255,0.20)" />
      <g clipPath="url(#bottleBody)">
        {rects}
        <rect x="32" y="60" width="56" height="106" fill="url(#glassShine)" />
      </g>
      <rect x="32" y="60" width="56" height="106" rx="16" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" />
    </svg>
  );
};

// Une diapositive du carrousel. Toutes les diapos sont montées en permanence dans
// le « track », ce qui permet de précharger les images et d'obtenir un swipe
// instantané (pas de re-fetch, pas d'image figée sur l'ancienne photo).
const HeroSlide = ({ spray, priority }: { spray: Spray; priority: boolean }) => {
  const hasImage = !!spray.imageUrl;
  const blur = getBlur(spray.imageUrl);
  // Avec photo : voile clair à gauche + texte sombre (look pastel premium)
  const darkText = hasImage ? true : shouldUseDarkText(spray.gradient);
  const txt = darkText ? '#2D1F3D' : '#FFFFFF';
  const txtSoft = darkText ? 'rgba(45,31,61,0.7)' : 'rgba(255,255,255,0.85)';
  const bands = getBands(spray);

  return (
    <div
      className="relative h-full flex-shrink-0 p-4 flex"
      style={{ width: '100%', background: hasImage ? '#EFE7F8' : spray.gradient }}
    >
      {/* Photo de fond (produit à droite, zone claire à gauche) */}
      {hasImage && (
        <>
          <Image
            src={spray.imageUrl!}
            alt={spray.nom}
            fill
            className="object-cover object-right pointer-events-none"
            sizes="(max-width: 768px) 100vw, 460px"
            placeholder={blur ? 'blur' : 'empty'}
            blurDataURL={blur}
            priority={priority}
            {...(!priority && { loading: 'eager' as const })}
            draggable={false}
          />
          {/* Voile clair à gauche pour la lisibilité du texte sombre */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/55 to-transparent pointer-events-none" />
        </>
      )}

      {/* Colonne gauche : badge + titre + CTA */}
      <div
        className={`flex flex-col min-w-0 pr-2 pointer-events-none ${hasImage ? 'relative z-10' : 'flex-1'}`}
        style={hasImage ? { maxWidth: '64%' } : undefined}
      >
        <span
          className="self-start text-[10px] px-2.5 py-1 rounded-full font-semibold backdrop-blur-sm"
          style={{
            background: hasImage ? 'rgba(255,255,255,0.8)' : (darkText ? 'rgba(45,31,61,0.12)' : 'rgba(255,255,255,0.3)'),
            color: txt,
            boxShadow: hasImage ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
          }}
        >
          {spray.badge}
        </span>

        <div className="flex items-center gap-2 mt-3 flex-1">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: hasImage ? 'rgba(255,255,255,0.7)' : (darkText ? 'rgba(45,31,61,0.08)' : 'rgba(255,255,255,0.22)') }}
          >
            {spray.emoji}
          </span>
          <h3 className="font-bold text-xl leading-tight line-clamp-2" style={{ color: txt }}>
            {spray.nom}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold mt-3" style={{ color: txt }}>
          Voir la recette <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Colonne droite : flacon SVG (si pas de photo) + légende des proportions */}
      {!hasImage && (
        <div className="flex flex-col items-center justify-center pointer-events-none relative z-10" style={{ width: '40%' }}>
          <div className="h-[112px] w-full flex items-center justify-center">
            <SprayBottle bands={bands} />
          </div>
          <div className="w-full mt-1.5 space-y-0.5">
            {bands.map((b, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: b.color }} />
                <span className="text-[8.5px] font-medium truncate flex-1" style={{ color: txtSoft }}>
                  {b.nom}
                </span>
                <span className="text-[8.5px] font-semibold flex-shrink-0" style={{ color: txt }}>
                  {b.quantite}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const SpraysHeroGrid = ({ onSprayClick }: SpraysHeroGridProps) => {
  const { theme, darkMode } = useTheme();
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const moved = useRef(false);

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(TOTAL - 1, i));
    if (clamped !== index) haptic('selection');
    setIndex(clamped);
  };
  const go = (dir: number) => goTo(index + dir);

  // Résistance « rubber-band » quand on tire au-delà de la première/dernière diapo
  const resisted =
    (index === 0 && drag > 0) || (index === TOTAL - 1 && drag < 0) ? drag * 0.35 : drag;

  const handleStart = (x: number) => {
    startX.current = x;
    moved.current = false;
    setIsDragging(true);
  };
  const handleMove = (x: number) => {
    if (!isDragging) return;
    const d = x - startX.current;
    if (Math.abs(d) > 6) moved.current = true;
    setDrag(d);
  };
  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (drag <= -SWIPE_THRESHOLD) go(1);
    else if (drag >= SWIPE_THRESHOLD) go(-1);
    else if (!moved.current) { haptic('light'); onSprayClick(SPRAYS_INDISPENSABLES[index]); }
    setDrag(0);
  };

  return (
    <div className="mb-5">
      <SectionTitle badge="Glissez pour parcourir">
        <span className="text-base mr-2">🧴</span>Les Indispensables
      </SectionTitle>

      {/* Carrousel : fenêtre + track glissant (toutes les diapos préchargées) */}
      <div
        className="relative overflow-hidden rounded-3xl select-none"
        style={{ height: 180, boxShadow: '0 8px 28px rgba(0,0,0,0.15)', touchAction: 'pan-y' }}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={() => isDragging && handleEnd()}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      >
        <div
          className="flex h-full"
          style={{
            width: '100%',
            transform: `translateX(calc(${-index * 100}% + ${resisted}px))`,
            transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
            cursor: isDragging ? 'grabbing' : 'grab',
            touchAction: 'pan-y',
          }}
        >
          {SPRAYS_INDISPENSABLES.map((spray, i) => (
            <HeroSlide key={spray.id} spray={spray} priority={i === 0} />
          ))}
        </div>
      </div>

      {/* Contrôles : chevrons + points cliquables */}
      <div className="flex items-center justify-center gap-3 mt-3">
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="Précédent"
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 flex-shrink-0 disabled:opacity-40"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.85)',
            boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <ChevronLeft className="w-4 h-4" style={{ color: theme.textSecondary }} />
        </button>

        <div className="flex items-center gap-1.5">
          {SPRAYS_INDISPENSABLES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Recette ${i + 1}`}
              className="rounded-full transition-all"
              style={{
                width: i === index ? 18 : 7,
                height: 7,
                background: i === index ? theme.accentPink : (darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)'),
              }}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          disabled={index === TOTAL - 1}
          aria-label="Suivant"
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 flex-shrink-0 disabled:opacity-40"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.85)',
            boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <ChevronRight className="w-4 h-4" style={{ color: theme.textSecondary }} />
        </button>
      </div>
    </div>
  );
};
