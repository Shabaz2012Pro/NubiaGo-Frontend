import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star } from 'lucide-react';
import { Product } from '../../types';
import RecommendationEngine from './RecommendationEngine';
import Card from '../atoms/Card';
import { clsx } from 'clsx';

interface UpSellRecommendationsProps {
  productId: string;
  title?: string;
  description?: string;
  maxItems?: number;
  className?: string;
}

const UpSellRecommendations: React.FC<UpSellRecommendationsProps> = ({
  productId,
  title = "Premium Alternatives",
  description = "Upgrade your choice with these premium options",
  maxItems = 3,
  className
}) => {
  return (
    <Card variant="default" padding="lg" className={className}>
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <ArrowUpRight className="w-5 h-5 text-gold-500" />
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
        </div>
        {description && (
          <p className="text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        )}
      </div>

      <RecommendationEngine
        productId={productId}
        type="upSell"
        maxItems={maxItems}
        showReason={false}
      />
    </Card>
  );
};

export default UpSellRecommendations;