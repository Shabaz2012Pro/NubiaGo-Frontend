// Performance monitoring and optimization utilities

// Web Vitals reporting with better error handling
export const reportWebVitals = (): void => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    import('web-vitals').then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
      const onPerfEntry = (entry: any) => {
        console.log(`${entry.name}: ${entry.value}`, entry);

        // Send to analytics if available
        if (typeof gtag !== 'undefined') {
          gtag('event', entry.name, {
            value: Math.round(entry.name === 'CLS' ? entry.value * 1000 : entry.value),
            event_category: 'Web Vitals',
            non_interaction: true,
          });
        }
      };

      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getLCP(onPerfEntry);
      getFCP(onPerfEntry);
      getTTFB(onPerfEntry);
    }).catch(error => {
      console.warn('Web Vitals import failed:', error);
    });
  }
};

// Enhanced resource preloading
export const preloadResources = (resources: string[]): void => {
  if (!Array.isArray(resources)) return;

  resources.forEach(resource => {
    try {
      const link = document.createElement('link');
      link.rel = 'preload';

      if (!resource || typeof resource !== 'string') return;

      if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.endsWith('.css')) {
        link.as = 'style';
      } else if (/\.(jpe?g|png|gif|webp|avif)$/i.test(resource)) {
        link.as = 'image';
      } else if (/\.(woff2?|ttf|otf|eot)$/i.test(resource)) {
        link.as = 'font';
        link.crossOrigin = 'anonymous';
      }

      link.href = resource;
      link.onerror = () => console.warn(`Failed to preload: ${resource}`);
      document.head.appendChild(link);
    } catch (error) {
      console.warn(`Error preloading resource ${resource}:`, error);
    }
  });
};

// Critical image preloading with lazy loading fallback
export const preloadCriticalImages = (images: string[]): void => {
  if (!Array.isArray(images)) return;

  images.forEach(src => {
    try {
      const img = new Image();
      img.loading = 'eager';
      img.fetchPriority = 'high';
      img.src = src;
      img.onerror = () => console.warn(`Failed to preload image: ${src}`);
    } catch (error) {
      console.warn(`Error preloading image ${src}:`, error);
    }
  });
};

// Performance monitoring initialization
export const initPerformanceMonitoring = (): void => {
  if (typeof window === 'undefined') return;

  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`, entry);
          }
        });
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });

      // Monitor resource loading
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 1000) {
            console.warn(`Slow resource load: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
          }
        });
      });
      resourceObserver.observe({ entryTypes: ['resource'] });

    } catch (error) {
      console.warn('Performance monitoring setup failed:', error);
    }
  }

  // Monitor memory usage
  if ('memory' in performance) {
    setInterval(() => {
      const memory = (performance as any).memory;
      if (memory) {
        const used = Math.round(memory.usedJSHeapSize / 1048576);
        const total = Math.round(memory.totalJSHeapSize / 1048576);

        if (used > 50) { // Alert if using more than 50MB
          console.warn(`High memory usage: ${used}MB / ${total}MB`);
        }
      }
    }, 30000); // Check every 30 seconds
  }
};

// Bundle splitting helper
export const loadComponent = async (componentPath: string) => {
  try {
    const module = await import(/* @vite-ignore */ componentPath);
    return module.default || module;
  } catch (error) {
    console.error(`Failed to load component: ${componentPath}`, error);
    throw error;
  }
};

// Debounced function utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T => {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  }) as T;
};

// Throttled function utility
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }) as T;
};

// Image optimization utility
export const optimizeImage = (src: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
} = {}): string => {
  if (!src || typeof src !== 'string') return '';

  // If it's a Pexels image, apply optimizations
  if (src.includes('pexels.com')) {
    const url = new URL(src);
    if (options.width) url.searchParams.set('w', options.width.toString());
    if (options.height) url.searchParams.set('h', options.height.toString());
    if (options.quality) url.searchParams.set('q', options.quality.toString());
    if (options.format) url.searchParams.set('fm', options.format);
    return url.toString();
  }

  return src;
};

// Critical CSS inlining
export const inlineCriticalCSS = (css: string): void => {
  if (typeof document === 'undefined') return;

  const style = document.createElement('style');
  style.textContent = css;
  style.setAttribute('data-critical', 'true');
  document.head.appendChild(style);
};

// Service Worker registration
export const registerServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (error) {
      console.warn('SW registration failed: ', error);
    }
  }
};

// Memory cleanup utility
export const cleanupMemory = (): void => {
  // Clear any large objects from memory
  if ('gc' in window) {
    (window as any).gc();
  }

  // Clear unused images
  const images = document.querySelectorAll('img[data-loaded="false"]');
  images.forEach(img => {
    if (img.parentNode) {
      img.parentNode.removeChild(img);
    }
  });
};

// Resource hints injection
export const injectResourceHints = (): void => {
  const hints: Array<{rel: string, href: string, crossorigin?: boolean}> = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//images.pexels.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    Object.assign(link, hint);
    document.head.appendChild(link);
  });
};

export default {
  reportWebVitals,
  preloadResources,
  preloadCriticalImages,
  initPerformanceMonitoring,
  loadComponent,
  debounce,
  throttle,
  optimizeImage,
  inlineCriticalCSS,
  registerServiceWorker,
  cleanupMemory,
  injectResourceHints,
};