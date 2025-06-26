import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart, 
  PieChart, 
  Users, 
  Globe, 
  FileText,
  Download,
  Calendar,
  Mail,
  Phone,
  ArrowRight,
  Award,
  Building
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const InvestorsPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Investor Relations', current: true }
  ];

  const financialHighlights = [
    {
      metric: 'Annual Revenue',
      value: '$50M+',
      growth: '+125%',
      period: 'YoY',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-green-500'
    },
    {
      metric: 'GMV',
      value: '$120M+',
      growth: '+150%',
      period: 'YoY',
      icon: <BarChart className="w-6 h-6" />,
      color: 'text-blue-500'
    },
    {
      metric: 'Active Users',
      value: '1M+',
      growth: '+85%',
      period: 'YoY',
      icon: <Users className="w-6 h-6" />,
      color: 'text-purple-500'
    },
    {
      metric: 'Market Reach',
      value: '25',
      growth: '+10',
      period: 'countries',
      icon: <Globe className="w-6 h-6" />,
      color: 'text-amber-500'
    }
  ];

  const investorDocuments = [
    {
      title: 'Annual Report 2023',
      description: 'Comprehensive overview of NubiaGo\'s performance and achievements in 2023',
      type: 'PDF',
      size: '5.2 MB',
      date: 'March 15, 2024'
    },
    {
      title: 'Q1 2024 Financial Results',
      description: 'Detailed financial performance for the first quarter of 2024',
      type: 'PDF',
      size: '3.8 MB',
      date: 'May 10, 2024'
    },
    {
      title: 'Investor Presentation',
      description: 'Latest investor presentation outlining growth strategy and market opportunity',
      type: 'PDF',
      size: '12.5 MB',
      date: 'June 1, 2024'
    },
    {
      title: 'Market Expansion Roadmap',
      description: 'Strategic plan for expanding into new African markets through 2026',
      type: 'PDF',
      size: '4.7 MB',
      date: 'April 22, 2024'
    }
  ];

  const leadershipTeam = [
    {
      name: 'Mehmet Özkan',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      bio: '15+ years in international trade and e-commerce. Previously founded TurkExport, acquired in 2020.'
    },
    {
      name: 'Fatima Al-Rashid',
      role: 'CFO',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      bio: 'Former investment banker with 12 years of experience at Goldman Sachs and JP Morgan, specializing in emerging markets.'
    },
    {
      name: 'Kwame Asante',
      role: 'COO',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      bio: 'Operations expert with extensive experience scaling e-commerce platforms across Africa. Former Director at Jumia.'
    },
    {
      name: 'Ayşe Demir',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      bio: 'Tech leader with 15+ years of experience building scalable platforms. Previously led engineering at Trendyol.'
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
      <main className="py-8">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <TrendingUp className="w-4 h-4 mr-2" />
                Investor Relations
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">Investing in the Future of Cross-Continental Trade</h1>
              
              <p className="text-xl text-green-100 mb-6">
                NubiaGo is transforming how Turkish suppliers connect with African markets, creating value for customers, partners, and investors.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <Button 
                  variant="secondary" 
                  className="bg-white text-green-600 hover:bg-neutral-100"
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
            animate="visible"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Financial Highlights
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Key performance metrics showcasing our growth and market leadership
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {financialHighlights.map((highlight, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className={`${highlight.color} mb-6 flex justify-center`}>
                      {highlight.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1 text-center">
                      {highlight.value}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-center mb-2">
                      {highlight.metric}
                    </p>
                    <div className="flex items-center justify-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {highlight.growth} {highlight.period}
                      </span>
                    </div>
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
                  Why NubiaGo represents a compelling investment opportunity
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Massive Market Opportunity',
                    description: 'The Turkey-Africa trade corridor represents a $50B+ annual opportunity, with e-commerce penetration still in early stages.',
                    icon: <Globe className="w-6 h-6" />,
                    color: 'text-blue-600'
                  },
                  {
                    title: 'Rapid Growth Trajectory',
                    description: 'Consistent triple-digit YoY growth in GMV, revenue, and user base since inception.',
                    icon: <TrendingUp className="w-6 h-6" />,
                    color: 'text-green-600'
                  },
                  {
                    title: 'Proprietary Logistics Network',
                    description: 'Built a unique cross-continental logistics infrastructure that creates significant barriers to entry.',
                    icon: <Truck className="w-6 h-6" />,
                    color: 'text-amber-600'
                  },
                  {
                    title: 'Strong Unit Economics',
                    description: 'Positive contribution margin and decreasing customer acquisition costs as network effects take hold.',
                    icon: <DollarSign className="w-6 h-6" />,
                    color: 'text-purple-600'
                  },
                  {
                    title: 'Experienced Leadership Team',
                    description: 'Founded and led by industry veterans with deep expertise in e-commerce, international trade, and emerging markets.',
                    icon: <Users className="w-6 h-6" />,
                    color: 'text-red-600'
                  },
                  {
                    title: 'Scalable Technology Platform',
                    description: 'Proprietary technology stack built for scale, with AI-powered features enhancing user experience and operational efficiency.',
                    icon: <Server className="w-6 h-6" />,
                    color: 'text-indigo-600'
                  }
                ].map((highlight, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${highlight.color.replace('text-', 'bg-')}/10`}>
                          <div className={highlight.color}>{highlight.icon}</div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                            {highlight.title}
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Investor Documents */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Investor Documents
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Access our latest financial reports and investor presentations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {investorDocuments.map((document, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                            {document.title}
                          </h3>
                          <span className="text-xs text-neutral-500">{document.date}</span>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                          {document.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="primary" size="sm">{document.type}</Badge>
                            <span className="text-xs text-neutral-500">{document.size}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<Download className="w-4 h-4" />}
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="text-center mt-8">
              <Button
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                View All Documents
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Leadership Team */}
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
                  Leadership Team
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Meet the experienced team driving NubiaGo's growth and innovation
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {leadershipTeam.map((leader, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg" className="text-center">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100 mb-1">
                        {leader.name}
                      </h3>
                      <p className="text-green-600 font-medium text-sm mb-3">
                        {leader.role}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                        {leader.bio}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600"
                      >
                        Full Bio
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Investor Contact */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                      Investor Relations Contact
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      For investor inquiries, please contact our Investor Relations team. We're committed to transparent and timely communication with our investors and the financial community.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg">
                          <Mail className="w-5 h-5" />
                        </div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          investors@nubiago.com
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg">
                          <Phone className="w-5 h-5" />
                        </div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          +90 212 XXX XXXX
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/3">
                    <Button 
                      variant="primary" 
                      size="lg"
                      fullWidth
                      className="bg-green-600 hover:bg-green-700"
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                    >
                      Contact IR Team
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

// Custom Truck Icon
const Truck: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M1 3h15v13H1z"></path>
    <path d="M16 8h4l3 3v5h-7V8z"></path>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

// Custom Server Icon
const Server: React.FC<{ className?: string }> = ({ className }) => (
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
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    <line x1="6" y1="6" x2="6.01" y2="6"></line>
    <line x1="6" y1="18" x2="6.01" y2="18"></line>
  </svg>
);

export default InvestorsPage;