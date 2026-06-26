'use client';

import type { HeatState } from '@/hooks/useHeatAlert';

/**
 * Carte de diagnostic météo — visible UNIQUEMENT avec ?meteo=debug dans l'URL.
 * Sert à comprendre pourquoi l'alerte canicule s'affiche ou non
 * (géoloc OK ? quelle ville ? quelles températures ? seuils atteints ?).
 */
export const MeteoDebugCard = ({ heat }: { heat: HeatState }) => {
  const d = heat.debug;
  const row = (k: string, v: string | number | null | boolean) => (
    <div className="flex justify-between gap-3 py-0.5">
      <span className="opacity-70">{k}</span>
      <span className="font-semibold text-right">{v === null || v === undefined ? '—' : String(v)}</span>
    </div>
  );

  return (
    <div
      className="mb-4 rounded-2xl px-4 py-3 text-[12px] font-mono"
      style={{ background: '#0F172A', color: '#E2E8F0', border: '1px solid #334155' }}
    >
      <div className="font-bold mb-1.5 tracking-wide">🌡️ MÉTÉO · DEBUG</div>
      {row('loading', heat.loading)}
      {row('isHeat (alerte)', heat.isHeat ? 'OUI ✅' : 'non')}
      {row('source', d.source)}
      {row('ville', d.city)}
      {row('lat / lon', d.lat != null && d.lon != null ? `${d.lat.toFixed(3)} / ${d.lon.toFixed(3)}` : null)}
      {row('max jour (≥30 ?)', d.dayMax != null ? `${d.dayMax}°C` : null)}
      {row('moyenne jour (≥29 ?)', d.dayAvg != null ? `${d.dayAvg}°C` : null)}
      {row('min nuit (≥23 ?)', d.nightMin != null ? `${d.nightMin}°C` : null)}
      {d.error ? row('erreur', d.error) : null}
      <div className="mt-1.5 pt-1.5 opacity-60" style={{ borderTop: '1px solid #334155' }}>
        Astuce : ?canicule=1 force l&apos;alerte · ?canicule=0 la coupe
      </div>
    </div>
  );
};
