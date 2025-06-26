import React from 'react';
import { motion } from 'framer-motion';
import { 
  Link as LinkIcon, 
  DollarSign, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Globe,
  Mail,
  Phone,
  Calendar,
  Award,
  Zap
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const AffiliatePage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Affiliate Program', current: true }
  ];

  const benefits = [
    {
      title: 'Competitive Commission',
      description: 'Earn up to 15% commission on every sale you refer to NubiaGo',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'text-green-500'
    },
    {
      title: 'Global Reach',
      description: 'Promote products to customers across Africa and beyond',
      icon: <Globe className="w-8 h-8" />,
      color: 'text-blue-500'
    },
    {
      title: 'Performance Bonuses',
      description: 'Earn additional bonuses when you exceed monthly sales targets',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'text-purple-500'
    },
    {
      title: 'Dedicated Support',
      description: 'Get personalized support from our affiliate management team',
      icon: <Users className="w-8 h-8" />,
      color: 'text-amber-500'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Sign Up',
      description: 'Complete our simple application form to join the NubiaGo Affiliate Program'
    },
    {
      step: 2,
      title: 'Get Approved',
      description: 'Our team will review your application and approve it within 48 hours'
    },
    {
      step: 3,
      title: 'Share Your Links',
      description: 'Generate unique affiliate links and promote NubiaGo products on your platforms'
    },
    {
      step: 4,
      title: 'Earn Commissions',
      description: 'Earn up to 15% commission on every sale made through your affiliate links'
    }
  ];

  const faqs = [
    {
      question: 'Who can join the NubiaGo Affiliate Program?',
      answer: 'Our affiliate program is open to bloggers, content creators, social media influencers, and website owners who have an audience interested in Turkish products or African markets. We particularly welcome affiliates from African countries, but the program is open globally.'
    },
    {
      question: 'How much can I earn as an affiliate?',
      answer: 'Affiliates earn a base commission of 10% on all sales generated through their affiliate links. Top performers can earn up to 15% through our tiered commission structure. Additionally, we offer performance bonuses for affiliates who exceed monthly sales targets.'
    },
    {
      question: 'When and how do I get paid?',
      answer: 'Commissions are calculated monthly and paid on the 15th of the following month. We offer multiple payment methods including bank transfer, PayPal, and mobile money services popular in African countries. The minimum payout threshold is $50.'
    },
    {
      question: 'What marketing materials do you provide?',
      answer: 'We provide a variety of marketing materials including banners, product images, text links, and email templates. We also offer data feeds for advanced affiliates who want to create dynamic content featuring our products.'
    },
    {
      question: 'How long does the cookie last?',
      answer: 'Our affiliate tracking cookie has a 30-day duration. This means if a user clicks on your affiliate link and makes a purchase within 30 days, you will receive commission for that sale, even if they visit our site multiple times before purchasing.'
    }
  ];

  const testimonials = [
    {
      quote: "Joining NubiaGo's affiliate program has been a game-changer for my blog. The products resonate well with my African audience, and the commission rates are among the best I've seen.",
      name: "Amara Okafor",
      website: "AfricanLifestyleBlog.com",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      earnings: "$2,500/month"
    },
    {
      quote: "What I love about NubiaGo's affiliate program is the quality of products and the excellent support team. They're always available to help with any questions or issues.",
      name: "Mohammed Hassan",
      website: "TechReviewsAfrica.com",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      earnings: "$1,800/month"
    },
    {
      quote: "As a social media influencer focusing on fashion, NubiaGo's Turkish clothing and accessories are perfect for my audience. The commission structure is generous and payments are always on time.",
      name: "Zainab Mensah",
      website: "@ZainabStyles",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      earnings: "$3,200/month"
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
        <section className="bg-gradient-to-r from-orange-600 to-orange-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <LinkIcon className="w-4 h-4 mr-2" />
                Affiliate Program
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">Earn While You Share</h1>
              
              <p className="text-xl text-orange-100 mb-6">
                Join the NubiaGo Affiliate Program and earn competitive commissions by promoting premium Turkish products to African markets.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <Button 
                  variant="secondary" 
                  className="bg-white text-orange-600 hover:bg-neutral-100"
                >
                  Join Now
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
            animate="visible"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Why Become a NubiaGo Affiliate?
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Join thousands of successful affiliates earning commissions with NubiaGo
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  Earn more as you grow with our tiered commission rates
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg">
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                      <thead className="bg-neutral-100 dark:bg-neutral-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                            Monthly Sales
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                            Commission Rate
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                            Bonus
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                            Tier
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                        <tr className="bg-neutral-50 dark:bg-neutral-800/50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            $0 - $1,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                            10%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                            -
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="primary" size="sm">Standard</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            $1,001 - $5,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                            12%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                            $100
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="success" size="sm">Silver</Badge>
                          </td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-800/50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            $5,001 - $10,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                            13%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                            $300
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="gold" size="sm">Gold</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            $10,001+
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                            15%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                            $500
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="error" size="sm">Platinum</Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">
                          Commission Details
                        </p>
                        <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                          Commissions are calculated on the product price excluding shipping and taxes. Bonuses are paid monthly when you reach the corresponding tier. Commission rates are subject to our affiliate terms and conditions.
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
                Join our affiliate program in four simple steps
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-orange-200 dark:bg-orange-800"></div>
              
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
                      
                      <div className="relative z-10 w-10 h-10 bg-orange-600 rounded-full border-4 border-white dark:border-neutral-900 flex items-center justify-center text-white">
                        <span className="font-bold">{step.step}</span>
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

        {/* Testimonials */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-700 py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Success Stories
                </h2>
                <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                  Hear from our top-performing affiliates
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
                      <div className="flex flex-col h-full">
                        <p className="text-white mb-6 flex-1">
                          "{testimonial.quote}"
                        </p>
                        <div className="flex items-center space-x-3">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-white">{testimonial.name}</p>
                            <p className="text-sm text-orange-200">{testimonial.website}</p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/20">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-orange-200" />
                            <span className="text-sm font-medium text-orange-100">Average Earnings: {testimonial.earnings}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
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
                Everything you need to know about our affiliate program
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg">
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-start">
                        <QuestionIcon className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
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
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-700 py-16 mb-16">
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
                <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                  Join our affiliate program today and start earning competitive commissions by promoting premium Turkish products.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="bg-white text-orange-600 hover:bg-neutral-100"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Apply Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Contact Affiliate Team
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
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

// Custom Info Icon
const Info: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

export default AffiliatePage;