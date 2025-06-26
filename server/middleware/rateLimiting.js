const rateLimit = require('express-rate-limit');

// Optional Redis support - fallback to memory if Redis is not available
let RedisStore, RateLimiterRedis, redis;
try {
  RedisStore = require('rate-limit-redis');
  RateLimiterRedis = require('rate-limiter-flexible').RateLimiterRedis;
  redis = require('redis');
} catch (err) {
  console.warn('Redis packages not available, using memory store for rate limiting');
}

// Redis client for advanced rate limiting (optional)
let redisClient;
if (redis) {
  try {
    redisClient = redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });
    redisClient.connect().catch(err => {
      console.warn('Redis connection failed, using memory store:', err.message);
      redisClient = null;
    });
  } catch (err) {
    console.warn('Redis client creation failed:', err.message);
    redisClient = null;
  }
}

// Different rate limits for different endpoints
const createRateLimit = (windowMs, max, message, skipSuccessfulRequests = false) => {
  const store = redisClient && RedisStore ? new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }) : undefined;

  return rateLimit({
    windowMs,
    max,
    message: {
      error: 'Too many requests',
      message,
      retryAfter: Math.ceil(windowMs / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests,
    store,
    keyGenerator: (req) => {
      // Use IP + user ID for more accurate limiting
      const userId = req.user?.id || 'anonymous';
      return `${req.ip}-${userId}`;
    },
    skip: (req) => {
      // Skip rate limiting for health checks
      return req.path === '/health' || req.path === '/api/health';
    },
    handler: (req, res) => {
      console.warn(`Rate limit exceeded for ${req.ip} on ${req.path}`);
      res.status(429).json({
        error: 'Too many requests',
        message: message,
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }
  });
};

// Stricter rate limiting for auth endpoints
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs for auth
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  store: redisClient && RedisStore ? new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }) : undefined, // Use default memory store if Redis unavailable
});

// Basic API rate limiting
const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  store: redisClient && RedisStore ? new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }) : undefined, // Use default memory store if Redis unavailable
});

// Aggressive rate limiting for expensive operations
const heavyOperationsRateLimit = createRateLimit(
  60 * 1000, // 1 minute
  10, // 10 requests
  'Too many resource-intensive requests',
  false
);

// Search rate limiting
const searchRateLimit = createRateLimit(
  60 * 1000, // 1 minute
  30, // 30 searches per minute
  'Too many search requests',
  false
);

// File upload rate limiting
const uploadRateLimit = createRateLimit(
  60 * 1000, // 1 minute
  5, // 5 uploads per minute
  'Too many upload requests',
  false
);

// Contact form rate limiting
const contactRateLimit = createRateLimit(
  60 * 60 * 1000, // 1 hour
  3, // 3 messages per hour
  'Too many contact form submissions',
  false
);

// Enterprise DDoS protection
const ddosProtection = (req, res, next) => {
  const userAgent = req.get('User-Agent') || '';
  const suspiciousPatterns = [
    /bot/i,
    /crawl/i,
    /spider/i,
    /scrape/i,
    /curl/i,
    /wget/i
  ];

  // Block suspicious user agents (unless whitelisted)
  const whitelistedBots = ['googlebot', 'bingbot', 'facebookexternalhit'];
  const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(userAgent));
  const isWhitelisted = whitelistedBots.some(bot => userAgent.toLowerCase().includes(bot));

  if (isSuspicious && !isWhitelisted) {
    return res.status(403).json({
      error: 'Access denied',
      message: 'Automated requests are not permitted'
    });
  }

  // Check for rapid successive requests
  const clientKey = `ddos:${req.ip}`;
  const now = Date.now();
  const timeWindow = 10 * 1000; // 10 seconds
  const maxRequests = 50; // 50 requests in 10 seconds

  // This would need to be implemented with Redis in production
  // For now, we'll use a simple in-memory approach
  if (!global.ddosTracker) {
    global.ddosTracker = new Map();
  }

  const clientRequests = global.ddosTracker.get(clientKey) || [];
  const recentRequests = clientRequests.filter(timestamp => now - timestamp < timeWindow);

  if (recentRequests.length >= maxRequests) {
    return res.status(429).json({
      error: 'Too many requests',
      message: 'Request rate too high, please slow down',
      retryAfter: 30
    });
  }

  recentRequests.push(now);
  global.ddosTracker.set(clientKey, recentRequests);

  // Clean up old entries periodically
  if (Math.random() < 0.01) { // 1% chance to clean up
    for (const [key, requests] of global.ddosTracker.entries()) {
      const validRequests = requests.filter(timestamp => now - timestamp < timeWindow);
      if (validRequests.length === 0) {
        global.ddosTracker.delete(key);
      } else {
        global.ddosTracker.set(key, validRequests);
      }
    }
  }

  next();
};

// Adaptive rate limiting based on server load
const adaptiveRateLimit = (req, res, next) => {
  const cpuUsage = process.cpuUsage();
  const memoryUsage = process.memoryUsage();

  // Reduce rate limits if server is under stress
  const cpuLoad = (cpuUsage.user + cpuUsage.system) / 1000000; // Convert to seconds
  const memoryLoad = memoryUsage.heapUsed / memoryUsage.heapTotal;

  if (cpuLoad > 0.8 || memoryLoad > 0.9) {
    // Server under high load, apply stricter limits
    return createRateLimit(
      60 * 1000, // 1 minute
      20, // Reduced to 20 requests
      'Server under high load, please try again later'
    )(req, res, next);
  }

  next();
};

module.exports = {
  authRateLimit,
  apiRateLimit,
  heavyOperationsRateLimit,
  searchRateLimit,
  uploadRateLimit,
  contactRateLimit,
  ddosProtection,
  adaptiveRateLimit
};