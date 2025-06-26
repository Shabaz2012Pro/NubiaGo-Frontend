import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '../supabaseApi.ts';
import { Product } from '../../types';
import { CartItem } from '../../store/useCartStore';
import useQueryErrorHandler from '../../hooks/useQueryErrorHandler';
import useOfflineMutation from '../../hooks/useOfflineMutation';
import { useUIStore } from '../../store/useUIStore';

// Query keys
export const cartKeys = {
  all: ['cart'] as const,
  items: () => [...cartKeys.all, 'items'] as const,
  count: () => [...cartKeys.all, 'count'] as const,
};

// Hook for fetching cart items
export function useCart() {
  const handleError = useQueryErrorHandler();
  
  return useQuery({
    queryKey: cartKeys.items(),
    queryFn: () => cartApi.getCart(),
    onError: (error: Error) => handleError(error, cartKeys.items()),
  });
}

// Hook for adding item to cart with optimistic updates
export function useAddToCart() {
  const queryClient = useQueryClient();
  const handleError = useQueryErrorHandler();
  const { addNotification } = useUIStore();
  
  return useOfflineMutation(
    async ({ product, quantity = 1, variantId }: { product: Product; quantity?: number; variantId?: string }) => {
      await cartApi.addToCart(product.id, quantity, variantId);
      return { product, quantity, variantId };
    },
    {
      offlineKey: 'addToCart',
      onMutate: async ({ product, quantity, variantId }) => {
        // Cancel any outgoing refetches
        await queryClient.cancelQueries({ queryKey: cartKeys.items() });
        
        // Snapshot the previous value
        const previousItems = queryClient.getQueryData<CartItem[]>(cartKeys.items()) || [];
        
        // Optimistically update the cart
        const existingItemIndex = previousItems.findIndex(item => 
          item.product.id === product.id && 
          ((!item.variantId && !variantId) || item.variantId === variantId)
        );
        
        let newItems: CartItem[];
        
        if (existingItemIndex >= 0) {
          // Update quantity if item already exists
          newItems = [...previousItems];
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + quantity,
          };
        } else {
          // Add new item
          newItems = [
            ...previousItems,
            { 
              product, 
              quantity, 
              variantId, 
              addedAt: new Date() 
            },
          ];
        }
        
        // Update the cache
        queryClient.setQueryData(cartKeys.items(), newItems);
        queryClient.setQueryData(cartKeys.count(), newItems.reduce((sum, item) => sum + item.quantity, 0));
        
        // Return a context object with the previous cart items
        return { previousItems };
      },
      onError: (error, variables, context) => {
        // Revert to previous value on error
        if (context) {
          queryClient.setQueryData(cartKeys.items(), context.previousItems);
          queryClient.setQueryData(
            cartKeys.count(), 
            context.previousItems.reduce((sum, item) => sum + item.quantity, 0)
          );
        }
        
        handleError(error, cartKeys.items());
      },
      onSuccess: (data, variables) => {
        // Show success notification
        addNotification({
          type: 'success',
          message: `${variables.product.name} added to cart`,
          autoClose: true,
          duration: 3000,
        });
        
        // Invalidate cart queries to refetch
        queryClient.invalidateQueries({ queryKey: cartKeys.all });
      },
    }
  );
}

// Hook for removing item from cart
export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  const handleError = useQueryErrorHandler();
  const { addNotification } = useUIStore();
  
  return useMutation({
    mutationFn: async (cartItemId: string) => {
      await cartApi.removeFromCart(cartItemId);
      return cartItemId;
    },
    onMutate: async (cartItemId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: cartKeys.items() });
      
      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<CartItem[]>(cartKeys.items()) || [];
      
      // Find the item to remove
      const itemToRemove = previousItems.find(item => item.id === cartItemId);
      
      // Optimistically update the cart
      const newItems = previousItems.filter(item => item.id !== cartItemId);
      
      // Update the cache
      queryClient.setQueryData(cartKeys.items(), newItems);
      queryClient.setQueryData(cartKeys.count(), newItems.reduce((sum, item) => sum + item.quantity, 0));
      
      // Return a context object with the previous cart items and the removed item
      return { previousItems, itemToRemove };
    },
    onError: (error, variables, context) => {
      // Revert to previous value on error
      if (context) {
        queryClient.setQueryData(cartKeys.items(), context.previousItems);
        queryClient.setQueryData(
          cartKeys.count(), 
          context.previousItems.reduce((sum, item) => sum + item.quantity, 0)
        );
      }
      
      handleError(error, cartKeys.items());
    },
    onSuccess: (_, __, context) => {
      // Show success notification
      if (context?.itemToRemove) {
        addNotification({
          type: 'success',
          message: `${context.itemToRemove.product.name} removed from cart`,
          autoClose: true,
          duration: 3000,
        });
      }
      
      // Invalidate cart queries to refetch
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
}

// Hook for updating cart item quantity
export function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();
  const handleError = useQueryErrorHandler();
  
  return useMutation({
    mutationFn: async ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) => {
      await cartApi.updateCartItemQuantity(cartItemId, quantity);
      return { cartItemId, quantity };
    },
    onMutate: async ({ cartItemId, quantity }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: cartKeys.items() });
      
      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<CartItem[]>(cartKeys.items()) || [];
      
      // Optimistically update the cart
      let newItems: CartItem[];
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        newItems = previousItems.filter(item => item.id !== cartItemId);
      } else {
        // Update quantity
        newItems = previousItems.map(item => 
          item.id === cartItemId 
            ? { ...item, quantity } 
            : item
        );
      }
      
      // Update the cache
      queryClient.setQueryData(cartKeys.items(), newItems);
      queryClient.setQueryData(cartKeys.count(), newItems.reduce((sum, item) => sum + item.quantity, 0));
      
      // Return a context object with the previous cart items
      return { previousItems };
    },
    onError: (error, variables, context) => {
      // Revert to previous value on error
      if (context) {
        queryClient.setQueryData(cartKeys.items(), context.previousItems);
        queryClient.setQueryData(
          cartKeys.count(), 
          context.previousItems.reduce((sum, item) => sum + item.quantity, 0)
        );
      }
      
      handleError(error, cartKeys.items());
    },
    onSuccess: () => {
      // Invalidate cart queries to refetch
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
}

// Hook for clearing the cart
export function useClearCart() {
  const queryClient = useQueryClient();
  const handleError = useQueryErrorHandler();
  
  return useMutation({
    mutationFn: async () => {
      await cartApi.clearCart();
    },
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: cartKeys.items() });
      
      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<CartItem[]>(cartKeys.items()) || [];
      
      // Optimistically clear the cart
      queryClient.setQueryData(cartKeys.items(), []);
      queryClient.setQueryData(cartKeys.count(), 0);
      
      // Return a context object with the previous cart items
      return { previousItems };
    },
    onError: (error, variables, context) => {
      // Revert to previous value on error
      if (context) {
        queryClient.setQueryData(cartKeys.items(), context.previousItems);
        queryClient.setQueryData(
          cartKeys.count(), 
          context.previousItems.reduce((sum, item) => sum + item.quantity, 0)
        );
      }
      
      handleError(error, cartKeys.items());
    },
    onSuccess: () => {
      // Invalidate cart queries to refetch
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
}

export default {
  useCart,
  useAddToCart,
  useRemoveFromCart,
  useUpdateCartItemQuantity,
  useClearCart,
};