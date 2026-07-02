'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { ProduitPartenaire, getLienProduit } from '@/data/partenaires';
import { ExternalLink, Lock } from 'lucide-react';
import { haptic } from '@/utils/haptics';

interface PartnerProductCardProps {
  produit: ProduitPartenaire;
  /** Couleur d'accent de la section hôte (hex) */
  accent?: string;
  /** Variante compacte pour les carrousels horizontaux */
  compact?: boolean;
}

/**
 * Carte produit partenaire.
 * Tant que l'affiliation n'est pas activée (data/partenaires.ts), la carte
 * affiche « Bientôt disponible » et n'émet aucun lien sortant.
 */
export const PartnerProductCard = ({ produit, accent = '#8B5CF6', compact = false }: PartnerProductCardProps) => {
  const { theme, darkMode } = useTheme();
  const lien = getLienProduit(produit);

  const open = () => {
    if (!lien) return;
    haptic('light');
    window.open(lien, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={open}
      className={`rounded-2xl transition-all ${lien ? 'cursor-pointer active:scale-[0.98]' : ''} ${
        compact ? 'w-[190px] flex-shrink-0 p-3' : 'p-3.5'
      }`}
      style={{
        background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.75)',
        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.06)'}`,
      }}
    >
      <div className="flex items-start gap-2.5 mb-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
          style={{ background: `${accent}1c` }}
        >
          <span aria-hidden>{produit.emoji}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: accent }}>
            {produit.marque}
          </p>
          <h4 className="text-[13px] font-bold leading-tight" style={{ color: theme.textPrimary }}>
            {produit.nom}
          </h4>
        </div>
      </div>

      <p className="text-[11px] leading-snug mb-2.5" style={{ color: theme.textSecondary }}>
        {produit.description}
      </p>

      <div className="flex items-center justify-between gap-2">
        {produit.prixIndicatif && (
          <span className="text-[11px] font-bold whitespace-nowrap" style={{ color: theme.textMuted }}>
            {produit.prixIndicatif}
          </span>
        )}
        {lien ? (
          <span
            className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg text-white"
            style={{ background: accent }}
          >
            Voir le produit <ExternalLink className="w-3 h-3" />
          </span>
        ) : (
          <span
            className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
              color: theme.textMuted,
            }}
          >
            <Lock className="w-3 h-3" /> Bientôt disponible
          </span>
        )}
      </div>

      {lien && (
        <p className="mt-1.5 text-[9px]" style={{ color: theme.textMuted, opacity: 0.7 }}>
          Lien partenaire — Cleanz peut percevoir une commission.
        </p>
      )}
    </div>
  );
};
