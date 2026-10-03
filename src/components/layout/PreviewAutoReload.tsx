'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/** Synchronisation uniquement pour Safari du Simulateur iOS, ouvert avec ?apercu=1. */
export function PreviewAutoReload() {
  const params = useSearchParams();
  const enabled = params.get('apercu') === '1';
  useEffect(() => {
    if (!enabled) return;
    let version: string | undefined;
    let stopped = false;
    let busy = false;
    const check = async () => {
      if (stopped || busy || document.hidden) return;
      busy = true;
      try {
        const response = await fetch('/preview-version.json', { cache: 'no-store' });
        if (!response.ok || stopped) return;
        const next: unknown = (await response.json()).version;
        if (typeof next !== 'string' || !next || stopped) return;
        if (version && version !== next) window.location.reload();
        else version = next;
      } catch { /* Garder l'écran ouvert en cas de coupure réseau. */ }
      finally { busy = false; }
    };
    void check();
    const timer = window.setInterval(check, 3000);
    document.addEventListener('visibilitychange', check);
    return () => {
      stopped = true;
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', check);
    };
  }, [enabled]);
  return null;
}
