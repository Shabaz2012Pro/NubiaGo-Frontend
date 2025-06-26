import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export interface ToastNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  autoClose?: boolean;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationState {
  notifications: Notification[];
  toasts: ToastNotification[];
  preferences: {
    channels: {
      app: boolean;
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    types: {
      [key: string]: {
        app: boolean;
        email: boolean;
        push: boolean;
        sms: boolean;
      };
    };
  };

  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;

  addToast: (toast: Omit<ToastNotification, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;

  updatePreferences: (preferences: any) => void;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  maxNotifications: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  getNotificationsByType: (type: Notification['type']) => Notification[];
  getRecentNotifications: (limit?: number) => Notification[];
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      toasts: [],
      preferences: {
        channels: {
          app: true,
          email: true,
          push: false,
          sms: false
        },
        types: {
          order_updates: {
            app: true,
            email: true,
            push: true,
            sms: false
          },
          wishlist_alerts: {
            app: true,
            email: true,
            push: false,
            sms: false
          },
          price_alerts: {
            app: true,
            email: true,
            push: false,
            sms: false
          },
          security_alerts: {
            app: true,
            email: true,
            push: true,
            sms: true
          },
          promotions: {
            app: true,
            email: false,
            push: false,
            sms: false
          }
        }
      },

      // Notification actions
      addNotification: (notification) => {
        const id = Date.now().toString();
        const newNotification = {
          ...notification,
          id,
          timestamp: new Date().toISOString(),
          isRead: false
        };

        set(state => ({
          notifications: [newNotification, ...state.notifications]
        }));

        // Also add as toast if it's a high priority notification
        if (notification.priority === 'high') {
          get().addToast({
            type: notification.type === 'system' ? 'error' : 'info',
            message: notification.title,
            autoClose: true,
            duration: 5000,
            action: notification.actionUrl ? {
              label: notification.actionLabel || 'View',
              onClick: () => {
                window.location.hash = notification.actionUrl!.substring(1);
                get().markAsRead(id);
              }
            } : undefined
          });
        }
      },

      markAsRead: (id) => {
        set(state => ({
          notifications: state.notifications.map(notification => 
            notification.id === id 
              ? { ...notification, isRead: true } 
              : notification
          )
        }));
      },

      markAllAsRead: () => {
        set(state => ({
          notifications: state.notifications.map(notification => ({ ...notification, isRead: true }))
        }));
      },

      deleteNotification: (id) => {
        set(state => ({
          notifications: state.notifications.filter(notification => notification.id !== id)
        }));
      },

      clearAllNotifications: () => {
        set({ notifications: [] });
      },

      // Toast actions
      addToast: (toast) => {
        const id = Date.now().toString();
        const newToast = { ...toast, id };

        set(state => ({
          toasts: [...state.toasts, newToast]
        }));

        // Auto-remove toast after duration if autoClose is true
        if (toast.autoClose) {
          setTimeout(() => {
            get().removeToast(id);
          }, toast.duration || 5000);
        }
      },

      removeToast: (id) => {
        set(state => ({
          toasts: state.toasts.filter(toast => toast.id !== id)
        }));
      },

      clearAllToasts: () => {
        set({ toasts: [] });
      },

      // Preferences actions
      updatePreferences: (preferences) => {
        set({ preferences });
      }
    }),
    {
      name: 'notification-storage',
      partialize: (state) => ({ 
        notifications: state.notifications,
        preferences: state.preferences
      }),
    }
  )
);

export default useNotificationStore;