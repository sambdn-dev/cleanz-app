'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SPRAYS_INDISPENSABLES } from '@/data/sprays';
import { ASTUCES_DU_JOUR } from '@/data/astuces';
import { parseFicheParam } from '@/utils/sprayUtils';
import { Spray, Astuce, RecetteComplete } from '@/types';

interface LiensPartagesProps {
  onSpray: (s: Spray) => void;
  onRecette: (r: RecetteComplete) => void;
  onAstuce: (a: Astuce) => void;
  onMeteoDebug: (actif: boolean) => void;
}

const genererSlug = (nom: string): string =>
  nom
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Ne garde que la portion valide d'un slug (avant un espace ou un caractère parasite). */
const nettoyerSlug = (slug: string): string => {
  const match = slug.match(/^[a-z0-9-]+/);
  return match ? match[0] : slug;
};

/**
 * PERFORMANCE — ce composant existe uniquement pour isoler `useSearchParams`.
 *
 * Dans l'App Router, `useSearchParams` bascule TOUT l'arbre qui l'appelle en
 * rendu côté client : le serveur n'envoie alors que le contenu de secours du
 * <Suspense>, et l'accueil reste blanc jusqu'à la fin de l'hydratation.
 * En cantonnant l'appel à ce composant invisible, la page d'accueil redevient
 * pré-rendue et s'affiche dès la première image.
 *
 * Il ne rend rien : il se contente d'ouvrir la bonne fiche quand l'application
 * est ouverte depuis un lien partagé ou un QR code.
 */
export const LiensPartages = ({
  onSpray,
  onRecette,
  onAstuce,
  onMeteoDebug,
}: LiensPartagesProps) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    onMeteoDebug(searchParams.get('meteo') === 'debug');

    // QR code d'un flacon « Mes Sprays » : ?fiche=spray-3 ou ?fiche=recette-12
    const fiche = parseFicheParam(searchParams.get('fiche'));
    const slugRecette = searchParams.get('recette');
    const slugAstuce = searchParams.get('astuce');

    if (!fiche && !slugRecette && !slugAstuce) return;

    let annule = false;

    // Le catalogue de recettes (~200 Ko) n'est chargé que si le lien en désigne
    // une : un démarrage normal ne le télécharge jamais.
    const ouvrir = async () => {
      if (fiche) {
        if (fiche.type === 'spray') {
          const spray = SPRAYS_INDISPENSABLES.find((s) => s.id === fiche.id);
          if (spray) { onSpray(spray); return; }
        } else {
          const { RECETTES } = await import('@/data/recettes');
          if (annule) return;
          const recette = RECETTES.find((r) => r.id === fiche.id);
          if (recette) { onRecette(recette); return; }
        }
      }

      if (slugRecette) {
        const { RECETTES } = await import('@/data/recettes');
        if (annule) return;
        const cible = nettoyerSlug(slugRecette.toLowerCase());
        const recette = RECETTES.find((r) => genererSlug(r.nom) === cible);
        if (recette) { onRecette(recette); return; }
      }

      if (slugAstuce) {
        const cible = nettoyerSlug(slugAstuce.toLowerCase());
        const astuce = ASTUCES_DU_JOUR.find((a) => genererSlug(a.titre) === cible);
        if (astuce) onAstuce(astuce);
      }
    };

    ouvrir();
    return () => { annule = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
};
