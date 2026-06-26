'use client';

import { Flame, ChevronRight } from 'lucide-react';
import { haptic } from '@/utils/haptics';

interface CaniculeBannerProps {
  /** Température max du jour (°C), ou null si indisponible. */
  tempMax: number | null;
  /** Ville approximative, ou null. */
  city: string | null;
  /** Ouvre / fait défiler vers les conseils canicule. */
  onOpen: () => void;
}

/**
 * Encart « alerte chaleur » affiché tout en haut de l'accueil UNIQUEMENT
 * pendant les périodes de forte chaleur (cf. useHeatAlert). Tap → conseils canicule.
 */
export const CaniculeBanner = ({ tempMax, city, onOpen }: CaniculeBannerProps) => {
  const tempLabel = tempMax != null ? `${tempMax}°C` : null;

  return (
    <button
      onClick={() => {
        haptic('warning');
        onOpen();
      }}
      aria-label="Voir les conseils canicule"
      className="w-full mb-4 rounded-3xl text-left relative overflow-hidden transition-all active:scale-[0.98]"
      style={{
        background: 'linear-gradient(135deg, #FB923C 0%, #F43F5E 55%, #E11D48 100%)',
        boxShadow: '0 8px 26px rgba(244,63,94,0.35)',
      }}
    >
      {/* Halo de chaleur pulsant (décoratif) */}
      <span
        className="absolute -top-8 -right-6 w-28 h-28 rounded-full animate-splash-glow pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex items-center gap-3 px-4 py-3.5">
        <span
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(4px)' }}
        >
          <Flame className="w-6 h-6 text-white" />
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/85">
            Alerte chaleur{city ? ` · ${city}` : ''}
          </p>
          <h3 className="font-display text-[15px] font-extrabold text-white leading-tight">
            {tempLabel ? `Jusqu'à ${tempLabel} aujourd'hui` : 'Forte chaleur attendue'}
          </h3>
          <p className="text-[11px] text-white/90 leading-snug mt-0.5">
            Nos conseils pour garder la maison fraîche →
          </p>
        </div>

        <ChevronRight className="w-5 h-5 text-white/90 flex-shrink-0" />
      </div>
    </button>
  );
};
