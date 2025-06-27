/*
  # Create User Addresses Schema

  1. New Tables
    - `user_addresses` - Stores user shipping and billing addresses
  
  2. Security
    - Enable RLS on user_addresses table
    - Add policies for proper access control
    
  3. Changes
    - Added support for multiple addresses per user
    - Added address validation and formatting
    - Added default address selection
*/

-- Create user_addresses table
CREATE TABLE IF NOT EXISTS user_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  address_type TEXT NOT NULL CHECK (address_type IN ('shipping', 'billing', 'both')),
  is_default BOOLEAN DEFAULT false,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company TEXT,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT,
  postal_code TEXT,
  country TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  delivery_instructions TEXT,
  is_validated BOOLEAN DEFAULT false,
  formatted_address TEXT,
  coordinates POINT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for faster address retrieval
CREATE INDEX IF NOT EXISTS user_addresses_user_id_idx ON user_addresses(user_id);
CREATE INDEX IF NOT EXISTS user_addresses_address_type_idx ON user_addresses(address_type);

-- Enable RLS on user_addresses
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;

-- Create policies for user_addresses
CREATE POLICY "Users can view their own addresses" 
  ON user_addresses FOR SELECT 
  TO authenticated 
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all addresses" 
  ON user_addresses FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can insert their own addresses" 
  ON user_addresses FOR INSERT 
  TO authenticated 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own addresses" 
  ON user_addresses FOR UPDATE 
  TO authenticated 
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own addresses" 
  ON user_addresses FOR DELETE 
  TO authenticated 
  USING (user_id = auth.uid());

-- Create function to update user_addresses updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_addresses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update user_addresses updated_at timestamp
CREATE TRIGGER update_user_addresses_updated_at
BEFORE UPDATE ON user_addresses
FOR EACH ROW
EXECUTE FUNCTION update_user_addresses_updated_at();

-- Create function to ensure only one default address per type per user
CREATE OR REPLACE FUNCTION ensure_one_default_address()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_default THEN
    UPDATE user_addresses
    SET is_default = false
    WHERE user_id = NEW.user_id
      AND address_type = NEW.address_type
      AND id != NEW.id
      AND is_default = true;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to ensure only one default address per type per user
CREATE TRIGGER ensure_one_default_address
BEFORE INSERT OR UPDATE OF is_default ON user_addresses
FOR EACH ROW
WHEN (NEW.is_default = true)
EXECUTE FUNCTION ensure_one_default_address();

-- Create function to format address
CREATE OR REPLACE FUNCTION format_address()
RETURNS TRIGGER AS $$
BEGIN
  NEW.formatted_address := CONCAT_WS(', ',
    NULLIF(CONCAT_WS(' ', NEW.address_line1, NEW.address_line2), ''),
    NEW.city,
    NULLIF(CONCAT_WS(' ', NEW.state, NEW.postal_code), ''),
    NEW.country
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to format address
CREATE TRIGGER format_address
BEFORE INSERT OR UPDATE OF address_line1, address_line2, city, state, postal_code, country ON user_addresses
FOR EACH ROW
EXECUTE FUNCTION format_address();