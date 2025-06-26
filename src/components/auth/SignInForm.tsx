import React, { useState } from 'react';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../atoms/Button';
import Input from '../atoms/Input';

interface SignInFormProps {
  onSuccess?: () => void;
  onSwitchToSignUp?: () => void;
  onForgotPassword?: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  onSuccess,
  onSwitchToSignUp,
  onForgotPassword
}) => {
  const { signIn, isLoading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await signIn({
        email: formData.email,
        password: formData.password
      });
      
      onSuccess?.();
    } catch (err) {
      // Error is handled by the store
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Welcome Back
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Sign in to your Nubiago account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
          error={formErrors.email}
          leftIcon={<Mail className="w-4 h-4" />}
        />

        {/* Password */}
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
            error={formErrors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Forgot your password?
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          loading={isLoading}
        >
          Sign In
        </Button>
      </form>

      {/* Switch to Sign Up */}
      <div className="text-center">
        <p className="text-neutral-600 dark:text-neutral-400">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;