'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Surface } from '@/types';
import { SURFACES } from '@/data/surfaces';
import { FAMILLES_MATERIEL, FamilleMateriel } from '@/data/materiel';
import { getProduitById } from '@/data/partenaires';
import { PartnerProductCard } from '@/components/ui/PartnerProductCard';
import { haptic } from '@/utils/haptics';
import { Check, ChevronRight, Wallet } from 'lucide-react';

interface MaterielPageProps {
  onSurfaceClick: (surface: Surface) => void;
}

const surfaceById = new Map(SURFACES.map((s) => [s.id, s]));

/* ------------------------------------------------------------------ */
/*  Carte d'une famille de matériel                                    */
/* ------------------------------------------------------------------ */
const FamilleCard = ({
  famille,
  onSurfaceClick,
}: {
  famille: FamilleMateriel;
  onSurfaceClick: (surface: Surface) => void;
}) => {
  const { theme, darkMode } = useTheme();
  const accent = darkMode ? famille.accentDark : famille.accent;
  const produits = famille.produitIds
    .map(getProduitById)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const surfaces = famille.surfaceIds
    .map((id) => surfaceById.get(id))
    .filter((s): s is Surface => Boolean(s));

  return (
    <div
      id={`materiel-${famille.id}`}
      className="rounded-3xl overflow-hidden"
      style={{
        background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.72)',
        border: `1px solid ${accent}30`,
        boxShadow: darkMode
          ? '0 10px 24px rgba(0,0,0,0.25)'
          : `0 10px 26px ${famille.accent}14, 0 3px 8px ${famille.accent}0d`,
        scrollMarginTop: 'calc(env(safe-area-inset-top, 0px) + 24px)',
      }}
    >
      <div className="p-4">
        {/* En-tête : tuile emoji + nom + tagline + budget */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl"
            style={{ background: famille.gradient, boxShadow: `0 6px 16px ${famille.accent}45` }}
            aria-hidden
          >
            {famille.emoji}
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h2 className="font-display text-lg font-extrabold leading-tight" style={{ color: theme.textPrimary }}>
              {famille.nom}
            </h2>
            <p className="text-[13px] font-semibold" style={{ color: accent }}>
              {famille.tagline}
            </p>
          </div>
          <span
            className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full flex-shrink-0 whitespace-nowrap"
            style={{ background: `${accent}1a`, color: accent }}
          >
            <Wallet className="w-3 h-3" />
            {famille.budget}
          </span>
        </div>

        {/* Pitch */}
        <p className="text-[14px] leading-relaxed mb-3.5" style={{ color: theme.textSecondary }}>
          {famille.description}
        </p>

        {/* Pourquoi on l'aime */}
        <div className="space-y-1.5 mb-4">
          {famille.avantages.map((a, i) => (
            <div key={i} className="flex items-start gap-2">
              <span
                className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${accent}1f` }}
              >
                <Check className="w-3 h-3" style={{ color: accent }} />
              </span>
              <span className="text-[13px] leading-snug" style={{ color: theme.textPrimary }}>
                {a}
              </span>
            </div>
          ))}
        </div>

        {/* Idéal pour → deep-links vers les fiches surfaces */}
        {surfaces.length > 0 && (
          <div className="mb-1">
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
      </div>

      {/* Produits recommandés */}
      {produits.length > 0 && (
        <div className="px-4 pb-4">
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {produits.map((p) => (
              <PartnerProductCard key={p.id} produit={p} compact accent={accent} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Page Matériel                                                      */
/* ------------------------------------------------------------------ */
export const MaterielPage = ({ onSurfaceClick }: MaterielPageProps) => {
  const { theme, darkMode } = useTheme();

  const scrollToFamille = (id: string) => {
    haptic('selection');
    document.getElementById(`materiel-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="pt-2 pb-4">
      {/* En-tête éditorial */}
      <div className="mb-4">
        <h1 className="font-display text-2xl font-extrabold mb-1" style={{ color: theme.textPrimary }}>
          Les indispensables du nettoyage
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
          Les recettes font 90 % du travail. Pour les 10 % restants, ces 5 machines
          changent vraiment la donne — voici comment bien les choisir.
        </p>
      </div>

      {/* Pilules d'ancrage vers chaque famille */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide edge-fade-x -mx-4 px-4 pb-1 mb-4">
        {FAMILLES_MATERIEL.map((f) => (
          <button
            key={f.id}
            onClick={() => scrollToFamille(f.id)}
            className="flex items-center gap-1.5 px-3.5 min-h-[40px] rounded-full text-[13px] font-bold whitespace-nowrap flex-shrink-0 transition-all active:scale-95"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.8)',
              border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`,
              color: theme.textSecondary,
            }}
          >
            <span aria-hidden>{f.emoji}</span>
            {f.nom}
          </button>
        ))}
      </div>

      {/* Familles */}
      <div className="space-y-4">
        {FAMILLES_MATERIEL.map((f) => (
          <FamilleCard key={f.id} famille={f} onSurfaceClick={onSurfaceClick} />
        ))}
      </div>

      {/* Transparence */}
      <p className="mt-5 text-[12px] leading-relaxed text-center px-4" style={{ color: theme.textMuted }}>
        Sélection indépendante de l&apos;équipe Cleanz. Les liens produits arrivent
        bientôt — quand ils seront actifs, Cleanz pourra percevoir une commission,
        sans surcoût pour vous.
      </p>
    </div>
  );
};
