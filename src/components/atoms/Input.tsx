import React from 'react';
import { InputProps } from '../../types';
import { clsx } from 'clsx';

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  status = 'default',
  helperText,
  required = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  const baseStyles = 'block w-full px-3 py-2.5 text-sm border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
  
  const statusStyles = {
    default: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100',
    success: 'border-success-500 focus:border-success-500 focus:ring-success-500',
    warning: 'border-warning-500 focus:border-warning-500 focus:ring-warning-500',
    error: 'border-error-500 focus:border-error-500 focus:ring-error-500',
  };

  const helperTextStyles = {
    default: 'text-neutral-500',
    success: 'text-success-600',
    warning: 'text-warning-600',
    error: 'text-error-600',
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            {leftIcon}
          </div>
        )}
        <input
          className={clsx(
            baseStyles,
            statusStyles[status],
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            disabled && 'opacity-50 cursor-not-allowed bg-neutral-50 dark:bg-neutral-900'
          )}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
            {rightIcon}
          </div>
        )}
      </div>
      {helperText && (
        <p className={clsx('mt-2 text-xs', helperTextStyles[status])}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;