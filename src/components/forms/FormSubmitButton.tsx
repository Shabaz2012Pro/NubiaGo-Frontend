import React from 'react';
import { useFormContext } from 'react-hook-form';
import Button, { ButtonProps } from '../atoms/Button';

interface FormSubmitButtonProps extends Omit<ButtonProps, 'type'> {
  loadingText?: string;
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  children,
  loadingText = 'Submitting...',
  disabled,
  loading,
  ...props
}) => {
  const { formState: { isSubmitting, isValid, isDirty } } = useFormContext();
  
  // Use the form's isSubmitting state if loading prop is not provided
  const isLoading = loading !== undefined ? loading : isSubmitting;
  
  // Disable button if form is invalid, not dirty, or explicitly disabled
  const isDisabled = disabled || (!isValid && isDirty);

  return (
    <Button
      type="submit"
      disabled={isDisabled || isLoading}
      loading={isLoading}
      {...props}
    >
      {isLoading ? loadingText : children}
    </Button>
  );
};

export default FormSubmitButton;