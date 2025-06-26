import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  LogOut, 
  Settings, 
  Package, 
  Heart, 
  Bell, 
  ShoppingCart, 
  ChevronDown,
  UserCircle,
  CreditCard,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import AuthModal from '../molecules/AuthModal';
import { clsx } from 'clsx';

interface AuthHeaderProps {
  className?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ className }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'register' | 'forgotPassword'>('login');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogin = () => {
    setAuthModalView('login');
    setShowAuthModal(true);
  };

  const handleRegister = () => {
    setAuthModalView('register');
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const userMenuItems = [
    { icon: <UserCircle className="w-4 h-4" />, label: 'My Profile', href: '#profile' },
    { icon: <Package className="w-4 h-4" />, label: 'My Orders', href: '#orders' },
    { icon: <Heart className="w-4 h-4" />, label: 'Wishlist', href: '#wishlist' },
    { icon: <CreditCard className="w-4 h-4" />, label: 'Payment Methods', href: '#payment' },
    { icon: <Shield className="w-4 h-4" />, label: 'Security', href: '#security' },
    { icon: <Settings className="w-4 h-4" />, label: 'Settings', href: '#settings' },
    { icon: <LogOut className="w-4 h-4" />, label: 'Sign Out', onClick: handleLogout, divider: true },
  ];

  return (
    <div className={className}>
      <div className="flex items-center space-x-4">
        {/* Wishlist */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-3 relative group"
            onClick={() => window.location.hash = 'wishlist'}
          >
            <Heart className="w-5 h-5 group-hover:text-red-500 transition-colors" />
            <Badge variant="primary" size="sm" className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-red-500">
              12
            </Badge>
          </Button>
        </motion.div>
        
        {/* Cart */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-3 relative group"
          >
            <ShoppingCart className="w-5 h-5 group-hover:text-red-500 transition-colors" />
            <Badge variant="error" size="sm" className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-red-500">
              3
            </Badge>
          </Button>
        </motion.div>
        
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="p-3 relative hidden md:flex">
          <Bell className="w-5 h-5" />
          <Badge variant="error" size="sm" className="absolute -top-1 -right-1 w-5 h-5 p-0">
            5
          </Badge>
        </Button>
        
        {/* User Menu or Auth Buttons */}
        {isAuthenticated ? (
          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex items-center space-x-2"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img 
                  src={user?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'} 
                  alt={user?.firstName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {user?.firstName}
              </span>
              <ChevronDown className="w-4 h-4" />
            </Button>
            
            {/* Mobile User Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden p-3"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <User className="w-5 h-5" />
            </Button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-xl py-2 z-50"
              >
                <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-neutral-500">{user?.email}</p>
                </div>
                
                <div className="py-2">
                  {userMenuItems.map((item, index) => (
                    <React.Fragment key={index}>
                      {item.divider && <div className="border-t border-neutral-200 dark:border-neutral-700 my-2" />}
                      {item.href ? (
                        <a
                          href={item.href}
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => {
                            item.onClick?.();
                            setShowUserMenu(false);
                          }}
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors w-full text-left"
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogin}
              className="hidden sm:flex"
            >
              Sign In
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={handleRegister}
              className="bg-red-600 hover:bg-red-700"
            >
              Join Free
            </Button>
          </div>
        )}
      </div>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialView={authModalView}
      />
    </div>
  );
};

export default AuthHeader;