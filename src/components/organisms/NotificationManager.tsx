
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Settings, 
  Filter, 
  MoreVertical,
  CheckCircle,
  Trash2,
  Archive,
  Star,
  StarOff,
  RefreshCw
} from 'lucide-react';
import NotificationList from '../molecules/NotificationList';
import NotificationPreferences from '../molecules/NotificationPreferences';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import { useNotificationStore } from '../../store/useNotificationStore';
import { clsx } from 'clsx';

interface NotificationManagerProps {
  className?: string;
}

const NotificationManager: React.FC<NotificationManagerProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'preferences'>('notifications');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications
  } = useNotificationStore();

  // Simulate adding some sample notifications on first load
  useEffect(() => {
    if (notifications.length === 0) {
      // Add some sample notifications
      const sampleNotifications = [
        {
          type: 'order' as const,
          priority: 'high' as const,
          title: 'Order Shipped',
          message: 'Your order #12345 has been shipped and is on its way!',
          actionUrl: '#/orders/12345',
          actionLabel: 'Track Order'
        },
        {
          type: 'price' as const,
          priority: 'medium' as const,
          title: 'Price Drop Alert',
          message: 'The iPhone 14 Pro you\'re watching is now 15% off!',
          actionUrl: '#/products/iphone-14-pro',
          actionLabel: 'View Deal'
        },
        {
          type: 'wishlist' as const,
          priority: 'low' as const,
          title: 'Wishlist Item Available',
          message: 'Samsung Galaxy Watch is back in stock',
          actionUrl: '#/wishlist',
          actionLabel: 'View Wishlist'
        },
        {
          type: 'system' as const,
          priority: 'medium' as const,
          title: 'Security Update',
          message: 'We\'ve updated our security measures. Please review your account settings.',
          actionUrl: '#/account/security',
          actionLabel: 'Review Settings'
        },
        {
          type: 'message' as const,
          priority: 'low' as const,
          title: 'Customer Support',
          message: 'Thank you for contacting us. We\'ll get back to you within 24 hours.',
          actionUrl: '#/support',
          actionLabel: 'View Conversation'
        }
      ];

      sampleNotifications.forEach(notification => {
        addNotification(notification);
      });
    }
  }, [notifications.length, addNotification]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call to refresh notifications
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const totalCount = notifications.length;

  const tabs = [
    {
      id: 'notifications',
      label: 'Notifications',
      count: totalCount,
      icon: <Bell className="w-4 h-4" />
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: <Settings className="w-4 h-4" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-lg">
              <Bell className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                Notification Center
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                Manage your notifications and preferences
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {unreadCount > 0 && (
              <Badge variant="error" size="md">
                {unreadCount} unread
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              leftIcon={<RefreshCw className={clsx('w-4 h-4', isRefreshing && 'animate-spin')} />}
              disabled={isRefreshing}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card variant="default" padding="md">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg mr-3">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Total</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{totalCount}</p>
              </div>
            </div>
          </Card>
          
          <Card variant="default" padding="md">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-lg mr-3">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Unread</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{unreadCount}</p>
              </div>
            </div>
          </Card>
          
          <Card variant="default" padding="md">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg mr-3">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Read</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{totalCount - unreadCount}</p>
              </div>
            </div>
          </Card>
          
          <Card variant="default" padding="md">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-lg mr-3">
                <Archive className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">This Week</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {notifications.filter(n => {
                    const notifDate = new Date(n.timestamp);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return notifDate >= weekAgo;
                  }).length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-neutral-200 dark:border-neutral-700">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'notifications' | 'preferences')}
                className={clsx(
                  'flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                )}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <Badge variant={activeTab === tab.id ? 'primary' : 'secondary'} size="sm">
                    {tab.count}
                  </Badge>
                )}
              </button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div variants={itemVariants}>
        {activeTab === 'notifications' ? (
          <NotificationList
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
            onDelete={deleteNotification}
            onClearAll={clearAllNotifications}
          />
        ) : (
          <NotificationPreferences />
        )}
      </motion.div>
    </motion.div>
  );
};

export default NotificationManager;
