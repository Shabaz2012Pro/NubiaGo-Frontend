import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Clock, 
  Globe, 
  Package, 
  AlertCircle, 
  CheckCircle, 
  MapPin,
  DollarSign,
  FileText,
  ShieldCheck
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const ShippingInfoPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Shipping Information', current: true }
  ];

  const shippingMethods = [
    {
      name: 'Standard Shipping',
      description: 'Economical shipping option for non-urgent deliveries',
      time: '7-14 business days',
      price: 'From $15',
      icon: <Truck className="w-8 h-8" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      name: 'Express Shipping',
      description: 'Faster delivery for more urgent orders',
      time: '3-7 business days',
      price: 'From $30',
      icon: <Clock className="w-8 h-8" />,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      name: 'Premium Shipping',
      description: 'Our fastest shipping option with priority handling',
      time: '1-3 business days',
      price: 'From $50',
      icon: <Package className="w-8 h-8" />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    }
  ];

  const africanCountries = [
    { name: 'Nigeria', time: '5-10 days', cost: '$25-45' },
    { name: 'South Africa', time: '6-12 days', cost: '$30-55' },
    { name: 'Kenya', time: '7-12 days', cost: '$28-50' },
    { name: 'Ghana', time: '5-10 days', cost: '$25-45' },
    { name: 'Egypt', time: '4-9 days', cost: '$20-40' },
    { name: 'Morocco', time: '4-9 days', cost: '$20-40' },
    { name: 'Ethiopia', time: '8-14 days', cost: '$35-60' },
    { name: 'Tanzania', time: '8-14 days', cost: '$35-60' },
    { name: 'Uganda', time: '8-14 days', cost: '$35-60' },
    { name: 'Ivory Coast', time: '7-12 days', cost: '$30-55' },
    { name: 'Cameroon', time: '7-12 days', cost: '$30-55' },
    { name: 'Senegal', time: '7-12 days', cost: '$30-55' }
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
      question: 'Are there any import duties or taxes?',
      answer: 'Import duties and taxes are not included in the product price or shipping cost. These charges are the buyer\'s responsibility and will be collected by the shipping carrier or customs office.'
    },
    {
      question: 'What happens if my package is lost or damaged?',
      answer: 'If your package is lost or damaged during transit, please contact our customer support team within 48 hours of the expected delivery date. We\'ll work with the shipping carrier to locate your package or process a replacement/refund.'
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
                Shipping Information
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">Fast & Reliable Shipping</h1>
              
              <p className="text-xl text-blue-100 mb-6">
                We deliver premium Turkish products to all African countries with transparent shipping options and reliable tracking.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">54 African Countries</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Fast Delivery</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                  <Package className="w-4 h-4" />
                  <span className="text-sm">Real-time Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shipping Methods */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Shipping Methods
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Choose the shipping option that best fits your needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shippingMethods.map((method, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={clsx('p-4 rounded-lg', method.bgColor)}>
                        <div className={method.color}>{method.icon}</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {method.name}
                        </h3>
                        <Badge variant="primary" size="sm">{method.time}</Badge>
                      </div>
                    </div>
                    
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      {method.description}
                    </p>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-center pt-4 border-t border-neutral-200 dark:border-neutral-700">
                        <span className="text-sm text-neutral-500">Starting from</span>
                        <span className="font-bold text-neutral-900 dark:text-neutral-100">{method.price}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Shipping to African Countries */}
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
                  Shipping to African Countries
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Estimated delivery times and costs for popular destinations
                </p>
              </motion.div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow">
                  <thead className="bg-neutral-100 dark:bg-neutral-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        Country
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        Delivery Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        Shipping Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                    {africanCountries.map((country, index) => (
                      <tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-neutral-400" />
                            <span className="font-medium text-neutral-900 dark:text-neutral-100">{country.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-neutral-600 dark:text-neutral-400">
                          {country.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-neutral-600 dark:text-neutral-400">
                          {country.cost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <motion.div variants={itemVariants} className="text-center mt-8">
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  For other countries or specific shipping inquiries, please contact our customer support.
                </p>
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
                From order to delivery, we ensure a smooth shipping experience
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 dark:bg-blue-800"></div>
              
              <div className="space-y-12">
                {[
                  { title: 'Order Processing', description: 'Your order is verified and prepared for shipping within 24-48 hours' },
                  { title: 'Quality Inspection', description: 'Each product undergoes thorough quality checks before packaging' },
                  { title: 'Packaging', description: 'Items are carefully packaged to ensure safe transit' },
                  { title: 'Shipping', description: 'Your package is handed over to our shipping partners' },
                  { title: 'Customs Clearance', description: 'We handle documentation for smooth customs processing' },
                  { title: 'Delivery', description: 'Your package is delivered to your specified address' }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative"
                  >
                    <div className="flex items-center">
                      <div className={clsx(
                        "w-1/2",
                        index % 2 === 0 ? "pr-12 text-right" : "order-2 pl-12"
                      )}>
                        <Card variant="default" padding="lg">
                          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                            {step.title}
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {step.description}
                          </p>
                        </Card>
                      </div>
                      
                      <div className="relative z-10 w-10 h-10 bg-blue-600 rounded-full border-4 border-white dark:border-neutral-900 flex items-center justify-center text-white">
                        <span className="font-bold">{index + 1}</span>
                      </div>
                      
                      <div className={clsx(
                        "w-1/2",
                        index % 2 === 0 ? "order-2 pl-12" : "pr-12"
                      )}></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Shipping FAQs */}
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
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Common questions about our shipping process
                </p>
              </motion.div>

              <div className="max-w-3xl mx-auto">
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card variant="default" padding="lg">
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-start">
                          <QuestionIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{faq.question}</span>
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 pl-7">
                          {faq.answer}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Shipping Policies */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      Shipping Restrictions
                    </h3>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Some products may be subject to shipping restrictions due to their nature or local regulations. These include:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
                    <li>Hazardous materials</li>
                    <li>Certain electronics with lithium batteries</li>
                    <li>Products exceeding weight or dimension limits</li>
                    <li>Items prohibited by destination country regulations</li>
                  </ul>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      Customs & Duties
                    </h3>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    International shipments may be subject to import duties and taxes imposed by the destination country. These charges are the responsibility of the recipient and are not included in our shipping fees.
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    We provide accurate customs documentation to facilitate smooth clearance, but cannot guarantee or predict customs processing times or fees.
                  </p>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      Shipping Insurance
                    </h3>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    All shipments include basic insurance coverage up to $100. For higher-value orders, we recommend purchasing additional shipping insurance during checkout.
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Insurance covers loss or damage during transit but does not cover customs seizures, delays, or damage due to improper packaging returns.
                  </p>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <ShieldCheck className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      Delivery Guarantee
                    </h3>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    We strive to deliver all orders within the estimated timeframe. If your order is significantly delayed beyond our control, we'll work with you to find a resolution, which may include:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
                    <li>Expedited replacement shipping</li>
                    <li>Partial or full refund of shipping costs</li>
                    <li>Store credit for future purchases</li>
                  </ul>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

// Custom Question Icon
const QuestionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div className={clsx("rounded-full flex items-center justify-center", className)}>
    <span className="font-semibold">Q</span>
  </div>
);

export default ShippingInfoPage;