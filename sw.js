console.log('service worker opperational');
const cacheFiles = [
  '/mws-restaurant-stage-1/',
  '/mws-restaurant-stage-1/restaurant.html',
  '/mws-restaurant-stage-1/css/styles.css',
  '/mws-restaurant-stage-1/js/dbhelper.js',
  '/mws-restaurant-stage-1/js/main.js',
  '/mws-restaurant-stage-1/js/restaurant_info.js',
  '/mws-restaurant-stage-1/data/restaurants.json',
  '/mws-restaurant-stage-1/img/1.jpg',
  '/mws-restaurant-stage-1/img/2.jpg',
  '/mws-restaurant-stage-1/img/3.jpg',
  '/mws-restaurant-stage-1/img/4.jpg',
  '/mws-restaurant-stage-1/img/5.jpg',
  '/mws-restaurant-stage-1/img/6.jpg',
  '/mws-restaurant-stage-1/img/7.jpg',
  '/mws-restaurant-stage-1/img/8.jpg',
  '/mws-restaurant-stage-1/img/9.jpg',
  '/img/10.jpg',
];


self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) {
        console.log('Found ', e.request, ' in cache');
        return response;
      } else {
        console.log('could not find ', e.request, ' in cache, FETCHING');
        return fetch(e.request)
        .then(function(response) {
            const clonedResponse = response.clone();
            caches.open('v1').then(function(cache) {
              cache.put(e.request, clonedResponse);
            })
            return response;
          })
          .catch(function(err) {
            console.error(err);
          });
        }
      }));
  });
