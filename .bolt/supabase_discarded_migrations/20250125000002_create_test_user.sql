
-- Create a test user in auth.users and profiles table
-- This user can be used for testing the authentication system

-- Note: In a real Supabase environment, users are created through the auth API
-- This is just for development/testing purposes

-- Insert into profiles table (the user will be created via the auth API)
INSERT INTO public.profiles (
  id,
  email,
  first_name,
  last_name,
  full_name,
  avatar_url,
  phone,
  date_of_birth,
  gender,
  address,
  city,
  state,
  country,
  postal_code,
  preferences,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'test@nubiago.com',
  'Test',
  'User',
  'Test User',
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  'United States',
  null,
  jsonb_build_object(
    'newsletter_subscription', true,
    'notifications', jsonb_build_object(
      'email', true,
      'sms', false,
      'push', true
    ),
    'privacy', jsonb_build_object(
      'profile_visibility', 'private',
      'data_sharing', false
    )
  ),
  now(),
  now()
) ON CONFLICT (email) DO NOTHING;

-- Create a comment with test user credentials
-- Test User Credentials:
-- Email: test@nubiago.com
-- Password: TestPassword123!
-- 
-- Note: The actual user account needs to be created through Supabase Auth
-- This migration only creates the profile record
