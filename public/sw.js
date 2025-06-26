
const CACHE_NAME = 'nubiago-enterprise-v1.2.0';
const STATIC_CACHE = 'nubiago-static-v1.2.0';
const API_CACHE = 'nubiago-api-v1.2.0';
const IMAGE_CACHE = 'nubiago-images-v1.2.0';

// Cache strategies
const CACHE_STRATEGIES = {
  NETWORK_FIRST: 'network-first',
  CACHE_FIRST: 'cache-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Cache configurations
const CACHE_CONFIG = {
  static: {
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxEntries: 100
  },
  api: {
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    maxAge: 5 * 60 * 1000, // 5 minutes
    maxEntries: 200
  },
  images: {
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxEntries: 300
  }
};

// Resources to precache
const PRECACHE_RESOURCES = [
  '/',
  '/manifest.json',
  '/brandmark-design-1024x0 (3).png'
];

// Install event - precache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(PRECACHE_RESOURCES)),
      self.skipWaiting()
    ])
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      cleanupOldCaches(),
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }

  event.respondWith(handleRequest(request));
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(processOfflineActions());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/brandmark-design-1024x0 (3).png',
        badge: '/brandmark-design-1024x0 (3).png',
        tag: data.tag || 'default',
        renotify: true,
        requireInteraction: data.requireInteraction || false,
        actions: data.actions || []
      })
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('/');
    })
  );
});

// Request handling with caching strategies
async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Determine cache strategy based on request type
  if (isStaticResource(url)) {
    return handleStaticResource(request);
  } else if (isApiRequest(url)) {
    return handleApiRequest(request);
  } else if (isImageRequest(url)) {
    return handleImageRequest(request);
  } else {
    return handleGenericRequest(request);
  }
}

// Static resources (JS, CSS, fonts)
async function handleStaticResource(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse && !isExpired(cachedResponse, CACHE_CONFIG.static.maxAge)) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
      await limitCacheSize(STATIC_CACHE, CACHE_CONFIG.static.maxEntries);
    }
    return networkResponse;
  } catch (error) {
    return cachedResponse || new Response('Network error', { status: 408 });
  }
}

// API requests
async function handleApiRequest(request) {
  const cache = await caches.open(API_CACHE);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
      await limitCacheSize(API_CACHE, CACHE_CONFIG.api.maxEntries);
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse && !isExpired(cachedResponse, CACHE_CONFIG.api.maxAge)) {
      return cachedResponse;
    }
    throw error;
  }
}

// Image requests
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse && !isExpired(cachedResponse, CACHE_CONFIG.images.maxAge)) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
      await limitCacheSize(IMAGE_CACHE, CACHE_CONFIG.images.maxEntries);
    }
    return networkResponse;
  } catch (error) {
    return cachedResponse || generatePlaceholderImage();
  }
}

// Generic request handler
async function handleGenericRequest(request) {
  try {
    return await fetch(request);
  } catch (error) {
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const cache = await caches.open(STATIC_CACHE);
      return cache.match('/') || new Response('Offline', { status: 503 });
    }
    throw error;
  }
}

// Utility functions
function isStaticResource(url) {
  return /\.(js|css|woff2?|ttf|eot|ico)$/i.test(url.pathname);
}

function isApiRequest(url) {
  return url.pathname.startsWith('/api/') || url.hostname !== location.hostname;
}

function isImageRequest(url) {
  return /\.(png|jpg|jpeg|gif|webp|svg|avif)$/i.test(url.pathname);
}

function isExpired(response, maxAge) {
  const dateHeader = response.headers.get('date');
  if (!dateHeader) return false;
  
  const age = Date.now() - new Date(dateHeader).getTime();
  return age > maxAge;
}

async function limitCacheSize(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxEntries) {
    const keysToDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
  }
}

async function cleanupOldCaches() {
  const currentCaches = [CACHE_NAME, STATIC_CACHE, API_CACHE, IMAGE_CACHE];
  const cacheNames = await caches.keys();
  
  return Promise.all(
    cacheNames
      .filter(cacheName => !currentCaches.includes(cacheName))
      .map(cacheName => caches.delete(cacheName))
  );
}

function generatePlaceholderImage() {
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f0f0f0"/>
      <text x="200" y="150" text-anchor="middle" fill="#666">Image Unavailable</text>
    </svg>
  `;
  
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' }
  });
}

async function processOfflineActions() {
  // Process queued offline actions
  const offlineActions = await getOfflineActions();
  
  for (const action of offlineActions) {
    try {
      await fetch(action.url, action.options);
      await removeOfflineAction(action.id);
    } catch (error) {
      console.log('Offline action failed:', action, error);
    }
  }
}

async function getOfflineActions() {
  // Implementation would depend on your offline storage strategy
  return [];
}

async function removeOfflineAction(id) {
  // Implementation would depend on your offline storage strategy
}
