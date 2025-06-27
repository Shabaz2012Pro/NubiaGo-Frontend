/*
  # Create Wishlist Schema

  1. New Tables
    - `wishlists` - Stores user wishlists
    - `wishlist_items` - Stores items in wishlists
  
  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
    
  3. Changes
    - Added support for multiple named wishlists per user
    - Added wishlist sharing capabilities
    - Added price tracking for wishlist items
*/

-- Create wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_default BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT false,
  share_token TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create wishlist items table
CREATE TABLE IF NOT EXISTS wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wishlist_id UUID NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ DEFAULT now(),
  price_at_add NUMERIC(10, 2),
  current_price NUMERIC(10, 2),
  notes TEXT,
  priority TEXT,
  UNIQUE(wishlist_id, product_id, variant_id)
);

-- Create wishlist_price_history table for price tracking
CREATE TABLE IF NOT EXISTS wishlist_price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wishlist_item_id UUID NOT NULL REFERENCES wishlist_items(id) ON DELETE CASCADE,
  price NUMERIC(10, 2) NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_price_history ENABLE ROW LEVEL SECURITY;

-- Create policies for wishlists
CREATE POLICY "Users can view their own wishlists" 
  ON wishlists FOR SELECT 
  TO authenticated 
  USING (user_id = auth.uid());

CREATE POLICY "Public wishlists are viewable by everyone" 
  ON wishlists FOR SELECT 
  USING (is_public = true);

CREATE POLICY "Users can create their own wishlists" 
  ON wishlists FOR INSERT 
  TO authenticated 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own wishlists" 
  ON wishlists FOR UPDATE 
  TO authenticated 
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own wishlists" 
  ON wishlists FOR DELETE 
  TO authenticated 
  USING (user_id = auth.uid());

-- Create policies for wishlist items
CREATE POLICY "Users can view items in their own wishlists" 
  ON wishlist_items FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM wishlists 
      WHERE wishlists.id = wishlist_items.wishlist_id 
      AND wishlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view items in public wishlists" 
  ON wishlist_items FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM wishlists 
      WHERE wishlists.id = wishlist_items.wishlist_id 
      AND wishlists.is_public = true
    )
  );

CREATE POLICY "Users can add items to their own wishlists" 
  ON wishlist_items FOR INSERT 
  TO authenticated 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM wishlists 
      WHERE wishlists.id = wishlist_items.wishlist_id 
      AND wishlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update items in their own wishlists" 
  ON wishlist_items FOR UPDATE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM wishlists 
      WHERE wishlists.id = wishlist_items.wishlist_id 
      AND wishlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete items from their own wishlists" 
  ON wishlist_items FOR DELETE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM wishlists 
      WHERE wishlists.id = wishlist_items.wishlist_id 
      AND wishlists.user_id = auth.uid()
    )
  );

-- Create policies for wishlist price history
CREATE POLICY "Users can view price history for their own wishlist items" 
  ON wishlist_price_history FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM wishlist_items 
      JOIN wishlists ON wishlist_items.wishlist_id = wishlists.id 
      WHERE wishlist_items.id = wishlist_price_history.wishlist_item_id 
      AND wishlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view price history for public wishlist items" 
  ON wishlist_price_history FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM wishlist_items 
      JOIN wishlists ON wishlist_items.wishlist_id = wishlists.id 
      WHERE wishlist_items.id = wishlist_price_history.wishlist_item_id 
      AND wishlists.is_public = true
    )
  );

-- Create function to update wishlists updated_at timestamp
CREATE OR REPLACE FUNCTION update_wishlists_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update wishlists updated_at timestamp
CREATE TRIGGER update_wishlists_updated_at
BEFORE UPDATE ON wishlists
FOR EACH ROW
EXECUTE FUNCTION update_wishlists_updated_at();

