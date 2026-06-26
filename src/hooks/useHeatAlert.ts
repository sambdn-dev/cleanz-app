'use client';

import { useEffect, useState } from 'react';

/**
 * Détection automatique d'une CANICULE via la météo locale.
 *
 * Définition retenue (proche Météo-France, simplifiée) : il fait « canicule »
 * quand la chaleur tient JOUR ET NUIT. On déclenche l'alerte si l'UNE de ces
 * conditions est vraie :
 *   - moyenne des températures en journée (9 h → 20 h) ≥ 30 °C ;
 *   - nuit « tropicale » : la température ne redescend pas sous 23 °C ;
 *   - jour franchement caniculaire : max du jour ≥ 33 °C (filet de sécurité).
 *
 * Choix techniques :
 * - Géolocalisation par IP avec PLUSIEURS fournisseurs en repli (certains sont
 *   bloqués par des bloqueurs de pub / VPN) → bien plus fiable.
 * - Météo via Open-Meteo : gratuit, sans clé, CORS ouvert, vie privée respectée.
 * - On NE met PAS les échecs en cache (sinon une panne réseau ponctuelle masquerait
 *   l'alerte 3 h durant). Seuls les succès sont mis en cache 3 h.
 * - Override de test : `?canicule=1` force l'alerte, `?canicule=0` la coupe.
 * - Tout est fail-safe : la moindre erreur ⇒ pas d'alerte ⇒ app inchangée.
 */

const HEAT_DAY_AVG = 30; // °C — moyenne diurne
const HEAT_NIGHT_MIN = 23; // °C — nuit tropicale
const HEAT_DAY_MAX_HARD = 33; // °C — jour franchement caniculaire (sécurité)

const CACHE_KEY = 'cleanz_heat_v2';
const TTL_MS = 3 * 60 * 60 * 1000; // 3 heures

export interface HeatState {
  /** true tant qu'on n'a pas de réponse (évite tout flash d'encart au chargement). */
  loading: boolean;
  /** true si l'une des conditions de canicule est remplie. */
  isHeat: boolean;
  /** Température max attendue aujourd'hui (°C, arrondie), pour l'affichage. */
  tempMax: number | null;
  /** Ville approximative déduite de l'IP, ou null. */
  city: string | null;
}

interface CacheShape {
  ts: number;
  isHeat: boolean;
  tempMax: number | null;
  city: string | null;
}

const INITIAL: HeatState = { loading: true, isHeat: false, tempMax: null, city: null };

const num = (v: unknown): number | null =>
  typeof v === 'number' && Number.isFinite(v) ? v : null;

