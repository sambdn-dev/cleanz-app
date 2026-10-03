'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/** Aperçu Vercel sur téléphone/PWA, ou Safari du Simulateur ouvert avec ?apercu=1. */
export function PreviewAutoReload() {
  const params = useSearchParams();
  const nativePreview = params.get('apercu') === '1';
  const enabled = nativePreview || process.env.NEXT_PUBLIC_PREVIEW_AUTO_UPDATE === '1';
  useEffect(() => {
    if (!enabled) return;
    const version = process.env.NEXT_PUBLIC_BUILD_ID || 'dev';
    let stopped = false;
    let busy = false;
    let pending = false;
    const reloadWhenReady = () => {
      if (stopped || document.hidden || !pending) return;
      // Ne pas interrompre une saisie : attendre sa fin ou le retour dans l'app.
      if (document.activeElement?.matches('input, textarea, select, [contenteditable="true"]')) return;
      window.location.reload();
    };
    const check = async () => {
      if (stopped || busy || document.hidden) return;
      busy = true;
      try {
        const response = await fetch('/api/preview-version', { cache: 'no-store' });
        if (!response.ok || stopped) return;
        const next: unknown = (await response.json()).version;
        if (typeof next !== 'string' || !next || stopped) return;
        pending = version !== next;
        reloadWhenReady();
      } catch { /* Garder l'écran ouvert en cas de coupure réseau. */ }
      finally { busy = false; }
    };
    void check();
    const timer = window.setInterval(check, nativePreview ? 3000 : 15000);
    document.addEventListener('visibilitychange', check);
    window.addEventListener('online', check);
    const onFocusOut = () => { window.setTimeout(reloadWhenReady, 0); };
    document.addEventListener('focusout', onFocusOut);
    return () => {
      stopped = true;
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', check);
      window.removeEventListener('online', check);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, [enabled, nativePreview]);
  return null;
}
