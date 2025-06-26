import React, { useState, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import LazyImage from '../atoms/LazyImage';
import { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { clsx } from 'clsx';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'detailed';
  showQuickView?: boolean;
  onQuickView?: (product: Product) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = memo(({
  product,
  variant = 'default',
  showQuickView = true,
  onQuickView,
  className
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    
    addToCart(product)
      .then(() => setIsLoading(false))
      .catch(error => {
        console.error('Failed to add to cart:', error);
        setIsLoading(false);
      });
  }, [addToCart, product]);

  const handleAddToWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
  }, [addToWishlist, product]);

  const handleQuickView = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onQuickView) {
      onQuickView(product);
    } else {
      // Default behavior - navigate to product detail
      window.location.hash = `product?id=${product.id}`;
    }
  }, [onQuickView, product]);

  const handleProductClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to product detail page
    window.location.hash = `product?id=${product.id}`;
  }, [product.id]);

  // Calculate discount percentage
  const discountPercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className={clsx(
        "bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-shadow cursor-pointer",
        className
      )}
      onClick={handleProductClick}
    >
      {/* Image Section */}
      <div className="relative">
        <LazyImage
          src={product.images?.[0] || ''}
          alt={product.name}
          className="w-full h-48 object-cover"
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isNew && <Badge variant="success" size="sm">New</Badge>}
          {discountPercentage > 0 && (
            <Badge variant="error" size="sm">-{discountPercentage}%</Badge>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-2 right-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToWishlist}
            className={clsx(
              "w-8 h-8 p-0 bg-white/80 hover:bg-white border-white/50",
              isWishlisted && "text-red-500"
            )}
          >
            <Heart className={clsx("w-4 h-4", isWishlisted && "fill-current")} />
          </Button>
        </div>
        
        {/* Quick View Button */}
        {showQuickView && (
          <div className="absolute bottom-2 right-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleQuickView}
              className="w-8 h-8 p-0 bg-white/80 hover:bg-white border-white/50"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 uppercase tracking-wide">
          {product.category}
        </div>
        
        {/* Title */}
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={clsx(
                  "w-3 h-3",
                  i < Math.floor(product.rating || 0)
                    ? "text-yellow-400 fill-current"
                    : "text-neutral-300 dark:text-neutral-600"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            ({product.reviews || 0})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-lg font-bold text-red-600">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-neutral-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <Button
          variant="primary"
          size="sm"
          onClick={handleAddToCart}
          loading={isLoading}
          className="w-full bg-red-600 hover:bg-red-700"
          leftIcon={<ShoppingCart className="w-4 h-4" />}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;