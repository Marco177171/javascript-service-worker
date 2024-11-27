# javascript-service-worker
A super minimal service worker for comprehension and basic implementation

# exaplanation
Load a service worker js file from the html page via script - src -> main.js.
In main.js, check whether service workers are compatible with the current browser.
If yes, add an event listener on load.

```javascript
window.addEventListener('load', () => {
    ...
})
```

In the arrow function, call the registration process of the serviceWorker with a try catch routine.

```javascript
navigator.serviceWorker
.register('/path/to/the/service-worker.js')
.then(reg => console.log('Service worker registered'))
.catch(err => console.error(´ERROR: ${err}´))
```

# registration process
First define a name for the cache you want to be saved by the browser.

```javascript
const cacheName = 'V1'
```

Once defined a name, define a list with the files you want the browser to save in the cache.

```javascript
const cachedAssets = [
    'file1.html',
    'file2.html',
    'service-worker',
    '...',
]
```

# install the service worker
Let's call the installation process with an event listener and arrow function.

```javascript
self.addEventListener('install', (event) => {
    ...
})
```

In the arrow function, use the waitUntil method of the event object. In it, open the cache (cacheName) and .addAll cachedAssets to it.

```javascript
event.waitUntil(
    caches.open(cacheName)
    .then(cache => {
        cache.addAll(cachedAssets);
    })
    .then(() => self.skipWaiting())
)
```

# activation of the service worker
Define what to do on activation. Add an eventListener on the 'activate' event.

```javascript
self.addEventListener('activate', (event) => {
    ...
})
```

Usually, in the arrow function, you'll want to update the preexisting cache with the new one, deleting the older one.
Convert the cache to an iterable object

```javascript
event.waitUntil(
    caches.keys()
    .then(cache_keys => {
        ...
    })
)
```

Now, iterate along the keys. If a cache with a different name from the current one is found, delete it.

```javascript
return Promise.all(
    cache_keys.map(this_cache => {
        if (this_cache !== cacheName) {
            caches.delete(cache);
        }
    }) 
)
```

# Use fetch events to activate service worker's functions
In order to trigger the worker, it has to receive a fetch call.
In this example, we'll use a fetch event to answer with our cached objects if user's internet connection drops.
First, let's add an eventListener on 'fetch'.

```javascript
self.addEventListener('fetch', (event) => {
    ...
})
```

Now, let's define service workers response in the arrow function.

```javascript
event.respondWith(
    fetch(event.request)
    .catch(() => caches.match(event.request))
)
```

Test the code by running the index file in a server.
If using visual studio, use simple extensions like live server.
Check the logs and the cache. The service worker should be saved.
Now, untick the online mode and reload the page. The service worker should be providing offline support.

STUDIOPULSAR 2024
https://studiopulsar.pro
