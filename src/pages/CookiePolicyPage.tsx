import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Info, Settings, Globe, Clock } from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/atoms/Card';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const CookiePolicyPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Cookie Policy', current: true }
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

        {/* Header */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-3 mb-4">
                <Cookie className="w-8 h-8" />
                <h1 className="text-4xl font-bold">Cookie Policy</h1>
              </div>
              
              <p className="text-xl text-purple-100 mb-6">
                This Cookie Policy explains how NubiaGO uses cookies and similar technologies to recognize you when you visit our website and use our services.
              </p>
              
              <p className="text-purple-200">
                Last Updated: May 15, 2024
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  1. What Are Cookies?
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies help provide functionality such as remembering your preferences, keeping you logged in, and personalizing your experience.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  2. How We Use Cookies
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  We use cookies for various purposes, including:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-lg flex-shrink-0">
                      <Settings className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                        Essential Cookies
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        These cookies are necessary for the website to function properly. They enable basic functions like page navigation, secure areas access, and shopping cart functionality. The website cannot function properly without these cookies.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg flex-shrink-0">
                      <Info className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                        Analytics Cookies
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve our website and services based on user behavior.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg flex-shrink-0">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                        Functional Cookies
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        These cookies enable enhanced functionality and personalization, such as remembering your preferences, language choices, and login information. They may be set by us or by third-party providers whose services we have added to our pages.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="p-2 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-lg flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                        Targeting/Advertising Cookies
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        These cookies are used to track visitors across websites to display relevant advertisements. They remember that you have visited our website and share this information with other organizations, such as advertisers.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  3. Specific Cookies We Use
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Below is a list of the main cookies we use and what we use them for:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-neutral-100 dark:bg-neutral-800">
                        <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Cookie Name</th>
                        <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Purpose</th>
                        <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Duration</th>
                        <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white dark:bg-neutral-900">
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">session_id</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">Maintains your session state</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">Session</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">Essential</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-800/50">
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">auth_token</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">Keeps you logged in</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">30 days</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">Essential</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-900">
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">_ga</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">Google Analytics - Distinguishes users</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">2 years</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">Analytics</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-800/50">
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">_gid</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">Google Analytics - Distinguishes users</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">24 hours</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">Analytics</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-900">
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">_fbp</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">Facebook Pixel - Tracks conversions</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">3 months</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">Advertising</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-800/50">
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">lang</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">Remembers your language preference</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">1 year</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">Functional</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-900">
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">cart_items</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">Stores items in your shopping cart</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">30 days</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">Functional</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  4. Third-Party Cookies
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may be placed when you visit our website or when you click on certain elements of our website.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Third-party services we use that may place cookies include:
                </p>
                <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
                  <li>Google Analytics (for website analytics)</li>
                  <li>Facebook Pixel (for advertising)</li>
                  <li>Stripe (for payment processing)</li>
                  <li>Hotjar (for user behavior analysis)</li>
                  <li>Intercom (for customer support)</li>
                </ul>
                <p className="text-neutral-600 dark:text-neutral-400 mt-4">
                  Each of these services has its own privacy policy and cookie usage, which we encourage you to review.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  5. Managing Cookies
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, as it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      5.1 Browser Settings
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                      You can manage cookies through your browser settings. Here's how to do it in common browsers:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-1">
                      <li><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                      <li><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                      <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                      <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      5.2 Our Cookie Consent Tool
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      When you first visit our website, you will be presented with a cookie banner that allows you to accept or decline non-essential cookies. You can change your preferences at any time by clicking on the "Cookie Settings" link in the footer of our website.
                    </p>
                  </div>
                </div>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  6. Do Not Track Signals
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Some browsers have a "Do Not Track" feature that signals to websites that you visit that you do not want to have your online activity tracked. Given that there is not yet a common understanding of how to interpret the DNT signal, our Services do not currently respond to browser DNT signals.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  7. Changes to This Cookie Policy
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Cookie Policy on this page and updating the "Last Updated" date.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies and related technologies.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  8. Contact Us
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
                </p>
                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                  <p className="text-neutral-600 dark:text-neutral-400">
                    <strong>Email:</strong> privacy@nubiago.com
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    <strong>Address:</strong> Maslak Mahallesi, Büyükdere Cd. No:123, 34485 Sarıyer/İstanbul, Turkey
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    <strong>Phone:</strong> +90 212 XXX XXXX
                  </p>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicyPage;