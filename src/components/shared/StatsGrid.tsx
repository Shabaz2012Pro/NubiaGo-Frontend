
import React from 'react';
import { motion } from 'framer-motion';
import Card from '../atoms/Card';

interface StatItem {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface StatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'minimal' | 'cards';
  className?: string;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  stats,
  columns = 4,
  variant = 'default',
  className = ''
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  const renderStat = (stat: StatItem, index: number) => {
    const content = (
      <div className="text-center">
        {stat.icon && (
          <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">
            {stat.icon}
          </div>
        )}
        <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          {stat.value}
        </div>
        <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
          {stat.label}
        </div>
        {stat.description && (
          <div className="text-xs text-neutral-500 dark:text-neutral-500">
            {stat.description}
          </div>
        )}
        {stat.trend && (
          <div className={`text-xs font-medium mt-2 ${
            stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {stat.trend.isPositive ? '+' : ''}{stat.trend.value}%
          </div>
        )}
      </div>
    );

    if (variant === 'cards') {
      return (
        <motion.div key={index} variants={itemVariants}>
          <Card variant="default" padding="lg" className="h-full">
            {content}
          </Card>
        </motion.div>
      );
    }

    if (variant === 'minimal') {
      return (
        <motion.div 
          key={index} 
          variants={itemVariants}
          className="p-6 border-r border-neutral-200 dark:border-neutral-700 last:border-r-0"
        >
          {content}
        </motion.div>
      );
    }

    return (
      <motion.div 
        key={index} 
        variants={itemVariants}
        className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700"
      >
        {content}
      </motion.div>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`grid ${gridClasses[columns]} gap-6 ${className}`}
    >
      {stats.map(renderStat)}
    </motion.div>
  );
};

export default StatsGrid;
