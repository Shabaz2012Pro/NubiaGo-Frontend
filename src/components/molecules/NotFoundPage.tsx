import React from 'react';
import { motion } from 'framer-motion';
import { Search, Home, ArrowLeft, AlertTriangle } from 'lucide-react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Button from '../atoms/Button';
import Card from '../atoms/Card';

interface NotFoundPageProps {
  message?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({
  message = "We couldn't find the page you're looking for.",
  showHeader = true,
  showFooter = true,
  className
}) => {
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

  const goBack = () => {
    window.history.back();
  };

  const goHome = () => {
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {showHeader && <Header />}
      
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={itemVariants}>
              <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
              
              <h1 className="text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                404
              </h1>
              
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Page Not Found
              </h2>
              
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
                {message}
              </p>
              
              <Card variant="default" padding="lg" className="mb-8 max-w-md mx-auto">
                <div className="flex items-center space-x-3 mb-4">
                  <Search className="w-5 h-5 text-neutral-500" />
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                    Looking for something?
                  </h3>
                </div>
                
                <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <p>• Check the URL for typos or errors</p>
                  <p>• The page might have been moved or deleted</p>
                  <p>• You might not have permission to view this page</p>
                  <p>• Try using the search function to find what you're looking for</p>
                </div>
              </Card>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={goBack}
                  leftIcon={<ArrowLeft className="w-5 h-5" />}
                >
                  Go Back
                </Button>
                
                <Button
                  variant="primary"
                  size="lg"
                  onClick={goHome}
                  leftIcon={<Home className="w-5 h-5" />}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Back to Home
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default NotFoundPage;