/*
  # Create recently viewed table

  1. New Tables
    - `recently_viewed`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `product_id` (uuid, references products)
      - `viewed_at` (timestamptz)
  2. Security
    - Enable RLS on `recently_viewed` table
    - Add policies for users to manage their own recently viewed items
*/

-- Create recently_viewed table
CREATE TABLE IF NOT EXISTS recently_viewed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  product_id uuid REFERENCES products NOT NULL,
  viewed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE recently_viewed ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own recently viewed items"
  ON recently_viewed
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own recently viewed items"
  ON recently_viewed
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recently viewed items"
  ON recently_viewed
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recently viewed items"
  ON recently_viewed
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);