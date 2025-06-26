import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../api/supabaseClient';
import { User } from '../types';

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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Get user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
            
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            firstName: profile?.first_name || '',
            lastName: profile?.last_name || '',
            role: profile?.role || 'buyer',
            verified: profile?.verified || false,
            memberSince: profile?.member_since || new Date().getFullYear().toString()
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Get user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();
          
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          firstName: profile?.first_name || '',
          lastName: profile?.last_name || '',
          role: profile?.role || 'buyer',
          verified: profile?.verified || false,
          memberSince: profile?.member_since || new Date().getFullYear().toString()
        });
      }
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Create profile
        await supabase.from('profiles').insert({
          id: data.user.id,
          email: data.user.email,
          first_name: firstName,
          last_name: lastName,
          role: 'buyer',
          member_since: new Date().getFullYear().toString()
        });
        
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          firstName,
          lastName,
          role: 'buyer',
          verified: false,
          memberSince: new Date().getFullYear().toString()
        });
      }
    } catch (error: any) {
      setError(error.message || 'Failed to sign up');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setUser(null);
    } catch (error: any) {
      setError(error.message || 'Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password
  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) throw error;
    } catch (error: any) {
      setError(error.message || 'Failed to send reset email');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update password
  const resetPassword = async (token: string, newPassword: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
    } catch (error: any) {
      setError(error.message || 'Failed to reset password');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          // Add other fields as needed
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setUser(prev => prev ? { ...prev, ...data } : null);
    } catch (error: any) {
      setError(error.message || 'Failed to update profile');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email
  const verifyEmail = async (token: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // This is a placeholder - Supabase handles email verification automatically
      // You might need to update the user's verified status in your profiles table
      
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({ verified: true })
          .eq('id', user.id);
        
        if (error) throw error;
        
        setUser(prev => prev ? { ...prev, verified: true } : null);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to verify email');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Resend verification email
  const resendVerificationEmail = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Placeholder - Supabase doesn't have a direct method for this
      // You might need to implement a custom solution
      
      throw new Error('Not implemented');
    } catch (error: any) {
      setError(error.message || 'Failed to resend verification email');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Get current user
  const getCurrentUser = async () => {
    try {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Get user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();
          
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          firstName: profile?.first_name || '',
          lastName: profile?.last_name || '',
          role: profile?.role || 'buyer',
          verified: profile?.verified || false,
          memberSince: profile?.member_since || new Date().getFullYear().toString()
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Get current user error:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Create the auth value object
  const authValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
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
    </AuthContext.Provider>
  );
};