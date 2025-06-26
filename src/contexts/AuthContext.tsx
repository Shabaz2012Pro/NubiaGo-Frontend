import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { authApi } from '../api/authApi';
import { User } from '../types';
import AuthListener from '../components/auth/AuthListener';

// Define types for our auth context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    user,
    isLoading,
    isAuthenticated,
    error,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    verifyEmail,
    resendVerificationEmail,
    setInitialUser,
    clearError
  } = useAuthStore();

  // Check if user is already logged in on mount - always call useEffect
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authApi.checkAuth();
        if (user) {
          setInitialUser(user);
        }
      } catch (error) {
        console.error('Authentication error:', error);
      }
    };

    checkAuth();
  }, [setInitialUser]);

  // Create the auth value object
  const authValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    verifyEmail,
    resendVerificationEmail,
    error,
    clearError
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
      <AuthListener />
    </AuthContext.Provider>
  );
};