async function fetchJson(url: string): Promise<unknown> {
  const r = await fetch(url, { cache: 'no-store' });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

interface Geo {
  lat: number;
  lon: number;
  city: string | null;
}

/** Plusieurs fournisseurs de géoloc IP testés dans l'ordre jusqu'au premier valide. */
async function geolocateByIP(): Promise<Geo | null> {
  const providers: Array<() => Promise<Geo | null>> = [
    async () => {
      const g = (await fetchJson('https://ipwho.is/')) as Record<string, unknown>;
      if (g && g.success !== false) {
        return { lat: g.latitude as number, lon: g.longitude as number, city: (g.city as string) ?? null };
      }
      return null;
    },
    async () => {
      const g = (await fetchJson('https://ipapi.co/json/')) as Record<string, unknown>;
      if (g && !g.error) {
        return { lat: g.latitude as number, lon: g.longitude as number, city: (g.city as string) ?? null };
      }
      return null;
    },
    async () => {
      const g = (await fetchJson('https://get.geojs.io/v1/ip/geo.json')) as Record<string, unknown>;
      if (g) {
        return {
          lat: parseFloat(g.latitude as string),
          lon: parseFloat(g.longitude as string),
          city: (g.city as string) ?? null,
        };
      }
      return null;
    },
  ];

  for (const p of providers) {
    try {
      const r = await p();
      if (r && Number.isFinite(r.lat) && Number.isFinite(r.lon)) {
        return { lat: r.lat, lon: r.lon, city: typeof r.city === 'string' ? r.city : null };
      }
    } catch {
      /* fournisseur suivant */
    }
  }
  return null;
}

interface Reading {
  isHeat: boolean;
  tempMax: number | null;
}

async function readWeather(lat: number, lon: number): Promise<Reading | null> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m` +
    `&timezone=auto&forecast_days=2`;
  const w = (await fetchJson(url)) as {
    daily?: { time?: string[]; temperature_2m_max?: number[]; temperature_2m_min?: number[] };
    hourly?: { time?: string[]; temperature_2m?: number[] };
  };

  const dayMax = num(w?.daily?.temperature_2m_max?.[0]);
  const dailyMin0 = num(w?.daily?.temperature_2m_min?.[0]);
  const today = w?.daily?.time?.[0];
  const tomorrow = w?.daily?.time?.[1];

  const times = w?.hourly?.time ?? [];
  const temps = w?.hourly?.temperature_2m ?? [];

  // Moyenne diurne (aujourd'hui 9 h–20 h) et minimum nocturne (ce soir 21 h → demain 7 h).
  let daySum = 0;
  let dayN = 0;
  let nightMin = Infinity;
  for (let i = 0; i < times.length; i++) {
    const t = times[i];
    const temp = temps[i];
    if (typeof t !== 'string' || typeof temp !== 'number' || !Number.isFinite(temp)) continue;
    const date = t.slice(0, 10);
    const hour = parseInt(t.slice(11, 13), 10);
    if (date === today && hour >= 9 && hour <= 20) {
      daySum += temp;
      dayN += 1;
    }
    if ((date === today && hour >= 21) || (date === tomorrow && hour <= 7)) {
      if (temp < nightMin) nightMin = temp;
    }
  }

  const dayAvg = dayN > 0 ? daySum / dayN : dayMax;
  const nightLow = Number.isFinite(nightMin) ? nightMin : dailyMin0;

  // Si on n'a vraiment aucune donnée exploitable, on considère l'appel raté.
  if (dayAvg == null && nightLow == null && dayMax == null) return null;

  const isHeat =
    (dayAvg != null && dayAvg >= HEAT_DAY_AVG) ||
    (nightLow != null && nightLow >= HEAT_NIGHT_MIN) ||
    (dayMax != null && dayMax >= HEAT_DAY_MAX_HARD);

  const tempMax = dayMax != null ? Math.round(dayMax) : dayAvg != null ? Math.round(dayAvg) : null;
  return { isHeat, tempMax };
}

export function useHeatAlert(): HeatState {
  const [state, setState] = useState<HeatState>(INITIAL);

  useEffect(() => {
    let cancelled = false;
    const commit = (next: HeatState) => {
      if (!cancelled) setState(next);
    };

    // 0) Override de test : ?canicule=1 / ?canicule=0
    try {
      const force = new URLSearchParams(window.location.search).get('canicule');
      if (force === '1') {
        commit({ loading: false, isHeat: true, tempMax: 34, city: null });
        return;
      }
      if (force === '0') {
        commit({ loading: false, isHeat: false, tempMax: null, city: null });
        return;
      }
    } catch {
      /* pas de window → ignoré */
    }

    // 1) Cache encore valide ? → réponse immédiate.
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const c = JSON.parse(raw) as CacheShape;
        if (c && typeof c.ts === 'number' && Date.now() - c.ts < TTL_MS) {
          commit({ loading: false, isHeat: !!c.isHeat, tempMax: c.tempMax ?? null, city: c.city ?? null });
          return;
        }
      }
    } catch {
      /* cache illisible → on refait l'appel */
    }

    (async () => {
      try {
        const geo = await geolocateByIP();
        if (!geo) {
          commit({ loading: false, isHeat: false, tempMax: null, city: null });
          return; // échec géoloc → PAS de cache (on retentera à la prochaine ouverture)
        }

        const reading = await readWeather(geo.lat, geo.lon);
        if (!reading) {
          commit({ loading: false, isHeat: false, tempMax: null, city: geo.city });
          return; // échec météo → PAS de cache
        }

        const next: HeatState = {
          loading: false,
          isHeat: reading.isHeat,
          tempMax: reading.tempMax,
          city: geo.city,
        };

        try {
          const payload: CacheShape = {
            ts: Date.now(),
            isHeat: next.isHeat,
            tempMax: next.tempMax,
            city: next.city,
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
        } catch {
          /* quota / mode privé → tant pis pour le cache */
        }

        commit(next);
      } catch {
        commit({ loading: false, isHeat: false, tempMax: null, city: null });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
