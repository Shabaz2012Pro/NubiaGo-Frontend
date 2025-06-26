import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';
import { User } from '../../types';
import useQueryErrorHandler from '../../hooks/useQueryErrorHandler';
import { useUIStore } from '../../store/useUIStore';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  session: () => [...authKeys.all, 'session'] as const,
};

// Hook for checking if user is authenticated
export function useAuthCheck() {
  const handleError = useQueryErrorHandler();
  
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      if (!data.session) return null;
      
      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.session.user.id)
        .single();
      
      if (profileError) throw profileError;
      
      return {
        id: data.session.user.id,
        email: data.session.user.email,
        firstName: profile.first_name,
        lastName: profile.last_name,
        avatar: profile.avatar_url,
        phone: profile.phone,
        company: profile.company,
        role: profile.role || 'buyer',
        verified: profile.is_verified
      } as User;
    },
    onError: (error: Error) => handleError(error, authKeys.session()),
    retry: false,
    staleTime: Infinity, // Don't refetch automatically
  });
}

// Hook for user login
export function useLogin() {
  const queryClient = useQueryClient();
  const handleError = useQueryErrorHandler();
  const { addNotification } = useUIStore();
  
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (profileError) throw profileError;
      
      return {
        id: data.user.id,
        email: data.user.email,
        firstName: profile.first_name,
        lastName: profile.last_name,
        avatar: profile.avatar_url,
        phone: profile.phone,
        company: profile.company,
        role: profile.role || 'buyer',
        verified: profile.is_verified
      } as User;
    },
    onSuccess: (user) => {
      // Update auth user in the cache
      queryClient.setQueryData(authKeys.user(), user);
      
      // Show success notification
      addNotification({
        type: 'success',
        message: 'Successfully logged in',
        autoClose: true,
        duration: 3000,
      });
      
      // Invalidate any queries that depend on authentication status
      queryClient.invalidateQueries({ queryKey: authKeys.session() });
    },
    onError: (error: Error) => {
      handleError(error, authKeys.all);
    },
  });
}

// Hook for user registration
export function useRegister() {
  const queryClient = useQueryClient();
  const handleError = useQueryErrorHandler();
  const { addNotification } = useUIStore();
  
  return useMutation({
    mutationFn: async ({ 
      email, 
      password, 
      firstName, 
      lastName 
    }: { 
      email: string; 
      password: string; 
      firstName: string; 
      lastName: string; 
    }) => {
      // Register user
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
      
      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user!.id,
          first_name: firstName,
          last_name: lastName,
          email: email,
          is_verified: false,
          role: 'buyer'
        });
      
      if (profileError) throw profileError;
      
      return {
        id: data.user!.id,
        email,
        firstName,
        lastName,
        role: 'buyer',
        verified: false
      } as User;
    },
    onSuccess: (user) => {
      // Update auth user in the cache
      queryClient.setQueryData(authKeys.user(), user);
      
      // Show success notification
      addNotification({
        type: 'success',
        message: 'Account created successfully',
        autoClose: true,
        duration: 3000,
      });
      
      // Invalidate any queries that depend on authentication status
      queryClient.invalidateQueries({ queryKey: authKeys.session() });
    },
    onError: (error: Error) => {
      handleError(error, authKeys.all);
    },
  });
}

// Hook for user logout
export function useLogout() {
  const queryClient = useQueryClient();
  const { addNotification } = useUIStore();
  
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      // Clear auth user from the cache
      queryClient.setQueryData(authKeys.user(), null);
      
      // Show success notification
      addNotification({
        type: 'success',
        message: 'Successfully logged out',
        autoClose: true,
        duration: 3000,
      });
      
      // Invalidate any queries that depend on authentication status
      queryClient.invalidateQueries({ queryKey: authKeys.session() });
      
      // Optionally reset the entire cache if needed
      // queryClient.clear();
    },
  });
}

// Hook for password reset request
export function useForgotPassword() {
  const handleError = useQueryErrorHandler();
  const { addNotification } = useUIStore();
  
  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/#auth?action=resetPassword`
      });
      
      if (error) throw error;
    },
    onSuccess: () => {
      // Show success notification
      addNotification({
        type: 'success',
        message: 'Password reset instructions sent to your email',
        autoClose: true,
        duration: 5000,
      });
    },
    onError: (error: Error) => {
      handleError(error, authKeys.all);
    },
  });
}

