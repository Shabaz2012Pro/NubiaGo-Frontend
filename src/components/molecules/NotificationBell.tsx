import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import Badge from '../atoms/Badge';
import NotificationCenter from './NotificationCenter';
import { clsx } from 'clsx';

interface NotificationBellProps {
  count?: number;
  onClick?: () => void;
  className?: string;
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  count = 0,
  onClick,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick();
  };

  const bellVariants = {
    initial: { rotate: 0 },
    ring: {
      rotate: [0, 15, -15, 10, -10, 5, -5, 0],
      transition: { duration: 0.6, ease: 'easeInOut' }
    }
  };

  const badgeVariants = {
    initial: { scale: 0 },
    animate: { scale: 1, transition: { type: 'spring', stiffness: 500, damping: 15 } },
    exit: { scale: 0, transition: { duration: 0.2 } }
  };

  return (
    <>
      <motion.button
        className={clsx(
          'relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors',
          className
        )}
        onClick={toggleNotifications}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={bellVariants}
        animate={count > 0 ? 'ring' : 'initial'}
      >
        <Bell className="w-6 h-6" />
        
        <AnimatePresence>
          {count > 0 && (
            <motion.div
              className="absolute -top-1 -right-1"
              variants={badgeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Badge variant="error" size="sm" className="w-5 h-5 p-0 flex items-center justify-center">
                {count > 9 ? '9+' : count}
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <NotificationCenter 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
};

export default NotificationBell;