// Image optimization utilities for enterprise-grade performance

interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  width?: number;
  height?: number;
  lazy?: boolean;
}

class ImageOptimizer {
  private cache = new Map<string, string>();
  private preloadedImages = new Set<string>();

  optimizeImage(src: string, options: ImageOptimizationOptions = {}): string {
    const cacheKey = `${src}-${JSON.stringify(options)}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      let optimizedSrc = src;

      // Add optimization parameters if using a CDN
      if (src.includes('pexels.com') || src.includes('unsplash.com')) {
        const url = new URL(src);
        if (options.width) url.searchParams.set('w', options.width.toString());
        if (options.height) url.searchParams.set('h', options.height.toString());
        if (options.quality) url.searchParams.set('q', (options.quality || 75).toString());
        if (options.format) url.searchParams.set('fm', options.format);
        optimizedSrc = url.toString();
      }

      this.cache.set(cacheKey, optimizedSrc);
      return optimizedSrc;
    } catch (error) {
      console.warn('Image optimization failed:', error);
      this.cache.set(cacheKey, src);
      return src;
    }
  }

  preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.preloadedImages.has(src)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        this.preloadedImages.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  async preloadCriticalImages(images: string[]): Promise<void> {
    const promises = images.map(src => this.preloadImage(src));
    try {
      await Promise.all(promises);
      console.log('Critical images preloaded successfully');
    } catch (error) {
      console.warn('Some critical images failed to preload:', error);
    }
  }

  generateSrcSet(baseSrc: string, sizes: number[]): string {
    return sizes
      .map(size => `${this.optimizeImage(baseSrc, { width: size })} ${size}w`)
      .join(', ');
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

const imageOptimizer = new ImageOptimizer();

// Export individual functions
export const optimizeImage = (src: string, options?: ImageOptimizationOptions): string => 
  imageOptimizer.optimizeImage(src, options);

export const preloadCriticalImages = (images: string[]) => 
  imageOptimizer.preloadCriticalImages(images);

export const generateSrcSet = (baseSrc: string, sizes: number[]) => 
  imageOptimizer.generateSrcSet(baseSrc, sizes);

export const preloadImage = (src: string) => 
  imageOptimizer.preloadImage(src);

export { imageOptimizer };
export default imageOptimizer;