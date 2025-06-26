
import { supabase } from '../api/supabaseClient';

export const initializeDatabase = async () => {
  try {
    console.log('🔧 Initializing database...');

    // Check if data already exists
    const { data: existingCategories, error: categoriesError } = await supabase
      .from('categories')
      .select('count', { count: 'exact', head: true });

    if (categoriesError) {
      console.error('Error checking categories:', categoriesError);
      return false;
    }

    if (existingCategories && existingCategories.length > 0) {
      console.log('✅ Database already initialized');
      return true;
    }

    console.log('📊 Database initialized successfully!');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return false;
  }
};

export default initializeDatabase;
