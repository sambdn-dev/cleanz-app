'use client';

import { useEffect, useState } from 'react';

/**
 * Détection automatique d'une CANICULE via la météo locale.
 *
 * Critères (déclenche si l'UN d'eux est vrai) :
 *   - max du jour ≥ 30 °C            → « plus de 30 °C dans la journée » ;
 *   - moyenne diurne (9 h-20 h) ≥ 29 °C ;
 *   - nuit « tropicale » ≥ 23 °C     → la chaleur tient aussi la nuit.
 *
 * Choix techniques :
 * - Géoloc par IP avec PLUSIEURS fournisseurs en repli (certains bloqués par des
 *   bloqueurs de pub / VPN) → bien plus fiable.
 * - Météo via Open-Meteo : gratuit, sans clé, CORS ouvert, vie privée respectée.
 * - On NE met PAS les échecs en cache (sinon une panne ponctuelle masquerait
 *   l'alerte 3 h). Seuls les succès sont mis en cache 3 h.
 * - `?canicule=1` force l'alerte, `?canicule=0` la coupe (test).
 * - `?meteo=debug` : les valeurs détectées sont exposées via `debug` (cf. MeteoDebugCard).
 * - Fail-safe : toute erreur ⇒ pas d'alerte ⇒ app inchangée.
 */

const HEAT_DAY_MAX = 30; // °C — max du jour
const HEAT_DAY_AVG = 29; // °C — moyenne diurne
const HEAT_NIGHT_MIN = 23; // °C — nuit tropicale

const CACHE_KEY = 'cleanz_heat_v3';
const TTL_MS = 3 * 60 * 60 * 1000; // 3 heures

export interface HeatDebug {
  source: string | null; // 'override' | 'cache' | 'ipwho.is' | 'ipapi.co' | 'geojs' | null
  city: string | null;
  lat: number | null;
  lon: number | null;
  dayMax: number | null;
  dayAvg: number | null;
  nightMin: number | null;
  error: string | null;
}

export interface HeatState {
  loading: boolean;
  isHeat: boolean;
  tempMax: number | null;
  /** Minimum nocturne attendu (°C), pour signaler les nuits tropicales. */
  nightMin?: number | null;
  city: string | null;
  debug: HeatDebug;
}

interface CacheShape {
  ts: number;
  isHeat: boolean;
  tempMax: number | null;
  city: string | null;
  dayMax: number | null;
  dayAvg: number | null;
  nightMin: number | null;
}

const EMPTY_DEBUG: HeatDebug = {
  source: null, city: null, lat: null, lon: null,
  dayMax: null, dayAvg: null, nightMin: null, error: null,
};

const INITIAL: HeatState = { loading: true, isHeat: false, tempMax: null, city: null, debug: EMPTY_DEBUG };

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
  source: string;
}

