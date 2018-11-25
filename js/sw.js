
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWIth(
    caches.match(e.request).then(function(response) {
      if (response) {
        console.log('Found '
          e.request, ' in cache');
        return response;
      } else {
        console.log('Could not find ', e.request, ' in cache, FETCHING!');
        return fetch(e.request);
        .then(function(response){
            const clonedResponse = reponse.clone();
            caches.open('v1').then(function(cache) {
                caches.put(e.request, clonedResponse);
            })
            return response;
        })
        .catch(function(err){
            console.error(err);
        });
      }
    })
  );
});
