import React from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import RecommendationEngine from './RecommendationEngine';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import { clsx } from 'clsx';
import { useAddToCart } from '../../api/queries/useCartQueries';

interface CrossSellRecommendationsProps {
  productId: string;
  title?: string;
  description?: string;
  maxItems?: number;
  className?: string;
}

const CrossSellRecommendations: React.FC<CrossSellRecommendationsProps> = ({
  productId,
  title = "Complete Your Purchase",
  description = "Customers who bought this item also bought",
  maxItems = 4,
  className
}) => {
  const { mutate: addToCart } = useAddToCart();

  const handleAddAllToCart = () => {
    // This would need to be implemented with actual product data
    console.log('Add all to cart');
  };

  return (
    <Card variant="default" padding="lg" className={className}>
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <ShoppingBag className="w-5 h-5 text-red-600" />
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
        type="crossSell"
        maxItems={maxItems}
        showReason={false}
      />

      <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
        <Button
          variant="primary"
          fullWidth
          className="bg-red-600 hover:bg-red-700"
          onClick={handleAddAllToCart}
        >
          Add All to Cart
        </Button>
      </div>
    </Card>
  );
};

export default CrossSellRecommendations;