-- Create function to update wishlist updated_at when items change
CREATE OR REPLACE FUNCTION update_wishlist_on_item_change()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE wishlists
  SET updated_at = now()
  WHERE id = COALESCE(NEW.wishlist_id, OLD.wishlist_id);
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update wishlist updated_at when items change
CREATE TRIGGER update_wishlist_on_item_insert
AFTER INSERT ON wishlist_items
FOR EACH ROW
EXECUTE FUNCTION update_wishlist_on_item_change();

CREATE TRIGGER update_wishlist_on_item_update
AFTER UPDATE ON wishlist_items
FOR EACH ROW
EXECUTE FUNCTION update_wishlist_on_item_change();

CREATE TRIGGER update_wishlist_on_item_delete
AFTER DELETE ON wishlist_items
FOR EACH ROW
EXECUTE FUNCTION update_wishlist_on_item_change();

-- Create function to record price history when adding item to wishlist
CREATE OR REPLACE FUNCTION record_wishlist_item_price()
RETURNS TRIGGER AS $$
BEGIN
  -- Get current product price
  SELECT price INTO NEW.price_at_add FROM products WHERE id = NEW.product_id;
  NEW.current_price := NEW.price_at_add;
  
  -- Insert into price history after the wishlist item is created
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to record price history when adding item to wishlist
CREATE TRIGGER record_wishlist_item_price
BEFORE INSERT ON wishlist_items
FOR EACH ROW
EXECUTE FUNCTION record_wishlist_item_price();

-- Create function to add price history entry
CREATE OR REPLACE FUNCTION add_wishlist_price_history()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO wishlist_price_history (wishlist_item_id, price)
  VALUES (NEW.id, NEW.price_at_add);
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to add price history entry
CREATE TRIGGER add_wishlist_price_history
AFTER INSERT ON wishlist_items
FOR EACH ROW
EXECUTE FUNCTION add_wishlist_price_history();

-- Create function to update current price and add to history if changed
CREATE OR REPLACE FUNCTION update_wishlist_item_price()
RETURNS TRIGGER AS $$
DECLARE
  current_product_price NUMERIC(10, 2);
BEGIN
  -- Get current product price
  SELECT price INTO current_product_price FROM products WHERE id = NEW.product_id;
  
  -- If price has changed, update current_price and add to history
  IF NEW.current_price IS DISTINCT FROM current_product_price THEN
    NEW.current_price := current_product_price;
    
    -- Add to price history
    INSERT INTO wishlist_price_history (wishlist_item_id, price)
    VALUES (NEW.id, current_product_price);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update current price and add to history if changed
CREATE TRIGGER update_wishlist_item_price
BEFORE UPDATE ON wishlist_items
FOR EACH ROW
EXECUTE FUNCTION update_wishlist_item_price();

-- Create function to ensure only one default wishlist per user
CREATE OR REPLACE FUNCTION ensure_one_default_wishlist()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_default THEN
    UPDATE wishlists
    SET is_default = false
    WHERE user_id = NEW.user_id
      AND id != NEW.id
      AND is_default = true;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to ensure only one default wishlist per user
CREATE TRIGGER ensure_one_default_wishlist
BEFORE INSERT OR UPDATE OF is_default ON wishlists
FOR EACH ROW
WHEN (NEW.is_default = true)
EXECUTE FUNCTION ensure_one_default_wishlist();

-- Create function to generate share token
CREATE OR REPLACE FUNCTION generate_share_token()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_public AND NEW.share_token IS NULL THEN
    NEW.share_token := encode(gen_random_bytes(16), 'hex');
  ELSIF NOT NEW.is_public THEN
    NEW.share_token := NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to generate share token
CREATE TRIGGER generate_share_token
BEFORE INSERT OR UPDATE OF is_public ON wishlists
FOR EACH ROW
EXECUTE FUNCTION generate_share_token();

-- Create function to ensure each user has a default wishlist
CREATE OR REPLACE FUNCTION create_default_wishlist()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO wishlists (user_id, name, is_default)
  VALUES (NEW.id, 'My Wishlist', true);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to create default wishlist for new users
CREATE TRIGGER create_default_wishlist
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_default_wishlist();