import { supabase } from '../api/supabaseClient';

export const createAdminUser = async () => {
  try {
    console.log('Creating admin user...');
    
    // First check if admin user already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'admin@nubiago.com')
      .eq('role', 'admin')
      .single();

    if (existingUser) {
      console.log('Admin user already exists, attempting to sign in...');
      return await signInAdminUser();
    }

    // Create admin user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: 'admin@nubiago.com',
      password: 'Admin123!@#',
      options: {
        data: {
          first_name: 'Admin',
          last_name: 'User',
          role: 'admin'
        },
        emailRedirectTo: `${window.location.origin}/#auth?action=verifyEmail`
      }
    });

    if (error) {
      console.error('Error creating admin user:', error);
      return { success: false, error: error.message };
    }

    // If user was created but needs confirmation, we'll handle it
    if (data.user && !data.session) {
      console.log('Admin user created but needs confirmation. Attempting to confirm...');
      
      // Try to update the user's role directly in the profiles table
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', data.user.id);
        
      if (updateError) {
        console.warn('Could not update admin role:', updateError);
      }
      
      // Try to sign in immediately (this works if email confirmation is disabled)
      const signInResult = await signInAdminUser();
      if (signInResult.success) {
        return signInResult;
      }
      
      return { 
        success: true, 
        message: 'Admin user created! Please check email for confirmation or sign in with admin@nubiago.com and Admin123!@#' 
      };
    }

    console.log('Admin user created successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to create admin user:', error);
    return { success: false, error: 'Failed to create admin user' };
  }
};

// Function to sign in as admin user
export const signInAdminUser = async () => {
  try {
    console.log('Signing in admin user...');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@nubiago.com',
      password: 'Admin123!@#'
    });

    if (error) {
      console.error('Error signing in admin user:', error);
      
      // Provide more helpful error messages
      if (error.message.includes('Invalid login credentials')) {
        return { 
          success: false, 
          error: 'Admin user not found or email not confirmed. Please create the admin user first or check Supabase dashboard to confirm the email.' 
        };
      }
      
      return { success: false, error: error.message };
    }

    // Verify the user has admin role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();
      
    if (profileError) {
      console.error('Error fetching admin profile:', profileError);
      return { success: false, error: 'Could not verify admin role' };
    }
    
    if (profile.role !== 'admin') {
      console.error('User does not have admin role');
      
      // Try to update the role
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', data.user.id);
        
      if (updateError) {
        console.error('Could not update to admin role:', updateError);
        return { success: false, error: 'User does not have admin privileges and could not be updated' };
      }
      
      console.log('Updated user to admin role');
    }

    console.log('Admin user signed in successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to sign in admin user:', error);
    return { success: false, error: 'Failed to sign in admin user' };
  }
};

// Function to check if admin user exists and is confirmed
export const checkAdminUserStatus = async () => {
  try {
    // Try to sign in as admin user
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@nubiago.com',
      password: 'Admin123!@#'
    });
    
    if (error) {
      console.error('Error checking admin status:', error);
      return { exists: false, confirmed: false, error: error.message };
    }

    // If we can sign in, check if the user has admin role
    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();
        
      if (profileError) {
        console.error('Error fetching admin profile:', profileError);
        
        // Sign out immediately
        await supabase.auth.signOut();
        
        return { 
          exists: true, 
          confirmed: true,
          isAdmin: false,
          error: 'Could not verify admin role' 
        };
      }
      
      const isAdmin = profile.role === 'admin';
      
      // Sign out immediately
      await supabase.auth.signOut();
      
      return { 
        exists: true, 
        confirmed: true,
        isAdmin,
        user: data.user 
      };
    }

    return { exists: false, confirmed: false };
  } catch (error) {
    console.error('Failed to check admin user status:', error);
    return { exists: false, confirmed: false, error: 'Failed to check admin status' };
  }
};