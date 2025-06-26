import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

export interface ToastNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  autoClose?: boolean;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationToastProps {
  notification: ToastNotification;
  onClose: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  className?: string;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onClose,
  position = 'top-right',
  className
}) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-close timer
  useEffect(() => {
    if (!notification.autoClose || isPaused) return;

    const duration = notification.duration || 5000;
    const interval = 10; // Update progress every 10ms
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          onClose(notification.id);
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [notification, onClose, isPaused]);

  // Notification type styles and icons
  const typeStyles = {
    'info': {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-700 dark:text-blue-300',
      icon: <Info className="w-5 h-5 text-blue-500" />,
      progress: 'bg-blue-500'
    },
    'success': {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-700 dark:text-green-300',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      progress: 'bg-green-500'
    },
    'warning': {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-700 dark:text-yellow-300',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      progress: 'bg-yellow-500'
    },
    'error': {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-700 dark:text-red-300',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      progress: 'bg-red-500'
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: position.includes('top') ? -20 : 20, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.3 } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      transition: { duration: 0.2 } 
    }
  };

    // Add formatTimestamp function here
    const formatTimestamp = (timestamp: Date | string): string => {
      const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Just now';
      }
  
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
      if (diffInSeconds < 60) {
        return 'Just now';
      } else if (diffInSeconds < 3600) {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < 86400) {
        const diffInHours = Math.floor(diffInSeconds / 3600);
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
      } else {
        const diffInDays = Math.floor(diffInSeconds / 86400);
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
      }
    };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={clsx(
        'mb-3 p-4 rounded-lg shadow-lg border relative overflow-hidden',
        typeStyles[notification.type].bg,
        typeStyles[notification.type].border,
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {typeStyles[notification.type].icon}
        </div>
        <div className={clsx('ml-3 flex-1', typeStyles[notification.type].text)}>
          <p className="text-sm font-medium">{notification.message}</p>
          {notification.action && (
            <button
              onClick={notification.action.onClick}
              className="mt-1 text-sm font-medium underline hover:opacity-80"
            >
              {notification.action.label}
            </button>
          )}
        </div>
        <button
          onClick={() => onClose(notification.id)}
          className="ml-4 flex-shrink-0 inline-flex text-neutral-400 hover:text-neutral-500 focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      {notification.autoClose && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-700">
          <motion.div
            className={clsx('h-full', typeStyles[notification.type].progress)}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default NotificationToast;