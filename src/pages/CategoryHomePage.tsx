
import React from 'react';
import { motion } from 'framer-motion';
import { Home, Refrigerator, Washing, Microwave, Coffee, ArrowRight } from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';
import Breadcrumb from '../components/molecules/Breadcrumb';

const CategoryHomePage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: 'Home Appliances', current: true }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <section className="bg-gradient-to-r from-green-600 to-green-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <Home className="w-4 h-4 mr-2" />
                Home Appliances
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">Home Appliances</h1>
              
              <p className="text-xl text-green-100 mb-6 max-w-2xl">
                Transform your home with premium appliances from Turkish manufacturers. 
                Quality, efficiency, and style for modern living.
              </p>
              
              <Button variant="primary" className="bg-white text-green-600 hover:bg-green-50">
                Shop All Appliances
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryHomePage;
