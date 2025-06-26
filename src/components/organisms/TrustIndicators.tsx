import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, Award, Clock, Globe, Users, Star, CheckCircle, AlignCenterVertical as Certificate, Lock, Verified, BadgeCheck } from 'lucide-react';
import { clsx } from 'clsx';

interface TrustIndicatorsProps {
  className?: string;
}

const trustFeatures = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Verified Suppliers',
    description: 'All suppliers undergo rigorous verification process',
    stat: '5,000+',
    color: 'text-green-500'
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Fast Shipping',
    description: 'Express delivery to African markets',
    stat: '3-7 days',
    color: 'text-blue-500'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Quality Guaranteed',
    description: 'Premium Turkish products with quality assurance',
    stat: '98% satisfaction',
    color: 'text-gold-500'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: '24/7 Support',
    description: 'Round-the-clock customer service',
    stat: '< 2hr response',
    color: 'text-purple-500'
  }
];

const certifications = [
  { 
    name: 'ISO 9001 Certified', 
    icon: <Certificate className="w-8 h-8" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  { 
    name: 'CE Compliance', 
    icon: <BadgeCheck className="w-8 h-8" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  { 
    name: 'SSL Secured', 
    icon: <Lock className="w-8 h-8" />,
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20'
  },
  { 
    name: 'TÜV Verified', 
    icon: <Verified className="w-8 h-8" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  }
];

const testimonials = [
  {
    name: 'Amara Okafor',
    location: 'Lagos, Nigeria',
    rating: 5,
    text: 'Excellent quality products and fast delivery. NubiaGO has become my go-to marketplace for Turkish goods.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    name: 'Kwame Asante',
    location: 'Accra, Ghana',
    rating: 5,
    text: 'The supplier verification process gives me confidence. I\'ve never been disappointed with my purchases.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    name: 'Fatima Al-Rashid',
    location: 'Cairo, Egypt',
    rating: 5,
    text: 'Amazing customer service and authentic Turkish products. Highly recommend for business sourcing.',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
];

const TrustIndicators: React.FC<TrustIndicatorsProps> = ({ className }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className={clsx('py-16 bg-neutral-50 dark:bg-neutral-900/50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 dark:text-neutral-100 mb-4">
            Why Choose NubiaGO?
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Your trusted bridge between Turkish excellence and African markets
          </p>
        </div>

        {/* Trust Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="relative mb-6">
                <div className={clsx(
                  'w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110',
                  'bg-white dark:bg-neutral-800 shadow-lg group-hover:shadow-xl',
                  feature.color
                )}>
                  {feature.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
              
              <h3 className="font-display font-semibold text-lg text-neutral-900 dark:text-neutral-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                {feature.description}
              </p>
              <div className={clsx('text-2xl font-bold', feature.color)}>
                {feature.stat}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Certifications Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white dark:bg-neutral-800 rounded-2xl p-8 mb-16 shadow-lg border border-neutral-200 dark:border-neutral-700"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              <span>Enterprise Grade Security & Compliance</span>
            </div>
            <h3 className="font-display font-semibold text-2xl text-neutral-900 dark:text-neutral-100 mb-2">
              Certified & Trusted
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Recognized by international standards and security organizations worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={clsx(
                  'text-center p-6 rounded-xl transition-all duration-300 hover:shadow-lg group cursor-pointer',
                  cert.bgColor
                )}
              >
                <div className={clsx(
                  'w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110',
                  'bg-white dark:bg-neutral-800 shadow-md',
                  cert.color
                )}>
                  {cert.icon}
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  {cert.name}
                </h4>
                <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <motion.div
                    className={clsx('h-full rounded-full', cert.color.replace('text-', 'bg-'))}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Additional Trust Indicators */}
          <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">99.9%</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Uptime Guarantee</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">256-bit</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">SSL Encryption</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">GDPR</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Compliant</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">PCI DSS</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Level 1</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Customer Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="font-display font-semibold text-2xl text-neutral-900 dark:text-neutral-100 mb-2">
              What Our Customers Say
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Join thousands of satisfied customers across Africa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-500 fill-current" />
                  ))}
                </div>
                
                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Global Reach */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white"
        >
          <Globe className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h3 className="font-display font-bold text-2xl mb-2">
            Connecting Two Continents
          </h3>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            Bridging Turkish craftsmanship with African markets through secure, reliable trade partnerships
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">54</div>
              <div className="text-red-200 text-sm">African Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold">81</div>
              <div className="text-red-200 text-sm">Turkish Provinces</div>
            </div>
            <div>
              <div className="text-3xl font-bold">1M+</div>
              <div className="text-red-200 text-sm">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">$50M+</div>
              <div className="text-red-200 text-sm">Trade Volume</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustIndicators;