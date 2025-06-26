import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  Star, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Truck, 
  Shield, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  MapPin,
  Clock,
  Award,
  Users,
  Package,
  ArrowRight
} from 'lucide-react';
import { Product } from '../../types';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import Card from '../atoms/Card';
import Input from '../atoms/Input';
import ProductCard from '../molecules/ProductCard';
import { clsx } from 'clsx';
import { useProduct, useRateProduct } from '../../api/queries/useProductQueries';
import { useAddToCart } from '../../api/queries/useCartQueries';
import { useWishlistStore } from '../../store';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../molecules/ErrorBoundaryFallback';
import { optimizeImage } from '../../utils/imageOptimizer';

interface ProductDetailProps {
  productId: string;
  relatedProductIds?: string[];
  className?: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  productId,
  relatedProductIds = [],
  className
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  // Get product data using React Query
  const { 
    data: product, 
    isLoading, 
    isError, 
    error 
  } = useProduct(productId);

  // Get related products
  const { 
    data: relatedProducts = [], 
    isLoading: isLoadingRelated 
  } = useProduct(relatedProductIds[0] || '');

  // Get wishlist state
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = product ? isInWishlist(product.id) : false;

  // Use cart mutation
  const { mutate: addToCart, isLoading: isAddingToCart } = useAddToCart();

  // Use rate product mutation
  const { mutate: rateProduct } = useRateProduct();

