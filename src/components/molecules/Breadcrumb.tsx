import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { clsx } from 'clsx';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  separator?: React.ReactNode;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items, 
  showHome = true, 
  separator = <ChevronRight className="w-4 h-4" />,
  className 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <nav 
      className={clsx('flex items-center space-x-2 text-sm', className)} 
      aria-label="Breadcrumb"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center space-x-2"
      >
        {showHome && (
          <>
            <motion.div variants={itemVariants}>
              <Link
                to="/"
                className="text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 transition-colors duration-200 p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="Home"
              >
                <Home className="w-4 h-4" />
              </Link>
            </motion.div>
            <span className="text-neutral-400">{separator}</span>
          </>
        )}
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <motion.div variants={itemVariants} className="flex items-center">
              {item.current ? (
                <span className="text-neutral-900 dark:text-neutral-100 font-medium flex items-center space-x-1 px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded">
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              ) : (
                <Link
                  to={item.href || '#'}
                  className="text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 transition-colors duration-200 flex items-center space-x-1 px-2 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                </Link>
              )}
            </motion.div>
            
            {index < items.length - 1 && (
              <span className="text-neutral-400">{separator}</span>
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </nav>
  );
};

export default Breadcrumb;