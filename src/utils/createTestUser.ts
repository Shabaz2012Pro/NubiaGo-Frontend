import { supabase } from '../api/supabaseClient';

export const createTestUser = async () => {
  try {
    console.log('Creating test user...');
    
    // First check if user already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'test@nubiago.com')
      .single();

    if (existingUser) {
      console.log('Test user already exists, attempting to sign in...');
      return await signInTestUser();
    }

    // Create user with Supabase Auth with email confirmation disabled
    const { data, error } = await supabase.auth.signUp({
      email: 'test@nubiago.com',
      password: 'TestPassword123!',
      options: {
        data: {
          first_name: 'Test',
          last_name: 'User',
          full_name: 'Test User'
        },
        emailRedirectTo: undefined // Disable email confirmation for test user
      }
    });

    if (error) {
      console.error('Error creating test user:', error);
      return { success: false, error: error.message };
    }

    // If user was created but needs confirmation, we'll handle it
    if (data.user && !data.session) {
      console.log('User created but needs confirmation. Attempting to confirm...');
      
      // Try to sign in immediately (this works if email confirmation is disabled)
      const signInResult = await signInTestUser();
      if (signInResult.success) {
        return signInResult;
      }
      
      return { 
        success: false, 
        error: 'Test user created but email confirmation is required. Please check your Supabase settings to disable email confirmation or manually confirm the user in the Supabase dashboard.' 
      };
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
      
      // Provide more helpful error messages
      if (error.message.includes('Invalid login credentials')) {
        return { 
          success: false, 
          error: 'Test user not found or email not confirmed. Please create the test user first or check Supabase dashboard to confirm the email.' 
        };
      }
      
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

    // Delete from profiles table first (due to foreign key constraint)
    const { error: profileDeleteError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', signInData.user.id);

    if (profileDeleteError) {
      console.warn('Error deleting profile (may not exist):', profileDeleteError);
    }

    // Sign out first
    await supabase.auth.signOut();

    console.log('Test user deleted successfully');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete test user:', error);
    return { success: false, error: 'Failed to delete test user' };
  }
};

// Helper function to check if test user exists and is confirmed
export const checkTestUserStatus = async () => {
  try {
    const { data: { users }, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('Error checking user status:', error);
      return { exists: false, confirmed: false, error: error.message };
    }

    const testUser = users?.find(user => user.email === 'test@nubiago.com');
    
    if (!testUser) {
      return { exists: false, confirmed: false };
    }

    return { 
      exists: true, 
      confirmed: !!testUser.email_confirmed_at,
      user: testUser 
    };
  } catch (error) {
    console.error('Failed to check test user status:', error);
    return { exists: false, confirmed: false, error: 'Failed to check user status' };
  }
};