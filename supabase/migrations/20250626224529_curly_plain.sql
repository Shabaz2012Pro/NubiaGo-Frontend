/*
  # Create admin user

  1. Changes
    - Add admin role to profiles table
    - Create admin user if not exists
  2. Security
    - Add policy for admins to read all profiles
*/

-- Add admin role to profiles table role check
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('buyer', 'supplier', 'admin'));

-- Create policy for admins to read all profiles
CREATE POLICY IF NOT EXISTS "Admins can read all profiles" ON profiles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- Create policy for admins to update all profiles
CREATE POLICY IF NOT EXISTS "Admins can update all profiles" ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- Create policy for admins to read all products
CREATE POLICY IF NOT EXISTS "Admins can manage products" ON products
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- Create policy for admins to manage suppliers
CREATE POLICY IF NOT EXISTS "Admins can manage suppliers" ON suppliers
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- Create policy for admins to manage categories
CREATE POLICY IF NOT EXISTS "Admins can manage categories" ON categories
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );