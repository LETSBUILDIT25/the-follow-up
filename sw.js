/* The Follow Up service worker: caches the app shell for offline start and PWA install.
   Supabase API traffic is never cached or intercepted. Bump V to force an update. */
const V = 'follow-up-shell-v1';
const SHELL = ['./', 'index.html', 'style.css', 'app.js', 'manifest.json'];
const CDN = /(^|\.)(cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)$/;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET') return;
  if (u.hostname.endsWith('.supabase.co') || u.hostname.endsWith('.supabase.in')) return; // bypass Supabase API
  if (u.origin !== location.origin && !CDN.test(u.hostname)) return;

  if (r.mode === 'navigate') {
    e.respondWith(
      fetch(r)
        .then(res => { const copy = res.clone(); caches.open(V).then(c => c.put('index.html', copy)); return res; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  e.respondWith(
    caches.match(r).then(hit => {
      const net = fetch(r).then(res => {
        if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(V).then(c => c.put(r, copy)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
