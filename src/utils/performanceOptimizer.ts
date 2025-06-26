
import { lazy } from 'react';

// Code splitting utility
export const createLazyComponent = (importFn: () => Promise<any>) => {
  return lazy(() => 
    importFn().catch(error => {
      console.error('Lazy component loading failed:', error);
      // Return a fallback component
      return {
        default: () => (
          <div className="p-8 text-center">
            <p>Failed to load component. Please refresh the page.</p>
          </div>
        )
      };
    })
  );
};

// Bundle size analyzer
export const analyzeBundle = () => {
  if (process.env.NODE_ENV === 'development') {
    import('webpack-bundle-analyzer').then(({ BundleAnalyzerPlugin }) => {
      console.log('Bundle analysis available in development mode');
    });
  }
};

// Memory cleanup utility
export const cleanupResources = () => {
  // Clean up any global event listeners
  const events = ['resize', 'scroll', 'orientationchange'];
  events.forEach(event => {
    window.removeEventListener(event, () => {});
  });

  // Clear any timeouts/intervals
  let id = window.setTimeout(() => {}, 0);
  while (id--) {
    window.clearTimeout(id);
  }
};

// Performance monitoring
export const measurePerformance = (name: string, fn: Function) => {
  return async (...args: any[]) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    
    if (end - start > 100) { // Log slow operations
      console.warn(`Slow operation detected: ${name} took ${end - start}ms`);
    }
    
    return result;
  };
};

// Image optimization helper
export const optimizeImage = (src: string, options: {
  width?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
} = {}) => {
  const { width, quality = 80, format = 'webp' } = options;
  
  // For development, return original image
  if (process.env.NODE_ENV === 'development') {
    return src;
  }
  
  // In production, you might use a service like Cloudinary or similar
  let optimizedSrc = src;
  
  if (width) {
    optimizedSrc += `?w=${width}`;
  }
  
  if (quality < 100) {
    optimizedSrc += `${width ? '&' : '?'}q=${quality}`;
  }
  
  return optimizedSrc;
};
