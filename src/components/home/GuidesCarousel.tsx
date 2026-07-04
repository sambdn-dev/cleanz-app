'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { haptic } from '@/utils/haptics';
import { getBlur } from '@/data/imageBlur';
import { X, ChevronRight, BookOpen } from 'lucide-react';
import { SaisonCleanzSection, getSaison, SaisonKey } from './SaisonCleanzSection';
import { PiscineSpaSection } from './PiscineSpaSection';
import { DetailingAutoSection } from './DetailingAutoSection';

type GuideKey = 'saison' | 'piscine' | 'auto';

/* Habillage de la carte Saison selon la saison en cours (image = repli sur dégradé si absente) */
const SAISON_CARD: Record<SaisonKey, { emoji: string; label: string; gradient: string; image?: string }> = {
  printemps: { emoji: '🌸', label: 'Le printemps avec Cleanz', gradient: 'linear-gradient(135deg, #34D399 0%, #059669 100%)', image: '/images/scenes/guide-printemps.jpg' },
  ete: { emoji: '☀️', label: "L'été avec Cleanz", gradient: 'linear-gradient(135deg, #FBBF24 0%, #F97316 100%)', image: '/images/scenes/guide-ete.jpg' },
  automne: { emoji: '🍂', label: "L'automne avec Cleanz", gradient: 'linear-gradient(135deg, #FB923C 0%, #B45309 100%)', image: '/images/scenes/guide-automne.jpg' },
  hiver: { emoji: '❄️', label: "L'hiver avec Cleanz", gradient: 'linear-gradient(135deg, #60A5FA 0%, #1D4ED8 100%)', image: '/images/scenes/guide-hiver.jpg' },
};

interface GuideCard {
  key: GuideKey;
  emoji: string;
  kicker: string;
  titre: string;
  description: string;
  gradient: string;
  image?: string;
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
      // En canicule on force la photo d'été
      image: heatActive ? '/images/scenes/guide-ete.jpg' : saisonCard.image,
    },
    {
      key: 'piscine',
      emoji: '🏊',
      kicker: 'Extérieur',
      titre: 'Piscine & Spa',
      description: "Eau claire toute la saison : pH, filtration, ligne d'eau, SOS eau verte.",
      gradient: 'linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)',
      image: '/images/scenes/guide-piscine.jpg',
    },
    {
      key: 'auto',
      emoji: '🚗',
      kicker: 'Lavage pro',
      titre: 'Detailing Auto',
      description: 'Haute pression, canon à mousse, interstices : lave comme un pro.',
      gradient: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
      image: '/images/scenes/guide-auto.jpg',
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

  const guideImage = openGuide === 'saison'
    ? (heatActive ? '/images/scenes/guide-ete.jpg' : saisonCard.image)
    : openGuide === 'piscine' ? '/images/scenes/guide-piscine.jpg'
    : openGuide === 'auto' ? '/images/scenes/guide-auto.jpg'
    : undefined;
  const guideEmoji = openGuide === 'saison' ? (heatActive ? '🥵' : saisonCard.emoji)
    : openGuide === 'piscine' ? '🏊' : '🚗';

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
            {/* Photo de fond (repli sur le dégradé si absente) */}
            {c.image && (
              <Image
                src={c.image}
                alt={c.titre}
                fill
                className="object-cover"
                sizes="240px"
                placeholder={getBlur(c.image) ? 'blur' : 'empty'}
                blurDataURL={getBlur(c.image)}
              />
            )}
            {/* Voile bas pour la lisibilité */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 55%, transparent 80%)' }} />
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
            {/* Bannière photo + titre en surimpression */}
            <div className="relative h-32 flex-shrink-0 overflow-hidden">
              {guideImage ? (
                <Image
                  src={guideImage}
                  alt={guideTitle}
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                  placeholder={getBlur(guideImage) ? 'blur' : 'empty'}
                  blurDataURL={getBlur(guideImage)}
                />
              ) : (
                <div className="absolute inset-0" style={{ background: saisonCard.gradient }} />
              )}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)' }} />
              <button
                onClick={close}
                aria-label="Fermer"
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90"
                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className="text-2xl" aria-hidden style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))' }}>{guideEmoji}</span>
                <h3 className="font-display text-xl font-extrabold text-white" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
                  {guideTitle}
                </h3>
              </div>
            </div>

            {/* Contenu scrollable */}
            <div className="overflow-y-auto px-4 pt-4" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}>
              {openGuide === 'saison' && <SaisonCleanzSection heatActive={heatActive} embedded />}
              {openGuide === 'piscine' && <PiscineSpaSection embedded />}
              {openGuide === 'auto' && <DetailingAutoSection embedded />}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

