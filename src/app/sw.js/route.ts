import { PUBLICATION_VERSION } from '@/data/publication-version';

// La politique éditoriale change le contenu du worker même sans SHA de build.
// Un ancien client déjà ouvert doit encore accepter la mise à jour et recharger :
// ce worker ne peut pas révoquer le code ou les données déjà chargés en mémoire.

export const dynamic = 'force-dynamic';

const BUILD =
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 8) ||
  process.env.NEXT_PUBLIC_BUILD_ID ||
  'dev';

const SW = `/* Cleanz service worker */
const PUBLICATION_VERSION = ${JSON.stringify(PUBLICATION_VERSION)};
const CACHE_PREFIX = 'cleanz-runtime-';
const CACHE = ${JSON.stringify(`cleanz-runtime-${PUBLICATION_VERSION}-${BUILD}`)};

const offlinePage = () => new Response(\`<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Connexion nécessaire · Cleanz</title>
<style>body{font-family:system-ui,sans-serif;line-height:1.6;margin:0;background:#faf5ff;color:#2d1b4e}main{max-width:32rem;margin:12vh auto;padding:1.5rem}a{display:inline-block;padding:.7rem 1rem;background:#7137bf;color:white;border-radius:.8rem;font-weight:600}</style>
</head><body><main><h1>Une connexion est nécessaire</h1>
<p>Cleanz doit vérifier la version actuelle des conseils avant de les afficher. Les fiches ne sont pas disponibles hors ligne.</p>
<p>Vos flacons et favoris enregistrés sur cet appareil sont conservés. Reconnectez-vous puis réessayez pour consulter leur statut actuel.</p>
<a href="">Réessayer</a></main></body></html>\`, {
  status: 503,
  headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
});

self.addEventListener('install', () => {
  // Pas de skipWaiting auto : on attend le clic « Actualiser ».
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith(CACHE_PREFIX) && k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// Seuls les assets Next sont conservés. Jamais de HTML, RSC ou réponse API :
// un ancien catalogue ne doit pas redevenir consultable lors d'une coupure.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const isStaticAsset = url.pathname.startsWith('/_next/static/');
  event.respondWith((async () => {
    try {
      const fresh = await fetch(req, isStaticAsset ? undefined : { cache: 'no-store' });
      if (isStaticAsset && fresh.status === 200 && !fresh.redirected &&
          !/no-store/i.test(fresh.headers.get('Cache-Control') || '')) {
        // Un échec d'écriture (quota, stockage indisponible) ne masque pas le réseau.
        const copy = fresh.clone();
        event.waitUntil(caches.open(CACHE).then((cache) => cache.put(req, copy)).catch(() => {}));
      }
      return fresh;
    } catch {
      if (isStaticAsset) {
        try {
          const cache = await caches.open(CACHE);
          const cached = await cache.match(req);
          if (cached && cached.status === 200) return cached;
        } catch { /* Le stockage local peut être indisponible. */ }
      }
      if (req.mode === 'navigate') return offlinePage();
      return new Response('Connexion nécessaire pour vérifier les conseils Cleanz.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
      });
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
