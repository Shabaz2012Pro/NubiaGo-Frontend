/*
  # Create Product Schema

  1. New Tables
    - `products` - Stores product information
    - `categories` - Stores product categories
    - `product_images` - Stores product images
    - `product_tags` - Stores product tags
  
  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
    
  3. Changes
    - Added comprehensive product management system
    - Added category and tag support
    - Added product image management
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  level INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  compare_at_price NUMERIC(10, 2),
  cost_price NUMERIC(10, 2),
  sku TEXT,
  barcode TEXT,
  images TEXT[] DEFAULT '{}',
  thumbnail TEXT,
  category TEXT,
  subcategory TEXT,
  brand TEXT,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  rating NUMERIC(3, 1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  min_order_quantity INTEGER DEFAULT 1,
  max_order_quantity INTEGER,
  weight NUMERIC(10, 2),
  dimensions JSONB,
  specifications JSONB DEFAULT '{}'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  is_bestseller BOOLEAN DEFAULT false,
  is_on_sale BOOLEAN DEFAULT false,
  popularity_score INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create product_images table
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  width INTEGER,
  height INTEGER,
  size INTEGER,
  sort_order INTEGER DEFAULT 0,
  is_thumbnail BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create product_tags table
CREATE TABLE IF NOT EXISTS product_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create product_tags_junction table
CREATE TABLE IF NOT EXISTS product_tags_junction (
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES product_tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (product_id, tag_id)
);

-- Create product_categories_junction table
CREATE TABLE IF NOT EXISTS product_categories_junction (
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (product_id, category_id)
);

-- Create product_related_junction table
CREATE TABLE IF NOT EXISTS product_related_junction (
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  related_product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  relation_type TEXT NOT NULL DEFAULT 'related' CHECK (relation_type IN ('related', 'upsell', 'cross-sell')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (product_id, related_product_id, relation_type)
);

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_tags_junction ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories_junction ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_related_junction ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "Everyone can view categories" 
  ON categories FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage categories" 
  ON categories FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for products
CREATE POLICY "Everyone can view products" 
  ON products FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage products" 
  ON products FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Suppliers can manage their own products" 
  ON products FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM suppliers 
    WHERE suppliers.id = products.supplier_id 
    AND suppliers.user_id = auth.uid()
  ));

-- Create policies for product_images
CREATE POLICY "Everyone can view product images" 
  ON product_images FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage product images" 
  ON product_images FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Suppliers can manage their own product images" 
  ON product_images FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM products 
    JOIN suppliers ON products.supplier_id = suppliers.id 
    WHERE products.id = product_images.product_id 
    AND suppliers.user_id = auth.uid()
  ));

-- Create policies for product_tags
CREATE POLICY "Everyone can view product tags" 
  ON product_tags FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage product tags" 
  ON product_tags FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for product_tags_junction
CREATE POLICY "Everyone can view product tags junction" 
  ON product_tags_junction FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage product tags junction" 
  ON product_tags_junction FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Suppliers can manage their own product tags junction" 
  ON product_tags_junction FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM products 
    JOIN suppliers ON products.supplier_id = suppliers.id 
    WHERE products.id = product_tags_junction.product_id 
    AND suppliers.user_id = auth.uid()
  ));

-- Create policies for product_categories_junction
CREATE POLICY "Everyone can view product categories junction" 
  ON product_categories_junction FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage product categories junction" 
  ON product_categories_junction FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Suppliers can manage their own product categories junction" 
  ON product_categories_junction FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM products 
    JOIN suppliers ON products.supplier_id = suppliers.id 
    WHERE products.id = product_categories_junction.product_id 
    AND suppliers.user_id = auth.uid()
  ));

-- Create policies for product_related_junction
CREATE POLICY "Everyone can view product related junction" 
  ON product_related_junction FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage product related junction" 
  ON product_related_junction FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Suppliers can manage their own product related junction" 
  ON product_related_junction FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM products 
    JOIN suppliers ON products.supplier_id = suppliers.id 
    WHERE products.id = product_related_junction.product_id 
    AND suppliers.user_id = auth.uid()
  ));

-- Create function to update categories updated_at timestamp
CREATE OR REPLACE FUNCTION update_categories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update categories updated_at timestamp
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION update_categories_updated_at();

-- Create function to update products updated_at timestamp
CREATE OR REPLACE FUNCTION update_products_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update products updated_at timestamp
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_products_updated_at();

-- Create function to update product_tags updated_at timestamp
CREATE OR REPLACE FUNCTION update_product_tags_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update product_tags updated_at timestamp
CREATE TRIGGER update_product_tags_updated_at
BEFORE UPDATE ON product_tags
FOR EACH ROW
EXECUTE FUNCTION update_product_tags_updated_at();

-- Create function to generate product slug
CREATE OR REPLACE FUNCTION generate_product_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  new_slug TEXT;
  counter INTEGER := 1;
BEGIN
  -- Generate base slug from name
  base_slug := LOWER(REGEXP_REPLACE(NEW.name, '[^a-zA-Z0-9]', '-', 'g'));
  
  -- Remove consecutive hyphens
  base_slug := REGEXP_REPLACE(base_slug, '-+', '-', 'g');
  
  -- Remove leading and trailing hyphens
  base_slug := TRIM(BOTH '-' FROM base_slug);
  
  -- Check if slug already exists
  new_slug := base_slug;
  WHILE EXISTS (SELECT 1 FROM products WHERE slug = new_slug AND id != NEW.id) LOOP
    counter := counter + 1;
    new_slug := base_slug || '-' || counter;
  END LOOP;
  
  NEW.slug := new_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to generate product slug
CREATE TRIGGER generate_product_slug
BEFORE INSERT OR UPDATE OF name ON products
FOR EACH ROW
WHEN (NEW.slug IS NULL OR NEW.slug = '' OR NEW.name != OLD.name)
EXECUTE FUNCTION generate_product_slug();

-- Create function to generate category slug
CREATE OR REPLACE FUNCTION generate_category_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  new_slug TEXT;
  counter INTEGER := 1;
BEGIN
  -- Generate base slug from name
  base_slug := LOWER(REGEXP_REPLACE(NEW.name, '[^a-zA-Z0-9]', '-', 'g'));
  
  -- Remove consecutive hyphens
  base_slug := REGEXP_REPLACE(base_slug, '-+', '-', 'g');
  
  -- Remove leading and trailing hyphens
  base_slug := TRIM(BOTH '-' FROM base_slug);
  
  -- Check if slug already exists
  new_slug := base_slug;
  WHILE EXISTS (SELECT 1 FROM categories WHERE slug = new_slug AND id != NEW.id) LOOP
    counter := counter + 1;
    new_slug := base_slug || '-' || counter;
  END LOOP;
  
  NEW.slug := new_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to generate category slug
CREATE TRIGGER generate_category_slug
BEFORE INSERT OR UPDATE OF name ON categories
FOR EACH ROW
WHEN (NEW.slug IS NULL OR NEW.slug = '' OR NEW.name != OLD.name)
EXECUTE FUNCTION generate_category_slug();

-- Create function to generate product tag slug
CREATE OR REPLACE FUNCTION generate_product_tag_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  new_slug TEXT;
  counter INTEGER := 1;
BEGIN
  -- Generate base slug from name
  base_slug := LOWER(REGEXP_REPLACE(NEW.name, '[^a-zA-Z0-9]', '-', 'g'));
  
  -- Remove consecutive hyphens
  base_slug := REGEXP_REPLACE(base_slug, '-+', '-', 'g');
  
  -- Remove leading and trailing hyphens
  base_slug := TRIM(BOTH '-' FROM base_slug);
  
  -- Check if slug already exists
  new_slug := base_slug;
  WHILE EXISTS (SELECT 1 FROM product_tags WHERE slug = new_slug AND id != NEW.id) LOOP
    counter := counter + 1;
    new_slug := base_slug || '-' || counter;
  END LOOP;
  
  NEW.slug := new_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to generate product tag slug
CREATE TRIGGER generate_product_tag_slug
BEFORE INSERT OR UPDATE OF name ON product_tags
FOR EACH ROW
WHEN (NEW.slug IS NULL OR NEW.slug = '' OR NEW.name != OLD.name)
EXECUTE FUNCTION generate_product_tag_slug();

-- Create function to update product tags array
CREATE OR REPLACE FUNCTION update_product_tags_array()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the tags array in the products table
  UPDATE products
  SET tags = (
    SELECT array_agg(pt.name)
    FROM product_tags pt
    JOIN product_tags_junction ptj ON pt.id = ptj.tag_id
    WHERE ptj.product_id = COALESCE(NEW.product_id, OLD.product_id)
  )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update product tags array
CREATE TRIGGER update_product_tags_array_insert
AFTER INSERT ON product_tags_junction
FOR EACH ROW
EXECUTE FUNCTION update_product_tags_array();

CREATE TRIGGER update_product_tags_array_delete
AFTER DELETE ON product_tags_junction
FOR EACH ROW
EXECUTE FUNCTION update_product_tags_array();

-- Create function to update product category
CREATE OR REPLACE FUNCTION update_product_category()
RETURNS TRIGGER AS $$
DECLARE
  primary_category TEXT;
  primary_subcategory TEXT;
BEGIN
  -- Get primary category and subcategory
  SELECT 
    c.name,
    sc.name
  INTO 
    primary_category,
    primary_subcategory
  FROM product_categories_junction pcj
  JOIN categories c ON pcj.category_id = c.id
  LEFT JOIN categories sc ON c.parent_id = sc.id
  WHERE pcj.product_id = COALESCE(NEW.product_id, OLD.product_id)
  AND pcj.is_primary = true
  LIMIT 1;
  
  -- If no primary category, get any category
  IF primary_category IS NULL THEN
    SELECT 
      c.name,
      sc.name
    INTO 
      primary_category,
      primary_subcategory
    FROM product_categories_junction pcj
    JOIN categories c ON pcj.category_id = c.id
    LEFT JOIN categories sc ON c.parent_id = sc.id
    WHERE pcj.product_id = COALESCE(NEW.product_id, OLD.product_id)
    LIMIT 1;
  END IF;
  
  -- Update the category and subcategory in the products table
  UPDATE products
  SET 
    category = primary_category,
    subcategory = primary_subcategory
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update product category
CREATE TRIGGER update_product_category_insert
AFTER INSERT ON product_categories_junction
FOR EACH ROW
EXECUTE FUNCTION update_product_category();

CREATE TRIGGER update_product_category_update
AFTER UPDATE OF is_primary, category_id ON product_categories_junction
FOR EACH ROW
EXECUTE FUNCTION update_product_category();

CREATE TRIGGER update_product_category_delete
AFTER DELETE ON product_categories_junction
FOR EACH ROW
EXECUTE FUNCTION update_product_category();

-- Create function to update product thumbnail
CREATE OR REPLACE FUNCTION update_product_thumbnail()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the thumbnail in the products table
  IF NEW.is_thumbnail THEN
    UPDATE products
    SET thumbnail = NEW.url
    WHERE id = NEW.product_id;
    
    -- Ensure only one thumbnail per product
    UPDATE product_images
    SET is_thumbnail = false
    WHERE product_id = NEW.product_id
      AND id != NEW.id
      AND is_thumbnail = true;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update product thumbnail
CREATE TRIGGER update_product_thumbnail
BEFORE INSERT OR UPDATE OF is_thumbnail ON product_images
FOR EACH ROW
WHEN (NEW.is_thumbnail = true)
EXECUTE FUNCTION update_product_thumbnail();

-- Create function to update product images array
CREATE OR REPLACE FUNCTION update_product_images_array()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the images array in the products table
  UPDATE products
  SET images = (
    SELECT array_agg(pi.url ORDER BY pi.sort_order)
    FROM product_images pi
    WHERE pi.product_id = COALESCE(NEW.product_id, OLD.product_id)
  )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update product images array
CREATE TRIGGER update_product_images_array_insert
AFTER INSERT ON product_images
FOR EACH ROW
EXECUTE FUNCTION update_product_images_array();

CREATE TRIGGER update_product_images_array_update
AFTER UPDATE OF url, sort_order ON product_images
FOR EACH ROW
EXECUTE FUNCTION update_product_images_array();

CREATE TRIGGER update_product_images_array_delete
AFTER DELETE ON product_images
FOR EACH ROW
EXECUTE FUNCTION update_product_images_array();