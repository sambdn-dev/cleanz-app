/** Lancer : node --experimental-strip-types scripts/test-publication-cache.mts */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';
import { PUBLICATION_VERSION } from '../src/data/publication-version.ts';

// Exécute le vrai handler Next, puis le JavaScript qu'il sert au navigateur.
const source = await readFile(new URL('../src/app/sw.js/route.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
async function getWorker(version = PUBLICATION_VERSION) {
  const exports: { GET?: () => Promise<Response> } = {};
  vm.runInNewContext(compiled, {
    exports, Response,
    process: { env: { VERCEL_GIT_COMMIT_SHA: 'abc12345abcdef' } },
    require: (path: string) => {
      assert.equal(path, '@/data/publication-version');
      return { PUBLICATION_VERSION: version };
    },
  });
  assert.ok(exports.GET);
  return exports.GET();
}

const response = await getWorker();
assert.match(response.headers.get('Cache-Control')!, /no-store/);
const workerCode = await response.text();
assert.ok(workerCode.includes(PUBLICATION_VERSION));
assert.notEqual(workerCode, await (await getWorker('next-editorial-version')).text());

type CacheRequest = { url: string; method: string; mode?: string };
type WorkerEvent = {
  request?: CacheRequest;
  data?: { type: string };
  waitUntil: (promise: Promise<unknown>) => void;
  respondWith?: (response: Promise<Response>) => void;
};
const listeners = new Map<string, (event: WorkerEvent) => void>();
const stores = new Map<string, Map<string, Response>>();
const cacheReads: string[] = [];
let claimed = 0;
let skipped = 0;
let writesFail = false;
let network: (request: CacheRequest, init?: RequestInit) => Promise<Response> = async () => new Response('réseau');
const getStore = (name: string) => {
  if (!stores.has(name)) stores.set(name, new Map());
  return stores.get(name)!;
};
const context = vm.createContext({
  URL, Response,
  self: {
    location: { origin: 'https://cleanz.test' },
    clients: { claim: async () => { claimed++; } },
    skipWaiting: () => { skipped++; },
    addEventListener: (type: string, callback: (event: WorkerEvent) => void) => listeners.set(type, callback),
  },
  fetch: (request: CacheRequest, init?: RequestInit) => network(request, init),
  caches: {
    keys: async () => [...stores.keys()],
    delete: async (name: string) => stores.delete(name),
    match: () => { throw new Error('Interdit : recherche globale parmi les anciens caches'); },
    open: async (name: string) => ({
      put: async (request: CacheRequest, value: Response) => {
        if (writesFail) throw new Error('Quota indisponible');
        getStore(name).set(request.url, value);
      },
      match: async (request: CacheRequest) => {
        cacheReads.push(name);
        return getStore(name).get(request.url)?.clone();
      },
    }),
  },
});
vm.runInContext(workerCode, context);
const currentCache = vm.runInContext('CACHE', context) as string;
assert.equal(currentCache, `cleanz-runtime-${PUBLICATION_VERSION}-abc12345`);

async function dispatch(type: string, input: Partial<WorkerEvent> = {}) {
  const pending: Promise<unknown>[] = [];
  let response: Promise<Response> | undefined;
  listeners.get(type)!({
    ...input,
    waitUntil: (promise) => { pending.push(promise); },
    respondWith: (value) => { response = value; },
  });
  const result = await response;
  await Promise.all(pending);
  return result;
}
const request = (path: string, mode = 'cors'): CacheRequest => ({
  url: `https://cleanz.test${path}`, method: 'GET', mode,
});
const fetchRequest = (req: CacheRequest) => dispatch('fetch', { request: req });
const oldCache = 'cleanz-runtime-ancien-build';
const otherCache = 'autre-application';
getStore(oldCache).set('ancienne-fiche', new Response('ancienne recette'));
getStore(otherCache).set('document', new Response('à conserver'));
getStore(currentCache);
await dispatch('install');
assert.equal(skipped, 0, 'pas de remplacement automatique du client ouvert');
await dispatch('activate');
assert.equal(claimed, 1);
assert.equal(stores.has(oldCache), false, 'ancien cache Cleanz supprimé');
assert.equal(stores.has(otherCache), true, 'cache étranger conservé');
assert.equal(await getStore(otherCache).get('document')!.text(), 'à conserver');
assert.equal(stores.has(currentCache), true);

const staticRequest = request('/_next/static/chunks/app-123.js');
network = async () => new Response('asset courant');
assert.equal(await (await fetchRequest(staticRequest))!.text(), 'asset courant');
assert.equal(await getStore(currentCache).get(staticRequest.url)!.clone().text(), 'asset courant');

for (const status of [403, 404, 500]) {
  const req = request(`/_next/static/error-${status}.js`);
  network = async () => new Response('erreur réseau', { status });
  assert.equal((await fetchRequest(req))!.status, status);
  assert.equal(getStore(currentCache).has(req.url), false, `${status} ne doit pas être conservé`);
}
const noStoreRequest = request('/_next/static/no-store.js');
network = async () => new Response('privé', { headers: { 'Cache-Control': 'no-store' } });
await fetchRequest(noStoreRequest);
assert.equal(getStore(currentCache).has(noStoreRequest.url), false);

const dynamicRequests = [
  request('/?fiche=recette-13', 'navigate'),
  request('/?_rsc=ancienne-version'),
  request('/api/conseils'),
  request('/sw.js'),
];
for (const req of dynamicRequests) {
  network = async (_, init) => {
    assert.equal(init?.cache, 'no-store', 'les conseils contournent aussi le cache HTTP');
    return new Response('conseil actuel');
  };
  assert.equal(await (await fetchRequest(req))!.text(), 'conseil actuel');
  assert.equal(getStore(currentCache).has(req.url), false, 'HTML/RSC/API/worker jamais conservés');
}

// Simule même un ancien catalogue placé par erreur dans le cache courant : il
// ne doit pas réapparaître hors ligne, ni depuis celui d'une autre application.
for (const req of dynamicRequests) {
  getStore(currentCache).set(req.url, new Response('ancienne recette suspendue'));
  getStore(oldCache).set(req.url, new Response('ancienne recette suspendue'));
  getStore(otherCache).set(req.url, new Response('ancienne recette suspendue'));
}
network = async () => { throw new TypeError('Offline'); };
for (const req of dynamicRequests) {
  const fallback = (await fetchRequest(req))!;
  assert.equal(fallback.status, 503);
  assert.equal(fallback.headers.get('Cache-Control'), 'no-store');
  const body = await fallback.text();
  assert.doesNotMatch(body, /ancienne recette suspendue/);
  if (req.mode === 'navigate') {
    assert.match(body, /Les fiches ne sont pas disponibles hors ligne/);
    assert.match(body, /flacons et favoris/);
    assert.match(body, /Réessayer/);
  }
}
assert.equal(cacheReads.length, 0, 'aucune recherche dans les caches pour les conseils');
assert.equal(await (await fetchRequest(staticRequest))!.text(), 'asset courant');
assert.deepEqual(cacheReads, [currentCache], 'repli statique limité à la version courante');

const staleAsset = request('/_next/static/chunks/ancien-uniquement.js');
getStore(oldCache).set(staleAsset.url, new Response('ancien asset'));
getStore(otherCache).set(staleAsset.url, new Response('autre ancien asset'));
assert.equal((await fetchRequest(staleAsset))!.status, 503, 'ne pas lire un asset dans un ancien cache');
const poisonedAsset = request('/_next/static/chunks/ancienne-erreur.js');
getStore(currentCache).set(poisonedAsset.url, new Response('ancienne erreur', { status: 500 }));
assert.equal((await fetchRequest(poisonedAsset))!.status, 503, 'ne pas servir une erreur mise en cache');

network = async () => new Response('erreur serveur actuelle', { status: 500 });
assert.equal((await fetchRequest(dynamicRequests[0]))!.status, 500, 'ne pas masquer une erreur serveur avec une fiche ancienne');
assert.equal((await fetchRequest(staticRequest))!.status, 500, 'ne pas masquer une erreur serveur avec un asset');
writesFail = true;
network = async () => new Response('réseau malgré quota');
assert.equal(await (await fetchRequest(staticRequest))!.text(), 'réseau malgré quota');
assert.equal(await fetchRequest({ ...staticRequest, method: 'POST' }), undefined);
assert.equal(await fetchRequest({ ...staticRequest, url: 'https://autre.test/script.js' }), undefined);
await dispatch('message', { data: { type: 'IGNORER' } });
assert.equal(skipped, 0);
await dispatch('message', { data: { type: 'SKIP_WAITING' } });
assert.equal(skipped, 1);

console.log('Cache publication : version, isolation, erreurs, HTML/RSC/API hors ligne et actualisation explicite vérifiés.');
