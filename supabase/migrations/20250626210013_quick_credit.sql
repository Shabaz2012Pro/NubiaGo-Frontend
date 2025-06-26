/*
  # Create categories table

  1. New Tables
    - `categories`
      - `id` (bigint, primary key)
      - `name` (text)
      - `slug` (text)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  2. Security
    - Enable RLS on `categories` table
    - Add policy for public to view categories
*/

CREATE TABLE IF NOT EXISTS categories (
  id bigint PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  TO public
  USING (true);