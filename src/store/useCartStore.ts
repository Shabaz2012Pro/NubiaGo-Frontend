import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { CartItem, Product } from '../types';
import { backendApi } from '../api/backendApi';

export interface CartItem {
  id?: string;
  product: Product;
  quantity: number;
  variantId?: string;
  addedAt: Date;
  price?: number; // Allow override for discounts
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;

  // Derived state (computed)
  totalItems: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;

  // Actions
  addItem: (product: Product, quantity?: number, variantId?: string) => Promise<{ success: boolean; message: string }>;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => Promise<{ success: boolean; message: string }>;
  clearCart: () => Promise<void>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  syncWithServer: () => Promise<void>;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

const TAX_RATE = 0.08; // 8% tax
const SHIPPING_THRESHOLD = 50; // Free shipping over $50
const SHIPPING_COST = 5.99;

// Helper to load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('nubiago-cart');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load cart from storage:', error);
    return [];
  }
};

// Helper to save cart to localStorage
const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem('nubiago-cart', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to storage:', error);
  }
};

export const useCartStore = create<CartState>()(
  persist(
    subscribeWithSelector(
      (set, get) => ({
        items: [],
        isOpen: false,
        isLoading: false,
        error: null,

        // Computed getters
        get totalItems() {
          return get().items.reduce((total, item) => total + item.quantity, 0);
        },

        get subtotal() {
          return get().items.reduce((total, item) => {
            const price = item.price || item.product.price;
            return total + (price * item.quantity);
          }, 0);
        },

        get tax() {
          return get().subtotal * TAX_RATE;
        },

        get shipping() {
          const subtotal = get().subtotal;
          return subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
        },

        get total() {
          return get().subtotal + get().tax + get().shipping;
        },

        // Actions
        addItem: async (product: Product, quantity = 1, variantId) => {
          const state = get();
          set({ isLoading: true, error: null });

          try {
            // Optimistic update
            const existingItem = state.items.find(item => 
              item.product.id === product.id && item.variantId === variantId
            );

            if (existingItem) {
              set({
                items: state.items.map(item =>
                  item.product.id === product.id && item.variantId === variantId
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                )
              });
            } else {
              set({
                items: [...state.items, { 
                  product, 
                  quantity, 
                  variantId, 
                  addedAt: new Date() 
                }]
              });
            }

            // Sync with server
            try {
              await backendApi.addToCart(product.id, quantity, variantId);
            } catch (serverError) {
              console.warn('Server sync failed, continuing with local state:', serverError);
            }

            set({ isLoading: false });
            return { success: true, message: 'Item added to cart' };

          } catch (error: any) {
            set({ 
              isLoading: false, 
              error: error.message || 'Failed to add item to cart' 
            });

            return { 
              success: false, 
              message: error.message || 'Failed to add item to cart' 
            };
          }
        },

        removeItem: async (productId: string) => {
          const state = get();

          try {
            // Optimistic update
            set({
              items: state.items.filter(item => 
                item.id ? item.id !== productId : item.product.id !== productId
              ),
              error: null
            });

            // Sync with server (fire and forget)
            backendApi.removeFromCart(productId).catch(error => {
              console.warn('Failed to sync cart removal with server:', error);
            });
          } catch (error: any) {
            console.error('Remove from cart error:', error);
            return { 
              success: false, 
              message: error.response?.data?.message || 'Failed to remove item from cart' 
            };
          }
        },

        updateQuantity: async (productId: string, quantity: number) => {
          const state = get();
          set({ isLoading: true, error: null });

          try {
            if (quantity <= 0) {
              // Remove item
              set({
                items: state.items.filter(item => 
                  item.id ? item.id !== productId : item.product.id !== productId
                ),
                isLoading: false
              });
            } else {
              // Update quantity
              set({
                items: state.items.map(item => 
                  (item.id ? item.id === productId : item.product.id === productId)
                    ? { ...item, quantity } 
                    : item
                ),
                isLoading: false
              });
            }

            // Sync with server
            try {
              if (quantity <= 0) {
                await backendApi.removeFromCart(productId);
              } else {
                await backendApi.updateCartItem(productId, quantity);
              }
            } catch (serverError) {
              console.warn('Server sync failed:', serverError);
            }

            return { success: true, message: 'Cart updated' };

          } catch (error: any) {
            set({ 
              isLoading: false, 
              error: error.message || 'Failed to update cart' 
            });

            return { 
              success: false, 
              message: error.message || 'Failed to update cart' 
            };
          }
        },

        clearCart: async () => {
          set({ isLoading: true, error: null });

          try {
            set({ items: [], isLoading: false });

            // Sync with server
            try {
              await backendApi.clearCart();
            } catch (serverError) {
              console.warn('Failed to sync cart clear with server:', serverError);
            }

          } catch (error: any) {
            set({ 
              isLoading: false, 
              error: error.message || 'Failed to clear cart' 
            });
          }
        },

        syncWithServer: async () => {
          set({ isLoading: true, error: null });

          try {
            const serverCart = await backendApi.getCart();
            set({ 
              items: serverCart.map(item => ({
                ...item,
                addedAt: new Date(item.addedAt || Date.now())
              })),
              isLoading: false 
            });
          } catch (error: any) {
            set({ 
              isLoading: false, 
              error: 'Failed to sync with server' 
            });
            console.warn('Cart sync failed:', error);
          }
        },

        toggleCart: () => {
          set(state => ({ isOpen: !state.isOpen }));
        },

        openCart: () => {
          set({ isOpen: true });
        },

        closeCart: () => {
          set({ isOpen: false });
        },

        setError: (error: string | null) => {
          set({ error });
        },

        setLoading: (isLoading: boolean) => {
          set({ isLoading });
        }
      }),
    ),
    {
      name: 'cart-storage',
      partialize: (state) => ({ 
        items: state.items.map(item => ({
          ...item,
          addedAt: item.addedAt.toISOString() // Serialize date
        }))
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.items) {
          // Rehydrate dates
          state.items = state.items.map(item => ({
            ...item,
            addedAt: new Date(item.addedAt)
          }));
        }
      }
    }
  )
);

// Auto-sync with server when online
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    useCartStore.getState().syncWithServer();
  });
}