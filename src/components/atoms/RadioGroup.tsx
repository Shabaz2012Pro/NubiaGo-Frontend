import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  error,
  orientation = 'vertical',
  size = 'md',
  className,
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  return (
    <div className={clsx('flex flex-col', className)}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
          {label}
        </label>
      )}
      
      <div className={clsx(
        'flex',
        orientation === 'horizontal' ? 'flex-row space-x-6' : 'flex-col space-y-3'
      )}>
        {options.map((option) => (
          <label
            key={option.value}
            className={clsx(
              'flex items-start cursor-pointer',
              (disabled || option.disabled) && 'cursor-not-allowed opacity-50'
            )}
          >
            <div className="relative flex items-center">
              <motion.div
                className={clsx(
                  'border-2 rounded-full transition-all duration-200 flex items-center justify-center',
                  sizeStyles[size],
                  value === option.value
                    ? 'bg-primary-600 border-primary-600'
                    : error
                    ? 'border-red-500 bg-white dark:bg-neutral-800'
                    : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 hover:border-primary-400'
                )}
                whileHover={!disabled && !option.disabled ? { scale: 1.05 } : {}}
                whileTap={!disabled && !option.disabled ? { scale: 0.95 } : {}}
                onClick={() => {
                  if (!disabled && !option.disabled) {
                    onChange?.(option.value);
                  }
                }}
              >
                {value === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={clsx(
                      'bg-white rounded-full',
                      dotSizes[size]
                    )}
                  />
                )}
              </motion.div>
              
              <input
                type="radio"
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange?.(option.value)}
                disabled={disabled || option.disabled}
                className="sr-only"
              />
            </div>
            
            <div className="ml-3">
              <span className={clsx(
                'text-sm font-medium',
                error
                  ? 'text-red-700 dark:text-red-400'
                  : 'text-neutral-700 dark:text-neutral-300'
              )}>
                {option.label}
              </span>
              {option.description && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {option.description}
                </p>
              )}
            </div>
          </label>
        ))}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default RadioGroup;