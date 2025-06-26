/*
  # Add product details

  1. Changes
    - Add additional columns to products table:
      - `original_price` (numeric)
      - `currency` (text, default 'USD')
      - `rating` (numeric, default 0)
      - `reviews` (integer, default 0)
      - `in_stock` (boolean, default true)
      - `min_order` (integer, default 1)
      - `tags` (text array)
      - `is_new` (boolean, default false)
      - `is_featured` (boolean, default false)
      - `specifications` (jsonb)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
*/

-- Add new columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS original_price numeric;
ALTER TABLE products ADD COLUMN IF NOT EXISTS currency text DEFAULT 'USD';
ALTER TABLE products ADD COLUMN IF NOT EXISTS rating numeric DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS reviews integer DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS in_stock boolean DEFAULT true;
ALTER TABLE products ADD COLUMN IF NOT EXISTS min_order integer DEFAULT 1;
ALTER TABLE products ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_new boolean DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS specifications jsonb DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
ALTER TABLE products ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Rename image_url to images (array of images)
ALTER TABLE products RENAME COLUMN image_url TO images;
-- Change images column to text array
ALTER TABLE products ALTER COLUMN images TYPE text[] USING ARRAY[images];