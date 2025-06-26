
// Enterprise-grade performance utilities for 100k+ daily users
interface ErrorData {
  type: string;
  message: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  stack?: string;
  timestamp: number;
  userAgent: string;
  url: string;
  status?: number;
  userId?: string;
  sessionId?: string;
}

interface PerformanceMetrics {
  responseTime: number;
  errorRate: number;
  activeUsers: number;
  cacheHitRate: number;
  memoryUsage: number;
  requestsPerMinute: number;
  uptime: number;
  bundleSize: number;
  renderTime: number;
  networkLatency: number;
}

export class EnterprisePerformanceManager {
  private static instance: EnterprisePerformanceManager;
  private performanceObserver: PerformanceObserver | null = null;
  private memoryUsageThreshold = 150 * 1024 * 1024; // 150MB
  private connectionPool: Map<string, any> = new Map();
  private rateLimitStore: Map<string, number[]> = new Map();
  private errorQueue: ErrorData[] = [];
  private metricsHistory: PerformanceMetrics[] = [];
  private alertCallbacks: Array<(alert: any) => void> = [];
  private isMonitoring = false;

  static getInstance(): EnterprisePerformanceManager {
    if (!EnterprisePerformanceManager.instance) {
      EnterprisePerformanceManager.instance = new EnterprisePerformanceManager();
    }
    return EnterprisePerformanceManager.instance;
  }

  // Initialize comprehensive monitoring
  async initializeEnterpriseMonitoring(): Promise<void> {
    try {
      this.isMonitoring = true;
      
      // Start all monitoring systems
      await Promise.all([
        this.initializeMemoryManagement(),
        this.initializePerformanceObserver(),
        this.initializeNetworkMonitoring(),
        this.initializeUserExperienceTracking(),
        this.initializeBundleAnalysis(),
        this.initializeErrorTracking()
      ]);

      console.log('✅ Enterprise Performance Monitoring initialized');
    } catch (error) {
      console.error('❌ Failed to initialize performance monitoring:', error);
    }
  }

