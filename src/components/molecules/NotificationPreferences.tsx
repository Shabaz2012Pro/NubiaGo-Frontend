import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Package, 
  Heart, 
  Tag, 
  AlertCircle,
  Info,
  CheckCircle
} from 'lucide-react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import { clsx } from 'clsx';

interface NotificationChannel {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface NotificationType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  channels: {
    [key: string]: boolean;
  };
}

interface NotificationPreferencesProps {
  onSave?: (preferences: any) => void;
  className?: string;
}

const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({
  onSave,
  className
}) => {
  const channels: NotificationChannel[] = [
    {
      id: 'app',
      name: 'In-App',
      description: 'Notifications within the application',
      icon: <Bell className="w-5 h-5" />
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Notifications sent to your email address',
      icon: <Mail className="w-5 h-5" />
    },
    {
      id: 'push',
      name: 'Push',
      description: 'Notifications sent to your browser or mobile device',
      icon: <Smartphone className="w-5 h-5" />
    },
    {
      id: 'sms',
      name: 'SMS',
      description: 'Text messages sent to your phone number',
      icon: <MessageSquare className="w-5 h-5" />
    }
  ];

  const [notificationTypes, setNotificationTypes] = useState<NotificationType[]>([
    {
      id: 'order_updates',
      name: 'Order Updates',
      description: 'Get notified about order status changes',
      icon: <Package className="w-5 h-5" />,
      channels: {
        app: true,
        email: true,
        push: true,
        sms: false
      }
    },
    {
      id: 'wishlist_alerts',
      name: 'Wishlist Alerts',
      description: 'Get notified when items in your wishlist change',
      icon: <Heart className="w-5 h-5" />,
      channels: {
        app: true,
        email: true,
        push: false,
        sms: false
      }
    },
    {
      id: 'price_alerts',
      name: 'Price Alerts',
      description: 'Get notified when prices drop on products you\'re watching',
      icon: <Tag className="w-5 h-5" />,
      channels: {
        app: true,
        email: true,
        push: false,
        sms: false
      }
    },
    {
      id: 'security_alerts',
      name: 'Security Alerts',
      description: 'Get notified about security-related events',
      icon: <AlertCircle className="w-5 h-5" />,
      channels: {
        app: true,
        email: true,
        push: true,
        sms: true
      }
    },
    {
      id: 'promotions',
      name: 'Promotions & Deals',
      description: 'Get notified about special offers and promotions',
      icon: <Tag className="w-5 h-5" />,
      channels: {
        app: true,
        email: false,
        push: false,
        sms: false
      }
    }
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const toggleNotification = (typeId: string, channelId: string) => {
    setNotificationTypes(prev => 
      prev.map(type => 
        type.id === typeId 
          ? { 
              ...type, 
              channels: { 
                ...type.channels, 
                [channelId]: !type.channels[channelId] 
              } 
            } 
          : type
      )
    );
  };

  const toggleAllForType = (typeId: string, value: boolean) => {
    setNotificationTypes(prev => 
      prev.map(type => 
        type.id === typeId 
          ? { 
              ...type, 
              channels: Object.keys(type.channels).reduce((acc, channelId) => {
                acc[channelId] = value;
                return acc;
              }, {} as Record<string, boolean>)
            } 
          : type
      )
    );
  };

  const toggleAllForChannel = (channelId: string, value: boolean) => {
    setNotificationTypes(prev => 
      prev.map(type => ({
        ...type,
        channels: {
          ...type.channels,
          [channelId]: value
        }
      }))
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      if (onSave) {
        onSave(notificationTypes);
      }
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

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
      className={clsx('space-y-6', className)}
    >
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Notification Preferences
            </h2>
          </div>
          
          <Button
            variant="primary"
            onClick={handleSave}
            loading={isSaving}
            className="bg-red-600 hover:bg-red-700"
          >
            Save Preferences
          </Button>
        </div>

        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg flex items-center space-x-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Your notification preferences have been saved successfully.</span>
          </motion.div>
        )}

        <Card variant="default" padding="lg">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Notification Channels
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Choose how you want to receive different types of notifications
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-800">
                  <th className="py-3 px-4 text-left font-medium text-neutral-900 dark:text-neutral-100">
                    Notification Type
                  </th>
                  {channels.map(channel => (
                    <th key={channel.id} className="py-3 px-4 text-center font-medium text-neutral-900 dark:text-neutral-100">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-1">
                          {channel.icon}
                          <span>{channel.name}</span>
                        </div>
                        <span className="text-xs font-normal text-neutral-500 mt-1">
                          {channel.description}
                        </span>
                      </div>
                    </th>
                  ))}
                  <th className="py-3 px-4 text-center font-medium text-neutral-900 dark:text-neutral-100">
                    All/None
                  </th>
                </tr>
              </thead>
              <tbody>
                {notificationTypes.map((type, index) => (
                  <tr 
                    key={type.id} 
                    className={clsx(
                      index % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-800/50'
                    )}
                  >
                    <td className="py-4 px-4 border-t border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                          {type.icon}
                        </div>
                        <div>
                          <div className="font-medium text-neutral-900 dark:text-neutral-100">
                            {type.name}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {type.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    {channels.map(channel => (
                      <td key={`${type.id}-${channel.id}`} className="py-4 px-4 text-center border-t border-neutral-200 dark:border-neutral-700">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={type.channels[channel.id] || false}
                            onChange={() => toggleNotification(type.id, channel.id)}
                          />
                          <div className={clsx(
                            'relative w-11 h-6 bg-neutral-200 rounded-full transition-colors',
                            type.channels[channel.id] ? 'bg-red-600' : 'bg-neutral-300 dark:bg-neutral-600'
                          )}>
                            <div className={clsx(
                              'absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform',
                              type.channels[channel.id] ? 'transform translate-x-5' : ''
                            )}></div>
                          </div>
                        </label>
                      </td>
                    ))}
                    <td className="py-4 px-4 text-center border-t border-neutral-200 dark:border-neutral-700">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => toggleAllForType(type.id, true)}
                          className="p-1 text-xs text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                        >
                          All
                        </button>
                        <span className="text-neutral-300 dark:text-neutral-600">|</span>
                        <button
                          onClick={() => toggleAllForType(type.id, false)}
                          className="p-1 text-xs text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                        >
                          None
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr className="bg-neutral-50 dark:bg-neutral-800">
                  <td className="py-4 px-4 border-t border-neutral-200 dark:border-neutral-700 font-medium">
                    Toggle All
                  </td>
                  {channels.map(channel => (
                    <td key={`toggle-all-${channel.id}`} className="py-4 px-4 text-center border-t border-neutral-200 dark:border-neutral-700">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => toggleAllForChannel(channel.id, true)}
                          className="p-1 text-xs text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                        >
                          All
                        </button>
                        <span className="text-neutral-300 dark:text-neutral-600">|</span>
                        <button
                          onClick={() => toggleAllForChannel(channel.id, false)}
                          className="p-1 text-xs text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                        >
                          None
                        </button>
                      </div>
                    </td>
                  ))}
                  <td className="py-4 px-4 text-center border-t border-neutral-200 dark:border-neutral-700"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card variant="default" padding="lg">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                About Notification Preferences
              </h3>
              <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>In-App notifications will always appear in your notification center.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>Email notifications will be sent to your registered email address.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>Push notifications require you to allow browser notifications or install our mobile app.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>SMS notifications will be sent to your registered phone number (standard rates may apply).</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default NotificationPreferences;