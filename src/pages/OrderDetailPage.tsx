import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Printer } from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import OrderSummary from '../components/organisms/OrderSummary';
import Breadcrumb from '../components/molecules/Breadcrumb';
import Button from '../components/atoms/Button';
import { useOrder } from '../api/queries/useOrderQueries';
import LoadingScreen from '../components/molecules/LoadingScreen';
import ErrorState from '../components/molecules/ErrorState';

const OrderDetailPage: React.FC = () => {
  const [orderId, setOrderId] = useState<string | null>(null);
  
  // Extract order ID from URL
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '');
    const id = params.get('id');
    
    if (id) {
      setOrderId(id);
    }
  }, []);
  
  // Fetch order details
  const { data: order, isLoading, error } = useOrder(orderId || '');
  
  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Orders', href: '#dashboard?tab=orders' },
    { label: order ? `Order ${order.order_number}` : 'Order Details', current: true }
  ];
  
  // Print order
  const handlePrint = () => {
    window.print();
  };
  
  // Go back to orders
  const handleBack = () => {
    window.location.hash = 'dashboard?tab=orders';
  };
  
  if (isLoading) {
    return <LoadingScreen isLoading={true} text="Loading order details..." />;
  }
  
  if (error || !orderId) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <Header />
        <main className="py-16">
          <ErrorState 
            title="Order Not Found"
            message={error instanceof Error ? error.message : "We couldn't find the order you're looking for."}
            onRetry={() => window.location.reload()}
            onHome={handleBack}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header />
      
      <main className="py-8">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center justify-between">
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                onClick={handleBack}
              >
                Back to Orders
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Printer className="w-4 h-4" />}
                onClick={handlePrint}
                className="print:hidden"
              >
                Print Order
              </Button>
            </div>
          </div>
        </div>
        
        {/* Order Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {order && <OrderSummary order={order} />}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderDetailPage;