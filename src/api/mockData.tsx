import { Product, Category, Supplier } from '../types';
import { 
  Smartphone, 
  Home, 
  Shirt, 
  Sparkles, 
  Dumbbell,
  Car,
  Utensils,
  Baby
} from 'lucide-react';

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation',
    price: 199.99,
    originalPrice: 249.99,
    currency: 'USD',
    images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'],
    category: 'electronics',
    supplier: {
      id: '1',
      name: 'AudioTech Turkey',
      country: 'Turkey',
      rating: 4.8,
      verified: true,
      totalProducts: 150,
      responseTime: '< 2 hours',
      memberSince: '2020'
    },
    rating: 4.7,
    reviews: 234,
    inStock: true,
    minOrder: 1,
    tags: ['wireless', 'premium', 'noise-cancelling'],
    isNew: true,
    isFeatured: true,
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Impedance': '32 Ohms',
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Warranty': '2 years'
    }
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with health monitoring',
    price: 299.99,
    currency: 'USD',
    images: ['https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400'],
    category: 'electronics',
    supplier: {
      id: '2',
      name: 'FitTech Istanbul',
      country: 'Turkey',
      rating: 4.6,
      verified: true,
      totalProducts: 85,
      responseTime: '< 4 hours',
      memberSince: '2019'
    },
    rating: 4.5,
    reviews: 189,
    inStock: true,
    minOrder: 1,
    tags: ['fitness', 'smart', 'health'],
    isNew: true,
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery Life': '7 days',
      'Water Resistance': '5 ATM',
      'Sensors': 'Heart rate, SpO2, Accelerometer',
      'Connectivity': 'Bluetooth 5.0, WiFi',
      'Compatibility': 'iOS, Android',
      'Weight': '35g',
      'Warranty': '1 year'
    }
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
    name: 'Handcrafted Leather Bag',
    description: 'Premium leather bag handcrafted by Turkish artisans',
    price: 129.99,
    currency: 'USD',
    images: ['https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400'],
    category: 'fashion',
    supplier: {
      id: '3',
      name: 'Istanbul Leather Co.',
      country: 'Turkey',
      rating: 4.9,
      verified: true,
      totalProducts: 95,
      responseTime: '< 2 hours',
      memberSince: '2017'
    },
    rating: 4.8,
    reviews: 156,
    inStock: true,
    minOrder: 1,
    tags: ['leather', 'handcrafted', 'premium'],
    specifications: {
      'Material': 'Genuine leather',
      'Dimensions': '30cm x 20cm x 10cm',
      'Closure': 'Zipper',
      'Pockets': '3 interior, 1 exterior',
      'Strap': 'Adjustable, detachable',
      'Color': 'Brown',
      'Weight': '0.8kg',
      'Care': 'Leather conditioner recommended'
    }
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d482',
    name: 'Turkish Coffee Set',
    description: 'Authentic Turkish coffee set with traditional design',
    price: 45.99,
    currency: 'USD',
    images: ['https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'],
    category: 'food-beverage',
    supplier: {
      id: '4',
      name: 'Anatolian Delights',
      country: 'Turkey',
      rating: 4.7,
      verified: true,
      totalProducts: 120,
      responseTime: '< 3 hours',
      memberSince: '2018'
    },
    rating: 4.6,
    reviews: 98,
    inStock: true,
    minOrder: 1,
    tags: ['coffee', 'traditional', 'authentic'],
    isFeatured: true,
    specifications: {
      'Material': 'Copper, brass',
      'Capacity': '2 cups',
      'Includes': 'Coffee pot, 2 cups, saucers, sugar bowl',
      'Dishwasher Safe': 'No',
      'Handmade': 'Yes',
      'Origin': 'Turkey',
      'Weight': '0.5kg',
      'Care': 'Hand wash only'
    }
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d483',
    name: 'Professional Hair Dryer',
    description: 'Salon-grade ionic hair dryer with multiple heat settings',
    price: 79.99,
    originalPrice: 99.99,
    currency: 'USD',
    images: ['https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400'],
    category: 'beauty',
    supplier: {
      id: '5',
      name: 'Beauty Pro Turkey',
      country: 'Turkey',
      rating: 4.4,
      verified: true,
      totalProducts: 120,
      responseTime: '< 3 hours',
      memberSince: '2021'
    },
    rating: 4.2,
    reviews: 67,
    inStock: true,
    minOrder: 1,
    tags: ['professional', 'ionic', 'salon-grade'],
    specifications: {
      'Power': '2000W',
      'Heat Settings': '3',
      'Speed Settings': '2',
      'Cool Shot': 'Yes',
      'Cord Length': '2.5m',
      'Weight': '0.6kg',
      'Attachments': 'Concentrator, diffuser',
      'Warranty': '1 year'
    }
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d484',
    name: 'Fitness Resistance Bands Set',
    description: 'Complete resistance bands set with door anchor and exercise guide',
    price: 29.99,
    originalPrice: 39.99,
    currency: 'USD',
    images: ['https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400'],
    category: 'sports',
    supplier: {
      id: '6',
      name: 'FitLife Turkey',
      country: 'Turkey',
      rating: 4.3,
      verified: true,
      totalProducts: 75,
      responseTime: '< 6 hours',
      memberSince: '2020'
    },
    rating: 4.1,
    reviews: 92,
    inStock: true,
    minOrder: 1,
    tags: ['fitness', 'resistance', 'home-gym'],
    specifications: {
      'Resistance Levels': '5',
      'Material': 'Natural latex',
      'Max Resistance': '150 lbs',
      'Includes': 'Door anchor, handles, ankle straps, exercise guide',
      'Portable': 'Yes',
      'Suitable For': 'All fitness levels',
      'Weight': '0.7kg',
      'Warranty': '1 year'
    }
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d485',
    name: 'Ceramic Dinnerware Set',
    description: '16-piece ceramic dinnerware set with modern geometric design',
    price: 89.99,
    currency: 'USD',
    images: ['https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400'],
    category: 'home-appliances',
    supplier: {
      id: '7',
      name: 'Cappadocia Ceramics',
      country: 'Turkey',
      rating: 4.8,
      verified: true,
      totalProducts: 110,
      responseTime: '< 2 hours',
      memberSince: '2019'
    },
    rating: 4.7,
    reviews: 134,
    inStock: true,
    minOrder: 1,
    tags: ['ceramic', 'dinnerware', 'modern'],
    isFeatured: true,
    specifications: {
      'Pieces': '16',
      'Includes': '4 dinner plates, 4 salad plates, 4 bowls, 4 mugs',
      'Material': 'Ceramic',
      'Dishwasher Safe': 'Yes',
      'Microwave Safe': 'Yes',
      'Color': 'White with blue pattern',
      'Weight': '5kg',
      'Care': 'Dishwasher and microwave safe'
    }
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d486',
    name: 'Car Phone Mount',
    description: 'Universal magnetic car phone mount with 360° rotation',
    price: 19.99,
    originalPrice: 29.99,
    currency: 'USD',
    images: ['https://images.pexels.com/photos/1028742/pexels-photo-1028742.jpeg?auto=compress&cs=tinysrgb&w=400'],
    category: 'automotive',
    supplier: {
      id: '8',
      name: 'AutoTech Turkey',
      country: 'Turkey',
      rating: 4.2,
      verified: true,
      totalProducts: 60,
      responseTime: '< 4 hours',
      memberSince: '2021'
    },
    rating: 4.0,
    reviews: 78,
    inStock: true,
    minOrder: 1,
    tags: ['magnetic', 'universal', 'car-accessory'],
    specifications: {
      'Mounting Type': 'Dashboard/Air vent',
      'Compatibility': 'Universal',
      'Rotation': '360°',
      'Magnetic': 'Yes',
      'Material': 'ABS plastic, silicone',
      'Adjustable': 'Yes',
      'Weight': '0.1kg',
      'Warranty': '1 year'
    }
  }
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    icon: <Smartphone className="w-6 h-6" />,
    description: 'Cutting-edge electronics from Turkish manufacturers',
    productCount: 2500000,
    subcategories: [
      { id: 'smartphones', name: 'Smartphones', slug: 'smartphones', icon: <Smartphone /> },
      { id: 'laptops', name: 'Laptops & Computers', slug: 'laptops', icon: <Smartphone /> },
    ],
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'home-appliances',
    name: 'Appliances',
    slug: 'home-appliances',
    icon: <Home className="w-6 h-6" />,
    description: 'Kitchen, cleaning, and home appliances',
    productCount: 1800000,
    subcategories: [
      { id: 'kitchen', name: 'Kitchen Appliances', slug: 'kitchen', icon: <Home /> },
      { id: 'cleaning', name: 'Cleaning Equipment', slug: 'cleaning', icon: <Home /> },
    ],
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    icon: <Shirt className="w-6 h-6" />,
    description: 'Premium clothing and fashion accessories',
    productCount: 3200000,
    subcategories: [
      { id: 'mens-clothing', name: "Men's Clothing", slug: 'mens-clothing', icon: <Shirt /> },
      { id: 'womens-clothing', name: "Women's Clothing", slug: 'womens-clothing', icon: <Shirt /> },
    ],
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'beauty',
    name: 'Personal Care',
    slug: 'beauty',
    icon: <Sparkles className="w-6 h-6" />,
    description: 'Cosmetics, skincare, and grooming products',
    productCount: 950000,
    subcategories: [
      { id: 'skincare', name: 'Skincare', slug: 'skincare', icon: <Sparkles /> },
      { id: 'makeup', name: 'Makeup & Cosmetics', slug: 'makeup', icon: <Sparkles /> },
    ],
    image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'sports',
    name: 'Sports',
    slug: 'sports',
    icon: <Dumbbell className="w-6 h-6" />,
    description: 'Fitness equipment and sports apparel',
    productCount: 720000,
    subcategories: [
      { id: 'fitness-equipment', name: 'Fitness Equipment', slug: 'fitness-equipment', icon: <Dumbbell /> },
      { id: 'sports-apparel', name: 'Sports Apparel', slug: 'sports-apparel', icon: <Dumbbell /> },
    ],
    image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    slug: 'automotive',
    icon: <Car className="w-6 h-6" />,
    description: 'Car parts, accessories, and automotive tools',
    productCount: 580000,
    subcategories: [
      { id: 'car-parts', name: 'Car Parts', slug: 'car-parts', icon: <Car /> },
      { id: 'auto-accessories', name: 'Car Accessories', slug: 'auto-accessories', icon: <Car /> },
    ],
    image: 'https://images.pexels.com/photos/1028742/pexels-photo-1028742.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'food-beverage',
    name: 'Food & Beverage',
    slug: 'food-beverage',
    icon: <Utensils className="w-6 h-6" />,
    description: 'Turkish delights, spices, and gourmet foods',
    productCount: 450000,
    subcategories: [
      { id: 'turkish-delights', name: 'Turkish Delights', slug: 'turkish-delights', icon: <Utensils /> },
      { id: 'spices', name: 'Spices & Seasonings', slug: 'spices', icon: <Utensils /> },
    ],
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'baby-kids',
    name: 'Baby & Kids',
    slug: 'baby-kids',
    icon: <Baby className="w-6 h-6" />,
    description: 'Baby products, toys, and children\'s clothing',
    productCount: 380000,
    subcategories: [
      { id: 'baby-care', name: 'Baby Care', slug: 'baby-care', icon: <Baby /> },
      { id: 'toys', name: 'Toys & Games', slug: 'toys', icon: <Baby /> },
    ],
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

// Mock Suppliers
export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'AudioTech Turkey',
    country: 'Turkey',
    rating: 4.8,
    verified: true,
    totalProducts: 150,
    responseTime: '< 2 hours',
    memberSince: '2020',
    logo: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    categories: ['Electronics', 'Audio Equipment']
  },
  {
    id: '2',
    name: 'FitTech Istanbul',
    country: 'Turkey',
    rating: 4.6,
    verified: true,
    totalProducts: 85,
    responseTime: '< 4 hours',
    memberSince: '2019',
    logo: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    categories: ['Electronics', 'Fitness']
  },
  {
    id: '3',
    name: 'Istanbul Leather Co.',
    country: 'Turkey',
    rating: 4.9,
    verified: true,
    totalProducts: 95,
    responseTime: '< 2 hours',
    memberSince: '2017',
    logo: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    categories: ['Fashion', 'Leather Goods']
  },
  {
    id: '4',
    name: 'Anatolian Delights',
    country: 'Turkey',
    rating: 4.7,
    verified: true,
    totalProducts: 120,
    responseTime: '< 3 hours',
    memberSince: '2018',
    logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    categories: ['Food & Beverage']
  },
  {
    id: '5',
    name: 'Beauty Pro Turkey',
    country: 'Turkey',
    rating: 4.4,
    verified: true,
    totalProducts: 120,
    responseTime: '< 3 hours',
    memberSince: '2021',
    logo: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    categories: ['Beauty', 'Personal Care']
  }
];