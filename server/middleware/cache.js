
const NodeCache = require('node-cache');

// Create cache instances
const apiCache = new NodeCache({
  stdTTL: 300, // 5 minutes default
  checkperiod: 60, // Check for expired keys every minute
  useClones: false
});

const responseCache = new NodeCache({
  stdTTL: 3600, // 1 hour for static responses
  checkperiod: 300,
  useClones: false
});

// Cache middleware factory
const cache = (duration = 300, keyGenerator = null) => {
  return (req, res, next) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }
    
    // Generate cache key
    const key = keyGenerator 
      ? keyGenerator(req) 
      : `${req.originalUrl}_${req.user?.id || 'anonymous'}`;
    
    // Check cache
    const cachedResponse = apiCache.get(key);
    if (cachedResponse) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('X-Cache-Key', key);
      return res.json(cachedResponse);
    }
    
    // Store original res.json
    const originalJson = res.json;
    
    // Override res.json to cache response
    res.json = function(data) {
      // Only cache successful responses
      if (res.statusCode === 200 && data.success !== false) {
        apiCache.set(key, data, duration);
      }
      
      res.setHeader('X-Cache', 'MISS');
      res.setHeader('X-Cache-Key', key);
      originalJson.call(this, data);
    };
    
    next();
  };
};

// Product-specific cache with tags
const productCache = (req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }
  
  const { category, page = 1, limit = 20, sort = 'newest' } = req.query;
  const key = `products:${category || 'all'}:${page}:${limit}:${sort}`;
  
  const cached = apiCache.get(key);
  if (cached) {
    res.setHeader('X-Cache', 'HIT');
    return res.json(cached);
  }
  
  const originalJson = res.json;
  res.json = function(data) {
    if (res.statusCode === 200 && data.success !== false) {
      // Cache for 10 minutes
      apiCache.set(key, data, 600);
      
      // Also cache individual products
      if (data.products && Array.isArray(data.products)) {
        data.products.forEach(product => {
          apiCache.set(`product:${product._id}`, product, 1800); // 30 minutes
        });
      }
    }
    
    res.setHeader('X-Cache', 'MISS');
    originalJson.call(this, data);
  };
  
  next();
};

// Cache invalidation helpers
const invalidateCache = {
  product: (productId) => {
    const keys = apiCache.keys();
    keys.forEach(key => {
      if (key.includes('products:') || key === `product:${productId}`) {
        apiCache.del(key);
      }
    });
  },
  
  user: (userId) => {
    const keys = apiCache.keys();
    keys.forEach(key => {
      if (key.includes(`_${userId}`)) {
        apiCache.del(key);
      }
    });
  },
  
  all: () => {
    apiCache.flushAll();
    responseCache.flushAll();
  }
};

// Cache statistics
const getCacheStats = () => {
  return {
    api: {
      keys: apiCache.keys().length,
      hits: apiCache.getStats().hits,
      misses: apiCache.getStats().misses,
      size: apiCache.keys().length
    },
    response: {
      keys: responseCache.keys().length,
      hits: responseCache.getStats().hits,
      misses: responseCache.getStats().misses,
      size: responseCache.keys().length
    }
  };
};

module.exports = {
  cache,
  productCache,
  invalidateCache,
  getCacheStats,
  apiCache,
  responseCache
};
