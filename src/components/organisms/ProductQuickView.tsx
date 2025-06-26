import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Heart, 
  ShoppingCart, 
  Star, 
  Plus, 
  Minus, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Shield
} from 'lucide-react';
import { Product } from '../../types';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { optimizeImage } from '../../utils/imageOptimizer';
import { clsx } from 'clsx';

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, isOpen, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Get cart and wishlist state
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  // Optimize product images
  const optimizedImages = product.images.map(img => {
    try {
      return optimizeImage(img, { width: 600, quality: 85 });
    } catch (error) {
      console.error('Failed to optimize image:', error);
      return img; // Return original image if optimization fails
    }
  });

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(product.minOrder, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart(product, quantity);
      onClose();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await addToWishlist(product);
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  };

  const handleViewDetails = () => {
    window.location.hash = `products/${product.id}`;
    onClose();
  };

  // Calculate discount percentage
  const discountPercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></motion.div>

        {/* Modal */}
        <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-4xl w-full mx-auto text-left overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-neutral-700/80 hover:bg-white dark:hover:bg-neutral-700 transition-colors"
            >
              <X className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image Gallery */}
              <div className="relative bg-neutral-100 dark:bg-neutral-900">
                <div className="aspect-square">
                  <img
                    src={optimizedImages[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = product.images[selectedImageIndex];
                    }}
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.isNew && <Badge variant="success">New</Badge>}
                    {discountPercentage > 0 && (
                      <Badge variant="error">-{discountPercentage}%</Badge>
                    )}
                  </div>

                  {/* Navigation Arrows */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImageIndex(prev => 
                            prev === 0 ? product.images.length - 1 : prev - 1
                          );
                        }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImageIndex(prev => 
                            prev === product.images.length - 1 ? 0 : prev + 1
                          );
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Images */}
                {product.images.length > 1 && (
                  <div className="flex justify-center space-x-2 p-2 bg-white dark:bg-neutral-800">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={clsx(
                          'w-12 h-12 rounded-md overflow-hidden border-2 transition-all',
                          index === selectedImageIndex
                            ? 'border-red-500 ring-2 ring-red-500/20'
                            : 'border-neutral-200 dark:border-neutral-700 hover:border-red-300'
                        )}
                      >
                        <img
                          src={optimizeImage(product.images[index], { width: 50, quality: 70 })}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = product.images[index];
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Information */}
              <div className="p-6 overflow-y-auto max-h-[600px]">
                <div className="space-y-4">
                  {/* Header */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="primary" size="sm">{product.category}</Badge>
                      {product.supplier.verified && (
                        <Badge variant="success" size="sm">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      {product.name}
                    </h2>

                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={clsx(
                              'w-4 h-4',
                              i < Math.floor(product.rating)
                                ? 'text-gold-500 fill-current'
                                : 'text-neutral-300'
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-3 mb-4">
                      {product.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl font-bold text-red-600">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-neutral-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Quantity:
                      </span>
                      <div className="flex items-center border border-neutral-300 dark:border-neutral-600 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= product.minOrder}
                          className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 min-w-[40px] text-center font-medium">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Total: <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Supplier */}
                  <div className="flex items-center space-x-2 mb-6">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Supplier:</span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {product.supplier.name}
                    </span>
                    {product.supplier.verified && (
                      <Badge variant="success" size="sm">Verified</Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
                      variant="primary"
                      onClick={handleAddToCart}
                      leftIcon={<ShoppingCart className="w-5 h-5" />}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      loading={isLoading}
                    >
                      Add to Cart
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleAddToWishlist}
                      className={clsx(
                        'px-4',
                        isWishlisted && 'text-red-600 border-red-600'
                      )}
                    >
                      <Heart className={clsx('w-5 h-5', isWishlisted && 'fill-current')} />
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleViewDetails}
                      className="px-4"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* View Full Details Button */}
                  <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleViewDetails}
                      className="w-full"
                      rightIcon={<ExternalLink className="w-4 h-4" />}
                    >
                      View Full Product Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default ProductQuickView;