export const mockProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    category: 'Electronics',
    images: ['/brandmark-design-1024x0 (3).png'],
    rating: 4.5,
    reviewCount: 124,
    inStock: true,
    isFeatured: true,
    tags: ['wireless', 'headphones', 'audio'],
    supplier: {
      id: 'supplier-1',
      name: 'TechSupplier Co.',
      rating: 4.8
    },
    variants: [],
    specifications: {},
    dimensions: {},
    weight: 250,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor',
    price: 299.99,
    category: 'Electronics',
    images: ['/brandmark-design-1024x0 (3).png'],
    rating: 4.3,
    reviewCount: 89,
    inStock: true,
    isFeatured: true,
    tags: ['fitness', 'watch', 'smart'],
    supplier: {
      id: 'supplier-2',
      name: 'FitTech Solutions',
      rating: 4.6
    },
    variants: [],
    specifications: {},
    dimensions: {},
    weight: 45,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z'
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt',
    price: 29.99,
    category: 'Clothing',
    images: ['/brandmark-design-1024x0 (3).png'],
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    isFeatured: false,
    tags: ['organic', 'cotton', 'clothing'],
    supplier: {
      id: 'supplier-3',
      name: 'EcoClothing Ltd.',
      rating: 4.9
    },
    variants: [],
    specifications: {},
    dimensions: {},
    weight: 150,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-17T00:00:00Z'
  },
  {
    id: '4',
    name: 'Kitchen Knife Set',
    description: 'Professional chef knife set with wooden block',
    price: 149.99,
    category: 'Home & Kitchen',
    images: ['/brandmark-design-1024x0 (3).png'],
    rating: 4.6,
    reviewCount: 67,
    inStock: true,
    isFeatured: true,
    tags: ['kitchen', 'knives', 'cooking'],
    supplier: {
      id: 'supplier-4',
      name: 'ChefTools Pro',
      rating: 4.7
    },
    variants: [],
    specifications: {},
    dimensions: {},
    weight: 1200,
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z'
  }
];

export const mockCategories = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices',
    image: '/brandmark-design-1024x0 (3).png',
    subcategories: [
      {
        id: 'smartphones',
        name: 'Smartphones',
        description: 'Latest smartphones and accessories'
      },
      {
        id: 'laptops',
        name: 'Laptops',
        description: 'Laptops and computers'
      }
    ]
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Fashion and apparel for all',
    image: '/brandmark-design-1024x0 (3).png',
    subcategories: [
      {
        id: 'mens',
        name: "Men's Clothing",
        description: 'Clothing for men'
      },
      {
        id: 'womens',
        name: "Women's Clothing",
        description: 'Clothing for women'
      }
    ]
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    description: 'Everything for your home and kitchen',
    image: '/brandmark-design-1024x0 (3).png',
    subcategories: [
      {
        id: 'appliances',
        name: 'Appliances',
        description: 'Kitchen and home appliances'
      },
      {
        id: 'furniture',
        name: 'Furniture',
        description: 'Home furniture and decor'
      }
    ]
  }
];

// Default export for compatibility
export default {
  mockProducts,
  mockCategories
};

// Additional exports for testing and development