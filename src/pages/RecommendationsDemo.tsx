import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  ArrowUpRight, 
  Tag,
  Bell,
  Info
} from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import RecommendationEngine from '../components/molecules/RecommendationEngine';
import TrendingProducts from '../components/molecules/TrendingProducts';
import RelatedProductsCarousel from '../components/molecules/RelatedProductsCarousel';
import CrossSellRecommendations from '../components/molecules/CrossSellRecommendations';
import UpSellRecommendations from '../components/molecules/UpSellRecommendations';
import CategoryRecommendations from '../components/molecules/CategoryRecommendations';
import NotificationBell from '../components/molecules/NotificationBell';
import NotificationCenter from '../components/molecules/NotificationCenter';
import NotificationToast from '../components/molecules/NotificationToast';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import { useNotificationStore } from '../store/useNotificationStore';

const RecommendationsDemo: React.FC = () => {
  const { addToast } = useNotificationStore();

  const showToastNotification = (type: 'info' | 'success' | 'warning' | 'error') => {
    addToast({
      type,
      message: `This is a ${type} notification example`,
      autoClose: true,
      duration: 5000,
      action: {
        label: 'Action',
        onClick: () => console.log(`${type} action clicked`)
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Intelligent Recommendations & Notifications
              </h1>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                Explore our AI-powered recommendation engine and comprehensive notification system
              </p>
            </motion.div>

            {/* Recommendation Types */}
            <motion.div variants={itemVariants} className="mb-16">
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Recommendation Types
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-5 h-5 text-purple-500" />
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Personalized Recommendations
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      AI-powered recommendations based on browsing history and preferences
                    </p>
                  </div>
                  
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Trending Products
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Popular products based on recent sales and views
                    </p>
                  </div>
                  
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Package className="w-5 h-5 text-blue-500" />
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Related Products
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Products similar to what you're currently viewing
                    </p>
                  </div>
                  
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <ShoppingBag className="w-5 h-5 text-red-500" />
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Cross-Sell Recommendations
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Complementary products that go well with your current selection
                    </p>
                  </div>
                  
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <ArrowUpRight className="w-5 h-5 text-gold-500" />
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Up-Sell Recommendations
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Premium alternatives to the product you're viewing
                    </p>
                  </div>
                  
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Tag className="w-5 h-5 text-orange-500" />
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Category-Based Suggestions
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Top products from specific categories
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Notification System */}
            <motion.div variants={itemVariants} className="mb-16">
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <Bell className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Notification System
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      Toast Notifications
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                      Non-intrusive notifications that appear briefly and auto-dismiss
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => showToastNotification('info')}
                      >
                        Info Toast
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => showToastNotification('success')}
                      >
                        Success Toast
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => showToastNotification('warning')}
                      >
                        Warning Toast
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => showToastNotification('error')}
                      >
                        Error Toast
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      Notification Center
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                      Centralized hub for all notifications with filtering and management
                    </p>
                    <div className="flex items-center space-x-4">
                      <NotificationBell count={3} />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        Click the bell icon to open the notification center
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                        About the Notification System
                      </h4>
                      <ul className="space-y-1 text-sm text-blue-600 dark:text-blue-400">
                        <li>• Toast notifications for immediate feedback</li>
                        <li>• In-app notification center for history and management</li>
                        <li>• Notification preferences for personalization</li>
                        <li>• Support for multiple notification channels (in-app, email, push, SMS)</li>
                        <li>• Different notification types with priority levels</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Recommendation Examples */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
                Recommendation Examples
              </h2>

              <div className="space-y-16">
                <RecommendationEngine
                  type="personal"
                  maxItems={4}
                  showReason={true}
                />

                <TrendingProducts maxItems={4} />

                <RelatedProductsCarousel
                  productId="rec-1"
                  maxItems={4}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <CrossSellRecommendations productId="rec-1" />
                  <UpSellRecommendations productId="rec-1" />
                </div>

                <CategoryRecommendations category="electronics" maxItems={4} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RecommendationsDemo;