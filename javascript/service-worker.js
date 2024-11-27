const cacheName = 'v1';

const cachedAssets = [
	'/index.html',
	'/javascript/main.js',
	'/javascript/service-worker.js',
]

// call install
self.addEventListener('install', (event) => {
	console.log('Service worker: installing...');
	event.waitUntil(
		caches.open(cacheName)
		.then(cache => {
			console.log('Service Worker: caching files');
			cache.addAll(cachedAssets); // add the assets to the cache
		})
		.then(() => self.skipWaiting())
	)
});

// call activation
self.addEventListener('activate', (event) => {
	console.log('Service worker activated');
	event.waitUntil(
		caches.keys()
		.then(cache_keys => {
			return Promise.all(
				cache_keys.map(this_cache => {
					if (this_cache !== cacheName) {
						console.log('Service worker: clearing old cache');
						caches.delete(cache); // remove old cache
					}
				})
			)
		})
	)
});

// call fetch
self.addEventListener('fetch', (event) => {
	console.log('Service worker: fetch event called');
	event.respondWith(
		fetch(event.request)
		.catch(() => caches.match(event.request)) // respond with the cache if there's no connection
	)
})