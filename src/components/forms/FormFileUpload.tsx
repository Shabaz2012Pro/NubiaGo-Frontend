import React, { forwardRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import FileUpload from '../atoms/FileUpload';
import { clsx } from 'clsx';

interface FormFileUploadProps {
  name: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  helperText?: string;
}

const FormFileUpload = forwardRef<HTMLDivElement, FormFileUploadProps>(({
  name,
  label,
  accept,
  multiple = false,
  maxSize = 5,
  maxFiles = 5,
  required = false,
  disabled = false,
  className,
  helperText,
}, ref) => {
  const { control, formState: { errors }, setValue } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={clsx('w-full', className)} ref={ref}>
          <FileUpload
            label={label}
            accept={accept}
            multiple={multiple}
            maxSize={maxSize}
            maxFiles={maxFiles}
            required={required}
            disabled={disabled}
            error={error}
            onFilesChange={(files) => {
              field.onChange(multiple ? files : files[0]);
            }}
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

FormFileUpload.displayName = 'FormFileUpload';

export default FormFileUpload;