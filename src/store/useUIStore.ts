import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  activeModal: string | null;
  loading: boolean;
  notifications: any[];
  searchOpen: boolean;
  cartOpen: boolean;
  viewMode: 'grid' | 'list';
  breadcrumbs: Array<{ label: string; path: string }>;

  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setLoading: (loading: boolean) => void;
  addNotification: (notification: any) => void;
  removeNotification: (id: string) => void;
  toggleSearch: () => void;
  toggleCart: () => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setBreadcrumbs: (breadcrumbs: Array<{ label: string; path: string }>) => void;
  reset: () => void;
}

interface UIState {
  // Modal states
  activeModal: string | null;
  modalData: any;

  // Notification states
  notifications: Notification[];

  // UI preferences
  viewMode: 'grid' | 'list';

  // Actions
  openModal: (modalId: string, data?: any) => void;
  closeModal: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setViewMode: (mode: 'grid' | 'list') => void;
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  autoClose?: boolean;
  duration?: number;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Modal states
      activeModal: null,
      modalData: null,

      // Notification states
      notifications: [],

      // UI preferences
      viewMode: 'grid',

      // Actions
      openModal: (modalId: string, data = null) => {
        set({ activeModal: modalId, modalData: data });
      },

      closeModal: () => {
        set({ activeModal: null, modalData: null });
      },

      addNotification: (notification) => {
        const id = Date.now().toString();
        const newNotification = { 
          id, 
          ...notification,
          autoClose: notification.autoClose ?? true,
          duration: notification.duration ?? 5000
        };

        set({ notifications: [...get().notifications, newNotification] });

        // Auto-remove notification after duration if autoClose is true
        if (newNotification.autoClose) {
          setTimeout(() => {
            get().removeNotification(id);
          }, newNotification.duration);
        }
      },

      removeNotification: (id: string) => {
        set({ 
          notifications: get().notifications.filter(notification => notification.id !== id) 
        });
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },

      setViewMode: (mode: 'grid' | 'list') => {
        set({ viewMode: mode });
      }
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ viewMode: state.viewMode }),
    }
  )
);