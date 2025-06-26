import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mawpyfzxvjndiquiytxl.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hd3B5Znp4dmpuZGlxdWl5dHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTg5NzAsImV4cCI6MjA2NjE5NDk3MH0.nA-8Xg2e88Y0rvcvjLCMJD3XLnWVA9aTX4BY1BMKQfY';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials are missing. Please check your .env file.');
}

// Use mock mode to prevent actual Supabase API calls
export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const supabase = createClient<Database>(
  supabaseUrl, 
  supabaseAnonKey, 
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    },
    global: {
      headers: {
        'X-Client-Info': 'nubiago-frontend@1.0.0'
      }
    },
    db: {
      schema: 'public'
    }
  }
);

// Helper function to handle errors
export const handleSupabaseError = (error: Error): never => {
  console.error('Supabase error:', error);
  throw new Error(error.message || 'An error occurred with the database');
};

export default supabase;