
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Laptop, Monitor, Headphones, Camera, ArrowRight } from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';
import Breadcrumb from '../components/molecules/Breadcrumb';

const CategoryElectronicsPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: 'Electronics & Tech', current: true }
  ];

  const subcategories = [
    {
      title: 'Smartphones & Tablets',
      icon: <Smartphone className="w-8 h-8" />,
      count: '2,450+ products',
      href: '/categories/electronics/smartphones'
    },
    {
      title: 'Laptops & Computers',
      icon: <Laptop className="w-8 h-8" />,
      count: '1,820+ products',
      href: '/categories/electronics/computers'
    },
    {
      title: 'Audio & Headphones',
      icon: <Headphones className="w-8 h-8" />,
      count: '980+ products',
      href: '/categories/electronics/audio'
    },
    {
      title: 'Cameras & Photography',
      icon: <Camera className="w-8 h-8" />,
      count: '650+ products',
      href: '/categories/electronics/cameras'
    },
    {
      title: 'Monitors & Displays',
      icon: <Monitor className="w-8 h-8" />,
      count: '430+ products',
      href: '/categories/electronics/monitors'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header />
      
      <main className="py-8">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <Smartphone className="w-4 h-4 mr-2" />
                Electronics & Technology
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">Electronics & Tech</h1>
              
              <p className="text-xl text-blue-100 mb-6 max-w-2xl">
                Discover the latest technology and electronics from premium Turkish suppliers. 
                From smartphones to smart home devices, find everything you need.
              </p>
              
              <Button variant="primary" className="bg-white text-blue-600 hover:bg-blue-50">
                Shop All Electronics
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Subcategories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
              Shop by Category
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                >
                  <Card 
                    variant="default" 
                    padding="lg"
                    className="h-full hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => window.location.href = category.href}
                  >
                    <div className="text-blue-600 mb-4 group-hover:text-blue-700 transition-colors">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      {category.count}
                    </p>
                    <Button variant="ghost" size="sm" className="group-hover:text-blue-600">
                      Browse Category
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryElectronicsPage;
