import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Button from '../atoms/Button';
import { clsx } from 'clsx';

interface ErrorStateProps {
  title?: string;
  message?: string;
  code?: string | number;
  onRetry?: () => void;
  onHome?: () => void;
  className?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error while processing your request. Please try again later.',
  code,
  onRetry,
  onHome,
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={clsx(
        'flex flex-col items-center justify-center text-center p-6',
        className
      )}
    >
      <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-red-600" />
      </div>
      
      {code && (
        <div className="text-4xl font-bold text-red-600 mb-2">
          {code}
        </div>
      )}
      
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
        {title}
      </h2>
      
      <p className="text-neutral-600 dark:text-neutral-400 max-w-md mb-8">
        {message}
      </p>
      
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        {onRetry && (
          <Button
            variant="primary"
            onClick={onRetry}
            leftIcon={<RefreshCw className="w-4 h-4" />}
            className="bg-red-600 hover:bg-red-700"
          >
            Try Again
          </Button>
        )}
        
        {onHome && (
          <Button
            variant="outline"
            onClick={onHome}
            leftIcon={<Home className="w-4 h-4" />}
          >
            Back to Home
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorState;