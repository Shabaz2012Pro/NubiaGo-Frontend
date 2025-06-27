/*
  # Admin Policies for Database Tables
  
  1. New Policies
    - Admin policies for products, suppliers, categories, and profiles tables
    - Allows admin users to perform all operations on these tables
  
  2. Security
    - Restricts admin operations to authenticated users with admin role
    - Uses EXISTS subquery to verify admin role
*/

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