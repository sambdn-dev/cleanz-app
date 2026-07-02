'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { CREATEURS, Createur } from '@/data/createurs';
import { haptic } from '@/utils/haptics';
import { ExternalLink, BookOpen, ShoppingBag, BadgeCheck, Users } from 'lucide-react';

const LinkIcon = ({ type }: { type: string }) =>
  type === 'livre' ? <BookOpen className="w-3 h-3" /> : type === 'boutique' ? <ShoppingBag className="w-3 h-3" /> : <ExternalLink className="w-3 h-3" />;

const CreateurCard = ({ createur }: { createur: Createur }) => {
  const { theme, darkMode } = useTheme();

  const openLink = (url: string) => {
    haptic('light');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="w-[240px] flex-shrink-0 rounded-2xl overflow-hidden"
      style={{
        background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.75)',
        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.06)'}`,
      }}
    >
      {/* En-tête dégradé + avatar */}
      <div className="relative h-14" style={{ background: createur.gradient }}>
        <div
          className="absolute -bottom-5 left-3.5 w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
          style={{
            background: createur.gradient,
            border: `2.5px solid ${darkMode ? '#241838' : '#fff'}`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
          }}
        >
          <span aria-hidden>{createur.emoji}</span>
        </div>
        {createur.partenaire && (
          <span className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-white/25 text-white backdrop-blur-sm">
            <BadgeCheck className="w-3 h-3" /> Partenaire
          </span>
        )}
      </div>

      <div className="pt-7 px-3.5 pb-3.5">
        <h4 className="text-sm font-extrabold leading-tight" style={{ color: theme.textPrimary }}>
          {createur.nom}
        </h4>
        <p className="text-[10px] font-semibold mb-1.5" style={{ color: theme.textMuted }}>
          {createur.pseudo}
        </p>

        <p className="text-[11px] leading-snug mb-2.5 line-clamp-4" style={{ color: theme.textSecondary }}>
          {createur.bio}
        </p>

        {/* Spécialités */}
        <div className="flex flex-wrap gap-1 mb-3">
          {createur.specialites.map((s, i) => (
            <span
              key={i}
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                color: theme.textSecondary,
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Liens */}
        <div className="space-y-1.5">
          {createur.liens.map((lien, i) => (
            <button
              key={i}
              onClick={() => openLink(lien.url)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all active:scale-[0.98]"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.035)',
                color: theme.textPrimary,
              }}
            >
              <span className="flex items-center gap-1.5 text-[11px] font-bold">
                <LinkIcon type={lien.type} />
                {lien.label}
              </span>
              <ExternalLink className="w-3 h-3" style={{ color: theme.textMuted }} />
            </button>
          ))}
        </div>
      </div>
    </div>
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

      <div className="flex gap-3 overflow-x-auto scrollbar-hide edge-fade-x -mx-4 px-4 pb-1">
        {CREATEURS.map((c) => (
          <CreateurCard key={c.id} createur={c} />
        ))}
      </div>
    </div>
  );
};
