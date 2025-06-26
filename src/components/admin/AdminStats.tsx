import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Clock, 
  Globe, 
  Package
} from 'lucide-react';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import { clsx } from 'clsx';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => (
  <Card variant="default" padding="lg" className="h-full">
    <div className="flex items-center justify-between mb-4">
      <div className={clsx('p-3 rounded-lg', `bg-${color}-100 dark:bg-${color}-900/20`)}>
        <div className={clsx(`text-${color}-600`)}>{icon}</div>
      </div>
      <Badge 
        variant={change > 0 ? 'success' : 'error'} 
        size="sm"
      >
        {change > 0 ? '+' : ''}{change}%
      </Badge>
    </div>
    <h3 className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
      {title}
    </h3>
    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
      {typeof value === 'number' ? value.toLocaleString() : value}
    </p>
    <p className="text-xs text-neutral-500 mt-1">
      vs previous month
    </p>
  </Card>
);

interface AdminStatsProps {
  className?: string;
}

const AdminStats: React.FC<AdminStatsProps> = ({ className }) => {
  // Mock data
  const stats = [
    { 
      title: 'Total Revenue', 
      value: '$125,750.45', 
      change: 12.5, 
      icon: <DollarSign className="w-6 h-6" />, 
      color: 'green' 
    },
    { 
      title: 'Total Orders', 
      value: 1254, 
      change: 8.3, 
      icon: <ShoppingBag className="w-6 h-6" />, 
      color: 'blue' 
    },
    { 
      title: 'Total Users', 
      value: 8750, 
      change: 15.2, 
      icon: <Users className="w-6 h-6" />, 
      color: 'purple' 
    },
    { 
      title: 'Total Products', 
      value: 12500, 
      change: 5.7, 
      icon: <Package className="w-6 h-6" />, 
      color: 'amber' 
    }
  ];

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={clsx('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6', className)}
    >
      {stats.map((stat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <StatCard {...stat} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AdminStats;