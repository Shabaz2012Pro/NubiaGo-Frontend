/*
  # Create Cart Schema

  1. New Tables
    - `cart_items` - Stores items in user shopping carts
  
  2. Security
    - Enable RLS on cart_items table
    - Add policies for proper access control
    
  3. Changes
    - Added persistent shopping cart functionality
    - Added guest cart support with session_id
*/

-- Create cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT, -- For guest carts
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  added_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  -- Either user_id or session_id must be provided, but not both
  CONSTRAINT cart_items_user_or_session CHECK (
    (user_id IS NOT NULL AND session_id IS NULL) OR
    (user_id IS NULL AND session_id IS NOT NULL)
  )
);

-- Create index for faster cart retrieval
CREATE INDEX IF NOT EXISTS cart_items_user_id_idx ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS cart_items_session_id_idx ON cart_items(session_id);

-- Enable RLS on cart_items
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Create policies for cart_items
CREATE POLICY "Users can view their own cart items" 
  ON cart_items FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart items" 
  ON cart_items FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items" 
  ON cart_items FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items" 
  ON cart_items FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Create policies for guest carts
CREATE POLICY "Guests can view their own cart items" 
  ON cart_items FOR SELECT 
  TO anon 
  USING (session_id IS NOT NULL);

CREATE POLICY "Guests can insert their own cart items" 
  ON cart_items FOR INSERT 
  TO anon 
  WITH CHECK (session_id IS NOT NULL);

CREATE POLICY "Guests can update their own cart items" 
  ON cart_items FOR UPDATE 
  TO anon 
  USING (session_id IS NOT NULL);

CREATE POLICY "Guests can delete their own cart items" 
  ON cart_items FOR DELETE 
  TO anon 
  USING (session_id IS NOT NULL);

-- Create function to update cart_items updated_at timestamp
CREATE OR REPLACE FUNCTION update_cart_items_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update cart_items updated_at timestamp
CREATE TRIGGER update_cart_items_updated_at
BEFORE UPDATE ON cart_items
FOR EACH ROW
EXECUTE FUNCTION update_cart_items_updated_at();

-- Create function to merge guest cart with user cart on login
CREATE OR REPLACE FUNCTION merge_guest_cart_with_user()
RETURNS TRIGGER AS $$
DECLARE
  guest_item RECORD;
  existing_item RECORD;
BEGIN
  -- Only proceed if this is a new session (login)
  IF NEW.user_id IS NOT NULL AND OLD.user_id IS NULL THEN
    -- For each item in the guest cart
    FOR guest_item IN 
      SELECT * FROM cart_items 
      WHERE session_id = OLD.session_id
    LOOP
      -- Check if the item already exists in the user's cart
      SELECT * INTO existing_item 
      FROM cart_items 
      WHERE user_id = NEW.user_id 
        AND product_id = guest_item.product_id 
        AND (
          (variant_id IS NULL AND guest_item.variant_id IS NULL) OR 
          variant_id = guest_item.variant_id
        );
      
      IF FOUND THEN
        -- Update existing item quantity
        UPDATE cart_items 
        SET quantity = existing_item.quantity + guest_item.quantity,
            updated_at = now()
        WHERE id = existing_item.id;
        
        -- Delete the guest item
        DELETE FROM cart_items WHERE id = guest_item.id;
      ELSE
        -- Move the guest item to the user's cart
        UPDATE cart_items 
        SET user_id = NEW.user_id,
            session_id = NULL,
            updated_at = now()
        WHERE id = guest_item.id;
      END IF;
    END LOOP;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to merge guest cart with user cart on login
CREATE TRIGGER merge_guest_cart_with_user
AFTER UPDATE OF user_id ON auth.users
FOR EACH ROW
EXECUTE FUNCTION merge_guest_cart_with_user();

-- Create function to clean up old guest carts
CREATE OR REPLACE FUNCTION clean_old_guest_carts()
RETURNS void AS $$
BEGIN
  DELETE FROM cart_items
  WHERE session_id IS NOT NULL
    AND added_at < now() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to clean up old guest carts
-- Note: This requires pg_cron extension to be enabled
-- COMMENT OUT if pg_cron is not available
-- SELECT cron.schedule('0 3 * * *', 'SELECT clean_old_guest_carts()');