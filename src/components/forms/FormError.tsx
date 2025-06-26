import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface FormErrorProps {
  name?: string;
  error?: string;
  className?: string;
}

const FormError: React.FC<FormErrorProps> = ({ 
  name, 
  error: propError,
  className 
}) => {
  const { formState: { errors } } = useFormContext();
  
  // Use provided error or get from form context
  const error = propError || (name ? errors[name]?.message as string : undefined);
  
  if (!error) return null;
  
  return (
    <div className={clsx(
      'flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm mt-1',
      className
    )}>
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span>{error}</span>
    </div>
  );
};

export default FormError;