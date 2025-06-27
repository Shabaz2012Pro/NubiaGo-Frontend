/*
  # Add admin role and policies

  1. Changes
    - Add admin role to profiles table
    - Create admin-specific policies
  2. Security
    - Add policies for admins to manage all resources
*/

-- Create policy for admins to manage all products
CREATE POLICY IF NOT EXISTS "Admins can manage all products" ON products
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create policy for admins to manage all suppliers
CREATE POLICY IF NOT EXISTS "Admins can manage all suppliers" ON suppliers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create policy for admins to manage all categories
CREATE POLICY IF NOT EXISTS "Admins can manage all categories" ON categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create policy for admins to manage all profiles
CREATE POLICY IF NOT EXISTS "Admins can manage all profiles" ON profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );