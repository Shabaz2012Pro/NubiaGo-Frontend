import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Package, 
  Clock, 
  Globe, 
  DollarSign, 
  Shield, 
  MapPin,
  AlertTriangle,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Breadcrumb from '../components/molecules/Breadcrumb';

const ShippingInfoPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Shipping Information', current: true }
  ];

  const shippingMethods = [
    {
      name: 'Standard Shipping',
      icon: <Truck className="w-6 h-6" />,
      description: 'Economical shipping option for non-urgent deliveries',
      time: '7-14 business days',
      price: 'From $25',
      color: 'text-blue-500'
    },
    {
      name: 'Express Shipping',
      icon: <Package className="w-6 h-6" />,
      description: 'Faster delivery for more urgent orders',
      time: '3-7 business days',
      price: 'From $45',
      color: 'text-green-500'
    },
    {
      name: 'Premium Shipping',
      icon: <Clock className="w-6 h-6" />,
      description: 'Our fastest shipping option with priority handling',
      time: '1-3 business days',
      price: 'From $75',
      color: 'text-purple-500'
    }
  ];

  const shippingDestinations = [
    { country: 'Nigeria', flag: '🇳🇬', time: '7-14 days', cost: '$25-45' },
    { country: 'Ghana', flag: '🇬🇭', time: '7-14 days', cost: '$30-50' },
    { country: 'Kenya', flag: '🇰🇪', time: '8-15 days', cost: '$35-55' },
    { country: 'South Africa', flag: '🇿🇦', time: '8-15 days', cost: '$40-60' },
    { country: 'Egypt', flag: '🇪🇬', time: '7-14 days', cost: '$28-48' },
    { country: 'Morocco', flag: '🇲🇦', time: '7-14 days', cost: '$32-52' },
    { country: 'Ethiopia', flag: '🇪🇹', time: '10-18 days', cost: '$38-58' },
    { country: 'Tanzania', flag: '🇹🇿', time: '10-18 days', cost: '$38-58' }
  ];

  const faqs = [
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email and SMS. You can track your package in real-time through your account dashboard or our mobile app.'
    },
    {
      question: 'What if my package is delayed?',
      answer: 'If your package is delayed beyond the estimated delivery timeframe, please contact our customer support team. We\'ll investigate the status with the shipping carrier and provide you with updated information.'
    },
    {
      question: 'Do you ship to all African countries?',
      answer: 'Yes, we ship to all 54 African countries. Shipping times and costs vary by destination. You can see estimated shipping times and costs for your country during checkout.'
    },
    {
      question: 'How are shipping costs calculated?',
      answer: 'Shipping costs are calculated based on the destination country, package weight, dimensions, and the shipping method you select. You can see the exact shipping cost during checkout before completing your purchase.'
    },
    {
      question: 'Can I change my shipping address after placing an order?',
      answer: 'Address changes may be possible if the order hasn\'t been processed yet. Please contact our customer support team immediately with your order number and the new shipping address.'
    }
  ];

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
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <Truck className="w-4 h-4 mr-2" />
                Fast & Reliable Shipping
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
              
              <p className="text-xl text-blue-100 mb-6">
                Learn about our shipping methods, delivery times, and policies for getting your premium Turkish products delivered to your doorstep across Africa.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="secondary" 
                  className="bg-white text-blue-600 hover:bg-neutral-100"
                >
                  Track Your Order
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Shipping Methods */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Shipping Methods
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Choose the shipping option that best fits your needs and timeline
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {shippingMethods.map((method, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className={`${method.color} mb-6 flex justify-center`}>
                      {method.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 text-center">
                      {method.name}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-center">
                      {method.description}
                    </p>
                    <div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-neutral-500 mr-2" />
                        <span className="text-sm font-medium">Delivery Time</span>
                      </div>
                      <span className="text-sm font-bold">{method.time}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-neutral-500 mr-2" />
                        <span className="text-sm font-medium">Cost</span>
                      </div>
                      <span className="text-sm font-bold">{method.price}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Shipping Destinations */}
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
                  Shipping Destinations
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  We ship to all African countries with competitive rates and reliable service
                </p>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {shippingDestinations.map((destination, index) => (
                  <Card key={index} variant="default" padding="md" className="flex items-center">
                    <div className="text-3xl mr-3">{destination.flag}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                        {destination.country}
                      </h3>
                      <div className="flex justify-between text-sm text-neutral-500">
                        <span>{destination.time}</span>
                        <span>{destination.cost}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="text-center mt-8">
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Don't see your country? We ship to all 54 African countries.
                </p>
                <Button variant="outline">
                  View All Destinations
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Shipping Process */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Our Shipping Process
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                From order to delivery, we ensure a smooth and transparent shipping experience
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 dark:bg-blue-800"></div>
              
              <div className="space-y-12">
                {[
                  { title: 'Order Confirmation', description: 'Your order is confirmed and payment is processed securely', icon: <CheckCircle className="w-6 h-6" /> },
                  { title: 'Order Processing', description: 'Products are prepared and packaged with care by our verified suppliers', icon: <Package className="w-6 h-6" /> },
                  { title: 'Quality Inspection', description: 'Each order undergoes thorough quality checks before shipping', icon: <Shield className="w-6 h-6" /> },
                  { title: 'Shipping', description: 'Your package is handed over to our trusted shipping partners', icon: <Truck className="w-6 h-6" /> },
                  { title: 'Customs Clearance', description: 'We handle all necessary documentation for smooth customs clearance', icon: <Globe className="w-6 h-6" /> },
                  { title: 'Delivery', description: 'Your package is delivered to your doorstep', icon: <MapPin className="w-6 h-6" /> }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                      <Card variant="default" padding="lg">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          {step.description}
                        </p>
                      </Card>
                    </div>
                    
                    <div className="relative z-10 w-10 h-10 bg-blue-600 rounded-full border-4 border-white dark:border-neutral-900 flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                    
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Shipping Policies */}
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
                  Shipping Policies
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Important information about our shipping terms and conditions
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                      Shipping Restrictions
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      Some products may be subject to import restrictions or regulations in certain countries. We'll notify you if your order contains any restricted items.
                    </p>
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                      <li className="flex items-start">
                        <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center mr-2 flex-shrink-0">•</span>
                        <span>Hazardous materials and dangerous goods</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center mr-2 flex-shrink-0">•</span>
                        <span>Products prohibited by local laws and regulations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center mr-2 flex-shrink-0">•</span>
                        <span>Items exceeding weight or dimension limits</span>
                      </li>
                    </ul>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                      <Shield className="w-5 h-5 text-green-500 mr-2" />
                      Shipping Insurance
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      All orders are automatically insured against loss or damage during transit. Additional insurance options are available during checkout.
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                        <span className="text-sm font-medium">Standard Insurance</span>
                        <span className="text-sm">Up to $100</span>
                      </div>
                      <div className="flex justify-between p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                        <span className="text-sm font-medium">Premium Insurance</span>
                        <span className="text-sm">Up to $500</span>
                      </div>
                      <div className="flex justify-between p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                        <span className="text-sm font-medium">Full Coverage</span>
                        <span className="text-sm">Full order value</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 text-blue-500 mr-2" />
                      Customs & Duties
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      Import duties, taxes, and customs clearance fees may apply to international shipments. These charges are the responsibility of the recipient and are not included in the shipping cost.
                    </p>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 rounded-lg text-sm">
                      <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                        <p>
                          Customs policies vary widely by country. We recommend contacting your local customs office for more information on potential charges.
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                      <Clock className="w-5 h-5 text-purple-500 mr-2" />
                      Delivery Timeframes
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      Delivery times are estimates and may vary based on factors such as customs processing, local delivery conditions, and unforeseen events.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          <span className="font-medium">Order Processing:</span> 1-2 business days
                        </p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          <span className="font-medium">Transit Time:</span> Depends on shipping method and destination
                        </p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          <span className="font-medium">Customs Clearance:</span> Typically 1-3 business days
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Find answers to common shipping questions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg flex-shrink-0">
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

            <motion.div variants={itemVariants} className="text-center mt-8">
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Still have questions about shipping?
              </p>
              <Button 
                variant="primary" 
                onClick={() => window.location.hash = 'contact'}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Contact Our Support Team
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default ShippingInfoPage;