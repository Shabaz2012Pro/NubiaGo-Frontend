
import { apiCache } from '../utils/enterpriseCache';

interface RequestConfig {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  cache?: boolean;
  cacheTTL?: number;
  rateLimit?: {
    maxRequests: number;
    windowMs: number;
  };
}

interface QueuedRequest {
  url: string;
  options: RequestInit;
  config: RequestConfig;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  timestamp: number;
}

export class EnterpriseApiClient {
  private baseURL: string;
  private defaultTimeout = 10000;
  private requestQueue: QueuedRequest[] = [];
  private activeRequests = 0;
  private maxConcurrentRequests = 10;
  private rateLimitStore = new Map<string, number[]>();
  private retryDelays = [1000, 2000, 4000]; // Exponential backoff
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.processQueue();
  }

  async request<T>(
    url: string, 
    options: RequestInit = {}, 
    config: RequestConfig = {}
  ): Promise<T> {
    const fullURL = url.startsWith('http') ? url : `${this.baseURL}${url}`;
    const requestKey = this.generateCacheKey(fullURL, options);

    // Check cache first
    if (config.cache !== false) {
      const cached = apiCache.get(requestKey);
      if (cached) {
        return cached;
      }
    }

    // Check rate limiting
    if (config.rateLimit) {
      const identifier = this.getIdentifier(fullURL);
      if (!this.checkRateLimit(identifier, config.rateLimit)) {
        throw new Error('Rate limit exceeded');
      }
    }

    return new Promise((resolve, reject) => {
      const queuedRequest: QueuedRequest = {
        url: fullURL,
        options: {
          ...options,
          signal: this.createTimeoutSignal(config.timeout || this.defaultTimeout)
        },
        config,
        resolve,
        reject,
        timestamp: Date.now()
      };

      this.requestQueue.push(queuedRequest);
    });
  }

  private async processQueue(): Promise<void> {
    setInterval(() => {
      while (
        this.requestQueue.length > 0 && 
        this.activeRequests < this.maxConcurrentRequests
      ) {
        const request = this.requestQueue.shift();
        if (request) {
          this.executeRequest(request);
        }
      }
    }, 100);
  }

  private async executeRequest(queuedRequest: QueuedRequest): Promise<void> {
    this.activeRequests++;
    
    try {
      const response = await this.performRequestWithRetry(
        queuedRequest.url,
        queuedRequest.options,
        queuedRequest.config
      );

      const data = await this.parseResponse(response);

      // Cache successful responses
      if (queuedRequest.config.cache !== false && response.ok) {
        const cacheKey = this.generateCacheKey(queuedRequest.url, queuedRequest.options);
        apiCache.set(cacheKey, data, queuedRequest.config.cacheTTL);
      }

      queuedRequest.resolve(data);
    } catch (error) {
      queuedRequest.reject(error);
    } finally {
      this.activeRequests--;
    }
  }

  private async performRequestWithRetry(
    url: string,
    options: RequestInit,
    config: RequestConfig,
    attemptCount = 0
  ): Promise<Response> {
    try {
      const response = await fetch(url, options);
      
      // Retry on server errors
      if (!response.ok && response.status >= 500 && attemptCount < (config.retries || 3)) {
        const delay = this.retryDelays[attemptCount] || 4000;
        await this.sleep(delay);
        return this.performRequestWithRetry(url, options, config, attemptCount + 1);
      }

      return response;
    } catch (error) {
      if (attemptCount < (config.retries || 3)) {
        const delay = this.retryDelays[attemptCount] || 4000;
        await this.sleep(delay);
        return this.performRequestWithRetry(url, options, config, attemptCount + 1);
      }
      throw error;
    }
  }

  private async parseResponse(response: Response): Promise<any> {
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      return response.json();
    } else if (contentType?.includes('text/')) {
      return response.text();
    } else {
      return response.blob();
    }
  }

  private createTimeoutSignal(timeout: number): AbortSignal {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return controller.signal;
  }

  private generateCacheKey(url: string, options: RequestInit): string {
    const method = options.method || 'GET';
    const body = options.body ? JSON.stringify(options.body) : '';
    return `${method}:${url}:${body}`;
  }

  private checkRateLimit(
    identifier: string, 
    rateLimit: { maxRequests: number; windowMs: number }
  ): boolean {
    const now = Date.now();
    const requests = this.rateLimitStore.get(identifier) || [];
    
    // Clean old requests
    const validRequests = requests.filter(time => now - time < rateLimit.windowMs);
    
    if (validRequests.length >= rateLimit.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.rateLimitStore.set(identifier, validRequests);
    return true;
  }

  private getIdentifier(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.origin + urlObj.pathname;
    } catch {
      return url;
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Batch requests
  async batchRequest<T>(requests: Array<{
    url: string;
    options?: RequestInit;
    config?: RequestConfig;
  }>): Promise<T[]> {
    const promises = requests.map(req => 
      this.request<T>(req.url, req.options, req.config)
    );
    
    return Promise.all(promises);
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.request('/health', {}, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  // Get queue status
  getQueueStatus(): {
    queued: number;
    active: number;
    cacheHitRate: string;
  } {
    return {
      queued: this.requestQueue.length,
      active: this.activeRequests,
      cacheHitRate: apiCache.getStats().hitRate
    };
  }
}

// Global instance
export const enterpriseApiClient = new EnterpriseApiClient(
  import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
);
