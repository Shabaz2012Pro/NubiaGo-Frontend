import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  TrendingUp, 
  Calendar, 
  FileText, 
  Download, 
  Users,
  Globe,
  DollarSign,
  Building,
  Mail,
  Phone,
  ChevronRight,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const InvestorRelations: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Investor Relations', current: true }
  ];

  const financialHighlights = [
    {
      metric: 'Annual Revenue',
      value: '$50M+',
      growth: '+45%',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-green-500'
    },
    {
      metric: 'GMV (Gross Merchandise Value)',
      value: '$120M+',
      growth: '+62%',
      icon: <BarChart className="w-6 h-6" />,
      color: 'text-blue-500'
    },
    {
      metric: 'Active Customers',
      value: '1M+',
      growth: '+38%',
      icon: <Users className="w-6 h-6" />,
      color: 'text-purple-500'
    },
    {
      metric: 'Verified Suppliers',
      value: '5,000+',
      growth: '+25%',
      icon: <Building className="w-6 h-6" />,
      color: 'text-orange-500'
    }
  ];

  const reports = [
    { title: '2023 Annual Report', date: 'March 15, 2024', size: '4.2 MB' },
    { title: 'Q4 2023 Financial Results', date: 'February 10, 2024', size: '2.8 MB' },
    { title: 'Q3 2023 Financial Results', date: 'November 12, 2023', size: '2.5 MB' },
    { title: 'Q2 2023 Financial Results', date: 'August 14, 2023', size: '2.3 MB' }
  ];

  const upcomingEvents = [
    { title: 'Q1 2024 Earnings Call', date: 'May 15, 2024', time: '10:00 AM GMT' },
    { title: 'Annual Shareholder Meeting', date: 'June 20, 2024', time: '2:00 PM GMT' },
    { title: 'Investor Day 2024', date: 'July 12, 2024', time: '9:00 AM GMT' }
  ];

  const investmentHighlights = [
    {
      title: 'Market Leadership',
      description: 'Leading marketplace connecting Turkish suppliers with African markets',
      icon: <Globe className="w-6 h-6" />,
      color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
    },
    {
      title: 'Strong Growth',
      description: 'Consistent year-over-year growth in revenue, GMV, and customer base',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-green-100 dark:bg-green-900/20 text-green-600'
    },
    {
      title: 'Expanding Footprint',
      description: 'Presence in all 54 African countries with strategic local partnerships',
      icon: <Globe className="w-6 h-6" />,
      color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600'
    },
    {
      title: 'Innovative Technology',
      description: 'Proprietary platform with AI-powered features and mobile-first approach',
      icon: <Building className="w-6 h-6" />,
      color: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600'
    },
    {
      title: 'Quality Assurance',
      description: 'Rigorous supplier verification and product quality control processes',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'bg-red-100 dark:bg-red-900/20 text-red-600'
    },
    {
      title: 'Sustainable Business Model',
      description: 'Balanced revenue streams and strong unit economics',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-teal-100 dark:bg-teal-900/20 text-teal-600'
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
      <Header />
      
      <main className="py-8">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <BarChart className="w-4 h-4 mr-2" />
                Investor Information
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">Investor Relations</h1>
              
              <p className="text-xl text-blue-100 mb-6">
                Discover investment opportunities with NubiaGO, the leading marketplace connecting Turkish suppliers with African markets.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="secondary" 
                  className="bg-white text-blue-600 hover:bg-neutral-100"
                >
                  Financial Reports
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                >
                  Investor Presentation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Highlights */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Financial Highlights
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Key performance indicators showcasing our growth and success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {financialHighlights.map((highlight, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className={clsx("p-3 rounded-lg", highlight.color)}>
                        {highlight.icon}
                      </div>
                      <Badge variant="success" size="sm">{highlight.growth} YoY</Badge>
                    </div>
                    <h3 className="text-lg font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                      {highlight.metric}
                    </h3>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                      {highlight.value}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Investment Highlights */}
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
                  Investment Highlights
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Why NubiaGO represents a compelling investment opportunity
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {investmentHighlights.map((highlight, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg" className="h-full">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className={clsx("p-3 rounded-lg flex-shrink-0", highlight.color)}>
                          {highlight.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                          {highlight.title}
                        </h3>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {highlight.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Financial Reports */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Financial Reports
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Access our latest financial reports and presentations
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="max-w-4xl mx-auto">
                <div className="space-y-4">
                  {reports.map((report, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                            {report.title}
                          </h3>
                          <p className="text-sm text-neutral-500">
                            {report.date} • {report.size}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        leftIcon={<Download className="w-4 h-4" />}
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    variant="ghost" 
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    View All Financial Reports
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Upcoming Events */}
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
                  Upcoming Events
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Join us for these upcoming investor events
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {upcomingEvents.map((event, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg" className="h-full">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                          {event.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                          {event.date} • {event.time}
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          Add to Calendar
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Corporate Governance */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Corporate Governance
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Our commitment to transparency, accountability, and ethical business practices
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                      Board of Directors
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <span className="font-medium">Mehmet Özkan</span>
                        <span className="text-sm text-neutral-500">CEO & Founder</span>
                      </li>
                      <li className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <span className="font-medium">Fatima Al-Rashid</span>
                        <span className="text-sm text-neutral-500">Chairperson</span>
                      </li>
                      <li className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <span className="font-medium">Kwame Asante</span>
                        <span className="text-sm text-neutral-500">Director</span>
                      </li>
                      <li className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <span className="font-medium">Ayşe Demir</span>
                        <span className="text-sm text-neutral-500">Director</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                      Governance Documents
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <a 
                          href="#" 
                          className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                        >
                          <span className="font-medium">Code of Business Conduct</span>
                          <Download className="w-4 h-4 text-blue-500" />
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#" 
                          className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                        >
                          <span className="font-medium">Corporate Governance Guidelines</span>
                          <Download className="w-4 h-4 text-blue-500" />
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#" 
                          className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                        >
                          <span className="font-medium">Committee Charters</span>
                          <Download className="w-4 h-4 text-blue-500" />
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#" 
                          className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                        >
                          <span className="font-medium">ESG Policy</span>
                          <Download className="w-4 h-4 text-blue-500" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Investor Contact */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 mb-16">
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
                  Investor Contact
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  For investor inquiries, please contact our Investor Relations team.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                  <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                    <div className="flex items-center space-x-4">
                      <Mail className="w-6 h-6 text-blue-200" />
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-blue-100">investors@nubiago.com</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                    <div className="flex items-center space-x-4">
                      <Phone className="w-6 h-6 text-blue-200" />
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <p className="text-blue-100">+90 212 XXX XXXX</p>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-neutral-100"
                  onClick={() => window.location.hash = 'contact'}
                >
                  Contact Investor Relations
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Email Alerts */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                      Stay Informed
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      Sign up to receive email alerts for NubiaGO investor news, financial reports, and events.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800"
                      />
                      <Button 
                        variant="primary" 
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Subscribe
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <Mail className="w-12 h-12 text-blue-600" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InvestorRelations;