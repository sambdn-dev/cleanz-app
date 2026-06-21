/**
 * Dérive un accent lisible (barre de titre, pastilles) à partir de la couleur
 * « n°1 » d'une photo. On conserve la TEINTE de la photo mais on normalise
 * saturation/luminosité pour rester lisible en clair comme en sombre.
 */

export interface AccentPalette {
  bar: string;      // barres d'accent des titres + liserés
  chipBg: string;   // fond des pastilles
  chipText: string; // texte des pastilles
}

function hexToHsl(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '');
  if (m.length !== 6) return null;
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  if ([r, g, b].some((v) => Number.isNaN(v))) return null;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d) % 6; break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }
  return [h, s, l];
}

const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

// Repli « sauge » = look historique des modales (si pas de couleur exploitable).
const FALLBACK: Record<'light' | 'dark', AccentPalette> = {
  light: { bar: '#8BA888', chipBg: 'rgba(122,140,110,0.16)', chipText: '#4B5D3F' },
  dark: { bar: '#8BA888', chipBg: 'rgba(140,168,136,0.18)', chipText: '#B8CBAE' },
};

export function deriveAccent(hex: string | undefined, darkMode: boolean): AccentPalette {
  const hsl = hex ? hexToHsl(hex) : null;
  // Image quasi neutre (peu de couleur) → on garde le look sauge plutôt qu'un gris terne.
  if (!hsl || hsl[1] < 0.1) return FALLBACK[darkMode ? 'dark' : 'light'];

  const [h, s] = hsl;
  const pct = (x: number) => Math.round(x * 100);

  if (darkMode) {
    const barS = pct(clamp(s, 0.3, 0.62));
    const txtS = pct(clamp(s, 0.35, 0.7));
    return {
      bar: `hsl(${h}, ${barS}%, 66%)`,
      chipBg: `hsla(${h}, ${barS}%, 62%, 0.2)`,
      chipText: `hsl(${h}, ${txtS}%, 79%)`,
    };
  }
  const barS = pct(clamp(s, 0.34, 0.66));
  const txtS = pct(clamp(s, 0.4, 0.72));
  return {
    bar: `hsl(${h}, ${barS}%, 54%)`,
    chipBg: `hsla(${h}, ${barS}%, 52%, 0.14)`,
    chipText: `hsl(${h}, ${txtS}%, 36%)`,
  };
}
