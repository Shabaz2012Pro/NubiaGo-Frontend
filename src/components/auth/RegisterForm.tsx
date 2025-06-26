import React from 'react';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { FormProvider, FormInput, FormCheckbox, FormSubmitButton, FormError, FormPasswordInput } from '../forms';
import useForm from '../../hooks/useForm';
import { validationSchemas } from '../../utils/validation';
import { useRegister } from '../../api/queries/useAuthQueries';
import { useUIStore } from '../../store/useUIStore';

interface RegisterFormProps {
  onSuccess?: () => void;
  onLogin?: () => void;
  className?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onLogin,
  className,
}) => {
  // Use register mutation
  const { mutate: register, isPending } = useRegister();
  const { addNotification } = useUIStore();

  // Initialize form with validation schema
  const form = useForm({
    schema: validationSchemas.registration,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
    onSubmit: async (data) => {
      console.log('Starting registration with data:', { email: data.email, firstName: data.firstName, lastName: data.lastName });
      
      // Validate terms agreement
      if (!data.agreeTerms) {
        addNotification({
          type: 'error',
          message: 'Please agree to the Terms of Service and Privacy Policy.',
          autoClose: true,
        });
        return;
      }
      
      // Validate password confirmation
      if (data.password !== data.confirmPassword) {
        addNotification({
          type: 'error',
          message: 'Passwords do not match.',
          autoClose: true,
        });
        return;
      }
      
      try {
        await register({
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        }, {
          onSuccess: () => {
            console.log('Registration successful');
            addNotification({
              type: 'success',
              message: 'Account created successfully! Please verify your email.',
              autoClose: true,
            });
            onSuccess?.();
          },
          onError: (error: any) => {
            console.error('Registration error:', error);
            addNotification({
              type: 'error',
              message: error.message || 'Registration failed. Please try again.',
              autoClose: true,
            });
          }
        });
      } catch (error: any) {
        console.error('Registration submission error:', error);
        addNotification({
          type: 'error',
          message: error.message || 'An unexpected error occurred. Please try again.',
          autoClose: true,
        });
      }
    },
  });

  return (
    <FormProvider form={form} className={className}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            name="firstName"
            label="First Name"
            placeholder="John"
            leftIcon={<User className="w-4 h-4" />}
            required
            autoComplete="given-name"
          />

          <FormInput
            name="lastName"
            label="Last Name"
            placeholder="Doe"
            leftIcon={<User className="w-4 h-4" />}
            required
            autoComplete="family-name"
          />
        </div>

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
          placeholder="Create a password"
          required
          autoComplete="new-password"
          showStrengthMeter
        />

        <FormPasswordInput
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          required
          autoComplete="new-password"
        />

        <FormCheckbox
          name="agreeTerms"
          label={
            <span>
              I agree to the <a href="#terms-of-service" className="text-red-600 hover:underline">Terms of Service</a> and <a href="#privacy-policy" className="text-red-600 hover:underline">Privacy Policy</a>
            </span>
          }
          required
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
          Create Account
        </FormSubmitButton>

        <div className="text-center mt-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onLogin}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </FormProvider>
  );
};

export default RegisterForm;