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
  event.respondWith(
    fetch(event.request).then(res => {
      //console.log(res);
      //console.log(caches.open("v1"))

      return caches.open('v1').then((cache)=>{
        return cache.put(event.request,res.clone()).then(()=>{ return res;})
      });

    }).catch(function(res) {
      console.log("catch")
      console.log("catch" , res)

      console.log(caches.match(event.request))

      // return caches.match(event.request).;
      return caches.match(event.request).then((res)=>{
        console.log(res)
        console.log( /\.json$/g.test(event.request.url))
        if (!res){
          return new Response("Response body", {
            headers: { "Content-Type" : "text/plain" }
          });
        }
        return res
      });
    })
  );
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
