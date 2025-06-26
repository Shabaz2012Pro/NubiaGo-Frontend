import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../../types';
import CategoryCard from '../molecules/CategoryCard';
import { 
  Smartphone, 
  Home, 
  Shirt, 
  Sparkles, 
  Dumbbell,
  Car,
  Utensils,
  Baby,
  TrendingUp,
  Users,
  Globe,
  Award,
  ArrowRight
} from 'lucide-react';
import Button from '../atoms/Button';
import { clsx } from 'clsx';

interface CategoriesGridProps {
  className?: string;
}

const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    icon: <Smartphone className="w-6 h-6" />,
    description: 'Smartphones, laptops, and cutting-edge technology',
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

const CategoriesGrid: React.FC<CategoriesGridProps> = ({ className }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const handleCategoryClick = (category: Category) => {
    // Navigate to category page
    window.location.href = `/categories/${category.slug}`;
  };

  return (
    <section className={clsx('py-16 bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>Premium Categories</span>
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 dark:text-neutral-100 mb-4">
            Explore Categories
          </h2>
          
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Discover premium products across <span className="font-semibold text-red-600 dark:text-red-400">8 core categories</span>, 
            connecting Turkish suppliers with African markets
          </p>
        </motion.div>
        
        {/* Categories Grid - 2 rows of 4 categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              custom={index}
              className="group"
            >
              <CategoryCard
                category={category}
                onClick={() => handleCategoryClick(category)}
                className="h-full transform hover:scale-105 transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white dark:bg-neutral-800 rounded-3xl p-8 lg:p-12 shadow-xl border border-neutral-200 dark:border-neutral-700 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="font-display font-bold text-2xl lg:text-3xl text-neutral-900 dark:text-neutral-100 mb-3">
              Marketplace at a Glance
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Connecting two continents through premium trade
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              variants={statsVariants}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                {categories.reduce((sum, cat) => sum + (cat.productCount || 0), 0).toLocaleString()}+
              </p>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Products</p>
            </motion.div>
            
            <motion.div 
              variants={statsVariants}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-gold-100 dark:bg-gold-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-gold-600 dark:text-gold-400" />
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-gold-600 dark:text-gold-400 mb-2">5,000+</p>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Verified Suppliers</p>
            </motion.div>
            
            <motion.div 
              variants={statsVariants}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">54</p>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">African Countries</p>
            </motion.div>
            
            <motion.div 
              variants={statsVariants}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1M+</p>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Happy Customers</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 lg:p-12 text-white"
        >
          <h3 className="font-display font-bold text-2xl lg:text-3xl mb-4">
            Ready to Start Trading?
          </h3>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of successful businesses connecting Turkish quality with African markets
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-red-600 hover:bg-neutral-100 px-8 py-4 text-lg font-semibold"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => window.location.href = '/products'}
            >
              Browse All Categories
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg font-semibold"
              onClick={() => window.location.href = '/suppliers'}
            >
              Become a Supplier
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesGrid;