import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Eye, EyeOff, CheckCircle, AlertCircle, Shield, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { clsx } from 'clsx';

interface PasswordResetProps {
  token: string;
  onComplete?: () => void;
  className?: string;
}

const PasswordReset: React.FC<PasswordResetProps> = ({
  token,
  onComplete,
  className
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const { resetPassword, error } = useAuth();

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    if (passwordStrength.score < 2) {
      setFormError('Please choose a stronger password');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await resetPassword(token, password);
      setIsComplete(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setIsSubmitting(false);
    }
  };

  function getPasswordStrength(password: string): { score: number; label: string; color: string } {
    if (!password) {
      return { score: 0, label: 'Too weak', color: 'bg-neutral-300 dark:bg-neutral-600' };
    }
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Normalize score to 0-4 range
    score = Math.min(4, Math.floor(score / 2));
    
    const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-green-500',
      'bg-green-600'
    ];
    
    return {
      score,
      label: labels[score],
      color: colors[score]
    };
  }

  if (isComplete) {
    return (
      <Card 
        variant="default" 
        padding="lg" 
        className={clsx('max-w-md mx-auto', className)}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Password Reset Complete
          </h2>
          
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
          
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onComplete}
            className="bg-red-600 hover:bg-red-700"
          >
            Sign In
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      variant="default" 
      padding="lg" 
      className={clsx('max-w-md mx-auto', className)}
    >
      <form onSubmit={handleSubmit}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Key className="w-8 h-8 text-blue-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Reset Your Password
          </h2>
          
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Create a new password for your account
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <Input
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              value={password}
              onChange={setPassword}
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              required
            />
            
            {password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-neutral-500">Password strength:</span>
                  <span className="text-xs font-medium" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${passwordStrength.color}`} 
                    style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <Input
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="focus:outline-none"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              required
            />
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-300 text-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium">Password requirements:</p>
            </div>
            <ul className="space-y-1 pl-7 list-disc">
              <li>At least 8 characters long</li>
              <li>Include uppercase and lowercase letters</li>
              <li>Include at least one number</li>
              <li>Include at least one special character</li>
            </ul>
          </div>
          
          {(formError || error) && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg flex items-center space-x-2 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{formError || error}</span>
            </div>
          )}
          
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            className="bg-red-600 hover:bg-red-700"
          >
            Reset Password
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default PasswordReset;