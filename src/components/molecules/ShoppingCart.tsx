import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ShoppingCartProps {
  filled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  filled = false,
  size = 'md',
  onClick,
  className
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const variants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
    fill: { scale: [1, 1.3, 1], transition: { duration: 0.3 } }
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx(
        sizeClasses[size],
        filled ? 'text-red-500' : 'text-neutral-600 dark:text-neutral-400',
        'cursor-pointer',
        className
      )}
      onClick={onClick}
      variants={variants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      animate={filled ? 'fill' : 'initial'}
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </motion.svg>
  );
};

export default ShoppingCart;