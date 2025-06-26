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
  ArrowRight,
  AlertCircle,
  FileText,
  Mail,
  Phone
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Badge from '../components/atoms/Badge';
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
  status: 'pending' | 'processing' | 'shipped' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception';
  statusText: string;
  progress: number;
  origin: string;
  destination: string;
  events: TrackingEvent[];
}

const TrackOrderPage: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Track Order', current: true }
  ];

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderNumber.trim()) {
      setError('Please enter an order number');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, always return a mock result
      // In a real app, this would be an API call
      const mockResult: TrackingResult = {
        orderNumber: orderNumber,
        trackingNumber: 'TRK-987654321',
        carrier: 'NubiaGO Express',
        estimatedDelivery: '2024-07-05',
        status: 'in_transit',
        statusText: 'In Transit',
        progress: 60,
        origin: 'Istanbul, Turkey',
        destination: 'Lagos, Nigeria',
        events: [
          {
            date: '2024-06-25',
            time: '09:15 AM',
            location: 'Istanbul, Turkey',
            status: 'Order Processed',
            description: 'Your order has been processed and is ready for shipment.'
          },
          {
            date: '2024-06-26',
            time: '02:30 PM',
            location: 'Istanbul, Turkey',
            status: 'Package Shipped',
            description: 'Your package has been shipped and is on its way.'
          },
          {
            date: '2024-06-28',
            time: '10:45 AM',
            location: 'Cairo, Egypt',
            status: 'In Transit',
            description: 'Your package has arrived at the transit facility.'
          },
          {
            date: '2024-06-30',
            time: '08:20 AM',
            location: 'Cairo, Egypt',
            status: 'Departed',
            description: 'Your package has left the transit facility.'
          }
        ]
      };
      
      setTrackingResult(mockResult);
    } catch (error) {
      setError('Failed to track order. Please try again later.');
      console.error('Error tracking order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: TrackingResult['status']) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'primary';
      case 'shipped': return 'primary';
      case 'in_transit': return 'primary';
      case 'out_for_delivery': return 'primary';
      case 'delivered': return 'success';
      case 'exception': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: TrackingResult['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'processing': return <Package className="w-5 h-5" />;
      case 'shipped': return <Truck className="w-5 h-5" />;
      case 'in_transit': return <Truck className="w-5 h-5" />;
      case 'out_for_delivery': return <Truck className="w-5 h-5" />;
      case 'delivered': return <CheckCircle className="w-5 h-5" />;
      case 'exception': return <AlertCircle className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
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
      <main className="py-8">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <Package className="w-4 h-4 mr-2" />
                Order Tracking
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
              
              <p className="text-xl text-indigo-100 mb-8">
                Enter your order number to get real-time updates on your package's journey from Turkey to your doorstep.
              </p>
              
              <Card variant="default" padding="lg" className="max-w-xl mx-auto">
                <form onSubmit={handleTrackOrder}>
                  <div className="space-y-4">
                    <Input
                      label="Order Number"
                      placeholder="Enter your order number (e.g., ORD-12345)"
                      value={orderNumber}
                      onChange={setOrderNumber}
                      leftIcon={<FileText className="w-4 h-4" />}
                      required
                    />
                    
                    <Input
                      label="Email Address (Optional)"
                      placeholder="Enter the email used for your order"
                      value={email}
                      onChange={setEmail}
                      leftIcon={<Mail className="w-4 h-4" />}
                      type="email"
                    />
                    
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
                      loading={isLoading}
                      leftIcon={<Search className="w-5 h-5" />}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      Track Order
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* Tracking Result */}
        {trackingResult && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
          >
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Tracking Information
                  </h2>
                  <Badge 
                    variant={getStatusColor(trackingResult.status)} 
                    size="md"
                    className="flex items-center space-x-1"
                  >
                    {getStatusIcon(trackingResult.status)}
                    <span>{trackingResult.statusText}</span>
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Order Number</p>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100">{trackingResult.orderNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Tracking Number</p>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100">{trackingResult.trackingNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Carrier</p>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100">{trackingResult.carrier}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Origin</p>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-neutral-400" />
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">{trackingResult.origin}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Destination</p>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-neutral-400" />
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">{trackingResult.destination}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Estimated Delivery</p>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-neutral-400" />
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">{trackingResult.estimatedDelivery}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-neutral-500">Shipping Progress</span>
                    <span className="text-neutral-500">{trackingResult.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div 
                      className={clsx(
                        "h-full rounded-full",
                        trackingResult.status === 'delivered' ? 'bg-green-500' : 'bg-indigo-500'
                      )} 
                      style={{ width: `${trackingResult.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between mt-2">
                    <div className="text-xs text-neutral-500">Order Placed</div>
                    <div className="text-xs text-neutral-500">In Transit</div>
                    <div className="text-xs text-neutral-500">Delivered</div>
                  </div>
                </div>
                
                {/* Tracking Events */}
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    Tracking History
                  </h3>
                  
                  <div className="relative pl-8 border-l-2 border-indigo-200 dark:border-indigo-800 space-y-6">
                    {trackingResult.events.map((event, index) => (
                      <div key={index} className="relative">
                        <div className="absolute left-[-17px] top-0 w-8 h-8 rounded-full bg-white dark:bg-neutral-900 border-2 border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
                          {index === 0 ? (
                            <div className="w-4 h-4 rounded-full bg-indigo-500"></div>
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-indigo-300 dark:bg-indigo-700"></div>
                          )}
                        </div>
                        
                        <div className="pb-6">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                              {event.status}
                            </h4>
                            <Badge variant="primary" size="sm">
                              {event.date} {event.time}
                            </Badge>
                          </div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                            {event.description}
                          </p>
                          <div className="flex items-center space-x-1 text-xs text-neutral-500">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.section>
        )}

        {/* Tracking Information */}
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
                  Tracking Information
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Understanding your order's journey from Turkey to Africa
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                        <Package className="w-6 h-6 text-indigo-600" />
                      </div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Order Statuses Explained
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-2">
                        <Badge variant="warning" size="sm" className="mt-0.5">Pending</Badge>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">Order received but not yet processed</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Badge variant="primary" size="sm" className="mt-0.5">Processing</Badge>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">Order is being prepared for shipping</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Badge variant="primary" size="sm" className="mt-0.5">Shipped</Badge>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">Order has been handed to the carrier</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Badge variant="primary" size="sm" className="mt-0.5">In Transit</Badge>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">Package is on its way to destination</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Badge variant="primary" size="sm" className="mt-0.5">Out for Delivery</Badge>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">Package is out for final delivery</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Badge variant="success" size="sm" className="mt-0.5">Delivered</Badge>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">Package has been delivered</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Badge variant="error" size="sm" className="mt-0.5">Exception</Badge>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">Delivery issue or delay</span>
                      </li>
                    </ul>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                        <Truck className="w-6 h-6 text-indigo-600" />
                      </div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Shipping Partners
                      </h3>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      We work with trusted shipping partners to ensure your package arrives safely and on time:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">NubiaGO Express (Our premium service)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">DHL Express</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">FedEx International</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">UPS Worldwide</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">Turkish Cargo</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">Local delivery partners in each country</span>
                      </li>
                    </ul>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                        <HelpCircle className="w-6 h-6 text-indigo-600" />
                      </div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Tracking FAQs
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                          How often is tracking updated?
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Tracking information is typically updated every 24-48 hours, depending on the carrier.
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                          Why hasn't my tracking updated?
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Tracking may not update during weekends, holidays, or while packages are in transit between facilities.
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                          What if my package is delayed?
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          International shipments may experience delays due to customs processing or other factors. Contact us if your package is significantly delayed.
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                          Can I track by email?
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Yes, you can track your order using either your order number or the email address used for your purchase.
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Need Help */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                      Need Help With Your Order?
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      Our customer support team is here to help you with any questions about your order or tracking information.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 rounded-lg">
                          <Mail className="w-5 h-5" />
                        </div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          support@nubiago.com
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 rounded-lg">
                          <Phone className="w-5 h-5" />
                        </div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          +90 212 XXX XXXX
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/3">
                    <Button 
                      variant="primary" 
                      size="lg"
                      fullWidth
                      className="bg-indigo-600 hover:bg-indigo-700"
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                      onClick={() => window.location.hash = 'contact'}
                    >
                      Contact Support
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default TrackOrderPage;