
import { supabase } from '../api/supabaseClient';
import { enterpriseApiClient } from './enterpriseApiClient';
import { validateEmail, validatePassword, generateSecureToken, hashData } from '../utils/security';
import type { User, AuthError, AuthResponse } from '../types';

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  acceptTerms: boolean;
  marketingOptIn?: boolean;
}

export interface SignInData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  preferences?: {
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
}

class AuthService {
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000;

  // Enhanced sign up with validation and security
  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      // Validate input data
      if (!validateEmail(data.email)) {
        throw new Error('Invalid email format');
      }

      const passwordValidation = validatePassword(data.password);
      if (!passwordValidation.isValid) {
        throw new Error(`Password requirements not met: ${passwordValidation.errors.join(', ')}`);
      }

      if (!data.acceptTerms) {
        throw new Error('You must accept the terms and conditions');
      }

      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', data.email.toLowerCase())
        .single();

      if (existingUser) {
        throw new Error('An account with this email already exists');
      }

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email.toLowerCase(),
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phoneNumber,
          }
        }
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error('Failed to create user account');
      }

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: data.email.toLowerCase(),
          first_name: data.firstName,
          last_name: data.lastName,
          phone_number: data.phoneNumber,
          role: 'customer',
          is_active: true,
          marketing_opt_in: data.marketingOptIn || false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Don't throw here as auth user was created successfully
      }

      return {
        user: authData.user,
        session: authData.session,
        error: null
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return {
        user: null,
        session: null,
        error: error instanceof Error ? error : new Error('Sign up failed')
      };
    }
  }

  // Enhanced sign in with security measures
  async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      if (!validateEmail(data.email)) {
        throw new Error('Invalid email format');
      }

      // Check rate limiting
      const rateLimitKey = `signin_${await hashData(data.email)}`;
      const lastAttempt = localStorage.getItem(rateLimitKey);
      if (lastAttempt) {
        const timeSinceLastAttempt = Date.now() - parseInt(lastAttempt);
        if (timeSinceLastAttempt < 1000) { // 1 second between attempts
          throw new Error('Please wait before trying again');
        }
      }

      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email.toLowerCase(),
        password: data.password,
      });

      localStorage.setItem(rateLimitKey, Date.now().toString());

      if (error) {
        throw new Error(error.message);
      }

      if (!authData.user) {
        throw new Error('Authentication failed');
      }

      // Check if user profile exists and is active
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError || !profile) {
        throw new Error('User profile not found');
      }

      if (!profile.is_active) {
        await this.signOut();
        throw new Error('Account is deactivated. Please contact support.');
      }

      // Update last login
      await supabase
        .from('profiles')
        .update({
          last_login_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', authData.user.id);

      return {
        user: authData.user,
        session: authData.session,
        error: null
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return {
        user: null,
        session: null,
        error: error instanceof Error ? error : new Error('Sign in failed')
      };
    }
  }

  // Enhanced sign out
  async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      
      // Clear local storage
      localStorage.removeItem('cart');
      localStorage.removeItem('wishlist');
      sessionStorage.clear();
      
      if (error) {
        throw error;
      }

      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { 
        error: error instanceof Error ? error : new Error('Sign out failed') 
      };
    }
  }

  // Get current user with profile
  async getCurrentUser(): Promise<{ user: User | null; error: AuthError | null }> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        return { user: null, error: authError };
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.warn('Profile fetch error:', profileError);
        return { user: user as User, error: null };
      }

      return {
        user: {
          ...user,
          profile
        } as User,
        error: null
      };
    } catch (error) {
      console.error('Get current user error:', error);
      return {
        user: null,
        error: error instanceof Error ? error : new Error('Failed to get current user')
      };
    }
  }

  // Update user profile
  async updateProfile(profileData: Partial<ProfileData>): Promise<{ error: AuthError | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const updateData: any = {
        updated_at: new Date().toISOString()
      };

      if (profileData.firstName) updateData.first_name = profileData.firstName;
      if (profileData.lastName) updateData.last_name = profileData.lastName;
      if (profileData.phoneNumber) updateData.phone_number = profileData.phoneNumber;
      if (profileData.dateOfBirth) updateData.date_of_birth = profileData.dateOfBirth;
      if (profileData.address) updateData.address = profileData.address;
      if (profileData.preferences) updateData.preferences = profileData.preferences;

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      return { error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        error: error instanceof Error ? error : new Error('Failed to update profile')
      };
    }
  }

  // Password reset
  async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    try {
      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        throw error;
      }

      return { error: null };
    } catch (error) {
      console.error('Password reset error:', error);
      return {
        error: error instanceof Error ? error : new Error('Failed to send reset email')
      };
    }
  }

  // Update password
  async updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
    try {
      const passwordValidation = validatePassword(newPassword);
      if (!passwordValidation.isValid) {
        throw new Error(`Password requirements not met: ${passwordValidation.errors.join(', ')}`);
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        throw error;
      }

      return { error: null };
    } catch (error) {
      console.error('Update password error:', error);
      return {
        error: error instanceof Error ? error : new Error('Failed to update password')
      };
    }
  }

  // Delete account
  async deleteAccount(): Promise<{ error: AuthError | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Soft delete - mark as inactive
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          is_active: false,
          deleted_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (profileError) {
        throw profileError;
      }

      // Sign out user
      await this.signOut();

      return { error: null };
    } catch (error) {
      console.error('Delete account error:', error);
      return {
        error: error instanceof Error ? error : new Error('Failed to delete account')
      };
    }
  }

  // Session management
  getSession() {
    return supabase.auth.getSession();
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

export const authService = new AuthService();
