'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { haptic } from '@/utils/haptics';
import { X, ChevronRight, BookOpen } from 'lucide-react';
import { SaisonCleanzSection, getSaison, SaisonKey } from './SaisonCleanzSection';
import { PiscineSpaSection } from './PiscineSpaSection';
import { DetailingAutoSection } from './DetailingAutoSection';

type GuideKey = 'saison' | 'piscine' | 'auto';

/* Habillage de la carte Saison selon la saison en cours */
const SAISON_CARD: Record<SaisonKey, { emoji: string; label: string; gradient: string }> = {
  printemps: { emoji: '🌸', label: 'Le printemps avec Cleanz', gradient: 'linear-gradient(135deg, #34D399 0%, #059669 100%)' },
  ete: { emoji: '☀️', label: "L'été avec Cleanz", gradient: 'linear-gradient(135deg, #FBBF24 0%, #F97316 100%)' },
  automne: { emoji: '🍂', label: "L'automne avec Cleanz", gradient: 'linear-gradient(135deg, #FB923C 0%, #B45309 100%)' },
  hiver: { emoji: '❄️', label: "L'hiver avec Cleanz", gradient: 'linear-gradient(135deg, #60A5FA 0%, #1D4ED8 100%)' },
};

interface GuideCard {
  key: GuideKey;
  emoji: string;
  kicker: string;
  titre: string;
  description: string;
  gradient: string;
}

interface GuidesCarouselProps {
  heatActive?: boolean;
}

/**
 * Les 3 grands guides (Saison, Piscine & Spa, Detailing Auto) en carrousel
 * coulissant compact : une carte = un guide, le contenu complet s'ouvre en
 * plein écran. Désencombre l'accueil (feedback utilisateurs).
 */
export const GuidesCarousel = ({ heatActive = false }: GuidesCarouselProps) => {
  const { theme, darkMode } = useTheme();
  const [openGuide, setOpenGuide] = useState<GuideKey | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Bloque le scroll de fond quand un guide est ouvert
  useEffect(() => {
    if (!openGuide) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [openGuide]);

  const saison = getSaison();
  const saisonCard = SAISON_CARD[saison];

  const cards: GuideCard[] = [
    {
      key: 'saison',
      emoji: heatActive ? '🥵' : saisonCard.emoji,
      kicker: 'Spécial saison',
      titre: heatActive ? 'Canicule : les bons gestes' : saisonCard.label,
      description: heatActive
        ? 'Rafraîchir la maison sans clim : les astuces qui marchent.'
        : 'Les gestes malins du moment, mis à jour à chaque saison.',
      gradient: saisonCard.gradient,
    },
    {
      key: 'piscine',
      emoji: '🏊',
      kicker: 'Extérieur',
      titre: 'Piscine & Spa',
      description: "Eau claire toute la saison : pH, filtration, ligne d'eau, SOS eau verte.",
      gradient: 'linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)',
    },
    {
      key: 'auto',
      emoji: '🚗',
      kicker: 'Lavage pro',
      titre: 'Detailing Auto',
      description: 'Haute pression, canon à mousse, interstices : lave comme un pro.',
      gradient: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
    },
  ];

  const open = (k: GuideKey) => {
    haptic('light');
    setOpenGuide(k);
  };
  const close = () => {
    haptic('selection');
    setOpenGuide(null);
  };

  const guideTitle = openGuide === 'saison' ? (heatActive ? 'Canicule' : saisonCard.label)
    : openGuide === 'piscine' ? 'Piscine & Spa'
    : 'Detailing Auto';

  return (
    <div className="mb-5">
      {/* Titre de section */}
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-5 h-5" style={{ color: theme.accentPink }} />
        <h2 className="font-display font-bold text-[17px]" style={{ color: theme.textPrimary }}>
          Les guides Cleanz
        </h2>
        <span className="text-xs ml-auto" style={{ color: theme.textMuted }}>
          Glissez →
        </span>
      </div>

      {/* Carrousel coulissant */}
      <div
        className="flex gap-3 overflow-x-auto scrollbar-hide edge-fade-x -mx-4 px-4 pb-1 snap-x snap-mandatory"
        style={{ scrollPaddingLeft: 16 }}
      >
        {cards.map((c) => (
          <button
            key={c.key}
            onClick={() => open(c.key)}
            className="relative w-[240px] h-[140px] flex-shrink-0 snap-start rounded-3xl overflow-hidden text-left transition-transform active:scale-[0.98]"
            style={{ background: c.gradient, boxShadow: darkMode ? '0 8px 24px rgba(0,0,0,0.35)' : '0 8px 24px rgba(0,0,0,0.14)' }}
          >
            {/* Voile bas pour la lisibilité */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }} />
            <span className="absolute top-3 right-3.5 text-3xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }} aria-hidden>
              {c.emoji}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-3.5">
              <p className="text-[9px] font-black uppercase tracking-widest text-white/75">{c.kicker}</p>
              <h3 className="font-display text-[17px] font-extrabold text-white leading-tight mb-0.5" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.35)' }}>
                {c.titre}
              </h3>
              <p className="text-[11px] text-white/85 leading-snug line-clamp-2">{c.description}</p>
            </div>
            <span
              className="absolute top-3 left-3.5 flex items-center gap-1 text-[10px] font-bold text-white/90 px-2 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
            >
              Ouvrir <ChevronRight className="w-3 h-3" />
            </span>
          </button>
        ))}
      </div>

      {/* Plein écran : contenu complet du guide */}
      {mounted && openGuide && createPortal(
        <div className="fixed inset-0 z-[220] flex flex-col">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
          <div
            className="relative mt-auto rounded-t-3xl overflow-hidden animate-slide-up flex flex-col"
            style={{
              background: darkMode ? '#251A3E' : '#FAF7FC',
              maxHeight: 'calc(100dvh - max(env(safe-area-inset-top, 0px), 24px))',
            }}
          >
            {/* Barre de titre */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ borderBottom: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}` }}
            >
              <span className="text-xl" aria-hidden>
                {openGuide === 'saison' ? (heatActive ? '🥵' : saisonCard.emoji) : openGuide === 'piscine' ? '🏊' : '🚗'}
              </span>
              <h3 className="flex-1 font-display text-lg font-extrabold" style={{ color: theme.textPrimary }}>
                {guideTitle}
              </h3>
              <button
                onClick={close}
                aria-label="Fermer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90"
                style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}
              >
                <X className="w-5 h-5" style={{ color: theme.textSecondary }} />
              </button>
            </div>

            {/* Contenu scrollable */}
            <div className="overflow-y-auto px-4 pt-4" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}>
              {openGuide === 'saison' && <SaisonCleanzSection heatActive={heatActive} />}
              {openGuide === 'piscine' && <PiscineSpaSection />}
              {openGuide === 'auto' && <DetailingAutoSection />}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

