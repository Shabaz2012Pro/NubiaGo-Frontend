/*
  # Create Product Variants Schema

  1. New Tables
    - `product_variants` - Stores product variants (size, color, etc.)
    - `variant_options` - Stores variant option types (size, color, etc.)
    - `variant_option_values` - Stores variant option values (S, M, L, Red, Blue, etc.)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
    
  3. Changes
    - Added comprehensive product variant system
    - Added inventory tracking per variant
    - Added variant image support
*/

-- Create variant options table (e.g., Size, Color)
CREATE TABLE IF NOT EXISTS variant_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default variant options
INSERT INTO variant_options (name, display_name, sort_order) VALUES
  ('size', 'Size', 1),
  ('color', 'Color', 2),
  ('material', 'Material', 3),
  ('style', 'Style', 4)
ON CONFLICT (name) DO NOTHING;

-- Create variant option values table (e.g., S, M, L, Red, Blue)
CREATE TABLE IF NOT EXISTS variant_option_values (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  option_id UUID NOT NULL REFERENCES variant_options(id) ON DELETE CASCADE,
  value TEXT NOT NULL,
  display_value TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(option_id, value)
);

-- Insert default variant option values
INSERT INTO variant_option_values (option_id, value, display_value, sort_order) VALUES
  ((SELECT id FROM variant_options WHERE name = 'size'), 'xs', 'XS', 1),
  ((SELECT id FROM variant_options WHERE name = 'size'), 's', 'S', 2),
  ((SELECT id FROM variant_options WHERE name = 'size'), 'm', 'M', 3),
  ((SELECT id FROM variant_options WHERE name = 'size'), 'l', 'L', 4),
  ((SELECT id FROM variant_options WHERE name = 'size'), 'xl', 'XL', 5),
  ((SELECT id FROM variant_options WHERE name = 'size'), '2xl', '2XL', 6),
  ((SELECT id FROM variant_options WHERE name = 'color'), 'black', 'Black', 1),
  ((SELECT id FROM variant_options WHERE name = 'color'), 'white', 'White', 2),
  ((SELECT id FROM variant_options WHERE name = 'color'), 'red', 'Red', 3),
  ((SELECT id FROM variant_options WHERE name = 'color'), 'blue', 'Blue', 4),
  ((SELECT id FROM variant_options WHERE name = 'color'), 'green', 'Green', 5)
ON CONFLICT (option_id, value) DO NOTHING;

-- Create product variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku TEXT,
  price NUMERIC(10, 2),
  compare_at_price NUMERIC(10, 2),
  inventory_quantity INTEGER DEFAULT 0,
  is_in_stock BOOLEAN DEFAULT true,
  weight NUMERIC(10, 2),
  dimensions JSONB,
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create product variant options table (junction table)
CREATE TABLE IF NOT EXISTS product_variant_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id UUID NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
  option_id UUID NOT NULL REFERENCES variant_options(id) ON DELETE CASCADE,
  option_value_id UUID NOT NULL REFERENCES variant_option_values(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(variant_id, option_id)
);

-- Create product options table (to define which options a product has)
CREATE TABLE IF NOT EXISTS product_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  option_id UUID NOT NULL REFERENCES variant_options(id) ON DELETE CASCADE,
  is_required BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(product_id, option_id)
);

-- Enable RLS on all tables
ALTER TABLE variant_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE variant_option_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variant_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_options ENABLE ROW LEVEL SECURITY;

-- Create policies for variant_options
CREATE POLICY "Everyone can view variant options" 
  ON variant_options FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage variant options" 
  ON variant_options FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for variant_option_values
CREATE POLICY "Everyone can view variant option values" 
  ON variant_option_values FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage variant option values" 
  ON variant_option_values FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for product_variants
CREATE POLICY "Everyone can view product variants" 
  ON product_variants FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage product variants" 
  ON product_variants FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for product_variant_options
CREATE POLICY "Everyone can view product variant options" 
  ON product_variant_options FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage product variant options" 
  ON product_variant_options FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for product_options
CREATE POLICY "Everyone can view product options" 
  ON product_options FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage product options" 
  ON product_options FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create function to update product_variants updated_at timestamp
CREATE OR REPLACE FUNCTION update_product_variants_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update product_variants updated_at timestamp
CREATE TRIGGER update_product_variants_updated_at
BEFORE UPDATE ON product_variants
FOR EACH ROW
EXECUTE FUNCTION update_product_variants_updated_at();

-- Create function to update variant_options updated_at timestamp
CREATE OR REPLACE FUNCTION update_variant_options_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update variant_options updated_at timestamp
CREATE TRIGGER update_variant_options_updated_at
BEFORE UPDATE ON variant_options
FOR EACH ROW
EXECUTE FUNCTION update_variant_options_updated_at();

-- Create function to update variant_option_values updated_at timestamp
CREATE OR REPLACE FUNCTION update_variant_option_values_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update variant_option_values updated_at timestamp
CREATE TRIGGER update_variant_option_values_updated_at
BEFORE UPDATE ON variant_option_values
FOR EACH ROW
EXECUTE FUNCTION update_variant_option_values_updated_at();

-- Create function to update product updated_at when variants change
CREATE OR REPLACE FUNCTION update_product_on_variant_change()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET updated_at = now()
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update product updated_at when variants change
CREATE TRIGGER update_product_on_variant_insert
AFTER INSERT ON product_variants
FOR EACH ROW
EXECUTE FUNCTION update_product_on_variant_change();

CREATE TRIGGER update_product_on_variant_update
AFTER UPDATE ON product_variants
FOR EACH ROW
EXECUTE FUNCTION update_product_on_variant_change();

CREATE TRIGGER update_product_on_variant_delete
AFTER DELETE ON product_variants
FOR EACH ROW
EXECUTE FUNCTION update_product_on_variant_change();

-- Create function to update product in_stock status based on variants
CREATE OR REPLACE FUNCTION update_product_stock_status()
RETURNS TRIGGER AS $$
DECLARE
  has_variants BOOLEAN;
  any_in_stock BOOLEAN;
BEGIN
  -- Check if product has variants
  SELECT EXISTS (
    SELECT 1 FROM product_variants 
    WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
  ) INTO has_variants;
  
  -- If product has variants, update in_stock based on variants
  IF has_variants THEN
    SELECT EXISTS (
      SELECT 1 FROM product_variants 
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
      AND is_in_stock = true
    ) INTO any_in_stock;
    
    UPDATE products
    SET in_stock = any_in_stock
    WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update product in_stock status based on variants
CREATE TRIGGER update_product_stock_status_insert
AFTER INSERT ON product_variants
FOR EACH ROW
EXECUTE FUNCTION update_product_stock_status();

CREATE TRIGGER update_product_stock_status_update
AFTER UPDATE OF is_in_stock ON product_variants
FOR EACH ROW
EXECUTE FUNCTION update_product_stock_status();

CREATE TRIGGER update_product_stock_status_delete
AFTER DELETE ON product_variants
FOR EACH ROW
EXECUTE FUNCTION update_product_stock_status();