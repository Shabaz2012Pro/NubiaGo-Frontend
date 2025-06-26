import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CategoryCardProps } from '../../types';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import { clsx } from 'clsx';
import { ArrowRight, Sparkles } from 'lucide-react';

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onClick,
  loading = false,
  showProductCount = true,
  className,
  ...props
}) => {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    hover: {
      y: -4,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  if (loading) {
    return (
      <Card 
        variant="default" 
        padding="md" 
        loading={true}
        className={clsx('animate-pulse h-80', className)}
      >
        <div className="flex flex-col space-y-4 h-full">
          <div className="w-16 h-16 bg-neutral-200 dark:bg-neutral-700 rounded-2xl"></div>
          <div className="space-y-3 flex-1">
            <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={className}
      {...props}
    >
      <Card
        variant="default"
        padding="md"
        interactive={true}
        className="group cursor-pointer overflow-hidden relative h-80 bg-gradient-to-br from-white via-white to-neutral-50 dark:from-neutral-800 dark:via-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-red-300 dark:hover:border-red-600 hover:shadow-xl"
        onClick={onClick}
      >
        {/* Clean Background Pattern - No Images */}
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-gold-500/10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative flex flex-col h-full">
          {/* Icon Section */}
          <motion.div 
            className="relative mb-4"
            variants={iconVariants}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-red-900/20 dark:via-neutral-800 dark:to-red-800/20 rounded-2xl group-hover:from-red-100 group-hover:via-red-50 group-hover:to-red-200 dark:group-hover:from-red-800/30 dark:group-hover:to-red-700/30 transition-all duration-500 flex items-center justify-center shadow-lg group-hover:shadow-xl border border-red-100 dark:border-red-800/30 group-hover:border-red-200 dark:group-hover:border-red-700/50">
              <div className="text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-300">
                {category.icon}
              </div>
            </div>
            
            {/* Premium Badge */}
            <motion.div
              className="absolute -top-2 -right-2"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          </motion.div>
          
          {/* Content Section */}
          <div className="flex-1 flex flex-col">
            {/* Category Name */}
            <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 mb-2">
              {category.name}
            </h3>
            
            {/* Description */}
            {category.description && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-3 flex-1">
                {category.description}
              </p>
            )}

            {/* Product Count */}
            {showProductCount && category.productCount && (
              <div className="mb-3">
                <Badge 
                  variant="primary" 
                  size="sm" 
                  className="font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800/50"
                >
                  {category.productCount.toLocaleString()} products
                </Badge>
              </div>
            )}
            
            {/* Subcategories */}
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {category.subcategories.slice(0, 2).map((sub) => (
                  <span
                    key={sub.id}
                    className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200 cursor-pointer border border-neutral-200 dark:border-neutral-600"
                  >
                    {sub.name}
                  </span>
                ))}
                {category.subcategories.length > 2 && (
                  <span className="px-2 py-1 text-xs bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-300 rounded-full font-medium">
                    +{category.subcategories.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Hover Action */}
          <motion.div
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
            initial={{ x: 10, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white dark:border-neutral-800">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CategoryCard;