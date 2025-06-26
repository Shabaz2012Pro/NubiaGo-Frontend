import React from 'react';
import { motion } from 'framer-motion';
import { 
  Link, 
  DollarSign, 
  TrendingUp, 
  Users, 
  BarChart, 
  Gift,
  CheckCircle,
  Clock,
  HelpCircle,
  ArrowRight,
  MessageSquare,
  Mail,
  Zap
} from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const AffiliateProgram: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Affiliate Program', current: true }
  ];

  const benefits = [
    {
      title: 'Competitive Commission',
      description: 'Earn up to 15% commission on every sale you refer to NubiaGO.',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'text-green-500'
    },
    {
      title: 'Performance Bonuses',
      description: 'Unlock additional bonuses as you reach sales milestones.',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'text-blue-500'
    },
    {
      title: '45-Day Cookie',
      description: 'Earn commission on purchases made up to 45 days after clicking your link.',
      icon: <Clock className="w-8 h-8" />,
      color: 'text-purple-500'
    },
    {
      title: 'Dedicated Support',
      description: 'Get personalized assistance from our affiliate management team.',
      icon: <Users className="w-8 h-8" />,
      color: 'text-red-500'
    }
  ];

  const commissionTiers = [
    { sales: '$0 - $1,000', rate: '10%', bonus: '-' },
    { sales: '$1,001 - $5,000', rate: '12%', bonus: '$100' },
    { sales: '$5,001 - $10,000', rate: '13%', bonus: '$300' },
    { sales: '$10,001 - $25,000', rate: '14%', bonus: '$750' },
    { sales: '$25,001+', rate: '15%', bonus: '$1,500' }
  ];

  const howItWorks = [
    {
      title: 'Apply',
      description: 'Complete our simple application form to join the NubiaGO Affiliate Program.',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: 'Get Approved',
      description: 'Our team will review your application and approve it within 48 hours.',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: 'Share Links',
      description: 'Access your unique affiliate links and promotional materials.',
      icon: <Link className="w-6 h-6" />
    },
    {
      title: 'Earn Commission',
      description: 'Earn commission on every qualifying purchase made through your links.',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: 'Get Paid',
      description: 'Receive monthly payments via your preferred payment method.',
      icon: <DollarSign className="w-6 h-6" />
    }
  ];

  const faqs = [
    {
      question: 'Who can join the NubiaGO Affiliate Program?',
      answer: 'Our affiliate program is open to bloggers, content creators, social media influencers, and website owners who have an audience interested in Turkish products, African markets, e-commerce, or related topics. We review all applications to ensure alignment with our brand values.'
    },
    {
      question: 'How and when do I get paid?',
      answer: 'Commissions are paid monthly for all earnings that have passed the 30-day return period. We offer payment via PayPal, bank transfer, or mobile money services available in African countries. The minimum payout threshold is $50.'
    },
    {
      question: 'What promotional materials do you provide?',
      answer: 'We provide a variety of marketing materials including banner ads, product images, text links, and exclusive promotional offers. We also create seasonal campaign materials and can work with you on custom materials for special promotions.'
    },
    {
      question: 'Are there any restrictions on how I can promote NubiaGO?',
      answer: 'Yes, we have guidelines to ensure ethical promotion. These include no spamming, no misleading claims, no bidding on our brand terms in paid search, and adherence to FTC disclosure requirements. A complete list of guidelines is provided upon approval.'
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
      <Header />
      
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
                <Link className="w-4 h-4 mr-2" />
                Earn While You Share
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">NubiaGo Affiliate Program</h1>
              
              <p className="text-xl text-purple-100 mb-6">
                Join our affiliate program and earn competitive commissions by promoting premium Turkish products to African markets.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="secondary" 
                  className="bg-white text-purple-600 hover:bg-neutral-100"
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
                Why Join Our Affiliate Program?
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Enjoy these exclusive benefits when you partner with NubiaGO
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

        {/* Commission Structure */}
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
                  Commission Structure
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Earn more as you drive more sales with our tiered commission structure
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
                <Card variant="default" padding="lg">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-purple-50 dark:bg-purple-900/20">
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left text-purple-700 dark:text-purple-300">Monthly Sales</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left text-purple-700 dark:text-purple-300">Commission Rate</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left text-purple-700 dark:text-purple-300">Performance Bonus</th>
                        </tr>
                      </thead>
                      <tbody>
                        {commissionTiers.map((tier, index) => (
                          <tr 
                            key={index} 
                            className={clsx(
                              index % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-800/50',
                              'hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors'
                            )}
                          >
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 font-medium">{tier.sales}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-green-600 dark:text-green-400 font-medium">{tier.rate}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{tier.bonus}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Gift className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-1">
                          Additional Incentives
                        </h4>
                        <p className="text-sm text-purple-600 dark:text-purple-400">
                          Top affiliates also receive exclusive benefits including early access to new products, higher commission rates for special promotions, and quarterly bonus opportunities.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
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
                Join our affiliate program in five simple steps
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-purple-200 dark:bg-purple-800"></div>
              
              <div className="space-y-12">
                {howItWorks.map((step, index) => (
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
                      
                      <div className="relative z-10 w-10 h-10 bg-purple-600 rounded-full border-4 border-white dark:border-neutral-900 flex items-center justify-center text-white">
                        {step.icon}
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

            <motion.div variants={itemVariants} className="text-center mt-12">
              <Button 
                variant="primary" 
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
              >
                Apply to Become an Affiliate
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Tools & Resources */}
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
                  Tools & Resources
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Everything you need to succeed as a NubiaGO affiliate
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                        <Link className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Marketing Materials
                      </h3>
                    </div>
                    <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Banner ads in various sizes</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Product images and descriptions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Pre-written social media posts</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Email templates and newsletter content</span>
                      </li>
                    </ul>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                        <BarChart className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Tracking & Analytics
                      </h3>
                    </div>
                    <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Real-time performance dashboard</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Detailed click and conversion tracking</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Product performance insights</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Commission and payment reports</span>
                      </li>
                    </ul>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                        <Zap className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Affiliate Support
                      </h3>
                    </div>
                    <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Dedicated affiliate manager</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Comprehensive knowledge base</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Regular affiliate newsletters</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Exclusive affiliate community</span>
                      </li>
                    </ul>
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
                Find answers to common questions about our affiliate program
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-lg flex-shrink-0">
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
        </section>

        {/* Apply Now CTA */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-700 py-16 mb-16">
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
                  Ready to Start Earning?
                </h2>
                <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                  Join the NubiaGO Affiliate Program today and start earning competitive commissions by promoting premium Turkish products.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-neutral-100"
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
                    Contact Affiliate Team
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
              <Card variant="default" padding="lg">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                      Have More Questions?
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      Our affiliate team is here to help you succeed. Contact us for more information about the NubiaGO Affiliate Program.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-lg">
                          <Mail className="w-5 h-5" />
                        </div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          affiliates@nubiago.com
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-lg">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Live chat available Monday-Friday, 9AM-5PM GMT
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/3">
                    <Button 
                      variant="primary" 
                      size="lg"
                      fullWidth
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => window.location.hash = 'contact'}
                    >
                      Contact Affiliate Team
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AffiliateProgram;