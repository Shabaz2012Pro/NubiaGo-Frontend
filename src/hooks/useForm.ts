import { useState, useEffect } from 'react';
import { useForm as useReactHookForm, UseFormProps, UseFormReturn, FieldValues, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUIStore } from '../store/useUIStore';

interface UseFormOptions<TFormValues extends FieldValues> extends UseFormProps<TFormValues> {
  schema?: z.ZodType<any, any>;
  onSubmit?: SubmitHandler<TFormValues>;
  onError?: SubmitErrorHandler<TFormValues>;
  persistKey?: string;
  clearOnSubmit?: boolean;
}

/**
 * Enhanced form hook that combines react-hook-form with zod validation,
 * persistence, and error handling
 */
function useForm<TFormValues extends FieldValues = FieldValues>({
  schema,
  onSubmit,
  onError,
  persistKey,
  clearOnSubmit = false,
  ...formOptions
}: UseFormOptions<TFormValues>): UseFormReturn<TFormValues> & {
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  resetSubmitState: () => void;
} {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { addNotification } = useUIStore();

  // Initialize form with react-hook-form
  const formMethods = useReactHookForm<TFormValues>({
    ...formOptions,
    resolver: schema ? zodResolver(schema) : undefined,
  });

  // Load persisted form data - always call useEffect
  useEffect(() => {
    if (!persistKey) return;

    const persistedData = localStorage.getItem(`form_${persistKey}`);
    if (persistedData) {
      try {
        const parsedData = JSON.parse(persistedData);
        formMethods.reset(parsedData);
      } catch (error) {
        console.error('Failed to parse persisted form data:', error);
      }
    }
  }, [persistKey, formMethods]);

  // Save form data to localStorage when values change - always call useEffect
  useEffect(() => {
    if (!persistKey) return;

    const subscription = formMethods.watch((value) => {
      localStorage.setItem(`form_${persistKey}`, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [persistKey, formMethods]);

  // Enhanced submit handler
  const handleSubmit = async (e?: React.BaseSyntheticEvent) => {
    if (e) {
      e.preventDefault();
    }

    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {
      await formMethods.handleSubmit(async (data) => {
        if (onSubmit) {
          await onSubmit(data);
        }

        setSubmitSuccess(true);

        if (clearOnSubmit) {
          formMethods.reset();
          if (persistKey) {
            localStorage.removeItem(`form_${persistKey}`);
          }
        }

        // Show success notification
        addNotification({
          type: 'success',
          message: 'Form submitted successfully',
          autoClose: true,
        });
      }, (errors) => {
        if (onError) {
          onError(errors);
        }

        // Show error notification
        addNotification({
          type: 'error',
          message: 'Please fix the errors in the form',
          autoClose: true,
        });

        setSubmitError('Please fix the errors in the form');
      })(e);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setSubmitError(errorMessage);

      // Show error notification
      addNotification({
        type: 'error',
        message: errorMessage,
        autoClose: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSubmitState = () => {
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  return {
    ...formMethods,
    isSubmitting,
    submitError,
    submitSuccess,
    handleSubmit,
    resetSubmitState,
  };
}

export default useForm;