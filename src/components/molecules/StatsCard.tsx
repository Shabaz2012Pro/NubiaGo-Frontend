import React from 'react';
import { motion } from 'framer-motion';
import { StatsCardProps } from '../../types';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../atoms/Card';

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  loading = false,
  variant = 'default',
  className,
  ...props
}) => {
  const variantStyles = {
    default: 'border-neutral-200 dark:border-neutral-700',
    success: 'border-green-200 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10',
    warning: 'border-yellow-200 dark:border-yellow-700 bg-yellow-50/50 dark:bg-yellow-900/10',
    error: 'border-red-200 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10',
  };

  const iconVariantStyles = {
    default: 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400',
    success: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    error: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    hover: {
      y: -2,
      transition: { duration: 0.2 }
    }
  };

  const valueVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.6, delay: 0.2, ease: 'easeOut' }
    }
  };

  if (loading) {
    return (
      <Card 
        variant="default" 
        padding="md"
        className={clsx('animate-pulse', className)}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
            <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
            <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3"></div>
          </div>
          <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
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
        className={clsx(
          'border-l-4',
          variantStyles[variant]
        )}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {title}
            </p>
            
            <motion.p 
              className="text-3xl font-bold text-neutral-900 dark:text-neutral-100"
              variants={valueVariants}
            >
              {typeof value === 'number' ? value.toLocaleString() : value}
            </motion.p>
            
            {change && (
              <motion.div 
                className="flex items-center space-x-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                {change.type === 'increase' ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={clsx(
                  'text-sm font-medium',
                  change.type === 'increase' ? 'text-green-600' : 'text-red-600'
                )}>
                  {change.value > 0 ? '+' : ''}{change.value}%
                </span>
                <span className="text-sm text-neutral-500">
                  vs {change.period}
                </span>
              </motion.div>
            )}
          </div>
          
          {icon && (
            <motion.div 
              className={clsx(
                'w-12 h-12 rounded-full flex items-center justify-center',
                iconVariantStyles[variant]
              )}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            >
              {icon}
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default StatsCard;