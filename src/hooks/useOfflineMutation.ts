import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

/**
 * Custom hook for handling mutations with offline support
 */
function useOfflineMutation<TData = unknown, TError = Error, TVariables = void, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'> & {
    offlineKey?: string;
  }
): UseMutationResult<TData, TError, TVariables, TContext> & { isOnline: boolean } {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { offlineKey, ...mutationOptions } = options || {};

  // Track online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Create the mutation with enhanced functionality
  const mutation = useMutation({
    mutationFn: async (variables: TVariables) => {
      if (!isOnline && offlineKey) {
        // Store the mutation for later execution
        const offlineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
        offlineQueue.push({
          key: offlineKey,
          variables,
          timestamp: Date.now(),
        });
        localStorage.setItem('offlineQueue', JSON.stringify(offlineQueue));
        
        // Return a mock response or throw an error
        throw new Error('You are currently offline. Your changes will be applied when you reconnect.');
      }
      
      // Online - proceed with the mutation
      return mutationFn(variables);
    },
    ...mutationOptions,
  });

  // Process offline queue when coming back online
  useEffect(() => {
    if (isOnline && offlineKey) {
      const offlineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
      const relevantItems = offlineQueue.filter((item: any) => item.key === offlineKey);
      
      if (relevantItems.length > 0) {
        // Process the queue in order
        const processQueue = async () => {
          for (const item of relevantItems) {
            try {
              await mutationFn(item.variables as TVariables);
            } catch (error) {
              console.error('Failed to process offline mutation:', error);
            }
          }
          
          // Remove processed items from the queue
          const updatedQueue = offlineQueue.filter((item: any) => item.key !== offlineKey);
          localStorage.setItem('offlineQueue', JSON.stringify(updatedQueue));
        };
        
        processQueue();
      }
    }
  }, [isOnline, offlineKey, mutationFn]);

  return { ...mutation, isOnline };
}

export default useOfflineMutation;