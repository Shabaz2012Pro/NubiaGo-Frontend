/**
 * Utility for lazy loading components and images
 */

// Intersection Observer options
const defaultOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

// Create a lazy loading observer for elements
export const createLazyObserver = (
  callback: IntersectionObserverCallback,
  options = defaultOptions
): IntersectionObserver => {
  return new IntersectionObserver(callback, options);
};

// Lazy load images
export const lazyLoadImages = (): void => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      const src = img.getAttribute('data-src');
      if (src) {
        img.setAttribute('src', src);
        img.removeAttribute('data-src');
      }
    });
    return;
  }
  
  // Create observer for images
  const imageObserver = createLazyObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.getAttribute('data-src');
        
        if (src) {
          // Create a new image to preload
          const newImg = new Image();
          newImg.onload = () => {
            // Once preloaded, update the visible image
            img.src = src;
            img.removeAttribute('data-src');
            
            // Add loaded class for fade-in effect
            img.classList.add('lazy-loaded');
            
            // Also handle srcset if present
            const srcset = img.getAttribute('data-srcset');
            if (srcset) {
              img.srcset = srcset;
              img.removeAttribute('data-srcset');
            }
            
            // Also handle sizes if present
            const sizes = img.getAttribute('data-sizes');
            if (sizes) {
              img.sizes = sizes;
              img.removeAttribute('data-sizes');
            }
          };
          
          // Start loading the image
          newImg.src = src;
          
          // Stop observing the image
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '200px 0px', // Load images 200px before they come into view
    threshold: 0.01
  });
  
  // Get all images with data-src attribute
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
};

// Lazy load background images
export const lazyLoadBackgroundImages = (): void => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    const lazyBackgrounds = document.querySelectorAll('[data-background]');
    lazyBackgrounds.forEach(el => {
      const bg = el.getAttribute('data-background');
      if (bg) {
        (el as HTMLElement).style.backgroundImage = `url(${bg})`;
        el.removeAttribute('data-background');
      }
    });
    return;
  }
  
  // Create observer for background images
  const bgObserver = createLazyObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        const bg = el.getAttribute('data-background');
        
        if (bg) {
          // Create a new image to preload
          const img = new Image();
          img.onload = () => {
            // Once preloaded, update the background
            el.style.backgroundImage = `url(${bg})`;
            el.removeAttribute('data-background');
            
            // Add loaded class for fade-in effect
            el.classList.add('lazy-loaded');
          };
          
          // Start loading the image
          img.src = bg;
          
          // Stop observing the element
          observer.unobserve(el);
        }
      }
    });
  }, {
    rootMargin: '200px 0px', // Load images 200px before they come into view
    threshold: 0.01
  });
  
  // Get all elements with data-background attribute
  const lazyBackgrounds = document.querySelectorAll('[data-background]');
  lazyBackgrounds.forEach(el => {
    bgObserver.observe(el);
  });
};

// Initialize lazy loading
export const initLazyLoading = (): void => {
  // Run on initial load
  if (document.readyState === 'complete') {
    lazyLoadImages();
    lazyLoadBackgroundImages();
  } else {
    // Or wait for the page to load
    window.addEventListener('load', () => {
      lazyLoadImages();
      lazyLoadBackgroundImages();
    });
    
    // Also run on DOM content loaded for faster initial rendering
    document.addEventListener('DOMContentLoaded', () => {
      lazyLoadImages();
      lazyLoadBackgroundImages();
    });
  }
  
  // Re-run when new content might have been added
  document.addEventListener('lazyload-refresh', () => {
    lazyLoadImages();
    lazyLoadBackgroundImages();
  });
};

export default {
  createLazyObserver,
  lazyLoadImages,
  lazyLoadBackgroundImages,
  initLazyLoading
};