'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { getBlur } from '@/data/imageBlur';
import { haptic } from '@/utils/haptics';
import { Sun, ChevronRight } from 'lucide-react';

// Image générée par l'utilisateur (prompt ChatGPT Images fourni dans le chat).
// Si le fichier n'existe pas encore, on retombe sur un joli dégradé estival.
const HERO_IMAGE = '/images/sections/ete-cleanz.jpg';

interface EteTip {
  emoji: string;
  titre: string;
  texte: string;
}

// Les meilleures astuces ménage de l'été (saison juin → août)
const ETE_TIPS: EteTip[] = [
  {
    emoji: '🍖',
    titre: 'Barbecue impeccable',
    texte: 'Frottez la grille encore tiède avec un demi-oignon, puis bicarbonate + vinaigre pour décoller les graisses cuites.',
  },
  {
    emoji: '🦟',
    titre: 'Anti-moustiques naturel',
    texte: 'Un spray eau + vinaigre + huile essentielle de citronnelle sur les rebords de fenêtres éloigne les moustiques sans chimie.',
  },
  {
    emoji: '🏖️',
    titre: 'Terrasse & salon de jardin',
    texte: 'Savon noir + cristaux de soude redonnent vie au plastique jauni et au bois grisé. Rinçage au jet, séchage au soleil.',
  },
  {
    emoji: '🧊',
    titre: 'Glacière sans odeurs',
    texte: 'Bicarbonate + jus de citron pour désinfecter et désodoriser la glacière avant les pique-niques.',
  },
  {
    emoji: '👟',
    titre: 'Baskets & chaussures fraîches',
    texte: 'Poudre bicarbonate + maïzena + tea tree la nuit : adieu odeurs de transpiration estivale.',
  },
  {
    emoji: '🪟',
    titre: 'Vitres sans traces',
    texte: 'Nettoyez par temps couvert (jamais en plein soleil) : le produit sèche moins vite et ne laisse aucune trace.',
  },
];

export const EteAvecCleanzSection = () => {
  const { theme, darkMode } = useTheme();
  const [imgError, setImgError] = useState(false);
  const [openTip, setOpenTip] = useState<number | null>(0);

  const toggle = (i: number) => {
    haptic('selection');
    setOpenTip((prev) => (prev === i ? null : i));
  };

  return (
    <div className="mb-5">
      <div
        className="rounded-3xl overflow-hidden relative"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)'
            : 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
          border: darkMode ? '1px solid rgba(251,191,36,0.18)' : '1px solid rgba(251,146,60,0.25)',
          boxShadow: darkMode ? 'none' : '0 8px 28px rgba(251,146,60,0.14)',
        }}
      >
        {/* Bannière image (ou dégradé estival de repli) */}
        <div className="relative h-36 w-full overflow-hidden">
          {!imgError ? (
            <Image
              src={HERO_IMAGE}
              alt="L'été avec Cleanz"
              fill
              sizes="(max-width: 480px) 100vw, 480px"
              className="object-cover"
              placeholder={getBlur(HERO_IMAGE) ? 'blur' : 'empty'}
              blurDataURL={getBlur(HERO_IMAGE)}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, #FDBA74 0%, #FB7185 45%, #38BDF8 100%)',
              }}
            >
              {/* Soleil décoratif */}
              <div
                className="absolute top-4 right-6 w-16 h-16 rounded-full"
                style={{ background: 'radial-gradient(circle, #FEF9C3 0%, #FDE68A 60%, transparent 75%)' }}
              />
            </div>
          )}

          {/* Voile dégradé pour la lisibilité du titre */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)',
            }}
          />

          {/* Titre en surimpression */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #FBBF24 0%, #FB923C 100%)',
                boxShadow: '0 2px 10px rgba(251,146,60,0.45)',
              }}
            >
              <Sun className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/80">
                Spécial saison
              </p>
              <h3 className="font-display text-xl font-extrabold text-white leading-tight">
                L&apos;été avec Cleanz
              </h3>
            </div>
          </div>
        </div>

        {/* Intro + liste d'astuces */}
        <div className="p-4">
          <p className="text-[13px] leading-relaxed mb-3" style={{ color: theme.textSecondary }}>
            Nos meilleures astuces de saison pour un été net : barbecue, terrasse,
            anti-moustiques et fraîcheur garantie. ☀️
          </p>

          <div className="space-y-2">
            {ETE_TIPS.map((tip, i) => {
              const isOpen = openTip === i;
              return (
                <button
                  key={i}
                  onClick={() => toggle(i)}
                  className="w-full text-left rounded-2xl transition-all active:scale-[0.99]"
                  style={{
                    background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
                    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(251,146,60,0.18)'}`,
                  }}
                >
                  <div className="flex items-center gap-3 p-3">
                    <span className="text-xl flex-shrink-0" aria-hidden>{tip.emoji}</span>
                    <span className="flex-1 text-sm font-bold" style={{ color: theme.textPrimary }}>
                      {tip.titre}
                    </span>
                    <ChevronRight
                      className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                      style={{
                        color: theme.textMuted,
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}
                    />
                  </div>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="px-3 pb-3 text-[13px] leading-relaxed"
                        style={{ color: theme.textSecondary }}
                      >
                        {tip.texte}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
