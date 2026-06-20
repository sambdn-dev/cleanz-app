/* Service worker minimal pour Cleanz.
 * Objectif : activer le cycle de mise à jour (prompt « Nouvelle version
 * disponible ») + un repli hors-ligne, SANS jamais servir de contenu périmé.
 *
 * Stratégie : network-first sur toutes les requêtes GET same-origin.
 * → en ligne, on sert toujours la version fraîche du réseau ;
 * → hors-ligne seulement, on retombe sur le cache.
 *
 * Le worker ne s'auto-active PAS (pas de skipWaiting automatique) : il reste
 * en attente jusqu'à ce que l'utilisateur clique « Actualiser », ce qui
 * envoie le message SKIP_WAITING.
 */
const CACHE = 'cleanz-runtime-v1';

self.addEventListener('install', () => {
  // On attend volontairement (pas de skipWaiting) pour laisser apparaître
  // le prompt de mise à jour côté app.
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // On ne gère que le même domaine (on laisse passer fonts, analytics, etc.).
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      try {
        const fresh = await fetch(req);
        // Mémorise une copie pour le hors-ligne.
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      } catch {
        const cached = await caches.match(req);
        if (cached) return cached;
        throw new Error('offline and not cached');
      }
    })()
  );
});
