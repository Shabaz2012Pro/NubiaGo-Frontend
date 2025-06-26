import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  X, 
  Eye, 
  EyeOff, 
  Facebook, 
  Twitter, 
  Linkedin, 
  ArrowRight, 
  AlertCircle,
  CheckCircle,
  Shield,
  Key,
  Send
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import { clsx } from 'clsx';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register' | 'forgotPassword';
  className?: string;
}

type AuthView = 'login' | 'register' | 'forgotPassword' | 'resetSuccess' | 'registerSuccess' | 'twoFactor';

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialView = 'login',
  className
}) => {
  const [currentView, setCurrentView] = useState<AuthView>(initialView);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  
  // Form data
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: ''
  });

  const { login, register, forgotPassword, error, clearError } = useAuth();

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);
    
    try {
      await login(loginData.email, loginData.password);
      onClose();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);
    
    // Validate form
    if (registerData.password !== registerData.confirmPassword) {
      setFormError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }
    
    if (!registerData.agreeTerms) {
      setFormError('You must agree to the terms and conditions');
      setIsSubmitting(false);
      return;
    }
    
    try {
      await register(
        registerData.email, 
        registerData.password, 
        registerData.firstName, 
        registerData.lastName
      );
      setCurrentView('registerSuccess');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);
    
    try {
      await forgotPassword(forgotPasswordData.email);
      setCurrentView('resetSuccess');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otpCode.join('');
    console.log('OTP submitted:', code);
    
    // Simulate verification
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // In a real app, this would redirect to the OAuth provider
  };

  const renderLoginForm = () => (
    <motion.form 
      key="login-form"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onSubmit={handleLoginSubmit}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Welcome Back
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Sign in to your NubiaGO account
        </p>
      </div>
      
      <Input
        label="Email Address"
        type="email"
        placeholder="your@email.com"
        value={loginData.email}
        onChange={(value) => setLoginData({ ...loginData, email: value })}
        leftIcon={<Mail className="w-4 h-4" />}
        required
      />
      
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={loginData.password}
          onChange={(value) => setLoginData({ ...loginData, password: value })}
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
      </div>
      
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={loginData.rememberMe}
            onChange={() => setLoginData({ ...loginData, rememberMe: !loginData.rememberMe })}
            className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
          />
          <span className="text-sm text-neutral-600 dark:text-neutral-400">Remember me</span>
        </label>
        
        <button
          type="button"
          onClick={() => setCurrentView('forgotPassword')}
          className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          Forgot password?
        </button>
      </div>
      
      {formError && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg flex items-center space-x-2 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{formError}</span>
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
        Sign In
      </Button>
      
      <div className="relative flex items-center justify-center">
        <div className="border-t border-neutral-200 dark:border-neutral-700 w-full"></div>
        <span className="bg-white dark:bg-neutral-800 px-2 text-sm text-neutral-500 relative">or continue with</span>
        <div className="border-t border-neutral-200 dark:border-neutral-700 w-full"></div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('google')}
          className="flex justify-center items-center"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
            />
          </svg>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('facebook')}
          className="flex justify-center items-center"
        >
          <Facebook className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('twitter')}
          className="flex justify-center items-center"
        >
          <Twitter className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => setCurrentView('register')}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </motion.form>
  );

  const renderRegisterForm = () => (
    <motion.form 
      key="register-form"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onSubmit={handleRegisterSubmit}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Create an Account
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Join NubiaGO to start shopping
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="John"
          value={registerData.firstName}
          onChange={(value) => setRegisterData({ ...registerData, firstName: value })}
          leftIcon={<User className="w-4 h-4" />}
          required
        />
        <Input
          label="Last Name"
          placeholder="Doe"
          value={registerData.lastName}
          onChange={(value) => setRegisterData({ ...registerData, lastName: value })}
          leftIcon={<User className="w-4 h-4" />}
          required
        />
      </div>
      
      <Input
        label="Email Address"
        type="email"
        placeholder="your@email.com"
        value={registerData.email}
        onChange={(value) => setRegisterData({ ...registerData, email: value })}
        leftIcon={<Mail className="w-4 h-4" />}
        required
      />
      
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a password"
          value={registerData.password}
          onChange={(value) => setRegisterData({ ...registerData, password: value })}
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
      </div>
      
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm your password"
          value={registerData.confirmPassword}
          onChange={(value) => setRegisterData({ ...registerData, confirmPassword: value })}
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
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={registerData.agreeTerms}
          onChange={() => setRegisterData({ ...registerData, agreeTerms: !registerData.agreeTerms })}
          className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
        />
        <label htmlFor="terms" className="text-sm text-neutral-600 dark:text-neutral-400">
          I agree to the <a href="#" className="text-red-600 hover:underline">Terms of Service</a> and <a href="#" className="text-red-600 hover:underline">Privacy Policy</a>
        </label>
      </div>
      
      {formError && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg flex items-center space-x-2 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{formError}</span>
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
        Create Account
      </Button>
      
      <div className="relative flex items-center justify-center">
        <div className="border-t border-neutral-200 dark:border-neutral-700 w-full"></div>
        <span className="bg-white dark:bg-neutral-800 px-2 text-sm text-neutral-500 relative">or sign up with</span>
        <div className="border-t border-neutral-200 dark:border-neutral-700 w-full"></div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('google')}
          className="flex justify-center items-center"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
            />
          </svg>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('facebook')}
          className="flex justify-center items-center"
        >
          <Facebook className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('twitter')}
          className="flex justify-center items-center"
        >
          <Twitter className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => setCurrentView('login')}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </motion.form>
  );

  const renderForgotPasswordForm = () => (
    <motion.form 
      key="forgot-password-form"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onSubmit={handleForgotPasswordSubmit}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Forgot Password
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Enter your email and we'll send you a link to reset your password
        </p>
      </div>
      
      <Input
        label="Email Address"
        type="email"
        placeholder="your@email.com"
        value={forgotPasswordData.email}
        onChange={(value) => setForgotPasswordData({ ...forgotPasswordData, email: value })}
        leftIcon={<Mail className="w-4 h-4" />}
        required
      />
      
      {formError && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg flex items-center space-x-2 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{formError}</span>
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
        Send Reset Link
      </Button>
      
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => setCurrentView('login')}
          className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
        >
          Back to Sign In
        </button>
      </div>
    </motion.form>
  );

  const renderResetSuccessView = () => (
    <motion.div 
      key="reset-success"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-center py-8"
    >
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
        Check Your Email
      </h2>
      
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        We've sent a password reset link to <span className="font-medium">{forgotPasswordData.email}</span>. 
        Please check your inbox and follow the instructions to reset your password.
      </p>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-300 text-sm mb-6">
        <p>Didn't receive the email? Check your spam folder or request another link.</p>
      </div>
      
      <div className="space-y-3">
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={() => handleForgotPasswordSubmit({ preventDefault: () => {} } as React.FormEvent)}
        >
          Resend Email
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          fullWidth
          onClick={() => setCurrentView('login')}
        >
          Back to Sign In
        </Button>
      </div>
    </motion.div>
  );

  const renderRegisterSuccessView = () => (
    <motion.div 
      key="register-success"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-center py-8"
    >
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
        Registration Successful!
      </h2>
      
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Your account has been created successfully. We've sent a verification email to <span className="font-medium">{registerData.email}</span>.
      </p>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-300 text-sm mb-6">
        <p>Please verify your email address to access all features of your account.</p>
      </div>
      
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={onClose}
        className="bg-red-600 hover:bg-red-700"
      >
        Start Exploring
      </Button>
    </motion.div>
  );

  const renderTwoFactorView = () => (
    <motion.form 
      key="two-factor"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onSubmit={handleOtpSubmit}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Two-Factor Authentication
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Enter the 6-digit code sent to your email or authentication app
        </p>
      </div>
      
      <div className="flex justify-center space-x-2 my-8">
        {otpCode.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            className="w-12 h-14 text-center text-xl font-bold border border-neutral-300 dark:border-neutral-600 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none bg-white dark:bg-neutral-800"
          />
        ))}
      </div>
      
      {formError && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg flex items-center space-x-2 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{formError}</span>
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
        Verify
      </Button>
      
      <div className="text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
          Didn't receive a code?
        </p>
        <button
          type="button"
          className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
        >
          Resend Code
        </button>
      </div>
    </motion.form>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={clsx(
          'w-full max-w-md bg-white dark:bg-neutral-800 rounded-xl shadow-2xl overflow-hidden',
          className
        )}
      >
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <AnimatePresence mode="wait">
            {currentView === 'login' && renderLoginForm()}
            {currentView === 'register' && renderRegisterForm()}
            {currentView === 'forgotPassword' && renderForgotPasswordForm()}
            {currentView === 'resetSuccess' && renderResetSuccessView()}
            {currentView === 'registerSuccess' && renderRegisterSuccessView()}
            {currentView === 'twoFactor' && renderTwoFactorView()}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;