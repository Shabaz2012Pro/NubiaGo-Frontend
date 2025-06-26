
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle,
  LogIn,
  Clock,
  Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Badge from '../components/atoms/Badge';
import LoadingScreen from '../components/molecules/LoadingScreen';
import { clsx } from 'clsx';

interface LoginAttempt {
  timestamp: number;
  success: boolean;
  ip: string;
}

const AdminLoginPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    twoFactorCode: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [sessionInfo, setSessionInfo] = useState({
    ip: '',
    location: '',
    device: '',
    browser: ''
  });

  useEffect(() => {
    // Get session information
    const getUserInfo = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setSessionInfo({
          ip: data.ip || 'Unknown',
          location: `${data.city || 'Unknown'}, ${data.country_name || 'Unknown'}`,
          device: navigator.platform || 'Unknown',
          browser: navigator.userAgent.split(' ').pop() || 'Unknown'
        });
      } catch (error) {
        console.error('Failed to get user info:', error);
      }
    };

    getUserInfo();

    // Check for existing lockout
    const lockoutData = localStorage.getItem('adminLockout');
    if (lockoutData) {
      const { timestamp, duration } = JSON.parse(lockoutData);
      const now = Date.now();
      if (now - timestamp < duration) {
        setIsLocked(true);
        setLockoutTime(timestamp + duration);
      } else {
        localStorage.removeItem('adminLockout');
      }
    }

    // Load login attempts
    const attempts = localStorage.getItem('adminLoginAttempts');
    if (attempts) {
      setLoginAttempts(JSON.parse(attempts));
    }
  }, []);

  useEffect(() => {
    // Auto-unlock after lockout period
    if (isLocked && lockoutTime) {
      const interval = setInterval(() => {
        if (Date.now() >= lockoutTime) {
          setIsLocked(false);
          setLockoutTime(null);
          localStorage.removeItem('adminLockout');
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isLocked, lockoutTime]);

  // Redirect if already authenticated as admin
  useEffect(() => {
    if (user && user.role === 'admin') {
      window.location.href = '/admin/dashboard';
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (requiresTwoFactor && !formData.twoFactorCode) {
      setError('Two-factor authentication code is required');
      return false;
    }

    return true;
  };

  const recordLoginAttempt = (success: boolean) => {
    const attempt: LoginAttempt = {
      timestamp: Date.now(),
      success,
      ip: sessionInfo.ip
    };

    const updatedAttempts = [...loginAttempts, attempt].slice(-10); // Keep last 10 attempts
    setLoginAttempts(updatedAttempts);
    localStorage.setItem('adminLoginAttempts', JSON.stringify(updatedAttempts));

    // Check for too many failed attempts
    if (!success) {
      const recentFailures = updatedAttempts.filter(
        a => !a.success && Date.now() - a.timestamp < 15 * 60 * 1000 // 15 minutes
      ).length;

      if (recentFailures >= 5) {
        const lockoutDuration = 30 * 60 * 1000; // 30 minutes
        const lockoutData = {
          timestamp: Date.now(),
          duration: lockoutDuration
        };
        localStorage.setItem('adminLockout', JSON.stringify(lockoutData));
        setIsLocked(true);
        setLockoutTime(Date.now() + lockoutDuration);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError('Account is temporarily locked due to multiple failed attempts');
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call for admin login
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          twoFactorCode: formData.twoFactorCode,
          sessionInfo,
          rememberMe: formData.rememberMe
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.requiresTwoFactor && !requiresTwoFactor) {
          setRequiresTwoFactor(true);
          setError('');
          setSuccess('Two-factor authentication code sent to your registered device');
        } else {
          recordLoginAttempt(true);
          setSuccess('Admin login successful! Redirecting...');
          
          // Store admin session
          localStorage.setItem('adminToken', data.token);
          localStorage.setItem('adminUser', JSON.stringify(data.user));
          
          // Redirect to admin dashboard
          setTimeout(() => {
            window.location.href = '/admin/dashboard';
          }, 1500);
        }
      } else {
        recordLoginAttempt(false);
        setError(data.message || 'Invalid admin credentials');
      }
    } catch (error) {
      recordLoginAttempt(false);
      setError('Network error. Please try again.');
      console.error('Admin login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLockoutTimeRemaining = () => {
    if (!lockoutTime) return '';
    const remaining = Math.ceil((lockoutTime - Date.now()) / 1000 / 60);
    return `${remaining} minutes`;
  };

  if (isLoading) {
    return <LoadingScreen isLoading={true} text="Checking admin authentication..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-red-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="p-8 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Admin Portal
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Secure access to NubiaGO administration
            </p>
          </div>

          {/* Security Status */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900 dark:text-blue-100">
                Enhanced Security Active
              </span>
            </div>
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Location: {sessionInfo.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Time: {new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Lockout Warning */}
          {isLocked && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-900 dark:text-red-100">
                    Account Temporarily Locked
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Too many failed attempts. Try again in {getLockoutTimeRemaining()}.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700 dark:text-green-300">{success}</span>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@nubiago.com"
                  className="pl-10"
                  disabled={isLocked || isSubmitting}
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your secure password"
                  className="pl-10 pr-10"
                  disabled={isLocked || isSubmitting}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  disabled={isLocked || isSubmitting}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {requiresTwoFactor && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Two-Factor Authentication Code
                </label>
                <Input
                  type="text"
                  name="twoFactorCode"
                  value={formData.twoFactorCode}
                  onChange={handleInputChange}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  disabled={isLocked || isSubmitting}
                  autoComplete="one-time-code"
                />
              </div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                disabled={isLocked || isSubmitting}
                className="w-4 h-4 text-red-600 bg-neutral-100 border-neutral-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
                Keep me signed in (not recommended on shared devices)
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLocked || isSubmitting}
              className="relative"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Admin Portal</span>
                </div>
              )}
            </Button>
          </form>

          {/* Security Info */}
          <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
              This session is encrypted and monitored for security purposes.
              <br />
              Unauthorized access attempts will be logged and reported.
            </p>
          </div>

          {/* Recent Activity */}
          {loginAttempts.length > 0 && (
            <div className="mt-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <h4 className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Recent Login Activity
              </h4>
              <div className="space-y-1">
                {loginAttempts.slice(-3).map((attempt, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {new Date(attempt.timestamp).toLocaleString()}
                    </span>
                    <Badge
                      variant={attempt.success ? 'success' : 'error'}
                      size="sm"
                    >
                      {attempt.success ? 'Success' : 'Failed'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
