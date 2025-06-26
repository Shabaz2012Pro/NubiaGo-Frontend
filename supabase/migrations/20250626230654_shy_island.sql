/*
  # Fix admin policies

  1. Security
    - Drop existing admin policies if they exist
    - Create policies for admins to manage all tables
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can manage all products" ON products;
DROP POLICY IF EXISTS "Admins can manage all suppliers" ON suppliers;
DROP POLICY IF EXISTS "Admins can manage all categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;

-- Create policy for admins to manage all products
CREATE POLICY "Admins can manage all products" ON products
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create policy for admins to manage all suppliers
CREATE POLICY "Admins can manage all suppliers" ON suppliers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create policy for admins to manage all categories
CREATE POLICY "Admins can manage all categories" ON categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create policy for admins to manage all profiles
CREATE POLICY "Admins can manage all profiles" ON profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );