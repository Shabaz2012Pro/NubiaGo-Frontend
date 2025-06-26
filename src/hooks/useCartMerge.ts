import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { cartApi } from '../api/supabaseApi.ts';
import { useCartStore } from '../store/useCartStore';
import { useQueryClient } from '@tanstack/react-query';
import { cartKeys } from '../api/queries/useCartQueries';

/**
 * Hook to handle merging guest cart with user cart after login
 */
export function useCartMerge() {
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();
  const { clearCart } = useCartStore();

  useEffect(() => {
    // Check if there's a guest cart to merge
    const guestSessionId = localStorage.getItem('guest_session_id');
    
    if (isAuthenticated && user && guestSessionId) {
      const mergeGuestCart = async () => {
        try {
          // Merge the guest cart with the user's cart
          await cartApi.mergeGuestCart();
          
          // Clear the local cart state
          clearCart();
          
          // Invalidate cart queries to refetch with merged cart
          queryClient.invalidateQueries({ queryKey: cartKeys.all });
          
          // Remove the guest session ID
          localStorage.removeItem('guest_session_id');
        } catch (error) {
          console.error('Error merging guest cart:', error);
        }
      };
      
      mergeGuestCart();
    }
  }, [isAuthenticated, user, queryClient, clearCart]);
}

export default useCartMerge;