  const africanCountries = [
    { code: 'NG', name: 'Nigeria', shipping: 25, flag: '🇳🇬' },
    { code: 'GH', name: 'Ghana', shipping: 30, flag: '🇬🇭' },
    { code: 'KE', name: 'Kenya', shipping: 35, flag: '🇰🇪' },
    { code: 'ZA', name: 'South Africa', shipping: 40, flag: '🇿🇦' },
    { code: 'EG', name: 'Egypt', shipping: 28, flag: '🇪🇬' },
    { code: 'MA', name: 'Morocco', shipping: 32, flag: '🇲🇦' }
  ];

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: `Reviews (${product?.reviews || 0})` },
    { id: 'shipping', label: 'Shipping & Returns' }
  ];

  const handleQuantityChange = (change: number) => {
    if (!product) return;
    const newQuantity = Math.max(product.minOrder, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await addToCart({
        product: product,
        quantity,
      });
      // Show success feedback
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // Show error feedback
    }
  };

  // Handle add to wishlist
  const handleAddToWishlist = async () => {
    if (!product) return;

    try {
      await addToWishlist(product);
      // Show success feedback
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      // Show error feedback
    }
  };

  // Handle share
  const handleShare = async () => {
    if (!product) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback to clipboard
        try {
          await navigator.clipboard.writeText(window.location.href);
          // Show success feedback for clipboard
        } catch (clipboardError) {
          console.error('Failed to copy to clipboard:', clipboardError);
        }
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        // Show success feedback for clipboard
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    }
  };

  // Calculate shipping cost based on country
  const calculateShipping = (countryName: string) => {
    const country = africanCountries.find(c => c.name === countryName);
    if (country) {
      setShippingCost(country.shipping);
    } else {
      setShippingCost(null);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8', className)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-pulse">
            <div className="aspect-square bg-neutral-200 dark:bg-neutral-700 rounded-xl mb-4"></div>
            <div className="flex space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-20 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
              ))}
            </div>
          </div>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3"></div>
            <div className="h-24 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !product) {
    return (
      <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8', className)}>
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            Product Not Found
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {error instanceof Error ? error.message : 'The product you are looking for could not be found.'}
          </p>
          <Button 
            variant="primary" 
            onClick={() => window.location.hash = 'products'}
            className="bg-red-600 hover:bg-red-700"
          >
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  // Optimize product images safely
  const optimizedImages = product.images.map(img => {
    try {
      return optimizeImage(img, { width: 800, quality: 85 });
    } catch (error) {
      console.error('Failed to optimize image:', error);
      return img; // Return original image if optimization fails
    }
  });

  return (
    <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8', className)}>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden group">
              <motion.img
                key={selectedImageIndex}
                src={optimizedImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => setIsZoomed(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                loading="lazy"
                onError={(e) => {
                  // Fallback to original image if optimized version fails
                  e.currentTarget.src = product.images[selectedImageIndex];
                }}
              />

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
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
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
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-5 h-5" />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.isNew && <Badge variant="success">New</Badge>}
                {product.originalPrice && (
                  <Badge variant="error">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => {
                  // Optimize thumbnails safely
                  let optimizedThumb;
                  try {
                    optimizedThumb = optimizeImage(image, { width: 100, quality: 80 });
                  } catch (error) {
                    optimizedThumb = image; // Use original if optimization fails
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={clsx(
                        'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                        index === selectedImageIndex
                          ? 'border-red-500 ring-2 ring-red-500/20'
                          : 'border-neutral-200 dark:border-neutral-700 hover:border-red-300'
                      )}
                    >
                      <img
                        src={optimizedThumb}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = image;
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
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

              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
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
                  <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-red-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-neutral-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Minimum order: {product.minOrder} {product.minOrder === 1 ? 'piece' : 'pieces'}
              </p>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
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
                    <span className="px-4 py-2 min-w-[60px] text-center font-medium">
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

              <div className="flex space-x-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  leftIcon={<ShoppingCart className="w-5 h-5" />}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  loading={isAddingToCart}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  size="lg"
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
                  size="lg"
                  onClick={handleShare}
                  className="px-4"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Shipping Calculator */}
            <Card variant="outlined" padding="md">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                Calculate Shipping
              </h3>
              <div className="flex space-x-2">
                <select
                  value={shippingCountry}
                  onChange={(e) => {
                    setShippingCountry(e.target.value);
                    calculateShipping(e.target.value);
                  }}
                  className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"
                >
                  <option value="">Select country</option>
                  {africanCountries.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>
              {shippingCost && (
                <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700 dark:text-green-300">
                      Shipping to {shippingCountry}:
                    </span>
                    <span className="font-semibold text-green-700 dark:text-green-300">
                      ${shippingCost}
                    </span>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Estimated delivery: 5-7 business days
                  </p>
                </div>
              )}
            </Card>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Secure Payment</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Fast Shipping</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Quality Assured</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-neutral-200 dark:border-neutral-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none dark:prose-invert">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {product.tags.map((tag) => (
                      <li key={tag} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-neutral-700 dark:text-neutral-300 capitalize">
                          {tag.replace('-', ' ')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.specifications ? (
                  Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-neutral-200 dark:border-neutral-700">
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">{key}:</span>
                      <span className="text-neutral-600 dark:text-neutral-400">{value}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Detailed specifications will be provided by the supplier upon request.
                  </p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Review Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                        {product.rating.toFixed(1)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={clsx(
                                'w-5 h-5',
                                i < Math.floor(product.rating)
                                  ? 'text-gold-500 fill-current'
                                  : 'text-neutral-300'
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Based on {product.reviews} reviews
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      // Mock data for review distribution
                      const count = Math.floor(product.reviews * (rating === 5 ? 0.6 : rating === 4 ? 0.25 : rating === 3 ? 0.1 : rating === 2 ? 0.03 : 0.02));
                      const percentage = (count / product.reviews) * 100;

                      return (
                        <div key={rating} className="flex items-center space-x-3">
                          <span className="text-sm w-8">{rating}★</span>
                          <div className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gold-500 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-neutral-600 dark:text-neutral-400 w-8">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mock Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      id: '1',
                      user: 'Amara Okafor',
                      rating: 5,
                      comment: 'Excellent quality product! Fast shipping to Lagos. Highly recommend this supplier.',
                      date: '2024-01-10',
                      verified: true,
                      helpful: 12,
                      images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200']
                    },
                    {
                      id: '2',
                      user: 'Kwame Asante',
                      rating: 4,
                      comment: 'Good product, matches description. Packaging could be better but overall satisfied.',
                      date: '2024-01-08',
                      verified: true,
                      helpful: 8
                    },
                    {
                      id: '3',
                      user: 'Fatima Al-Rashid',
                      rating: 5,
                      comment: 'Perfect for my business needs. Will definitely order again. Great customer service.',
                      date: '2024-01-05',
                      verified: true,
                      helpful: 15
                    }
                  ].map((review) => (
                    <div key={review.id} className="border-b border-neutral-200 dark:border-neutral-700 pb-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-neutral-900 dark:text-neutral-100">
                              {review.user}
                            </span>
                            {review.verified && (
                              <Badge variant="success" size="sm">Verified Purchase</Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={clsx(
                                    'w-4 h-4',
                                    i < review.rating
                                      ? 'text-gold-500 fill-current'
                                      : 'text-neutral-300'
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-neutral-500">{review.date}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                        {review.comment}
                      </p>

                      {review.images && (
                        <div className="flex space-x-2 mb-3">
                          {review.images.map((image, index) => {
                            // Optimize review images safely
                            let optimizedReviewImg;
                            try {
                              optimizedReviewImg = optimizeImage(image, { width: 100, quality: 80 });
                            } catch (error) {
                              optimizedReviewImg = image;
                            }

                            return (
                              <img
                                key={index}
                                src={optimizedReviewImg}
                                alt={`Review ${index + 1}`}
                                className="w-16 h-16 object-cover rounded-lg"
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.src = image;
                                }}
                              />
                            );
                          })}
                        </div>
                      )}

                      <div className="flex items-center space-x-4 text-sm text-neutral-500">
                        <button className="hover:text-neutral-700 dark:hover:text-neutral-300">
                          👍 Helpful ({review.helpful})
                        </button>
                        <button className="hover:text-neutral-700 dark:hover:text-neutral-300">
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    Shipping Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Truck className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Standard Shipping</p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">5-7 business days</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">Express Shipping</p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">2-3 business days</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    Returns & Exchanges
                  </h4>
                  <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <p>• 30-day return policy</p>
                    <p>• Free returns for defective items</p>
                    <p>• Original packaging required</p>
                    <p>• Refund processed within 5-7 business days</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Supplier Information */}
        <Card variant="default" padding="lg" className="mt-8">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              {product.supplier.name.charAt(0)}
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {product.supplier.name}
                </h3>
                {product.supplier.verified && (
                  <Badge variant="success">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified Supplier
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="w-4 h-4 text-gold-500 fill-current" />
                    <span className="font-semibold">{product.supplier.rating}</span>
                  </div>
                  <p className="text-sm text-neutral-500">Supplier Rating</p>
                </div>
                <div>
                  <div className="font-semibold">{product.supplier.totalProducts}</div>
                  <p className="text-sm text-neutral-500">Total Products</p>
                </div>
                <div>
                  <div className="font-semibold">{product.supplier.responseTime}</div>
                  <p className="text-sm text-neutral-500">Response Time</p>
                ```text
                </div>
                <div>
                  <div className="font-semibold">Since {product.supplier.memberSince}</div>
                  <p className="text-sm text-neutral-500">Member Since</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-neutral-400" />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {product.supplier.country}
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" leftIcon={<MessageSquare className="w-4 h-4" />}>
                Contact
              </Button>
              <Button variant="outline" size="sm" leftIcon={<Package className="w-4 h-4" />}>
                View Store
              </Button>
            </div>
          </div>
        </Card>

        {/* Related Products */}
        {!isLoadingRelated && relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Related Products
              </h2>
              <Button variant="ghost" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={(p) => addToCart({ product: p, quantity: 1 })}
                  onAddToWishlist={(p) => addToWishlist(p)}
                  onQuickView={(p) => window.location.hash = `product?id=${p.id}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Image Zoom Modal */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setIsZoomed(false)}
            >
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.img
                src={optimizedImages[selectedImageIndex]}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
                onError={(e) => {
                  e.currentTarget.src = product.images[selectedImageIndex];
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </ErrorBoundary>
    </div>
  );
};

export default ProductDetail;