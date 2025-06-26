import React from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, 
  DollarSign, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Package,
  ShieldCheck,
  MessageSquare,
  HelpCircle,
  ArrowLeft,
  Truck
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const ReturnsRefundsPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Returns & Refunds', current: true }
  ];

  const returnPolicies = [
    {
      title: '30-Day Return Window',
      description: 'You have 30 days from the delivery date to initiate a return for most products.',
      icon: <Clock className="w-6 h-6" />,
      color: 'text-blue-500'
    },
    {
      title: 'Quality Guarantee',
      description: 'If your product arrives damaged or defective, we\'ll replace it or provide a full refund.',
      icon: <ShieldCheck className="w-6 h-6" />,
      color: 'text-green-500'
    },
    {
      title: 'Easy Return Process',
      description: 'Our streamlined return process makes it simple to return items that don\'t meet your expectations.',
      icon: <RefreshCw className="w-6 h-6" />,
      color: 'text-purple-500'
    },
    {
      title: 'Fast Refunds',
      description: 'Once your return is approved, we process refunds within 5-7 business days.',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-gold-500'
    }
  ];

  const returnSteps = [
    {
      title: 'Initiate Return',
      description: 'Log in to your account, find the order, and select "Return Items". Specify the reason for your return.',
      icon: <ArrowLeft className="w-6 h-6" />
    },
    {
      title: 'Package Items',
      description: 'Pack the items in their original packaging with all accessories and documentation.',
      icon: <Package className="w-6 h-6" />
    },
    {
      title: 'Ship Return',
      description: 'Use the provided return label or ship to the address provided in the return confirmation.',
      icon: <Truck className="w-6 h-6" />
    },
    {
      title: 'Refund Processing',
      description: 'Once we receive and inspect your return, we\'ll process your refund to your original payment method.',
      icon: <DollarSign className="w-6 h-6" />
    }
  ];

  const nonReturnableItems = [
    'Customized or personalized products',
    'Digital products and downloadable software',
    'Perishable goods (food, beverages, etc.)',
    'Health and personal care items (for hygiene reasons)',
    'Products with broken seals or missing packaging',
    'Items marked as final sale or clearance'
  ];

  const faqs = [
    {
      question: 'How long does it take to process my refund?',
      answer: 'Once we receive your return, it typically takes 1-2 business days to inspect and process. After approval, refunds are issued within 5-7 business days, though it may take longer for the funds to appear in your account depending on your payment method and financial institution.'
    },
    {
      question: 'Do I have to pay for return shipping?',
      answer: 'For returns due to our error (damaged, defective, or incorrect items), return shipping is free. For returns due to preference or fit, the customer is responsible for return shipping costs unless otherwise stated in a promotion or policy exception.'
    },
    {
      question: 'Can I exchange an item instead of returning it?',
      answer: 'Yes, you can request an exchange for a different size, color, or even a different product of equal value. Initiate the exchange through your account dashboard or by contacting customer support.'
    },
    {
      question: 'What if my item arrives damaged?',
      answer: 'If your item arrives damaged, please take photos of the damage and contact our customer support team within 48 hours of delivery. We\'ll arrange for a replacement or refund and provide instructions for returning the damaged item at no cost to you.'
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
        <section className="bg-gradient-to-r from-green-600 to-green-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <RefreshCw className="w-4 h-4 mr-2" />
                Hassle-Free Returns
              </Badge>

              <h1 className="text-4xl font-bold mb-4">Returns & Refunds</h1>

              <p className="text-xl text-green-100 mb-6">
                We stand behind the quality of our products. If you're not completely satisfied, we make returns and refunds simple and straightforward.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="secondary" 
                  className="bg-white text-green-600 hover:bg-neutral-100"
                  onClick={() => window.location.hash = 'dashboard'}
                >
                  Initiate a Return
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => window.location.hash = 'contact'}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Return Policies */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Our Return Policy
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Customer satisfaction is our priority. Our return policy is designed to be fair and transparent.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {returnPolicies.map((policy, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className={`${policy.color} mb-6 flex justify-center`}>
                      {policy.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 text-center">
                      {policy.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-center">
                      {policy.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Return Process */}
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
                  Return Process
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Follow these simple steps to return your items
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {returnSteps.map((step, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg" className="h-full">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                        <span className="text-xl font-bold">{index + 1}</span>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          {step.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="mt-12 text-center">
                <Card variant="default" padding="lg" className="max-w-3xl mx-auto">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 rounded-lg flex-shrink-0">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Important Return Information
                      </h3>
                      <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Returns must be initiated within 30 days of delivery</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Items must be unused, undamaged, and in original packaging</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Include all accessories, manuals, and free gifts that came with the product</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Provide your order number and reason for return</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Non-Returnable Items */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Non-Returnable Items
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                For hygiene, safety, and other reasons, the following items cannot be returned
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nonReturnableItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <div className="w-6 h-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600">
                        <span className="text-xs">✕</span>
                      </div>
                      <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      If you're unsure whether an item can be returned, please contact our customer support team before making a purchase or initiating a return.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Refund Information */}
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
                  Refund Information
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Understanding how and when you'll receive your refund
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 text-green-500 mr-2" />
                      Refund Methods
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      Refunds are processed to the original payment method used for the purchase. Alternative refund methods may be available upon request.
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                        <span className="text-sm font-medium">Credit/Debit Card</span>
                        <span className="text-sm">5-7 business days</span>
                      </div>
                      <div className="flex justify-between p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                        <span className="text-sm font-medium">PayPal</span>
                        <span className="text-sm">3-5 business days</span>
                      </div>
                      <div className="flex justify-between p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                        <span className="text-sm font-medium">Bank Transfer</span>
                        <span className="text-sm">7-10 business days</span>
                      </div>
                      <div className="flex justify-between p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                        <span className="text-sm font-medium">Store Credit</span>
                        <span className="text-sm">Immediate</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                      <Clock className="w-5 h-5 text-blue-500 mr-2" />
                      Refund Timeline
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      The complete refund process typically takes 7-14 days from when we receive your return. Here's what to expect:
                    </p>
                    <div className="space-y-4">
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                          <span className="text-xs font-bold">1</span>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          <span className="font-medium text-neutral-900 dark:text-neutral-100">Return Received:</span> 1-2 business days for inspection
                        </p>
                      </div>
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                          <span className="text-xs font-bold">2</span>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          <span className="font-medium text-neutral-900 dark:text-neutral-100">Refund Approved:</span> 1 business day to process approval
                        </p>
                      </div>
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                          <span className="text-xs font-bold">3</span>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          <span className="font-medium text-neutral-900 dark:text-neutral-100">Refund Issued:</span> 5-7 business days for payment processor
                        </p>
                      </div>
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                          <span className="text-xs font-bold">4</span>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          <span className="font-medium text-neutral-900 dark:text-neutral-100">Funds Available:</span> 1-5 business days for bank processing
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
                Find answers to common questions about returns and refunds
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg flex-shrink-0">
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

            <motion.div variants={itemVariants} className="text-center mt-12">
              <Card variant="default" padding="lg" className="max-w-3xl mx-auto">
                <div className="flex items-center justify-center space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-full">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                      Need more help with returns or refunds?
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      Our customer support team is ready to assist you with any questions or concerns.
                    </p>
                    <Button 
                      variant="primary" 
                      onClick={() => window.location.hash = 'contact'}
                      className="bg-blue-600 hover:bg-blue-700"
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

export default ReturnsRefundsPage;