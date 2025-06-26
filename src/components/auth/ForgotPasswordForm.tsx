import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../atoms/Button';
import Input from '../atoms/Input';

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onBackToSignIn?: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSuccess,
  onBackToSignIn
}) => {
  const { resetPassword, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email';
    }
    return '';
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    
    if (emailError) {
      setEmailError('');
    }
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      // Error is handled by the store
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
          <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Check Your Email
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={onSuccess}
          >
            Back to Sign In
          </Button>
          
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="w-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            Didn't receive the email? Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Reset Your Password
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={handleEmailChange}
          status={emailError ? 'error' : 'default'}
          helperText={emailError}
          leftIcon={<Mail className="w-4 h-4" />}
        />

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          loading={isLoading}
        >
          Send Reset Link
        </Button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={onBackToSignIn}
          className="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;