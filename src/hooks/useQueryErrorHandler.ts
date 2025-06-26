import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUIStore } from '../store/useUIStore';

/**
 * Custom hook for handling query errors consistently across the application
 */
const useQueryErrorHandler = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useUIStore();

  const handleError = useCallback((error: Error, queryKey?: unknown[]) => {
    console.error('Query error:', error);

    // Add notification for user
    addNotification({
      type: 'error',
      message: error.message || 'An unexpected error occurred',
      autoClose: true,
      duration: 5000,
    });

    // If we have a queryKey, we can invalidate the query to trigger a refetch
    if (queryKey) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, [addNotification, queryClient]);

  return handleError;
};

export default useQueryErrorHandler;