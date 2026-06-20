// Service worker servi dynamiquement pour que son CONTENU change à chaque
// déploiement (le SHA du build est intégré). Ainsi `registration.update()`
// détecte la nouvelle version SANS rechargement → le prompt « Nouvelle version
// disponible » surgit tout seul, app ouverte.

export const dynamic = 'force-dynamic';

const BUILD =
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 8) ||
  process.env.NEXT_PUBLIC_BUILD_ID ||
  'dev';

const SW = `/* Cleanz service worker — build ${BUILD} */
const CACHE = 'cleanz-runtime-${BUILD}';

self.addEventListener('install', () => {
  // Pas de skipWaiting auto : on attend le clic « Actualiser ».
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// Network-first : en ligne on sert toujours frais, le cache n'est qu'un repli hors-ligne.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    try {
      const fresh = await fetch(req);
      const cache = await caches.open(CACHE);
      cache.put(req, fresh.clone());
      return fresh;
    } catch {
      const cached = await caches.match(req);
      if (cached) return cached;
      throw new Error('offline and not cached');
    }
  })());
});
`;

export async function GET() {
  return new Response(SW, {
    headers: {
      'Content-Type': 'text/javascript; charset=utf-8',
      // Jamais mis en cache HTTP : la vérif de MAJ doit toujours voir la dernière version.
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Service-Worker-Allowed': '/',
    },
  });
}
