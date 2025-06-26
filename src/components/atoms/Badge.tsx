import React from 'react';
import { ComponentProps } from '../../types';
import { clsx } from 'clsx';

interface BadgeProps extends ComponentProps {
  variant?: 'default' | 'primary' | 'gold' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';
  
  const variantStyles = {
    default: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200',
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-200',
    gold: 'bg-gold-100 text-gold-800 dark:bg-gold-900/50 dark:text-gold-200',
    success: 'bg-success-100 text-success-800 dark:bg-success-900/50 dark:text-success-200',
    warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900/50 dark:text-warning-200',
    error: 'bg-error-100 text-error-800 dark:bg-error-900/50 dark:text-error-200',
  };
  
  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-base',
  };

  return (
    <span
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
export { Badge };