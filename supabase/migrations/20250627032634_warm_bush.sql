/*
  # Create Supplier Schema

  1. New Tables
    - `suppliers` - Stores supplier information
    - `supplier_categories` - Junction table for supplier categories
    - `supplier_certifications` - Stores supplier certifications
    - `supplier_reviews` - Stores reviews for suppliers
  
  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
    
  3. Changes
    - Added comprehensive supplier management system
    - Added supplier verification and rating system
    - Added supplier certification tracking
*/

-- Create suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  logo TEXT,
  cover_image TEXT,
  country TEXT NOT NULL,
  city TEXT,
  address TEXT,
  postal_code TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  social_media JSONB DEFAULT '{}'::jsonb,
  business_type TEXT,
  year_established INTEGER,
  employee_count INTEGER,
  is_verified BOOLEAN DEFAULT false,
  verification_date TIMESTAMPTZ,
  verification_documents JSONB DEFAULT '{}'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  rating NUMERIC(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  total_products INTEGER DEFAULT 0,
  response_time TEXT,
  response_rate NUMERIC(5, 2) DEFAULT 0,
  min_order_value NUMERIC(10, 2),
  payment_terms TEXT,
  shipping_terms TEXT,
  return_policy TEXT,
  member_since TIMESTAMPTZ DEFAULT now(),
  last_active TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'inactive')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create supplier_categories junction table
CREATE TABLE IF NOT EXISTS supplier_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(supplier_id, category_id)
);

-- Create supplier_certifications table
CREATE TABLE IF NOT EXISTS supplier_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  issuer TEXT,
  issue_date DATE,
  expiry_date DATE,
  certificate_number TEXT,
  document_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  verification_date TIMESTAMPTZ,
  verification_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create supplier_reviews table
CREATE TABLE IF NOT EXISTS supplier_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  is_verified_purchase BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  helpful_votes INTEGER DEFAULT 0,
  unhelpful_votes INTEGER DEFAULT 0,
  reported_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create supplier_review_votes table
CREATE TABLE IF NOT EXISTS supplier_review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES supplier_reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(review_id, user_id)
);

-- Create supplier_messages table
CREATE TABLE IF NOT EXISTS supplier_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  reply_to UUID REFERENCES supplier_messages(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for suppliers
CREATE POLICY "Everyone can view active suppliers" 
  ON suppliers FOR SELECT 
  USING (status = 'active');

CREATE POLICY "Suppliers can view their own profile" 
  ON suppliers FOR SELECT 
  TO authenticated 
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all suppliers" 
  ON suppliers FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Suppliers can update their own profile" 
  ON suppliers FOR UPDATE 
  TO authenticated 
  USING (user_id = auth.uid());

CREATE POLICY "Admins can update all suppliers" 
  ON suppliers FOR UPDATE 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for supplier_categories
CREATE POLICY "Everyone can view supplier categories" 
  ON supplier_categories FOR SELECT 
  USING (true);

CREATE POLICY "Suppliers can manage their own categories" 
  ON supplier_categories FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM suppliers 
    WHERE suppliers.id = supplier_categories.supplier_id 
    AND suppliers.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all supplier categories" 
  ON supplier_categories FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for supplier_certifications
CREATE POLICY "Everyone can view verified supplier certifications" 
  ON supplier_certifications FOR SELECT 
  USING (is_verified = true);

CREATE POLICY "Suppliers can view their own certifications" 
  ON supplier_certifications FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM suppliers 
    WHERE suppliers.id = supplier_certifications.supplier_id 
    AND suppliers.user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all supplier certifications" 
  ON supplier_certifications FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Suppliers can manage their own certifications" 
  ON supplier_certifications FOR INSERT 
  TO authenticated 
  WITH CHECK (EXISTS (
    SELECT 1 FROM suppliers 
    WHERE suppliers.id = supplier_certifications.supplier_id 
    AND suppliers.user_id = auth.uid()
  ));

CREATE POLICY "Suppliers can update their own certifications" 
  ON supplier_certifications FOR UPDATE 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM suppliers 
    WHERE suppliers.id = supplier_certifications.supplier_id 
    AND suppliers.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all supplier certifications" 
  ON supplier_certifications FOR ALL 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for supplier_reviews
CREATE POLICY "Everyone can view approved supplier reviews" 
  ON supplier_reviews FOR SELECT 
  USING (is_approved = true);

CREATE POLICY "Users can view their own supplier reviews" 
  ON supplier_reviews FOR SELECT 
  TO authenticated 
  USING (user_id = auth.uid());

CREATE POLICY "Suppliers can view reviews about them" 
  ON supplier_reviews FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM suppliers 
    WHERE suppliers.id = supplier_reviews.supplier_id 
    AND suppliers.user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all supplier reviews" 
  ON supplier_reviews FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can create supplier reviews" 
  ON supplier_reviews FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own supplier reviews" 
  ON supplier_reviews FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can update any supplier review" 
  ON supplier_reviews FOR UPDATE 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for supplier_review_votes
CREATE POLICY "Users can view their own supplier review votes" 
  ON supplier_review_votes FOR SELECT 
  TO authenticated 
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all supplier review votes" 
  ON supplier_review_votes FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can vote on supplier reviews" 
  ON supplier_review_votes FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own supplier review votes" 
  ON supplier_review_votes FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own supplier review votes" 
  ON supplier_review_votes FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Create policies for supplier_messages
CREATE POLICY "Users can view their own supplier messages" 
  ON supplier_messages FOR SELECT 
  TO authenticated 
  USING (user_id = auth.uid());

CREATE POLICY "Suppliers can view messages sent to them" 
  ON supplier_messages FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM suppliers 
    WHERE suppliers.id = supplier_messages.supplier_id 
    AND suppliers.user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all supplier messages" 
  ON supplier_messages FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can send messages to suppliers" 
  ON supplier_messages FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Suppliers can reply to messages" 
  ON supplier_messages FOR INSERT 
  TO authenticated 
  WITH CHECK (EXISTS (
    SELECT 1 FROM suppliers 
    WHERE suppliers.id = supplier_messages.supplier_id 
    AND suppliers.user_id = auth.uid()
  ));

CREATE POLICY "Users can update their own messages" 
  ON supplier_messages FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Suppliers can update messages sent to them" 
  ON supplier_messages FOR UPDATE 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM suppliers 
    WHERE suppliers.id = supplier_messages.supplier_id 
    AND suppliers.user_id = auth.uid()
  ));

