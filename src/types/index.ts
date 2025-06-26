export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: 'user' | 'admin' | 'supplier';
  isEmailVerified: boolean;
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    theme: 'light' | 'dark' | 'system';
  };
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isFeatured: boolean;
  tags: string[];
  supplier: {
    id: string;
    name: string;
    rating: number;
  };
  variants: any[];
  specifications: Record<string, any>;
  dimensions: Record<string, any>;
  weight: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  subcategories: {
    id: string;
    name: string;
    description: string;
  }[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'size' | 'material' | 'style';
  value: string;
  price?: number;
  stock?: number;
  sku?: string;
  image?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  variant?: ProductVariant;
  price: number;
  total: number;
  addedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  user?: User;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  paymentId?: string;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress?: Address;
  trackingNumber?: string;
  estimatedDelivery?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  variant?: ProductVariant;
  price: number;
  total: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  user?: User;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  notHelpful: number;
  variant?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'product' | 'system' | 'promotion';
  title: string;
  message: string;
  read: boolean;
  data?: Record<string, any>;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    pages?: number;
  };
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file';
  placeholder?: string;
  required?: boolean;
  validation?: any;
  options?: { value: string; label: string }[];
  multiple?: boolean;
  accept?: string;
  rows?: number;
}

export interface SearchFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  sortBy?: 'name' | 'price' | 'rating' | 'newest' | 'bestselling';
  sortOrder?: 'asc' | 'desc';
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank' | 'mobile_money';
  name: string;
  isDefault: boolean;
  details: Record<string, any>;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
  trackingAvailable: boolean;
}