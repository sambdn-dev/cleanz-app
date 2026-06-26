'use client';

import { useEffect } from 'react';
import { Flame, X, Droplets, Sun, Wind, GlassWater, ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { haptic } from '@/utils/haptics';

interface CaniculeModalProps {
  tempMax: number | null;
  nightMin: number | null;
  city: string | null;
  onClose: () => void;
  /** Aller à la section complète des conseils canicule. */
  onSeeAll: () => void;
}

interface Conseil {
  icon: typeof Droplets;
  titre: string;
  texte: string;
  priority?: boolean;
}

const CONSEILS: Conseil[] = [
  {
    icon: Droplets,
    titre: 'Arroser tuiles, terrasses & murs',
    texte:
      "Plusieurs fois par jour, même en plein soleil. Au contact des surfaces brûlantes, l'eau s'évapore aussitôt et emporte la chaleur : le toit, les murs et les pièces du dessous se rafraîchissent d'un coup.",
    priority: true,
  },
  {
    icon: Sun,
    titre: 'Bloquer le soleil le jour',
    texte:
      'Volets et rideaux fermés côté soleil dès le matin. On enferme la fraîcheur de la nuit avant que la chaleur n\'entre.',
  },
  {
    icon: Wind,
    titre: 'Aérer la nuit',
    texte:
      "Fenêtres opposées grandes ouvertes la nuit et tôt le matin pour créer un courant d'air et évacuer la chaleur accumulée.",
  },
  {
    icon: GlassWater,
    titre: "S'hydrater & se rafraîchir",
    texte:
      "Boire avant d'avoir soif, douches tièdes, mouiller nuque et poignets. Éviter les efforts physiques aux heures chaudes (11 h-21 h).",
  },
];

/**
 * Grande modale d'alerte canicule, volontairement « franche » : températures
 * mises en avant + conseils pratiques. S'ouvre automatiquement pendant les
 * périodes de forte chaleur (une fois par jour), et via l'encart d'accueil.
 */
export const CaniculeModal = ({ tempMax, nightMin, city, onClose, onSeeAll }: CaniculeModalProps) => {
  const { theme, darkMode } = useTheme();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-2">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-md max-h-[94vh] rounded-3xl overflow-hidden flex flex-col animate-slideUp shadow-2xl"
        style={{ background: theme.bgModal }}
      >
        {/* En-tête fort : température en grand */}
        <div
          className="relative flex-shrink-0 px-5 pt-6 pb-5 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #FB923C 0%, #F43F5E 55%, #E11D48 100%)' }}
        >
          {/* halo pulsant */}
          <span
            className="absolute -top-10 -right-8 w-40 h-40 rounded-full animate-splash-glow pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)' }}
          />

          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full"
            style={{ background: 'rgba(0,0,0,0.22)', backdropFilter: 'blur(4px)' }}
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="relative z-[1] text-white">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(4px)' }}
              >
                <Flame className="w-6 h-6 text-white" />
              </span>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/85">
                Alerte canicule{city ? ` · ${city}` : ''}
              </p>
            </div>

            <div className="flex items-end gap-2 leading-none">
              <span className="font-display text-6xl font-black">{tempMax != null ? tempMax : '—'}</span>
              <span className="text-3xl font-black mb-1">°C</span>
              <span className="text-sm font-semibold mb-2 ml-1 text-white/90">aujourd&apos;hui</span>
            </div>

            {nightMin != null && nightMin >= 20 ? (
              <p className="mt-2 text-[13px] font-semibold text-white/95">
                🌙 Nuit à {nightMin}°C — la chaleur tient aussi la nuit.
              </p>
            ) : (
              <p className="mt-2 text-[13px] font-semibold text-white/95">
                Gardez la maison fraîche avec les bons réflexes 👇
              </p>
            )}
          </div>
        </div>

        {/* Conseils (scroll) */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 space-y-2.5">
          <p className="text-[12px] font-bold uppercase tracking-wider mb-1" style={{ color: theme.textMuted }}>
            Les bons réflexes
          </p>

          {CONSEILS.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-3.5 flex gap-3"
                style={{
                  background: c.priority
                    ? (darkMode ? 'rgba(244,63,94,0.16)' : 'rgba(244,63,94,0.10)')
                    : (darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.035)'),
                  border: c.priority
                    ? '1.5px solid rgba(244,63,94,0.5)'
                    : `1px solid ${darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'}`,
                }}
              >
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(244,63,94,0.14)', color: '#E11D48' }}
                >
                  <Icon className="w-5 h-5" />
                </span>
                <div className="flex-1">
                  <h4 className="text-[14px] font-bold leading-tight mb-0.5" style={{ color: theme.textPrimary }}>
                    {c.titre}
                    {c.priority && (
                      <span
                        className="ml-2 align-middle text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full"
                        style={{ background: 'rgba(244,63,94,0.15)', color: '#E11D48' }}
                      >
                        Le + efficace
                      </span>
                    )}
                  </h4>
                  <p className="text-[12.5px] leading-relaxed" style={{ color: theme.textSecondary }}>
                    {c.texte}
                  </p>
                </div>
              </div>
            );
          })}

          <button
            onClick={() => {
              haptic('light');
              onSeeAll();
            }}
            className="w-full mt-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-bold text-[14px] active:scale-[0.98] transition-transform"
            style={{ background: 'linear-gradient(135deg, #FB923C 0%, #E11D48 100%)' }}
          >
            Voir tous les conseils canicule
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 text-[13px] font-semibold"
            style={{ color: theme.textMuted }}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
