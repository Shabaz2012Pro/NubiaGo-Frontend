import React, { forwardRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Checkbox from '../atoms/Checkbox';
import { clsx } from 'clsx';

interface FormCheckboxProps {
  name: string;
  label?: string | React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  helperText?: string;
}

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(({
  name,
  label,
  required = false,
  disabled = false,
  className,
  helperText,
}, ref) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref: fieldRef } }) => (
        <div className={clsx('w-full', className)}>
          <Checkbox
            ref={fieldRef}
            label={label}
            checked={!!value}
            onChange={onChange}
            disabled={disabled}
            error={error}
          />
          {!error && helperText && (
            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
              {helperText}
            </p>
          )}
        </div>
      )}
    />
  );
});

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;