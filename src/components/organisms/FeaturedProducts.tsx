import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../atoms/Button';
import { ArrowRight, Filter, Grid, List } from 'lucide-react';
import { clsx } from 'clsx';
import { useFeaturedProducts } from '../../api/queries/useProductQueries';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../molecules/ErrorBoundaryFallback';
import ProductCardOptimized from '../molecules/ProductCardOptimized';

interface FeaturedProductsProps {
  className?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ className }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAll, setShowAll] = useState(false);

  // Fetch featured products using React Query
  const { 
    data: featuredProducts = [], 
    isLoading, 
    isError, 
    error 
  } = useFeaturedProducts();

  const displayedProducts = showAll ? featuredProducts : featuredProducts.slice(0, 4);

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const handleAddToCart = (product: any) => {
    console.log('Added to cart:', product.name);
    // This would be handled by the cart mutation in a real implementation
  };

  const handleAddToWishlist = (product: any) => {
    console.log('Added to wishlist:', product.name);
    // This would be handled by the wishlist store
  };

  const handleQuickView = (product: any) => {
    console.log('Quick view:', product.name);
    // Navigate to product detail page
    window.location.hash = `product?id=${product.id}`;
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

  return (
    <section className={clsx('py-16 bg-white dark:bg-neutral-900', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div className="mb-6 lg:mb-0">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 dark:text-neutral-100 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Discover our handpicked selection of premium products from verified Turkish suppliers
            </p>
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={clsx(
                  'p-2 rounded-md transition-colors duration-200',
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-neutral-700 text-primary-600 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={clsx(
                  'p-2 rounded-md transition-colors duration-200',
                  viewMode === 'list'
                    ? 'bg-white dark:bg-neutral-700 text-primary-600 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <Button variant="outline" size="sm" leftIcon={<Filter />}>
              Filter
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={() => {
            window.location.reload();
          }}
        >
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-neutral-200 dark:bg-neutral-700 rounded-xl h-80"></div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <p className="text-red-500">Error loading products: {error instanceof Error ? error.message : 'Unknown error'}</p>
              <Button 
                variant="primary" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={clsx(
                'grid gap-6 mb-12',
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              )}
            >
              {displayedProducts.map((product, index) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCardOptimized
                    key={product.id}
                    product={product}
                    variant="grid"
                    showQuickView={true}
                    onQuickView={handleQuickView}
                    priority={index < 4}
                    className="h-full"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </ErrorBoundary>

        {/* Load More / View All */}
        <div className="text-center">
          {!showAll && featuredProducts.length > 4 ? (
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              rightIcon={<ArrowRight />}
              className="px-8"
            >
              View All Featured Products
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight />}
              className="px-8"
              onClick={() => window.location.hash = 'products'}
            >
              Browse All Products
            </Button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">10M+</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Products Available</p>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gold-600 dark:text-gold-400">5,000+</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Verified Suppliers</p>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">98%</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Customer Satisfaction</p>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">24/7</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;