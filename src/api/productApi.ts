import { api } from './apiClient';
import { Product, Category } from '../types';
import { smartIdResolver } from '../utils/idResolver';

// Import mock data for demo purposes
import { mockProducts, mockCategories } from './mockData';

// Transform backend product to frontend format
const transformBackendProduct = (backendProduct: any): Product => {
  return {
    id: backendProduct._id,
    name: backendProduct.name,
    description: backendProduct.description,
    price: backendProduct.price,
    originalPrice: undefined, // Backend doesn't have this field
    images: backendProduct.images || [],
    category: backendProduct.category,
    subcategory: backendProduct.subcategory || '',
    brand: backendProduct.brand || '',
    rating: backendProduct.rating?.average || 0,
    reviewCount: backendProduct.rating?.count || 0,
    inStock: backendProduct.stock > 0,
    stockCount: backendProduct.stock,
    tags: backendProduct.tags || [],
    specifications: backendProduct.specifications || {},
    isFeatured: false, // Backend doesn't have this field
    isNew: false, // Backend doesn't have this field
    discount: undefined // Calculate if needed
  };
};

// Define filter types
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

export const productApi = {
  getProducts: async (filters: ProductFilters = {}): Promise<Product[]> => {
    try {
      // Try to fetch from real backend first
      try {
        const queryParams = new URLSearchParams();
        
        if (filters.category) queryParams.append('category', filters.category);
        if (filters.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
        if (filters.search) queryParams.append('search', filters.search);
        if (filters.sortBy) {
          const sortByMap: Record<string, string> = {
            'price_asc': 'price',
            'price_desc': 'price',
            'rating': 'ratings.average',
            'newest': 'createdAt'
          };
          queryParams.append('sortBy', sortByMap[filters.sortBy] || 'createdAt');
          queryParams.append('sortOrder', filters.sortBy === 'price_desc' ? 'desc' : 'asc');
        }
        
        const response = await fetch(`http://localhost:3001/api/products?${queryParams}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data.products) {
            return data.data.products.map(transformBackendProduct);
          }
        }
      } catch (backendError) {
        console.warn('Backend not available, falling back to mock data:', backendError);
      }
      
      // Fallback to mock data
      let filteredProducts = [...mockProducts];
      
      if (filters.category) {
        filteredProducts = filteredProducts.filter(product => product.category === filters.category);
      }
      
      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.price >= filters.minPrice!);
      }
      
      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.price <= filters.maxPrice!);
      }
      
      if (filters.rating !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.rating >= filters.rating!);
      }
      
      if (filters.inStock !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.inStock === filters.inStock);
      }
      
      if (filters.onSale !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.originalPrice !== undefined);
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
          product.name.toLowerCase().includes(searchLower) || 
          product.description.toLowerCase().includes(searchLower) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      // Apply sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price_asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            // Assuming newer products have higher IDs or are marked as "new"
            filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            break;
        }
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return filteredProducts;
      
      // Real implementation would look like this:
      // return await api.get<Product[]>('/products', { params: filters });
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  getProductById: async (id: string): Promise<Product | null> => {
    try {
      // Try to fetch from real backend first
      try {
        // First try direct ID lookup
        const response = await fetch(`http://localhost:3001/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            console.log(`Found product by ID: ${id}`);
            return transformBackendProduct(data.data);
          }
        }
        
        // If not found, try searching by various criteria
        if (response.status === 404) {
          console.log(`Product not found by ID, trying search for: ${id}`);
          const searchResponse = await fetch(`http://localhost:3001/api/products?search=${encodeURIComponent(id.replace(/-/g, ' '))}`);
          if (searchResponse.ok) {
            const searchData = await searchResponse.json();
            if (searchData.success && searchData.data.products && searchData.data.products.length > 0) {
              console.log(`Found product by search: ${id}`);
              return transformBackendProduct(searchData.data.products[0]);
            }
          }
        }
      } catch (backendError) {
        console.warn('Backend not available, falling back to mock data:', backendError);
      }
      
      // Use smart ID resolver to handle any ID format for mock data fallback
      const resolution = smartIdResolver.resolve(id);
      const { uuid, source, originalId } = resolution;
      
      console.log(`ID Resolution: ${originalId} -> ${uuid} (source: ${source})`);
      
      // Fallback to mock data
      let product = mockProducts.find(p => p.id === uuid);
      
      // If not found by UUID, try to find by original ID as fallback
      if (!product && source === 'generated') {
        product = mockProducts.find(p => 
          p.id === originalId || 
          p.name.toLowerCase().includes(originalId.toLowerCase()) ||
          p.tags.some(tag => tag.toLowerCase().includes(originalId.toLowerCase()))
        );
        
        // If found by fallback search, update the product ID to the resolved UUID
        if (product) {
          product = { ...product, id: uuid };
          console.log(`Found product by fallback search, assigned UUID: ${uuid}`);
        }
      }
      
      if (!product) {
        // Create a placeholder product for demonstration
        const placeholderProduct: Product = {
          id: uuid,
          name: `Product ${smartIdResolver.getDisplayId(uuid)}`,
          description: `This is a placeholder product for ID: ${originalId}. In a real application, this would fetch from your database.`,
          price: 99.99,
          originalPrice: 129.99,
          images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&crop=center'
          ],
          category: 'Electronics',
          subcategory: 'Accessories',
          brand: 'Sample Brand',
          rating: 4.2,
          reviewCount: 128,
          inStock: true,
          stockCount: 15,
          tags: ['sample', 'placeholder', 'demo'],
          specifications: {
            'Type': 'Demo Product',
            'Availability': 'In Stock',
            'ID Resolution': source
          },
          isFeatured: false,
          isNew: false,
          discount: 23
        };
        
        console.log(`Created placeholder product for ID: ${originalId}`);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return placeholderProduct;
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return product;
      
      // Real implementation would look like this:
      // return await api.get<Product>(`/products/${uuid}`);
    } catch (error) {
      console.error('Error fetching product:', error);
      
      // Return a safe fallback instead of throwing
      const resolution = smartIdResolver.resolve(id);
      const fallbackProduct: Product = {
        id: resolution.uuid,
        name: 'Product Not Available',
        description: 'This product is currently not available. Please try again later or contact support.',
        price: 0,
        images: ['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=600&fit=crop&crop=center'],
        category: 'Error',
        subcategory: 'Not Found',
        brand: 'N/A',
        rating: 0,
        reviewCount: 0,
        inStock: false,
        stockCount: 0,
        tags: ['error', 'not-found'],
        specifications: {
          'Status': 'Error',
          'Original ID': id,
          'Resolution': 'Failed'
        },
        isFeatured: false,
        isNew: false
      };
      
      return fallbackProduct;
    }
  },
  
  getFeaturedProducts: async (): Promise<Product[]> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we're using mock data
      const featuredProducts = mockProducts.filter(p => p.isFeatured);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return featuredProducts;
      
      // Real implementation would look like this:
      // return await api.get<Product[]>('/products/featured');
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },
  
  getCategories: async (): Promise<Category[]> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we're using mock data
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return mockCategories;
      
      // Real implementation would look like this:
      // return await api.get<Category[]>('/categories');
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
  
  getProductsByCategory: async (categoryId: string): Promise<Product[]> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we're using mock data and filtering it
      const products = mockProducts.filter(p => p.category === categoryId);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return products;
      
      // Real implementation would look like this:
      // return await api.get<Product[]>(`/categories/${categoryId}/products`);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },
  
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we're using mock data and filtering it
      const searchLower = query.toLowerCase();
      const products = mockProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return products;
      
      // Real implementation would look like this:
      // return await api.get<Product[]>('/products/search', { params: { q: query } });
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
};