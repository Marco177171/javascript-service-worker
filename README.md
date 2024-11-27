# javascript-service-worker
A super minimal service worker for comprehension and basic implementation
# exaplanation
Load a service worker js file from the html page via script - src -> main.js.
In main.js, check whether service workers are compatible with the current browser.
If yes, add an event listener on load.
´´´js
window.addEventListener('load', () => {
    ...
})
´´´
In the arrow function, call the registration process of the serviceWorker with a try catch routine.
´´´js
navigator.serviceWorker
.register('/path/to/the/service-worker.js')
.then(reg => console.log('Service worker registered'))
.catch(err => console.error(´ERROR: ${err}´))
´´´
# registration process
First define a name for the cache you want to be saved by the browser.
´´´js
const cacheName = 'V1'
´´´
Once defined a name, define a list with the files you want the browser to save in the cache.
´´´js
const cachedAssets = [
    'file1.html',
    'file2.html',
    'service-worker',
    '...',
]
´´´
# install the service worker
Let's call the installation process with an event listener and arrow function.
´´´js
self.addEventListener('install', (event) => {
    ...
})
´´´
In the arrow function, use the waitUntil method of the event object. In it, open the cache (cacheName) and .addAll cachedAssets to it.
´´´js
event.waitUntil(
    caches.open(cacheName)
    .then(cache => {
        cache.addAll(cachedAssets);
    })
    .then(() => self.skipWaiting())
)
´´´

STUDIOPULSAR 2024
https://studiopulsar.pro
