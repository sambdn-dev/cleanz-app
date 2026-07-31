/**
 * Moteur de répartition équitable des tâches ménagères.
 *
 * PRINCIPE
 * --------
 * Chaque tâche vaut une CHARGE en points = durée × pénibilité.
 * On ne cherche pas à donner le même NOMBRE de tâches à chacun, mais le même
 * NOMBRE DE POINTS — pour que « 10 min de WC » ne s'échange pas contre
 * « 10 min de dépoussiérage ».
 *
 * ALGORITHME (LPT — Longest Processing Time first)
 * ------------------------------------------------
 * 1. On génère les occurrences de la semaine (une tâche quotidienne = 7).
 * 2. On les trie par charge décroissante : les grosses tâches d'abord, ce sont
 *    elles qui déséquilibrent si on les place en dernier.
 * 3. Chaque occurrence part au membre le plus « en retard » sur son objectif
 *    (objectif = charge totale × sa part). C'est ce qui fait converger tout le
 *    monde vers son quota, y compris quand il est volontairement inégal (60/40).
 * 4. ROTATION : un petit bonus tournant (`BONUS_ROTATION`) départage les
 *    quasi-ex æquo, pour que la même personne n'hérite pas des WC toutes les
 *    semaines. Il est assez faible pour ne jamais casser l'équité réelle.
 *
 * Le résultat est DÉTERMINISTE : même foyer + même semaine = même planning.
 * Aucun stockage du planning n'est donc nécessaire, seulement les tâches
 * cochées.
 */

import { Tache, TACHES_PAR_ID, chargeTache } from '@/data/taches';

export interface Membre {
  id: string;
  prenom: string;
  couleur: string;
  emoji: string;
  /** Part relative de la charge (ex. 50/50, ou 60/40 si convenu ainsi) */
  part: number;
  /** Tâches que ce membre ne fait pas (allergie, phobie, accord du foyer…) */
  exclusions?: string[];
}

export interface Occurrence {
  /** Identifiant stable : tacheId-semaine-index */
  id: string;
  tacheId: string;
  tache: Tache;
  /** 0 = lundi … 6 = dimanche */
  jour: number;
  charge: number;
  membreId: string;
}

/** Marge de rotation, en points. Départage les quasi-ex æquo sans fausser l'équité. */
const BONUS_ROTATION = 10;

/** Hash déterministe et stable d'une chaîne. */
const hash = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

/** Index de semaine absolu (lundi comme premier jour). */
export const indexSemaine = (date: Date): number => {
  const ms = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  // 1970-01-01 était un jeudi → on décale de 3 jours pour caler sur le lundi.
  return Math.floor((ms / 86400000 + 3) / 7);
};

/** Lundi de la semaine contenant `date`. */
export const lundiDe = (date: Date): Date => {
  const d = new Date(date);
  const jour = (d.getDay() + 6) % 7; // 0 = lundi
  d.setDate(d.getDate() - jour);
  d.setHours(0, 0, 0, 0);
  return d;
};

/** 0 = lundi … 6 = dimanche */
export const jourDeLaSemaine = (date: Date): number => (date.getDay() + 6) % 7;

export const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
export const JOURS_COURTS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

/* ------------------------------------------------------------------ */
/*  1. Génération des occurrences de la semaine                        */
/* ------------------------------------------------------------------ */

/** Jours candidats pour une tâche « week-end ». */
const JOURS_WEEKEND = [5, 6];

function joursPourTache(t: Tache, semaine: number): number[] {
  const graine = hash(t.id);

  // Tâches récurrentes : n fois par semaine, réparties régulièrement.
  if (t.foisParSemaine && t.foisParSemaine >= 1) {
    const n = Math.min(7, Math.round(t.foisParSemaine));
    if (n >= 7) return [0, 1, 2, 3, 4, 5, 6];
    const decalage = (graine + semaine) % 7;
    return Array.from({ length: n }, (_, i) => (Math.floor((i * 7) / n) + decalage) % 7);
  }

  // Tâches espacées : présentes seulement certaines semaines.
  const periode = Math.max(1, t.periodeSemaines ?? 1);
  if ((semaine + graine) % periode !== 0) return [];

  if (t.weekend) return [JOURS_WEEKEND[(graine + semaine) % 2]];
  return [(graine + semaine) % 7];
}

/**
 * Répartit les charges sur les jours pour éviter une journée surchargée.
 * Ne déplace que les tâches non quotidiennes (les quotidiennes sont fixes) et
 * ne place JAMAIS deux occurrences d'une même tâche le même jour (sortir deux
 * fois les poubelles le lundi n'aurait aucun sens).
 */
function equilibrerJours(occurrences: Occurrence[]): void {
  const chargeJour = (j: number) =>
    occurrences.filter((o) => o.jour === j).reduce((s, o) => s + o.charge, 0);

  const deplacables = occurrences.filter(
    (o) => !(o.tache.foisParSemaine && o.tache.foisParSemaine >= 7)
  );

  /** La tâche est-elle déjà présente ce jour-là (hors l'occurrence testée) ? */
  const dejaCeJour = (occ: Occurrence, jour: number) =>
    occurrences.some((x) => x !== occ && x.tacheId === occ.tacheId && x.jour === jour);

  for (let iter = 0; iter < 30; iter++) {
    const charges = [0, 1, 2, 3, 4, 5, 6].map(chargeJour);
    const max = Math.max(...charges);
    if (max - Math.min(...charges) < 25) break; // suffisamment équilibré

    const jourPlein = charges.indexOf(max);
    // Jours cibles, du plus léger au plus chargé.
    const cibles = [0, 1, 2, 3, 4, 5, 6]
      .filter((j) => j !== jourPlein)
      .sort((a, b) => charges[a] - charges[b]);

    let deplacee = false;
    for (const jourVide of cibles) {
      if (max - charges[jourVide] < 25) break; // plus rien à gagner

      const candidate = deplacables
        .filter(
          (o) =>
            o.jour === jourPlein &&
            !(o.tache.weekend && jourVide < 5) &&
            !dejaCeJour(o, jourVide) &&
            o.charge <= max - charges[jourVide]
        )
        .sort((a, b) => b.charge - a.charge)[0];

      if (candidate) {
        candidate.jour = jourVide;
        deplacee = true;
        break;
      }
    }
    if (!deplacee) break;
  }
}