-- Create function to update suppliers updated_at timestamp
CREATE OR REPLACE FUNCTION update_suppliers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update suppliers updated_at timestamp
CREATE TRIGGER update_suppliers_updated_at
BEFORE UPDATE ON suppliers
FOR EACH ROW
EXECUTE FUNCTION update_suppliers_updated_at();

-- Create function to update supplier_certifications updated_at timestamp
CREATE OR REPLACE FUNCTION update_supplier_certifications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update supplier_certifications updated_at timestamp
CREATE TRIGGER update_supplier_certifications_updated_at
BEFORE UPDATE ON supplier_certifications
FOR EACH ROW
EXECUTE FUNCTION update_supplier_certifications_updated_at();

-- Create function to update supplier_reviews updated_at timestamp
CREATE OR REPLACE FUNCTION update_supplier_reviews_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update supplier_reviews updated_at timestamp
CREATE TRIGGER update_supplier_reviews_updated_at
BEFORE UPDATE ON supplier_reviews
FOR EACH ROW
EXECUTE FUNCTION update_supplier_reviews_updated_at();

-- Create function to update supplier_messages updated_at timestamp
CREATE OR REPLACE FUNCTION update_supplier_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update supplier_messages updated_at timestamp
CREATE TRIGGER update_supplier_messages_updated_at
BEFORE UPDATE ON supplier_messages
FOR EACH ROW
EXECUTE FUNCTION update_supplier_messages_updated_at();

-- Create function to update supplier rating and review count
CREATE OR REPLACE FUNCTION update_supplier_rating()
RETURNS TRIGGER AS $$
DECLARE
  avg_rating NUMERIC;
  review_count INTEGER;
BEGIN
  -- Calculate new average rating and count
  SELECT 
    COALESCE(AVG(rating), 0),
    COUNT(*)
  INTO 
    avg_rating,
    review_count
  FROM supplier_reviews
  WHERE supplier_id = COALESCE(NEW.supplier_id, OLD.supplier_id)
  AND is_approved = true;
  
  -- Update supplier rating and review count
  UPDATE suppliers
  SET 
    rating = avg_rating,
    review_count = review_count
  WHERE id = COALESCE(NEW.supplier_id, OLD.supplier_id);
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update supplier rating
CREATE TRIGGER update_supplier_rating_insert
AFTER INSERT ON supplier_reviews
FOR EACH ROW
EXECUTE FUNCTION update_supplier_rating();

