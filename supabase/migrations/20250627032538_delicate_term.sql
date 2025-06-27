/*
  # Create Analytics Schema

  1. New Tables
    - `page_views` - Stores page view analytics
    - `product_views` - Stores product view analytics
    - `search_queries` - Stores search query analytics
    - `user_sessions` - Stores user session data
  
  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
    
  3. Changes
    - Added comprehensive analytics tracking
    - Added search query tracking
    - Added user session tracking
*/

-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  page_url TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  time_on_page INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create product_views table
CREATE TABLE IF NOT EXISTS product_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  referrer_url TEXT,
  time_on_page INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create search_queries table
CREATE TABLE IF NOT EXISTS search_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  query TEXT NOT NULL,
  filters JSONB,
  results_count INTEGER,
  clicked_product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_agent TEXT,
  ip_address TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  referrer TEXT,
  landing_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  start_time TIMESTAMPTZ DEFAULT now(),
  end_time TIMESTAMPTZ,
  duration INTEGER,
  page_views INTEGER DEFAULT 0,
  is_bounce BOOLEAN DEFAULT true
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS page_views_user_id_idx ON page_views(user_id);
CREATE INDEX IF NOT EXISTS page_views_session_id_idx ON page_views(session_id);
CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON page_views(created_at);

CREATE INDEX IF NOT EXISTS product_views_user_id_idx ON product_views(user_id);
CREATE INDEX IF NOT EXISTS product_views_session_id_idx ON product_views(session_id);
CREATE INDEX IF NOT EXISTS product_views_product_id_idx ON product_views(product_id);
CREATE INDEX IF NOT EXISTS product_views_created_at_idx ON product_views(created_at);

CREATE INDEX IF NOT EXISTS search_queries_user_id_idx ON search_queries(user_id);
CREATE INDEX IF NOT EXISTS search_queries_session_id_idx ON search_queries(session_id);
CREATE INDEX IF NOT EXISTS search_queries_query_idx ON search_queries(query);
CREATE INDEX IF NOT EXISTS search_queries_created_at_idx ON search_queries(created_at);

CREATE INDEX IF NOT EXISTS user_sessions_user_id_idx ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS user_sessions_session_id_idx ON user_sessions(session_id);
CREATE INDEX IF NOT EXISTS user_sessions_start_time_idx ON user_sessions(start_time);

-- Enable RLS on all tables
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for page_views
CREATE POLICY "Admins can view all page views" 
  ON page_views FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can insert page views" 
  ON page_views FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- Create policies for product_views
CREATE POLICY "Admins can view all product views" 
  ON product_views FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can insert product views" 
  ON product_views FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- Create policies for search_queries
CREATE POLICY "Admins can view all search queries" 
  ON search_queries FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can insert search queries" 
  ON search_queries FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- Create policies for user_sessions
CREATE POLICY "Admins can view all user sessions" 
  ON user_sessions FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can insert user sessions" 
  ON user_sessions FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

CREATE POLICY "Users can update their own sessions" 
  ON user_sessions FOR UPDATE 
  TO authenticated 
  USING (user_id = auth.uid());

-- Create function to update user_sessions when page_views are added
CREATE OR REPLACE FUNCTION update_user_session_on_page_view()
RETURNS TRIGGER AS $$
BEGIN
  -- Update page view count
  UPDATE user_sessions
  SET 
    page_views = page_views + 1,
    is_bounce = false,
    end_time = now(),
    duration = EXTRACT(EPOCH FROM (now() - start_time))::INTEGER
  WHERE session_id = NEW.session_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update user_sessions when page_views are added
CREATE TRIGGER update_user_session_on_page_view
AFTER INSERT ON page_views
FOR EACH ROW
EXECUTE FUNCTION update_user_session_on_page_view();

-- Create function to update product popularity based on views
CREATE OR REPLACE FUNCTION update_product_popularity()
RETURNS TRIGGER AS $$
BEGIN
  -- Update product popularity score
  UPDATE products
  SET 
    popularity_score = (
      SELECT COUNT(*) 
      FROM product_views 
      WHERE product_id = NEW.product_id 
      AND created_at > now() - INTERVAL '30 days'
    )
  WHERE id = NEW.product_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update product popularity based on views
CREATE TRIGGER update_product_popularity
AFTER INSERT ON product_views
FOR EACH ROW
EXECUTE FUNCTION update_product_popularity();

-- Create function to clean up old analytics data
CREATE OR REPLACE FUNCTION clean_old_analytics_data()
RETURNS void AS $$
BEGIN
  -- Delete page views older than 1 year
  DELETE FROM page_views
  WHERE created_at < now() - INTERVAL '1 year';
  
  -- Delete product views older than 1 year
  DELETE FROM product_views
  WHERE created_at < now() - INTERVAL '1 year';
  
  -- Delete search queries older than 1 year
  DELETE FROM search_queries
  WHERE created_at < now() - INTERVAL '1 year';
  
  -- Delete user sessions older than 1 year
  DELETE FROM user_sessions
  WHERE start_time < now() - INTERVAL '1 year';
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to clean up old analytics data
-- Note: This requires pg_cron extension to be enabled
-- COMMENT OUT if pg_cron is not available
-- SELECT cron.schedule('0 1 1 * *', 'SELECT clean_old_analytics_data()');