'use client';

import { Leaf } from 'lucide-react';

/**
 * Score écologique sous forme de feuilles (1 à 5).
 */
export const EcoScore = ({ score, size = 12 }: { score: number; size?: number }) => (
  <span
    className="inline-flex items-center gap-0.5"
    aria-label={`Score écologique ${score} sur 5`}
    role="img"
  >
    {[1, 2, 3, 4, 5].map((i) => (
      <Leaf
        key={i}
        style={{
          width: size,
          height: size,
          color: i <= score ? '#22C55E' : 'rgba(34,197,94,0.28)',
          fill: i <= score ? '#22C55E' : 'transparent',
        }}
        strokeWidth={2}
        aria-hidden
      />
    ))}
  </span>
);
