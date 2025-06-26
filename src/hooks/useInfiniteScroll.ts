import { useEffect, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import useQueryErrorHandler from './useQueryErrorHandler';

interface UseInfiniteScrollOptions<TData> {
  queryKey: unknown[];
  queryFn: (page: number) => Promise<{
    data: TData[];
    nextPage: number | null;
  }>;
  enabled?: boolean;
  getNextPageParam?: (lastPage: { data: TData[]; nextPage: number | null }) => number | null | undefined;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  refetchInterval?: number | false;
  suspense?: boolean;
}

function useInfiniteScroll<TData>({
  queryKey,
  queryFn,
  enabled = true,
  getNextPageParam = (lastPage) => lastPage.nextPage,
  staleTime,
  cacheTime,
  refetchOnWindowFocus = false,
  refetchOnReconnect = true,
  refetchInterval = false,
  suspense = false,
}: UseInfiniteScrollOptions<TData>) {
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '200px 0px',
  });

  const handleError = useQueryErrorHandler();

  // Set up the infinite query
  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => queryFn(pageParam as number),
    initialPageParam: 1,
    getNextPageParam,
    enabled,
    staleTime,
    gcTime: cacheTime,
    refetchOnWindowFocus,
    refetchOnReconnect,
    refetchInterval,
    suspense,
    onError: (error: Error) => handleError(error, queryKey),
  });

  // Fetch next page when the load more element comes into view
  useEffect(() => {
    if (inView && query.hasNextPage && !query.isFetchingNextPage && enabled) {
      query.fetchNextPage();
    }
  }, [inView, query.hasNextPage, query.isFetchingNextPage, enabled, query.fetchNextPage]);

  // Flatten the pages data for easier consumption
  const flatData = query.data?.pages.flatMap((page) => page.data) || [];

  return {
    ...query,
    flatData,
    loadMoreRef,
  };
}

export default useInfiniteScroll;