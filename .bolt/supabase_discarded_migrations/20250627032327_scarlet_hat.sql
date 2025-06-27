/*
  # Create Product Reviews Schema

  1. New Tables
    - `reviews` - Stores product reviews and ratings
  
  2. Security
    - Enable RLS on reviews table
    - Add policies for proper access control
    
  3. Changes
    - Added comprehensive review system with ratings
    - Added helpful votes tracking
    - Added review moderation capabilities
*/

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  is_verified_purchase BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  helpful_votes INTEGER DEFAULT 0,
  unhelpful_votes INTEGER DEFAULT 0,
  reported_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS reviews_product_id_idx ON reviews(product_id);
CREATE INDEX IF NOT EXISTS reviews_user_id_idx ON reviews(user_id);
CREATE INDEX IF NOT EXISTS reviews_rating_idx ON reviews(rating);
CREATE INDEX IF NOT EXISTS reviews_created_at_idx ON reviews(created_at);

-- Create review_votes table to track user votes
CREATE TABLE IF NOT EXISTS review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(review_id, user_id)
);

-- Create review_reports table to track reported reviews
CREATE TABLE IF NOT EXISTS review_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  details TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(review_id, user_id)
);

-- Enable RLS on all tables
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_reports ENABLE ROW LEVEL SECURITY;

-- Create policies for reviews
CREATE POLICY "Everyone can view approved reviews" 
  ON reviews FOR SELECT 
  USING (is_approved = true);

CREATE POLICY "Users can view their own reviews regardless of approval status" 
  ON reviews FOR SELECT 
  TO authenticated 
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all reviews" 
  ON reviews FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can create reviews for products they've purchased" 
  ON reviews FOR INSERT 
  TO authenticated 
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE o.user_id = auth.uid()
      AND oi.product_id = product_id
      AND o.status_id = (SELECT id FROM order_statuses WHERE name = 'delivered')
    )
  );

CREATE POLICY "Users can update their own reviews" 
  ON reviews FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can update any review" 
  ON reviews FOR UPDATE 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can delete their own reviews" 
  ON reviews FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete any review" 
  ON reviews FOR DELETE 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for review_votes
CREATE POLICY "Users can view their own votes" 
  ON review_votes FOR SELECT 
  TO authenticated 
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all votes" 
  ON review_votes FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can vote on reviews" 
  ON review_votes FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes" 
  ON review_votes FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes" 
  ON review_votes FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Create policies for review_reports
CREATE POLICY "Users can view their own reports" 
  ON review_reports FOR SELECT 
  TO authenticated 
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all reports" 
  ON review_reports FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can report reviews" 
  ON review_reports FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

-- Create function to update reviews updated_at timestamp
CREATE OR REPLACE FUNCTION update_reviews_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update reviews updated_at timestamp
CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_reviews_updated_at();

-- Create function to update review_reports updated_at timestamp
CREATE OR REPLACE FUNCTION update_review_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update review_reports updated_at timestamp
CREATE TRIGGER update_review_reports_updated_at
BEFORE UPDATE ON review_reports
FOR EACH ROW
EXECUTE FUNCTION update_review_reports_updated_at();

-- Create function to update helpful/unhelpful votes count
CREATE OR REPLACE FUNCTION update_review_votes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.is_helpful THEN
      UPDATE reviews SET helpful_votes = helpful_votes + 1 WHERE id = NEW.review_id;
    ELSE
      UPDATE reviews SET unhelpful_votes = unhelpful_votes + 1 WHERE id = NEW.review_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.is_helpful <> NEW.is_helpful THEN
      IF NEW.is_helpful THEN
        UPDATE reviews SET 
          helpful_votes = helpful_votes + 1,
          unhelpful_votes = unhelpful_votes - 1
        WHERE id = NEW.review_id;
      ELSE
        UPDATE reviews SET 
          helpful_votes = helpful_votes - 1,
          unhelpful_votes = unhelpful_votes + 1
        WHERE id = NEW.review_id;
      END IF;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.is_helpful THEN
      UPDATE reviews SET helpful_votes = helpful_votes - 1 WHERE id = OLD.review_id;
    ELSE
      UPDATE reviews SET unhelpful_votes = unhelpful_votes - 1 WHERE id = OLD.review_id;
    END IF;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update helpful/unhelpful votes count
CREATE TRIGGER update_review_votes_count_insert
AFTER INSERT ON review_votes
FOR EACH ROW
EXECUTE FUNCTION update_review_votes_count();

CREATE TRIGGER update_review_votes_count_update
AFTER UPDATE OF is_helpful ON review_votes
FOR EACH ROW
EXECUTE FUNCTION update_review_votes_count();

CREATE TRIGGER update_review_votes_count_delete
AFTER DELETE ON review_votes
FOR EACH ROW
EXECUTE FUNCTION update_review_votes_count();

-- Create function to update reported count
CREATE OR REPLACE FUNCTION update_review_reported_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE reviews SET reported_count = reported_count + 1 WHERE id = NEW.review_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE reviews SET reported_count = reported_count - 1 WHERE id = OLD.review_id;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update reported count
CREATE TRIGGER update_review_reported_count_insert
AFTER INSERT ON review_reports
FOR EACH ROW
EXECUTE FUNCTION update_review_reported_count();

CREATE TRIGGER update_review_reported_count_delete
AFTER DELETE ON review_reports
FOR EACH ROW
EXECUTE FUNCTION update_review_reported_count();

-- Create function to update product rating
CREATE OR REPLACE FUNCTION update_product_rating()
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
  FROM reviews
  WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
  AND is_approved = true;
  
  -- Update product rating and review count
  UPDATE products
  SET 
    rating = avg_rating,
    reviews = review_count
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update product rating
CREATE TRIGGER update_product_rating_insert
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_product_rating();

CREATE TRIGGER update_product_rating_update
AFTER UPDATE OF rating, is_approved ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_product_rating();

CREATE TRIGGER update_product_rating_delete
AFTER DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_product_rating();