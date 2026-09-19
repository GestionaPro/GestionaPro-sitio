// Service worker mínimo — su único propósito es cumplir el requisito técnico de Chrome/Android
// para que la página se considere una PWA instalable (criterio para empaquetar con Bubblewrap).
// No cachea nada: cada solicitud va directo a la red.

self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return new Response('Sin conexión a internet.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    })
  );
});
