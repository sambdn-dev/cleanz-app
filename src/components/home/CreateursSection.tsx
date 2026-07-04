'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { CREATEURS, Createur } from '@/data/createurs';
import { getBlur } from '@/data/imageBlur';
import { haptic } from '@/utils/haptics';
import { ExternalLink, BookOpen, ShoppingBag, BadgeCheck, Users } from 'lucide-react';

const LinkIcon = ({ type, className }: { type: string; className?: string }) =>
  type === 'livre' ? <BookOpen className={className} /> : type === 'boutique' ? <ShoppingBag className={className} /> : <ExternalLink className={className} />;

/**
 * Carte créateur « poster » : la photo remplit toute la carte, un panneau de
 * verre dépoli (backdrop-blur) en bas porte le nom + spécialité + lien.
 */
const CreateurCard = ({ createur }: { createur: Createur }) => {
  const { theme, darkMode } = useTheme();
  const lien = createur.liens[0];

  const openLink = (url: string) => {
    haptic('light');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={() => lien && openLink(lien.url)}
      className="relative w-[186px] h-[260px] flex-shrink-0 snap-start rounded-3xl overflow-hidden text-left transition-transform active:scale-[0.98]"
      style={{ boxShadow: darkMode ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.16)' }}
    >
      {/* Photo plein cadre (repli emoji + dégradé) */}
      {createur.photo ? (
        <Image
          src={createur.photo}
          alt={createur.nom}
          fill
          className="object-cover"
          sizes="186px"
          placeholder={getBlur(createur.photo) ? 'blur' : 'empty'}
          blurDataURL={getBlur(createur.photo)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-5xl" style={{ background: createur.gradient }} aria-hidden>
          {createur.emoji}
        </div>
      )}

      {/* Badge partenaire (si signé) */}
      {createur.partenaire && (
        <span className="absolute top-2.5 left-2.5 flex items-center gap-1 text-[9px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-white/25 text-white backdrop-blur-sm">
          <BadgeCheck className="w-3 h-3" /> Partenaire
        </span>
      )}

      {/* Spécialité n°1 en pastille flottante */}
      {createur.specialites[0] && (
        <span
          className="absolute top-2.5 right-2.5 text-[9px] font-bold px-2 py-1 rounded-full text-white"
          style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        >
          {createur.specialites[0]}
        </span>
      )}

      {/* Panneau de verre dépoli sous le texte */}
      <div
        className="absolute inset-x-0 bottom-0 p-3 pt-8"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)',
        }}
      >
        <div
          className="rounded-2xl px-3 py-2.5"
          style={{
            background: 'rgba(255,255,255,0.16)',
            backdropFilter: 'blur(14px) saturate(160%)',
            WebkitBackdropFilter: 'blur(14px) saturate(160%)',
            border: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          <p className="text-[15px] font-extrabold text-white leading-tight" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
            {createur.nom}
          </p>
          <p className="text-[10px] font-semibold text-white/85 mb-2">{createur.pseudo}</p>
          {lien && (
            <span className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-white px-2.5 py-1.5 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.2)' }}
            >
              <LinkIcon type={lien.type} className="w-3 h-3" />
              {lien.type === 'livre' ? 'Son livre' : 'Sa boutique'}
              <ExternalLink className="w-3 h-3 opacity-70" />
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

/**
 * Vitrine des créateurs cleantok — sélection indépendante (aucun lien sponsorisé
 * tant que `partenaire` est à false sur chaque fiche).
 */
export const CreateursSection = () => {
  const { theme } = useTheme();

  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-1">
        <Users className="w-5 h-5" style={{ color: theme.accentPink }} />
        <h2 className="font-display font-bold text-[17px]" style={{ color: theme.textPrimary }}>
          Les stars du clean
        </h2>
      </div>
      <p className="text-xs mb-3" style={{ color: theme.textMuted }}>
        Nos créateurs préférés — sélection indépendante de l&apos;équipe Cleanz
      </p>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide edge-fade-x -mx-4 px-4 pb-1 snap-x snap-mandatory">
        {CREATEURS.map((c) => (
          <CreateurCard key={c.id} createur={c} />
        ))}
      </div>
    </div>
  );
};
