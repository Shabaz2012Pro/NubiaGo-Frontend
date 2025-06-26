import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import { clsx } from 'clsx';

interface EmailVerificationProps {
  email: string;
  onVerified?: () => void;
  className?: string;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  onVerified,
  className
}) => {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const { resendVerificationEmail, error } = useAuth();

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendSuccess(false);
    
    try {
      await resendVerificationEmail();
      setResendSuccess(true);
    } catch (err) {
      console.error('Failed to resend verification email:', err);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card 
      variant="default" 
      padding="lg" 
      className={clsx('max-w-md mx-auto', className)}
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Verify Your Email
        </h2>
        
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          We've sent a verification email to <span className="font-medium">{email}</span>. 
          Please check your inbox and click the verification link to activate your account.
        </p>
        
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-700 dark:text-yellow-300 text-sm mb-6">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>Your account has limited access until you verify your email.</p>
          </div>
        </div>
        
        {resendSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-700 dark:text-green-300 text-sm mb-6"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p>Verification email resent successfully!</p>
            </div>
          </motion.div>
        )}
        
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-700 dark:text-red-300 text-sm mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleResendEmail}
            loading={isResending}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Resend Verification Email
          </Button>
          
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onVerified}
            className="bg-red-600 hover:bg-red-700"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            I've Verified My Email
          </Button>
        </div>
        
        <p className="text-sm text-neutral-500 mt-6">
          Need help? <a href="#contact" className="text-red-600 hover:underline">Contact Support</a>
        </p>
      </div>
    </Card>
  );
};

export default EmailVerification;