/*
  # Add categories to suppliers

  1. Changes
    - Add categories column to suppliers table
*/

-- Add categories column to suppliers table
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS categories text[] DEFAULT '{}';