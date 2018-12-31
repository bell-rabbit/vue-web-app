self.addEventListener('install', function (event) {
  console.log('start install')

  event.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll([
        '',
        '/app.js',
        '/service-worker.js',
        '/manifest.json'
      ])
    })
  )
})

self.addEventListener('fetch', function (event) {

  event.respondWith(caches.match(event.request).then(res => {
    console.log(event.request.url)
    if (res) {
      console.log('match');
      return res;
    }
    return fetch(event.request);
  }));
})

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate')
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        console.log('[ServiceWorker] Removing old cache', key)
        if (key !== 'v1') {
          return caches.delete(key)
        }
      }))
    })
  )
})
