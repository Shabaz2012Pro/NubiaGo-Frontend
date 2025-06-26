import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ButtonProps } from '../../types';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  ariaLabel?: string;
  tooltip?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  fullWidth = false,
  iconOnly = false,
  className,
  children,
  ariaLabel,
  tooltip,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';

  const variantStyles = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 shadow-md hover:shadow-lg active:bg-primary-800',
    secondary: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 focus:ring-neutral-500 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-100 shadow-sm hover:shadow-md',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500 hover:shadow-md',
    ghost: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:ring-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
    gold: 'bg-gold-500 hover:bg-gold-600 text-white focus:ring-gold-500 shadow-md hover:shadow-lg active:bg-gold-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-md hover:shadow-lg active:bg-red-800',
  };

  const sizeStyles = {
    xs: iconOnly ? 'p-1.5' : 'px-2.5 py-1.5 text-xs',
    sm: iconOnly ? 'p-2' : 'px-3 py-2 text-sm',
    md: iconOnly ? 'p-2.5' : 'px-4 py-2.5 text-sm',
    lg: iconOnly ? 'p-3' : 'px-6 py-3 text-base',
    xl: iconOnly ? 'p-4' : 'px-8 py-4 text-lg',
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2, ease: 'easeInOut' }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    },
  };

  const rippleVariants = {
    initial: { scale: 0, opacity: 0.5 },
    animate: { 
      scale: 4, 
      opacity: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    onClick?.(e);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      onClick={handleClick}
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled && !loading ? "hover" : undefined}
      whileTap={!disabled && !loading ? "tap" : undefined}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-disabled={disabled || loading}
      title={tooltip}
      {...props}
    >
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Loader2 className={clsx(iconSizes[size], 'animate-spin')} />
        </motion.div>
      )}

      <motion.div
        className={clsx(
          'flex items-center justify-center',
          loading && 'opacity-0'
        )}
        initial={{ opacity: 1 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {leftIcon && !iconOnly && (
          <span className={clsx('mr-2', iconSizes[size])}>
            {leftIcon}
          </span>
        )}
        {iconOnly ? (leftIcon || rightIcon) : children}
        {rightIcon && !iconOnly && (
          <span className={clsx('ml-2', iconSizes[size])}>
            {rightIcon}
          </span>
        )}
      </motion.div>
    </motion.button>
  );
});

Button.displayName = 'Button';

export { Button };
export default Button;