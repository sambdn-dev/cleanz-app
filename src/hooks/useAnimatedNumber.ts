'use client';

import { useEffect, useRef, useState } from 'react';

interface Options {
  duration?: number;
  start?: boolean;
}

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Anime un nombre de 0 → target avec un easeOutCubic (requestAnimationFrame).
 * Respecte prefers-reduced-motion (saute directement à la valeur finale).
 * Ne démarre que lorsque `start` est vrai (utile avec useInView).
 */
export function useAnimatedNumber(target: number, { duration = 1100, start = true }: Options = {}): number {
  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setValue(target * ease(p));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration, start]);

  return value;
}
