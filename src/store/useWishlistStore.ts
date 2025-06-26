import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface WishlistState {
  items: Product[];
  
  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product) => {
        const { items } = get();
        
        // Check if product already exists in wishlist
        if (!items.some(item => item.id === product.id)) {
          set({ items: [...items, product] });
        }
      },
      
      removeItem: (productId: string) => {
        set({
          items: get().items.filter(item => item.id !== productId)
        });
      },
      
      clearWishlist: () => {
        set({ items: [] });
      },
      
      isInWishlist: (productId: string) => {
        return get().items.some(item => item.id === productId);
      }
    }),
    {
      name: 'wishlist-storage',
    }
  )
);