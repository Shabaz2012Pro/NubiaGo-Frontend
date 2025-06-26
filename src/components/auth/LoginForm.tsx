import React from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FormProvider, FormInput, FormCheckbox, FormSubmitButton, FormError, FormPasswordInput } from '../forms';
import Button from '../atoms/Button';
import useForm from '../../hooks/useForm';
import { validationSchemas } from '../../utils/validation';
import { useLogin } from '../../api/queries/useAuthQueries';

interface LoginFormProps {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onForgotPassword,
  onRegister,
  className,
}) => {
  // Use login mutation - always called at top level
  const { mutate: login, isPending } = useLogin();
  
  // Initialize form with validation schema - always called at top level  
  const form = useForm({
    schema: validationSchemas.login,
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: async (data) => {
      try {
        return new Promise((resolve, reject) => {
          login({ 
            email: data.email, 
            password: data.password 
          }, {
            onSuccess: () => {
              console.log('Login successful');
              onSuccess?.();
              resolve(undefined);
            },
            onError: (error) => {
              console.error('Login error:', error);
              reject(error);
            }
          });
        });
      } catch (error) {
        console.error('Login submission error:', error);
        throw error;
      }
    },
  });

  return (
    <FormProvider form={form} className={className}>
      <div className="space-y-4">
        <FormInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          leftIcon={<Mail className="w-4 h-4" />}
          required
          autoComplete="email"
        />
        
        <FormPasswordInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          required
          autoComplete="current-password"
        />
        
        <div className="flex items-center justify-between">
          <FormCheckbox
            name="rememberMe"
            label="Remember me"
          />
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onForgotPassword}
            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Forgot password?
          </Button>
        </div>
        
        {form.submitError && (
          <FormError error={form.submitError} />
        )}
        
        <FormSubmitButton
          variant="primary"
          size="lg"
          fullWidth
          className="bg-red-600 hover:bg-red-700"
        >
          Sign In
        </FormSubmitButton>
        
        <div className="text-center mt-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onRegister}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </FormProvider>
  );
};

export default LoginForm;