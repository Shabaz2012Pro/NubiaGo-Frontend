import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  Book,
  Video,
  FileText,
  Users,
  Shield,
  CreditCard,
  Truck,
  Package,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import { clsx } from 'clsx';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  articles: number;
}

const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const helpCategories: HelpCategory[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of using NubiaGO marketplace',
      icon: <Book className="w-6 h-6" />,
      color: 'text-blue-500',
      articles: 12
    },
    {
      id: 'orders',
      title: 'Orders & Payments',
      description: 'Managing orders, payments, and transactions',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'text-green-500',
      articles: 18
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      description: 'Shipping options, tracking, and delivery information',
      icon: <Truck className="w-6 h-6" />,
      color: 'text-purple-500',
      articles: 15
    },
    {
      id: 'suppliers',
      title: 'Working with Suppliers',
      description: 'How to connect and work with Turkish suppliers',
      icon: <Users className="w-6 h-6" />,
      color: 'text-orange-500',
      articles: 10
    },
    {
      id: 'account',
      title: 'Account & Security',
      description: 'Account management and security settings',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-red-500',
      articles: 8
    },
    {
      id: 'products',
      title: 'Products & Quality',
      description: 'Product information, quality assurance, and returns',
      icon: <Package className="w-6 h-6" />,
      color: 'text-indigo-500',
      articles: 14
    }
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I create an account on NubiaGO?',
      answer: 'Creating an account is simple! Click the "Sign Up" button in the top right corner, enter your email address, create a password, and verify your email. You can also sign up during checkout as a guest and convert to a full account later.',
      category: 'getting-started',
      helpful: 45
    },
    {
      id: '2',
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards (Visa, Mastercard, American Express), PayPal, bank transfers, and mobile money payments for African customers. All payments are processed securely through our encrypted payment system.',
      category: 'orders',
      helpful: 38
    },
    {
      id: '3',
      question: 'How long does shipping to Africa take?',
      answer: 'Shipping times vary by destination and shipping method. Standard shipping typically takes 7-14 business days, while express shipping takes 3-7 business days. We provide tracking information for all shipments.',
      category: 'shipping',
      helpful: 52
    },
    {
      id: '4',
      question: 'Are all suppliers verified?',
      answer: 'Yes! All suppliers on NubiaGO go through a rigorous verification process. We check business licenses, quality certifications, production capabilities, and conduct on-site inspections when necessary.',
      category: 'suppliers',
      helpful: 67
    },
    {
      id: '5',
      question: 'Can I negotiate prices with suppliers?',
      answer: 'Absolutely! Our platform includes a built-in price negotiation system for bulk orders. You can submit custom quotes and negotiate terms directly with suppliers through our secure messaging system.',
      category: 'suppliers',
      helpful: 41
    },
    {
      id: '6',
      question: 'What if I receive a damaged product?',
      answer: 'We have a comprehensive quality guarantee. If you receive a damaged product, contact our support team within 7 days with photos. We\'ll work with the supplier to resolve the issue through replacement, refund, or credit.',
      category: 'products',
      helpful: 29
    },
    {
      id: '7',
      question: 'How do I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email and SMS. You can track your package in real-time through your account dashboard or our mobile app.',
      category: 'shipping',
      helpful: 33
    },
    {
      id: '8',
      question: 'Is my personal information secure?',
      answer: 'Yes, we use enterprise-grade security measures including SSL encryption, secure data centers, and comply with international privacy standards. Your personal and payment information is always protected.',
      category: 'account',
      helpful: 22
    }
  ];

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: <MessageCircle className="w-8 h-8" />,
      availability: 'Available 24/7',
      color: 'text-blue-500',
      action: 'Start Chat'
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      icon: <Phone className="w-8 h-8" />,
      availability: 'Mon-Fri 9AM-6PM GMT',
      color: 'text-green-500',
      action: 'Call Now'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: <Mail className="w-8 h-8" />,
      availability: 'Response within 2 hours',
      color: 'text-purple-500',
      action: 'Send Email'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: <Video className="w-8 h-8" />,
      availability: 'Available anytime',
      color: 'text-orange-500',
      action: 'Watch Now'
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

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <HelpCircle className="w-16 h-16 mx-auto mb-6 text-blue-200" />
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
                How Can We Help?
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Find answers to your questions, get support, and learn how to make the most of NubiaGo marketplace
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <Input
                  placeholder="Search for help articles, FAQs, or topics..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                  leftIcon={<Search className="w-5 h-5" />}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-blue-200"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Browse Help Topics
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Find the information you need organized by topic
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {helpCategories.map((category) => (
                <motion.div key={category.id} variants={itemVariants}>
                  <Card 
                    variant="default" 
                    padding="lg" 
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 h-full"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="text-center">
                      <div className={`${category.color} mb-4 flex justify-center`}>
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                        {category.description}
                      </p>
                      <Badge variant="primary" size="sm">
                        {category.articles} articles
                      </Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Support Options */}
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Get Support
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Choose the support option that works best for you
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {supportOptions.map((option, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="text-center h-full">
                    <div className={`${option.color} mb-4 flex justify-center`}>
                      {option.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                      {option.description}
                    </p>
                    <div className="flex items-center justify-center space-x-1 text-sm text-neutral-500 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{option.availability}</span>
                    </div>
                    <Button variant="outline" size="sm" fullWidth>
                      {option.action}
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                Quick answers to common questions
              </p>
            </motion.div>

            {/* Category Filter */}
            <div className="mb-8">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full max-w-xs mx-auto block px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"
              >
                <option value="all">All Categories</option>
                {helpCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            {/* FAQ List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredFAQs.map((faq) => (
                <motion.div key={faq.id} variants={itemVariants}>
                  <Card variant="outlined" padding="sm" className="overflow-hidden">
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
                                  <Button variant="ghost" size="sm">
                                    👍 Yes
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    👎 No
                                  </Button>
                                </div>
                                <div className="flex items-center space-x-1 text-sm text-neutral-500">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span>{faq.helpful} found this helpful</span>
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
            </motion.div>

            {/* No Results */}
            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  No results found
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Try adjusting your search or browse different categories
                </p>
                <Button variant="primary" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Still Need Help CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Still Need Help?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Our support team is here to help you succeed. Get in touch and we'll resolve your questions quickly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-neutral-100"
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                >
                  Start Live Chat
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  leftIcon={<Mail className="w-5 h-5" />}
                >
                  Send Email
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HelpPage;