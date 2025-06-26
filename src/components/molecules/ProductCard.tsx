import React, { useState, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import LazyImage from '../atoms/LazyImage';
import { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'detailed';
  showQuickView?: boolean;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(({
  product,
  variant = 'default',
  showQuickView = true,
  onQuickView,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }, [addToCart, product]);

  const handleAddToWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
  }, [addToWishlist, product]);

  const handleQuickView = useCallback(() => {
    import('../../utils/hashUtils').then(({ navigateToProduct }) => {
      navigateToProduct(product.id);
    });
  }, [product]);

  const handleProductClick = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    import('../../utils/hashUtils').then(({ navigateToProduct }) => {
      navigateToProduct(product.id);
    });
  }, [product]);

  let cardContent;

  switch (variant) {
    case 'compact':
      cardContent = (
        <div className="flex items-center space-x-4">
          <LazyImage
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-lg"
            onLoad={() => setIsImageLoaded(true)}
          />
          <div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </div>
        </div>
      );
      break;
    case 'detailed':
      cardContent = (
        <div>
          <LazyImage
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg"
            onLoad={() => setIsImageLoaded(true)}
          />
          <div className="mt-4">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-gray-800">{product.description}</p>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </div>
        </div>
      );
      break;
    default:
      cardContent = (
        <div className="space-y-2">
          <div className="relative">
            <LazyImage
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
              onLoad={() => setIsImageLoaded(true)}
            />
            <div className="absolute top-2 left-2">
              {product.isNew && <Badge>New</Badge>}
            </div>
            <div className="absolute top-2 right-2">
              <button onClick={handleAddToWishlist}>
                <Heart color={isWishlisted ? 'red' : 'gray'} fill={isWishlisted ? 'red' : 'none'} />
              </button>
            </div>
          </div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
          <div className="flex space-x-2">
            <Button onClick={handleAddToCart}>Add to Cart</Button>
            {showQuickView && onQuickView && (
              <Button variant="secondary" onClick={handleQuickView}>
                Quick View
              </Button>
            )}
          </div>
        </div>
      );
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleProductClick}
    >
      {cardContent}
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;