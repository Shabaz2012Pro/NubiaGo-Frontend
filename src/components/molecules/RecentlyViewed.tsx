import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, Eye, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import { clsx } from 'clsx';

interface RecentlyViewedProps {
  maxItems?: number;
  showInSidebar?: boolean;
  className?: string;
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  maxItems = 10,
  showInSidebar = false,
  className
}) => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  // Mock recent products - in real app, this would come from localStorage or API
  useEffect(() => {
    const mockRecentProducts: Product[] = [
      {
        id: '1',
        name: 'Wireless Headphones',
        price: 199.99,
        images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300'],
        category: 'electronics',
        supplier: {
          id: '1',
          name: 'TechCorp Turkey',
          country: 'Turkey',
          rating: 4.8,
          verified: true,
          totalProducts: 150,
          responseTime: '< 2 hours',
          memberSince: '2020'
        },
        rating: 4.5,
        reviews: 128,
        inStock: true,
        minOrder: 1,
        tags: ['wireless', 'premium'],
        currency: 'USD',
        description: 'Premium wireless headphones'
      },
      {
        id: '2',
        name: 'Smart Watch',
        price: 299.99,
        images: ['https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300'],
        category: 'electronics',
        supplier: {
          id: '2',
          name: 'Smart Devices TR',
          country: 'Turkey',
          rating: 4.6,
          verified: true,
          totalProducts: 85,
          responseTime: '< 4 hours',
          memberSince: '2019'
        },
        rating: 4.3,
        reviews: 89,
        inStock: true,
        minOrder: 1,
        tags: ['smart', 'fitness'],
        currency: 'USD',
        description: 'Advanced smart watch'
      },
      {
        id: '3',
        name: 'Leather Bag',
        price: 129.99,
        images: ['https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300'],
        category: 'fashion',
        supplier: {
          id: '3',
          name: 'Istanbul Leather',
          country: 'Turkey',
          rating: 4.7,
          verified: true,
          totalProducts: 95,
          responseTime: '< 2 hours',
          memberSince: '2017'
        },
        rating: 4.6,
        reviews: 156,
        inStock: true,
        minOrder: 1,
        tags: ['leather', 'handcrafted'],
        currency: 'USD',
        description: 'Handcrafted leather bag'
      }
    ];

    setRecentProducts(mockRecentProducts.slice(0, maxItems));
  }, [maxItems]);

  const removeProduct = (productId: string) => {
    setRecentProducts(prev => prev.filter(p => p.id !== productId));
  };

  const clearAll = () => {
    setRecentProducts([]);
  };

  if (!isVisible || recentProducts.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  if (showInSidebar) {
    return (
      <Card variant="default" padding="md" className={clsx('sticky top-4', className)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-neutral-500" />
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
              Recently Viewed
            </h3>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {recentProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors group"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                  {product.name}
                </h4>
                <p className="text-sm text-red-600 font-semibold">
                  ${product.price}
                </p>
              </div>
              <button
                onClick={() => removeProduct(product.id)}
                className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-500 transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {recentProducts.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="w-full mt-4 text-neutral-500"
          >
            Clear All
          </Button>
        )}
      </Card>
    );
  }

  return (
    <section className={clsx('py-8', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Recently Viewed
            </h2>
          </div>
          <Button variant="ghost" onClick={clearAll} className="text-neutral-500">
            Clear All
          </Button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {recentProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group"
            >
              <Card
                variant="default"
                padding="sm"
                hover={true}
                interactive={true}
                className="relative overflow-hidden"
              >
                <button
                  onClick={() => removeProduct(product.id)}
                  className="absolute top-2 right-2 w-6 h-6 bg-white/90 dark:bg-neutral-800/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <X className="w-3 h-3 text-neutral-600" />
                </button>

                <div className="aspect-square mb-3 overflow-hidden rounded-lg">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm mb-1 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-red-600 font-bold text-lg mb-2">
                  ${product.price}
                </p>

                <div className="flex space-x-1">
                  <Button
                    size="xs"
                    variant="outline"
                    className="flex-1"
                    leftIcon={<Eye className="w-3 h-3" />}
                  >
                    View
                  </Button>
                  <Button
                    size="xs"
                    variant="primary"
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    leftIcon={<ShoppingCart className="w-3 h-3" />}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RecentlyViewed;