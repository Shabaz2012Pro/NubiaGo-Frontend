import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/atoms/Card';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const PrivacyPolicyPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Privacy Policy', current: true }
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
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8" />
                <h1 className="text-4xl font-bold">Privacy Policy</h1>
              </div>
              
              <p className="text-xl text-blue-100 mb-6">
                At NubiaGO, we are committed to protecting your privacy and ensuring the security of your personal information.
              </p>
              
              <p className="text-blue-100">
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
                  1. Introduction
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  This Privacy Policy explains how NubiaGO ("we," "us," or "our") collects, uses, shares, and protects your personal information when you use our website, mobile application, and services (collectively, the "Services").
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  By accessing or using our Services, you agree to the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our Services.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  2. Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      2.1 Information You Provide to Us
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                      We collect information that you provide directly to us, including:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-1">
                      <li>Account information (name, email address, password, phone number)</li>
                      <li>Profile information (company name, profile picture, preferences)</li>
                      <li>Shipping and billing information</li>
                      <li>Payment information (processed securely through our payment processors)</li>
                      <li>Communications with us</li>
                      <li>Survey responses and feedback</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      2.2 Information We Collect Automatically
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                      When you use our Services, we automatically collect certain information, including:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-1">
                      <li>Device information (IP address, browser type, operating system)</li>
                      <li>Usage information (pages visited, time spent, clicks)</li>
                      <li>Location information (country, city)</li>
                      <li>Cookies and similar technologies</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
                  <li>Providing, maintaining, and improving our Services</li>
                  <li>Processing transactions and fulfilling orders</li>
                  <li>Communicating with you about your account, orders, and our Services</li>
                  <li>Personalizing your experience and providing recommendations</li>
                  <li>Analyzing usage patterns and trends to improve our Services</li>
                  <li>Protecting against fraud and unauthorized access</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  4. Sharing Your Information
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
                  <li>With suppliers and service providers to fulfill orders and provide services</li>
                  <li>With payment processors to complete transactions</li>
                  <li>With analytics and service providers who help us improve our Services</li>
                  <li>With law enforcement or government authorities when required by law</li>
                  <li>In connection with a business transaction, such as a merger or acquisition</li>
                </ul>
                <p className="text-neutral-600 dark:text-neutral-400 mt-4">
                  We do not sell your personal information to third parties.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  5. Data Security
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
                  <li>Encryption of sensitive data</li>
                  <li>Secure socket layer (SSL) technology</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication procedures</li>
                  <li>Secure data storage practices</li>
                </ul>
                <p className="text-neutral-600 dark:text-neutral-400 mt-4">
                  While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  6. Your Rights and Choices
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
                  <li>Accessing, correcting, or deleting your personal information</li>
                  <li>Restricting or objecting to our use of your personal information</li>
                  <li>Receiving a copy of your personal information in a structured, machine-readable format</li>
                  <li>Withdrawing consent at any time (where processing is based on consent)</li>
                  <li>Lodging a complaint with a supervisory authority</li>
                </ul>
                <p className="text-neutral-600 dark:text-neutral-400 mt-4">
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  7. International Data Transfers
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  We operate internationally and may transfer your personal information to countries other than your country of residence, including Turkey and various African countries. We ensure appropriate safeguards are in place to protect your information in compliance with applicable data protection laws.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  8. Children's Privacy
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Our Services are not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will delete such information from our systems.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg" className="mb-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  9. Changes to This Privacy Policy
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                </p>
              </motion.div>
            </Card>

            <Card variant="default" padding="lg">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  10. Contact Us
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
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

export default PrivacyPolicyPage;