// Hook for password reset
export function useResetPassword() {
  const handleError = useQueryErrorHandler();
  const { addNotification } = useUIStore();
  
  return useMutation({
    mutationFn: async ({ token, newPassword }: { token: string; newPassword: string }) => {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
    },
    onSuccess: () => {
      // Show success notification
      addNotification({
        type: 'success',
        message: 'Password has been reset successfully',
        autoClose: true,
        duration: 5000,
      });
    },
    onError: (error: Error) => {
      handleError(error, authKeys.all);
    },
  });
}

// Hook for updating user profile
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const handleError = useQueryErrorHandler();
  const { addNotification } = useUIStore();
  
  return useMutation({
    mutationFn: async (data: Partial<User>) => {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('Not authenticated');
      
      // Update auth metadata if needed
      if (data.firstName || data.lastName || data.email) {
        const { error: authError } = await supabase.auth.updateUser({
          email: data.email,
          data: {
            first_name: data.firstName,
            last_name: data.lastName
          }
        });
        
        if (authError) throw authError;
      }
      
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          avatar_url: data.avatar,
          phone: data.phone,
          company: data.company,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (profileError) throw profileError;
      
      // Get updated profile
      const { data: profile, error: getProfileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (getProfileError) throw getProfileError;
      
      return {
        id: user.id,
        email: user.email,
        firstName: profile.first_name,
        lastName: profile.last_name,
        avatar: profile.avatar_url,
        phone: profile.phone,
        company: profile.company,
        role: profile.role,
        verified: profile.is_verified
      } as User;
    },
    onMutate: async (newUserData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: authKeys.user() });
      
      // Snapshot the previous user data
      const previousUser = queryClient.getQueryData<User>(authKeys.user());
      
      // Optimistically update the user data
      if (previousUser) {
        queryClient.setQueryData(authKeys.user(), {
          ...previousUser,
          ...newUserData,
        });
      }
      
      return { previousUser };
    },
    onSuccess: (updatedUser) => {
      // Update the cache with the response from the server
      queryClient.setQueryData(authKeys.user(), updatedUser);
      
      // Show success notification
      addNotification({
        type: 'success',
        message: 'Profile updated successfully',
        autoClose: true,
        duration: 3000,
      });
    },
    onError: (error: Error, newUserData, context) => {
      // Revert to the previous user data on error
      if (context?.previousUser) {
        queryClient.setQueryData(authKeys.user(), context.previousUser);
      }
      
      handleError(error, authKeys.user());
    },
  });
}

// Hook for email verification
export function useVerifyEmail() {
  const queryClient = useQueryClient();
  const handleError = useQueryErrorHandler();
  const { addNotification } = useUIStore();
  
  return useMutation({
    mutationFn: async (token: string) => {
      // In a real app, this would verify the token
      // For now, we'll just update the user's verified status
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('Not authenticated');
      
      // Update profile
      const { error } = await supabase
        .from('profiles')
        .update({
          is_verified: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Get updated profile
      const { data: profile, error: getProfileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (getProfileError) throw getProfileError;
      
      return {
        id: user.id,
        email: user.email,
        firstName: profile.first_name,
        lastName: profile.last_name,
        avatar: profile.avatar_url,
        phone: profile.phone,
        company: profile.company,
        role: profile.role,
        verified: profile.is_verified
      } as User;
    },
    onSuccess: (updatedUser) => {
      // Update the cache with the response from the server
      queryClient.setQueryData(authKeys.user(), updatedUser);
      
      // Show success notification
      addNotification({
        type: 'success',
        message: 'Email verified successfully',
        autoClose: true,
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      handleError(error, authKeys.user());
    },
  });
}

// Hook for resending verification email
export function useResendVerificationEmail() {
  const handleError = useQueryErrorHandler();
  const { addNotification } = useUIStore();
  
  return useMutation({
    mutationFn: async () => {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('Not authenticated');
      
      // In a real app, this would send a verification email
      // For now, we'll just simulate it
      console.log('Resending verification email to:', user.email);
    },
    onSuccess: () => {
      // Show success notification
      addNotification({
        type: 'success',
        message: 'Verification email sent',
        autoClose: true,
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      handleError(error, authKeys.user());
    },
  });
}

export default {
  useAuthCheck,
  useLogin,
  useRegister,
  useLogout,
  useForgotPassword,
  useResetPassword,
  useUpdateProfile,
  useVerifyEmail,
  useResendVerificationEmail,
};