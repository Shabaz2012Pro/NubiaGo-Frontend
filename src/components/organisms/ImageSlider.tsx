import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import { clsx } from 'clsx';

interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
  badge?: string;
  badgeVariant?: 'primary' | 'gold' | 'success' | 'error';
}

interface ImageSliderProps {
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

const slides: SlideData[] = [
  {
    id: '0',
    title: 'Premium Turkish Products Delivered to Africa',
    subtitle: 'Connecting Turkey to Africa',
    description: 'Discover quality electronics, appliances, fashion, and more from verified Turkish suppliers. Fast shipping to 54 African countries with secure payments.',
    image: 'https://images.pexels.com/photos/6347707/pexels-photo-6347707.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    cta: 'Shop Now',
    ctaLink: '/products',
    badge: 'Featured',
    badgeVariant: 'gold'
  },
  {
    id: '1',
    title: 'Premium Electronics from Turkey',
    subtitle: 'Latest Technology',
    description: 'Discover cutting-edge smartphones, laptops, and tech accessories from verified Turkish suppliers',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    cta: 'Shop Electronics',
    ctaLink: '/electronics',
    badge: 'HOT',
    badgeVariant: 'error'
  },
  {
    id: '2',
    title: 'Turkish Fashion Excellence',
    subtitle: 'Style & Quality',
    description: 'Explore premium clothing, shoes, and accessories crafted by renowned Turkish fashion brands',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    cta: 'Explore Fashion',
    ctaLink: '/fashion',
    badge: 'Trending',
    badgeVariant: 'gold'
  },
  {
    id: '3',
    title: 'Home & Kitchen Appliances',
    subtitle: 'Modern Living',
    description: 'Transform your home with premium appliances and kitchen essentials from Turkish manufacturers',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    cta: 'Shop Home',
    ctaLink: '/home-appliances',
    badge: 'New',
    badgeVariant: 'success'
  },
  {
    id: '4',
    title: 'Beauty & Personal Care',
    subtitle: 'Premium Cosmetics',
    description: 'Discover luxury beauty products and personal care items from Turkey\'s finest brands',
    image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    cta: 'Shop Beauty',
    ctaLink: '/beauty',
    badge: 'Exclusive',
    badgeVariant: 'primary'
  }
];

const ImageSlider: React.FC<ImageSliderProps> = ({ 
  className, 
  autoPlay = true, 
  interval = 5000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className={clsx('relative overflow-hidden bg-neutral-900', className)}>
      <div className="relative h-[600px] lg:h-[700px]">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={clsx(
              'absolute inset-0 transition-all duration-1000 ease-in-out',
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            )}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <div className="flex items-center space-x-3 mb-4">
                    {slide.badge && (
                      <Badge 
                        variant={slide.badgeVariant} 
                        size="lg"
                        className="animate-pulse"
                      >
                        {slide.badge}
                      </Badge>
                    )}
                    <span className="text-gold-300 font-medium text-lg">
                      {slide.subtitle}
                    </span>
                  </div>

                  <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-xl text-neutral-200 mb-8 leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button 
                      variant="gold" 
                      size="lg"
                      className="text-lg px-8 py-4 group"
                      onClick={() => {
                        const categoryMap: { [key: string]: string } = {
                          '/electronics': 'electronics',
                          '/fashion': 'fashion',
                          '/home-appliances': 'home-kitchen',
                          '/beauty': 'beauty-personal-care'
                        };
                        const category = categoryMap[slide.ctaLink];
                        if (category) {
                          window.location.hash = `categories/${category}`;
                        } else {
                          window.location.hash = 'products';
                        }
                      }}
                    >
                      <span>{slide.cta}</span>
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-neutral-900"
                      onClick={() => window.location.hash = 'suppliers'}
                    >
                      Become a Supplier
                    </Button>
                  </div>

                  {/* Trust Indicators - Only show on first slide */}
                  {index === 0 && (
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div className="text-sm text-neutral-200">Verified Suppliers</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0M15 17a2 2 0 104 0" />
                          </svg>
                        </div>
                        <div className="text-sm text-neutral-200">Fast Delivery</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="text-sm text-neutral-200">54 Countries</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="absolute top-4 right-4 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={clsx(
                'w-3 h-3 rounded-full transition-all duration-300',
                index === currentSlide
                  ? 'bg-gold-400 scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
          <div 
            className="h-full bg-gold-400 transition-all duration-300 ease-linear"
            style={{ 
              width: `${((currentSlide + 1) / slides.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;