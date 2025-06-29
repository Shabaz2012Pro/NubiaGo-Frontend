/*
  # Create admin policies

  1. Changes
    - Add admin role to profiles table
    - Create policies for admins to manage all resources
  2. Security
    - Drop existing policies first to avoid conflicts
    - Create new policies for admin access
*/

-- Add admin role to profiles table role check
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('buyer', 'supplier', 'admin'));

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can manage products" ON products;
DROP POLICY IF EXISTS "Admins can manage suppliers" ON suppliers;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;

-- Create policy for admins to read all profiles
CREATE POLICY "Admins can read all profiles" ON profiles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- Create policy for admins to update all profiles
CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- Create policy for admins to read all products
CREATE POLICY "Admins can manage products" ON products
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- Create policy for admins to manage suppliers
CREATE POLICY "Admins can manage suppliers" ON suppliers
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- Create policy for admins to manage categories
CREATE POLICY "Admins can manage categories" ON categories
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );