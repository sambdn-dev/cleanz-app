'use client';

import { useEffect, useState } from 'react';

/**
 * Détection automatique d'une période de chaleur (canicule) via la météo locale.
 *
 * Objectif produit : afficher des conseils canicule UNIQUEMENT quand il fait chaud.
 * Dès que la température max du jour atteint le seuil, on active le mode chaleur
 * (encart en haut de l'accueil + onglet « Canicule » mis en avant). Sinon, rien ne change.
 *
 * Choix techniques :
 * - Géolocalisation par IP (aucune permission demandée à l'utilisateur, niveau ville).
 * - Météo via Open-Meteo : gratuit, sans clé API, CORS ouvert, respectueux de la vie privée.
 * - Cache localStorage (TTL ~3 h) pour ne pas rappeler les API à chaque ouverture.
 * - Tout est « fail-safe » : la moindre erreur réseau ⇒ pas de chaleur ⇒ app inchangée.
 */

export const HEAT_THRESHOLD = 30; // °C — « plus de 30 °C dans la journée »
const CACHE_KEY = 'cleanz_heat_v1';
const TTL_MS = 3 * 60 * 60 * 1000; // 3 heures

export interface HeatState {
  /** true tant qu'on n'a pas de réponse (évite tout flash d'encart au chargement). */
  loading: boolean;
  /** true si la température max du jour ≥ HEAT_THRESHOLD. */
  isHeat: boolean;
  /** Température max attendue aujourd'hui (°C, arrondie), ou null si indisponible. */
  tempMax: number | null;
  /** Ville approximative déduite de l'IP, ou null. */
  city: string | null;
}

interface CacheShape {
  ts: number;
  tempMax: number | null;
  city: string | null;
}

const INITIAL: HeatState = { loading: true, isHeat: false, tempMax: null, city: null };

const fromTempMax = (tempMax: number | null, city: string | null): HeatState => ({
  loading: false,
  isHeat: tempMax != null && tempMax >= HEAT_THRESHOLD,
  tempMax,
  city,
});

export function useHeatAlert(): HeatState {
  const [state, setState] = useState<HeatState>(INITIAL);

  useEffect(() => {
    let cancelled = false;
    const commit = (next: HeatState) => {
      if (!cancelled) setState(next);
    };

    // 1) Cache encore valide ? → réponse immédiate, aucun appel réseau.
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const c = JSON.parse(raw) as CacheShape;
        if (c && typeof c.ts === 'number' && Date.now() - c.ts < TTL_MS) {
          commit(fromTempMax(c.tempMax ?? null, c.city ?? null));
          return;
        }
      }
    } catch {
      /* cache illisible → on refait l'appel */
    }

    (async () => {
      try {
        // 2) Position approximative par IP (sans permission).
        let lat: number | null = null;
        let lon: number | null = null;
        let city: string | null = null;
        try {
          const geo = await fetch('https://ipwho.is/').then((r) => r.json());
          if (geo && geo.success !== false) {
            lat = typeof geo.latitude === 'number' ? geo.latitude : null;
            lon = typeof geo.longitude === 'number' ? geo.longitude : null;
            city = typeof geo.city === 'string' ? geo.city : null;
          }
        } catch {
          /* géoloc IP indisponible */
        }

        if (lat == null || lon == null) {
          commit(fromTempMax(null, null));
          return;
        }

        // 3) Température max du jour + température courante (Open-Meteo).
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
          `&daily=temperature_2m_max&current=temperature_2m&timezone=auto&forecast_days=1`;
        const w = await fetch(url).then((r) => r.json());

        const dailyMax = w?.daily?.temperature_2m_max?.[0];
        const current = w?.current?.temperature_2m;
        const candidates = [dailyMax, current].filter(
          (v) => typeof v === 'number' && Number.isFinite(v),
        ) as number[];
        const tempMax = candidates.length ? Math.round(Math.max(...candidates)) : null;

        try {
          const payload: CacheShape = { ts: Date.now(), tempMax, city };
          localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
        } catch {
          /* quota / mode privé → tant pis pour le cache */
        }

        commit(fromTempMax(tempMax, city));
      } catch {
        // Échec global → on n'affiche rien (app inchangée), sans planter.
        commit(fromTempMax(null, null));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
