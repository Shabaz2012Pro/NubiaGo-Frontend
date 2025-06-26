/*
  # Add is_featured column to products table
  
  1. Changes
     - Adds is_featured boolean column to products table with default value of false
     - Creates an index on is_featured for better query performance
     - Updates some existing products to be featured for demo purposes
     - Adds a comment to document the column purpose
*/

-- Add is_featured column to products table if it doesn't exist
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;

-- Create an index for better performance when querying featured products
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);

-- Mark some existing products as featured (optional - for demo purposes)
UPDATE products 
SET is_featured = true 
WHERE id IN (
    SELECT id FROM products 
    ORDER BY created_at DESC
    LIMIT 8
);

-- Add a comment to document the column
COMMENT ON COLUMN products.is_featured IS 'Indicates whether this product should be featured on the homepage';