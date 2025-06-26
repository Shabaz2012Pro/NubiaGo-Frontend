import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { clsx } from 'clsx';

export interface ValidationRule {
  test: (value: any) => boolean;
  message: string;
  type?: 'error' | 'warning' | 'info';
}

export interface FieldValidation {
  value: any;
  rules: ValidationRule[];
  required?: boolean;
  touched?: boolean;
}

interface FormValidationProps {
  fields: Record<string, FieldValidation>;
  onValidationChange?: (isValid: boolean, errors: Record<string, string[]>) => void;
  showSummary?: boolean;
  className?: string;
}

const FormValidation: React.FC<FormValidationProps> = ({
  fields,
  onValidationChange,
  showSummary = false,
  className
}) => {
  const [validationResults, setValidationResults] = useState<Record<string, { isValid: boolean; messages: Array<{ message: string; type: string }> }>>({});

  useEffect(() => {
    const results: Record<string, { isValid: boolean; messages: Array<{ message: string; type: string }> }> = {};
    let isFormValid = true;
    const formErrors: Record<string, string[]> = {};

    Object.entries(fields).forEach(([fieldName, field]) => {
      const messages: Array<{ message: string; type: string }> = [];
      let isFieldValid = true;

      // Check required
      if (field.required && (!field.value || (typeof field.value === 'string' && field.value.trim() === ''))) {
        messages.push({ message: 'This field is required', type: 'error' });
        isFieldValid = false;
      }

      // Check rules
      if (field.value) {
        field.rules.forEach(rule => {
          if (!rule.test(field.value)) {
            messages.push({ message: rule.message, type: rule.type || 'error' });
            if (rule.type !== 'warning' && rule.type !== 'info') {
              isFieldValid = false;
            }
          }
        });
      }

      results[fieldName] = { isValid: isFieldValid, messages };
      
      if (!isFieldValid) {
        isFormValid = false;
        formErrors[fieldName] = messages.filter(m => m.type === 'error').map(m => m.message);
      }
    });

    setValidationResults(results);
    onValidationChange?.(isFormValid, formErrors);
  }, [fields, onValidationChange]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <Info className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
      default: return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
    }
  };

  if (!showSummary) return null;

  const hasErrors = Object.values(validationResults).some(result => 
    result.messages.some(msg => msg.type === 'error')
  );

  const hasWarnings = Object.values(validationResults).some(result => 
    result.messages.some(msg => msg.type === 'warning')
  );

  return (
    <div className={clsx('space-y-4', className)}>
      <AnimatePresence>
        {Object.entries(validationResults).map(([fieldName, result]) => (
          result.messages.length > 0 && (
            <motion.div
              key={fieldName}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              {result.messages.map((msg, index) => (
                <div
                  key={index}
                  className={clsx(
                    'flex items-center space-x-2 p-3 rounded-lg border text-sm',
                    getColorClasses(msg.type)
                  )}
                >
                  {getIcon(msg.type)}
                  <span className="font-medium capitalize">{fieldName}:</span>
                  <span>{msg.message}</span>
                </div>
              ))}
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Summary */}
      {(hasErrors || hasWarnings) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={clsx(
            'p-4 rounded-lg border',
            hasErrors 
              ? 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'
              : 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200'
          )}
        >
          <div className="flex items-center space-x-2">
            {hasErrors ? <AlertCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            <span className="font-medium">
              {hasErrors ? 'Please fix the errors above' : 'Please review the warnings above'}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FormValidation;