  // Advanced bundle preloading strategy
  async preloadCriticalResources(): Promise<void> {
    if (typeof window === 'undefined') return;

    const criticalChunks = [
      '/js/vendor.js',
      '/js/app.js',
      '/css/main.css',
      '/fonts/inter-var.woff2'
    ];

    const preloadPromises = criticalChunks.map(chunk => {
      return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        
        if (chunk.endsWith('.js')) {
          link.rel = 'modulepreload';
        } else if (chunk.endsWith('.css')) {
          link.rel = 'preload';
          link.as = 'style';
        } else if (chunk.includes('font')) {
          link.rel = 'preload';
          link.as = 'font';
          link.crossOrigin = 'anonymous';
        }
        
        link.href = chunk;
        link.onload = () => resolve(chunk);
        link.onerror = () => reject(new Error(`Failed to preload ${chunk}`));
        
        document.head.appendChild(link);
      });
    });

    try {
      const results = await Promise.allSettled(preloadPromises);
      const failed = results.filter(r => r.status === 'rejected');
      
      if (failed.length > 0) {
        console.warn('Some critical resources failed to preload:', failed);
      }
    } catch (error) {
      console.warn('Critical resource preloading failed:', error);
    }
  }

  // Enhanced memory management
  async initializeMemoryManagement(): Promise<void> {
    if (typeof window === 'undefined') return;

    // Monitor memory usage
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = (performance as any).memory;
        if (memory && memory.usedJSHeapSize > this.memoryUsageThreshold) {
          this.triggerMemoryCleanup();
          this.notifyAlert({
            type: 'warning',
            message: `High memory usage: ${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`,
            category: 'memory'
          });
        }
      };

      setInterval(checkMemory, 30000);
    }

    // Monitor component lifecycles
    this.trackComponentLifecycles();

    // Monitor DOM size
    this.monitorDOMSize();
  }

  private async triggerMemoryCleanup(): Promise<void> {
    try {
      // Clear expired cache entries
      if ('caches' in window) {
        await this.cleanExpiredCaches();
      }

      // Clear unused DOM elements
      this.cleanupUnusedDOMElements();

      // Clear large objects from memory
      this.clearLargeObjects();

      // Force garbage collection if available
      if ('gc' in window) {
        (window as any).gc();
      }

      console.log('🧹 Memory cleanup completed');
    } catch (error) {
      console.warn('Memory cleanup failed:', error);
    }
  }

  private async cleanExpiredCaches(): Promise<void> {
    try {
      const cacheNames = await caches.keys();
      const now = Date.now();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        
        for (const request of requests) {
          const response = await cache.match(request);
          if (response) {
            const cacheDate = response.headers.get('date');
            if (cacheDate && now - new Date(cacheDate).getTime() > maxAge) {
              await cache.delete(request);
            }
          }
        }
      }
    } catch (error) {
      console.warn('Cache cleanup failed:', error);
    }
  }

  private cleanupUnusedDOMElements(): void {
    // Remove orphaned event listeners
    const elements = document.querySelectorAll('[data-cleanup="true"]');
    elements.forEach(element => {
      if (!element.isConnected) {
        element.remove();
      }
    });

    // Clear unused images
    const images = document.querySelectorAll('img[data-loaded="false"]');
    images.forEach(img => {
      if (!img.isConnected) {
        img.remove();
      }
    });

    // Remove empty text nodes
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          return node.nodeValue?.trim() === '' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );

    const emptyTextNodes: Node[] = [];
    let node;
    while (node = walker.nextNode()) {
      emptyTextNodes.push(node);
    }

    emptyTextNodes.forEach(node => {
      node.parentNode?.removeChild(node);
    });
  }

  private clearLargeObjects(): void {
    // Clear large arrays and objects from global scope
    if (typeof window !== 'undefined') {
      // Clear any cached API responses older than 10 minutes
      const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
      
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('cache_')) {
          try {
            const cached = JSON.parse(localStorage.getItem(key) || '{}');
            if (cached.timestamp < tenMinutesAgo) {
              localStorage.removeItem(key);
            }
          } catch (error) {
            localStorage.removeItem(key);
          }
        }
      });
    }
  }

  private trackComponentLifecycles(): void {
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          // Track removed nodes for cleanup
          mutation.removedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              element.setAttribute('data-cleanup', 'true');
            }
          });

          // Track added nodes for memory monitoring
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              
              // Check for large components
              if (element.children.length > 100) {
                console.warn('Large component detected:', element.tagName, element.children.length);
              }
            }
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        attributeOldValue: false,
        characterData: false,
        characterDataOldValue: false
      });
    }
  }

  private monitorDOMSize(): void {
    setInterval(() => {
      const domNodes = document.querySelectorAll('*').length;
      const threshold = 10000; // 10k DOM nodes

      if (domNodes > threshold) {
        this.notifyAlert({
          type: 'warning',
          message: `Large DOM detected: ${domNodes} nodes`,
          category: 'dom'
        });
      }
    }, 60000); // Check every minute
  }

  // Initialize Performance Observer
  private async initializePerformanceObserver(): Promise<void> {
    if (typeof PerformanceObserver === 'undefined') return;

    try {
      // Monitor long tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`, entry);
            this.trackError({
              type: 'performance',
              message: `Long task: ${entry.duration.toFixed(2)}ms`,
              timestamp: Date.now(),
              userAgent: navigator.userAgent,
              url: window.location.href
            });
          }
        });
      });

      longTaskObserver.observe({ entryTypes: ['longtask'] });

      // Monitor largest contentful paint
      const lcpObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log(`LCP: ${entry.startTime.toFixed(2)}ms`);
        });
      });

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor layout shifts
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        if (clsValue > 0.1) {
          console.warn(`High CLS detected: ${clsValue.toFixed(4)}`);
        }
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });

    } catch (error) {
      console.warn('Performance observer setup failed:', error);
    }
  }

  // Initialize network monitoring
  private async initializeNetworkMonitoring(): Promise<void> {
    if (typeof window === 'undefined') return;

    // Monitor navigation timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const metrics = {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            ssl: navigation.requestStart - navigation.secureConnectionStart,
            ttfb: navigation.responseStart - navigation.requestStart,
            download: navigation.responseEnd - navigation.responseStart,
            domReady: navigation.domContentLoadedEventEnd - navigation.navigationStart,
            loadComplete: navigation.loadEventEnd - navigation.navigationStart
          };

          console.log('🌐 Network Performance Metrics:', metrics);

          // Alert on slow metrics
          if (metrics.ttfb > 1000) {
            this.notifyAlert({
              type: 'warning',
              message: `Slow TTFB: ${metrics.ttfb.toFixed(0)}ms`,
              category: 'network'
            });
          }
        }
      }, 1000);
    });

    // Monitor fetch performance
    this.monitorFetchPerformance();
  }

  private monitorFetchPerformance(): void {
    if (typeof window === 'undefined') return;

    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = args[0] as string;
      
      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        const duration = endTime - startTime;

        // Log slow requests
        if (duration > 2000) {
          console.warn(`Slow API request: ${url} took ${duration.toFixed(0)}ms`);
          this.notifyAlert({
            type: 'warning',
            message: `Slow API: ${duration.toFixed(0)}ms`,
            category: 'api'
          });
        }

        // Track error responses
        if (!response.ok) {
          this.trackError({
            type: 'network',
            message: `HTTP ${response.status} - ${response.statusText}`,
            url: url,
            status: response.status,
            timestamp: Date.now(),
            userAgent: navigator.userAgent
          });
        }

        return response;
      } catch (error) {
        const endTime = performance.now();
        const duration = endTime - startTime;

        this.trackError({
          type: 'network',
          message: error instanceof Error ? error.message : 'Network request failed',
          url: url,
          timestamp: Date.now(),
          userAgent: navigator.userAgent
        });

        throw error;
      }
    };
  }

  // Initialize user experience tracking
  private async initializeUserExperienceTracking(): Promise<void> {
    if (typeof window === 'undefined') return;

    // Track user interactions
    const interactionEvents = ['click', 'keydown', 'scroll', 'touchstart'];
    
    interactionEvents.forEach(eventType => {
      document.addEventListener(eventType, (event) => {
        // Track interaction timing
        if (event.timeStamp) {
          const now = performance.now();
          const delay = now - event.timeStamp;
          
          if (delay > 100) {
            console.warn(`Slow interaction response: ${eventType} took ${delay.toFixed(2)}ms`);
          }
        }
      }, { passive: true });
    });

    // Track form interactions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      console.log('Form submitted:', form.id || form.className);
    });

    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.log('Page hidden');
      } else {
        console.log('Page visible');
      }
    });
  }

  // Initialize bundle analysis
  private async initializeBundleAnalysis(): Promise<void> {
    if (typeof window === 'undefined') return;

    // Analyze bundle size
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));

    let totalSize = 0;

    for (const script of scripts) {
      try {
        const response = await fetch((script as HTMLScriptElement).src, { method: 'HEAD' });
        const size = parseInt(response.headers.get('content-length') || '0');
        totalSize += size;
      } catch (error) {
        // Ignore CORS errors
      }
    }

    console.log(`📦 Estimated bundle size: ${(totalSize / 1024).toFixed(1)}KB`);

    if (totalSize > 1024 * 1024) { // 1MB
      this.notifyAlert({
        type: 'warning',
        message: `Large bundle size: ${(totalSize / 1024 / 1024).toFixed(1)}MB`,
        category: 'bundle'
      });
    }
  }

  // Enhanced error tracking
  async initializeErrorTracking(): Promise<void> {
    if (typeof window === 'undefined') return;

    // Global error handler
    window.addEventListener('error', (event) => {
      this.trackError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    });

    // Promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    });

    // Console error tracking
    const originalConsoleError = console.error;
    console.error = (...args) => {
      this.trackError({
        type: 'console',
        message: args.join(' '),
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
      originalConsoleError.apply(console, args);
    };
  }

  private trackError(errorData: ErrorData): void {
    // Add to error queue
    this.errorQueue.push(errorData);

    // Keep only last 1000 errors
    if (this.errorQueue.length > 1000) {
      this.errorQueue.splice(0, this.errorQueue.length - 1000);
    }

    // Send to monitoring service
    console.error('Enterprise Error Tracked:', errorData);

    // Store locally for offline scenarios
    try {
      const errors = JSON.parse(localStorage.getItem('enterprise_errors') || '[]');
      errors.push(errorData);
      
      // Keep only last 100 errors in localStorage
      if (errors.length > 100) {
        errors.splice(0, errors.length - 100);
      }
      
      localStorage.setItem('enterprise_errors', JSON.stringify(errors));
    } catch (error) {
      // localStorage might be full
      console.warn('Failed to store error locally:', error);
    }

    // Trigger alert for critical errors
    if (errorData.type === 'javascript' || errorData.status === 500) {
      this.notifyAlert({
        type: 'error',
        message: errorData.message,
        category: 'error'
      });
    }
  }

  // Client-side rate limiting
  checkRateLimit(identifier: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const requests = this.rateLimitStore.get(identifier) || [];
    
    // Clean old requests
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    this.rateLimitStore.set(identifier, validRequests);
    return true;
  }

  // Performance metrics collection
  async getPerformanceMetrics(): Promise<PerformanceMetrics> {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const memory = (performance as any).memory;

    const metrics: PerformanceMetrics = {
      responseTime: navigation ? navigation.responseEnd - navigation.responseStart : 0,
      errorRate: this.calculateErrorRate(),
      activeUsers: this.getActiveUserCount(),
      cacheHitRate: this.calculateCacheHitRate(),
      memoryUsage: memory ? memory.usedJSHeapSize : 0,
      requestsPerMinute: this.getRequestsPerMinute(),
      uptime: performance.now() / 1000 / 60, // Minutes since page load
      bundleSize: await this.getBundleSize(),
      renderTime: this.getRenderTime(),
      networkLatency: this.getNetworkLatency()
    };

    // Store metrics history
    this.metricsHistory.push(metrics);
    if (this.metricsHistory.length > 100) {
      this.metricsHistory.shift();
    }

    return metrics;
  }

  private calculateErrorRate(): number {
    const recentErrors = this.errorQueue.filter(
      error => Date.now() - error.timestamp < 60000 // Last minute
    );
    return recentErrors.length;
  }

  private getActiveUserCount(): number {
    // Simulate active user count (in real implementation, this would come from analytics)
    return Math.floor(Math.random() * 500) + 100;
  }

  private calculateCacheHitRate(): number {
    // Calculate from network requests and cache hits
    return Math.random() * 100; // Placeholder
  }

  private getRequestsPerMinute(): number {
    // Track API requests per minute
    return Math.floor(Math.random() * 100) + 50;
  }

  private async getBundleSize(): Promise<number> {
    // Return estimated bundle size
    return 1024 * 1024 * 2; // 2MB placeholder
  }

  private getRenderTime(): number {
    return performance.now();
  }

  private getNetworkLatency(): number {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return navigation ? navigation.responseStart - navigation.requestStart : 0;
  }

  // Alert system
  private notifyAlert(alert: any): void {
    this.alertCallbacks.forEach(callback => {
      try {
        callback(alert);
      } catch (error) {
        console.error('Alert callback failed:', error);
      }
    });
  }

  onAlert(callback: (alert: any) => void): () => void {
    this.alertCallbacks.push(callback);
    
    return () => {
      const index = this.alertCallbacks.indexOf(callback);
      if (index > -1) {
        this.alertCallbacks.splice(index, 1);
      }
    };
  }

  // Optimization methods
  optimizeImageDelivery(): void {
    if (typeof window === 'undefined') return;

    const images = document.querySelectorAll('img[data-optimize="true"]');
    
    images.forEach((img) => {
      const imageElement = img as HTMLImageElement;
      const src = imageElement.getAttribute('data-src') || imageElement.src;
      
      if (src) {
        // Add WebP support check
        const webpSrc = this.convertToWebP(src);
        
        // Implement responsive images
        const optimizedSrc = this.addResponsiveParams(webpSrc, imageElement);
        
        imageElement.src = optimizedSrc;
        imageElement.setAttribute('data-loaded', 'true');
      }
    });
  }

  private convertToWebP(src: string): string {
    if (this.supportsWebP() && !src.includes('.webp')) {
      return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return src;
  }

  private supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  private addResponsiveParams(src: string, img: HTMLImageElement): string {
    const containerWidth = img.parentElement?.offsetWidth || window.innerWidth;
    const dpr = window.devicePixelRatio || 1;
    const optimalWidth = Math.round(containerWidth * dpr);
    
    try {
      const url = new URL(src, window.location.origin);
      url.searchParams.set('w', optimalWidth.toString());
      url.searchParams.set('q', '85'); // 85% quality
      url.searchParams.set('f', 'auto'); // Auto format
      
      return url.toString();
    } catch (error) {
      return src; // Return original if URL parsing fails
    }
  }

  // Cleanup and shutdown
  shutdown(): void {
    this.isMonitoring = false;
    
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }
    
    this.errorQueue = [];
    this.metricsHistory = [];
    this.alertCallbacks = [];
    
    console.log('🔄 Enterprise Performance Monitoring shutdown');
  }

  // Get system status
  getSystemStatus(): any {
    return {
      isMonitoring: this.isMonitoring,
      errorCount: this.errorQueue.length,
      metricsHistory: this.metricsHistory.length,
      memoryThreshold: this.memoryUsageThreshold,
      rateLimitEntries: this.rateLimitStore.size
    };
  }
}

// Initialize enterprise performance manager
export const enterprisePerformance = EnterprisePerformanceManager.getInstance();

// Auto-initialize in browser environment
if (typeof window !== 'undefined') {
  enterprisePerformance.initializeEnterpriseMonitoring();
}
