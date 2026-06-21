import sharp from 'sharp';
import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, '../public');
const imagesDir = join(publicDir, 'images');
const outPath = join(__dirname, '../src/data/imageColors.ts');

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(jpe?g|png|webp)$/i.test(entry)) out.push(full);
  }
  return out;
}

const toHex = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
const hex = (r, g, b) => `#${toHex(r)}${toHex(g)}${toHex(b)}`;

function satLight(r, g, b) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return { s, l };
}

/**
 * Couleur « n°1 » caractéristique : on ignore les pixels quasi blancs/noirs/gris
 * et on retient la teinte la plus présente pondérée par sa saturation.
 * Repli sur la couleur dominante brute si l'image est quasi monochrome.
 */
async function characteristicColor(file) {
  const { data, info } = await sharp(file)
    .resize(80, 80, { fit: 'inside' })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  const buckets = new Map(); // key -> { w, r, g, b, n }

  for (let i = 0; i < data.length; i += ch) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const { s, l } = satLight(r, g, b);
    if (l > 0.93 || l < 0.08 || s < 0.15) continue; // neutres / extrêmes
    const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
    const e = buckets.get(key) || { w: 0, r: 0, g: 0, b: 0, n: 0 };
    e.w += s; e.r += r; e.g += g; e.b += b; e.n++;
    buckets.set(key, e);
  }

  let best = null;
  for (const e of buckets.values()) if (!best || e.w > best.w) best = e;

  if (best) return hex(best.r / best.n, best.g / best.n, best.b / best.n);

  const { dominant } = await sharp(file).stats();
  return hex(dominant.r, dominant.g, dominant.b);
}

async function run() {
  const files = walk(imagesDir).sort();
  const map = {};
  for (const file of files) {
    try {
      const key = '/' + relative(publicDir, file).split('\\').join('/');
      map[key] = await characteristicColor(file);
    } catch (e) {
      console.warn('skip', file, e.message);
    }
  }

  const body =
    `// Généré automatiquement (sharp) — couleur « n°1 » caractéristique de chaque image,\n` +
    `// pour teinter les modales selon leur visuel. Ne pas éditer à la main.\n` +
    `export const IMAGE_COLOR: Record<string, string> = ${JSON.stringify(map, null, 2)};\n\n` +
    `export const getImageColor = (src?: string): string | undefined =>\n` +
    `  src ? IMAGE_COLOR[src] : undefined;\n`;

  writeFileSync(outPath, body);
  console.log(`Generated ${outPath} with ${Object.keys(map).length} colors`);
}

run().catch(console.error);
