import React, { useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import ProductCardOptimized from './ProductCardOptimized';
import { clsx } from 'clsx';

interface InfiniteProductGridProps {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onProductClick?: (product: Product) => void;
  viewMode?: 'grid' | 'list';
  className?: string;
}

const InfiniteProductGrid: React.FC<InfiniteProductGridProps> = ({
  products,
  loading,
  hasMore,
  onLoadMore,
  onProductClick,
  viewMode = 'grid',
  className
}) => {
  // Set up intersection observer for infinite loading
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '200px 0px',
  });
  
  // Load more when the load more element comes into view
  React.useEffect(() => {
    if (inView && hasMore && !loading) {
      onLoadMore();
    }
  }, [inView, hasMore, loading, onLoadMore]);
  
  // Memoize product click handler
  const handleProductClick = useCallback((product: Product) => {
    onProductClick?.(product);
  }, [onProductClick]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className={className}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={clsx(
          'grid gap-6',
          viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        )}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            // Only prioritize loading for the first 4 products
            custom={index}
          >
            <ProductCardOptimized
              product={product}
              onQuickView={handleProductClick}
              compact={viewMode === 'list'}
              priority={index < 4}
            />
          </motion.div>
        ))}
        
        {/* Loading indicator and load more trigger */}
        {(loading || hasMore) && (
          <div 
            ref={loadMoreRef}
            className="col-span-full flex justify-center py-8"
          >
            {loading && (
              <div className="w-10 h-10 border-4 border-neutral-300 border-t-red-600 rounded-full animate-spin"></div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default React.memo(InfiniteProductGrid);