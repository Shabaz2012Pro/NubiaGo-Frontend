
import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../molecules/Breadcrumb';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbItems?: Array<{ label: string; href?: string; current?: boolean }>;
  className?: string;
  backgroundImage?: string;
  variant?: 'default' | 'hero' | 'minimal';
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbItems,
  className = '',
  backgroundImage,
  variant = 'default'
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const baseClasses = "relative py-16 px-4 sm:px-6 lg:px-8";
  const variantClasses = {
    default: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800",
    hero: "bg-gradient-to-br from-blue-600 to-purple-700 text-white min-h-[60vh] flex items-center",
    minimal: "bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700"
  };

  return (
    <section 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' } : undefined}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {breadcrumbItems && (
            <motion.div variants={itemVariants} className="mb-8">
              <Breadcrumb items={breadcrumbItems} />
            </motion.div>
          )}
          
          <motion.div variants={itemVariants} className="text-center">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
              variant === 'hero' ? 'text-white' : 'text-neutral-900 dark:text-neutral-100'
            }`}>
              {title}
            </h1>
            {subtitle && (
              <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
                variant === 'hero' ? 'text-blue-100' : 'text-neutral-600 dark:text-neutral-400'
              }`}>
                {subtitle}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
