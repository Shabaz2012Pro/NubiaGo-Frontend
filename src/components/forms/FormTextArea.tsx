import React, { forwardRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextArea from '../atoms/TextArea';
import { clsx } from 'clsx';

interface FormTextAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  className?: string;
  helperText?: string;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  rows = 4,
  maxLength,
  className,
  helperText,
}, ref) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={clsx('w-full', className)}>
          <TextArea
            {...field}
            ref={ref}
            label={label}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={rows}
            maxLength={maxLength}
            status={error ? 'error' : 'default'}
            helperText={error || helperText}
          />
        </div>
      )}
    />
  );
});

FormTextArea.displayName = 'FormTextArea';

export default FormTextArea;