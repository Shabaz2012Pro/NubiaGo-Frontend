/*
  # Fix Admin Policies and Role Constraints

  1. Changes
     - Update profiles table role check constraint to include 'admin' role
     - Create admin policies for profiles, products, suppliers, and categories tables with existence checks
  
  2. Security
     - Adds policies for admins to manage various resources
     - Ensures proper access control for administrative functions
*/

-- Add admin role to profiles table role check
DO $$ 
BEGIN
  -- Drop the constraint if it exists
  ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
  
  -- Add the constraint with admin role included
  ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
    CHECK (role IN ('buyer', 'supplier', 'admin'));
END $$;

-- Create policy for admins to read all profiles (if it doesn't exist)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Admins can read all profiles'
  ) THEN
    CREATE POLICY "Admins can read all profiles" ON profiles
      FOR SELECT
      TO authenticated
      USING (
        auth.uid() IN (
          SELECT id FROM profiles WHERE role = 'admin'
        )
      );
  END IF;
END $$;

-- Create policy for admins to update all profiles (if it doesn't exist)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Admins can update all profiles'
  ) THEN
    CREATE POLICY "Admins can update all profiles" ON profiles
      FOR UPDATE
      TO authenticated
      USING (
        auth.uid() IN (
          SELECT id FROM profiles WHERE role = 'admin'
        )
      );
  END IF;
END $$;

-- Create policy for admins to manage products (if it doesn't exist)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' AND policyname = 'Admins can manage products'
  ) THEN
    CREATE POLICY "Admins can manage products" ON products
      FOR ALL
      TO authenticated
      USING (
        auth.uid() IN (
          SELECT id FROM profiles WHERE role = 'admin'
        )
      );
  END IF;
END $$;

-- Create policy for admins to manage suppliers (if it doesn't exist)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'suppliers' AND policyname = 'Admins can manage suppliers'
  ) THEN
    CREATE POLICY "Admins can manage suppliers" ON suppliers
      FOR ALL
      TO authenticated
      USING (
        auth.uid() IN (
          SELECT id FROM profiles WHERE role = 'admin'
        )
      );
  END IF;
END $$;

-- Create policy for admins to manage categories (if it doesn't exist)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'categories' AND policyname = 'Admins can manage categories'
  ) THEN
    CREATE POLICY "Admins can manage categories" ON categories
      FOR ALL
      TO authenticated
      USING (
        auth.uid() IN (
          SELECT id FROM profiles WHERE role = 'admin'
        )
      );
  END IF;
END $$;