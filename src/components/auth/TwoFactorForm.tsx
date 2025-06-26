import React, { useRef, useEffect } from 'react';
import { FormProvider, FormSubmitButton, FormError } from '../forms';
import useForm from '../../hooks/useForm';
import { z } from 'zod';
import { useUIStore } from '../../store/useUIStore';

interface TwoFactorFormProps {
  onVerify?: (code: string) => void;
  onCancel?: () => void;
  className?: string;
}

// Validation schema for OTP code
const twoFactorSchema = z.object({
  code: z.string().length(6, { message: 'Code must be 6 digits' }).regex(/^\d+$/, { message: 'Code must contain only digits' }),
});

const TwoFactorForm: React.FC<TwoFactorFormProps> = ({
  onVerify,
  onCancel,
  className,
}) => {
  // Create refs for each input
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  
  const { addNotification } = useUIStore();
  
  // Initialize form
  const form = useForm({
    schema: twoFactorSchema,
    defaultValues: {
      code: '',
    },
    onSubmit: async (data) => {
      onVerify?.(data.code);
    },
  });
  
  // Focus first input on mount
  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);
  
  // Handle input change
  const handleChange = (index: number, value: string) => {
    // Get current code value
    const currentCode = form.getValues().code || '';
    
    // Create new code by replacing the digit at the current index
    const newCode = currentCode.padEnd(6, ' ').split('');
    newCode[index] = value.slice(-1) || ' ';
    
    // Update form value
    form.setValue('code', newCode.join('').trim(), { shouldValidate: true });
    
    // Move focus to next input if value is entered
    if (value && index < 5 && inputRefs[index + 1].current) {
      inputRefs[index + 1].current?.focus();
    }
  };
  
  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Check if pasted data is a valid 6-digit code
    if (/^\d{6}$/.test(pastedData)) {
      form.setValue('code', pastedData, { shouldValidate: true });
      
      // Set values for each input
      pastedData.split('').forEach((digit, index) => {
        if (inputRefs[index].current) {
          inputRefs[index].current!.value = digit;
        }
      });
      
      // Focus last input
      inputRefs[5].current?.focus();
    } else {
      addNotification({
        type: 'error',
        message: 'Please paste a valid 6-digit code',
        autoClose: true,
      });
    }
  };
  
  // Handle key down
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !e.currentTarget.getAttribute('value') && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <FormProvider form={form} className={className}>
      <div className="space-y-6">
        {/* OTP Inputs */}
        <div className="flex justify-center space-x-2 my-8">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={form.watch('code')?.[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-14 text-center text-xl font-bold border border-neutral-300 dark:border-neutral-600 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none bg-white dark:bg-neutral-800"
            />
          ))}
        </div>
        
        {form.submitError && (
          <FormError error={form.submitError} />
        )}
        
        <FormSubmitButton
          variant="primary"
          size="lg"
          fullWidth
          className="bg-red-600 hover:bg-red-700"
          disabled={form.watch('code')?.length !== 6}
        >
          Verify
        </FormSubmitButton>
        
        <div className="text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            Didn't receive a code?
          </p>
          <button
            type="button"
            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
          >
            Resend Code
          </button>
        </div>
      </div>
    </FormProvider>
  );
};

export default TwoFactorForm;