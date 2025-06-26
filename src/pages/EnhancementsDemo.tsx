import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Eye, 
  Bookmark, 
  Scale, 
  Building, 
  Smartphone,
  MessageSquare,
  Sparkles,
  Camera,
  Clock
} from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import VisualSearch from '../components/molecules/VisualSearch';
import RecentlyViewed from '../components/molecules/RecentlyViewed';
import PersonalizedRecommendations from '../components/molecules/PersonalizedRecommendations';
import SaveForLater from '../components/molecules/SaveForLater';
import ProductComparison from '../components/molecules/ProductComparison';
import SupplierDashboard from '../components/organisms/SupplierDashboard';
import PWAInstallPrompt from '../components/molecules/PWAInstallPrompt';
import PriceNegotiation from '../components/molecules/PriceNegotiation';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';
import { Product } from '../types';
import { clsx } from 'clsx';

const EnhancementsDemo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string>('overview');

  // Mock product for price negotiation demo
  const mockProduct: Product = {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    originalPrice: 249.99,
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
    currency: 'USD',
    description: 'Premium wireless headphones with active noise cancellation'
  };

  const enhancements = [
    {
      id: 'overview',
      title: 'Overview',
      description: 'Complete marketplace enhancement system',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      id: 'visual-search',
      title: 'Visual Search',
      description: 'AI-powered image search functionality',
      icon: <Camera className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      id: 'personalization',
      title: 'Personalization',
      description: 'AI recommendations and user tracking',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      id: 'collections',
      title: 'Save for Later',
      description: 'Product collections and wishlist management',
      icon: <Bookmark className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },
    {
      id: 'comparison',
      title: 'Product Comparison',
      description: 'Side-by-side product comparison tool',
      icon: <Scale className="w-6 h-6" />,
      color: 'bg-red-500'
    },
    {
      id: 'supplier-dashboard',
      title: 'Supplier Dashboard',
      description: 'Complete supplier management system',
      icon: <Building className="w-6 h-6" />,
      color: 'bg-indigo-500'
    },
    {
      id: 'pwa',
      title: 'PWA Features',
      description: 'Progressive web app capabilities',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'bg-pink-500'
    },
    {
      id: 'negotiation',
      title: 'Price Negotiation',
      description: 'B2B price negotiation system',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'bg-orange-500'
    }
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Marketplace Enhancements Demo
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Experience the complete suite of advanced features that make NubiaGO a world-class marketplace platform
            </p>
          </div>

          {/* Navigation */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {enhancements.map((enhancement) => (
                <button
                  key={enhancement.id}
                  onClick={() => setActiveDemo(enhancement.id)}
                  className={clsx(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200',
                    activeDemo === enhancement.id
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  )}
                >
                  <div className={clsx(
                    'w-8 h-8 rounded-lg flex items-center justify-center text-white',
                    activeDemo === enhancement.id ? 'bg-white/20' : enhancement.color
                  )}>
                    {enhancement.icon}
                  </div>
                  <span className="font-medium">{enhancement.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Demo Content */}
          <motion.div
            key={activeDemo}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {activeDemo === 'overview' && (
              <div className="space-y-12">
                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg" className="text-center">
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                      🚀 Complete Enhancement Suite
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { title: 'AI-Powered Search', desc: 'Visual & voice search with auto-complete', icon: '🔍' },
                        { title: 'Smart Personalization', desc: 'ML recommendations & user tracking', icon: '🧠' },
                        { title: 'Advanced Commerce', desc: 'Price negotiation & bulk ordering', icon: '💼' },
                        { title: 'PWA Ready', desc: 'Offline support & mobile optimization', icon: '📱' }
                      ].map((feature, index) => (
                        <div key={index} className="text-center">
                          <div className="text-4xl mb-3">{feature.icon}</div>
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {feature.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <PersonalizedRecommendations maxItems={4} />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <RecentlyViewed maxItems={6} />
                </motion.div>
              </div>
            )}

            {activeDemo === 'visual-search' && (
              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                      Visual Search Technology
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      Upload an image or take a photo to find similar products using AI-powered visual recognition
                    </p>
                    <VisualSearch
                      onImageSearch={(file) => console.log('Visual search:', file)}
                      onResults={(results) => console.log('Search results:', results)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {[
                      { title: 'AI Recognition', desc: 'Advanced computer vision algorithms', icon: '🤖' },
                      { title: 'Real-time Results', desc: 'Instant product matching', icon: '⚡' },
                      { title: 'Mobile Optimized', desc: 'Camera integration for mobile devices', icon: '📸' }
                    ].map((feature, index) => (
                      <div key={index} className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="text-3xl mb-3">{feature.icon}</div>
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {feature.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {activeDemo === 'personalization' && (
              <div className="space-y-8">
                <motion.div variants={itemVariants}>
                  <PersonalizedRecommendations showReason={true} />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <RecentlyViewed showInSidebar={false} />
                </motion.div>
              </div>
            )}

            {activeDemo === 'collections' && (
              <motion.div variants={itemVariants}>
                <SaveForLater />
              </motion.div>
            )}

            {activeDemo === 'comparison' && (
              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                      Product Comparison Tool
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      Compare products side-by-side with detailed specifications and pricing
                    </p>
                    <Badge variant="primary" size="lg" className="mb-4">
                      Interactive Demo - Use buttons in bottom corners
                    </Badge>
                  </div>
                  <ProductComparison />
                </Card>
              </motion.div>
            )}

            {activeDemo === 'supplier-dashboard' && (
              <motion.div variants={itemVariants}>
                <SupplierDashboard />
              </motion.div>
            )}

            {activeDemo === 'pwa' && (
              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                      Progressive Web App Features
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      Modern web app capabilities including offline support, push notifications, and native-like experience
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { title: 'Offline Support', desc: 'Browse products without internet', icon: '📱', status: 'Active' },
                      { title: 'Push Notifications', desc: 'Real-time updates and alerts', icon: '🔔', status: 'Ready' },
                      { title: 'App-like Experience', desc: 'Native mobile app feel', icon: '✨', status: 'Enabled' },
                      { title: 'Fast Loading', desc: 'Optimized for 3G networks', icon: '⚡', status: 'Optimized' },
                      { title: 'Background Sync', desc: 'Sync data when online', icon: '🔄', status: 'Active' },
                      { title: 'Install Prompt', desc: 'Add to home screen', icon: '⬇️', status: 'Available' }
                    ].map((feature, index) => (
                      <div key={index} className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-2xl">{feature.icon}</div>
                          <Badge variant="success" size="sm">{feature.status}</Badge>
                        </div>
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {feature.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {activeDemo === 'negotiation' && (
              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                      B2B Price Negotiation System
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      Advanced negotiation tools for bulk orders and custom pricing
                    </p>
                  </div>
                  
                  <div className="max-w-2xl mx-auto">
                    <div className="flex items-center space-x-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg mb-6">
                      <img
                        src={mockProduct.images[0]}
                        alt={mockProduct.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {mockProduct.name}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          by {mockProduct.supplier.name}
                        </p>
                        <p className="text-lg font-bold text-red-600">
                          ${mockProduct.price}
                        </p>
                      </div>
                      <PriceNegotiation
                        product={mockProduct}
                        onSubmitOffer={(offer) => console.log('Price negotiation offer:', offer)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { title: 'Bulk Discounts', desc: 'Automatic pricing tiers for large orders', icon: '📦' },
                        { title: 'Real-time Chat', desc: 'Direct communication with suppliers', icon: '💬' },
                        { title: 'Quote Management', desc: 'Track and manage all negotiations', icon: '📋' },
                        { title: 'Contract Terms', desc: 'Flexible payment and delivery terms', icon: '📄' }
                      ].map((feature, index) => (
                        <div key={index} className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <div className="text-3xl mb-3">{feature.icon}</div>
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {feature.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
      
      <Footer />
    </div>
  );
};

export default EnhancementsDemo;