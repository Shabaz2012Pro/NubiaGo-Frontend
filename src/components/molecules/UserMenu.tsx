import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  LogOut, 
  Settings, 
  Package, 
  Heart, 
  Bell, 
  UserCircle,
  CreditCard,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../atoms/Button';
import { clsx } from 'clsx';

interface UserMenuProps {
  className?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout } = useAuth();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const menuItems = [
    { icon: <UserCircle className="w-4 h-4" />, label: 'My Profile', href: '#profile' },
    { icon: <Package className="w-4 h-4" />, label: 'My Orders', href: '#orders' },
    { icon: <Heart className="w-4 h-4" />, label: 'Wishlist', href: '#wishlist' },
    { icon: <CreditCard className="w-4 h-4" />, label: 'Payment Methods', href: '#payment' },
    { icon: <Shield className="w-4 h-4" />, label: 'Security', href: '#security' },
    { icon: <Settings className="w-4 h-4" />, label: 'Settings', href: '#settings' },
    { icon: <LogOut className="w-4 h-4" />, label: 'Sign Out', onClick: handleLogout, divider: true }
  ];

  if (!isAuthenticated) {
    return (
      <div className={clsx('flex items-center space-x-2', className)}>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => {
            console.log('Navigating to login');
            window.location.hash = '#auth?action=login';
          }}
          className="hidden sm:flex"
        >
          Sign In
        </Button>
        <Button 
          variant="primary" 
          size="sm"
          onClick={() => {
            console.log('Navigating to register');
            window.location.hash = '#auth?action=register';
          }}
          className="bg-red-600 hover:bg-red-700"
        >
          Join Free
        </Button>
      </div>
    );
  }

  return (
    <div className={clsx('relative', className)} ref={menuRef}>
      <Button 
        variant="ghost" 
        size="sm" 
        className="hidden md:flex items-center space-x-2"
        onClick={() => setIsOpen(!isOpen)}
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
      </Button>
      
      {/* Mobile User Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="md:hidden p-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="w-5 h-5" />
      </Button>

      {/* User Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-neutral-500">{user?.email}</p>
            </div>
            
            <div className="py-2">
              {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                  {item.divider && <div className="border-t border-neutral-200 dark:border-neutral-700 my-2" />}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        item.onClick?.();
                        setIsOpen(false);
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
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;