#!/usr/bin/env node
/**
 * Intègre les visuels produits du Top 5 (onglet Matériel).
 *
 *   node scripts/ingest-refs.mjs <dossier-source>
 *
 * NOMENCLATURE : `ref-<famille>-<rang>.png`   (PNG détouré de préférence)
 *   famille = vapeur | aspirateur | robot | injecteur | haute-pression
 *   rang    = 1 à 5, dans l'ordre du top 5 de src/data/materiel.ts
 *   ex. ref-vapeur-1.png = Kärcher SC 5 EasyFix, ref-haute-pression-2.png = Nilfisk Core 130
 *
 * Pour chaque fichier : redimensionne (max 640×400, alpha conservé) →
 * public/images/materiel/refs/<famille>-<rang>.png, puis renseigne `image`
 * sur la bonne référence dans materiel.ts. Idempotent.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const src = process.argv[2];
if (!src || !fs.existsSync(src)) {
  console.error('Usage : node scripts/ingest-refs.mjs <dossier-source>');
  process.exit(1);
}
const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'public/images/materiel/refs');
const MATERIEL_TS = path.join(ROOT, 'src/data/materiel.ts');
fs.mkdirSync(OUT_DIR, { recursive: true });

let lines = fs.readFileSync(MATERIEL_TS, 'utf8').split('\n');
let ok = 0;
for (const f of fs.readdirSync(src).sort()) {
  const m = /^ref-([a-z-]+?)-([1-5])\.(png|jpe?g|webp)$/i.exec(f);
  if (!m) { if (/\.(png|jpe?g|webp)$/i.test(f)) console.warn(`⚠️  ${f} : attendu ref-<famille>-<rang>.png, ignoré`); continue; }
  const [, famille, rang] = m;
  const publicPath = `/images/materiel/refs/${famille}-${rang}.png`;
  await sharp(path.join(src, f)).rotate().resize(640, 400, { fit: 'inside', withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, `${famille}-${rang}.png`));

  // Localise la famille, puis la n-ième ligne `{ marque:` de son top 5.
  const start = lines.findIndex((l) => l.includes(`id: '${famille}',`));
  if (start < 0) { console.warn(`⚠️  ${f} : famille « ${famille} » inconnue`); continue; }
  let n = 0, done = false;
  for (let i = start; i < lines.length && !lines[i].match(/^\s*budget:/); i++) {
    if (!/^\s*\{ marque:/.test(lines[i])) continue;
    n++;
    if (n !== Number(rang)) continue;
    if (lines[i].includes('image:')) lines[i] = lines[i].replace(/image: '[^']*'/, `image: '${publicPath}'`);
    else lines[i] = lines[i].replace(/ \},?\s*$/, (end) => `, image: '${publicPath}'${end}`);
    done = true;
  }
  if (!done) { console.warn(`⚠️  ${f} : rang ${rang} introuvable pour ${famille}`); continue; }
  console.log(`✅ ${f} → ${publicPath}`);
  ok++;
}
fs.writeFileSync(MATERIEL_TS, lines.join('\n'));
console.log(`\n${ok} visuel(s) intégré(s). Reste : npm run build, puis commit.`);
