'use client';

import { useState, useEffect, useRef } from 'react';
import { BrandLogo } from './BrandLogo';

const completeLaunch = () => {
  document.documentElement.dataset.cleanzLaunch = 'complete';
  window.dispatchEvent(new Event('cleanz:launch-complete'));
};

export const SplashScreen = () => {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const splashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    let active = true;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const frames = new Set<number>();
    const pause = (ms: number) => new Promise<void>(resolve => {
      const timer = setTimeout(() => { timers.delete(timer); resolve(); }, ms);
      timers.add(timer);
    });
    const frame = () => new Promise<void>(resolve => {
      const id = requestAnimationFrame(() => { frames.delete(id); resolve(); });
      frames.add(id);
    });
    const prepare = async () => {
      // Let hydration, the saved theme and the first page commit settle.
      await frame();
      await frame();
      if (!active) return;
      if (splashRef.current && getComputedStyle(splashRef.current).visibility === 'hidden') {
        // The CSS fallback may have finished before a very late hydration.
        // Never restart an overlay the user has already seen disappear.
        completeLaunch();
        setVisible(false);
        return;
      }
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const elapsed = Number(splashRef.current?.getAnimations()[0]?.currentTime) || 0;
      const minimum = pause(Math.max(0, (reduced ? 250 : 1000) - elapsed));
      const hero = document.querySelector<HTMLImageElement>('img[data-launch-image]');
      const resources = Promise.all([
        document.fonts.ready,
        hero?.decode().catch(() => {}),
      ]);
      // A failed or very slow image must never leave the app behind a loader.
      await Promise.all([minimum, Promise.race([resources, pause(2500)])]);
      if (!active) return;
      if (splashRef.current && getComputedStyle(splashRef.current).visibility === 'hidden') {
        completeLaunch();
        setVisible(false);
        return;
      }
      document.documentElement.dataset.cleanzLaunch = 'revealing';
      setLeaving(true);
    };
    void prepare();
    return () => {
      active = false;
      timers.forEach(clearTimeout);
      frames.forEach(cancelAnimationFrame);
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <div
      ref={splashRef}
      className="splash-auto-out splash-screen"
      data-leaving={leaving}
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.animationName !== 'splash-auto-out' && event.animationName !== 'launch-fallback') return;
        completeLaunch();
        setVisible(false);
      }}
    >
      <BrandLogo className="splash-wordmark" />
    </div>
  );
};
