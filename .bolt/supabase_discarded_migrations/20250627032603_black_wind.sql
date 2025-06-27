/*
  # Create Admin Dashboard Views

  1. New Views
    - `admin_dashboard_stats` - Key metrics for admin dashboard
    - `admin_sales_by_day` - Daily sales data
    - `admin_sales_by_category` - Sales data by product category
    - `admin_top_products` - Top selling products
    - `admin_top_customers` - Top customers by order value
  
  2. Security
    - Enable RLS on all views
    - Add policies for admin access only
    
  3. Changes
    - Added comprehensive analytics views for admin dashboard
    - Added sales reporting views
    - Added customer insights views
*/

-- Create admin_dashboard_stats view
CREATE OR REPLACE VIEW admin_dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM orders) AS total_orders,
  (SELECT COUNT(*) FROM orders WHERE status_id = (SELECT id FROM order_statuses WHERE name = 'delivered')) AS completed_orders,
  (SELECT COUNT(*) FROM orders WHERE status_id = (SELECT id FROM order_statuses WHERE name = 'cancelled')) AS cancelled_orders,
  (SELECT COUNT(*) FROM auth.users) AS total_users,
  (SELECT COUNT(*) FROM auth.users WHERE created_at > now() - INTERVAL '30 days') AS new_users_30d,
  (SELECT COUNT(*) FROM products) AS total_products,
  (SELECT COUNT(*) FROM products WHERE in_stock = true) AS in_stock_products,
  (SELECT COUNT(*) FROM products WHERE in_stock = false) AS out_of_stock_products,
  (SELECT COALESCE(SUM(total), 0) FROM orders) AS total_revenue,
  (SELECT COALESCE(SUM(total), 0) FROM orders WHERE created_at > now() - INTERVAL '30 days') AS revenue_30d,
  (SELECT COALESCE(AVG(total), 0) FROM orders) AS average_order_value,
  (SELECT COUNT(*) FROM reviews) AS total_reviews,
  (SELECT COUNT(*) FROM reviews WHERE is_approved = false) AS pending_reviews;

-- Create admin_sales_by_day view
CREATE OR REPLACE VIEW admin_sales_by_day AS
SELECT
  DATE_TRUNC('day', created_at) AS day,
  COUNT(*) AS order_count,
  SUM(total) AS total_sales,
  AVG(total) AS average_order_value,
  SUM(tax) AS total_tax,
  SUM(shipping_cost) AS total_shipping,
  SUM(discount) AS total_discounts
FROM orders
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY day DESC;

-- Create admin_sales_by_category view
CREATE OR REPLACE VIEW admin_sales_by_category AS
SELECT
  p.category AS category,
  COUNT(DISTINCT o.id) AS order_count,
  SUM(oi.total_price) AS total_sales,
  COUNT(oi.id) AS items_sold
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN orders o ON oi.order_id = o.id
WHERE o.status_id NOT IN (SELECT id FROM order_statuses WHERE name IN ('cancelled', 'refunded'))
GROUP BY p.category
ORDER BY total_sales DESC;

-- Create admin_top_products view
CREATE OR REPLACE VIEW admin_top_products AS
SELECT
  p.id AS product_id,
  p.name AS product_name,
  p.category AS category,
  COUNT(DISTINCT o.id) AS order_count,
  SUM(oi.quantity) AS quantity_sold,
  SUM(oi.total_price) AS total_sales,
  p.rating AS rating,
  p.reviews AS review_count
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN orders o ON oi.order_id = o.id
WHERE o.status_id NOT IN (SELECT id FROM order_statuses WHERE name IN ('cancelled', 'refunded'))
GROUP BY p.id, p.name, p.category, p.rating, p.reviews
ORDER BY quantity_sold DESC;

-- Create admin_top_customers view
CREATE OR REPLACE VIEW admin_top_customers AS
SELECT
  o.user_id,
  p.first_name || ' ' || p.last_name AS customer_name,
  p.email AS email,
  COUNT(o.id) AS order_count,
  SUM(o.total) AS total_spent,
  MAX(o.created_at) AS last_order_date,
  MIN(o.created_at) AS first_order_date,
  AVG(o.total) AS average_order_value
FROM orders o
JOIN profiles p ON o.user_id = p.id
WHERE o.status_id NOT IN (SELECT id FROM order_statuses WHERE name IN ('cancelled', 'refunded'))
GROUP BY o.user_id, p.first_name, p.last_name, p.email
ORDER BY total_spent DESC;