/** Toutes les occurrences de la semaine, jour attribué, membre non encore attribué. */
export function genererOccurrences(tacheIds: string[], semaine: number): Occurrence[] {
  const occurrences: Occurrence[] = [];

  for (const id of tacheIds) {
    const tache = TACHES_PAR_ID.get(id);
    if (!tache) continue;
    const charge = chargeTache(tache);
    joursPourTache(tache, semaine).forEach((jour, i) => {
      occurrences.push({
        id: `${id}-${semaine}-${i}`,
        tacheId: id,
        tache,
        jour,
        charge,
        membreId: '',
      });
    });
  }

  equilibrerJours(occurrences);
  return occurrences;
}

/* ------------------------------------------------------------------ */
/*  2. Attribution équitable aux membres                               */
/* ------------------------------------------------------------------ */

export function attribuer(
  occurrences: Occurrence[],
  membres: Membre[],
  semaine: number
): Occurrence[] {
  if (membres.length === 0) return occurrences;
  if (membres.length === 1) {
    return occurrences.map((o) => ({ ...o, membreId: membres[0].id }));
  }

  const totalParts = membres.reduce((s, m) => s + Math.max(0, m.part), 0) || membres.length;
  const totalCharge = occurrences.reduce((s, o) => s + o.charge, 0);

  const cible = new Map(
    membres.map((m) => [m.id, (totalCharge * Math.max(0, m.part)) / totalParts])
  );
  const attribue = new Map(membres.map((m) => [m.id, 0]));

  // LPT : les plus grosses charges d'abord (tri stable par id pour le déterminisme).
  const ordre = [...occurrences].sort(
    (a, b) => b.charge - a.charge || a.id.localeCompare(b.id)
  );

  const resultat = new Map<string, string>();

  for (const occ of ordre) {
    // Qui est « de garde » cette semaine pour cette tâche ? (rotation)
    const tour = (hash(occ.tacheId) + semaine) % membres.length;

    let choisi = membres[0];
    let meilleurScore = -Infinity;

    membres.forEach((m, idx) => {
      const exclu = m.exclusions?.includes(occ.tacheId) ?? false;
      const deficit = (cible.get(m.id) ?? 0) - (attribue.get(m.id) ?? 0);
      const bonus = idx === tour ? BONUS_ROTATION : 0;
      // Une exclusion coûte très cher, mais reste franchissable si tout le
      // monde exclut la tâche (sinon elle ne serait attribuée à personne).
      const score = deficit + bonus - (exclu ? 1e6 : 0);
      if (score > meilleurScore) {
        meilleurScore = score;
        choisi = m;
      }
    });

    resultat.set(occ.id, choisi.id);
    attribue.set(choisi.id, (attribue.get(choisi.id) ?? 0) + occ.charge);
  }

  return occurrences.map((o) => ({ ...o, membreId: resultat.get(o.id) ?? membres[0].id }));
}

/** Planning complet d'une semaine : occurrences générées puis attribuées. */
export function genererPlanning(
  tacheIds: string[],
  membres: Membre[],
  semaine: number
): Occurrence[] {
  return attribuer(genererOccurrences(tacheIds, semaine), membres, semaine);
}

/* ------------------------------------------------------------------ */
/*  3. Bilans                                                          */
/* ------------------------------------------------------------------ */

export interface BilanMembre {
  membre: Membre;
  /** Charge attribuée (points) */
  charge: number;
  /** Charge réellement effectuée (tâches cochées) */
  chargeFaite: number;
  /** Minutes attribuées */
  minutes: number;
  /** Part réelle de la charge, en % */
  partReelle: number;
  /** Part visée, en % */
  partVisee: number;
  /** Nombre de tâches attribuées */
  nbTaches: number;
}

export function bilan(
  occurrences: Occurrence[],
  membres: Membre[],
  faites: Set<string> = new Set()
): BilanMembre[] {
  const totalParts = membres.reduce((s, m) => s + Math.max(0, m.part), 0) || membres.length;
  const total = occurrences.reduce((s, o) => s + o.charge, 0) || 1;

  return membres.map((m) => {
    const siennes = occurrences.filter((o) => o.membreId === m.id);
    const charge = siennes.reduce((s, o) => s + o.charge, 0);
    const chargeFaite = siennes.filter((o) => faites.has(o.id)).reduce((s, o) => s + o.charge, 0);
    return {
      membre: m,
      charge,
      chargeFaite,
      minutes: siennes.reduce((s, o) => s + o.tache.dureeMin, 0),
      partReelle: Math.round((charge / total) * 100),
      partVisee: Math.round((Math.max(0, m.part) / totalParts) * 100),
      nbTaches: siennes.length,
    };
  });
}

/** Convertit des minutes en libellé court (« 1 h 25 »). */
export const formatDuree = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, '0')}`;
};
