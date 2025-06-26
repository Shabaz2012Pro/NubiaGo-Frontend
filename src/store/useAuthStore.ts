import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../api/supabaseClient';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  signUp: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    company?: string;
    role?: string;
  }) => Promise<void>;
  signIn: (data: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  getCurrentUser: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      signUp: async (data) => {
        try {
          set({ isLoading: true, error: null });
          
          // Create user with Supabase Auth
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
              data: {
                first_name: data.firstName,
                last_name: data.lastName,
                role: data.role || 'buyer'
              }
            }
          });
          
          if (authError) {
            throw new Error(authError.message);
          }

          if (authData.user) {
            // Create user profile
            const userData: User = {
              id: authData.user.id,
              email: authData.user.email || '',
              firstName: data.firstName,
              lastName: data.lastName,
              role: data.role || 'buyer',
              verified: false,
              company: data.company,
              memberSince: new Date().getFullYear().toString()
            };
            
            set({ 
              user: userData, 
              isAuthenticated: !!authData.session, 
              isLoading: false 
            });
          } else {
            set({ isLoading: false });
          }
        } catch (error: any) {
          set({ 
            error: error.message || 'Sign up failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      signIn: async (data) => {
        try {
          set({ isLoading: true, error: null });
          
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password
          });
          
          if (authError) {
            throw new Error(authError.message);
          }

          if (authData.user) {
            // Get user profile
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', authData.user.id)
              .single();
              
            if (profileError) {
              console.warn('Profile fetch error:', profileError);
            }
            
            const userData: User = {
              id: authData.user.id,
              email: authData.user.email || '',
              firstName: profile?.first_name || '',
              lastName: profile?.last_name || '',
              role: profile?.role || 'buyer',
              verified: profile?.verified || false,
              avatar: profile?.avatar_url,
              company: profile?.company,
              memberSince: profile?.member_since || new Date().getFullYear().toString()
            };
            
            set({ 
              user: userData, 
              isAuthenticated: true, 
              isLoading: false 
            });
          }
        } catch (error: any) {
          set({ 
            error: error.message || 'Sign in failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      signOut: async () => {
        try {
          set({ isLoading: true });
          await supabase.auth.signOut();
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: null 
          });
        } catch (error: any) {
          set({ 
            error: error.message || 'Sign out failed', 
            isLoading: false 
          });
        }
      },

      resetPassword: async (email: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/#auth?action=resetPassword`,
          });
          
          if (error) {
            throw new Error(error.message);
          }

          set({ isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.message || 'Password reset failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      updatePassword: async (newPassword: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const { error } = await supabase.auth.updateUser({
            password: newPassword
          });
          
          if (error) {
            throw new Error(error.message);
          }

          set({ isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.message || 'Password update failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      updateProfile: async (data: Partial<User>) => {
        try {
          set({ isLoading: true, error: null });
          
          const { user: currentUser } = get();
          if (!currentUser) {
            throw new Error('User not authenticated');
          }
          
          // Update user metadata
          const { error: authError } = await supabase.auth.updateUser({
            data: {
              first_name: data.firstName,
              last_name: data.lastName,
              role: data.role
            }
          });
          
          if (authError) {
            throw authError;
          }
          
          // Update profile in database
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              first_name: data.firstName,
              last_name: data.lastName,
              role: data.role,
              company: data.company,
              avatar_url: data.avatar,
              phone: data.phone,
              updated_at: new Date().toISOString()
            })
            .eq('id', currentUser.id);
          
          if (profileError) {
            throw profileError;
          }
          
          set({ 
            user: { ...currentUser, ...data }, 
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.message || 'Profile update failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      getCurrentUser: async () => {
        try {
          set({ isLoading: true });
          
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            // Get user profile
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
              
            if (profileError) {
              console.warn('Profile fetch error:', profileError);
            }
            
            const userData: User = {
              id: session.user.id,
              email: session.user.email || '',
              firstName: profile?.first_name || '',
              lastName: profile?.last_name || '',
              role: profile?.role || 'buyer',
              verified: profile?.verified || false,
              avatar: profile?.avatar_url,
              company: profile?.company,
              memberSince: profile?.member_since || new Date().getFullYear().toString()
            };
            
            set({ 
              user: userData, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else {
            set({ 
              user: null, 
              isAuthenticated: false, 
              isLoading: false 
            });
          }
        } catch (error) {
          console.error('Get current user error:', error);
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setUser: (user: User | null) => {
        set({ 
          user, 
          isAuthenticated: !!user 
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);