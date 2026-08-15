const CACHE = "gama-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || !req.url.startsWith(self.location.origin)) return;

  const url = new URL(req.url);
  const statik =
    url.pathname.startsWith("/_next/") ||
    /\.(webp|png|svg|woff2|ico|txt|json)$/.test(url.pathname);

  if (statik) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            const kopya = res.clone();
            caches.open(CACHE).then((c) => c.put(req, kopya));
            return res;
          })
      )
    );
  } else {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const kopya = res.clone();
          caches.open(CACHE).then((c) => c.put(req, kopya));
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match("/index.html")))
    );
  }
});
