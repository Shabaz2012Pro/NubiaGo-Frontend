import { create } from 'zustand';
import { Product, Category } from '../types';
import { productApi } from '../api/productApi';

interface ProductFilters {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  onSale?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
  search?: string;
}

interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  recentlyViewed: Product[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  filters: ProductFilters;
  
  // Actions
  fetchProducts: (filters?: ProductFilters) => Promise<Product[]>;
  fetchFeaturedProducts: () => Promise<Product[]>;
  fetchProductById: (id: string) => Promise<Product | null>;
  fetchCategories: () => Promise<Category[]>;
  addToRecentlyViewed: (product: Product) => void;
  setFilters: (filters: Partial<ProductFilters>) => void;
  clearFilters: () => void;
  clearError: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  featuredProducts: [],
  recentlyViewed: [],
  categories: [],
  isLoading: false,
  error: null,
  filters: {},
  
  fetchProducts: async (filters) => {
    try {
      set({ isLoading: true, error: null });
      
      // Merge current filters with new filters if provided
      const mergedFilters = filters 
        ? { ...get().filters, ...filters }
        : get().filters;
      
      const products = await productApi.getProducts(mergedFilters);
      set({ products, isLoading: false, filters: mergedFilters });
      return products;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
      set({ error: errorMessage, isLoading: false });
      return [];
    }
  },
  
  fetchFeaturedProducts: async () => {
    try {
      set({ isLoading: true, error: null });
      const featuredProducts = await productApi.getFeaturedProducts();
      set({ featuredProducts, isLoading: false });
      return featuredProducts;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch featured products';
      set({ error: errorMessage, isLoading: false });
      return [];
    }
  },
  
  fetchProductById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const product = await productApi.getProductById(id);
      set({ isLoading: false });
      
      if (product) {
        // Add to recently viewed if product exists
        get().addToRecentlyViewed(product);
      }
      
      return product;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product';
      set({ error: errorMessage, isLoading: false });
      return null;
    }
  },
  
  fetchCategories: async () => {
    try {
      set({ isLoading: true, error: null });
      const categories = await productApi.getCategories();
      set({ categories, isLoading: false });
      return categories;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
      set({ error: errorMessage, isLoading: false });
      return [];
    }
  },
  
  addToRecentlyViewed: (product: Product) => {
    const { recentlyViewed } = get();
    
    // Remove product if it already exists in recently viewed
    const filteredRecentlyViewed = recentlyViewed.filter(p => p.id !== product.id);
    
    // Add product to the beginning of the array
    const updatedRecentlyViewed = [product, ...filteredRecentlyViewed];
    
    // Limit to 10 items
    const limitedRecentlyViewed = updatedRecentlyViewed.slice(0, 10);
    
    set({ recentlyViewed: limitedRecentlyViewed });
  },
  
  setFilters: (filters: Partial<ProductFilters>) => {
    set({ filters: { ...get().filters, ...filters } });
  },
  
  clearFilters: () => {
    set({ filters: {} });
  },
  
  clearError: () => {
    set({ error: null });
  }
}));