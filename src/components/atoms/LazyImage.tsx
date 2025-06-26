
import React, { useState, useRef, useEffect } from 'react';
import { optimizeImage } from '../../utils/imageOptimizer';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  quality = 85,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPgogIDx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9hZGluZy4uLjwvdGV4dD4KICA8L3N2Zz4K',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.01,
        rootMargin: '50px 0px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && src) {
      // Set original src immediately for faster loading
      setOptimizedSrc(src);
      
      // Try to optimize in background
      try {
        const optimizedUrl = optimizeImage(src, { width, height, quality });
        if (optimizedUrl !== src) {
          setOptimizedSrc(optimizedUrl);
        }
      } catch (error) {
        console.warn('Image optimization failed:', error);
        // Keep original src if optimization fails
        setOptimizedSrc(src);
      }
    }
  }, [isInView, src, width, height, quality]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    onError?.();
  };

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {!isInView && (
        <img
          src={placeholder}
          alt=""
          className="w-full h-full object-cover"
          style={{ width, height }}
        />
      )}
      
      {isInView && (
        <>
          {!isLoaded && !isError && (
            <img
              src={placeholder}
              alt=""
              className="w-full h-full object-cover absolute inset-0"
              style={{ width, height }}
            />
          )}
          
          <img
            src={optimizedSrc || src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ width, height }}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
          
          {isError && (
            <div 
              className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500"
              style={{ width, height }}
            >
              Failed to load image
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LazyImage;
