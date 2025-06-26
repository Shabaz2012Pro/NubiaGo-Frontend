import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Product, User, Order, CartItem } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

class BackendAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
          window.location.href = '/auth';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await this.client.post('/auth/login', { email, password });
    return response.data.data;
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{ user: User; token: string }> {
    const response = await this.client.post('/auth/register', userData);
    return response.data.data;
  }

  async logout(): Promise<void> {
    await this.client.post('/auth/logout');
    localStorage.removeItem('auth_token');
  }

  async getProfile(): Promise<User> {
    const response = await this.client.get('/auth/profile');
    return response.data.data;
  }

  // Product endpoints
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
  }): Promise<{ products: Product[]; total: number; pages: number }> {
    const response = await this.client.get('/products', { params });
    return response.data.data;
  }

  async getProduct(id: string): Promise<Product> {
    const response = await this.client.get(`/products/${id}`);
    return response.data.data;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const response = await this.client.get('/products/search', { params: { q: query } });
    return response.data.data;
  }

  // Cart endpoints
  async getCart(): Promise<CartItem[]> {
    const response = await this.client.get('/cart');
    return response.data.data;
  }

  async addToCart(productId: string, quantity: number, variant?: any): Promise<CartItem> {
    const response = await this.client.post('/cart/add', { productId, quantity, variant });
    return response.data.data;
  }

  async updateCartItem(itemId: string, quantity: number): Promise<CartItem> {
    const response = await this.client.put(`/cart/items/${itemId}`, { quantity });
    return response.data.data;
  }

  async removeFromCart(itemId: string): Promise<void> {
    await this.client.delete(`/cart/items/${itemId}`);
  }

  async clearCart(): Promise<void> {
    await this.client.delete('/cart');
  }

  // Order endpoints
  async createOrder(orderData: {
    items: CartItem[];
    shippingAddress: any;
    paymentMethod: string;
    paymentData?: any;
  }): Promise<Order> {
    const response = await this.client.post('/orders', orderData);
    return response.data.data;
  }

  async getOrders(): Promise<Order[]> {
    const response = await this.client.get('/orders');
    return response.data.data;
  }

  async getOrder(id: string): Promise<Order> {
    const response = await this.client.get(`/orders/${id}`);
    return response.data.data;
  }

  // Newsletter endpoint
  async subscribeNewsletter(email: string): Promise<void> {
    await this.client.post('/newsletter/subscribe', { email });
  }

  // Contact endpoint
  async sendContactMessage(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    await this.client.post('/contact', data);
  }

  // FAQ endpoints
  async getFAQs(): Promise<any[]> {
    const response = await this.client.get('/faq');
    return response.data.data;
  }

  // Admin endpoints
  async getAdminStats(): Promise<any> {
    const response = await this.client.get('/admin/stats');
    return response.data.data;
  }

  async createProduct(productData: FormData): Promise<Product> {
    const response = await this.client.post('/admin/products', productData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  }

  async updateProduct(id: string, productData: FormData): Promise<Product> {
    const response = await this.client.put(`/admin/products/${id}`, productData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  }

  async deleteProduct(id: string): Promise<void> {
    await this.client.delete(`/admin/products/${id}`);
  }
}

export const backendApi = new BackendAPI();
export const backendAPI = backendApi; // Keep backward compatibility

// Admin API object for dashboard functionality
export const adminApi = {
  getDashboard: async () => {
    const response = await backendApi.client.get('/admin/dashboard');
    return response.data;
  },
  
  getUsers: async (page = 1, limit = 10) => {
    const response = await backendApi.client.get('/admin/users', { 
      params: { page, limit } 
    });
    return response.data;
  },
  
  getOrders: async (page = 1, limit = 10) => {
    const response = await backendApi.client.get('/admin/orders', { 
      params: { page, limit } 
    });
    return response.data;
  },
  
  updateOrderStatus: async (orderId: string, status: string) => {
    const response = await backendApi.client.patch(`/admin/orders/${orderId}`, { status });
    return response.data;
  }
};

export default backendApi;