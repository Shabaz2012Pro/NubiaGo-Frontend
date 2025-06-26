import React from 'react';
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';
import RecommendationEngine from './RecommendationEngine';
import { clsx } from 'clsx';

interface CategoryRecommendationsProps {
  category: string;
  title?: string;
  description?: string;
  maxItems?: number;
  className?: string;
}

const CategoryRecommendations: React.FC<CategoryRecommendationsProps> = ({
  category,
  title,
  description,
  maxItems = 4,
  className
}) => {
  // Default title based on category
  const defaultTitle = `Top ${category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')} Products`;
  
  return (
    <section className={clsx('py-8', className)}>
      <RecommendationEngine
        category={category}
        type="category"
        maxItems={maxItems}
        title={title || defaultTitle}
        description={description || `Discover our best-selling ${category.replace(/-/g, ' ')} products`}
      />
    </section>
  );
};

export default CategoryRecommendations;