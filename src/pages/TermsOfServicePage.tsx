import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  CheckCircle, 
  Shield, 
  AlertTriangle, 
  Scale,
  Globe,
  RefreshCw,
  Clock
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const TermsOfServicePage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Terms of Service', current: true }
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
        <section className="bg-gradient-to-r from-red-600 to-red-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Terms of Service</h1>
              </div>
              
              <p className="text-xl text-red-100 mb-6">
                Please read these terms and conditions carefully before using our platform. By accessing or using NubiaGo, you agree to be bound by these terms.
              </p>
              
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>Last Updated: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {/* Acceptance of Terms */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    1. Acceptance of Terms
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    By accessing or using the NubiaGo platform, website, mobile applications, or any other services provided by NubiaGo (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Services.
                  </p>
                  <p>
                    These Terms constitute a legally binding agreement between you and NubiaGo regarding your use of the Services. You represent and warrant that you have the legal capacity to enter into this agreement.
                  </p>
                  <p>
                    We may modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Account Registration */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    2. Account Registration
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    To access certain features of the Services, you may need to register for an account. When you register, you agree to provide accurate, current, and complete information and to update this information to maintain its accuracy.
                  </p>
                  <p>
                    You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
                  </p>
                  <p>
                    We reserve the right to suspend or terminate your account if any information provided during registration or thereafter proves to be inaccurate, false, or misleading, or if you violate any term of these Terms.
                  </p>
                  <h3>Account Types</h3>
                  <p>
                    NubiaGo offers different types of accounts:
                  </p>
                  <ul>
                    <li><strong>Buyer Accounts:</strong> For individuals and businesses looking to purchase products from Turkish suppliers.</li>
                    <li><strong>Supplier Accounts:</strong> For Turkish businesses looking to sell their products to African markets.</li>
                    <li><strong>Admin Accounts:</strong> For NubiaGo staff to manage the platform.</li>
                  </ul>
                  <p>
                    Each account type has specific terms and conditions that apply in addition to these general Terms.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Use of Services */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <Globe className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    3. Use of Services
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    You agree to use the Services only for lawful purposes and in accordance with these Terms. You agree not to:
                  </p>
                  <ul>
                    <li>Use the Services in any way that violates any applicable law or regulation</li>
                    <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Services</li>
                    <li>Attempt to gain unauthorized access to any portion of the Services or any other systems or networks connected to the Services</li>
                    <li>Use any robot, spider, or other automatic device, process, or means to access the Services for any purpose</li>
                    <li>Introduce any viruses, Trojan horses, worms, logic bombs, or other harmful material to the Services</li>
                    <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
                    <li>Impersonate or attempt to impersonate NubiaGo, a NubiaGo employee, another user, or any other person or entity</li>
                    <li>Collect or harvest any information from the Services, including user accounts</li>
                    <li>Use the Services to advertise or offer to sell goods or services for any commercial purpose not expressly approved by NubiaGo</li>
                  </ul>
                </div>
              </Card>
            </motion.div>

            {/* Marketplace Rules */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                    <Scale className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    4. Marketplace Rules
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <h3>For Buyers</h3>
                  <p>
                    As a buyer on NubiaGo, you agree to:
                  </p>
                  <ul>
                    <li>Provide accurate and complete information when making purchases</li>
                    <li>Pay for items purchased in a timely manner</li>
                    <li>Comply with all applicable laws and regulations, including import regulations in your country</li>
                    <li>Communicate respectfully with suppliers</li>
                    <li>Not engage in fraudulent activities or misrepresent yourself</li>
                  </ul>
                  
                  <h3>For Suppliers</h3>
                  <p>
                    As a supplier on NubiaGo, you agree to:
                  </p>
                  <ul>
                    <li>Provide accurate and complete information about your products and business</li>
                    <li>Ensure that all products listed comply with applicable laws and regulations</li>
                    <li>Fulfill orders in a timely manner and as described</li>
                    <li>Maintain accurate inventory information</li>
                    <li>Communicate promptly and professionally with buyers</li>
                    <li>Comply with all applicable export laws and regulations</li>
                    <li>Not engage in price fixing, false advertising, or other deceptive practices</li>
                  </ul>
                  
                  <h3>Prohibited Items</h3>
                  <p>
                    The following items are prohibited from being listed or sold on NubiaGo:
                  </p>
                  <ul>
                    <li>Illegal goods or services</li>
                    <li>Counterfeit or unauthorized replica items</li>
                    <li>Hazardous or dangerous materials</li>
                    <li>Weapons, explosives, or related items</li>
                    <li>Drugs, controlled substances, or drug paraphernalia</li>
                    <li>Items that infringe on intellectual property rights</li>
                    <li>Adult content or services</li>
                    <li>Human remains or body parts</li>
                    <li>Items that promote hate, violence, or discrimination</li>
                  </ul>
                  
                  <p>
                    NubiaGo reserves the right to remove any listing or suspend any account that violates these rules.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Payments and Fees */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    5. Payments and Fees
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    NubiaGo charges fees for certain services provided through the platform. All fees are clearly displayed before you complete a transaction.
                  </p>
                  
                  <h3>Payment Processing</h3>
                  <p>
                    We use third-party payment processors to facilitate transactions on our platform. By using our Services, you agree to comply with these payment processors' terms and conditions.
                  </p>
                  
                  <h3>Currency Conversion</h3>
                  <p>
                    All transactions on NubiaGo are processed in USD. If your payment method is in a different currency, your bank or payment provider may charge currency conversion fees.
                  </p>
                  
                  <h3>Taxes</h3>
                  <p>
                    You are responsible for paying all taxes, duties, and other governmental charges associated with your use of the Services. NubiaGo may collect and remit taxes where required by law.
                  </p>
                  
                  <h3>Refunds and Cancellations</h3>
                  <p>
                    Refunds and cancellations are subject to our Refund Policy, which is incorporated by reference into these Terms.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Intellectual Property */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    6. Intellectual Property
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <h3>NubiaGo Content</h3>
                  <p>
                    The Services and all content, features, and functionality thereof, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, software, and the design, selection, and arrangement thereof (collectively, "NubiaGo Content"), are owned by NubiaGo, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                  </p>
                  
                  <h3>Limited License</h3>
                  <p>
                    Subject to these Terms, NubiaGo grants you a limited, non-exclusive, non-transferable, and revocable license to access and use the Services and NubiaGo Content for your personal, non-commercial use.
                  </p>
                  
                  <h3>Restrictions</h3>
                  <p>
                    You may not:
                  </p>
                  <ul>
                    <li>Reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the NubiaGo Content</li>
                    <li>Use any illustrations, photographs, video or audio sequences, or any graphics separately from the accompanying text</li>
                    <li>Delete or alter any copyright, trademark, or other proprietary rights notices from copies of materials from the Services</li>
                    <li>Access or use for any commercial purposes any part of the Services or any services or materials available through the Services</li>
                  </ul>
                  
                  <h3>User Content</h3>
                  <p>
                    By posting, uploading, or otherwise making available any content on or through the Services ("User Content"), you grant NubiaGo a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, copy, modify, create derivative works based on, distribute, publicly display, publicly perform, and otherwise exploit such User Content in connection with the Services.
                  </p>
                  
                  <p>
                    You represent and warrant that:
                  </p>
                  <ul>
                    <li>You own or have the necessary rights to use and authorize NubiaGo to use all intellectual property rights in and to any User Content</li>
                    <li>The User Content does not violate any third party's intellectual property rights, privacy rights, publicity rights, or other personal or proprietary rights</li>
                    <li>The User Content complies with these Terms and all applicable laws and regulations</li>
                  </ul>
                </div>
              </Card>
            </motion.div>

            {/* Disclaimers and Limitations of Liability */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    7. Disclaimers and Limitations of Liability
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <h3>Disclaimer of Warranties</h3>
                  <p>
                    THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. NUBIAGO DOES NOT WARRANT THAT THE SERVICES ARE ERROR-FREE OR THAT ACCESS THERETO WILL BE UNINTERRUPTED OR ERROR-FREE.
                  </p>
                  
                  <h3>Limitation of Liability</h3>
                  <p>
                    IN NO EVENT SHALL NUBIAGO, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                  </p>
                  <ul>
                    <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES</li>
                    <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES</li>
                    <li>ANY CONTENT OBTAINED FROM THE SERVICES</li>
                    <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
                  </ul>
                  <p>
                    WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT NUBIAGO HAS BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE, AND EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.
                  </p>
                  
                  <h3>Indemnification</h3>
                  <p>
                    You agree to defend, indemnify, and hold harmless NubiaGo, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Services.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Dispute Resolution */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                    <Scale className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    8. Dispute Resolution
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <h3>Governing Law</h3>
                  <p>
                    These Terms and your use of the Services shall be governed by and construed in accordance with the laws of Turkey, without giving effect to any choice or conflict of law provision or rule.
                  </p>
                  
                  <h3>Dispute Resolution</h3>
                  <p>
                    Any dispute arising out of or relating to these Terms or the Services shall be resolved through the following steps:
                  </p>
                  <ol>
                    <li><strong>Informal Negotiation:</strong> The parties shall first attempt to resolve any dispute informally by contacting each other.</li>
                    <li><strong>Mediation:</strong> If the dispute cannot be resolved through informal negotiation, either party may initiate mediation by providing written notice to the other party.</li>
                    <li><strong>Arbitration:</strong> If the dispute is not resolved within 60 days after the written notice of mediation, the dispute shall be resolved by binding arbitration in Istanbul, Turkey, in accordance with the Turkish Arbitration Law.</li>
                  </ol>
                  
                  <h3>Class Action Waiver</h3>
                  <p>
                    YOU AND NUBIAGO AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Termination */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <X className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    9. Termination
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
                  </p>
                  
                  <p>
                    Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may simply discontinue using the Services or contact us to request account deletion.
                  </p>
                  
                  <p>
                    All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Miscellaneous */}
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    10. Miscellaneous
                  </h2>
                </div>
                
                <div className="prose max-w-none dark:prose-invert">
                  <h3>Entire Agreement</h3>
                  <p>
                    These Terms, together with our Privacy Policy and any other agreements expressly incorporated by reference herein, constitute the entire agreement between you and NubiaGo concerning the Services.
                  </p>
                  
                  <h3>Waiver</h3>
                  <p>
                    No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term, and NubiaGo's failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
                  </p>
                  
                  <h3>Severability</h3>
                  <p>
                    If any provision of these Terms is held to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms will continue in full force and effect.
                  </p>
                  
                  <h3>Assignment</h3>
                  <p>
                    You may not assign or transfer these Terms, by operation of law or otherwise, without NubiaGo's prior written consent. Any attempt by you to assign or transfer these Terms without such consent will be null and void. NubiaGo may freely assign or transfer these Terms without restriction.
                  </p>
                  
                  <h3>Notices</h3>
                  <p>
                    Any notices or other communications provided by NubiaGo under these Terms will be given by posting to the Services or by email to the address you provide to NubiaGo.
                  </p>
                  
                  <h3>Contact Information</h3>
                  <p>
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <ul>
                    <li>Email: legal@nubiago.com</li>
                    <li>Address: Maslak Mahallesi, Büyükdere Cd. No:123, 34485 Sarıyer/İstanbul, Turkey</li>
                  </ul>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

// Custom X Icon
const X: React.FC<{ className?: string }> = ({ className }) => (
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
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Custom DollarSign Icon
const DollarSign: React.FC<{ className?: string }> = ({ className }) => (
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
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

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

export default TermsOfServicePage;