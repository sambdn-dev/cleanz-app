'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Surface } from '@/types';
import { SURFACES } from '@/data/surfaces';
import { FAMILLES_MATERIEL, FamilleMateriel, Reference, getLienReference } from '@/data/materiel';
import { getBlur } from '@/data/imageBlur';
import { haptic } from '@/utils/haptics';
import { Check, ChevronRight, Wallet, ExternalLink, Lock } from 'lucide-react';

interface MaterielPageProps {
  onSurfaceClick: (surface: Surface) => void;
}

const surfaceById = new Map(SURFACES.map((s) => [s.id, s]));

/* ------------------------------------------------------------------ */
/*  Carte d'une référence produit (top 5)                              */
/* ------------------------------------------------------------------ */
const ReferenceCard = ({
  reference,
  rank,
  accent,
  gradient,
}: {
  reference: Reference;
  rank: number;
  accent: string;
  gradient: string;
}) => {
  const { theme, darkMode } = useTheme();
  const lien = getLienReference(reference);

  const open = () => {
    if (!lien) return;
    haptic('light');
    window.open(lien, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={open}
      className={`w-[200px] flex-shrink-0 rounded-2xl overflow-hidden ${lien ? 'cursor-pointer active:scale-[0.98]' : ''} transition-transform`}
      style={{
        background: darkMode ? 'rgba(255,255,255,0.05)' : '#fff',
        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.06)'}`,
      }}
    >
      {/* Visuel : photo si dispo, sinon placeholder de marque soigné */}
      <div className="relative h-24 w-full overflow-hidden" style={{ background: gradient }}>
        {reference.image ? (
          <Image
            src={reference.image}
            alt={`${reference.marque} ${reference.modele}`}
            fill
            className="object-contain p-2"
            sizes="200px"
            placeholder={getBlur(reference.image) ? 'blur' : 'empty'}
            blurDataURL={getBlur(reference.image)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="font-display text-xl font-black tracking-tight text-white leading-none"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
            >
              {reference.marque}
            </span>
            <span className="text-[10px] font-semibold text-white/85 mt-0.5">{reference.modele}</span>
          </div>
        )}
        {/* Rang */}
        <span
          className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black text-white"
          style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
        >
          {rank}
        </span>
        {/* Mention (Made in France, Le n°1…) */}
        {reference.note && (
          <span
            className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          >
            {reference.francaise && <span aria-hidden>🇫🇷</span>}
            {reference.note}
          </span>
        )}
      </div>

      {/* Infos */}
      <div className="p-3">
        <p className="text-[13px] font-extrabold leading-tight" style={{ color: theme.textPrimary }}>
          {reference.marque} <span className="font-semibold" style={{ color: theme.textSecondary }}>{reference.modele}</span>
        </p>
        <p className="text-[11px] leading-snug mt-1 mb-2.5 line-clamp-3" style={{ color: theme.textSecondary }}>
          {reference.argument}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13px] font-black" style={{ color: accent }}>{reference.prix}</span>
          {lien ? (
            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1.5 rounded-lg text-white" style={{ background: accent }}>
              Voir <ExternalLink className="w-3 h-3" />
            </span>
          ) : (
            <span
              className="flex items-center gap-1 text-[9px] font-semibold px-2 py-1.5 rounded-lg"
              style={{ background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)', color: theme.textMuted }}
            >
              <Lock className="w-2.5 h-2.5" /> Bientôt
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Page Matériel — hero photo + rail de vignettes (variante F)         */
/* ------------------------------------------------------------------ */
/** Libellé court sous chaque vignette du rail. */
const LIBELLE_COURT: Record<string, string> = {
  vapeur: 'Vapeur',
  aspirateur: 'Aspi. balai',
  robot: 'Robot',
  injecteur: 'Injecteur',
  'haute-pression': 'Haute pression',
};

/** Cadrage du portrait 3:4 dans le hero paysage (l'appareil reste centré). */
const CADRAGE: Record<string, string> = {
  aspirateur: 'center 30%',
  'haute-pression': 'center 55%',
};

const HERO_HEIGHT = 360;
const DUREE_FONDU = 480;

export const MaterielPage = ({ onSurfaceClick }: MaterielPageProps) => {
  const { theme, darkMode } = useTheme();
  const [selId, setSelId] = useState(FAMILLES_MATERIEL[0].id);
  // Photo précédente conservée le temps du fondu enchaîné.
  const [prevId, setPrevId] = useState<string | null>(null);
  const timer = useRef<number | null>(null);
  const touchX = useRef<number | null>(null);

  const famille = FAMILLES_MATERIEL.find((f) => f.id === selId) ?? FAMILLES_MATERIEL[0];
  const prev = prevId ? FAMILLES_MATERIEL.find((f) => f.id === prevId) : undefined;
  const accent = darkMode ? famille.accentDark : famille.accent;
  const surfaces = famille.surfaceIds
    .map((id) => surfaceById.get(id))
    .filter((s): s is Surface => Boolean(s));

  const choisir = useCallback(
    (id: string) => {
      if (id === selId) return;
      haptic('selection');
      setPrevId(selId);
      setSelId(id);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setPrevId(null), DUREE_FONDU + 60);
    },
    [selId]
  );
  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  // Balayage horizontal sur le hero → famille suivante / précédente.
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 48) return;
    const i = FAMILLES_MATERIEL.findIndex((f) => f.id === selId);
    const next = FAMILLES_MATERIEL[(i + (dx < 0 ? 1 : FAMILLES_MATERIEL.length - 1)) % FAMILLES_MATERIEL.length];
    choisir(next.id);
  };

  return (
    <div className="pt-1 pb-4">
      {/* Hero photo plein cadre */}
      <div
        className="relative rounded-[28px] overflow-hidden select-none"
        style={{ height: HERO_HEIGHT, boxShadow: darkMode ? '0 16px 36px rgba(0,0,0,0.4)' : `0 16px 36px ${famille.accent}33` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {prev && (
          <Image
            key={`prev-${prev.id}`}
            src={prev.photo}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 480px) 100vw, 440px"
            quality={65}
            className="object-cover"
            style={{ objectPosition: CADRAGE[prev.id] ?? 'center 42%' }}
          />
        )}
        <Image
          key={famille.id}
          src={famille.photo}
          alt={famille.nom}
          fill
          priority
          sizes="(max-width: 480px) 100vw, 440px"
          quality={65}
          placeholder={getBlur(famille.photo) ? 'blur' : 'empty'}
          blurDataURL={getBlur(famille.photo)}
          className={`object-cover ${prev ? 'materiel-fade-in' : ''}`}
          style={{ objectPosition: CADRAGE[famille.id] ?? 'center 42%' }}
        />
        {/* Voiles : lisibilité du texte en bas, du badge en haut */}
        <div className="absolute inset-x-0 bottom-0 h-[62%] pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(18,10,28,0.92) 0%, rgba(18,10,28,0.42) 50%, transparent 100%)' }} />
        <div className="absolute inset-x-0 top-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 100%)' }} />

        {/* Compteur */}
        <span
          className="absolute top-3.5 right-3.5 text-[11px] font-bold px-2.5 py-1 rounded-full text-white"
          style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        >
          {FAMILLES_MATERIEL.findIndex((f) => f.id === famille.id) + 1} / {FAMILLES_MATERIEL.length}
        </span>

        {/* Titre */}
        <div key={`titre-${famille.id}`} className="absolute inset-x-0 bottom-0 p-5 materiel-rise-in">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-extrabold px-2.5 py-1.5 rounded-full text-white mb-2.5"
            style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          >
            <Wallet className="w-3 h-3" />
            {famille.budget}
          </span>
          <h1
            className="font-display text-[26px] font-extrabold text-white leading-[1.1]"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.45)' }}
          >
            <span aria-hidden className="mr-2">{famille.emoji}</span>
            {famille.nom}
          </h1>
          <p className="text-[14px] font-semibold text-white/90 mt-1" style={{ textShadow: '0 1px 7px rgba(0,0,0,0.5)' }}>
            {famille.tagline}
          </p>
        </div>
      </div>

      {/* Rail de vignettes */}
      <div
        role="tablist"
        aria-label="Familles de matériel"
        className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-4 px-4 pt-3.5 pb-1"
      >
        {FAMILLES_MATERIEL.map((f) => {
          const on = f.id === famille.id;
          const ring = darkMode ? f.accentDark : f.accent;
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={on}
              aria-label={f.nom}
              onClick={() => choisir(f.id)}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 w-[64px] transition-all active:scale-95"
            >
              <span
                className="relative block w-[64px] h-[64px] rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  boxShadow: on ? `0 0 0 2.5px ${ring}, 0 6px 14px ${ring}55` : '0 2px 8px rgba(80,60,120,0.16)',
                  opacity: on ? 1 : 0.62,
                  transform: on ? 'scale(1)' : 'scale(0.94)',
                }}
              >
                <Image src={f.photo} alt="" fill sizes="64px" quality={55} className="object-cover" style={{ objectPosition: 'center 35%' }} />
              </span>
              <span
                className="text-[10px] font-bold leading-none whitespace-nowrap"
                style={{ color: on ? ring : theme.textMuted }}
              >
                {LIBELLE_COURT[f.id] ?? f.nom}
              </span>
            </button>
          );
        })}
      </div>

      {/* Contenu de la famille active */}
      <div key={famille.id} className="materiel-rise-in pt-3">
        <p className="text-[14px] leading-relaxed mb-3.5" style={{ color: theme.textSecondary }}>
          {famille.description}
        </p>

        <div className="space-y-1.5 mb-4">
          {famille.avantages.map((a, i) => (
            <div key={i} className="flex items-start gap-2">
              <span
                className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${accent}1f` }}
              >
                <Check className="w-3 h-3" style={{ color: accent }} />
              </span>
              <span className="text-[13px] leading-snug" style={{ color: theme.textPrimary }}>{a}</span>
            </div>
          ))}
        </div>

        {surfaces.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: theme.textMuted }}>
              Idéal pour
            </p>
            <div className="flex flex-wrap gap-1.5">
              {surfaces.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { haptic('light'); onSurfaceClick(s); }}
                  className="flex items-center gap-1.5 pl-2.5 pr-2 min-h-[40px] rounded-full text-[13px] font-semibold transition-all active:scale-95"
                  style={{
                    background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.85)',
                    border: `1px solid ${accent}30`,
                    color: theme.textSecondary,
                  }}
                >
                  <span aria-hidden>{s.emoji}</span>
                  {s.nom}
                  <ChevronRight className="w-3 h-3" style={{ color: accent }} />
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: theme.textMuted }}>
          Notre top 5
        </p>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
          {famille.references.map((r, i) => (
            <ReferenceCard key={`${r.marque}-${r.modele}`} reference={r} rank={i + 1} accent={accent} gradient={famille.gradient} />
          ))}
        </div>
      </div>

      {/* Transparence */}
      <p className="mt-5 text-[12px] leading-relaxed text-center px-4" style={{ color: theme.textMuted }}>
        Sélection indépendante de l&apos;équipe Cleanz. Les liens d&apos;achat arrivent
        bientôt — quand ils seront actifs, Cleanz pourra percevoir une commission,
        sans surcoût pour vous.
      </p>
    </div>
  );
};
