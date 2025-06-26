import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface HeartProps {
  filled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const Heart: React.FC<HeartProps> = ({
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
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </motion.svg>
  );
};

export default Heart;