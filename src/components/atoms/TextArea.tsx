import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  status?: 'default' | 'success' | 'warning' | 'error';
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  placeholder,
  value,
  onChange,
  status = 'default',
  helperText,
  required = false,
  disabled = false,
  rows = 4,
  maxLength,
  resize = 'vertical',
  className,
  ...props
}, ref) => {
  const baseStyles = 'block w-full px-4 py-3 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
  
  const statusStyles = {
    default: 'border-neutral-300 focus:border-red-500 focus:ring-red-500/20 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20 bg-green-50 dark:bg-green-900/20',
    warning: 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500/20 bg-yellow-50 dark:bg-yellow-900/20',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50 dark:bg-red-900/20',
  };

  const helperTextStyles = {
    default: 'text-neutral-500',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
  };

  const resizeStyles = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <motion.textarea
          ref={ref}
          className={clsx(
            baseStyles,
            statusStyles[status],
            resizeStyles[resize],
            disabled && 'opacity-50 cursor-not-allowed bg-neutral-50 dark:bg-neutral-900'
          )}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          {...props}
        />
        
        {maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-neutral-400">
            {value?.length || 0}/{maxLength}
          </div>
        )}
      </div>
      
      {helperText && (
        <motion.p 
          className={clsx('mt-2 text-xs', helperTextStyles[status])}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {helperText}
        </motion.p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;