import React, { forwardRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Input from '../atoms/Input';
import { clsx } from 'clsx';

interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  helperText?: string;
  autoComplete?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  name,
  label,
  placeholder,
  type = 'text',
  required = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  helperText,
  autoComplete,
}, ref) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={clsx('w-full', className)}>
          <Input
            {...field}
            ref={ref}
            type={type}
            label={label}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            status={error ? 'error' : 'default'}
            helperText={error || helperText}
            autoComplete={autoComplete}
          />
        </div>
      )}
    />
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;