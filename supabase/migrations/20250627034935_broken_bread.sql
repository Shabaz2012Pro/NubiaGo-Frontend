/*
  # Admin Policies Migration
  
  1. Changes
     - Add admin policies to tables with IF NOT EXISTS checks
     - Ensures policies are only created if they don't already exist
     - Provides admin users with full access to manage all data
*/

-- Drop existing policies if they exist and recreate them
DO $$ 
BEGIN
  -- For products table
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage all products') THEN
    DROP POLICY "Admins can manage all products" ON products;
  END IF;
  
  -- For suppliers table
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage all suppliers') THEN
    DROP POLICY "Admins can manage all suppliers" ON suppliers;
  END IF;
  
  -- For categories table
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage all categories') THEN
    DROP POLICY "Admins can manage all categories" ON categories;
  END IF;
  
  -- For profiles table
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage all profiles') THEN
    DROP POLICY "Admins can manage all profiles" ON profiles;
  END IF;
END $$;

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