import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  MessageSquare,
  Phone,
  Mail,
  Package,
  CreditCard,
  Truck,
  RefreshCw,
  Shield,
  User,
  ShoppingCart,
  Tag,
  Globe,
  CheckCircle
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful?: number;
}

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [helpfulFAQs, setHelpfulFAQs] = useState<string[]>([]);

  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'FAQ', current: true }
  ];

  const faqCategories: FAQCategory[] = [
    {
      id: 'all',
      name: 'All Categories',
      icon: <HelpCircle className="w-6 h-6" />,
      description: 'Browse all frequently asked questions'
    },
    {
      id: 'account',
      name: 'Account & Security',
      icon: <User className="w-6 h-6" />,
      description: 'Questions about your account, login, and security'
    },
    {
      id: 'orders',
      name: 'Orders & Payments',
      icon: <ShoppingCart className="w-6 h-6" />,
      description: 'Help with orders, payments, and transactions'
    },
    {
      id: 'shipping',
      name: 'Shipping & Delivery',
      icon: <Truck className="w-6 h-6" />,
      description: 'Information about shipping, tracking, and delivery'
    },
    {
      id: 'returns',
      name: 'Returns & Refunds',
      icon: <RefreshCw className="w-6 h-6" />,
      description: 'Questions about returns, exchanges, and refunds'
    },
    {
      id: 'products',
      name: 'Products & Quality',
      icon: <Package className="w-6 h-6" />,
      description: 'Information about product quality, specifications, and care'
    },
    {
      id: 'suppliers',
      name: 'Suppliers & Sourcing',
      icon: <Globe className="w-6 h-6" />,
      description: 'Questions about our suppliers and sourcing practices'
    }
  ];

  const faqs: FAQ[] = [
    // Account & Security
    {
      id: 'account-1',
      question: 'How do I create an account on NubiaGo?',
      answer: 'Creating an account is simple! Click the "Sign Up" button in the top right corner, enter your email address, create a password, and verify your email. You can also sign up during checkout as a guest and convert to a full account later.',
      category: 'account',
      helpful: 45
    },
    {
      id: 'account-2',
      question: 'How can I reset my password?',
      answer: 'To reset your password, click on "Sign In" in the top right corner, then click "Forgot Password". Enter your email address, and we\'ll send you a link to reset your password. Follow the instructions in the email to create a new password.',
      category: 'account',
      helpful: 38
    },
    {
      id: 'account-3',
      question: 'Is my personal information secure?',
      answer: 'Yes, we use enterprise-grade security measures including SSL encryption, secure data centers, and comply with international privacy standards. Your personal and payment information is always protected.',
      category: 'account',
      helpful: 22
    },
    {
      id: 'account-4',
      question: 'Can I have multiple shipping addresses in my account?',
      answer: 'Yes, you can save multiple shipping addresses in your account. Go to your account settings, select "Addresses", and click "Add New Address". You can set one address as your default shipping address.',
      category: 'account',
      helpful: 15
    },
    
    // Orders & Payments
    {
      id: 'orders-1',
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards (Visa, Mastercard, American Express), PayPal, bank transfers, and mobile money payments for African customers. All payments are processed securely through our encrypted payment system.',
      category: 'orders',
      helpful: 56
    },
    {
      id: 'orders-2',
      question: 'How can I check the status of my order?',
      answer: 'You can check your order status by logging into your account and going to "Order History". Each order will show its current status. You can also track your shipment using the tracking number provided in your shipping confirmation email.',
      category: 'orders',
      helpful: 42
    },
    {
      id: 'orders-3',
      question: 'Can I modify or cancel my order after it\'s placed?',
      answer: 'You may be able to modify or cancel your order if it hasn\'t been processed yet. Please contact our customer support team immediately with your order number. Once an order has been processed or shipped, it cannot be modified or canceled.',
      category: 'orders',
      helpful: 37
    },
    {
      id: 'orders-4',
      question: 'Is it possible to place bulk orders?',
      answer: 'Yes, we welcome bulk orders! For large quantity purchases, you can use our bulk order feature or contact our business sales team for personalized assistance and potential volume discounts.',
      category: 'orders',
      helpful: 29
    },
    
    // Shipping & Delivery
    {
      id: 'shipping-1',
      question: 'How long does shipping to Africa take?',
      answer: 'Shipping times vary by destination and shipping method. Standard shipping typically takes 7-14 business days, while express shipping takes 3-7 business days. We provide tracking information for all shipments.',
      category: 'shipping',
      helpful: 52
    },
    {
      id: 'shipping-2',
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email and SMS. You can track your package in real-time through your account dashboard or our mobile app.',
      category: 'shipping',
      helpful: 33
    },
    {
      id: 'shipping-3',
      question: 'Do you ship to all African countries?',
      answer: 'Yes, we ship to all 54 African countries. Shipping times and costs vary by destination. You can see estimated shipping times and costs for your country during checkout.',
      category: 'shipping',
      helpful: 28
    },
    {
      id: 'shipping-4',
      question: 'What if my package is delayed?',
      answer: 'If your package is delayed beyond the estimated delivery timeframe, please contact our customer support team. We\'ll investigate the status with the shipping carrier and provide you with updated information.',
      category: 'shipping',
      helpful: 25
    },
    
    // Returns & Refunds
    {
      id: 'returns-1',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be in their original condition with all tags and packaging. Some items, such as personalized products or perishable goods, are not eligible for return. Please see our Returns & Refunds page for complete details.',
      category: 'returns',
      helpful: 48
    },
    {
      id: 'returns-2',
      question: 'How do I initiate a return?',
      answer: 'To initiate a return, log in to your account, go to "Order History", find the order containing the item you want to return, and click "Return Items". Follow the instructions to complete the return process.',
      category: 'returns',
      helpful: 36
    },
    {
      id: 'returns-3',
      question: 'How long does it take to process my refund?',
      answer: 'Once we receive your return, it typically takes 1-2 business days to inspect and process. After approval, refunds are issued within 5-7 business days, though it may take longer for the funds to appear in your account depending on your payment method and financial institution.',
      category: 'returns',
      helpful: 31
    },
    {
      id: 'returns-4',
      question: 'What if I receive a damaged product?',
      answer: 'If you receive a damaged product, please contact our customer support team within 48 hours of delivery with photos of the damage. We\'ll arrange for a replacement or refund and provide instructions for returning the damaged item at no cost to you.',
      category: 'returns',
      helpful: 29
    },
    
    // Products & Quality
    {
      id: 'products-1',
      question: 'Are all products authentic and genuine?',
      answer: 'Yes, all products on NubiaGo are authentic and sourced directly from verified Turkish suppliers. We have a rigorous supplier verification process and quality control measures to ensure the authenticity and quality of all products.',
      category: 'products',
      helpful: 67
    },
    {
      id: 'products-2',
      question: 'How can I find the right size for clothing or shoes?',
      answer: 'Each product page includes detailed size information and measurement charts. You can also refer to our comprehensive Size Guide for general sizing information and conversion charts between US, EU, and Turkish sizes.',
      category: 'products',
      helpful: 43
    },
    {
      id: 'products-3',
      question: 'What if the product description doesn\'t match the actual product?',
      answer: 'We strive for accuracy in all product descriptions. If you receive a product that significantly differs from its description, please contact our customer support team with details and photos. We\'ll resolve the issue with a replacement, return, or other appropriate solution.',
      category: 'products',
      helpful: 35
    },
    {
      id: 'products-4',
      question: 'Do you offer product warranties?',
      answer: 'Many products come with manufacturer warranties. Warranty information, if applicable, is listed on the product page. Additionally, all products are covered by our quality guarantee, ensuring they arrive in perfect condition and as described.',
      category: 'products',
      helpful: 27
    },
    
    // Suppliers & Sourcing
    {
      id: 'suppliers-1',
      question: 'Are all suppliers verified?',
      answer: 'Yes! All suppliers on NubiaGo go through a rigorous verification process. We check business licenses, quality certifications, production capabilities, and conduct on-site inspections when necessary.',
      category: 'suppliers',
      helpful: 67
    },
    {
      id: 'suppliers-2',
      question: 'Can I negotiate prices with suppliers?',
      answer: 'Absolutely! Our platform includes a built-in price negotiation system for bulk orders. You can submit custom quotes and negotiate terms directly with suppliers through our secure messaging system.',
      category: 'suppliers',
      helpful: 41
    },
    {
      id: 'suppliers-3',
      question: 'How do you ensure product quality from suppliers?',
      answer: 'We have a comprehensive quality assurance process that includes supplier verification, product sampling, quality inspections, and customer feedback monitoring. We only work with suppliers who consistently meet our high-quality standards.',
      category: 'suppliers',
      helpful: 38
    },
    {
      id: 'suppliers-4',
      question: 'Can I become a supplier on NubiaGo?',
      answer: 'Yes, if you\'re a Turkish manufacturer or supplier interested in reaching African markets, you can apply to become a supplier. Visit our "Become a Supplier" page to learn about our requirements and application process.',
      category: 'suppliers',
      helpful: 32
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const markAsHelpful = (id: string) => {
    if (!helpfulFAQs.includes(id)) {
      setHelpfulFAQs([...helpfulFAQs, id]);
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
        <section className="bg-gradient-to-r from-orange-600 to-orange-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <HelpCircle className="w-4 h-4 mr-2" />
                Frequently Asked Questions
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">How Can We Help?</h1>
              
              <p className="text-xl text-orange-100 mb-8">
                Find answers to common questions about NubiaGo marketplace, orders, shipping, and more.
              </p>
              
              <div className="max-w-2xl mx-auto">
                <Input
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                  leftIcon={<Search className="w-5 h-5" />}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-orange-200"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {faqCategories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Card 
                  variant="default" 
                  padding="md" 
                  className={clsx(
                    "cursor-pointer hover:shadow-md transition-all h-full",
                    selectedCategory === category.id && "border-orange-500 bg-orange-50 dark:bg-orange-900/10"
                  )}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={clsx(
                      "p-2 rounded-lg",
                      selectedCategory === category.id 
                        ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600" 
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                    )}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className={clsx(
                        "font-medium",
                        selectedCategory === category.id 
                          ? "text-orange-700 dark:text-orange-400" 
                          : "text-neutral-900 dark:text-neutral-100"
                      )}>
                        {category.name}
                      </h3>
                      {category.id !== 'all' && (
                        <p className="text-xs text-neutral-500">
                          {faqs.filter(faq => faq.category === category.id).length} articles
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* FAQ List */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <motion.div key={faq.id} variants={itemVariants}>
                    <Card variant="default" padding="sm" className="overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 pr-4">
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5 text-neutral-500" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {expandedFAQ === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 border-t border-neutral-200 dark:border-neutral-700">
                              <div className="pt-4">
                                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                                  {faq.answer}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2 text-sm text-neutral-500">
                                    <span>Was this helpful?</span>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        markAsHelpful(faq.id);
                                      }}
                                      className={helpfulFAQs.includes(faq.id) ? "text-green-600" : ""}
                                    >
                                      {helpfulFAQs.includes(faq.id) ? (
                                        <>
                                          <CheckCircle className="w-4 h-4 mr-1" /> Helpful
                                        </>
                                      ) : (
                                        "👍 Yes"
                                      )}
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      👎 No
                                    </Button>
                                  </div>
                                  <div className="flex items-center space-x-1 text-sm text-neutral-500">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>{faq.helpful + (helpfulFAQs.includes(faq.id) ? 1 : 0)} found this helpful</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div variants={itemVariants} className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  No results found
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  We couldn't find any FAQs matching your search. Try adjusting your search terms or browse different categories.
                </p>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Clear Search
                </Button>
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* Contact Options */}
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
                  Still Have Questions?
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Our support team is here to help you with any questions or concerns
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Live Chat',
                    description: 'Chat with our support team in real-time',
                    icon: <MessageSquare className="w-8 h-8" />,
                    availability: 'Available 24/7',
                    action: 'Start Chat',
                    link: '#contact',
                    color: 'text-orange-500'
                  },
                  {
                    title: 'Phone Support',
                    description: 'Speak directly with our experts',
                    icon: <Phone className="w-8 h-8" />,
                    availability: 'Mon-Fri 9AM-6PM GMT',
                    action: 'Call Now',
                    link: '#contact',
                    color: 'text-blue-500'
                  },
                  {
                    title: 'Email Support',
                    description: 'Send us a detailed message',
                    icon: <Mail className="w-8 h-8" />,
                    availability: 'Response within 2 hours',
                    action: 'Send Email',
                    link: '#contact',
                    color: 'text-green-500'
                  }
                ].map((option, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg" className="h-full">
                      <div className={`${option.color} mb-4 flex justify-center`}>
                        {option.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 text-center">
                        {option.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-3 text-center">
                        {option.description}
                      </p>
                      <div className="flex items-center justify-center space-x-1 text-sm text-neutral-500 mb-4">
                        <Clock className="w-4 h-4" />
                        <span>{option.availability}</span>
                      </div>
                      <div className="flex justify-center">
                        <Button 
                          variant="primary" 
                          onClick={() => window.location.hash = option.link.substring(1)}
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          {option.action}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Popular Topics */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Popular Topics
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Quick links to our most frequently viewed help topics
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Order Tracking', icon: <Package className="w-6 h-6" />, link: '#track-order' },
                { name: 'Payment Methods', icon: <CreditCard className="w-6 h-6" />, link: '#help' },
                { name: 'Shipping Policy', icon: <Truck className="w-6 h-6" />, link: '#shipping-info' },
                { name: 'Returns Process', icon: <RefreshCw className="w-6 h-6" />, link: '#returns-refunds' },
                { name: 'Account Security', icon: <Shield className="w-6 h-6" />, link: '#help' },
                { name: 'Pricing & Discounts', icon: <Tag className="w-6 h-6" />, link: '#help' }
              ].map((topic, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card 
                    variant="default" 
                    padding="md" 
                    className="text-center cursor-pointer hover:shadow-md transition-all h-full"
                    onClick={() => window.location.hash = topic.link.substring(1)}
                  >
                    <div className="text-orange-500 mb-3 flex justify-center">
                      {topic.icon}
                    </div>
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                      {topic.name}
                    </h3>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default FAQPage;