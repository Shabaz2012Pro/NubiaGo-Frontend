import React from 'react';
import { FormProvider, FormSubmitButton, FormError, FormPasswordInput } from '../forms';
import useForm from '../../hooks/useForm';
import { validationSchemas } from '../../utils/validation';
import { useResetPassword } from '../../api/queries/useAuthQueries';

interface ResetPasswordFormProps {
  token: string;
  onSuccess?: () => void;
  className?: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  token,
  onSuccess,
  className,
}) => {
  // Use reset password mutation
  const { mutate: resetPassword, isPending } = useResetPassword();
  
  // Initialize form with validation schema
  const form = useForm({
    schema: validationSchemas.resetPassword,
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (data) => {
      await resetPassword({
        token,
        newPassword: data.password
      }, {
        onSuccess: () => {
          onSuccess?.();
        }
      });
    },
  });

  return (
    <FormProvider form={form} className={className}>
      <div className="space-y-4">
        <FormPasswordInput
          name="password"
          label="New Password"
          placeholder="Enter new password"
          required
          autoComplete="new-password"
          showStrengthMeter
        />
        
        <FormPasswordInput
          name="confirmPassword"
          label="Confirm New Password"
          placeholder="Confirm new password"
          required
          autoComplete="new-password"
        />
        
        {form.submitError && (
          <FormError error={form.submitError} />
        )}
        
        <FormSubmitButton
          variant="primary"
          size="lg"
          fullWidth
          className="bg-red-600 hover:bg-red-700"
        >
          Reset Password
        </FormSubmitButton>
      </div>
    </FormProvider>
  );
};

export default ResetPasswordForm;