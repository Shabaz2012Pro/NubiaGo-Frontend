/*
  # Create Orders Schema

  1. New Tables
    - `orders` - Stores order information
    - `order_items` - Stores items within orders
    - `order_statuses` - Lookup table for order status values
    - `payment_methods` - Lookup table for payment methods
  
  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
    
  3. Changes
    - Added comprehensive order tracking system
    - Added payment processing integration
    - Added shipping information tracking
*/

-- Create order statuses lookup table
CREATE TABLE IF NOT EXISTS order_statuses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default order statuses
INSERT INTO order_statuses (name, description) VALUES
  ('pending', 'Order has been placed but not yet processed'),
  ('processing', 'Order is being prepared for shipping'),
  ('shipped', 'Order has been shipped'),
  ('delivered', 'Order has been delivered'),
  ('cancelled', 'Order has been cancelled'),
  ('refunded', 'Order has been refunded'),
  ('on_hold', 'Order is on hold')
ON CONFLICT (name) DO NOTHING;

-- Create payment methods lookup table
CREATE TABLE IF NOT EXISTS payment_methods (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default payment methods
INSERT INTO payment_methods (name, description) VALUES
  ('credit_card', 'Credit or debit card payment'),
  ('paypal', 'PayPal payment'),
  ('bank_transfer', 'Direct bank transfer'),
  ('mobile_money', 'Mobile money payment'),
  ('cash_on_delivery', 'Cash on delivery')
ON CONFLICT (name) DO NOTHING;

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL UNIQUE,
  status_id INTEGER NOT NULL REFERENCES order_statuses(id),
  payment_method_id INTEGER REFERENCES payment_methods(id),
  payment_status TEXT NOT NULL DEFAULT 'pending',
  subtotal NUMERIC(10, 2) NOT NULL,
  tax NUMERIC(10, 2) NOT NULL DEFAULT 0,
  shipping_cost NUMERIC(10, 2) NOT NULL DEFAULT 0,
  discount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL,
  notes TEXT,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  tracking_number TEXT,
  carrier TEXT,
  estimated_delivery DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  variant_id UUID REFERENCES product_variants(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price NUMERIC(10, 2) NOT NULL,
  discount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create order history table for tracking status changes
CREATE TABLE IF NOT EXISTS order_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  status_id INTEGER NOT NULL REFERENCES order_statuses(id),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  payment_method_id INTEGER NOT NULL REFERENCES payment_methods(id),
  payment_status TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  transaction_id TEXT,
  payment_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- Create policies for orders
CREATE POLICY "Users can view their own orders" 
  ON orders FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" 
  ON orders FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Admins can insert orders" 
  ON orders FOR INSERT 
  TO authenticated 
  WITH CHECK (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update orders" 
  ON orders FOR UPDATE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Create policies for order items
CREATE POLICY "Users can view their own order items" 
  ON order_items FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all order items" 
  ON order_items FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Create policies for order history
CREATE POLICY "Users can view their own order history" 
  ON order_history FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_history.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all order history" 
  ON order_history FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Create policies for payments
CREATE POLICY "Users can view their own payments" 
  ON payments FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = payments.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all payments" 
  ON payments FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Create policies for lookup tables
CREATE POLICY "Everyone can view order statuses" 
  ON order_statuses FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Everyone can view payment methods" 
  ON payment_methods FOR SELECT 
  TO authenticated 
  USING (true);

-- Create function to update order updated_at timestamp
CREATE OR REPLACE FUNCTION update_order_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update order updated_at timestamp
CREATE TRIGGER update_order_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION update_order_updated_at();

-- Create function to add order history entry
CREATE OR REPLACE FUNCTION add_order_history()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status_id IS DISTINCT FROM NEW.status_id THEN
    INSERT INTO order_history (order_id, status_id, created_by)
    VALUES (NEW.id, NEW.status_id, auth.uid());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to add order history entry
CREATE TRIGGER add_order_history
AFTER UPDATE OF status_id ON orders
FOR EACH ROW
EXECUTE FUNCTION add_order_history();

-- Create function to add initial order history entry
CREATE OR REPLACE FUNCTION add_initial_order_history()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO order_history (order_id, status_id, created_by)
  VALUES (NEW.id, NEW.status_id, auth.uid());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to add initial order history entry
CREATE TRIGGER add_initial_order_history
AFTER INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION add_initial_order_history();