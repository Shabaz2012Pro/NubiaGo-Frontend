import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  CheckCircle, 
  Package, 
  Heart, 
  Tag, 
  MessageSquare, 
  AlertCircle,
  ChevronRight,
  Trash2,
  Filter,
  Search
} from 'lucide-react';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
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

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  className?: string;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClearAll,
  className
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'order': return <Package className="w-5 h-5" />;
      case 'wishlist': return <Heart className="w-5 h-5" />;
      case 'price': return <Tag className="w-5 h-5" />;
      case 'message': return <MessageSquare className="w-5 h-5" />;
      case 'system': return <AlertCircle className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
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

  const formatTimestamp = (timestamp: Date | string) => {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);

      // Check if date is valid
      if (!date || isNaN(date.getTime())) {
        return 'Just now';
      }

      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffInMs / (1000 * 60));
    const diffHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'order', label: 'Orders' },
    { id: 'price', label: 'Price Alerts' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'message', label: 'Messages' },
    { id: 'system', label: 'System' }
  ];

  // Filter notifications based on active filter and search query
  const filteredNotifications = notifications
    .filter(notification => {
      // Filter by type or read status
      if (activeFilter === 'all') return true;
      if (activeFilter === 'unread') return !notification.isRead;
      return notification.type === activeFilter;
    })
    .filter(notification => {
      // Filter by search query
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query)
      );
    });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const notificationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className={clsx('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <Badge variant="error" size="sm">
              {unreadCount} new
            </Badge>
          )}
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllAsRead}
            leftIcon={<CheckCircle className="w-4 h-4" />}
            disabled={unreadCount === 0}
          >
            Mark All Read
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            leftIcon={<Trash2 className="w-4 h-4" />}
            disabled={notifications.length === 0}
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={setSearchQuery}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
          <Filter className="w-4 h-4 text-neutral-500" />
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
      </div>

      {/* Notifications List */}
      <Card variant="default" padding="md">
        <div className="space-y-4">
          <AnimatePresence>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <motion.div
                  key={notification.id}
                  variants={notificationVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className={clsx(
                    'p-4 rounded-lg border transition-colors',
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
                            onClick={() => onMarkAsRead(notification.id)}
                          >
                            {notification.actionLabel || 'View Details'}
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </a>
                        )}

                        <div className="flex items-center space-x-2">
                          {!notification.isRead && (
                            <button
                              onClick={() => onMarkAsRead(notification.id)}
                              className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                            >
                              Mark as read
                            </button>
                          )}
                          <button
                            onClick={() => onDelete(notification.id)}
                            className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                  No notifications
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {activeFilter === 'all' 
                    ? searchQuery 
                      ? 'No notifications match your search.' 
                      : 'You don\'t have any notifications yet.'
                    : `You don't have any ${activeFilter === 'unread' ? 'unread' : activeFilter} notifications.`}
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
};

export default NotificationList;