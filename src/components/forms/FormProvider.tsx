import React from 'react';
import { FormProvider as RHFFormProvider, UseFormReturn, FieldValues } from 'react-hook-form';

interface FormProviderProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  children: React.ReactNode;
  onSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void>;
  className?: string;
}

function FormProvider<TFormValues extends FieldValues>({
  form,
  children,
  onSubmit,
  className,
}: FormProviderProps<TFormValues>) {
  return (
    <RHFFormProvider {...form}>
      <form 
        onSubmit={onSubmit || form.handleSubmit(() => {})} 
        className={className}
        noValidate
      >
        {children}
      </form>
    </RHFFormProvider>
  );
}

export default FormProvider;