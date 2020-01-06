importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js")
console.log('Siemanko z Service Workiera')

workbox.routing.registerRoute(
  /https:\/\/jsonplaceholder\.typicode\.com\/users/,
  new workbox.strategies.NetworkFirst()
)

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
)

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);


workbox.precaching.precacheAndRoute([])

workbox.core.skipWaiting()
workbox.core.clientsClaim()
