import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { productsApi } from '../supabaseApi.ts';
import { Product, Category } from '../../types';
import useQueryErrorHandler from '../../hooks/useQueryErrorHandler';
import useOfflineMutation from '../../hooks/useOfflineMutation';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { useUIStore } from '../../store/useUIStore';
import { supabase } from '../supabaseClient';

// Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: any) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  featured: () => [...productKeys.all, 'featured'] as const,
  categories: () => [...productKeys.all, 'categories'] as const,
  category: (id: string) => [...productKeys.categories(), id] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
  recommendations: (userId: string) => [...productKeys.all, 'recommendations', userId] as const,
  recentlyViewed: (userId: string) => [...productKeys.all, 'recentlyViewed', userId] as const,
  reviews: (productId: string) => [...productKeys.all, 'reviews', productId] as const,
};

// Hook for fetching products with filters
export function useProducts(filters?: any): UseQueryResult<Product[]> {
  const handleError = useQueryErrorHandler();
  
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: async () => {
      const { products } = await productsApi.searchProducts('', filters);
      return products;
    },
    onError: (error: Error) => handleError(error, productKeys.list(filters)),
  });
}

// Hook for infinite scrolling product list
export function useInfiniteProducts(filters?: any) {
  const fetchProductPage = async (page: number) => {
    const pageSize = 8; // Number of items per page
    const { products, total } = await productsApi.searchProducts('', {
      ...filters,
      page,
      limit: pageSize
    });
    
    // Determine if there's a next page
    const nextPage = page * pageSize < total ? page + 1 : null;
    
    return {
      data: products,
      nextPage,
    };
  };
  
  return useInfiniteScroll({
    queryKey: [...productKeys.list(filters), 'infinite'],
    queryFn: fetchProductPage,
  });
}

// Hook for fetching a single product
export function useProduct(id: string): UseQueryResult<Product | null> {
  const handleError = useQueryErrorHandler();
  
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productsApi.getProductById(id),
    onError: (error: Error) => handleError(error, productKeys.detail(id)),
    enabled: !!id, // Only run if id is provided
  });
}

// Hook for fetching featured products
export function useFeaturedProducts(): UseQueryResult<Product[]> {
  const handleError = useQueryErrorHandler();
  
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: () => productsApi.getFeaturedProducts(),
    onError: (error: Error) => handleError(error, productKeys.featured()),
    staleTime: 1000 * 60 * 10, // 10 minutes - featured products change less frequently
  });
}

// Hook for fetching categories
export function useCategories(): UseQueryResult<Category[]> {
  const handleError = useQueryErrorHandler();
  
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: () => categoriesApi.getCategories(),
    onError: (error: Error) => handleError(error, productKeys.categories()),
    staleTime: 1000 * 60 * 60, // 1 hour - categories rarely change
  });
}

// Hook for fetching products by category
export function useProductsByCategory(categoryId: string): UseQueryResult<Product[]> {
  const handleError = useQueryErrorHandler();
  
  return useQuery({
    queryKey: productKeys.category(categoryId),
    queryFn: async () => {
      const { products } = await productsApi.searchProducts('', { category: categoryId });
      return products;
    },
    onError: (error: Error) => handleError(error, productKeys.category(categoryId)),
    enabled: !!categoryId, // Only run if categoryId is provided
  });
}

// Hook for searching products
export function useSearchProducts(query: string): UseQueryResult<{ products: Product[], total: number }> {
  const handleError = useQueryErrorHandler();
  
  return useQuery({
    queryKey: productKeys.search(query),
    queryFn: () => productsApi.searchProducts(query),
    onError: (error: Error) => handleError(error, productKeys.search(query)),
    enabled: query.length > 2, // Only search if query is at least 3 characters
  });
}

// Hook for rating a product
export function useRateProduct() {
  const queryClient = useQueryClient();
  const handleError = useQueryErrorHandler();
  const { addNotification } = useUIStore();
  
  return useMutation({
    mutationFn: async ({ 
      productId, 
      rating, 
      title, 
      comment, 
      images 
    }: { 
      productId: string; 
      rating: number; 
      title: string; 
      comment: string; 
      images?: string[] 
    }) => {
      return productsApi.addReview(productId, rating, title, comment, images);
    },
    onSuccess: (_, variables) => {
      // Invalidate the product detail query to refetch with new rating
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.productId) });
      queryClient.invalidateQueries({ queryKey: productKeys.reviews(variables.productId) });
      
      // Show success notification
      addNotification({
        type: 'success',
        message: 'Your review has been submitted successfully',
        autoClose: true,
      });
    },
    onError: (error: Error, variables) => {
      handleError(error, productKeys.detail(variables.productId));
    },
  });
}

// Hook for getting product reviews
export function useProductReviews(productId: string, page = 1, limit = 10) {
  const handleError = useQueryErrorHandler();
  
  return useQuery({
    queryKey: [...productKeys.reviews(productId), page, limit],
    queryFn: () => productsApi.getProductReviews(productId, page, limit),
    onError: (error: Error) => handleError(error, productKeys.reviews(productId)),
    enabled: !!productId,
  });
}

// Hook for getting personalized recommendations
export function useRecommendations(userId: string) {
  const handleError = useQueryErrorHandler();
  
  return useQuery({
    queryKey: productKeys.recommendations(userId),
    queryFn: () => productsApi.getRecommendations(userId),
    onError: (error: Error) => handleError(error, productKeys.recommendations(userId)),
    enabled: !!userId,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

// Hook for getting recently viewed products
export function useRecentlyViewed(userId: string) {
  const handleError = useQueryErrorHandler();
  
  return useQuery({
    queryKey: productKeys.recentlyViewed(userId),
    queryFn: () => productsApi.getRecentlyViewed(userId),
    onError: (error: Error) => handleError(error, productKeys.recentlyViewed(userId)),
    enabled: !!userId,
  });
}

// Hook for adding a product to recently viewed with offline support
export function useAddToRecentlyViewed() {
  const queryClient = useQueryClient();
  
  return useOfflineMutation(
    async (product: Product) => {
      // In a real app, this would call an API
      // For now, we'll just update the cache
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      // Add to recently viewed in Supabase
      await supabase
        .from('recently_viewed')
        .upsert(
          { user_id: user.id, product_id: product.id },
          { onConflict: 'user_id,product_id', ignoreDuplicates: false }
        );
      
      return product;
    },
    {
      offlineKey: 'recentlyViewed',
      onSuccess: (product, variables) => {
        if (!product) return;
        
        // Get current user
        const { data: { user } } = supabase.auth.getUser();
        if (!user) return;
        
        // Get current recently viewed from cache
        const recentlyViewed = queryClient.getQueryData<Product[]>(
          productKeys.recentlyViewed(user.id)
        ) || [];
        
        // Remove product if it already exists
        const filteredRecentlyViewed = recentlyViewed.filter(p => p.id !== variables.id);
        
        // Add product to the beginning of the array
        const updatedRecentlyViewed = [variables, ...filteredRecentlyViewed];
        
        // Limit to 10 items
        const limitedRecentlyViewed = updatedRecentlyViewed.slice(0, 10);
        
        // Update cache
        queryClient.setQueryData(productKeys.recentlyViewed(user.id), limitedRecentlyViewed);
      },
    }
  );
}

export default {
  useProducts,
  useInfiniteProducts,
  useProduct,
  useFeaturedProducts,
  useCategories,
  useProductsByCategory,
  useSearchProducts,
  useRateProduct,
  useProductReviews,
  useRecommendations,
  useRecentlyViewed,
  useAddToRecentlyViewed,
};