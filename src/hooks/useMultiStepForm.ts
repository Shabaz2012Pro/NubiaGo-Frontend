import { useState, useCallback } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface FormStep<TFormValues extends FieldValues = FieldValues> {
  id: string;
  title: string;
  description?: string;
  fields: (keyof TFormValues)[];
  validationFn?: (data: TFormValues) => boolean;
  component: React.ReactNode;
}

interface UseMultiStepFormOptions<TFormValues extends FieldValues> {
  steps: FormStep<TFormValues>[];
  form: UseFormReturn<TFormValues>;
  onComplete?: (data: TFormValues) => void;
  onStepChange?: (currentStep: number, direction: 'next' | 'prev') => void;
  allowSkipToStep?: boolean;
}

function useMultiStepForm<TFormValues extends FieldValues>({
  steps,
  form,
  onComplete,
  onStepChange,
  allowSkipToStep = false,
}: UseMultiStepFormOptions<TFormValues>) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  // Validate current step
  const validateStep = useCallback(async (): Promise<boolean> => {
    // Get fields for current step
    const stepFields = steps[currentStepIndex].fields;
    
    // Trigger validation only for fields in current step
    const result = await form.trigger(stepFields as any);
    
    // If step has custom validation function, run it
    if (result && steps[currentStepIndex].validationFn) {
      return steps[currentStepIndex].validationFn(form.getValues());
    }
    
    return result;
  }, [currentStepIndex, form, steps]);

  // Go to next step
  const nextStep = useCallback(async () => {
    const isValid = await validateStep();
    
    if (!isValid) return false;
    
    if (currentStepIndex < steps.length - 1) {
      // Mark current step as completed
      setCompletedSteps(prev => new Set([...prev, currentStepIndex]));
      
      // Move to next step
      setCurrentStepIndex(prev => prev + 1);
      onStepChange?.(currentStepIndex + 1, 'next');
      
      return true;
    } else if (isLastStep) {
      // Final step - submit the form
      setIsSubmitting(true);
      
      try {
        // Mark last step as completed
        setCompletedSteps(prev => new Set([...prev, currentStepIndex]));
        
        // Call onComplete with form data
        onComplete?.(form.getValues());
        
        return true;
      } finally {
        setIsSubmitting(false);
      }
    }
    
    return false;
  }, [currentStepIndex, form, isLastStep, onComplete, onStepChange, steps.length, validateStep]);

  // Go to previous step
  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      onStepChange?.(currentStepIndex - 1, 'prev');
      return true;
    }
    return false;
  }, [currentStepIndex, onStepChange]);

  // Go to specific step (if allowed)
  const goToStep = useCallback((stepIndex: number) => {
    if (
      stepIndex >= 0 && 
      stepIndex < steps.length && 
      (allowSkipToStep || completedSteps.has(stepIndex) || stepIndex <= currentStepIndex)
    ) {
      setCurrentStepIndex(stepIndex);
      onStepChange?.(stepIndex, stepIndex < currentStepIndex ? 'prev' : 'next');
      return true;
    }
    return false;
  }, [allowSkipToStep, completedSteps, currentStepIndex, onStepChange, steps.length]);

  return {
    currentStep,
    currentStepIndex,
    steps,
    isFirstStep,
    isLastStep,
    isSubmitting,
    progress,
    completedSteps: Array.from(completedSteps),
    nextStep,
    prevStep,
    goToStep,
    validateStep,
  };
}

export default useMultiStepForm;