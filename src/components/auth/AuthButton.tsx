import React, { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../atoms/Button';
import { AuthModal } from './AuthModal';

export const AuthButton: React.FC = () => {
  const { user, isAuthenticated, signOut } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalView, setAuthModalView] = useState<'signIn' | 'signUp'>('signIn');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignIn = () => {
    setAuthModalView('signIn');
    setShowAuthModal(true);
  };

  const handleSignUp = () => {
    setAuthModalView('signUp');
    setShowAuthModal(true);
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  if (isAuthenticated && user) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.firstName || ''} ${user.lastName || ''}`}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {(user.firstName || '?')[0]}{(user.lastName || '?')[0]}
              </span>
            </div>
          )}
          <span className="hidden md:block text-neutral-900 dark:text-neutral-100">
            {user.firstName || 'User'}
          </span>
        </button>

        {/* User Menu */}
        {showUserMenu && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                {user.firstName || ''} {user.lastName || ''}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {user.email}
              </p>
            </div>
            
            <div className="p-2">
              <button
                onClick={() => {
                  // Navigate to profile
                  setShowUserMenu(false);
                }}
                className="w-full flex items-center space-x-2 p-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </button>
              
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-2 p-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors text-red-600 dark:text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Click outside to close menu */}
        {showUserMenu && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowUserMenu(false)}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleSignUp}
          className="bg-red-600 hover:bg-red-700"
        >
          Sign Up
        </Button>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialView={authModalView}
      />
    </>
  );
};

export default AuthButton;