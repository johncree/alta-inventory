const CACHE = 'alta-app';
const CDN_CACHE = 'alta-cdn';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CDN_CACHE)
      .then(c => c.add('https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js'))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // CDN assets: cache-first (pinned version, never changes)
  if (url.hostname === 'cdn.jsdelivr.net') {
    e.respondWith(
      caches.match(e.request).then(hit =>
        hit || fetch(e.request).then(res => {
          caches.open(CDN_CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        })
      )
    );
    return;
  }

  // Own files: network-first so every load gets the latest version when online
  e.respondWith(
    fetch(e.request)
      .then(res => {
        caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
