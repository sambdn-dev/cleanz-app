'use client';

import { useTheme } from '@/contexts/ThemeContext';
import {
  getStatutRecette,
  getNiveauPreuve,
  LIBELLE_PREUVE,
  LIBELLE_PREUVE_COURT,
} from '@/data/revue';

/**
 * Statut de preuve d'une recette, à la place des anciennes étoiles d'efficacité.
 *
 * Les notes 4/5 et 5/5 de l'ancien catalogue n'étaient accompagnées d'aucune
 * méthode d'essai : elles restent dans l'archive de données mais ne sont plus
 * affichées ni utilisées pour classer. On montre à la place ce qui est vrai :
 * le niveau de revue de la fiche, ou son statut (en revue, retirée, fusionnée).
 */
export const PreuveChip = ({ id, compact = false }: { id: number; compact?: boolean }) => {
  const { darkMode } = useTheme();
  const statut = getStatutRecette(id);
  const preuve = getNiveauPreuve(id);

  let texte: string;
  let tone: 'neutre' | 'attente' | 'retrait';
  if (statut === 'retiree') {
    texte = 'Retirée';
    tone = 'retrait';
  } else if (statut === 'fusionnee') {
    texte = 'Fusionnée';
    tone = 'neutre';
  } else if (statut === 'en_attente') {
    texte = 'En revue';
    tone = 'attente';
  } else {
    texte = compact ? LIBELLE_PREUVE_COURT[preuve] : LIBELLE_PREUVE[preuve];
    tone = 'neutre';
  }

  const couleurs = {
    neutre: { bg: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)', fg: darkMode ? 'rgba(255,255,255,0.72)' : '#4B5563' },
    attente: { bg: darkMode ? 'rgba(217,164,65,0.18)' : 'rgba(217,164,65,0.16)', fg: darkMode ? '#E8C36A' : '#8A5A13' },
    retrait: { bg: darkMode ? 'rgba(239,68,68,0.18)' : 'rgba(239,68,68,0.12)', fg: darkMode ? '#F19A9A' : '#B03A3A' },
  }[tone];

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold whitespace-nowrap ${compact ? 'text-[10px] px-1.5 py-0.5' : 'text-[11px] px-2 py-0.5'}`}
      style={{ background: couleurs.bg, color: couleurs.fg }}
      title={statut === 'publiee' ? LIBELLE_PREUVE[preuve] : undefined}
    >
      {texte}
    </span>
  );
};
