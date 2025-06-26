import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Heart, 
  Zap, 
  Globe, 
  Award,
  ArrowRight,
  Mail,
  Send,
  Building,
  Coffee,
  Laptop,
  Plane
} from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import TextArea from '../components/atoms/TextArea';

const CareersPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: ''
  });

  const benefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness programs',
      color: 'text-red-500'
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: 'Work-Life Balance',
      description: 'Flexible hours and remote work options',
      color: 'text-blue-500'
    },
    {
      icon: <Laptop className="w-8 h-8" />,
      title: 'Latest Technology',
      description: 'Top-tier equipment and tools for maximum productivity',
      color: 'text-green-500'
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: 'Travel Opportunities',
      description: 'International assignments and conference attendance',
      color: 'text-purple-500'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Professional Growth',
      description: 'Continuous learning and career development programs',
      color: 'text-gold-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Diverse Team',
      description: 'Work with talented people from around the world',
      color: 'text-indigo-500'
    }
  ];

  const openPositions = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Istanbul, Turkey',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Join our engineering team to build the next generation of our marketplace platform using React, TypeScript, and modern web technologies.',
      requirements: [
        '5+ years of React and TypeScript experience',
        'Experience with modern CSS frameworks (Tailwind CSS)',
        'Knowledge of state management (Redux, Zustand)',
        'Experience with testing frameworks (Jest, Cypress)',
        'Strong understanding of web performance optimization'
      ],
      responsibilities: [
        'Develop and maintain user-facing features',
        'Collaborate with design and backend teams',
        'Optimize applications for maximum speed and scalability',
        'Participate in code reviews and technical discussions',
        'Mentor junior developers'
      ]
    },
    {
      id: '2',
      title: 'Business Development Manager - Africa',
      department: 'Business Development',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Lead our expansion efforts across African markets, building relationships with key stakeholders and driving business growth.',
      requirements: [
        '3+ years of business development experience',
        'Deep understanding of African markets',
        'Excellent communication and negotiation skills',
        'Experience in e-commerce or marketplace platforms',
        'Fluency in English and local languages preferred'
      ],
      responsibilities: [
        'Identify and pursue new business opportunities',
        'Build and maintain relationships with key partners',
        'Develop market entry strategies for new countries',
        'Collaborate with marketing and product teams',
        'Analyze market trends and competitive landscape'
      ]
    },
    {
      id: '3',
      title: 'Product Manager',
      department: 'Product',
      location: 'Istanbul, Turkey',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Drive product strategy and execution for our marketplace platform, working closely with engineering, design, and business teams.',
      requirements: [
        '4+ years of product management experience',
        'Experience with marketplace or e-commerce platforms',
        'Strong analytical and problem-solving skills',
        'Experience with user research and data analysis',
        'Excellent communication and leadership skills'
      ],
      responsibilities: [
        'Define product roadmap and strategy',
        'Gather and prioritize product requirements',
        'Work with engineering teams to deliver features',
        'Analyze user behavior and market trends',
        'Collaborate with stakeholders across the organization'
      ]
    },
    {
      id: '4',
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Ensure our customers achieve their business goals through our platform, providing exceptional support and guidance.',
      requirements: [
        '2+ years of customer success experience',
        'Experience in B2B or marketplace environments',
        'Strong communication and problem-solving skills',
        'Ability to work with diverse, international customers',
        'Fluency in English and Arabic preferred'
      ],
      responsibilities: [
        'Onboard new customers and ensure successful adoption',
        'Provide ongoing support and guidance to customers',
        'Identify opportunities for account growth',
        'Gather customer feedback and work with product team',
        'Develop customer success processes and best practices'
      ]
    }
  ];

  const updateForm = (field: string, value: string) => {
    setApplicationForm(prev => ({ ...prev, [field]: value }));
  };

  const submitApplication = () => {
    console.log('Application submitted:', applicationForm);
    // Here you would typically send the application to your backend
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
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
                Join Our Mission
              </h1>
              <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
                Help us connect Turkish excellence with African markets. Build your career while making a global impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="gold" size="lg" className="text-lg px-6 py-3">
                  <Briefcase className="w-5 h-5 mr-2" />
                  {openPositions.length} Open Positions
                </Badge>
                <Badge variant="primary" size="lg" className="text-lg px-6 py-3 bg-white/20">
                  <Globe className="w-5 h-5 mr-2" />
                  Remote-First Culture
                </Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Why Join NubiaGO?
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                We're building the future of international trade. Join us and be part of something extraordinary.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="text-center h-full">
                    <div className={`${benefit.color} mb-6 flex justify-center`}>
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Open Positions
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Find your next opportunity and help us shape the future of Turkey-Africa trade
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {openPositions.map((job) => (
                <motion.div key={job.id} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                            {job.title}
                          </h3>
                          <Badge variant="primary" size="sm">{job.department}</Badge>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.experience}</span>
                          </div>
                        </div>
                        
                        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                          {job.description}
                        </p>
                        
                        {selectedJob === job.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-neutral-200 dark:border-neutral-700 pt-6 mt-6"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                                  Requirements
                                </h4>
                                <ul className="space-y-2">
                                  {job.requirements.map((req, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-sm text-neutral-600 dark:text-neutral-400">{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                                  Responsibilities
                                </h4>
                                <ul className="space-y-2">
                                  {job.responsibilities.map((resp, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-sm text-neutral-600 dark:text-neutral-400">{resp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                        >
                          {selectedJob === job.id ? 'Hide Details' : 'View Details'}
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            updateForm('position', job.title);
                            document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Application Form */}
        <section id="application-form" className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Apply for a Position
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                Ready to join our team? Fill out the form below and we'll get back to you soon.
              </p>
            </motion.div>

            <Card variant="default" padding="lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={applicationForm.name}
                  onChange={(value) => updateForm('name', value)}
                  required
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your@email.com"
                  value={applicationForm.email}
                  onChange={(value) => updateForm('email', value)}
                  required
                />
                
                <Input
                  label="Phone Number"
                  placeholder="+1 (555) 123-4567"
                  value={applicationForm.phone}
                  onChange={(value) => updateForm('phone', value)}
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Position
                  </label>
                  <select
                    value={applicationForm.position}
                    onChange={(e) => updateForm('position', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"
                  >
                    <option value="">Select a position</option>
                    {openPositions.map((job) => (
                      <option key={job.id} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <Input
                  label="Years of Experience"
                  placeholder="e.g., 5 years"
                  value={applicationForm.experience}
                  onChange={(value) => updateForm('experience', value)}
                  required
                />
              </div>
              
              <div className="mt-6">
                <TextArea
                  label="Cover Letter"
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  value={applicationForm.coverLetter}
                  onChange={(value) => updateForm('coverLetter', value)}
                  rows={6}
                  maxLength={1000}
                />
              </div>
              
              <div className="mt-8">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={submitApplication}
                  leftIcon={<Send className="w-5 h-5" />}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Submit Application
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Don't See the Right Position?
              </h2>
              <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-red-600 hover:bg-neutral-100"
                leftIcon={<Mail className="w-5 h-5" />}
              >
                Send Your Resume
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CareersPage;