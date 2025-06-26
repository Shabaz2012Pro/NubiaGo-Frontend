import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  FileText, 
  Eye, 
  Database, 
  Globe, 
  Clock,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const PrivacyPolicyPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Privacy Policy', current: true }
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
            <div className="max-w-3xl">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Privacy Policy</h1>
              </div>
              
              <p className="text-xl text-blue-100 mb-6">
                At NubiaGo, we are committed to protecting your privacy and ensuring the security of your personal information.
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
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Introduction
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100 prose-p:text-neutral-600 dark:prose-p:text-neutral-400">
                  <p>
                    This Privacy Policy explains how NubiaGo ("we," "us," or "our") collects, uses, shares, and protects your personal information when you visit our website, use our services, or interact with us in any way. By using our services, you agree to the terms of this Privacy Policy.
                  </p>
                  <p>
                    We take your privacy seriously and are committed to maintaining the trust and confidence of our visitors and customers. We want you to understand when and why we collect personal information, how we use it, the conditions under which we may disclose it to others, and how we keep it secure.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Information We Collect */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <Database className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Information We Collect
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <h3>Personal Information</h3>
                  <p>We may collect the following personal information:</p>
                  <ul>
                    <li>Contact information (name, email address, phone number, shipping and billing address)</li>
                    <li>Account information (username, password, account preferences)</li>
                    <li>Payment information (credit card details, billing address, payment history)</li>
                    <li>Order information (products purchased, order history, shipping details)</li>
                    <li>Communication information (customer service inquiries, feedback, survey responses)</li>
                    <li>Profile information (preferences, interests, wishlist items)</li>
                  </ul>

                  <h3>Automatically Collected Information</h3>
                  <p>We also collect certain information automatically when you visit our website:</p>
                  <ul>
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Usage information (pages visited, time spent on site, links clicked)</li>
                    <li>Location information (country, region, city)</li>
                    <li>Cookies and similar technologies (see our Cookie Policy for more details)</li>
                  </ul>
                </div>
              </Card>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <Eye className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    How We Use Your Information
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>We use your personal information for the following purposes:</p>
                  
                  <h3>To Provide Our Services</h3>
                  <ul>
                    <li>Process and fulfill your orders</li>
                    <li>Create and manage your account</li>
                    <li>Process payments and prevent fraud</li>
                    <li>Provide customer support and respond to inquiries</li>
                    <li>Facilitate communication between buyers and suppliers</li>
                  </ul>
                  
                  <h3>To Improve Our Services</h3>
                  <ul>
                    <li>Analyze usage patterns and trends</li>
                    <li>Develop new features and services</li>
                    <li>Troubleshoot issues and debug our platform</li>
                    <li>Conduct research and analytics</li>
                  </ul>
                  
                  <h3>To Communicate With You</h3>
                  <ul>
                    <li>Send order confirmations and shipping updates</li>
                    <li>Provide information about your account or purchases</li>
                    <li>Respond to your questions and feedback</li>
                    <li>Send marketing communications (with your consent)</li>
                    <li>Notify you about changes to our services or policies</li>
                  </ul>
                  
                  <h3>To Comply With Legal Obligations</h3>
                  <ul>
                    <li>Comply with applicable laws and regulations</li>
                    <li>Respond to legal requests and prevent harm</li>
                    <li>Protect our rights, privacy, safety, or property</li>
                  </ul>
                </div>
              </Card>
            </motion.div>

            {/* Sharing Your Information */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                    <Globe className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Sharing Your Information
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>We may share your personal information with the following categories of recipients:</p>
                  
                  <h3>Service Providers</h3>
                  <p>
                    We share information with third-party service providers who help us operate our business and provide our services, such as payment processors, shipping companies, cloud storage providers, customer support services, and marketing partners.
                  </p>
                  
                  <h3>Suppliers and Sellers</h3>
                  <p>
                    When you make a purchase, we share necessary information with the relevant suppliers or sellers to fulfill your order, such as your name, shipping address, and order details.
                  </p>
                  
                  <h3>Business Partners</h3>
                  <p>
                    We may share information with our business partners for joint marketing efforts, co-branded services, or promotional events, but only with your consent where required by law.
                  </p>
                  
                  <h3>Legal Requirements</h3>
                  <p>
                    We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, government requests).
                  </p>
                  
                  <h3>Business Transfers</h3>
                  <p>
                    If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
                  </p>
                  
                  <h3>With Your Consent</h3>
                  <p>
                    We may share your information with other third parties when we have your consent to do so.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Data Security */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <Lock className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Data Security
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. These measures include:
                  </p>
                  
                  <ul>
                    <li>Encryption of sensitive data</li>
                    <li>Secure socket layer (SSL) technology for all transactions</li>
                    <li>Regular security assessments and penetration testing</li>
                    <li>Access controls and authentication procedures</li>
                    <li>Regular backups and disaster recovery plans</li>
                    <li>Employee training on data protection and security</li>
                  </ul>
                  
                  <p>
                    While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Your Rights and Choices */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Your Rights and Choices
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  
                  <ul>
                    <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
                    <li><strong>Correction:</strong> You can request that we correct inaccurate or incomplete information.</li>
                    <li><strong>Deletion:</strong> You can request that we delete your personal information in certain circumstances.</li>
                    <li><strong>Restriction:</strong> You can request that we restrict the processing of your information in certain circumstances.</li>
                    <li><strong>Data Portability:</strong> You can request a copy of your personal information in a structured, commonly used, and machine-readable format.</li>
                    <li><strong>Objection:</strong> You can object to our processing of your personal information in certain circumstances.</li>
                    <li><strong>Withdraw Consent:</strong> If we process your information based on your consent, you can withdraw that consent at any time.</li>
                  </ul>
                  
                  <p>
                    To exercise any of these rights, please contact us using the information provided in the "Contact Us" section below.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* International Data Transfers */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <Globe className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    International Data Transfers
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    As a global marketplace connecting Turkish suppliers with African markets, we may transfer your personal information to countries other than your country of residence. When we transfer personal information across borders, we take appropriate measures to ensure that your information receives an adequate level of protection in the countries where we process it.
                  </p>
                  
                  <p>
                    These measures may include:
                  </p>
                  
                  <ul>
                    <li>Entering into data transfer agreements based on standard contractual clauses approved by relevant authorities</li>
                    <li>Implementing additional safeguards as required by applicable law</li>
                    <li>Obtaining your explicit consent for certain transfers</li>
                    <li>Transferring data to countries with adequate data protection laws</li>
                  </ul>
                  
                  <p>
                    By using our services, you acknowledge that your personal information may be transferred to and processed in countries outside your country of residence, including Turkey and various African countries.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Children's Privacy */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Children's Privacy
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18 without verification of parental consent, we will take steps to remove that information from our servers.
                  </p>
                  
                  <p>
                    If you believe that we might have any information from or about a child under 18, please contact us using the information provided in the "Contact Us" section below.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Changes to This Privacy Policy */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Changes to This Privacy Policy
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page.
                  </p>
                  
                  <p>
                    We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of our services after any changes to this Privacy Policy constitutes your acceptance of the changes.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Contact Us */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Contact Us
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
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

// Custom User Icon
const User: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// Custom Users Icon
const Users: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

export default PrivacyPolicyPage;