import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '../supabaseApi.ts';
import { CartItem } from '../../store/useCartStore';
import useQueryErrorHandler from '../../hooks/useQueryErrorHandler';
import { useUIStore } from '../../store/useUIStore';

// Query keys
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (filters: any) => [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
  tracking: (orderNumber: string) => [...orderKeys.all, 'tracking', orderNumber] as const,
};

// Hook for fetching user orders
export function useOrders(page = 1, limit = 10) {
  const handleError = useQueryErrorHandler();
  
  return useQuery({
    queryKey: [...orderKeys.lists(), { page, limit }],
    queryFn: () => ordersApi.getOrders(page, limit),
    onError: (error: Error) => handleError(error, orderKeys.lists()),
  });
}

// Hook for fetching a single order
export function useOrder(id: string) {
  const handleError = useQueryErrorHandler();
  
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => ordersApi.getOrderById(id),
    onError: (error: Error) => handleError(error, orderKeys.detail(id)),
    enabled: !!id, // Only run if id is provided
  });
}

// Hook for tracking an order
export function useTrackOrder(orderNumber: string) {
  const handleError = useQueryErrorHandler();
  
  return useQuery({
    queryKey: orderKeys.tracking(orderNumber),
    queryFn: () => ordersApi.trackOrder(orderNumber),
    onError: (error: Error) => handleError(error, orderKeys.tracking(orderNumber)),
    enabled: !!orderNumber, // Only run if orderNumber is provided
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes for live tracking updates
  });
}

// Hook for creating an order
export function useCreateOrder() {
  const queryClient = useQueryClient();
  const handleError = useQueryErrorHandler();
  const { addNotification } = useUIStore();
  
  return useMutation({
    mutationFn: async ({ 
      cartItems, 
      shippingAddress, 
      billingAddress,
      paymentMethod, 
      notes 
    }: { 
      cartItems: CartItem[]; 
      shippingAddress: string;
      billingAddress: string;
      paymentMethod: string; 
      notes?: string; 
    }) => {
      // Format items for the API
      const items = cartItems.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        variant_id: item.variantId
      }));
      
      return ordersApi.createOrder(
        shippingAddress,
        billingAddress,
        paymentMethod,
        items,
        notes
      );
    },
    onSuccess: (orderId) => {
      // Invalidate orders list to refetch with new order
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      
      // Show success notification
      addNotification({
        type: 'success',
        message: `Order placed successfully`,
        autoClose: true,
        duration: 5000,
      });
      
      // Clear the cart (this would typically be handled by the cart store)
      // But we could also invalidate the cart queries here
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: Error) => {
      handleError(error, orderKeys.lists());
    },
  });
}

// Hook for cancelling an order
export function useCancelOrder() {
  const queryClient = useQueryClient();
  const handleError = useQueryErrorHandler();
  const { addNotification } = useUIStore();
  
  return useMutation({
    mutationFn: async (orderId: string) => {
      return ordersApi.cancelOrder(orderId);
    },
    onMutate: async (orderId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: orderKeys.detail(orderId) });
      
      // Snapshot the previous order
      const previousOrder = queryClient.getQueryData(orderKeys.detail(orderId));
      
      // Optimistically update the order status
      queryClient.setQueryData(
        orderKeys.detail(orderId),
        (old: any) => old ? { ...old, status: 'cancelled' } : old
      );
      
      return { previousOrder };
    },
    onSuccess: (_, orderId) => {
      // Invalidate the orders list and the specific order
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) });
      
      // Show success notification
      addNotification({
        type: 'success',
        message: 'Order cancelled successfully',
        autoClose: true,
        duration: 3000,
      });
    },
    onError: (error: Error, orderId, context) => {
      // Revert to the previous order on error
      if (context?.previousOrder) {
        queryClient.setQueryData(orderKeys.detail(orderId), context.previousOrder);
      }
      
      handleError(error, orderKeys.detail(orderId));
    },
  });
}

export default {
  useOrders,
  useOrder,
  useTrackOrder,
  useCreateOrder,
  useCancelOrder,
};