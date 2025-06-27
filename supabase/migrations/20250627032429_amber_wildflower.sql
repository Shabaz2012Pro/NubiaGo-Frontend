/*
  # Create Notifications Schema

  1. New Tables
    - `notifications` - Stores user notifications
    - `notification_types` - Lookup table for notification types
    - `notification_preferences` - Stores user notification preferences
  
  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
    
  3. Changes
    - Added comprehensive notification system
    - Added notification preferences
    - Added support for multiple notification channels
*/

-- Create notification types lookup table
CREATE TABLE IF NOT EXISTS notification_types (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default notification types
INSERT INTO notification_types (name, description, icon, color) VALUES
  ('order_placed', 'Order has been placed', 'shopping-bag', 'blue'),
  ('order_confirmed', 'Order has been confirmed', 'check-circle', 'green'),
  ('order_shipped', 'Order has been shipped', 'truck', 'blue'),
  ('order_delivered', 'Order has been delivered', 'package', 'green'),
  ('order_cancelled', 'Order has been cancelled', 'x-circle', 'red'),
  ('payment_received', 'Payment has been received', 'credit-card', 'green'),
  ('payment_failed', 'Payment has failed', 'alert-circle', 'red'),
  ('price_drop', 'Price drop on wishlist item', 'trending-down', 'purple'),
  ('back_in_stock', 'Item is back in stock', 'check', 'green'),
  ('review_approved', 'Your review has been approved', 'thumbs-up', 'blue'),
  ('account_update', 'Account information updated', 'user', 'blue'),
  ('security_alert', 'Security alert', 'shield', 'red'),
  ('promotion', 'Promotional message', 'tag', 'purple'),
  ('system', 'System notification', 'info', 'gray')
ON CONFLICT (name) DO NOTHING;

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type_id INTEGER NOT NULL REFERENCES notification_types(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  action_url TEXT,
  action_text TEXT,
  image_url TEXT,
  is_read BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ
);

-- Create notification channels table
CREATE TABLE IF NOT EXISTS notification_channels (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default notification channels
INSERT INTO notification_channels (name, description) VALUES
  ('app', 'In-app notifications'),
  ('email', 'Email notifications'),
  ('sms', 'SMS notifications'),
  ('push', 'Push notifications')
ON CONFLICT (name) DO NOTHING;

-- Create notification preferences table
CREATE TABLE IF NOT EXISTS notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type_id INTEGER NOT NULL REFERENCES notification_types(id),
  channel_id INTEGER NOT NULL REFERENCES notification_channels(id),
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, type_id, channel_id)
);

-- Enable RLS on all tables
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications
CREATE POLICY "Users can view their own notifications" 
  ON notifications FOR SELECT 
  TO authenticated 
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all notifications" 
  ON notifications FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can update their own notifications" 
  ON notifications FOR UPDATE 
  TO authenticated 
  USING (user_id = auth.uid());

-- Create policies for notification types
CREATE POLICY "Everyone can view notification types" 
  ON notification_types FOR SELECT 
  TO authenticated 
  USING (true);

-- Create policies for notification channels
CREATE POLICY "Everyone can view notification channels" 
  ON notification_channels FOR SELECT 
  TO authenticated 
  USING (true);

-- Create policies for notification preferences
CREATE POLICY "Users can view their own notification preferences" 
  ON notification_preferences FOR SELECT 
  TO authenticated 
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notification preferences" 
  ON notification_preferences FOR UPDATE 
  TO authenticated 
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own notification preferences" 
  ON notification_preferences FOR INSERT 
  TO authenticated 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own notification preferences" 
  ON notification_preferences FOR DELETE 
  TO authenticated 
  USING (user_id = auth.uid());

-- Create function to update notification_preferences updated_at timestamp
CREATE OR REPLACE FUNCTION update_notification_preferences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update notification_preferences updated_at timestamp
CREATE TRIGGER update_notification_preferences_updated_at
BEFORE UPDATE ON notification_preferences
FOR EACH ROW
EXECUTE FUNCTION update_notification_preferences_updated_at();

-- Create function to set default notification preferences for new users
CREATE OR REPLACE FUNCTION set_default_notification_preferences()
RETURNS TRIGGER AS $$
DECLARE
  type_rec RECORD;
  channel_rec RECORD;
BEGIN
  -- For each notification type and channel
  FOR type_rec IN SELECT id FROM notification_types LOOP
    FOR channel_rec IN SELECT id FROM notification_channels LOOP
      -- Set default preferences
      INSERT INTO notification_preferences (user_id, type_id, channel_id, is_enabled)
      VALUES (
        NEW.id, 
        type_rec.id, 
        channel_rec.id, 
        -- Enable app notifications for all types by default
        -- Enable email for important notifications
        -- Disable SMS and push by default
        CASE 
          WHEN channel_rec.name = 'app' THEN true
          WHEN channel_rec.name = 'email' AND type_rec.name IN (
            'order_placed', 'order_shipped', 'order_delivered', 'payment_received', 
            'payment_failed', 'security_alert'
          ) THEN true
          ELSE false
        END
      );
    END LOOP;
  END LOOP;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to set default notification preferences for new users
CREATE TRIGGER set_default_notification_preferences
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION set_default_notification_preferences();

-- Create function to clean up old notifications
CREATE OR REPLACE FUNCTION clean_old_notifications()
RETURNS void AS $$
BEGIN
  -- Archive notifications older than 30 days
  UPDATE notifications
  SET is_archived = true
  WHERE created_at < now() - INTERVAL '30 days'
    AND is_archived = false;
  
  -- Delete archived notifications older than 90 days
  DELETE FROM notifications
  WHERE created_at < now() - INTERVAL '90 days'
    AND is_archived = true;
  
  -- Delete expired notifications
  DELETE FROM notifications
  WHERE expires_at IS NOT NULL
    AND expires_at < now();
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to clean up old notifications
-- Note: This requires pg_cron extension to be enabled
-- COMMENT OUT if pg_cron is not available
-- SELECT cron.schedule('0 2 * * *', 'SELECT clean_old_notifications()');