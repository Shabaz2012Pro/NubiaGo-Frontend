
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService, type AuthUser, type SignUpData, type SignInData } from '../services/authService';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
  getCurrentUser: () => Promise<void>;
  clearError: () => void;
  setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      signUp: async (data: SignUpData) => {
        try {
          set({ isLoading: true, error: null });
          const { user, error } = await authService.signUp(data);
          
          if (error) {
            throw new Error(error);
          }

          set({ 
            user, 
            isAuthenticated: !!user, 
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.message || 'Sign up failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      signIn: async (data: SignInData) => {
        try {
          set({ isLoading: true, error: null });
          const { user, error } = await authService.signIn(data);
          
          if (error) {
            throw new Error(error);
          }

          set({ 
            user, 
            isAuthenticated: !!user, 
            isLoading: false 
          });
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
          await authService.signOut();
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
          const { error } = await authService.resetPassword(email);
          
          if (error) {
            throw new Error(error);
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
          const { error } = await authService.updatePassword(newPassword);
          
          if (error) {
            throw new Error(error);
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

      updateProfile: async (data: Partial<AuthUser>) => {
        try {
          set({ isLoading: true, error: null });
          const { user, error } = await authService.updateProfile(data);
          
          if (error) {
            throw new Error(error);
          }

          set({ 
            user, 
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
          const user = await authService.getCurrentUser();
          set({ 
            user, 
            isAuthenticated: !!user, 
            isLoading: false 
          });
        } catch (error: any) {
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

      setUser: (user: AuthUser | null) => {
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
