#!/usr/bin/env node
/**
 * Génère les photos de surfaces en une commande, sans passer par ChatGPT.
 * À lancer sur TON ordinateur (l'environnement de dev n'a pas accès à l'API).
 *
 *   OPENAI_API_KEY=sk-... node scripts/generate-images.mjs --lot 2 [--out ./images-lot-2] [--quality medium]
 *   OPENAI_API_KEY=sk-... node scripts/generate-images.mjs --all
 *
 * Lit docs/prompts-surfaces-lots.md, appelle l'API Images d'OpenAI (gpt-image-1,
 * 1536×1024) pour chaque description, et enregistre directement le fichier sous
 * le bon nom (surface-<slug>.png). Les fichiers déjà présents sont ignorés :
 * relancer la commande reprend là où ça s'est arrêté.
 *
 * Coût indicatif (septembre 2026) : ~0,06 € par image en qualité « medium »,
 * ~0,17 € en « high ». Un lot de 10 ≈ 0,60 €.
 *
 * Ensuite :  node scripts/ingest-surfaces.mjs ./images-lot-2
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : def; };
const lot = opt('--lot', null);
const all = args.includes('--all');
const quality = opt('--quality', 'medium');
const out = opt('--out', lot ? `./images-lot-${lot}` : './images-generees');
const key = process.env.OPENAI_API_KEY;

if (!key) { console.error('❌ OPENAI_API_KEY manquante (https://platform.openai.com/api-keys)'); process.exit(1); }
if (!lot && !all) { console.error('Usage : --lot <n>  ou  --all'); process.exit(1); }

const ROOT = path.resolve(import.meta.dirname, '..');
const doc = fs.readFileSync(path.join(ROOT, 'docs/prompts-surfaces-lots.md'), 'utf8');

const STYLE =
  "Photo réaliste, format paysage 3:2. Intérieur scandinave chaleureux : bois clair, blanc cassé, plantes vertes, textiles en lin. " +
  "Lumière naturelle douce venant d'une fenêtre, tons chauds légèrement désaturés, faible profondeur de champ (sujet net, arrière-plan doucement flou). " +
  "Le sujet occupe le centre et les deux tiers inférieurs de l'image. Un ou deux accessoires naturels discrets (citron, éponge végétale, bocal de bicarbonate, vinaigre blanc, chiffon en coton). " +
  "Surface propre et fraîchement entretenue. Aucune personne, aucun texte, aucun logo, aucune marque, aucun produit chimique du commerce.";
const STYLE_EXT =
  " Scène en extérieur : allée pavée claire, garage lumineux ou jardin verdoyant en fin d'après-midi, même lumière douce et même palette chaude.";

// Parse « ## Lot N — … » puis les lignes « 1. **Nom** — description → `fichier` »
const items = [];
let current = null;
for (const line of doc.split('\n')) {
  const h = /^## Lot (\d+) — (.+?) ·/.exec(line);
  if (h) { current = { num: h[1], titre: h[2] }; continue; }
  if (/^## /.test(line)) { current = null; continue; }
  const m = /^\d+\. \*\*(.+?)\*\* — (.+?) → `(.+?)`/.exec(line);
  if (m && current) items.push({ lot: current.num, titre: current.titre, nom: m[1], desc: m[2], file: m[3] });
}
const todo = items.filter((it) => all || it.lot === String(lot));
if (!todo.length) { console.error(`Aucun prompt trouvé pour le lot ${lot}`); process.exit(1); }

fs.mkdirSync(out, { recursive: true });
console.log(`${todo.length} image(s) à générer → ${out} (qualité ${quality})\n`);

let done = 0, skipped = 0, failed = 0;
for (const it of todo) {
  const dest = path.join(out, it.file);
  if (fs.existsSync(dest)) { console.log(`⏭  ${it.file} existe déjà`); skipped++; continue; }
  const exterieur = /Voiture|Extérieur/.test(it.titre);
  const prompt = `${it.desc}\n\n${STYLE}${exterieur ? STYLE_EXT : ''}`;
  process.stdout.write(`🎨 ${it.nom} … `);
  try {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-image-1', prompt, size: '1536x1024', quality, n: 1 }),
    });
    if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 200)}`);
    const json = await res.json();
    const b64 = json.data?.[0]?.b64_json;
    if (!b64) throw new Error('réponse sans image');
    fs.writeFileSync(dest, Buffer.from(b64, 'base64'));
    console.log(`✅ ${it.file}`);
    done++;
  } catch (e) {
    console.log(`❌ ${e.message}`);
    failed++;
  }
}
console.log(`\n${done} générée(s), ${skipped} déjà présente(s), ${failed} échec(s).`);
if (done) console.log(`\nSuite :  node scripts/ingest-surfaces.mjs ${out}`);
