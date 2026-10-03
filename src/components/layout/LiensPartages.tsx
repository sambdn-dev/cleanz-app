'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { findAstuceBySlug } from '@/data/astuces';
import { parseFicheParam, type ParsedFiche } from '@/utils/sprayUtils';
import { slugify } from '@/utils/share';
import type { Astuce } from '@/types';

interface LiensPartagesProps {
  onRecipeReference: (reference: ParsedFiche) => void;
  onAstuce: (a: Astuce) => void;
  onMeteoDebug: (actif: boolean) => void;
}

const nettoyerSlug = (slug: string): string => slug.toLowerCase().match(/^[a-z0-9-]+/)?.[0] ?? slug;

/** Isole useSearchParams pour conserver le pré-rendu de l'accueil. */
export const LiensPartages = ({ onRecipeReference, onAstuce, onMeteoDebug }: LiensPartagesProps) => {
  const searchParams = useSearchParams();
  useEffect(() => {
    onMeteoDebug(searchParams.get('meteo') === 'debug');
    const ficheParam = searchParams.get('fiche');
    const slugRecette = searchParams.get('recette');
    const slugAstuce = searchParams.get('astuce');
    if (ficheParam === null && slugRecette === null && slugAstuce === null) return;
    let cancelled = false;
    const open = async () => {
      if (ficheParam !== null) {
        // Ne pas chercher dans la sélection de sprays publiés : les anciens QR
        // suspendus ou inconnus doivent toujours ouvrir leur notice de statut.
        onRecipeReference(parseFicheParam(ficheParam) ?? { type: 'recette', id: NaN });
        return;
      }
      if (slugRecette !== null) {
        const { RECETTES } = await import('@/data/recettes');
        if (cancelled) return;
        const slug = nettoyerSlug(slugRecette);
        const id = RECETTES.find((r) => slugify(r.nom) === slug)?.id
          ?? (slug === 'desinfectant-naturel' ? 6 : NaN);
        // Le slug sert uniquement à retrouver l'ID. La modale relit la politique.
        onRecipeReference({ type: 'recette', id });
        return;
      }
      if (slugAstuce !== null) {
        const astuce = findAstuceBySlug(nettoyerSlug(slugAstuce));
        if (astuce) onAstuce(astuce);
        else onRecipeReference({ type: 'recette', id: NaN });
      }
    };
    void open();
    return () => { cancelled = true; };
    // Les callbacks n'ouvrent une fiche que lors d'un changement d'URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return null;
};
