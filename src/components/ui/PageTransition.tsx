'use client';

import { useEffect, useState } from 'react';

/**
 * Enveloppe le contenu d'un onglet avec une entrée fade + léger slide.
 * Donner une `key` distincte (ex: l'onglet actif) pour rejouer l'animation
 * à chaque changement d'onglet.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);

  return (
    <div
      className="transition-all duration-500 ease-out motion-reduce:transition-none"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(12px)',
      }}
    >
      {children}
    </div>
  );
}
