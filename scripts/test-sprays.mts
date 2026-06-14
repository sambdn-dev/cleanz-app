/**
 * Test end-to-end de la feature "Mes Sprays".
 * Lancer avec: npx tsx scripts/test-sprays.mts
 */
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';
import {
  parseConservationToDays,
  parseFicheParam,
  buildFicheUrl,
  getDaysUntilExpiry,
} from '../src/utils/sprayUtils.ts';
import { SPRAYS_INDISPENSABLES } from '../src/data/sprays.ts';
import { RECETTES } from '../src/data/recettes.ts';

let passed = 0;
let failed = 0;
const assert = (cond: boolean, msg: string) => {
  if (cond) { passed++; console.log(`  ✓ ${msg}`); }
  else { failed++; console.error(`  ✗ ÉCHEC: ${msg}`); }
};

console.log('\n1) parseConservationToDays');
assert(parseConservationToDays('3 mois') === 90, '"3 mois" => 90 jours');
assert(parseConservationToDays('6 semaines') === 42, '"6 semaines" => 42 jours');
assert(parseConservationToDays('1 an') === 365, '"1 an" => 365 jours');
assert(parseConservationToDays('Préparer à chaque usage') === 1, '"à chaque usage" => 1 jour');
assert(parseConservationToDays('') === 90, 'vide => défaut 90 jours');

console.log('\n2) parseFicheParam / buildFicheUrl (aller-retour)');
assert(JSON.stringify(parseFicheParam('spray-3')) === JSON.stringify({ type: 'spray', id: 3 }), '"spray-3" parsé');
assert(JSON.stringify(parseFicheParam('recette-12')) === JSON.stringify({ type: 'recette', id: 12 }), '"recette-12" parsé');
assert(parseFicheParam('bidon-9') === null, 'type invalide => null');
assert(parseFicheParam(null) === null, 'null => null');
const url = buildFicheUrl('https://cleanz.app', 'spray', 2);
assert(url === 'https://cleanz.app/?fiche=spray-2', 'buildFicheUrl correct');
const back = parseFicheParam(new URL(url).searchParams.get('fiche'));
assert(back?.type === 'spray' && back?.id === 2, 'URL -> param -> parse round-trip');

console.log('\n3) getDaysUntilExpiry');
const now = new Date('2026-06-14T12:00:00Z');
assert(getDaysUntilExpiry('2026-06-24T12:00:00Z', now) === 10, '10 jours restants');
assert(getDaysUntilExpiry('2026-06-10T12:00:00Z', now) === -4, 'périmé => négatif');

console.log('\n4) Résolution scan -> recette (données réelles)');
// Simule un flacon pour chaque spray + quelques recettes, et vérifie que le scan retrouve la fiche
for (const spray of SPRAYS_INDISPENSABLES) {
  const fiche = parseFicheParam(`spray-${spray.id}`);
  const found = fiche && SPRAYS_INDISPENSABLES.find(s => s.id === fiche.id);
  assert(!!found && found.id === spray.id, `scan spray-${spray.id} -> "${spray.nom}"`);
}
const sampleRecettes = RECETTES.slice(0, 3);
for (const r of sampleRecettes) {
  const fiche = parseFicheParam(`recette-${r.id}`);
  const found = fiche && RECETTES.find(x => x.id === fiche.id);
  assert(!!found && found.id === r.id, `scan recette-${r.id} -> "${r.nom}"`);
}

console.log('\n5) QR code RÉEL : encode -> décode (preuve de scannabilité)');
const decodeQR = async (text: string): Promise<string | null> => {
  const dataUrl = await QRCode.toDataURL(text, { margin: 2, width: 300, errorCorrectionLevel: 'M' });
  const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
  const png = PNG.sync.read(Buffer.from(base64, 'base64'));
  const result = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  return result ? result.data : null;
};

const testUrls = [
  'https://cleanz.app/?fiche=spray-1',
  'https://cleanz.app/?fiche=recette-12',
  buildFicheUrl('https://my-cleanz.vercel.app', 'spray', SPRAYS_INDISPENSABLES[0].id),
];
for (const u of testUrls) {
  const decoded = await decodeQR(u);
  assert(decoded === u, `QR « ${u} » se décode à l'identique`);
}

console.log('\n6) Boucle complète : créer flacon -> QR -> scan -> bonne recette');
const spray = SPRAYS_INDISPENSABLES[2];
const ficheUrl = buildFicheUrl('https://cleanz.app', 'spray', spray.id);
const scanned = await decodeQR(ficheUrl);
const parsed = parseFicheParam(new URL(scanned!).searchParams.get('fiche'));
const resolved = parsed && SPRAYS_INDISPENSABLES.find(s => s.id === parsed.id);
assert(!!resolved && resolved.id === spray.id, `flacon "${spray.nom}" : création -> QR -> scan -> recette identique`);

console.log(`\n${'='.repeat(40)}`);
console.log(`Résultat : ${passed} réussis, ${failed} échoués`);
console.log('='.repeat(40));
if (failed > 0) process.exit(1);
