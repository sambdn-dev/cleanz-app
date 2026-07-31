'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Membre, Occurrence, indexSemaine } from '@/utils/repartition';
import { TACHES_DEFAUT } from '@/data/taches';

const KEY_FOYER = 'cleanz-foyer-v1';
const KEY_FAITES = 'cleanz-planning-faites-v1';

/** On garde l'historique des tâches cochées sur 6 mois glissants. */
const SEMAINES_HISTORIQUE = 26;

export interface FoyerState {
  membres: Membre[];
  tachesActives: string[];
  /** true dès que le foyer a été créé (sinon on affiche l'accueil de configuration) */
  configure: boolean;
}

/** Une tâche cochée : on mémorise qui l'a faite et ce qu'elle pesait. */
interface Fait {
  m: string; // membreId
  c: number; // charge en points
  s: number; // index de semaine
}

const ETAT_INITIAL: FoyerState = { membres: [], tachesActives: TACHES_DEFAUT, configure: false };

/** Palette des membres — couleurs franches et distinctes. */
export const COULEURS_MEMBRES = [
  '#EC4899', // rose
  '#38BDF8', // bleu
  '#FBBF24', // ambre
  '#34D399', // vert
  '#A78BFA', // violet
  '#FB7185', // corail
];

export const EMOJIS_MEMBRES = ['🦊', '🐨', '🐯', '🐸', '🦉', '🐼', '🐰', '🐻', '🐧', '🦁'];

export const nouveauMembre = (index: number, prenom = ''): Membre => ({
  id: `m${Date.now().toString(36)}${index}`,
  prenom,
  couleur: COULEURS_MEMBRES[index % COULEURS_MEMBRES.length],
  emoji: EMOJIS_MEMBRES[index % EMOJIS_MEMBRES.length],
  part: 50,
  exclusions: [],
});

/**
 * État du foyer (membres, quotas, tâches suivies) + historique des tâches
 * cochées, persistés en localStorage.
 *
 * Le planning lui-même n'est jamais stocké : il est recalculé à la volée par
 * `genererPlanning`, qui est déterministe. Seules les cases cochées le sont.
 */
export function useFoyer() {
  const [foyer, setFoyer] = useState<FoyerState>(ETAT_INITIAL);
  const [faits, setFaits] = useState<Record<string, Fait>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  /* ------------------------------ chargement ----------------------------- */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const brut = localStorage.getItem(KEY_FOYER);
      if (brut) {
        const parse = JSON.parse(brut) as Partial<FoyerState>;
        setFoyer({
          membres: Array.isArray(parse.membres) ? parse.membres : [],
          tachesActives: Array.isArray(parse.tachesActives) ? parse.tachesActives : TACHES_DEFAUT,
          configure: !!parse.configure,
        });
      }
    } catch {
      /* stockage illisible → foyer neuf */
    }
    try {
      const brut = localStorage.getItem(KEY_FAITES);
      if (brut) {
        const parse = JSON.parse(brut) as Record<string, Fait>;
        // Élagage de l'historique trop ancien
        const limite = indexSemaine(new Date()) - SEMAINES_HISTORIQUE;
        const propre: Record<string, Fait> = {};
        Object.entries(parse).forEach(([k, v]) => {
          if (v && typeof v.s === 'number' && v.s >= limite) propre[k] = v;
        });
        setFaits(propre);
      }
    } catch {
      /* idem */
    }
    setIsLoaded(true);
  }, []);

  /* ----------------------------- persistance ----------------------------- */
  const sauverFoyer = useCallback((next: FoyerState) => {
    setFoyer(next);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(KEY_FOYER, JSON.stringify(next));
      } catch {
        /* quota */
      }
    }
  }, []);

  const sauverFaits = useCallback((next: Record<string, Fait>) => {
    setFaits(next);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(KEY_FAITES, JSON.stringify(next));
      } catch {
        /* quota */
      }
    }
  }, []);

  /* ------------------------------- actions ------------------------------- */
  const creerFoyer = useCallback(
    (membres: Membre[], tachesActives: string[] = TACHES_DEFAUT) => {
      sauverFoyer({ membres, tachesActives, configure: true });
    },
    [sauverFoyer]
  );

  const setMembres = useCallback(
    (membres: Membre[]) => sauverFoyer({ ...foyer, membres }),
    [foyer, sauverFoyer]
  );

  const setTachesActives = useCallback(
    (tachesActives: string[]) => sauverFoyer({ ...foyer, tachesActives }),
    [foyer, sauverFoyer]
  );

  const basculerTache = useCallback(
    (tacheId: string) => {
      const actives = foyer.tachesActives.includes(tacheId)
        ? foyer.tachesActives.filter((t) => t !== tacheId)
        : [...foyer.tachesActives, tacheId];
      sauverFoyer({ ...foyer, tachesActives: actives });
    },
    [foyer, sauverFoyer]
  );

  /** Coche / décoche une occurrence. */
  const basculerFait = useCallback(
    (occ: Occurrence, semaine: number) => {
      const next = { ...faits };
      if (next[occ.id]) delete next[occ.id];
      else next[occ.id] = { m: occ.membreId, c: occ.charge, s: semaine };
      sauverFaits(next);
    },
    [faits, sauverFaits]
  );

  const estFaite = useCallback((occId: string) => !!faits[occId], [faits]);

  const faitesSet = useMemo(() => new Set(Object.keys(faits)), [faits]);

  /**
   * Cumul réellement effectué par membre, en points, depuis le début de
   * l'historique. C'est le juge de paix de l'équité sur la durée.
   */
  const cumulParMembre = useMemo(() => {
    const cumul = new Map<string, number>();
    Object.values(faits).forEach((f) => {
      cumul.set(f.m, (cumul.get(f.m) ?? 0) + f.c);
    });
    return cumul;
  }, [faits]);

  /** Nombre de tâches cochées, toutes semaines confondues. */
  const nbFaites = useMemo(() => Object.keys(faits).length, [faits]);

  const reinitialiser = useCallback(() => {
    sauverFoyer(ETAT_INITIAL);
    sauverFaits({});
  }, [sauverFoyer, sauverFaits]);

  return {
    foyer,
    isLoaded,
    creerFoyer,
    setMembres,
    setTachesActives,
    basculerTache,
    basculerFait,
    estFaite,
    faitesSet,
    cumulParMembre,
    nbFaites,
    reinitialiser,
  };
}
