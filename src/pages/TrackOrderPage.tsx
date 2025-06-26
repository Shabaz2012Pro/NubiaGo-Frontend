import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin,
  Calendar,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

interface TrackingEvent {
  date: string;
  time: string;
  location: string;
  status: string;
  description: string;
}

interface TrackingResult {
  orderNumber: string;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  status: 'processing' | 'shipped' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception';
  statusText: string;
  progress: number;
  origin: string;
  destination: string;
  events: TrackingEvent[];
}

const TrackOrderPage: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Track Your Order', current: true }
  ];

  // Mock tracking data
  const mockTrackingData: TrackingResult = {
    orderNumber: 'ORD-12345678',
    trackingNumber: 'TRK-987654321',
    carrier: 'NubiaGO Express',
    estimatedDelivery: 'January 25, 2024',
    status: 'in_transit',
    statusText: 'In Transit',
    progress: 60,
    origin: 'Istanbul, Turkey',
    destination: 'Lagos, Nigeria',
    events: [
      {
        date: 'January 15, 2024',
        time: '09:15 AM',
        location: 'Istanbul, Turkey',
        status: 'Order Processed',
        description: 'Your order has been processed and is ready for shipment.'
      },
      {
        date: 'January 16, 2024',
        time: '02:30 PM',
        location: 'Istanbul, Turkey',
        status: 'Package Shipped',
        description: 'Your package has been shipped and is on its way.'
      },
      {
        date: 'January 18, 2024',
        time: '10:45 AM',
        location: 'Cairo, Egypt',
        status: 'In Transit',
        description: 'Your package has arrived at the transit facility.'
      },
      {
        date: 'January 20, 2024',
        time: '08:20 AM',
        location: 'Cairo, Egypt',
        status: 'Departed',
        description: 'Your package has left the transit facility.'
      }
    ]
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!trackingNumber && !orderNumber) {
      setError('Please enter a tracking number or order number');
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      
      // For demo purposes, always show the mock data
      setTrackingResult(mockTrackingData);
      
      // In a real app, you would check if the tracking number exists
      // and show an error if it doesn't
      // if (trackingNumber !== 'TRK-987654321' && orderNumber !== 'ORD-12345678') {
      //   setError('No tracking information found. Please check your tracking number or order number.');
      //   setTrackingResult(null);
      // }
    }, 1500);
  };

  const getStatusColor = (status: TrackingResult['status']) => {
    switch (status) {
      case 'processing': return 'bg-yellow-500';
      case 'shipped': return 'bg-blue-500';
      case 'in_transit': return 'bg-blue-500';
      case 'out_for_delivery': return 'bg-green-500';
      case 'delivered': return 'bg-green-600';
      case 'exception': return 'bg-red-500';
      default: return 'bg-neutral-500';
    }
  };

  const getStatusBadge = (status: TrackingResult['status']) => {
    switch (status) {
      case 'processing':
        return <Badge variant="warning" size="lg">Processing</Badge>;
      case 'shipped':
        return <Badge variant="primary" size="lg">Shipped</Badge>;
      case 'in_transit':
        return <Badge variant="primary" size="lg">In Transit</Badge>;
      case 'out_for_delivery':
        return <Badge variant="success" size="lg">Out for Delivery</Badge>;
      case 'delivered':
        return <Badge variant="success" size="lg">Delivered</Badge>;
      case 'exception':
        return <Badge variant="error" size="lg">Exception</Badge>;
      default:
        return <Badge variant="default" size="lg">Unknown</Badge>;
    }
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
      
      <main className="py-8">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <Package className="w-4 h-4 mr-2" />
                Order Tracking
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
              
              <p className="text-xl text-indigo-100 mb-6">
                Enter your tracking number or order number to get real-time updates on your package's journey.
              </p>
            </div>
          </div>
        </section>

        {/* Tracking Form */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                  Enter Your Tracking Information
                </h2>
                
                <form onSubmit={handleTrackOrder} className="space-y-6">
                  <div className="space-y-4">
                    <Input
                      label="Tracking Number"
                      placeholder="Enter your tracking number (e.g., TRK-987654321)"
                      value={trackingNumber}
                      onChange={setTrackingNumber}
                      leftIcon={<Package className="w-4 h-4" />}
                    />
                    
                    <div className="relative flex items-center justify-center">
                      <div className="border-t border-neutral-200 dark:border-neutral-700 w-full"></div>
                      <span className="bg-white dark:bg-neutral-800 px-2 text-sm text-neutral-500 relative">or</span>
                      <div className="border-t border-neutral-200 dark:border-neutral-700 w-full"></div>
                    </div>
                    
                    <Input
                      label="Order Number"
                      placeholder="Enter your order number (e.g., ORD-12345678)"
                      value={orderNumber}
                      onChange={setOrderNumber}
                      leftIcon={<Package className="w-4 h-4" />}
                    />
                  </div>
                  
                  {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg flex items-center space-x-2 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isSearching}
                    leftIcon={<Search className="w-5 h-5" />}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    {isSearching ? 'Searching...' : 'Track Order'}
                  </Button>
                  
                  <p className="text-sm text-neutral-500 text-center">
                    For any issues with tracking, please <a href="/contact" className="text-indigo-600 hover:underline">contact our support team</a>.
                  </p>
                </form>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Tracking Results */}
        {trackingResult && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-8">
                <Card variant="default" padding="lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                          Tracking Details
                        </h2>
                        {getStatusBadge(trackingResult.status)}
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Order: {trackingResult.orderNumber} | Tracking: {trackingResult.trackingNumber}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<MessageSquare className="w-4 h-4" />}
                        onClick={() => window.location.href = '/contact'}
                      >
                        Need Help?
                      </Button>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-500">Order Placed</span>
                      <span className="text-neutral-500">Estimated Delivery: {trackingResult.estimatedDelivery}</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <div 
                        className={clsx("h-full rounded-full", getStatusColor(trackingResult.status))} 
                        style={{ width: `${trackingResult.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="flex flex-col items-center">
                        <div className={clsx(
                          "w-6 h-6 rounded-full flex items-center justify-center",
                          trackingResult.progress >= 0 ? "bg-green-500 text-white" : "bg-neutral-300 dark:bg-neutral-600"
                        )}>
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <span className="text-xs mt-1">Processed</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className={clsx(
                          "w-6 h-6 rounded-full flex items-center justify-center",
                          trackingResult.progress >= 25 ? "bg-green-500 text-white" : "bg-neutral-300 dark:bg-neutral-600"
                        )}>
                          <Package className="w-4 h-4" />
                        </div>
                        <span className="text-xs mt-1">Shipped</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className={clsx(
                          "w-6 h-6 rounded-full flex items-center justify-center",
                          trackingResult.progress >= 50 ? "bg-green-500 text-white" : "bg-neutral-300 dark:bg-neutral-600"
                        )}>
                          <Truck className="w-4 h-4" />
                        </div>
                        <span className="text-xs mt-1">In Transit</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className={clsx(
                          "w-6 h-6 rounded-full flex items-center justify-center",
                          trackingResult.progress >= 75 ? "bg-green-500 text-white" : "bg-neutral-300 dark:bg-neutral-600"
                        )}>
                          <Truck className="w-4 h-4" />
                        </div>
                        <span className="text-xs mt-1">Out for Delivery</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className={clsx(
                          "w-6 h-6 rounded-full flex items-center justify-center",
                          trackingResult.progress >= 100 ? "bg-green-500 text-white" : "bg-neutral-300 dark:bg-neutral-600"
                        )}>
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <span className="text-xs mt-1">Delivered</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Shipment Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Shipment Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <span className="text-sm font-medium text-neutral-500">Carrier</span>
                          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{trackingResult.carrier}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <span className="text-sm font-medium text-neutral-500">Status</span>
                          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{trackingResult.statusText}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <span className="text-sm font-medium text-neutral-500">Estimated Delivery</span>
                          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{trackingResult.estimatedDelivery}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Route Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <MapPin className="w-5 h-5 text-neutral-500 mr-3 flex-shrink-0" />
                          <div>
                            <span className="text-sm font-medium text-neutral-500 block">From</span>
                            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{trackingResult.origin}</span>
                          </div>
                        </div>
                        <div className="flex items-start p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <MapPin className="w-5 h-5 text-neutral-500 mr-3 flex-shrink-0" />
                          <div>
                            <span className="text-sm font-medium text-neutral-500 block">To</span>
                            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{trackingResult.destination}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tracking History */}
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                      Tracking History
                    </h3>
                    <div className="space-y-4">
                      {trackingResult.events.map((event, index) => (
                        <div 
                          key={index} 
                          className={clsx(
                            "relative pl-8 pb-8",
                            index === trackingResult.events.length - 1 ? "pb-0" : "border-l-2 border-indigo-200 dark:border-indigo-800/50 ml-3"
                          )}
                        >
                          <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-500 flex items-center justify-center">
                            {index === 0 ? (
                              <Package className="w-3 h-3 text-indigo-600" />
                            ) : (
                              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            )}
                          </div>
                          
                          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                              <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                {event.status}
                              </h4>
                              <div className="flex items-center space-x-3 text-sm text-neutral-500">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  <span>{event.date}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  <span>{event.time}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <MapPin className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-neutral-600 dark:text-neutral-400">{event.location}</span>
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </section>
        )}

        {/* FAQs */}
        <section className="bg-neutral-50 dark:bg-neutral-800/30 py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  Tracking FAQs
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Common questions about order tracking
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                  {
                    question: 'Where can I find my tracking number?',
                    answer: 'Your tracking number is included in your order confirmation email and is also available in your account dashboard under "Order History".'
                  },
                  {
                    question: 'How often is tracking information updated?',
                    answer: 'Tracking information is typically updated once per day, but may be updated more frequently as your package nears delivery.'
                  },
                  {
                    question: 'My tracking hasn\'t updated in several days. What should I do?',
                    answer: 'Tracking updates may be delayed during international shipping, especially during customs processing. If there have been no updates for more than 5 business days, please contact our support team.'
                  },
                  {
                    question: 'Can I track multiple orders at once?',
                    answer: 'Yes, you can view all your orders and their tracking information in your account dashboard under "Order History".'
                  }
                ].map((faq, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 rounded-lg flex-shrink-0">
                          <HelpCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-800/30">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                      Need Additional Assistance?
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      If you need help with tracking your order or have any other questions, our customer support team is here to help.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        variant="primary" 
                        leftIcon={<MessageSquare className="w-4 h-4" />}
                        className="bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => window.location.href = '/contact'}
                      >
                        Contact Support
                      </Button>
                      <Button 
                        variant="outline"
                        leftIcon={<HelpCircle className="w-4 h-4" />}
                        onClick={() => window.location.href = '/help'}
                      >
                        Visit Help Center
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-32 h-32 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                      <Package className="w-16 h-16 text-indigo-600" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Related Links */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Related Information
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Shipping Information',
                  description: 'Learn about our shipping methods, delivery times, and policies.',
                  icon: <Truck className="w-6 h-6" />,
                  link: '/shipping-info',
                  color: 'text-blue-500'
                },
                {
                  title: 'Returns & Refunds',
                  description: 'Understand our return policy and refund process.',
                  icon: <RefreshCw className="w-6 h-6" />,
                  link: '/returns-refunds',
                  color: 'text-green-500'
                },
                {
                  title: 'Contact Us',
                  description: 'Get in touch with our customer support team for assistance.',
                  icon: <MessageSquare className="w-6 h-6" />,
                  link: '/contact',
                  color: 'text-purple-500'
                }
              ].map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card 
                    variant="default" 
                    padding="lg" 
                    className="h-full hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => window.location.href = item.link}
                  >
                    <div className={`${item.color} mb-4 flex justify-center`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 text-center">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-center mb-4">
                      {item.description}
                    </p>
                    <div className="flex justify-center">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        rightIcon={<ChevronRight className="w-4 h-4" />}
                        className={clsx("text-sm", item.color)}
                      >
                        Learn More
                      </Button>
                    </div>
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

export default TrackOrderPage;