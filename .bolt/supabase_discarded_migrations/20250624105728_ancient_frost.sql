/*
  # Add is_featured column to products table
  
  This migration adds the missing is_featured column that the application
  is trying to query but doesn't exist in the database schema.
*/

-- Add is_featured column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;

-- Create an index for better performance when querying featured products
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);

-- Mark some existing products as featured (optional - you can customize this)
-- This will mark the first 8 products as featured for demo purposes
UPDATE products 
SET is_featured = true 
WHERE id IN (
    SELECT id FROM products 
    ORDER BY created_at DESC
    LIMIT 8
);

-- Add a comment to document the column
COMMENT ON COLUMN products.is_featured IS 'Indicates whether this product should be featured on the homepage';