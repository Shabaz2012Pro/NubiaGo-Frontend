import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Gift, Bell, TrendingUp } from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { clsx } from 'clsx';

interface NewsletterProps {
  className?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({ className }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setLoading(false);
      setEmail('');
    }, 2000);
  };

  const benefits = [
    {
      icon: <Gift className="w-5 h-5" />,
      text: 'Exclusive deals & early access'
    },
    {
      icon: <Bell className="w-5 h-5" />,
      text: 'New product alerts'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: 'Market insights & trends'
    }
  ];

  return (
    <section className={clsx('py-16 bg-gradient-to-br from-primary-600 via-primary-700 to-gold-600', className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {!isSubscribed ? (
            <>
              <div className="mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
                  Stay Connected with NubiaGO
                </h2>
                <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                  Get exclusive deals, new product alerts, and insider access to the best Turkish suppliers
                </p>

                {/* Benefits */}
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-2 text-primary-100"
                    >
                      <div className="text-gold-300">
                        {benefit.icon}
                      </div>
                      <span className="text-sm font-medium">
                        {benefit.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Subscription Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-md mx-auto"
              >
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter your email address"
                      value={email}
                      onChange={setEmail}
                      className="bg-white/90 backdrop-blur-sm border-white/30 text-black placeholder-gray-500 focus:bg-white focus:text-black"
                      leftIcon={<Mail className="w-4 h-4 text-gray-500" />}
                    />
                  </div>
                  <Button
                    variant="gold"
                    size="md"
                    onClick={handleSubscribe}
                    loading={loading}
                    disabled={!email}
                    className="px-8 whitespace-nowrap"
                  >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>
                
                <p className="text-xs text-primary-200 mt-4">
                  Join 50,000+ traders already subscribed. Unsubscribe anytime.
                </p>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-8"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </div>
              
              <h2 className="font-display font-bold text-3xl text-white mb-4">
                Welcome to NubiaGO!
              </h2>
              <p className="text-xl text-primary-100 mb-6">
                You're now subscribed to exclusive deals and updates
              </p>
              <p className="text-primary-200">
                Check your email for a special welcome offer 🎁
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Trust Indicators */}
        {!isSubscribed && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-primary-200"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">No spam, ever</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Unsubscribe anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">GDPR compliant</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;