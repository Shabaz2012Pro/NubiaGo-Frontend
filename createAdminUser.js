import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mawpyfzxvjndiquiytxl.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hd3B5Znp4dmpuZGlxdWl5dHhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDYxODk3MCwiZXhwIjoyMDY2MTk0OTcwfQ.0hKz6Rv8HNFdp0xvxU0Ycj4BXUq3g9LF_3XO-oaBzlI';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  try {
    console.log('🔧 Creating admin user...');

    // Create user with admin service role
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'admin@nubiago.com',
      password: 'Admin123!@#',
      email_confirm: true,
      user_metadata: {
        first_name: 'Admin',
        last_name: 'User',
        role: 'admin'
      }
    });

    if (error) {
      console.error('❌ Error creating admin user:', error.message);
      return;
    }

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@nubiago.com');
    console.log('🔑 Password: Admin123!@#');
    console.log('👤 User ID:', data.user?.id);
    console.log('\n🌐 You can now sign in at: http://0.0.0.0:5000');
    console.log('\n⚠️  Please change this password after first login!');

  } catch (error) {
    console.error('❌ Failed to create admin user:', error);
  }
}

createAdminUser();