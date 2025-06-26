import React from 'react';
import { Mail, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../atoms/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useResendVerificationEmail } from '../../api/queries/useAuthQueries';

interface EmailVerificationBannerProps {
  onDismiss?: () => void;
  className?: string;
}

const EmailVerificationBanner: React.FC<EmailVerificationBannerProps> = ({
  onDismiss,
  className,
}) => {
  const { user } = useAuth();
  const { mutate: resendVerificationEmail, isPending } = useResendVerificationEmail();
  
  // Don't show banner if user is verified or not logged in
  if (!user || user.verified) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 p-3 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Please verify your email address to access all features.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => resendVerificationEmail()}
              loading={isPending}
              className="text-xs border-yellow-300 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-700 dark:text-yellow-300 dark:hover:bg-yellow-900/30"
            >
              Resend Email
            </Button>
            
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailVerificationBanner;