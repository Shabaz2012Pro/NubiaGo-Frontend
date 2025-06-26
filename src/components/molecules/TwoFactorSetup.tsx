import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Copy, CheckCircle, AlertCircle, Smartphone, QrCode } from 'lucide-react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { clsx } from 'clsx';

interface TwoFactorSetupProps {
  onComplete?: () => void;
  onCancel?: () => void;
  className?: string;
}

const TwoFactorSetup: React.FC<TwoFactorSetupProps> = ({
  onComplete,
  onCancel,
  className
}) => {
  const [step, setStep] = useState<'intro' | 'setup' | 'verify' | 'complete'>('intro');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mock secret key for demo purposes
  const secretKey = 'ABCD EFGH IJKL MNOP';
  
  const handleCopySecretKey = () => {
    navigator.clipboard.writeText(secretKey.replace(/\s/g, ''));
  };
  
  const handleVerifyCode = () => {
    setError(null);
    
    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }
    
    if (verificationCode.length !== 6) {
      setError('Verification code must be 6 digits');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate verification
    setTimeout(() => {
      // For demo purposes, any 6-digit code is accepted
      if (verificationCode.length === 6 && /^\d+$/.test(verificationCode)) {
        setStep('complete');
      } else {
        setError('Invalid verification code');
      }
      setIsSubmitting(false);
    }, 1500);
  };

  const renderIntroStep = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Shield className="w-8 h-8 text-blue-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
        Enhance Your Account Security
      </h2>
      
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Two-factor authentication adds an extra layer of security to your account by requiring a second verification step when you sign in.
      </p>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-300 text-sm mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium">Why enable two-factor authentication?</p>
        </div>
        <ul className="space-y-1 pl-7 list-disc text-left">
          <li>Protect your account from unauthorized access</li>
          <li>Prevent account takeovers even if your password is compromised</li>
          <li>Secure your personal and payment information</li>
          <li>Get notified of login attempts</li>
        </ul>
      </div>
      
      <div className="space-y-3">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => setStep('setup')}
          className="bg-red-600 hover:bg-red-700"
        >
          Enable Two-Factor Authentication
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          fullWidth
          onClick={onCancel}
        >
          Maybe Later
        </Button>
      </div>
    </div>
  );

  const renderSetupStep = () => (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Set Up Two-Factor Authentication
        </h2>
        
        <p className="text-neutral-600 dark:text-neutral-400">
          Follow these steps to set up two-factor authentication with an authenticator app
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center mr-2 text-sm">1</span>
            Download an authenticator app
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 pl-8">
            If you don't already have one, download an authenticator app like Google Authenticator, Microsoft Authenticator, or Authy.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center mr-2 text-sm">2</span>
            Scan this QR code or enter the secret key
          </h3>
          <div className="pl-8 space-y-4">
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-white p-4 rounded-lg">
                <QrCode className="w-full h-full text-neutral-900" />
              </div>
            </div>
            
            <div className="p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg flex items-center justify-between">
              <div className="font-mono text-sm">{secretKey}</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopySecretKey}
                leftIcon={<Copy className="w-4 h-4" />}
              >
                Copy
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center mr-2 text-sm">3</span>
            Verify setup
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 pl-8">
            Enter the 6-digit code from your authenticator app to verify the setup.
          </p>
        </div>
      </div>
      
      <div className="mt-8 space-y-4">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => setStep('verify')}
          className="bg-red-600 hover:bg-red-700"
        >
          Continue
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          fullWidth
          onClick={() => setStep('intro')}
        >
          Back
        </Button>
      </div>
    </div>
  );

  const renderVerifyStep = () => (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Verify Your Setup
        </h2>
        
        <p className="text-neutral-600 dark:text-neutral-400">
          Enter the 6-digit code from your authenticator app
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-center items-center space-x-4">
          <Smartphone className="w-8 h-8 text-neutral-400" />
          <div className="h-0.5 w-8 bg-neutral-300 dark:bg-neutral-600"></div>
          <Shield className="w-8 h-8 text-red-600" />
        </div>
        
        <Input
          label="Verification Code"
          placeholder="Enter 6-digit code"
          value={verificationCode}
          onChange={setVerificationCode}
          maxLength={6}
        />
        
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg flex items-center space-x-2 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
      
      <div className="mt-8 space-y-4">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleVerifyCode}
          loading={isSubmitting}
          className="bg-red-600 hover:bg-red-700"
        >
          Verify and Enable
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          fullWidth
          onClick={() => setStep('setup')}
        >
          Back
        </Button>
      </div>
    </div>
  );

  const renderCompleteStep = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
        Two-Factor Authentication Enabled
      </h2>
      
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Your account is now protected with an additional layer of security. You'll need to enter a verification code each time you sign in.
      </p>
      
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-700 dark:text-yellow-300 text-sm mb-6">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>
            <span className="font-medium">Important:</span> Save your recovery codes in a safe place. You'll need them if you lose access to your authenticator app.
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        <Button
          variant="outline"
          size="lg"
          fullWidth
        >
          Download Recovery Codes
        </Button>
        
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onComplete}
          className="bg-red-600 hover:bg-red-700"
        >
          Done
        </Button>
      </div>
    </div>
  );

  return (
    <Card 
      variant="default" 
      padding="lg" 
      className={clsx('max-w-md mx-auto', className)}
    >
      {step === 'intro' && renderIntroStep()}
      {step === 'setup' && renderSetupStep()}
      {step === 'verify' && renderVerifyStep()}
      {step === 'complete' && renderCompleteStep()}
    </Card>
  );
};

export default TwoFactorSetup;