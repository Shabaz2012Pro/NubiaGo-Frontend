import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  Package, 
  Heart, 
  Tag, 
  MessageSquare,
  Settings,
  Trash2,
  Clock,
  ChevronRight
} from 'lucide-react';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import Card from '../atoms/Card';
import { clsx } from 'clsx';

export interface Notification {
  id: string;
  type: 'order' | 'wishlist' | 'price' | 'system' | 'message';
  priority: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
  timestamp: Date;
  image?: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  className
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock notifications data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'order',
          priority: 'high',
          title: 'Order Shipped',
          message: 'Your order #ORD-12345 has been shipped and is on its way.',
          isRead: false,
          actionUrl: '#track-order',
          actionLabel: 'Track Order',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        {
          id: '2',
          type: 'price',
          priority: 'medium',
          title: 'Price Drop Alert',
          message: 'A product in your wishlist is now 15% off.',
          isRead: false,
          actionUrl: '#wishlist',
          actionLabel: 'View Product',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        {
          id: '3',
          type: 'wishlist',
          priority: 'low',
          title: 'Back in Stock',
          message: 'An item from your wishlist is back in stock.',
          isRead: true,
          actionUrl: '#product?id=123',
          actionLabel: 'View Product',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        {
          id: '4',
          type: 'message',
          priority: 'medium',
          title: 'New Message from Supplier',
          message: 'You have a new message from AudioTech Turkey regarding your inquiry.',
          isRead: true,
          actionUrl: '#messages',
          actionLabel: 'View Message',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        },
        {
          id: '5',
          type: 'system',
          priority: 'high',
          title: 'Account Security Alert',
          message: 'We detected a login from a new device. Please verify if this was you.',
          isRead: true,
          actionUrl: '#security',
          actionLabel: 'Review Activity',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
        }
      ];

      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'order': return <Package className="w-5 h-5" />;
      case 'wishlist': return <Heart className="w-5 h-5" />;
      case 'price': return <Tag className="w-5 h-5" />;
      case 'message': return <MessageSquare className="w-5 h-5" />;
      case 'system': return <AlertCircle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'order': return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
      case 'wishlist': return 'text-pink-500 bg-pink-100 dark:bg-pink-900/20';
      case 'price': return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case 'message': return 'text-purple-500 bg-purple-100 dark:bg-purple-900/20';
      case 'system': return 'text-red-500 bg-red-100 dark:bg-red-900/20';
      default: return 'text-neutral-500 bg-neutral-100 dark:bg-neutral-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="error" size="sm">High</Badge>;
      case 'medium':
        return <Badge variant="warning" size="sm">Medium</Badge>;
      case 'low':
        return <Badge variant="primary" size="sm">Low</Badge>;
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp: Date | string): string => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;

    // Check if date is valid
    if (!date || isNaN(date.getTime())) {
      return 'Just now';
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const diffMins = Math.floor(diffInSeconds / 60);
    const diffHours = Math.floor(diffInSeconds / (60 * 60));
    const diffDays = Math.floor(diffInSeconds / (60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : activeFilter === 'unread'
    ? notifications.filter(n => !n.isRead)
    : notifications.filter(n => n.type === activeFilter);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'order', label: 'Orders' },
    { id: 'price', label: 'Price Alerts' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'message', label: 'Messages' },
    { id: 'system', label: 'System' }
  ];

  const panelVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    }
  };

  const notificationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - only show when not embedded */}
          {!className?.includes('relative') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={onClose}
            />
          )}

          {/* Notification Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={clsx(
              className?.includes('relative') 
                ? 'h-full w-full bg-white dark:bg-neutral-900 flex flex-col'
                : 'fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-neutral-900 shadow-2xl z-50 flex flex-col',
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Notifications
                </h2>
                {unreadCount > 0 && (
                  <Badge variant="error" size="sm">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              {!className?.includes('relative') && (
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 overflow-x-auto">
              <div className="flex space-x-2">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={clsx(
                      'px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors',
                      activeFilter === filter.id
                        ? 'bg-red-600 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto p-4">
              {isLoading ? (
                <div className="flex flex-col space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
                          <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
                          <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredNotifications.length > 0 ? (
                <AnimatePresence>
                  {filteredNotifications.map(notification => (
                    <motion.div
                      key={notification.id}
                      variants={notificationVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className={clsx(
                        'mb-4 p-4 rounded-lg border transition-colors',
                        notification.isRead 
                          ? 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700' 
                          : 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/30'
                      )}
                    >
                      <div className="flex items-start">
                        <div className={clsx(
                          'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                          getTypeColor(notification.type)
                        )}>
                          {getTypeIcon(notification.type)}
                        </div>

                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                                {notification.title}
                              </h3>
                              {!notification.isRead && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              {getPriorityBadge(notification.priority)}
                              <span className="text-xs text-neutral-500">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                            </div>
                          </div>

                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                            {notification.message}
                          </p>

                          {notification.image && (
                            <div className="mb-3">
                              <img 
                                src={notification.image} 
                                alt="Notification" 
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            {notification.actionUrl && (
                              <a 
                                href={notification.actionUrl}
                                className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                                onClick={() => markAsRead(notification.id)}
                              >
                                {notification.actionLabel || 'View Details'}
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </a>
                            )}

                            <div className="flex items-center space-x-2">
                              {!notification.isRead && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                                >
                                  Mark as read
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-300"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    No notifications
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {activeFilter === 'all' 
                      ? 'You don\'t have any notifications yet.' 
                      : `You don't have any ${activeFilter === 'unread' ? 'unread' : activeFilter} notifications.`}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  leftIcon={<CheckCircle className="w-4 h-4" />}
                  disabled={!notifications.some(n => !n.isRead)}
                >
                  Mark All as Read
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllNotifications}
                  leftIcon={<Trash2 className="w-4 h-4" />}
                  disabled={notifications.length === 0}
                >
                  Clear All
                </Button>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  leftIcon={<Settings className="w-4 h-4" />}
                  onClick={() => window.location.hash = 'settings?tab=notifications'}
                >
                  Notification Settings
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;