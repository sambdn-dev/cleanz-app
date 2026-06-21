'use client';

import React from 'react';

/**
 * Jeu d'icônes sur-mesure (line-art duotone) pour les appareils.
 * Style cohérent : trait 2.4, currentColor (la couleur est donnée par la carte),
 * remplissage doux à 13 % pour l'effet duotone. viewBox 0 0 64 64.
 * La clé = l'id de l'appareil dans `electromenager.ts`.
 */

const soft = { fill: 'currentColor', fillOpacity: 0.13 } as const;
const dot = { fill: 'currentColor', stroke: 'none' } as const;

const ICONS: Record<number, React.ReactNode> = {
  // 1 — Lave-linge
  1: (
    <>
      <rect x="15" y="9" width="34" height="46" rx="5" {...soft} />
      <line x1="15" y1="20" x2="49" y2="20" />
      <circle cx="22" cy="14.5" r="1.7" {...dot} />
      <circle cx="29" cy="14.5" r="1.7" {...dot} />
      <circle cx="32" cy="38" r="11" />
      <circle cx="32" cy="38" r="6" />
    </>
  ),
  // 2 — Réfrigérateur
  2: (
    <>
      <rect x="18" y="8" width="28" height="48" rx="4" {...soft} />
      <line x1="18" y1="27" x2="46" y2="27" />
      <line x1="24" y1="13" x2="24" y2="22" />
      <line x1="24" y1="32" x2="24" y2="44" />
    </>
  ),
  // 3 — Chaudière
  3: (
    <>
      <rect x="16" y="10" width="32" height="30" rx="4" {...soft} />
      <rect x="21" y="16" width="16" height="7" rx="1.5" />
      <circle cx="42" cy="19.5" r="1.6" {...dot} />
      <line x1="24" y1="40" x2="24" y2="49" />
      <line x1="40" y1="40" x2="40" y2="49" />
      <path d="M32 43 c -3 3 -3 8 0 10 c 3 -2 3 -7 0 -10 Z" {...soft} />
    </>
  ),
  // 4 — Lave-vaisselle
  4: (
    <>
      <rect x="15" y="9" width="34" height="46" rx="5" {...soft} />
      <rect x="20" y="14" width="24" height="4" rx="2" />
      <circle cx="36" cy="38" r="8" />
      <circle cx="36" cy="38" r="1.6" {...dot} />
      <line x1="23" y1="32" x2="23" y2="46" />
      <line x1="20" y1="28" x2="20" y2="33" />
      <line x1="23" y1="28" x2="23" y2="33" />
      <line x1="26" y1="28" x2="26" y2="33" />
      <line x1="20" y1="33" x2="26" y2="33" />
    </>
  ),
  // 5 — Four
  5: (
    <>
      <rect x="13" y="12" width="38" height="42" rx="4" {...soft} />
      <circle cx="20" cy="17.5" r="1.7" {...dot} />
      <circle cx="28" cy="17.5" r="1.7" {...dot} />
      <rect x="17" y="23" width="30" height="3" rx="1.5" />
      <rect x="18" y="30" width="28" height="19" rx="3" />
    </>
  ),
  // 6 — Climatisation
  6: (
    <>
      <rect x="10" y="16" width="44" height="15" rx="5" {...soft} />
      <line x1="15" y1="26" x2="49" y2="26" />
      <circle cx="47" cy="20" r="1.5" {...dot} />
      <path d="M20 39 q3 3 6 0 t6 0" />
      <path d="M22 45 q3 3 6 0 t6 0" />
    </>
  ),
  // 7 — Sèche-linge
  7: (
    <>
      <rect x="15" y="9" width="34" height="46" rx="5" {...soft} />
      <line x1="15" y1="20" x2="49" y2="20" />
      <circle cx="22" cy="14.5" r="1.7" {...dot} />
      <circle cx="29" cy="14.5" r="1.7" {...dot} />
      <circle cx="32" cy="38" r="11" />
      <path d="M26 37 q3 -4 6 0 t6 0" />
      <path d="M26 42 q3 -4 6 0 t6 0" />
    </>
  ),
  // 8 — Micro-ondes
  8: (
    <>
      <rect x="8" y="16" width="48" height="30" rx="4" {...soft} />
      <rect x="12" y="20" width="29" height="22" rx="2" />
      <circle cx="26.5" cy="31" r="1.8" {...dot} />
      <circle cx="48" cy="23" r="1.4" {...dot} />
      <circle cx="48" cy="28" r="1.4" {...dot} />
      <circle cx="48" cy="33" r="1.4" {...dot} />
      <rect x="45" y="37" width="6" height="4" rx="1" />
    </>
  ),
  // 9 — Aspirateur (traîneau)
  9: (
    <>
      <rect x="22" y="32" width="30" height="17" rx="8.5" {...soft} />
      <circle cx="29" cy="50" r="3" />
      <circle cx="45" cy="50" r="3" />
      <path d="M27 33 C 16 26, 15 15, 24 11" />
      <path d="M24 11 q -5 -1 -8 3" />
      <circle cx="46" cy="38" r="1.6" {...dot} />
    </>
  ),
  // 10 — Cafetière
  10: (
    <>
      <rect x="13" y="9" width="18" height="26" rx="3" {...soft} />
      <rect x="29" y="15" width="11" height="4" rx="1" />
      <path d="M31 24 L 46 24 L 44 38 Q 44 41 41 41 L 36 41 Q 33 41 33 38 Z" {...soft} />
      <path d="M46 26 q5 3.5 0 9" />
      <line x1="30" y1="44" x2="49" y2="44" />
    </>
  ),
  // 11 — Hotte
  11: (
    <>
      <path d="M12 31 L 52 31 L 45 18 L 19 18 Z" {...soft} />
      <rect x="28" y="8" width="8" height="11" rx="1" />
      <circle cx="24" cy="27" r="1.5" {...dot} />
      <circle cx="40" cy="27" r="1.5" {...dot} />
    </>
  ),
  // 12 — Chauffe-eau
  12: (
    <>
      <rect x="20" y="11" width="24" height="44" rx="12" {...soft} />
      <line x1="27" y1="11" x2="27" y2="5" />
      <line x1="37" y1="11" x2="37" y2="5" />
      <line x1="24" y1="5" x2="27" y2="5" />
      <line x1="37" y1="5" x2="40" y2="5" />
      <circle cx="32" cy="40" r="5" />
      <line x1="32" y1="40" x2="32" y2="36" />
    </>
  ),
  // 13 — Bouilloire
  13: (
    <>
      <path d="M22 27 L 42 27 L 40 45 Q 40 48 37 48 L 27 48 Q 24 48 24 45 Z" {...soft} />
      <path d="M22 30 L 13 26 L 19 33 Z" {...soft} />
      <path d="M42 29 Q 51 33 42 43" />
      <line x1="24" y1="27" x2="40" y2="27" />
      <circle cx="32" cy="23" r="2" {...dot} />
      <line x1="32" y1="25" x2="32" y2="27" />
    </>
  ),
  // 14 — Congélateur
  14: (
    <>
      <rect x="18" y="8" width="28" height="48" rx="4" {...soft} />
      <line x1="18" y1="38" x2="46" y2="38" />
      <line x1="18" y1="48" x2="46" y2="48" />
      <line x1="24" y1="42" x2="24" y2="46" />
      <line x1="32" y1="14" x2="32" y2="26" />
      <line x1="27" y1="17" x2="37" y2="23" />
      <line x1="37" y1="17" x2="27" y2="23" />
    </>
  ),
  // 15 — Airfryer
  15: (
    <>
      <rect x="20" y="15" width="24" height="36" rx="11" {...soft} />
      <rect x="24" y="20" width="16" height="8" rx="2" />
      <circle cx="38" cy="24" r="2" {...dot} />
      <line x1="21" y1="40" x2="43" y2="40" />
      <rect x="27" y="44" width="10" height="3.5" rx="1.5" />
    </>
  ),
  // 16 — Fer à repasser
  16: (
    <>
      <path d="M12 41 L 47 41 Q 52 41 52 37 Q 52 34 47 33 L 18 33 Q 12 34 12 41 Z" {...soft} />
      <path d="M19 33 Q 21 24 32 24 Q 43 24 43 32" />
      <circle cx="20" cy="38" r="1.3" {...dot} />
      <circle cx="26" cy="38" r="1.3" {...dot} />
      <circle cx="32" cy="38" r="1.3" {...dot} />
    </>
  ),
  // 17 — Centrale vapeur
  17: (
    <>
      <rect x="13" y="41" width="38" height="12" rx="3" {...soft} />
      <path d="M18 39 L 39 39 Q 43 39 43 36 Q 43 33 39 32 L 23 32 Q 18 33 18 39 Z" {...soft} />
      <path d="M24 32 Q 26 26 31 26 Q 36 26 35 32" />
      <circle cx="45" cy="47" r="1.6" {...dot} />
      <path d="M41 30 q3 -2 1 -6" />
      <path d="M45 32 q3 -2 1 -6" />
    </>
  ),
  // 18 — Aspirateur eau/poussière
  18: (
    <>
      <rect x="20" y="29" width="26" height="23" rx="5" {...soft} />
      <path d="M20 30 Q 20 16 33 16 Q 46 16 46 30 Z" {...soft} />
      <line x1="20" y1="30" x2="46" y2="30" />
      <circle cx="27" cy="52" r="2.5" />
      <circle cx="39" cy="52" r="2.5" />
      <path d="M45 25 C 55 21, 53 13, 45 11" />
      <path d="M32 36 C 29 40, 30 45, 33 45 C 36 45, 36 40, 32 36 Z" {...soft} />
    </>
  ),
  // 19 — Robot aspirateur laveur
  19: (
    <>
      <circle cx="32" cy="34" r="18" {...soft} />
      <line x1="19" y1="27" x2="45" y2="27" />
      <circle cx="32" cy="32" r="5" />
      <circle cx="32" cy="32" r="1.4" {...dot} />
      <path d="M32 41 C 30 43, 30.5 46, 32.5 46 C 34.5 46, 35 43, 32 41 Z" {...soft} />
    </>
  ),
  // 20 — Nettoyeur vapeur (balai vapeur)
  20: (
    <>
      <rect x="35" y="8" width="9" height="6" rx="2" {...soft} />
      <line x1="39" y1="14" x2="26" y2="44" />
      <path d="M14 45 L 34 45 L 30 53 L 18 53 Z" {...soft} />
      <path d="M34 42 q4 -3 1 -8" />
      <path d="M38 44 q4 -3 1 -8" />
    </>
  ),
  // 21 — Purificateur d'air
  21: (
    <>
      <rect x="22" y="14" width="20" height="40" rx="6" {...soft} />
      <line x1="27" y1="26" x2="37" y2="26" />
      <line x1="27" y1="31" x2="37" y2="31" />
      <line x1="27" y1="36" x2="37" y2="36" />
      <circle cx="32" cy="47" r="2" {...dot} />
      <path d="M27 11 q3 -3 6 0" />
      <path d="M30 7 q3 -3 6 0" />
    </>
  ),
  // 22 — Nettoyeur haute pression (Kärcher)
  22: (
    <>
      <path d="M20 26 L 32 26 L 32 33 L 28 44 Q 27 46 25 46 L 22 46 Q 20 46 20 43 Z" {...soft} />
      <rect x="32" y="27" width="19" height="5" rx="2.5" />
      <path d="M24 33 L 27 37" />
      <line x1="52" y1="29.5" x2="59" y2="25" />
      <line x1="52" y1="29.5" x2="60" y2="29.5" />
      <line x1="52" y1="29.5" x2="59" y2="34" />
    </>
  ),
  // 23 — Injecteur-extracteur (shampouineuse)
  23: (
    <>
      <rect x="38" y="8" width="8" height="6" rx="2" {...soft} />
      <line x1="42" y1="14" x2="34" y2="32" />
      <rect x="26" y="28" width="16" height="17" rx="4" {...soft} />
      <path d="M18 47 L 42 47 L 38 54 L 22 54 Z" {...soft} />
      <line x1="30" y1="45" x2="30" y2="47" />
      <path d="M34 33 C 31 37, 32 41, 35 41 C 38 41, 38 37, 34 33 Z" {...soft} />
    </>
  ),
  // 24 — Aspirateur balai (sans fil)
  24: (
    <>
      <rect x="37" y="9" width="10" height="15" rx="4" {...soft} />
      <path d="M37 13 q -6 1 -6 7" />
      <line x1="41" y1="24" x2="21" y2="45" />
      <rect x="9" y="45" width="22" height="7" rx="2.5" {...soft} />
    </>
  ),
};

export const ApplianceIcon = ({
  id,
  size = 46,
  color,
  className,
}: {
  id: number;
  size?: number;
  color?: string;
  className?: string;
}) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    aria-hidden
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={color ? { color } : undefined}
  >
    {ICONS[id] ?? ICONS[1]}
  </svg>
);
