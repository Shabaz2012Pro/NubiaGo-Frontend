
-- Insert sample categories
INSERT INTO categories (name, slug, description, image_url) VALUES
  ('Electronics', 'electronics', 'Electronic devices and gadgets', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'),
  ('Home & Garden', 'home-garden', 'Home improvement and garden supplies', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'),
  ('Fashion', 'fashion', 'Clothing and accessories', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'),
  ('Sports & Outdoors', 'sports-outdoors', 'Sports equipment and outdoor gear', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'),
  ('Health & Beauty', 'health-beauty', 'Health and beauty products', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400');

-- Insert subcategories
INSERT INTO categories (name, slug, description, parent_id) VALUES
  ('Smartphones', 'smartphones', 'Mobile phones and accessories', (SELECT id FROM categories WHERE slug = 'electronics')),
  ('Laptops', 'laptops', 'Laptops and computing devices', (SELECT id FROM categories WHERE slug = 'electronics')),
  ('Home Appliances', 'home-appliances', 'Kitchen and home appliances', (SELECT id FROM categories WHERE slug = 'home-garden')),
  ('Furniture', 'furniture', 'Home and office furniture', (SELECT id FROM categories WHERE slug = 'home-garden')),
  ('Men''s Clothing', 'mens-clothing', 'Clothing for men', (SELECT id FROM categories WHERE slug = 'fashion')),
  ('Women''s Clothing', 'womens-clothing', 'Clothing for women', (SELECT id FROM categories WHERE slug = 'fashion'));

-- Create a test supplier profile
INSERT INTO profiles (id, first_name, last_name, email, role, is_verified, company) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'John', 'Supplier', 'supplier@nubiago.com', 'supplier', true, 'Tech Solutions Ltd'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Jane', 'Admin', 'admin@nubiago.com', 'admin', true, 'NubiaGO Admin'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Mike', 'Customer', 'customer@nubiago.com', 'buyer', true, NULL);

-- Insert sample products
INSERT INTO products (name, slug, description, short_description, price, category_id, supplier_id, images, tags, is_featured, inventory_quantity) VALUES
  (
    'iPhone 15 Pro',
    'iphone-15-pro',
    'The latest iPhone with advanced features and improved performance. Features a titanium design, A17 Pro chip, and advanced camera system.',
    'Latest iPhone with titanium design and A17 Pro chip',
    999.99,
    (SELECT id FROM categories WHERE slug = 'smartphones'),
    '550e8400-e29b-41d4-a716-446655440001',
    '["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"]',
    '{"smartphone", "apple", "iphone", "mobile"}',
    true,
    50
  ),
  (
    'MacBook Air M2',
    'macbook-air-m2',
    'Supercharged by the M2 chip, the redesigned MacBook Air combines incredible performance and up to 18 hours of battery life into its strikingly thin aluminum enclosure.',
    'M2-powered laptop with all-day battery life',
    1199.99,
    (SELECT id FROM categories WHERE slug = 'laptops'),
    '550e8400-e29b-41d4-a716-446655440001',
    '["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500", "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500"]',
    '{"laptop", "apple", "macbook", "computer"}',
    true,
    25
  ),
  (
    'KitchenAid Stand Mixer',
    'kitchenaid-stand-mixer',
    'Professional-grade stand mixer perfect for baking and cooking. Features 10 speeds and comes with multiple attachments.',
    'Professional stand mixer with 10 speeds',
    349.99,
    (SELECT id FROM categories WHERE slug = 'home-appliances'),
    '550e8400-e29b-41d4-a716-446655440001',
    '["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500"]',
    '{"kitchen", "appliance", "mixer", "baking"}',
    true,
    15
  ),
  (
    'Ergonomic Office Chair',
    'ergonomic-office-chair',
    'Comfortable ergonomic office chair with lumbar support, adjustable height, and breathable mesh back. Perfect for long work sessions.',
    'Ergonomic chair with lumbar support',
    299.99,
    (SELECT id FROM categories WHERE slug = 'furniture'),
    '550e8400-e29b-41d4-a716-446655440001',
    '["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500"]',
    '{"furniture", "chair", "office", "ergonomic"}',
    false,
    30
  ),
  (
    'Wireless Bluetooth Headphones',
    'wireless-bluetooth-headphones',
    'Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio quality.',
    'Premium wireless headphones with noise cancellation',
    199.99,
    (SELECT id FROM categories WHERE slug = 'electronics'),
    '550e8400-e29b-41d4-a716-446655440001',
    '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500"]',
    '{"headphones", "wireless", "bluetooth", "audio"}',
    true,
    75
  );

-- Insert sample reviews
INSERT INTO reviews (product_id, user_id, rating, title, comment) VALUES
  (
    (SELECT id FROM products WHERE slug = 'iphone-15-pro'),
    '550e8400-e29b-41d4-a716-446655440003',
    5,
    'Amazing phone!',
    'The iPhone 15 Pro exceeded my expectations. The camera quality is outstanding and the battery life is excellent.'
  ),
  (
    (SELECT id FROM products WHERE slug = 'macbook-air-m2'),
    '550e8400-e29b-41d4-a716-446655440003',
    4,
    'Great laptop for work',
    'Fast performance and great battery life. The M2 chip handles everything I throw at it.'
  ),
  (
    (SELECT id FROM products WHERE slug = 'wireless-bluetooth-headphones'),
    '550e8400-e29b-41d4-a716-446655440003',
    5,
    'Perfect sound quality',
    'These headphones have amazing sound quality and the noise cancellation works perfectly.'
  );
