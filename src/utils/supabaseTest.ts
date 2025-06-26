import { supabase } from '../api/supabaseClient';

export const testSupabaseConnection = async () => {
  try {
    console.log('🔗 Testing Supabase connection...');
    
    // Test basic connection using the profiles table
    const { data, error } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Supabase connection successful!');
    
    // Test auth
    const { data: { session } } = await supabase.auth.getSession();
    console.log('🔐 Current session:', session ? 'Active' : 'None');
    
    return { success: true, data };
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const createTestProfile = async () => {
  try {
    console.log('👤 Creating test user...');
    
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
      console.error('❌ Failed to create test user:', error.message);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Test user created:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ User creation failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const fetchSupabaseData = async () => {
  try {
    console.log('📊 Fetching data from Supabase...');
    
    // Fetch products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(10);
    
    if (productsError) {
      console.error('❌ Failed to fetch products:', productsError.message);
      return { success: false, error: productsError.message };
    }
    
    // Fetch profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(10);
    
    if (profilesError) {
      console.error('❌ Failed to fetch profiles:', profilesError.message);
      return { success: false, error: profilesError.message };
    }
    
    console.log('✅ Data fetched successfully!');
    console.log(`📦 Products: ${products.length}`);
    console.log(`👥 Profiles: ${profiles.length}`);
    
    return { 
      success: true, 
      data: { 
        products, 
        profiles 
      } 
    };
  } catch (error) {
    console.error('❌ Data fetch failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};