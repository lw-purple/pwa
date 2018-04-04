var cacheStorageKey = 'minimal-pwa-2'

var cacheList =[
    "/",
    "index.html",
    "index.css",
    "fr.png"
]

self.addEventListener("install",e=>{
    e.waitUntil(
        caches.open(cacheStorageKey)
        .then(cache=>cache.addAll(cacheList))
        .then(()=>self.skipWaiting())
    )
})

self.addEventListener('fetch',function(e){
    e.respondWith(
        caches.match(e.request).then(function(response){
            if(response != null){
                return response
            }
            return fetch(e.request.url)
        })
    )
})

self.addEventListener('activate',function(e){
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheNames => {
                    return cacheNames !== cacheStorageKey
                }).map(cacheNames => {
                    return caches.delete(cacheNames)
                })
            )
        }).then(()=>{
            return self.clients.claim()
        })
    )
})