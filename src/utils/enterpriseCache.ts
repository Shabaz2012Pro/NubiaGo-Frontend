
interface CacheConfig {
  ttl: number;
  maxSize: number;
  strategy: 'LRU' | 'FIFO' | 'TTL';
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  hits: number;
  ttl: number;
}

export class EnterpriseCache<T = any> {
  private cache = new Map<string, CacheEntry<T>>();
  private config: CacheConfig;
  private accessOrder: string[] = [];

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      ttl: 5 * 60 * 1000, // 5 minutes default
      maxSize: 1000,
      strategy: 'LRU',
      ...config
    };

    // Periodic cleanup
    setInterval(() => this.cleanup(), 60000); // Every minute
  }

  set(key: string, data: T, customTTL?: number): void {
    const ttl = customTTL || this.config.ttl;
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      hits: 0,
      ttl
    };

    // Check size limit
    if (this.cache.size >= this.config.maxSize) {
      this.evict();
    }

    this.cache.set(key, entry);
    this.updateAccessOrder(key);
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check TTL
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.removeFromAccessOrder(key);
      return null;
    }

    entry.hits++;
    this.updateAccessOrder(key);
    return entry.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    this.removeFromAccessOrder(key);
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
    this.accessOrder = [];
  }

  size(): number {
    return this.cache.size;
  }

  private evict(): void {
    if (this.accessOrder.length === 0) return;

    let keyToEvict: string;

    switch (this.config.strategy) {
      case 'LRU':
        keyToEvict = this.accessOrder[0];
        break;
      case 'FIFO':
        keyToEvict = this.accessOrder[0];
        break;
      case 'TTL':
        keyToEvict = this.findOldestEntry();
        break;
      default:
        keyToEvict = this.accessOrder[0];
    }

    this.delete(keyToEvict);
  }

  private findOldestEntry(): string {
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    return oldestKey;
  }

  private updateAccessOrder(key: string): void {
    this.removeFromAccessOrder(key);
    this.accessOrder.push(key);
  }

  private removeFromAccessOrder(key: string): void {
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }
  }

  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.delete(key));
  }

  // Get cache statistics
  getStats(): {
    size: number;
    hitRate: string;
    memoryUsage: number;
    oldestEntry: number;
  } {
    let totalHits = 0;
    let totalRequests = 0;
    let oldestTimestamp = Date.now();

    for (const entry of this.cache.values()) {
      totalHits += entry.hits;
      totalRequests += entry.hits + 1; // +1 for initial set
      if (entry.timestamp < oldestTimestamp) {
        oldestTimestamp = entry.timestamp;
      }
    }

    return {
      size: this.cache.size,
      hitRate: totalRequests > 0 ? ((totalHits / totalRequests) * 100).toFixed(2) + '%' : '0%',
      memoryUsage: JSON.stringify(Array.from(this.cache.entries())).length,
      oldestEntry: Date.now() - oldestTimestamp
    };
  }
}

// Global cache instances for different data types
export const apiCache = new EnterpriseCache({
  ttl: 5 * 60 * 1000, // 5 minutes
  maxSize: 500,
  strategy: 'LRU'
});

export const imageCache = new EnterpriseCache({
  ttl: 30 * 60 * 1000, // 30 minutes
  maxSize: 200,
  strategy: 'TTL'
});

export const userDataCache = new EnterpriseCache({
  ttl: 10 * 60 * 1000, // 10 minutes
  maxSize: 100,
  strategy: 'LRU'
});