/** Plusieurs fournisseurs de géoloc IP testés dans l'ordre jusqu'au premier valide. */
async function geolocateByIP(): Promise<Geo | null> {
  const providers: Array<{ name: string; run: () => Promise<Geo | null> }> = [
    {
      name: 'ipwho.is',
      run: async () => {
        const g = (await fetchJson('https://ipwho.is/')) as Record<string, unknown>;
        if (g && g.success !== false) {
          return { lat: g.latitude as number, lon: g.longitude as number, city: (g.city as string) ?? null, source: 'ipwho.is' };
        }
        return null;
      },
    },
    {
      name: 'ipapi.co',
      run: async () => {
        const g = (await fetchJson('https://ipapi.co/json/')) as Record<string, unknown>;
        if (g && !g.error) {
          return { lat: g.latitude as number, lon: g.longitude as number, city: (g.city as string) ?? null, source: 'ipapi.co' };
        }
        return null;
      },
    },
    {
      name: 'geojs',
      run: async () => {
        const g = (await fetchJson('https://get.geojs.io/v1/ip/geo.json')) as Record<string, unknown>;
        if (g) {
          return { lat: parseFloat(g.latitude as string), lon: parseFloat(g.longitude as string), city: (g.city as string) ?? null, source: 'geojs' };
        }
        return null;
      },
    },
  ];

  for (const p of providers) {
    try {
      const r = await p.run();
      if (r && Number.isFinite(r.lat) && Number.isFinite(r.lon)) {
        return { lat: r.lat, lon: r.lon, city: typeof r.city === 'string' ? r.city : null, source: r.source };
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
  dayMax: number | null;
  dayAvg: number | null;
  nightMin: number | null;
}

const computeIsHeat = (dayMax: number | null, dayAvg: number | null, nightMin: number | null): boolean =>
  (dayMax != null && dayMax >= HEAT_DAY_MAX) ||
  (dayAvg != null && dayAvg >= HEAT_DAY_AVG) ||
  (nightMin != null && nightMin >= HEAT_NIGHT_MIN);

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

  let daySum = 0;
  let dayN = 0;
  let nightMinRaw = Infinity;
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
      if (temp < nightMinRaw) nightMinRaw = temp;
    }
  }

  const dayAvgRaw = dayN > 0 ? daySum / dayN : dayMax;
  const dayAvg = dayAvgRaw != null ? Math.round(dayAvgRaw) : null;
  const nightMin = Number.isFinite(nightMinRaw) ? Math.round(nightMinRaw) : dailyMin0 != null ? Math.round(dailyMin0) : null;

  if (dayMax == null && dayAvg == null && nightMin == null) return null;

  const tempMax = dayMax != null ? Math.round(dayMax) : dayAvg;
  return { isHeat: computeIsHeat(dayMax, dayAvg, nightMin), tempMax, dayMax: dayMax != null ? Math.round(dayMax) : null, dayAvg, nightMin };
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
        commit({ loading: false, isHeat: true, tempMax: 34, nightMin: 24, city: null, debug: { ...EMPTY_DEBUG, source: 'override', dayMax: 34, nightMin: 24 } });
        return;
      }
      if (force === '0') {
        commit({ loading: false, isHeat: false, tempMax: null, city: null, debug: { ...EMPTY_DEBUG, source: 'override' } });
        return;
      }
    } catch {
      /* pas de window → ignoré */
    }

    // 1) Cache encore valide ?
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const c = JSON.parse(raw) as CacheShape;
        if (c && typeof c.ts === 'number' && Date.now() - c.ts < TTL_MS) {
          commit({
            loading: false,
            isHeat: !!c.isHeat,
            tempMax: c.tempMax ?? null,
            nightMin: c.nightMin ?? null,
            city: c.city ?? null,
            debug: { ...EMPTY_DEBUG, source: 'cache', city: c.city ?? null, dayMax: c.dayMax ?? null, dayAvg: c.dayAvg ?? null, nightMin: c.nightMin ?? null },
          });
          return;
        }
      }
    } catch {
      /* cache illisible */
    }

    (async () => {
      try {
        const geo = await geolocateByIP();
        if (!geo) {
          commit({ loading: false, isHeat: false, tempMax: null, city: null, debug: { ...EMPTY_DEBUG, error: 'géoloc indisponible' } });
          return; // pas de cache → on retentera
        }

        const reading = await readWeather(geo.lat, geo.lon);
        if (!reading) {
          commit({ loading: false, isHeat: false, tempMax: null, city: geo.city, debug: { ...EMPTY_DEBUG, source: geo.source, city: geo.city, lat: geo.lat, lon: geo.lon, error: 'météo indisponible' } });
          return; // pas de cache
        }

        const next: HeatState = {
          loading: false,
          isHeat: reading.isHeat,
          tempMax: reading.tempMax,
          nightMin: reading.nightMin,
          city: geo.city,
          debug: { source: geo.source, city: geo.city, lat: geo.lat, lon: geo.lon, dayMax: reading.dayMax, dayAvg: reading.dayAvg, nightMin: reading.nightMin, error: null },
        };

        try {
          const payload: CacheShape = {
            ts: Date.now(),
            isHeat: next.isHeat,
            tempMax: next.tempMax,
            city: next.city,
            dayMax: reading.dayMax,
            dayAvg: reading.dayAvg,
            nightMin: reading.nightMin,
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
        } catch {
          /* quota / privé */
        }

        commit(next);
      } catch (e) {
        commit({ loading: false, isHeat: false, tempMax: null, city: null, debug: { ...EMPTY_DEBUG, error: e instanceof Error ? e.message : 'erreur' } });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
