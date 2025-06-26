import React, { forwardRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import RadioGroup, { RadioOption } from '../atoms/RadioGroup';
import { clsx } from 'clsx';

interface FormRadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  required?: boolean;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  helperText?: string;
}

const FormRadioGroup = forwardRef<HTMLDivElement, FormRadioGroupProps>(({
  name,
  label,
  options,
  required = false,
  disabled = false,
  orientation = 'vertical',
  className,
  helperText,
}, ref) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className={clsx('w-full', className)} ref={ref}>
          <RadioGroup
            label={label}
            options={options}
            value={value}
            onChange={onChange}
            orientation={orientation}
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

FormRadioGroup.displayName = 'FormRadioGroup';

export default FormRadioGroup;