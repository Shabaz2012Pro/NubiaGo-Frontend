
import { apiClient } from './apiClient';
import type { Product, Category } from '../types';

class ProductService {
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<{ products: Product[]; total: number; pages: number }> {
    try {
      const response = await apiClient.get('/products', { params });
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch products');
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch product');
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response = await apiClient.get('/categories');
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch categories');
    }
  }

  async getFeaturedProducts(limit = 8): Promise<Product[]> {
    try {
      const response = await apiClient.get('/products/featured', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch featured products');
    }
  }

  async getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
    try {
      const response = await apiClient.get(`/products/${productId}/related`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch related products');
    }
  }

  async searchProducts(query: string, filters?: any): Promise<Product[]> {
    try {
      const response = await apiClient.get('/products/search', {
        params: { q: query, ...filters }
      });
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Search failed');
    }
  }
}

export default new ProductService();
