import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { optimizeImage } from '../../utils/imageOptimizer';
import { clsx } from 'clsx';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'detailed' | 'grid';
  showQuickView?: boolean;
  showActions?: boolean;
  className?: string;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}

const ProductCardOptimized: React.FC<ProductCardProps> = memo(({
  product,
  variant = 'default',
  showQuickView = true,
  showActions = true,
  className,
  onQuickView,
  priority = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Cart and wishlist stores
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  const isWishlisted = isInWishlist(product.id);

  // Navigate to product detail page
  const handleViewProduct = () => {
    window.location.hash = `product?id=${product.id}`;
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onQuickView) {
      onQuickView(product);
    } else {
      handleViewProduct();
    }
  };

  const handleCardClick = () => {
    handleViewProduct();
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLoading(true);
    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (isWishlisted) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product);
      }
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
    }
  };

  // Optimize image based on variant
  const getOptimizedImage = () => {
    if (imageError) {
      return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
    }

    const primaryImage = product.image || product.images?.[0];
    if (!primaryImage) {
      return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
    }

    try {
      const imageSize = variant === 'compact' ? 200 : 400;
      return optimizeImage(primaryImage, { 
        width: imageSize, 
        quality: priority ? 95 : 85 
      });
    } catch (error) {
      console.error('Failed to optimize image:', error);
      return primaryImage; // Return original image if optimization fails
    }
  };

  const optimizedImage = getOptimizedImage();

  // Calculate discount percentage
  const discountPercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const cardClasses = clsx(
    'group relative bg-white dark:bg-neutral-900 rounded-xl overflow-hidden',
    'border border-neutral-200 dark:border-neutral-700',
    'hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-600',
    'transition-all duration-300 cursor-pointer',
    {
      'shadow-sm hover:shadow-lg': variant !== 'compact',
      'shadow-none': variant === 'compact',
    },
    className
  );

  const imageAspectClass = variant === 'compact' ? 'aspect-square' : 'aspect-[4/3]';

  return (
    <motion.div
      className={cardClasses}
      whileHover={{ y: -4 }}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      {/* Image Container */}
      <div className={clsx('relative overflow-hidden bg-neutral-100 dark:bg-neutral-800', imageAspectClass)}>
        <img
          src={optimizedImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setImageError(true)}
          onLoad={() => setIsLoading(false)}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {product.isNew && <Badge variant="success" size="sm">New</Badge>}
          {discountPercentage > 0 && (
            <Badge variant="error" size="sm">-{discountPercentage}%</Badge>
          )}
        </div>

        {/* Action Buttons - Show on hover */}
        {showActions && (
          <div className={clsx(
            'absolute top-3 right-3 flex flex-col space-y-2',
            'transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleWishlist}
              className={clsx(
                'w-10 h-10 p-0 bg-white/90 hover:bg-white border-white/50',
                isWishlisted && 'text-red-500 border-red-200'
              )}
            >
              <Heart className={clsx('w-4 h-4', isWishlisted && 'fill-current')} />
            </Button>

            {showQuickView && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleQuickView}
                className="w-10 h-10 p-0 bg-white/90 hover:bg-white border-white/50"
                title="View Product Details"
              >
                <Eye className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}

        {/* Add to Cart Button - Always visible at bottom on hover */}
        {showActions && (
          <div className={clsx(
            'absolute bottom-3 left-3 right-3',
            'transition-all duration-300',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          )}>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              loading={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 !text-white text-sm py-2"
              leftIcon={<ShoppingCart className="w-4 h-4" />}
            >
              Add to Cart
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 uppercase tracking-wide">
          {product.category}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={clsx(
                  'w-3 h-3',
                  i < Math.floor(product.rating || 0)
                    ? 'text-yellow-400 fill-current'
                    : 'text-neutral-300 dark:text-neutral-600'
                )}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            ({product.rating?.toFixed(1) || '0.0'})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-red-600">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-neutral-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Supplier Info */}
        {variant === 'detailed' && (
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
            by {product.supplier?.name || 'Unknown Supplier'}
          </div>
        )}

        {/* Minimum Order */}
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          Min. order: {product.minOrder} {product.minOrder === 1 ? 'piece' : 'pieces'}
        </div>
      </div>
    </motion.div>
  );
});

ProductCardOptimized.displayName = 'ProductCardOptimized';

export default ProductCardOptimized;