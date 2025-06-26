import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { CardProps } from '../../types';
import { clsx } from 'clsx';

const Card = forwardRef<HTMLDivElement, CardProps>(({
  variant = 'default',
  padding = 'md',
  hover = false,
  interactive = false,
  selected = false,
  loading = false,
  className,
  children,
  ...props
}, ref) => {
  const baseStyles = 'rounded-xl transition-all duration-300 relative overflow-hidden';
  
  const variantStyles = {
    default: 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm',
    premium: 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-premium',
    gold: 'bg-gradient-to-br from-gold-50 to-gold-100 dark:from-gold-900/20 dark:to-gold-800/20 border border-gold-200 dark:border-gold-700/50 shadow-gold',
    outlined: 'bg-transparent border-2 border-neutral-200 dark:border-neutral-700',
    elevated: 'bg-white dark:bg-neutral-800 shadow-xl border-0',
  };
  
  const paddingStyles = {
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };
  
  const cardVariants = {
    initial: { 
      scale: 1,
      y: 0,
      boxShadow: variant === 'elevated' ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : undefined
    },
    hover: { 
      scale: hover ? 1.02 : 1,
      y: hover ? -4 : 0,
      boxShadow: hover ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : undefined,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    tap: interactive ? { 
      scale: 0.98,
      transition: { duration: 0.1 }
    } : {},
  };

  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { 
      x: '100%',
      transition: { 
        duration: 1.5, 
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        paddingStyles[padding],
        interactive && 'cursor-pointer',
        selected && 'ring-2 ring-primary-500 ring-offset-2',
        className
      )}
      variants={cardVariants}
      initial="initial"
      whileHover={(hover || interactive) ? "hover" : undefined}
      whileTap={interactive ? "tap" : undefined}
      {...props}
    >
      {loading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
        />
      )}
      
      {selected && (
        <motion.div
          className="absolute inset-0 bg-primary-500/5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      <div className={clsx('relative', loading && 'opacity-50')}>
        {children}
      </div>
    </motion.div>
  );
});

Card.displayName = 'Card';

export { Card };
export default Card;