import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { clsx } from 'clsx';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  error,
  size = 'md',
  className,
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const handleChange = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  return (
    <div className={clsx('flex flex-col', className)}>
      <label className={clsx(
        'flex items-center cursor-pointer',
        disabled && 'cursor-not-allowed opacity-50'
      )}>
        <div className="relative">
          <motion.div
            className={clsx(
              'border-2 rounded transition-all duration-200 flex items-center justify-center',
              sizeStyles[size],
              checked || indeterminate
                ? 'bg-primary-600 border-primary-600'
                : error
                ? 'border-red-500 bg-white dark:bg-neutral-800'
                : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 hover:border-primary-400'
            )}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            onClick={handleChange}
          >
            <AnimatePresence>
              {checked && !indeterminate && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className={clsx(iconSizes[size], 'text-white')} />
                </motion.div>
              )}
              {indeterminate && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Minus className={clsx(iconSizes[size], 'text-white')} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only"
          />
        </div>
        
        {label && (
          <span className={clsx(
            'ml-3 text-sm font-medium',
            error
              ? 'text-red-700 dark:text-red-400'
              : 'text-neutral-700 dark:text-neutral-300'
          )}>
            {label}
          </span>
        )}
      </label>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default Checkbox;