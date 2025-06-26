
import { supabase } from '../api/supabaseClient';

export const createTestUser = async () => {
  try {
    console.log('Creating test user...');
    
    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: 'test@nubiago.com',
      password: 'TestPassword123!',
      options: {
        data: {
          first_name: 'Test',
          last_name: 'User',
          full_name: 'Test User'
        }
      }
    });

    if (error) {
      console.error('Error creating test user:', error);
      return { success: false, error: error.message };
    }

    console.log('Test user created successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to create test user:', error);
    return { success: false, error: 'Failed to create test user' };
  }
};

// Function to sign in as test user
export const signInTestUser = async () => {
  try {
    console.log('Signing in test user...');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'test@nubiago.com',
      password: 'TestPassword123!'
    });

    if (error) {
      console.error('Error signing in test user:', error);
      return { success: false, error: error.message };
    }

    console.log('Test user signed in successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to sign in test user:', error);
    return { success: false, error: 'Failed to sign in test user' };
  }
};

// Function to delete test user (cleanup)
export const deleteTestUser = async () => {
  try {
    console.log('Deleting test user...');
    
    // First sign in to get the user
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'test@nubiago.com',
      password: 'TestPassword123!'
    });

    if (signInError) {
      console.error('Error signing in to delete user:', signInError);
      return { success: false, error: signInError.message };
    }

    // Delete the user account
    const { error: deleteError } = await supabase.auth.admin.deleteUser(
      signInData.user.id
    );

    if (deleteError) {
      console.error('Error deleting test user:', deleteError);
      return { success: false, error: deleteError.message };
    }

    console.log('Test user deleted successfully');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete test user:', error);
    return { success: false, error: 'Failed to delete test user' };
  }
};
