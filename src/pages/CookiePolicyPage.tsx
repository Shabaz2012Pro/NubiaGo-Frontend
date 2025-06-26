import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cookie, 
  Info, 
  Shield, 
  Settings, 
  Clock, 
  Check, 
  X,
  Globe,
  Mail,
  Phone
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const CookiePolicyPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Cookie Policy', current: true }
  ];

  const lastUpdated = 'June 15, 2024';

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

  const cookieTypes = [
    {
      type: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.',
      examples: ['Authentication cookies', 'Security cookies', 'Load balancing cookies'],
      canDisable: false
    },
    {
      type: 'Performance Cookies',
      description: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.',
      examples: ['Google Analytics', 'Site speed analytics', 'Error monitoring'],
      canDisable: true
    },
    {
      type: 'Functional Cookies',
      description: 'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.',
      examples: ['Language preferences', 'Location preferences', 'Personalized recommendations'],
      canDisable: true
    },
    {
      type: 'Targeting Cookies',
      description: 'These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.',
      examples: ['Social media sharing', 'Targeted advertising', 'Conversion tracking'],
      canDisable: true
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <main className="py-8">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-amber-600 to-amber-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-3 mb-6">
                <Cookie className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Cookie Policy</h1>
              </div>
              
              <p className="text-xl text-amber-100 mb-6">
                This Cookie Policy explains how NubiaGo uses cookies and similar technologies to recognize you when you visit our website.
              </p>
              
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>Last Updated: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {/* Introduction */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                    <Info className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    What Are Cookies
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
                  </p>
                  <p>
                    Cookies allow a website to recognize your device and remember if you've been to the website before. They can be used to store your preferences, remember what's in your shopping cart, help you navigate between pages efficiently, and generally improve your browsing experience.
                  </p>
                  <p>
                    Cookies set by the website owner (in this case, NubiaGo) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Types of Cookies We Use */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                    <Cookie className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Types of Cookies We Use
                  </h2>
                </div>
                
                <div className="space-y-6">
                  {cookieTypes.map((cookieType, index) => (
                    <div key={index} className="border-b border-neutral-200 dark:border-neutral-700 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                          {cookieType.type}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {cookieType.canDisable ? (
                            <span className="text-xs bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 px-2 py-1 rounded">
                              Optional
                            </span>
                          ) : (
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                              Required
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                        {cookieType.description}
                      </p>
                      <div>
                        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Examples:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cookieType.examples.map((example, i) => (
                            <span key={i} className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-1 rounded">
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* How We Use Cookies */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                    <Settings className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    How We Use Cookies
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    We use cookies for the following purposes:
                  </p>
                  
                  <h3>Authentication and Security</h3>
                  <p>
                    We use cookies to identify you when you visit our website and as you navigate our website, and to help us secure our website and your account.
                  </p>
                  
                  <h3>Personalization</h3>
                  <p>
                    We use cookies to store information about your preferences and to personalize our website for you, including remembering your preferred language, currency, and items in your shopping cart.
                  </p>
                  
                  <h3>Analytics and Performance</h3>
                  <p>
                    We use cookies to analyze how visitors use our website, to monitor website performance, and to improve our website's functionality and user experience.
                  </p>
                  
                  <h3>Advertising</h3>
                  <p>
                    We use cookies to help us to display advertisements that will be relevant to you, to control the number of times you see an advertisement, and to measure the effectiveness of our advertising campaigns.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Third-Party Cookies */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                    <Globe className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Third-Party Cookies
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements on and through the website, and so on.
                  </p>
                  
                  <p>
                    The third-party services we use that may set cookies include:
                  </p>
                  
                  <ul>
                    <li><strong>Google Analytics:</strong> Web analytics service that tracks and reports website traffic</li>
                    <li><strong>Google Ads:</strong> Online advertising platform</li>
                    <li><strong>Facebook Pixel:</strong> Analytics tool that allows us to measure the effectiveness of our advertising</li>
                    <li><strong>Hotjar:</strong> Behavior analytics and user feedback service</li>
                    <li><strong>Intercom:</strong> Customer messaging platform</li>
                    <li><strong>Stripe:</strong> Payment processing service</li>
                    <li><strong>PayPal:</strong> Payment processing service</li>
                  </ul>
                  
                  <p>
                    Each of these services may use cookies for their own purposes, according to their own privacy policies and cookie policies. We encourage you to review the privacy policies of these third-party services.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Managing Cookies */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                    <Settings className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Managing Cookies
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    Most browsers allow you to refuse to accept cookies and to delete cookies. The methods for doing so vary from browser to browser, and from version to version. You can obtain up-to-date information about blocking and deleting cookies via the support pages of your browser:
                  </p>
                  
                  <ul>
                    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                    <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                    <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
                    <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
                  </ul>
                  
                  <p>
                    Please note that blocking all cookies will have a negative impact upon the usability of many websites. If you block cookies, you may not be able to use all the features on our website.
                  </p>
                  
                  <h3>Cookie Preferences</h3>
                  <p>
                    You can manage your cookie preferences on our website by clicking on the "Cookie Settings" button in our cookie banner or by clicking the button below:
                  </p>
                </div>
                
                <div className="mt-4">
                  <Button
                    variant="primary"
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    Manage Cookie Preferences
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Cookie Consent */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                    <Check className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Cookie Consent
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    When you first visit our website, we will show you a cookie banner that allows you to choose which types of cookies you accept. Essential cookies cannot be rejected as they are necessary for the website to function.
                  </p>
                  
                  <p>
                    You can change your cookie preferences at any time by clicking on the "Cookie Settings" button in the footer of our website.
                  </p>
                  
                  <p>
                    By continuing to use our website after setting your cookie preferences, you agree to our use of cookies in accordance with this Cookie Policy.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Changes to This Cookie Policy */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Changes to This Cookie Policy
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on this page and updating the "Last Updated" date at the top of this page.
                  </p>
                  
                  <p>
                    We encourage you to review this Cookie Policy periodically to stay informed about how we are using cookies. Your continued use of our website after any changes to this Cookie Policy constitutes your acceptance of the changes.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Contact Us */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Contact Us
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    If you have any questions, concerns, or requests regarding this Cookie Policy or our use of cookies, please contact us at:
                  </p>
                  
                  <div className="mt-4 space-y-2 not-prose">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-neutral-500" />
                      <span className="text-neutral-700 dark:text-neutral-300">privacy@nubiago.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-neutral-500" />
                      <span className="text-neutral-700 dark:text-neutral-300">+90 212 XXX XXXX</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-neutral-500" />
                      <span className="text-neutral-700 dark:text-neutral-300">
                        NubiaGo Headquarters<br />
                        Maslak Mahallesi, Büyükdere Cd. No:123<br />
                        34485 Sarıyer/İstanbul, Turkey
                      </span>
                    </div>
                  </div>
                  
                  <p className="mt-6">
                    We will respond to your request within 30 days.
                  </p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default CookiePolicyPage;