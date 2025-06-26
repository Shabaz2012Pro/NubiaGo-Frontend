-- Create order_items table if it doesn't exist
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id),
  product_id uuid REFERENCES products(id),
  variant_id uuid,
  quantity integer,
  price numeric,
  total_price numeric
);

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'order_items' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policy for order_items if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'order_items' 
    AND policyname = 'Users can select their own order items'
  ) THEN
    CREATE POLICY "Users can select their own order items"
      ON order_items
      FOR SELECT
      TO authenticated
      USING (order_id IN (SELECT id FROM orders WHERE user_id = auth.uid()));
  END IF;
END $$;

-- Create cart_items table if it doesn't exist
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  product_id uuid REFERENCES products(id),
  variant_id uuid,
  quantity integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'cart_items' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policies for cart_items if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cart_items' 
    AND policyname = 'Users can select their own cart items'
  ) THEN
    CREATE POLICY "Users can select their own cart items"
      ON cart_items
      FOR SELECT
      TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cart_items' 
    AND policyname = 'Users can insert their own cart items'
  ) THEN
    CREATE POLICY "Users can insert their own cart items"
      ON cart_items
      FOR INSERT
      TO authenticated
      WITH CHECK (user_id = auth.uid());
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cart_items' 
    AND policyname = 'Users can update their own cart items'
  ) THEN
    CREATE POLICY "Users can update their own cart items"
      ON cart_items
      FOR UPDATE
      TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cart_items' 
    AND policyname = 'Users can delete their own cart items'
  ) THEN
    CREATE POLICY "Users can delete their own cart items"
      ON cart_items
      FOR DELETE
      TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;

-- Create wishlist table if it doesn't exist
CREATE TABLE IF NOT EXISTS wishlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  product_id uuid REFERENCES products(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'wishlist' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policies for wishlist if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'wishlist' 
    AND policyname = 'Users can view their own wishlist'
  ) THEN
    CREATE POLICY "Users can view their own wishlist"
      ON wishlist
      FOR SELECT
      TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'wishlist' 
    AND policyname = 'Users can insert into their own wishlist'
  ) THEN
    CREATE POLICY "Users can insert into their own wishlist"
      ON wishlist
      FOR INSERT
      TO authenticated
      WITH CHECK (user_id = auth.uid());
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'wishlist' 
    AND policyname = 'Users can delete from their own wishlist'
  ) THEN
    CREATE POLICY "Users can delete from their own wishlist"
      ON wishlist
      FOR DELETE
      TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;

-- Create recently_viewed table if it doesn't exist
CREATE TABLE IF NOT EXISTS recently_viewed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  product_id uuid REFERENCES products(id),
  viewed_at timestamptz DEFAULT now()
);

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'recently_viewed' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE recently_viewed ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policies for recently_viewed if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'recently_viewed' 
    AND policyname = 'Users can select their own recently viewed items'
  ) THEN
    CREATE POLICY "Users can select their own recently viewed items"
      ON recently_viewed
      FOR SELECT
      TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'recently_viewed' 
    AND policyname = 'Users can insert their own recently viewed items'
  ) THEN
    CREATE POLICY "Users can insert their own recently viewed items"
      ON recently_viewed
      FOR INSERT
      TO authenticated
      WITH CHECK (user_id = auth.uid());
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'recently_viewed' 
    AND policyname = 'Users can update their own recently viewed items'
  ) THEN
    CREATE POLICY "Users can update their own recently viewed items"
      ON recently_viewed
      FOR UPDATE
      TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'recently_viewed' 
    AND policyname = 'Users can delete their own recently viewed items'
  ) THEN
    CREATE POLICY "Users can delete their own recently viewed items"
      ON recently_viewed
      FOR DELETE
      TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;

-- Create reviews table if it doesn't exist
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id),
  user_id uuid REFERENCES users(id),
  rating numeric,
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'reviews' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policies for reviews if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'reviews' 
    AND policyname = 'Users can select their own reviews'
  ) THEN
    CREATE POLICY "Users can select their own reviews"
      ON reviews
      FOR SELECT
      TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'reviews' 
    AND policyname = 'Users can insert their own reviews'
  ) THEN
    CREATE POLICY "Users can insert their own reviews"
      ON reviews
      FOR INSERT
      TO authenticated
      WITH CHECK (user_id = auth.uid());
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'reviews' 
    AND policyname = 'Users can update their own reviews'
  ) THEN
    CREATE POLICY "Users can update their own reviews"
      ON reviews
      FOR UPDATE
      TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'reviews' 
    AND policyname = 'Users can delete their own reviews'
  ) THEN
    CREATE POLICY "Users can delete their own reviews"
      ON reviews
      FOR DELETE
      TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;