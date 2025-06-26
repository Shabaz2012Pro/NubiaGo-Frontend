import React from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  Search, 
  Book, 
  MessageSquare, 
  Phone, 
  Mail, 
  Video, 
  FileText, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';
import Input from '../components/atoms/Input';
import Breadcrumb from '../components/molecules/Breadcrumb';

const HelpPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Help Center', current: true }
  ];

  const helpCategories = [
    {
      title: 'Getting Started',
      description: 'New to NubiaGo? Learn the basics',
      icon: <Book className="w-8 h-8" />,
      articles: [
        'Creating an account',
        'Browsing products',
        'Understanding product ratings',
        'Contacting suppliers'
      ],
      color: 'text-blue-500'
    },
    {
      title: 'Orders & Payments',
      description: 'Everything about your purchases',
      icon: <FileText className="w-8 h-8" />,
      articles: [
        'Placing an order',
        'Payment methods',
        'Order tracking',
        'Invoices and receipts'
      ],
      color: 'text-green-500'
    },
    {
      title: 'Shipping & Delivery',
      description: 'Track and manage your deliveries',
      icon: <Truck className="w-8 h-8" />,
      articles: [
        'Shipping methods',
        'Delivery timeframes',
        'Customs and duties',
        'Tracking your package'
      ],
      color: 'text-orange-500'
    },
    {
      title: 'Returns & Refunds',
      description: 'How to return items and get refunds',
      icon: <RefreshCw className="w-8 h-8" />,
      articles: [
        'Return policy',
        'Starting a return',
        'Refund process',
        'Return shipping'
      ],
      color: 'text-red-500'
    }
  ];

  const popularArticles = [
    {
      title: 'How to track your order',
      views: 12500,
      category: 'Shipping',
      updated: '2 days ago'
    },
    {
      title: 'Payment methods accepted',
      views: 9800,
      category: 'Payments',
      updated: '1 week ago'
    },
    {
      title: 'Return policy explained',
      views: 8700,
      category: 'Returns',
      updated: '3 days ago'
    },
    {
      title: 'How to contact a supplier',
      views: 7600,
      category: 'Suppliers',
      updated: '5 days ago'
    },
    {
      title: 'Shipping to African countries',
      views: 6900,
      category: 'Shipping',
      updated: '1 day ago'
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
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help Center
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">How Can We Help?</h1>
              
              <p className="text-xl text-blue-100 mb-8">
                Find answers, guides, and support for all your NubiaGo marketplace needs
              </p>
              
              <div className="max-w-2xl mx-auto">
                <Input
                  placeholder="Search for help articles..."
                  leftIcon={<Search className="w-5 h-5" />}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-blue-200"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {helpCategories.map((category, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card variant="default" padding="lg" className="h-full">
                  <div className={`${category.color} mb-6 flex justify-center`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 text-center">
                    {category.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-center mb-6">
                    {category.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {category.articles.map((article, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">{article}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      View All Articles
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Popular Articles */}
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
                  Popular Help Articles
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Quick answers to our most frequently asked questions
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularArticles.map((article, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg" className="h-full">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                            {article.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="primary" size="sm">{article.category}</Badge>
                            <span className="text-xs text-neutral-500">Updated {article.updated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-neutral-500">{article.views.toLocaleString()} views</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                          Read
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Need More Help?
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
                  link: '/contact',
                  color: 'text-blue-500'
                },
                {
                  title: 'Phone Support',
                  description: 'Speak directly with our experts',
                  icon: <Phone className="w-8 h-8" />,
                  availability: 'Mon-Fri 9AM-6PM GMT',
                  action: 'Call Now',
                  link: '/contact',
                  color: 'text-green-500'
                },
                {
                  title: 'Video Support',
                  description: 'Schedule a video call with our team',
                  icon: <Video className="w-8 h-8" />,
                  availability: 'By appointment',
                  action: 'Schedule Call',
                  link: '/contact',
                  color: 'text-purple-500'
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
                        onClick={() => window.location.hash = option.link}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {option.action}
                      </Button>
                    </div>
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

export default HelpPage;