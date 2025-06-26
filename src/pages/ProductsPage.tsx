import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductsGrid from '../components/organisms/ProductsGrid';
import { Product } from '../types';
import Breadcrumb from '../components/molecules/Breadcrumb';

const ProductsPage: React.FC = () => {
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState('All Products');
  const [description, setDescription] = useState('Discover premium products from verified Turkish suppliers');
  const [loading, setLoading] = useState(true);

  // Get category from URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('categories/')) {
      const categoryFromHash = hash.replace('categories/', '');
      setCategory(categoryFromHash);
      
      // Set title and description based on category
      const formattedCategory = categoryFromHash.charAt(0).toUpperCase() + categoryFromHash.slice(1).replace(/-/g, ' ');
      setTitle(`${formattedCategory} Products`);
      setDescription(`Discover premium ${formattedCategory.toLowerCase()} products from verified Turkish suppliers`);
    }
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Generate breadcrumb items based on category
  const getBreadcrumbItems = () => {
    const items = [{ label: 'Home', href: '#' }, { label: 'Products', href: '#products' }];
    
    if (category) {
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
      items.push({ label: formattedCategory, current: true });
    } else {
      items[1].current = true;
    }
    
    return items;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <main className="py-8">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb items={getBreadcrumbItems()} />
        </div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pb-16"
        >
          <ProductsGrid
            initialCategory={category}
            title={title}
            description={description}
            loading={loading}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default ProductsPage;