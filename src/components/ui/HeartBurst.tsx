'use client';

import { useEffect, useState } from 'react';

/**
 * Petite explosion de cœurs + anneau, jouée une fois quand `trigger` passe à true.
 * Se positionne en absolu, centré sur le parent (qui doit être `relative`).
 */
const PARTICLES = Array.from({ length: 6 }, (_, i) => {
  const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
  const dist = 16 + (i % 2) * 6;
  return { dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist };
});

export const HeartBurst = ({ trigger }: { trigger: number }) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (trigger === 0) return;
    setPlaying(true);
    const t = setTimeout(() => setPlaying(false), 650);
    return () => clearTimeout(t);
  }, [trigger]);

  if (!playing) return null;

  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
      <span
        className="heart-ring absolute rounded-full"
        style={{ width: 28, height: 28, border: '2px solid #EC4899' }}
      />
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="heart-particle absolute text-[9px] leading-none"
          style={{ ['--dx' as string]: `${p.dx}px`, ['--dy' as string]: `${p.dy}px` }}
        >
          ❤️
        </span>
      ))}
    </span>
  );
};
