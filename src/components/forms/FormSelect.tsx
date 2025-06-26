import React, { forwardRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select, { SelectOption } from '../atoms/Select';
import { clsx } from 'clsx';

interface FormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
  helperText?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(({
  name,
  label,
  placeholder,
  options,
  required = false,
  disabled = false,
  searchable = false,
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
          <Select
            ref={fieldRef}
            label={label}
            placeholder={placeholder}
            options={options}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            searchable={searchable}
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

FormSelect.displayName = 'FormSelect';

export default FormSelect;