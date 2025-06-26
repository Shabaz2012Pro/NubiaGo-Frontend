import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Heart, User, RefreshCw, Tag, Package } from 'lucide-react';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import Card from '../atoms/Card';
import { clsx } from 'clsx';
import { useAddToCart } from '../../api/queries/useCartQueries';
import { useWishlistStore } from '../../store';

interface RecommendationEngineProps {
  userId?: string;
  productId?: string;
  category?: string;
  maxItems?: number;
  showReason?: boolean;
  className?: string;
  type?: 'related' | 'trending' | 'personal' | 'category' | 'crossSell' | 'upSell';
  title?: string;
  description?: string;
}

interface RecommendedProduct extends Product {
  reason: {
    type: 'browsing_history' | 'similar_users' | 'trending' | 'category_preference' | 'similar_products' | 'frequently_bought_together';
    description: string;
    confidence: number;
  };
  score: number;
}

const RecommendationEngine: React.FC<RecommendationEngineProps> = ({
  userId,
  productId,
  category,
  maxItems = 4,
  showReason = true,
  className,
  type = 'personal',
  title,
  description
}) => {
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Get wishlist state
  const { addItem: addToWishlist } = useWishlistStore();
  
  // Use cart mutation
  const { mutate: addToCart } = useAddToCart();

  // Generate mock recommendations based on type
  const generateRecommendations = (): RecommendedProduct[] => {
    // Base products to use for recommendations
    const baseProducts: Product[] = [
      {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        name: 'Premium Wireless Earbuds',
        price: 149.99,
        originalPrice: 199.99,
        images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80'],
        category: 'electronics',
        supplier: {
          id: '1',
          name: 'AudioTech Turkey',
          country: 'Turkey',
          rating: 4.8,
          verified: true,
          totalProducts: 150,
          responseTime: '< 2 hours',
          memberSince: '2020'
        },
        rating: 4.7,
        reviews: 234,
        inStock: true,
        minOrder: 1,
        tags: ['wireless', 'premium', 'noise-cancelling'],
        currency: 'USD',
        description: 'Premium wireless earbuds with active noise cancellation',
        isFeatured: true
      },
      {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
        name: 'Smart Fitness Watch',
        price: 299.99,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'],
        category: 'electronics',
        supplier: {
          id: '2',
          name: 'FitTech Istanbul',
          country: 'Turkey',
          rating: 4.6,
          verified: true,
          totalProducts: 85,
          responseTime: '< 4 hours',
          memberSince: '2019'
        },
        rating: 4.5,
        reviews: 189,
        inStock: true,
        minOrder: 1,
        tags: ['fitness', 'smart', 'health'],
        currency: 'USD',
        description: 'Advanced fitness tracking with health monitoring',
        isNew: true
      },
      {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
        name: 'Handcrafted Leather Wallet',
        price: 79.99,
        images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80'],
        category: 'fashion',
        supplier: {
          id: '3',
          name: 'Istanbul Leather Co.',
          country: 'Turkey',
          rating: 4.9,
          verified: true,
          totalProducts: 95,
          responseTime: '< 2 hours',
          memberSince: '2017'
        },
        rating: 4.8,
        reviews: 156,
        inStock: true,
        minOrder: 1,
        tags: ['leather', 'handcrafted', 'premium'],
        currency: 'USD',
        description: 'Genuine leather wallet with RFID protection'
      },
      {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d482',
        name: 'Turkish Coffee Set',
        price: 45.99,
        images: ['https://images.unsplash.com/photo-1549426027-51296f485814?w=400&q=80'],
        category: 'food-beverage',
        supplier: {
          id: '4',
          name: 'Anatolian Delights',
          country: 'Turkey',
          rating: 4.7,
          verified: true,
          totalProducts: 120,
          responseTime: '< 3 hours',
          memberSince: '2018'
        },
        rating: 4.6,
        reviews: 98,
        inStock: true,
        minOrder: 1,
        tags: ['coffee', 'traditional', 'authentic'],
        currency: 'USD',
        description: 'Authentic Turkish coffee with traditional serving set'
      },
      {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d483',
        name: 'Professional Hair Dryer',
        price: 79.99,
        originalPrice: 99.99,
        images: ['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&q=80'],
        category: 'beauty',
        supplier: {
          id: '5',
          name: 'Beauty Pro Turkey',
          country: 'Turkey',
          rating: 4.4,
          verified: true,
          totalProducts: 120,
          responseTime: '< 3 hours',
          memberSince: '2021'
        },
        rating: 4.2,
        reviews: 67,
        inStock: true,
        minOrder: 1,
        tags: ['professional', 'ionic', 'salon-grade'],
        currency: 'USD',
        description: 'Salon-grade ionic hair dryer with multiple heat settings'
      },
      {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d484',
        name: 'Fitness Resistance Bands Set',
        price: 29.99,
        originalPrice: 39.99,
        images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80'],
        category: 'sports',
        supplier: {
          id: '6',
          name: 'FitLife Turkey',
          country: 'Turkey',
          rating: 4.3,
          verified: true,
          totalProducts: 75,
          responseTime: '< 6 hours',
          memberSince: '2020'
        },
        rating: 4.1,
        reviews: 92,
        inStock: true,
        minOrder: 1,
        tags: ['fitness', 'resistance', 'home-gym'],
        currency: 'USD',
        description: 'Complete resistance bands set with door anchor and exercise guide'
      }
    ];

    // Different reason types based on recommendation type
    const reasonTypes: Record<string, any[]> = {
      'personal': [
        {
          type: 'browsing_history',
          description: 'Based on your recent views',
          confidence: 92
        },
        {
          type: 'similar_users',
          description: 'Customers like you also bought this',
          confidence: 87
        }
      ],
      'trending': [
        {
          type: 'trending',
          description: 'Trending in your region',
          confidence: 95
        },
        {
          type: 'trending',
          description: 'Popular this week',
          confidence: 90
        }
      ],
      'category': [
        {
          type: 'category_preference',
          description: `Top picks in ${category || 'this category'}`,
          confidence: 88
        },
        {
          type: 'category_preference',
          description: 'Matches your favorite categories',
          confidence: 85
        }
      ],
      'related': [
        {
          type: 'similar_products',
          description: 'Similar to products you viewed',
          confidence: 89
        },
        {
          type: 'similar_products',
          description: 'Customers also viewed',
          confidence: 84
        }
      ],
      'crossSell': [
        {
          type: 'frequently_bought_together',
          description: 'Frequently bought together',
          confidence: 91
        },
        {
          type: 'frequently_bought_together',
          description: 'Complete your purchase',
          confidence: 86
        }
      ],
      'upSell': [
        {
          type: 'similar_products',
          description: 'Premium alternative',
          confidence: 83
        },
        {
          type: 'similar_products',
          description: 'Upgrade option',
          confidence: 80
        }
      ]
    };

    // Filter products based on recommendation type
    let filteredProducts = [...baseProducts];
    
    if (type === 'category' && category) {
      filteredProducts = baseProducts.filter(p => p.category === category);
    } else if (type === 'related' && productId) {
      // Exclude the current product
      filteredProducts = baseProducts.filter(p => p.id !== productId);
    } else if (type === 'crossSell' && productId) {
      // Products that complement the current product
      filteredProducts = baseProducts.filter(p => p.id !== productId && p.category !== baseProducts.find(bp => bp.id === productId)?.category);
    } else if (type === 'upSell' && productId) {
      // More expensive alternatives to the current product
      const currentProduct = baseProducts.find(p => p.id === productId);
      if (currentProduct) {
        filteredProducts = baseProducts.filter(p => 
          p.id !== productId && 
          p.category === currentProduct.category && 
          p.price > currentProduct.price
        );
      }
    }

    // Assign reasons and scores
    return filteredProducts.map((product, index) => {
      const reasonsForType = reasonTypes[type] || reasonTypes['personal'];
      return {
        ...product,
        reason: reasonsForType[index % reasonsForType.length],
        score: 95 - (index * 5)
      };
    });
  };

  useEffect(() => {
    const loadRecommendations = () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const recs = generateRecommendations().slice(0, maxItems);
        setRecommendations(recs);
        setLoading(false);
      }, 1000);
    };

    loadRecommendations();
  }, [maxItems, userId, productId, category, type]);

  const refreshRecommendations = () => {
    setRefreshing(true);
    setTimeout(() => {
      const recs = generateRecommendations().slice(0, maxItems);
      setRecommendations(recs);
      setRefreshing(false);
    }, 1000);
  };

  const getReasonIcon = (reasonType: string) => {
    switch (reasonType) {
      case 'browsing_history': return <User className="w-3 h-3" />;
      case 'similar_users': return <Heart className="w-3 h-3" />;
      case 'trending': return <TrendingUp className="w-3 h-3" />;
      case 'category_preference': return <Tag className="w-3 h-3" />;
      case 'similar_products': return <Package className="w-3 h-3" />;
      case 'frequently_bought_together': return <Package className="w-3 h-3" />;
      default: return <Sparkles className="w-3 h-3" />;
    }
  };

  const getReasonColor = (reasonType: string) => {
    switch (reasonType) {
      case 'browsing_history': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
      case 'similar_users': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300';
      case 'trending': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300';
      case 'category_preference': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300';
      case 'similar_products': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300';
      case 'frequently_bought_together': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300';
      default: return 'bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300';
    }
  };

  // Default titles based on recommendation type
  const getDefaultTitle = () => {
    switch (type) {
      case 'related': return 'Related Products';
      case 'trending': return 'Trending Now';
      case 'personal': return 'Recommended for You';
      case 'category': return `Top Picks in ${category}`;
      case 'crossSell': return 'Frequently Bought Together';
      case 'upSell': return 'You Might Also Like';
      default: return 'Recommended Products';
    }
  };

  // Default descriptions based on recommendation type
  const getDefaultDescription = () => {
    switch (type) {
      case 'related': return 'Products similar to what you\'re viewing';
      case 'trending': return 'Popular products other customers are buying';
      case 'personal': return 'Personalized recommendations based on your browsing history';
      case 'category': return `Top products in the ${category} category`;
      case 'crossSell': return 'Complete your purchase with these complementary products';
      case 'upSell': return 'Premium alternatives you might prefer';
      default: return 'Products you might be interested in';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <section className={clsx('py-8', className)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-6">
            <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {title || getDefaultTitle()}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-neutral-200 dark:bg-neutral-700 rounded-xl h-80"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={clsx('py-8', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {title || getDefaultTitle()}
            </h2>
          </div>
          
          <Button
            variant="ghost"
            onClick={refreshRecommendations}
            loading={refreshing}
            leftIcon={<RefreshCw className="w-4 h-4" />}
            className="text-neutral-500"
          >
            Refresh
          </Button>
        </div>

        {description && (
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-3xl">
            {description || getDefaultDescription()}
          </p>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {recommendations.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="relative"
            >
              {showReason && (
                <div className="absolute top-2 left-2 z-10">
                  <div className={clsx(
                    'flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium',
                    getReasonColor(product.reason.type)
                  )}>
                    {getReasonIcon(product.reason.type)}
                    <span>{product.reason.confidence}% match</span>
                  </div>
                </div>
              )}
              
              <ProductCard
                product={product}
                onAddToCart={(p) => addToCart({ product: p, quantity: 1 })}
                onAddToWishlist={(p) => addToWishlist(p)}
                onQuickView={(p) => window.location.hash = `product?id=${p.id}`}
              />
              
              {showReason && (
                <div className="mt-2 px-3">
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {product.reason.description}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {recommendations.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              No recommendations yet
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Browse some products to get personalized recommendations
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecommendationEngine;