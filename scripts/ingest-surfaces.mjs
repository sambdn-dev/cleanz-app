#!/usr/bin/env node
/**
 * Intègre un lot de photos de surfaces en une commande.
 *
 *   node scripts/ingest-surfaces.mjs <dossier-source>
 *
 * NOMENCLATURE ATTENDUE : `surface-<slug>.png|jpg|jpeg|webp`
 *   slug = nom de la surface en minuscules, sans accents, espaces/&/’ → « - »
 *   ex. « Poêles & casseroles » → surface-poeles-casseroles.png
 *   (c'est exactement `slugSurface()` de src/data/scenes.ts)
 *
 * Pour chaque fichier :
 *   1. redimensionne en 1200×800 (cover) → public/images/surfaces/surface-<slug>.jpg (q70)
 *   2. génère le LQIP (20×13) → src/data/imageBlur.ts
 *   3. ajoute l'entrée dans SURFACE_PHOTOS → src/data/scenes.ts
 *   4. avertit si aucune surface de src/data/surfaces.ts ne porte ce slug
 * Idempotent : relancer sur un lot déjà intégré ne duplique rien.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const src = process.argv[2];
if (!src || !fs.existsSync(src)) {
  console.error('Usage : node scripts/ingest-surfaces.mjs <dossier-source>');
  process.exit(1);
}

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'public/images/surfaces');
const BLUR_TS = path.join(ROOT, 'src/data/imageBlur.ts');
const SCENES_TS = path.join(ROOT, 'src/data/scenes.ts');
const SURFACES_TS = path.join(ROOT, 'src/data/surfaces.ts');
fs.mkdirSync(OUT_DIR, { recursive: true });

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const slugify = (s) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Slugs connus (noms des surfaces) pour signaler une faute de frappe.
const surfaceSlugs = new Set(
  [...fs.readFileSync(SURFACES_TS, 'utf8').matchAll(/nom:\s*'([^']+)'/g)].map((m) => slugify(m[1]))
);

let blurTs = fs.readFileSync(BLUR_TS, 'utf8');
let scenesTs = fs.readFileSync(SCENES_TS, 'utf8');
const BLUR_ANCHOR = '};\n\nexport const getBlur';
const PHOTOS_RE = /(export const SURFACE_PHOTOS: Record<string, string> = \{[\s\S]*?)(\n\};)/;

const files = fs.readdirSync(src).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
let ok = 0;
for (const f of files.sort()) {
  const base = f.replace(/\.[^.]+$/, '');
  const slug = slugify(base.replace(/^surface[-_ ]?/i, ''));
  if (!slug) { console.warn(`⚠️  ${f} : nom illisible, ignoré`); continue; }
  if (!surfaceSlugs.has(slug)) console.warn(`⚠️  ${f} : aucune surface nommée « ${slug} » (photo intégrée quand même)`);

  const publicPath = `/images/surfaces/surface-${slug}.jpg`;
  const outFile = path.join(OUT_DIR, `surface-${slug}.jpg`);
  const img = sharp(path.join(src, f)).rotate();
  await img.clone().resize(1200, 800, { fit: 'cover' }).jpeg({ quality: 70, progressive: true, mozjpeg: true }).toFile(outFile);
  const blur = await img.clone().resize(20, 13, { fit: 'cover' }).jpeg({ quality: 40 }).toBuffer();
  const dataUri = `data:image/jpeg;base64,${blur.toString('base64')}`;

  if (!blurTs.includes(`"${publicPath}"`)) {
    blurTs = blurTs.replace(BLUR_ANCHOR, `  "${publicPath}": "${dataUri}",\n${BLUR_ANCHOR}`);
  }
  if (!scenesTs.includes(`'${slug}':`)) {
    scenesTs = scenesTs.replace(PHOTOS_RE, (_, head, tail) => `${head}\n  '${slug}': '${publicPath}',${tail}`);
  }
  const kb = Math.round(fs.statSync(outFile).size / 1024);
  console.log(`✅ ${f} → ${publicPath} (${kb} Ko)`);
  ok++;
}
fs.writeFileSync(BLUR_TS, blurTs);
fs.writeFileSync(SCENES_TS, scenesTs);
console.log(`\n${ok} photo(s) intégrée(s). Reste : npm run build, puis commit.`);
