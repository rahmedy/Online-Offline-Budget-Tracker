console.log('Hello from service worker!');
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';
const FILES_TO_CACHE = [ '/', '/index.html', '/index.js', '/db.js', '/manifest.webmanifest' ];

// install
self.addEventListener('install', function(evt) {
	evt.waitUntil(caches.open(DATA_CACHE_NAME).then((cache) => cache.add('/api/transaction')));

	// pre cache all static assets
	evt.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)));

	// tell the browser to activate this service worker immediately once it
	// has finished installing
	self.skipWaiting();
});

self.addEventListener("activate", function(evt) {
    evt.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log("Removing old cache data", key);
              return caches.delete(key);
            }
          })
        );
      })
    );
  
    self.clients.claim();
  });

  self.addEventListener('fetch', function(evt) {
    // code to handle requests goes here
    
    });