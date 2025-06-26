import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import { useAuthStore } from '../../store/useAuthStore';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await signIn({ email, password });
      
      // Check if user is admin
      const user = useAuthStore.getState().user;
      if (user?.role !== 'admin') {
        setError('You do not have admin privileges');
        useAuthStore.getState().signOut();
        setIsLoading(false);
        return;
      }
      
      // Redirect to admin dashboard
      navigate('/admin');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card variant="default" padding="lg" className="border-0 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Admin Portal
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Sign in to access the NubiaGo admin dashboard
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={setEmail}
              leftIcon={<Mail className="w-4 h-4" />}
              placeholder="admin@nubiago.com"
              required
            />
            
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
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
                placeholder="••••••••••••"
                required
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg flex items-center space-x-2 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-neutral-300 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-600 dark:text-neutral-400">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-red-600 hover:text-red-500">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Need help? Contact <a href="mailto:support@nubiago.com" className="text-red-600 hover:text-red-500">IT Support</a>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;