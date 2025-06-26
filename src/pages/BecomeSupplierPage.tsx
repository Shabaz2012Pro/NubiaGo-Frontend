import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Globe, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  Users,
  Truck,
  DollarSign,
  BarChart,
  ArrowRight,
  MessageSquare,
  Mail,
  Phone,
  Star
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const BecomeSupplierPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Become a Supplier', current: true }
  ];

  const benefits = [
    {
      title: 'Access to African Markets',
      description: 'Reach customers in all 54 African countries through our established marketplace.',
      icon: <Globe className="w-8 h-8" />,
      color: 'text-blue-500'
    },
    {
      title: 'Simplified Logistics',
      description: 'We handle shipping, customs, and delivery, making international trade effortless.',
      icon: <Truck className="w-8 h-8" />,
      color: 'text-green-500'
    },
    {
      title: 'Secure Payments',
      description: 'Receive payments securely and on time, with protection for both parties.',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'text-gold-500'
    },
    {
      title: 'Growth Opportunities',
      description: 'Expand your business with insights, tools, and support for scaling.',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'text-purple-500'
    }
  ];

  const requirements = [
    {
      title: 'Business Registration',
      description: 'Valid business registration and tax documentation in Turkey',
      icon: <Building className="w-6 h-6" />
    },
    {
      title: 'Product Quality',
      description: 'High-quality products that meet our standards and compliance requirements',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: 'Export Capability',
      description: 'Ability to export products internationally with proper documentation',
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: 'Customer Service',
      description: 'Commitment to excellent customer service and timely communication',
      icon: <MessageSquare className="w-6 h-6" />
    }
  ];

  const successStories = [
    {
      company: 'AudioTech Turkey',
      industry: 'Electronics',
      achievement: '250% increase in export sales within first year',
      testimonial: 'NubiaGo has transformed our business by opening up African markets we never had access to before. The platform\'s logistics and payment solutions removed all the barriers to international trade.',
      representative: 'Ahmet Yılmaz, CEO',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      company: 'Istanbul Leather Co.',
      industry: 'Fashion',
      achievement: 'Expanded to 28 African countries in 6 months',
      testimonial: 'As a traditional leather goods manufacturer, we were hesitant about e-commerce. NubiaGo made the transition seamless, providing all the tools and support we needed to succeed in digital exports.',
      representative: 'Zeynep Kaya, Export Manager',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const stats = [
    { value: '1M+', label: 'Active Customers', icon: <Users className="w-6 h-6" /> },
    { value: '54', label: 'African Countries', icon: <Globe className="w-6 h-6" /> },
    { value: '$50M+', label: 'Annual Trade Volume', icon: <BarChart className="w-6 h-6" /> },
    { value: '4.8/5', label: 'Supplier Satisfaction', icon: <Star className="w-6 h-6" /> }
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
        <section className="bg-gradient-to-r from-red-600 to-red-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <Building className="w-4 h-4 mr-2" />
                For Turkish Suppliers
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">Become a NubiaGo Supplier</h1>
              
              <p className="text-xl text-red-100 mb-6">
                Expand your business to African markets through NubiaGo, the premier marketplace connecting Turkish suppliers with African customers.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="secondary" 
                  className="bg-white text-red-600 hover:bg-neutral-100"
                >
                  Apply Now
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Why Sell on NubiaGo?
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Join thousands of Turkish suppliers already growing their business with NubiaGo
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className={`${benefit.color} mb-6 flex justify-center`}>
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 text-center">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-center">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="bg-neutral-50 dark:bg-neutral-800/30 py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div variants={itemVariants} className="mb-12">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  NubiaGo by the Numbers
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Join a thriving marketplace with proven results
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg" className="h-full">
                      <div className="text-red-600 mb-4 flex justify-center">
                        {stat.icon}
                      </div>
                      <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-400">
                        {stat.label}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                A simple process to start selling on NubiaGo
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-red-200 dark:bg-red-800"></div>
              
              <div className="space-y-12">
                {[
                  { title: 'Apply', description: 'Complete our supplier application form with your business details' },
                  { title: 'Verification', description: 'Our team verifies your business credentials and product quality' },
                  { title: 'Onboarding', description: 'Set up your supplier dashboard and upload your products' },
                  { title: 'Start Selling', description: 'Your products go live on NubiaGo, reaching millions of African customers' }
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
                      
                      <div className="relative z-10 w-10 h-10 bg-red-600 rounded-full border-4 border-white dark:border-neutral-900 flex items-center justify-center text-white">
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

        {/* Requirements */}
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
                  Supplier Requirements
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  What we look for in our supplier partners
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {requirements.map((requirement, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg" className="h-full">
                      <div className="text-red-600 mb-6 flex justify-center">
                        {requirement.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 text-center">
                        {requirement.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-center">
                        {requirement.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="mt-8 text-center">
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Don't worry if you're not sure about meeting all requirements. Our team is here to guide you through the process.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => window.location.hash = 'contact'}
                >
                  Contact Supplier Support
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Supplier Success Stories
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Hear from Turkish suppliers who have grown their business with NubiaGo
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {successStories.map((story, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-6">
                      <div className="md:w-1/3">
                        <div className="aspect-square rounded-xl overflow-hidden">
                          <img 
                            src={story.image} 
                            alt={story.company} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                            {story.company}
                          </h3>
                          <Badge variant="primary" size="sm">{story.industry}</Badge>
                        </div>
                        <div className="mb-3">
                          <Badge variant="success">{story.achievement}</Badge>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-4 italic">
                          "{story.testimonial}"
                        </p>
                        <p className="text-sm text-neutral-500">
                          — {story.representative}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="text-center mt-8">
              <Button 
                variant="ghost" 
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View More Success Stories
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Become a Supplier CTA */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Expand Your Business?
                </h2>
                <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of Turkish suppliers already growing their business with NubiaGo.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="bg-white text-red-600 hover:bg-neutral-100"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Apply Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => window.location.hash = 'contact'}
                  >
                    Contact Supplier Team
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800/50 dark:to-neutral-800/30">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                      Still Have Questions?
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      Our supplier support team is here to help you with any questions about joining NubiaGo as a supplier.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-lg">
                          <Mail className="w-5 h-5" />
                        </div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          suppliers@nubiago.com
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-lg">
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
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => window.location.hash = 'contact'}
                    >
                      Contact Supplier Team
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

export default BecomeSupplierPage;