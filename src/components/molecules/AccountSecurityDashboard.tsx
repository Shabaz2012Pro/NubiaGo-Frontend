import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Smartphone, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  LogOut, 
  Eye, 
  EyeOff,
  RefreshCw,
  Globe,
  Mail
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import TwoFactorSetup from './TwoFactorSetup';
import { clsx } from 'clsx';

interface AccountSecurityDashboardProps {
  className?: string;
}

interface SecurityItem {
  id: string;
  title: string;
  description: string;
  status: 'enabled' | 'disabled' | 'warning' | 'recommended';
  icon: React.ReactNode;
  action?: string;
  onClick?: () => void;
}

const AccountSecurityDashboard: React.FC<AccountSecurityDashboardProps> = ({ className }) => {
  const { user, logout } = useAuth();
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  // Mock security items
  const securityItems: SecurityItem[] = [
    {
      id: 'two-factor',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      status: 'recommended',
      icon: <Smartphone className="w-5 h-5" />,
      action: 'Enable',
      onClick: () => setShowTwoFactorSetup(true)
    },
    {
      id: 'email-verification',
      title: 'Email Verification',
      description: 'Verify your email address',
      status: user?.verified ? 'enabled' : 'warning',
      icon: <Mail className="w-5 h-5" />,
      action: user?.verified ? undefined : 'Verify',
      onClick: user?.verified ? undefined : () => console.log('Verify email')
    },
    {
      id: 'password-strength',
      title: 'Password Strength',
      description: 'Your password meets our security requirements',
      status: 'enabled',
      icon: <Lock className="w-5 h-5" />
    },
    {
      id: 'login-notifications',
      title: 'Login Notifications',
      description: 'Get notified of new login attempts',
      status: 'disabled',
      icon: <AlertCircle className="w-5 h-5" />,
      action: 'Enable',
      onClick: () => console.log('Enable login notifications')
    }
  ];

  const getStatusBadge = (status: SecurityItem['status']) => {
    switch (status) {
      case 'enabled':
        return <Badge variant="success" size="sm">Enabled</Badge>;
      case 'disabled':
        return <Badge variant="default" size="sm">Disabled</Badge>;
      case 'warning':
        return <Badge variant="warning" size="sm">Action Needed</Badge>;
      case 'recommended':
        return <Badge variant="primary" size="sm">Recommended</Badge>;
      default:
        return null;
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      // Show error
      return;
    }
    
    setIsChangingPassword(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordChangeSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setPasswordChangeSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
        Account Security
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Security Score */}
          <Card variant="default" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                Security Score
              </h3>
              <Badge variant="success" size="sm">Good</Badge>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-600 dark:text-neutral-400">75%</span>
                <span className="text-neutral-600 dark:text-neutral-400">100%</span>
              </div>
              <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Enable two-factor authentication to increase your security score.
            </p>
          </Card>
          
          {/* Security Features */}
          <Card variant="default" padding="lg">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Security Features
            </h3>
            
            <div className="space-y-4">
              {securityItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-start justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className={clsx(
                      'p-2 rounded-lg',
                      item.status === 'enabled' ? 'bg-green-100 dark:bg-green-900/20 text-green-600' :
                      item.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600' :
                      item.status === 'recommended' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600' :
                      'bg-neutral-100 dark:bg-neutral-800 text-neutral-600'
                    )}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                          {item.title}
                        </h4>
                        {getStatusBadge(item.status)}
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {item.action && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={item.onClick}
                    >
                      {item.action}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
          
          {/* Recent Activity */}
          <Card variant="default" padding="lg">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Recent Activity
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                      Successful Login
                    </h4>
                    <span className="text-xs text-neutral-500">Today, 10:45 AM</span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    Lagos, Nigeria • Chrome on Windows
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                      Password Changed
                    </h4>
                    <span className="text-xs text-neutral-500">Yesterday, 3:20 PM</span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    Lagos, Nigeria • Chrome on Windows
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 rounded-lg">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                      New Location Login
                    </h4>
                    <span className="text-xs text-neutral-500">3 days ago</span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    Accra, Ghana • Safari on iPhone
                  </p>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 w-full"
            >
              View All Activity
            </Button>
          </Card>
        </div>
        
        {/* Password Management */}
        <div className="space-y-6">
          <Card variant="default" padding="lg">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Change Password
            </h3>
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-neutral-800"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-neutral-800"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-neutral-800"
                  required
                />
              </div>
              
              {passwordChangeSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg flex items-center space-x-2 text-sm"
                >
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Password changed successfully!</span>
                </motion.div>
              )}
              
              <Button
                type="submit"
                variant="primary"
                loading={isChangingPassword}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Update Password
              </Button>
            </form>
          </Card>
          
          <Card variant="default" padding="lg">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Active Sessions
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-700 dark:text-green-300">Current Session</span>
                  </div>
                  <Badge variant="success" size="sm">Active</Badge>
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 pl-6">
                  Lagos, Nigeria • Chrome on Windows • Now
                </p>
              </div>
              
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-neutral-500" />
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">Mobile App</span>
                  </div>
                  <Button variant="ghost" size="xs">Revoke</Button>
                </div>
                <p className="text-xs text-neutral-500 pl-6">
                  Lagos, Nigeria • NubiaGO App on iPhone • 2 days ago
                </p>
              </div>
              
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-neutral-500" />
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">Tablet</span>
                  </div>
                  <Button variant="ghost" size="xs">Revoke</Button>
                </div>
                <p className="text-xs text-neutral-500 pl-6">
                  Lagos, Nigeria • Safari on iPad • 5 days ago
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              fullWidth
              className="mt-4"
              leftIcon={<LogOut className="w-4 h-4" />}
            >
              Sign Out All Other Devices
            </Button>
          </Card>
          
          <Card variant="outlined" padding="md" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <h3 className="font-semibold text-red-700 dark:text-red-300 flex items-center space-x-2 mb-3">
              <AlertCircle className="w-5 h-5" />
              <span>Danger Zone</span>
            </h3>
            
            <p className="text-sm text-red-600 dark:text-red-400 mb-4">
              These actions are permanent and cannot be undone.
            </p>
            
            <div className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/30"
              >
                Deactivate Account
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/30"
              >
                Delete Account
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Two-Factor Setup Modal */}
      {showTwoFactorSetup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <TwoFactorSetup
              onComplete={() => setShowTwoFactorSetup(false)}
              onCancel={() => setShowTwoFactorSetup(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSecurityDashboard;