import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Filter, 
  Grid, 
  List, 
  Star,
  Package,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';
import ProductsGrid from '../components/organisms/ProductsGrid';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';
import Card from '../components/atoms/Card';
import { Product } from '../types';

const CategoryPage: React.FC = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory?: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  // Category metadata
  const categoryData = {
    electronics: {
      title: 'Electronics',
      description: 'Cutting-edge technology and electronic devices from Turkish manufacturers',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1200',
      subcategories: ['smartphones', 'laptops', 'headphones', 'cameras', 'smart-home'],
      stats: {
        products: 2500,
        suppliers: 150,
        avgRating: 4.6,
        newThisWeek: 45
      }
    },
    fashion: {
      title: 'Fashion & Apparel',
      description: 'Premium clothing and accessories from Turkish fashion designers',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1200',
      subcategories: ['clothing', 'shoes', 'accessories', 'bags', 'jewelry'],
      stats: {
        products: 3200,
        suppliers: 200,
        avgRating: 4.7,
        newThisWeek: 78
      }
    },
    beauty: {
      title: 'Beauty & Personal Care',
      description: 'Premium beauty products and personal care items from Turkish brands',
      image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1200',
      subcategories: ['skincare', 'makeup', 'haircare', 'fragrances', 'tools'],
      stats: {
        products: 950,
        suppliers: 85,
        avgRating: 4.5,
        newThisWeek: 23
      }
    },
    'home-appliances': {
      title: 'Home & Appliances',
      description: 'Quality home goods and appliances for modern living',
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1200',
      subcategories: ['kitchen', 'furniture', 'decor', 'appliances', 'textiles'],
      stats: {
        products: 1800,
        suppliers: 120,
        avgRating: 4.4,
        newThisWeek: 34
      }
    },
    sports: {
      title: 'Sports & Fitness',
      description: 'Professional sports equipment and fitness gear',
      image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=1200',
      subcategories: ['fitness', 'outdoor', 'team-sports', 'water-sports', 'accessories'],
      stats: {
        products: 720,
        suppliers: 60,
        avgRating: 4.3,
        newThisWeek: 18
      }
    },
    automotive: {
      title: 'Automotive',
      description: 'Car parts, accessories, and automotive equipment',
      image: 'https://images.pexels.com/photos/1028742/pexels-photo-1028742.jpeg?auto=compress&cs=tinysrgb&w=1200',
      subcategories: ['parts', 'accessories', 'tools', 'electronics', 'maintenance'],
      stats: {
        products: 580,
        suppliers: 45,
        avgRating: 4.2,
        newThisWeek: 12
      }
    },
    'food-beverage': {
      title: 'Food & Beverage',
      description: 'Authentic Turkish foods and specialty beverages',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200',
      subcategories: ['coffee', 'tea', 'spices', 'sweets', 'organic'],
      stats: {
        products: 450,
        suppliers: 35,
        avgRating: 4.8,
        newThisWeek: 15
      }
    },
    'baby-kids': {
      title: 'Baby & Kids',
      description: 'Safe and quality products for babies and children',
      image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=1200',
      subcategories: ['clothing', 'toys', 'care', 'furniture', 'accessories'],
      stats: {
        products: 380,
        suppliers: 30,
        avgRating: 4.9,
        newThisWeek: 8
      }
    }
  };

  const currentCategory = category ? categoryData[category as keyof typeof categoryData] : null;

  useEffect(() => {
    // Simulate loading products for this category
    setLoading(true);
    
    setTimeout(() => {
      // Mock products would be filtered by category here
      setProducts([]);
      setLoading(false);
    }, 1000);
  }, [category, subcategory]);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!currentCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Category Not Found
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            The category you're looking for doesn't exist.
          </p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Browse All Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentCategory.image})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGoBack}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                className="text-white hover:bg-white/20"
              >
                Back
              </Button>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {currentCategory.title}
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                {currentCategory.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Package className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {currentCategory.stats.products.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Products</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {currentCategory.stats.suppliers}
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Suppliers</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {currentCategory.stats.avgRating}
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Avg Rating</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {currentCategory.stats.newThisWeek}
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">New This Week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategories */}
      {currentCategory.subcategories && (
        <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Browse by Subcategory
            </h2>
            <div className="flex flex-wrap gap-2">
              {currentCategory.subcategories.map((sub) => (
                <Badge
                  key={sub}
                  variant={subcategory === sub ? 'primary' : 'secondary'}
                  size="md"
                  className="cursor-pointer capitalize"
                  onClick={() => navigate(`/categories/${category}/${sub}`)}
                >
                  {sub.replace('-', ' ')}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="py-8">
        <ProductsGrid
          products={products}
          loading={loading}
          initialCategory={category}
          title={subcategory ? `${currentCategory.title} - ${subcategory.replace('-', ' ')}` : currentCategory.title}
          description={currentCategory.description}
          onProductClick={handleProductClick}
        />
      </div>
    </div>
  );
};

export default CategoryPage;