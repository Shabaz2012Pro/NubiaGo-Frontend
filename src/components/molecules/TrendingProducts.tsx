import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import RecommendationEngine from './RecommendationEngine';
import { clsx } from 'clsx';

interface TrendingProductsProps {
  title?: string;
  description?: string;
  maxItems?: number;
  className?: string;
}

const TrendingProducts: React.FC<TrendingProductsProps> = ({
  title = "Trending Now",
  description = "Popular products other customers are buying",
  maxItems = 4,
  className
}) => {
  return (
    <section className={clsx('py-8', className)}>
      <RecommendationEngine
        type="trending"
        maxItems={maxItems}
        title={title}
        description={description}
      />
    </section>
  );
};

export default TrendingProducts;