-- Create admin_inventory_alerts view
CREATE OR REPLACE VIEW admin_inventory_alerts AS
SELECT
  p.id AS product_id,
  p.name AS product_name,
  p.category AS category,
  COALESCE(pv.sku, 'N/A') AS sku,
  CASE
    WHEN pv.id IS NOT NULL THEN pv.inventory_quantity
    ELSE p.stock_quantity
  END AS quantity,
  CASE
    WHEN pv.id IS NOT NULL THEN
      CASE
        WHEN pv.inventory_quantity <= 0 THEN 'Out of stock'
        WHEN pv.inventory_quantity <= 5 THEN 'Low stock'
        WHEN pv.inventory_quantity <= 10 THEN 'Medium stock'
        ELSE 'In stock'
      END
    ELSE
      CASE
        WHEN p.stock_quantity <= 0 THEN 'Out of stock'
        WHEN p.stock_quantity <= 5 THEN 'Low stock'
        WHEN p.stock_quantity <= 10 THEN 'Medium stock'
        ELSE 'In stock'
      END
  END AS stock_status,
  CASE
    WHEN pv.id IS NOT NULL THEN pv.updated_at
    ELSE p.updated_at
  END AS last_updated
FROM products p
LEFT JOIN product_variants pv ON p.id = pv.product_id
WHERE
  (pv.id IS NOT NULL AND pv.inventory_quantity <= 10) OR
  (pv.id IS NULL AND p.stock_quantity <= 10)
ORDER BY
  CASE
    WHEN pv.id IS NOT NULL THEN pv.inventory_quantity
    ELSE p.stock_quantity
  END ASC;

-- Create admin_recent_activity view
CREATE OR REPLACE VIEW admin_recent_activity AS
SELECT
  'order' AS activity_type,
  o.id AS reference_id,
  o.order_number AS reference_code,
  p.first_name || ' ' || p.last_name AS user_name,
  os.name AS activity_description,
  o.total AS amount,
  o.created_at AS activity_date
FROM orders o
JOIN profiles p ON o.user_id = p.id
JOIN order_statuses os ON o.status_id = os.id
UNION ALL
SELECT
  'review' AS activity_type,
  r.id AS reference_id,
  p.name AS reference_code,
  pr.first_name || ' ' || pr.last_name AS user_name,
  'New review: ' || r.title AS activity_description,
  r.rating AS amount,
  r.created_at AS activity_date
FROM reviews r
JOIN products p ON r.product_id = p.id
JOIN profiles pr ON r.user_id = pr.id
UNION ALL
SELECT
  'user' AS activity_type,
  p.id AS reference_id,
  p.email AS reference_code,
  p.first_name || ' ' || p.last_name AS user_name,
  'New user registration' AS activity_description,
  NULL AS amount,
  p.created_at AS activity_date
FROM profiles p
ORDER BY activity_date DESC
LIMIT 100;

-- Enable RLS on all views
ALTER VIEW admin_dashboard_stats ENABLE ROW LEVEL SECURITY;
ALTER VIEW admin_sales_by_day ENABLE ROW LEVEL SECURITY;
ALTER VIEW admin_sales_by_category ENABLE ROW LEVEL SECURITY;
ALTER VIEW admin_top_products ENABLE ROW LEVEL SECURITY;
ALTER VIEW admin_top_customers ENABLE ROW LEVEL SECURITY;
ALTER VIEW admin_inventory_alerts ENABLE ROW LEVEL SECURITY;
ALTER VIEW admin_recent_activity ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_dashboard_stats
CREATE POLICY "Admins can view dashboard stats" 
  ON admin_dashboard_stats FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for admin_sales_by_day
CREATE POLICY "Admins can view sales by day" 
  ON admin_sales_by_day FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for admin_sales_by_category
CREATE POLICY "Admins can view sales by category" 
  ON admin_sales_by_category FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for admin_top_products
CREATE POLICY "Admins can view top products" 
  ON admin_top_products FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for admin_top_customers
CREATE POLICY "Admins can view top customers" 
  ON admin_top_customers FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for admin_inventory_alerts
CREATE POLICY "Admins can view inventory alerts" 
  ON admin_inventory_alerts FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Create policies for admin_recent_activity
CREATE POLICY "Admins can view recent activity" 
  ON admin_recent_activity FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));