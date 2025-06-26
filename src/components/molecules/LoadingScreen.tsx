import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import { clsx } from 'clsx';

interface LoadingScreenProps {
  isLoading: boolean;
  text?: string;
  fullScreen?: boolean;
  transparent?: boolean;
  className?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  text = 'Loading...',
  fullScreen = true,
  transparent = false,
  className
}) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={clsx(
            fullScreen ? 'fixed inset-0 z-50' : 'absolute inset-0 z-10',
            transparent ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm' : 'bg-white dark:bg-neutral-900',
            'flex flex-col items-center justify-center',
            className
          )}
        >
          <LoadingSpinner size="lg" color="red" />
          
          {text && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-neutral-600 dark:text-neutral-400 font-medium"
            >
              {text}
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;