import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import EmailVerification from '../components/molecules/EmailVerification';
import PasswordReset from '../components/molecules/PasswordReset';
import TwoFactorSetup from '../components/molecules/TwoFactorSetup';
import AccountSecurityDashboard from '../components/molecules/AccountSecurityDashboard';
import LoadingScreen from '../components/molecules/LoadingScreen';
import ErrorState from '../components/molecules/ErrorState';
import { LoginForm, RegisterForm } from '../components/auth';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import { createTestUser, signInTestUser } from '../utils/createTestUser';

const AuthPage: React.FC = () => {
  const { user, isLoading, error } = useAuth();
  const [authAction, setAuthAction] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Parse URL parameters to determine the auth action
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '');
      
      const action = params.get('action');
      const tokenParam = params.get('token');
      const emailParam = params.get('email');
      
      console.log('Auth page hash changed:', { hash, action, tokenParam, emailParam });
      
      if (action) {
        setAuthAction(action);
      } else {
        // Default to login if no action specified
        setAuthAction('login');
      }
      
      if (tokenParam) {
        setToken(tokenParam);
      }
      
      if (emailParam) {
        setEmail(emailParam);
      }
    };

    // Initial load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen isLoading={true} text="Loading authentication status..." />;
  }

  if (error && !authAction) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <main className="py-16">
          <ErrorState 
            title="Authentication Error"
            message={error}
            onRetry={() => window.location.reload()}
            onHome={() => window.location.hash = ''}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="default" padding="lg" className="max-w-md mx-auto">
              {/* Login */}
              {authAction === 'login' && (
                <div>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Welcome Back
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Sign in to your NubiaGo account
                    </p>
                  </div>
                  
                  <LoginForm
                    onSuccess={() => window.location.hash = ''}
                    onForgotPassword={() => window.location.hash = 'auth?action=forgotPassword'}
                    onRegister={() => window.location.hash = 'auth?action=register'}
                  />
                  
                  {/* Development Test User Buttons */}
                  <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 text-center">
                      Development Testing
                    </p>
                    <div className="space-y-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        fullWidth
                        onClick={async () => {
                          const result = await createTestUser();
                          if (result.success) {
                            alert('Test user created! Email: test@nubiago.com, Password: TestPassword123!');
                          } else {
                            alert(`Failed to create test user: ${result.error}`);
                          }
                        }}
                        className="text-xs"
                      >
                        Create Test User
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        onClick={async () => {
                          const result = await signInTestUser();
                          if (result.success) {
                            window.location.hash = '';
                          } else {
                            alert(`Failed to sign in test user: ${result.error}`);
                          }
                        }}
                        className="text-xs"
                      >
                        Sign In as Test User
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Register */}
              {authAction === 'register' && (
                <div>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Create an Account
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Join NubiaGo to start shopping
                    </p>
                  </div>
                  
                  <RegisterForm
                    onSuccess={() => window.location.hash = 'auth?action=verifyEmail'}
                    onLogin={() => window.location.hash = 'auth?action=login'}
                  />
                </div>
              )}
              
              {/* Forgot Password */}
              {authAction === 'forgotPassword' && (
                <div>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Forgot Password
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Enter your email and we'll send you a link to reset your password
                    </p>
                  </div>
                  
                  <ForgotPasswordForm
                    onSuccess={() => window.location.hash = 'auth?action=resetSent'}
                    onCancel={() => window.location.hash = 'auth?action=login'}
                  />
                </div>
              )}
              
              {/* Reset Password */}
              {authAction === 'resetPassword' && token && (
                <div>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Reset Your Password
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Create a new password for your account
                    </p>
                  </div>
                  
                  <PasswordReset
                    token={token}
                    onSuccess={() => window.location.hash = 'auth?action=login'}
                  />
                </div>
              )}
              
              {/* Reset Password Email Sent */}
              {authAction === 'resetSent' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Check Your Email
                  </h2>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    We've sent a password reset link to <span className="font-medium">{email || 'your email'}</span>. 
                    Please check your inbox and follow the instructions to reset your password.
                  </p>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-300 text-sm mb-6">
                    <p>Didn't receive the email? Check your spam folder or request another link.</p>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      className="w-full px-4 py-2 bg-white border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-600 transition-colors"
                      onClick={() => window.location.hash = 'auth?action=forgotPassword'}
                    >
                      Resend Email
                    </button>
                    
                    <button
                      className="w-full px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                      onClick={() => window.location.hash = 'auth?action=login'}
                    >
                      Back to Sign In
                    </button>
                  </div>
                </div>
              )}
              
              {/* Email Verification */}
              {authAction === 'verifyEmail' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Registration Successful!
                  </h2>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Your account has been created successfully. We've sent a verification email to <span className="font-medium">{email || 'your email'}</span>.
                  </p>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-300 text-sm mb-6">
                    <p>Please verify your email address to access all features of your account.</p>
                  </div>
                  
                  <button
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    onClick={() => window.location.hash = ''}
                  >
                    Start Exploring
                  </button>
                </div>
              )}
              
              {/* Two Factor Authentication */}
              {authAction === 'twoFactor' && (
                <div>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Two-Factor Authentication
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Enter the 6-digit code sent to your email or authentication app
                    </p>
                  </div>
                  
                  <TwoFactorSetup
                    onComplete={() => window.location.hash = ''}
                    onCancel={() => window.location.hash = 'auth?action=login'}
                  />
                </div>
              )}
              
              {/* Default: Redirect to home if no valid action */}
              {!authAction && (
                <div className="text-center py-12">
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Redirecting to home page...
                  </p>
                  {setTimeout(() => { window.location.hash = ''; }, 2000)}
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;