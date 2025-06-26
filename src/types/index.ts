import React from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  ariaLabel?: string;
  tooltip?: string;
  iconOnly?: boolean;
}

export interface CardProps extends ComponentProps {
  variant?: 'default' | 'premium' | 'gold' | 'outlined' | 'elevated';
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  interactive?: boolean;
  selected?: boolean;
  loading?: boolean;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  status?: 'default' | 'success' | 'warning' | 'error';
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  error?: string;
  type?: string;
  name?: string;
  icon?: React.ReactNode;
  autoComplete?: string;
}

export interface CategoryCardProps extends ComponentProps {
  category: Category;
  onClick?: () => void;
  loading?: boolean;
  showProductCount?: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  verified?: boolean;
  avatar?: string;
  phone?: string;
  company?: string;
  memberSince?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  image?: string;
  category: string;
  subcategory?: string;
  brand?: string;
  supplier: Supplier;
  rating: number;
  reviews: number;
  reviewCount?: number;
  inStock: boolean;
  stockCount?: number;
  minOrder: number;
  tags: string[];
  specifications?: Record<string, string>;
  dimensions?: Record<string, number>;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
}

export interface Supplier {
  id: string;
  name: string;
  country: string;
  rating: number;
  verified: boolean;
  totalProducts: number;
  responseTime: string;
  memberSince: string;
  logo?: string;
  categories?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: React.ReactNode;
  description?: string;
  productCount?: number;
  subcategories?: Subcategory[];
  image?: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  icon?: React.ReactNode;
}

export interface CartItem {
  id?: string;
  product: Product;
  quantity: number;
  variantId?: string;
  addedAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
  trackingNumber?: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  phone: string;
  isDefault?: boolean;
}

export interface AuthError extends Error {
  code?: string;
  statusCode?: number;
}

export interface AuthResponse {
  user: User | null;
  session: any | null;
  error: AuthError | null;
}