CREATE TRIGGER update_supplier_rating_update
AFTER UPDATE OF rating, is_approved ON supplier_reviews
FOR EACH ROW
EXECUTE FUNCTION update_supplier_rating();

CREATE TRIGGER update_supplier_rating_delete
AFTER DELETE ON supplier_reviews
FOR EACH ROW
EXECUTE FUNCTION update_supplier_rating();

-- Create function to update helpful/unhelpful votes count
CREATE OR REPLACE FUNCTION update_supplier_review_votes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.is_helpful THEN
      UPDATE supplier_reviews SET helpful_votes = helpful_votes + 1 WHERE id = NEW.review_id;
    ELSE
      UPDATE supplier_reviews SET unhelpful_votes = unhelpful_votes + 1 WHERE id = NEW.review_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.is_helpful <> NEW.is_helpful THEN
      IF NEW.is_helpful THEN
        UPDATE supplier_reviews SET 
          helpful_votes = helpful_votes + 1,
          unhelpful_votes = unhelpful_votes - 1
        WHERE id = NEW.review_id;
      ELSE
        UPDATE supplier_reviews SET 
          helpful_votes = helpful_votes - 1,
          unhelpful_votes = unhelpful_votes + 1
        WHERE id = NEW.review_id;
      END IF;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.is_helpful THEN
      UPDATE supplier_reviews SET helpful_votes = helpful_votes - 1 WHERE id = OLD.review_id;
    ELSE
      UPDATE supplier_reviews SET unhelpful_votes = unhelpful_votes - 1 WHERE id = OLD.review_id;
    END IF;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update helpful/unhelpful votes count
CREATE TRIGGER update_supplier_review_votes_count_insert
AFTER INSERT ON supplier_review_votes
FOR EACH ROW
EXECUTE FUNCTION update_supplier_review_votes_count();

CREATE TRIGGER update_supplier_review_votes_count_update
AFTER UPDATE OF is_helpful ON supplier_review_votes
FOR EACH ROW
EXECUTE FUNCTION update_supplier_review_votes_count();

CREATE TRIGGER update_supplier_review_votes_count_delete
AFTER DELETE ON supplier_review_votes
FOR EACH ROW
EXECUTE FUNCTION update_supplier_review_votes_count();

-- Create function to update supplier product count
CREATE OR REPLACE FUNCTION update_supplier_product_count()
RETURNS TRIGGER AS $$
DECLARE
  supplier_id_val UUID;
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    supplier_id_val := NEW.supplier_id;
  ELSE
    supplier_id_val := OLD.supplier_id;
  END IF;

  -- Update supplier product count
  UPDATE suppliers
  SET total_products = (
    SELECT COUNT(*) 
    FROM products 
    WHERE supplier_id = supplier_id_val
  )
  WHERE id = supplier_id_val;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update supplier product count
CREATE TRIGGER update_supplier_product_count_insert
AFTER INSERT ON products
FOR EACH ROW
EXECUTE FUNCTION update_supplier_product_count();

CREATE TRIGGER update_supplier_product_count_update
AFTER UPDATE OF supplier_id ON products
FOR EACH ROW
EXECUTE FUNCTION update_supplier_product_count();

CREATE TRIGGER update_supplier_product_count_delete
AFTER DELETE ON products
FOR EACH ROW
EXECUTE FUNCTION update_supplier_product_count();

-- Create function to generate supplier slug
CREATE OR REPLACE FUNCTION generate_supplier_slug()
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
  WHILE EXISTS (SELECT 1 FROM suppliers WHERE slug = new_slug AND id != NEW.id) LOOP
    counter := counter + 1;
    new_slug := base_slug || '-' || counter;
  END LOOP;
  
  NEW.slug := new_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to generate supplier slug
CREATE TRIGGER generate_supplier_slug
BEFORE INSERT OR UPDATE OF name ON suppliers
FOR EACH ROW
WHEN (NEW.slug IS NULL OR NEW.slug = '' OR NEW.name != OLD.name)
EXECUTE FUNCTION generate_supplier_slug();