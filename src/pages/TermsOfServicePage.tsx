import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, Shield, AlertCircle } from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/atoms/Card';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const TermsOfServicePage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Terms of Service', current: true }
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
        <section className="bg-gradient-to-r from-neutral-800 to-neutral-900 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-8 h-8" />
                <h1 className="text-4xl font-bold">Terms of Service</h1>
              </div>
              
              <p className="text-xl text-neutral-300 mb-6">
                Please read these terms carefully before using our platform. By using NubiaGO, you agree to be bound by these terms.
              </p>
              
              <p className="text-neutral-400">
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
                  1. Acceptance of Terms
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  By accessing or using the NubiaGO platform, website, mobile application, or any other services provided by NubiaGO (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Services.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  These Terms constitute a legally binding agreement between you and NubiaGO regarding your use of the Services. You represent and warrant that you have the legal capacity to enter into this agreement.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  2. Account Registration and Security
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      2.1 Account Creation
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      To use certain features of the Services, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      2.2 Account Security
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We cannot and will not be liable for any loss or damage arising from your failure to comply with this section.
                    </p>
                  </div>
                </div>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  3. Marketplace Rules
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      3.1 Buyer Obligations
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                      As a buyer on NubiaGO, you agree to:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-1">
                      <li>Provide accurate and complete information when making purchases</li>
                      <li>Pay for items purchased in a timely manner</li>
                      <li>Comply with all applicable laws and regulations</li>
                      <li>Communicate respectfully with suppliers</li>
                      <li>Not engage in fraudulent activities or misrepresentations</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      3.2 Supplier Obligations
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                      As a supplier on NubiaGo, you agree to:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-1">
                      <li>Provide accurate and complete information about your products</li>
                      <li>Fulfill orders in a timely manner</li>
                      <li>Comply with all applicable laws and regulations</li>
                      <li>Maintain high quality standards for products and services</li>
                      <li>Respond promptly to buyer inquiries and concerns</li>
                      <li>Not engage in deceptive or unfair business practices</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  4. Transactions and Payments
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      4.1 Pricing and Availability
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      All prices are listed in the currency specified on the product page. Product availability is not guaranteed and may change without notice. We reserve the right to limit quantities of products available for purchase.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      4.2 Payment Processing
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      We use third-party payment processors to facilitate transactions on our platform. By making a purchase, you agree to the terms and conditions of these payment processors. We are not responsible for any errors or actions of these third-party payment processors.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      4.3 Fees and Commissions
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      We charge fees and commissions for transactions conducted on our platform. These fees are clearly displayed during the checkout process. We reserve the right to change our fee structure with reasonable notice.
                    </p>
                  </div>
                </div>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  5. Shipping and Delivery
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Shipping times and costs are provided by suppliers and may vary based on the destination country, product size, and weight. While we strive to ensure accurate shipping information, we cannot guarantee specific delivery dates or times.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Buyers are responsible for providing accurate shipping information. We are not responsible for delays or delivery failures due to incorrect shipping information provided by the buyer.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  6. Returns and Refunds
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Our return and refund policy is designed to ensure customer satisfaction while protecting the interests of our suppliers. Please refer to our detailed Returns and Refunds Policy for specific information about return eligibility, process, and timeframes.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  In general, items must be returned in their original condition within 30 days of delivery. Some items, such as personalized products or perishable goods, may not be eligible for return.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  7. Intellectual Property
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  The Services, including all content, features, and functionality, are owned by NubiaGO, its licensors, or other providers and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  You may not copy, modify, create derivative works, publicly display, publicly perform, republish, download, store, transmit, or otherwise exploit any of the material on our Services, except as follows:
                </p>
                <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
                  <li>Your computer may temporarily store copies of such materials incidental to your accessing and viewing those materials.</li>
                  <li>You may store files that are automatically cached by your web browser for display enhancement purposes.</li>
                  <li>You may print or download one copy of a reasonable number of pages of the website for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</li>
                </ul>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  8. Prohibited Activities
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  You agree not to use the Services for any purpose that is unlawful or prohibited by these Terms. Prohibited activities include, but are not limited to:
                </p>
                <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
                  <li>Using the Services in any way that could disable, overburden, damage, or impair the Services</li>
                  <li>Using any robot, spider, or other automatic device, process, or means to access the Services for any purpose</li>
                  <li>Introducing any viruses, Trojan horses, worms, logic bombs, or other harmful material</li>
                  <li>Attempting to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Services</li>
                  <li>Engaging in any conduct that restricts or inhibits anyone's use or enjoyment of the Services</li>
                  <li>Using the Services to advertise or offer to sell goods and services without our prior written consent</li>
                </ul>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  9. Limitation of Liability
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  To the fullest extent permitted by applicable law, NubiaGO and its affiliates, officers, directors, employees, agents, suppliers, and licensors will not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
                  <li>Your access to or use of or inability to access or use the Services</li>
                  <li>Any conduct or content of any third party on the Services</li>
                  <li>Any content obtained from the Services</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                </ul>
                <p className="text-neutral-600 dark:text-neutral-400 mt-4">
                  In no event shall our total liability to you for all claims exceed the amount paid by you, if any, for accessing or using our Services during the twelve (12) months preceding your claim.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  10. Indemnification
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  You agree to defend, indemnify, and hold harmless NubiaGO, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Services.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  11. Governing Law and Dispute Resolution
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of Turkey, without giving effect to any principles of conflicts of law. Any legal action or proceeding arising out of or relating to these Terms shall be exclusively brought in the courts of Istanbul, Turkey, and you consent to the personal jurisdiction of such courts.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Any dispute arising out of or in connection with these Terms, including any question regarding its existence, validity, or termination, shall be referred to and finally resolved by arbitration under the Rules of Arbitration of the International Chamber of Commerce by one or more arbitrators appointed in accordance with the said Rules.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  12. Changes to Terms
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them and apply to all access to and use of the Services thereafter.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Your continued use of the Services following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  13. Contact Us
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                  <p className="text-neutral-600 dark:text-neutral-400">
                    <strong>Email:</strong> legal@nubiago.com
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

export default TermsOfServicePage;