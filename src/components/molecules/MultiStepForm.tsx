import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import Button from '../atoms/Button';
import { clsx } from 'clsx';

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  component: React.ReactNode;
  validation?: () => boolean;
  optional?: boolean;
}

interface MultiStepFormProps {
  steps: FormStep[];
  onComplete?: (data: any) => void;
  onStepChange?: (currentStep: number, direction: 'next' | 'prev') => void;
  className?: string;
  showProgress?: boolean;
  allowSkip?: boolean;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  onComplete,
  onStepChange,
  className,
  showProgress = true,
  allowSkip = false
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState<any>({});

  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
    }
  }, [steps.length]);

  const goNext = useCallback(() => {
    const currentStepData = steps[currentStep];
    
    // Validate current step
    if (currentStepData.validation && !currentStepData.validation()) {
      return;
    }

    // Mark step as completed
    setCompletedSteps(prev => new Set([...prev, currentStep]));

    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep, 'next');
    } else {
      // Form completed
      onComplete?.(formData);
    }
  }, [currentStep, steps, formData, onComplete, onStepChange]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep, 'prev');
    }
  }, [currentStep, onStepChange]);

  const skipStep = useCallback(() => {
    if (allowSkip && steps[currentStep].optional) {
      goNext();
    }
  }, [allowSkip, currentStep, steps, goNext]);

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className={clsx('max-w-4xl mx-auto', className)}>
      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {steps[currentStep].title}
            </h2>
            <span className="text-sm text-neutral-500">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          
          {steps[currentStep].description && (
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              {steps[currentStep].description}
            </p>
          )}

          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => goToStep(index)}
                  disabled={index > currentStep && !completedSteps.has(index)}
                  className={clsx(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200',
                    index === currentStep
                      ? 'bg-red-600 text-white shadow-lg scale-110'
                      : completedSteps.has(index)
                      ? 'bg-green-500 text-white'
                      : index < currentStep
                      ? 'bg-neutral-300 text-neutral-600 hover:bg-neutral-400'
                      : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  )}
                >
                  {completedSteps.has(index) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </button>
                
                {index < steps.length - 1 && (
                  <div className={clsx(
                    'w-16 h-1 mx-2 rounded-full transition-colors duration-300',
                    index < currentStep ? 'bg-green-500' : 'bg-neutral-200'
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-neutral-200 rounded-full h-2 mb-6">
            <motion.div
              className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="relative min-h-[400px] mb-8">
        <AnimatePresence mode="wait" custom={1}>
          <motion.div
            key={currentStep}
            custom={1}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0"
          >
            {steps[currentStep].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={currentStep === 0}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
        >
          Previous
        </Button>

        <div className="flex items-center space-x-3">
          {allowSkip && steps[currentStep].optional && (
            <Button
              variant="ghost"
              onClick={skipStep}
              className="text-neutral-500"
            >
              Skip this step
            </Button>
          )}

          <Button
            variant="primary"
            onClick={goNext}
            rightIcon={
              currentStep === steps.length - 1 ? 
                <Check className="w-4 h-4" /> : 
                <ChevronRight className="w-4 h-4" />
            }
            className="bg-red-600 hover:bg-red-700"
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;