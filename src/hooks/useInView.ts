'use client';

import { useEffect, useRef, useState } from 'react';

interface Options {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Observe un élément et indique s'il est visible dans le viewport.
 * Retourne [ref, inView]. SSR-safe (l'observer est créé dans useEffect).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  { threshold = 0.25, rootMargin = '0px', triggerOnce = true }: Options = {}
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true); // fallback : on affiche tout
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (triggerOnce) observer.unobserve(entry.target);
          } else if (!triggerOnce) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, inView];
}
