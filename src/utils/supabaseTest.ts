
import { supabase } from '../api/supabaseClient';

export const testSupabaseConnection = async () => {
  try {
    console.log('🔗 Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Supabase connection successful!');
    console.log('📊 Profiles table count:', data);
    
    // Test auth
    const { data: { session } } = await supabase.auth.getSession();
    console.log('🔐 Current session:', session ? 'Active' : 'None');
    
    return { success: true, data };
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return { success: false, error: error.message };
  }
};

export const createTestProfile = async () => {
  try {
    console.log('👤 Creating test profile...');
    
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        first_name: 'Test',
        last_name: 'User',
        email: 'test@nubiago.com',
        role: 'buyer'
      })
      .select()
      .single();
    
    if (error) {
      console.error('❌ Failed to create test profile:', error.message);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Test profile created:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Profile creation failed:', error);
    return { success: false, error: error.message };
  }
};
