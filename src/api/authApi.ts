import { supabase, USE_MOCK_DATA } from './supabaseClient';
import { User } from '../types';
import { mockProducts } from './mockData';

// Mock user data
const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'buyer',
    verified: true,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    phone: '+1234567890',
    company: 'Example Corp',
    memberSince: '2023'
  }
];

// Flag to use mock data
const USE_MOCK_DATA = true;

export const authApi = {
  // Sign up with email and password
  register: async (email: string, password: string, firstName: string, lastName: string): Promise<User> => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate registration
        console.log('Registering user:', { email, firstName, lastName });

        // Create a new mock user
        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          firstName,
          lastName,
          role: 'buyer',
          verified: false,
          memberSince: new Date().getFullYear().toString()
        };

        // In a real app, this would be stored in the database
        mockUsers.push(newUser);

        return newUser;
      }

      // Real implementation would use Supabase
      throw new Error('Not implemented');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Sign in with email and password
  login: async (email: string, password: string): Promise<User> => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate login
        console.log('Logging in user:', { email });

        // Find user by email
        const user = mockUsers.find(u => u.email === email);

        if (!user) {
          throw new Error('Invalid email or password');
        }

        return user;
      }

      // Real implementation would use Supabase
      throw new Error('Not implemented');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Sign out
  logout: async (): Promise<void> => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate logout
        console.log('Logging out user');
        return;
      }

      // Real implementation would use Supabase
      throw new Error('Not implemented');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  // Reset password
  forgotPassword: async (email: string): Promise<void> => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate password reset
        console.log('Sending password reset email to:', email);
        return;
      }

      // Real implementation would use Supabase
      throw new Error('Not implemented');
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  },

  // Update password with reset token
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate password update
        console.log('Resetting password with token:', token);
        return;
      }

      // Real implementation would use Supabase
      throw new Error('Not implemented');
    } catch (error) {
      console.error('Password update error:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate profile update
        console.log('Updating user profile:', data);

        // Find the first mock user and update it
        const user = mockUsers[0];

        if (!user) {
          throw new Error('User not found');
        }

        // Update user data
        const updatedUser = {
          ...user,
          ...data
        };

        // Replace the user in the mock data
        mockUsers[0] = updatedUser;

        return updatedUser;
      }

      // Real implementation would use Supabase
      throw new Error('Not implemented');
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },

  // Verify email with token
  verifyEmail: async (token: string): Promise<User> => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate email verification
        console.log('Verifying email with token:', token);

        // Return the first mock user as verified
        const user = mockUsers[0];
        if (user) {
          user.verified = true;
          return user;
        }

        throw new Error('User not found');
      }

      // Real implementation with Supabase
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email'
      });

      if (error) throw error;

      if (!data.user) {
        throw new Error('Verification failed');
      }

      // Update profile verification status
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ verified: true })
        .eq('id', data.user.id);

      if (profileError) {
        console.warn('Profile verification update warning:', profileError);
      }

      // Get updated profile
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (fetchError) throw fetchError;

      return {
        id: profile.id,
        email: profile.email,
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        role: profile.role || 'buyer',
        verified: true,
        memberSince: profile.member_since || new Date().getFullYear().toString()
      };
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  },

  // Resend verification email
  resendVerificationEmail: async (): Promise<void> => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate resending verification email
        console.log('Resending verification email');
        return;
      }

      // Real implementation would use Supabase
      throw new Error('Not implemented');
    } catch (error) {
      console.error('Resend verification email error:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  checkAuth: async (): Promise<User | null> => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate auth check
        console.log('Checking authentication');

        // Return the first mock user
        return mockUsers[0] || null;
      }

      // Real implementation would use Supabase
      return null;
    } catch (error) {
      console.error('Auth check error:', error);
      return null;
    }
  }
};