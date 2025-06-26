import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Input from '../atoms/Input';
import { Eye, EyeOff } from 'lucide-react';
import { clsx } from 'clsx';

interface FormPasswordInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  helperText?: string;
  autoComplete?: string;
  showStrengthMeter?: boolean;
}

const FormPasswordInput: React.FC<FormPasswordInputProps> = ({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  className,
  helperText,
  autoComplete = 'current-password',
  showStrengthMeter = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { control, formState: { errors }, watch } = useFormContext();
  const error = errors[name]?.message as string | undefined;
  
  // For password strength meter
  const password = watch(name, '');
  
  // Calculate password strength
  const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
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
  };
  
  const passwordStrength = showStrengthMeter ? getPasswordStrength(password) : null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={clsx('w-full', className)}>
          <Input
            {...field}
            type={showPassword ? 'text' : 'password'}
            label={label}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            status={error ? 'error' : 'default'}
            helperText={error || helperText}
            autoComplete={autoComplete}
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
          />
          
          {/* Password Strength Meter */}
          {showStrengthMeter && password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-neutral-500">Password strength:</span>
                <span className="text-xs font-medium" style={{ color: passwordStrength?.color }}>
                  {passwordStrength?.label}
                </span>
              </div>
              <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div 
                  className={clsx('h-full rounded-full', passwordStrength?.color)} 
                  style={{ width: `${(passwordStrength?.score || 0 + 1) * 20}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default FormPasswordInput;