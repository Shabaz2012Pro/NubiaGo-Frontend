import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationToast from './NotificationToast';
import { useNotificationStore } from '../../store/useNotificationStore';
import { clsx } from 'clsx';

interface NotificationsProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  className?: string;
}

const Notifications: React.FC<NotificationsProps> = ({
  position = 'top-right',
  className
}) => {
  const { toasts, removeToast } = useNotificationStore();

  // Position styles
  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  };

  return (
    <div className={clsx(
      'fixed z-50 w-full max-w-sm',
      positionStyles[position],
      className
    )}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <NotificationToast
            key={toast.id}
            notification={toast}
            onClose={removeToast}
            position={position}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;