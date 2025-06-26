/*
  # Create suppliers table

  1. New Tables
    - `suppliers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `country` (text)
      - `rating` (numeric)
      - `verified` (boolean)
      - `total_products` (integer)
      - `response_time` (text)
      - `member_since` (text)
      - `logo` (text)
      - `created_at` (timestamptz)
  2. Changes
    - Add `supplier_id` foreign key to products table
  3. Security
    - Enable RLS on `suppliers` table
    - Add policy for public to view suppliers
*/

-- Create suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text,
  rating numeric DEFAULT 0,
  verified boolean DEFAULT false,
  total_products integer DEFAULT 0,
  response_time text,
  member_since text,
  logo text,
  created_at timestamptz DEFAULT now()
);

-- Add supplier_id to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS supplier_id uuid REFERENCES suppliers(id);

-- Enable RLS
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Suppliers are viewable by everyone"
  ON suppliers
  FOR SELECT
  TO public
  USING (true);