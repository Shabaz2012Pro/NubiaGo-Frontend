import React from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Recycle, 
  Globe, 
  Users, 
  Heart, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Award,
  Truck,
  Package,
  Shield
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const SustainabilityPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Sustainability', current: true }
  ];

  const initiatives = [
    {
      title: 'Carbon-Neutral Shipping',
      description: 'We offset 100% of carbon emissions from our shipping operations through verified carbon offset projects.',
      icon: <Truck className="w-8 h-8" />,
      color: 'text-green-500',
      metric: '5,000+ tons',
      metricLabel: 'CO₂ offset in 2023'
    },
    {
      title: 'Sustainable Packaging',
      description: 'All our packaging materials are made from recycled or biodegradable materials.',
      icon: <Package className="w-8 h-8" />,
      color: 'text-blue-500',
      metric: '90%',
      metricLabel: 'Plastic reduction'
    },
    {
      title: 'Ethical Sourcing',
      description: 'We verify that all suppliers meet our strict ethical and environmental standards.',
      icon: <Shield className="w-8 h-8" />,
      color: 'text-purple-500',
      metric: '100%',
      metricLabel: 'Verified suppliers'
    },
    {
      title: 'Community Impact',
      description: 'We invest in education and entrepreneurship programs in the communities we serve.',
      icon: <Users className="w-8 h-8" />,
      color: 'text-amber-500',
      metric: '$500K+',
      metricLabel: 'Invested in 2023'
    }
  ];

  const goals = [
    {
      year: '2025',
      goals: [
        'Achieve 100% carbon-neutral operations',
        'Eliminate single-use plastics from all packaging',
        'Ensure 50% of suppliers have sustainability certifications'
      ]
    },
    {
      year: '2027',
      goals: [
        'Power all offices with 100% renewable energy',
        'Reduce water usage in operations by 30%',
        'Launch circular economy program for product returns'
      ]
    },
    {
      year: '2030',
      goals: [
        'Net-zero emissions across entire value chain',
        'Zero waste to landfill from all operations',
        '100% of suppliers meeting sustainability standards'
      ]
    }
  ];

  const reports = [
    {
      title: 'Sustainability Report 2023',
      description: 'Our comprehensive annual report on environmental and social impact',
      date: 'March 15, 2024',
      fileSize: '5.2 MB',
      link: '#'
    },
    {
      title: 'Carbon Footprint Analysis',
      description: 'Detailed breakdown of our carbon emissions and reduction strategies',
      date: 'January 30, 2024',
      fileSize: '3.8 MB',
      link: '#'
    },
    {
      title: 'Social Impact Assessment',
      description: 'Analysis of our community programs and their outcomes',
      date: 'December 10, 2023',
      fileSize: '4.5 MB',
      link: '#'
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
                <Leaf className="w-4 h-4 mr-2" />
                Sustainability
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">Building a Sustainable Future</h1>
              
              <p className="text-xl text-green-100 mb-6">
                At NubiaGo, sustainability isn't just a goal—it's a core part of our business. We're committed to responsible practices that benefit people and the planet.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                  <Leaf className="w-4 h-4" />
                  <span className="text-sm">Environmental Responsibility</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Social Impact</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Global Citizenship</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Our Approach to Sustainability
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                We believe that business can be a force for good. Our sustainability strategy focuses on three key pillars:
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full inline-flex items-center justify-center mb-4">
                      <Leaf className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      Environmental Stewardship
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Minimizing our environmental footprint through carbon-neutral shipping, sustainable packaging, and energy-efficient operations.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full inline-flex items-center justify-center mb-4">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      Social Responsibility
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Supporting the communities we serve through education, entrepreneurship programs, and fair labor practices.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-full inline-flex items-center justify-center mb-4">
                      <Building className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      Governance & Ethics
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Maintaining the highest standards of business ethics, transparency, and accountability in all our operations.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                  <p className="text-neutral-600 dark:text-neutral-400 text-center">
                    Our sustainability initiatives are aligned with the United Nations Sustainable Development Goals (SDGs), particularly focusing on:
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {[
                      { number: 8, name: 'Decent Work and Economic Growth' },
                      { number: 9, name: 'Industry, Innovation and Infrastructure' },
                      { number: 12, name: 'Responsible Consumption and Production' },
                      { number: 13, name: 'Climate Action' },
                      { number: 17, name: 'Partnerships for the Goals' }
                    ].map((goal) => (
                      <Badge key={goal.number} variant="primary" size="sm" className="flex items-center space-x-1">
                        <span className="font-bold">SDG {goal.number}</span>
                        <span className="hidden sm:inline">: {goal.name}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Key Initiatives */}
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
                  Key Sustainability Initiatives
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Our ongoing efforts to create positive environmental and social impact
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {initiatives.map((initiative, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg" className="h-full">
                      <div className={`${initiative.color} mb-6 flex justify-center`}>
                        {initiative.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 text-center">
                        {initiative.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-center mb-4">
                        {initiative.description}
                      </p>
                      <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700 text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {initiative.metric}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {initiative.metricLabel}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sustainability Goals */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Our Sustainability Goals
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Ambitious targets to guide our journey toward a more sustainable future
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {goals.map((goalSet, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="text-center mb-6">
                      <Badge variant="primary" size="lg" className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                        {goalSet.year}
                      </Badge>
                    </div>
                    <ul className="space-y-4">
                      {goalSet.goals.map((goal, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-neutral-600 dark:text-neutral-400">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Certifications */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Our Certifications
                </h2>
                <p className="text-xl text-green-100 max-w-2xl mx-auto">
                  Recognized for our commitment to sustainability
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    name: 'Carbon Trust Standard',
                    description: 'Certified for reducing carbon emissions year-on-year',
                    icon: <Leaf className="w-12 h-12" />
                  },
                  {
                    name: 'ISO 14001',
                    description: 'Environmental Management System certification',
                    icon: <Globe className="w-12 h-12" />
                  },
                  {
                    name: 'B Corp Certified',
                    description: 'Meeting the highest standards of social and environmental performance',
                    icon: <Award className="w-12 h-12" />
                  },
                  {
                    name: 'EcoVadis Gold',
                    description: 'Top 5% of companies assessed for sustainability practices',
                    icon: <Award className="w-12 h-12" />
                  }
                ].map((cert, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center h-full">
                      <div className="text-white mb-4 flex justify-center">
                        {cert.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {cert.name}
                      </h3>
                      <p className="text-green-100">
                        {cert.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sustainability Reports */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Sustainability Reports
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Transparent reporting on our environmental and social impact
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reports.map((report, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                          <FileText className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                            {report.title}
                          </h3>
                          <span className="text-xs text-neutral-500">{report.date}</span>
                        </div>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4 flex-1">
                        {report.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm text-neutral-500">{report.fileSize}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<Download className="w-4 h-4" />}
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Get Involved */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 py-16 mb-16">
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
                  Get Involved
                </h2>
                <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                  Join us in our sustainability journey. Together, we can make a difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="bg-white text-green-600 hover:bg-neutral-100"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Partner With Us
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Custom Building Icon
const Building: React.FC<{ className?: string }> = ({ className }) => (
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
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="9" y1="22" x2="9" y2="2"></line>
    <line x1="15" y1="22" x2="15" y2="2"></line>
  </svg>
);

// Custom FileText Icon
const FileText: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

export default SustainabilityPage;