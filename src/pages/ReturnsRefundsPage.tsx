import React from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Package,
  ArrowLeft,
  FileText,
  Truck,
  ShieldCheck,
  HelpCircle
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

  const returnSteps = [
    {
      title: 'Request a Return',
      description: 'Log in to your account, go to "Order History", find your order, and click "Return Items"',
      icon: <Package className="w-8 h-8" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      title: 'Return Approval',
      description: 'We\'ll review your return request within 24-48 hours and send you return instructions',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      title: 'Ship the Items Back',
      description: 'Package the items securely and ship them back using the provided return label',
      icon: <Truck className="w-8 h-8" />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    },
    {
      title: 'Refund Processing',
      description: 'Once we receive and inspect the items, we\'ll process your refund within 5-7 business days',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    }
  ];

  const returnPolicies = [
    {
      title: '30-Day Return Window',
      description: 'Most items can be returned within 30 days of delivery. Some categories may have different return windows.',
      icon: <Clock className="w-6 h-6" />,
      color: 'text-blue-600'
    },
    {
      title: 'Item Condition',
      description: 'Items must be unused, unworn, and in their original packaging with all tags and accessories.',
      icon: <Package className="w-6 h-6" />,
      color: 'text-green-600'
    },
    {
      title: 'Return Shipping',
      description: 'Return shipping costs are the buyer\'s responsibility unless the return is due to our error.',
      icon: <Truck className="w-6 h-6" />,
      color: 'text-orange-600'
    },
    {
      title: 'Refund Methods',
      description: 'Refunds are issued to the original payment method. Store credit may be offered as an alternative.',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-purple-600'
    }
  ];

  const nonReturnableItems = [
    'Personalized or custom-made items',
    'Digital products and downloadable software',
    'Gift cards and vouchers',
    'Perishable goods (food, flowers, etc.)',
    'Health and personal care items (for hygiene reasons)',
    'Items with broken seals on software, audio, or video products',
    'Items marked as final sale or clearance',
    'Hazardous materials or flammable liquids/gases'
  ];

  const faqs = [
    {
      question: 'How long does it take to process my refund?',
      answer: 'Once we receive your returned items and verify their condition, refunds are typically processed within 5-7 business days. The time it takes for the refund to appear in your account depends on your payment method and financial institution, usually an additional 3-10 business days.'
    },
    {
      question: 'Can I exchange an item instead of returning it?',
      answer: 'Yes, we offer exchanges for items of equal or lesser value. To request an exchange, follow the same process as a return but select "Exchange" instead of "Return" in your order history. If you\'re exchanging for an item of greater value, you\'ll need to pay the difference.'
    },
    {
      question: 'What if I received a defective or damaged item?',
      answer: 'If you receive a defective or damaged item, please contact our customer support team within 48 hours of delivery with photos of the damage. We\'ll arrange for a replacement or refund and provide instructions for returning the damaged item at no cost to you.'
    },
    {
      question: 'Do I need the original packaging to return an item?',
      answer: 'Yes, items should be returned in their original packaging with all tags, manuals, and accessories. If the original packaging is damaged or lost, please use appropriate packaging to ensure the item is protected during return shipping.'
    },
    {
      question: 'Can I return part of my order?',
      answer: 'Yes, you can return individual items from a multi-item order. Simply select the specific items you wish to return in the return process. The refund will be processed only for the returned items.'
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
        <section className="bg-gradient-to-r from-purple-600 to-purple-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <RefreshCw className="w-4 h-4 mr-2" />
                Returns & Refunds
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">Easy Returns Process</h1>
              
              <p className="text-xl text-purple-100 mb-6">
                We want you to be completely satisfied with your purchase. Learn about our hassle-free returns and refunds policy.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">30-Day Returns</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Money-Back Guarantee</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-sm">Buyer Protection</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Return Process */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                How to Return an Item
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Follow these simple steps to return your purchase
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {returnSteps.map((step, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="relative mb-6">
                      <div className={clsx('p-4 rounded-lg mx-auto w-16 h-16 flex items-center justify-center', step.bgColor)}>
                        <div className={step.color}>{step.icon}</div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-center">
                      {step.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Return Policy */}
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
                  Return Policy
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Our commitment to customer satisfaction
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {returnPolicies.map((policy, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg">
                      <div className="flex items-start space-x-4">
                        <div className={clsx('p-3 rounded-lg', policy.color.replace('text-', 'bg-') + '/10')}>
                          <div className={policy.color}>{policy.icon}</div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                            {policy.title}
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {policy.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Non-Returnable Items
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        The following items cannot be returned due to their nature or for hygiene/safety reasons:
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-14">
                    {nonReturnableItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Refund Information */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div variants={itemVariants} className="md:col-span-3">
                <Card variant="default" padding="lg">
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                    <div className="mb-6 md:mb-0 md:w-1/3">
                      <div className="p-6 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-16 h-16 text-purple-600" />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                        Refund Processing Timeline
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold">1</span>
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">Return Received (1-2 days)</p>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              Our warehouse receives and logs your returned items
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold">2</span>
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">Quality Inspection (1-3 days)</p>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              Items are inspected to ensure they meet return policy requirements
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold">3</span>
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">Refund Approval (1-2 days)</p>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              Refund is approved and processed to your original payment method
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold">4</span>
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">Bank Processing (3-10 days)</p>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              Your bank or payment provider processes the refund to your account
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
                        <p className="text-sm text-purple-700 dark:text-purple-300">
                          <strong>Total estimated time:</strong> 6-17 business days from when we receive your return until the refund appears in your account
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg" className="h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      Full Refunds
                    </h3>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    You'll receive a full refund of the product price and any applicable taxes when:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
                    <li>Items are returned in original, unused condition</li>
                    <li>All tags, packaging, and accessories are included</li>
                    <li>Return is initiated within the 30-day window</li>
                    <li>Items are not on the non-returnable list</li>
                  </ul>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg" className="h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      Partial Refunds
                    </h3>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Partial refunds may be issued when:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
                    <li>Items show signs of use or wear</li>
                    <li>Original packaging is damaged or missing</li>
                    <li>Parts or accessories are missing</li>
                    <li>Items have been opened (for certain categories)</li>
                    <li>Return is initiated after 30 days but within 45 days</li>
                  </ul>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg" className="h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      Refund Methods
                    </h3>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Refunds are processed back to the original payment method:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
                    <li>Credit/debit card refunds: 3-10 business days</li>
                    <li>PayPal refunds: 1-3 business days</li>
                    <li>Bank transfers: 5-10 business days</li>
                    <li>Mobile money: 1-5 business days</li>
                  </ul>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-4">
                    Store credit refunds are processed immediately and can be used right away.
                  </p>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>

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
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Common questions about returns and refunds
                </p>
              </motion.div>

              <div className="max-w-3xl mx-auto">
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card variant="default" padding="lg">
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-start">
                          <HelpCircle className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
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

              <motion.div variants={itemVariants} className="text-center mt-12">
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Still have questions about returns or refunds?
                </p>
                <Button
                  variant="primary"
                  onClick={() => window.location.hash = 'contact'}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Contact Support
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ReturnsRefundsPage;