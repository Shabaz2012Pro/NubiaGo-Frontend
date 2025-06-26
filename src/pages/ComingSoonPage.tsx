import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Mail, 
  Bell, 
  Clock, 
  Star, 
  Zap,
  Send,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

interface ComingSoonPageProps {
  title?: string;
  description?: string;
  features?: string[];
  estimatedLaunch?: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({
  title = "Exciting New Feature",
  description = "We're working hard to bring you something amazing. Stay tuned for updates!",
  features = [
    "Enhanced user experience",
    "Advanced functionality", 
    "Improved performance",
    "Better integration"
  ],
  estimatedLaunch = "Q2 2024"
}) => {
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
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header />
      
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            {/* Hero Section */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <Rocket className="w-12 h-12 text-white" />
              </div>
              
              <Badge variant="primary" size="lg" className="mb-6">
                <Clock className="w-4 h-4 mr-2" />
                Coming Soon
              </Badge>
              
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-neutral-900 dark:text-neutral-100 mb-6">
                {title}
              </h1>
              
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
                {description}
              </p>
              
              <div className="flex items-center justify-center space-x-2 text-lg">
                <span className="text-neutral-600 dark:text-neutral-400">Estimated Launch:</span>
                <Badge variant="gold" size="lg">
                  <Star className="w-4 h-4 mr-2" />
                  {estimatedLaunch}
                </Badge>
              </div>
            </motion.div>

            {/* Features Preview */}
            <motion.div variants={itemVariants} className="mb-12">
              <Card variant="default" padding="lg">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
                  What to Expect
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center space-x-3 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Email Subscription */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800">
                {!isSubscribed ? (
                  <>
                    <div className="mb-6">
                      <Bell className="w-12 h-12 text-red-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                        Be the First to Know
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Get notified when this feature launches and be among the first to experience it
                      </p>
                    </div>
                    
                    <div className="max-w-md mx-auto">
                      <div className="flex space-x-3">
                        <Input
                          placeholder="Enter your email address"
                          type="email"
                          value={email}
                          onChange={setEmail}
                          leftIcon={<Mail className="w-4 h-4" />}
                          className="flex-1"
                        />
                        <Button
                          variant="primary"
                          onClick={handleSubscribe}
                          loading={loading}
                          disabled={!email}
                          leftIcon={<Send className="w-4 h-4" />}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Notify Me
                        </Button>
                      </div>
                      
                      <p className="text-xs text-neutral-500 mt-3">
                        We'll only send you updates about this feature. No spam, ever.
                      </p>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      You're All Set!
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      We'll notify you as soon as this feature is available
                    </p>
                    <Badge variant="success" size="lg">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Subscribed Successfully
                    </Badge>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Alternative Actions */}
            <motion.div variants={itemVariants} className="mt-12">
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                In the meantime, explore what's already available
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => window.location.hash = ''}
                >
                  Browse Products
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => window.location.hash = 'contact'}
                >
                  Contact Support
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoonPage;