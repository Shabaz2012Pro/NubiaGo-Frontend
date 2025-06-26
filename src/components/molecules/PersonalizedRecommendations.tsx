import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Heart, User, RefreshCw } from 'lucide-react';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import { clsx } from 'clsx';

interface PersonalizedRecommendationsProps {
  userId?: string;
  maxItems?: number;
  showReason?: boolean;
  className?: string;
}

interface RecommendationReason {
  type: 'browsing_history' | 'similar_users' | 'trending' | 'category_preference' | 'price_range';
  description: string;
  confidence: number;
}

interface RecommendedProduct extends Product {
  reason: RecommendationReason;
  score: number;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({
  userId,
  maxItems = 8,
  showReason = true,
  className
}) => {
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock AI-powered recommendations
  const generateRecommendations = (): RecommendedProduct[] => {
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
      }
    ];

    const reasons: RecommendationReason[] = [
      {
        type: 'browsing_history',
        description: 'Based on your recent views of electronics',
        confidence: 92
      },
      {
        type: 'similar_users',
        description: 'Customers like you also bought this',
        confidence: 87
      },
      {
        type: 'trending',
        description: 'Trending in your region',
        confidence: 78
      },
      {
        type: 'category_preference',
        description: 'Matches your favorite categories',
        confidence: 85
      }
    ];

    return baseProducts.map((product, index) => ({
      ...product,
      reason: reasons[index % reasons.length],
      score: 95 - (index * 5)
    }));
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
  }, [maxItems, userId]);

  const refreshRecommendations = () => {
    setRefreshing(true);
    setTimeout(() => {
      const recs = generateRecommendations().slice(0, maxItems);
      setRecommendations(recs);
      setRefreshing(false);
    }, 1000);
  };

  const getReasonIcon = (type: RecommendationReason['type']) => {
    switch (type) {
      case 'browsing_history': return <User className="w-3 h-3" />;
      case 'similar_users': return <Heart className="w-3 h-3" />;
      case 'trending': return <TrendingUp className="w-3 h-3" />;
      case 'category_preference': return <Sparkles className="w-3 h-3" />;
      default: return <Sparkles className="w-3 h-3" />;
    }
  };

  const getReasonColor = (type: RecommendationReason['type']) => {
    switch (type) {
      case 'browsing_history': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
      case 'similar_users': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300';
      case 'trending': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300';
      case 'category_preference': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300';
      default: return 'bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300';
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
              Recommended for You
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
              Recommended for You
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
                onAddToCart={(p) => console.log('Add to cart:', p.name)}
                onAddToWishlist={(p) => console.log('Add to wishlist:', p.name)}
                onQuickView={(p) => console.log('Quick view:', p.name)}
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

export default PersonalizedRecommendations;