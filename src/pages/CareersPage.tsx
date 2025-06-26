import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  Globe, 
  TrendingUp, 
  Heart, 
  Star,
  MapPin,
  Calendar,
  Search,
  ArrowRight,
  CheckCircle,
  Award,
  Coffee
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const CareersPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Careers', current: true }
  ];

  const jobOpenings = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Istanbul, Turkey',
      type: 'Full-time',
      posted: '2 days ago',
      description: 'We are looking for a Senior Frontend Developer to join our team and help build our next-generation e-commerce platform.',
      requirements: ['5+ years of experience with React', 'Strong TypeScript skills', 'Experience with state management libraries', 'E-commerce experience a plus']
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Istanbul, Turkey',
      type: 'Full-time',
      posted: '1 week ago',
      description: 'Join our product team to help shape the future of cross-continental e-commerce.',
      requirements: ['3+ years of product management experience', 'Experience with e-commerce platforms', 'Strong analytical skills', 'Excellent communication skills']
    },
    {
      title: 'Business Development Manager - Africa',
      department: 'Business Development',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      posted: '3 days ago',
      description: 'Help us expand our presence in African markets by developing strategic partnerships and business opportunities.',
      requirements: ['5+ years of business development experience', 'Deep understanding of African markets', 'Strong network in the region', 'Experience in e-commerce or retail']
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      posted: '5 days ago',
      description: 'Create beautiful, intuitive user experiences for our marketplace platform.',
      requirements: ['3+ years of UX/UI design experience', 'Proficiency in Figma and design tools', 'Experience designing for e-commerce', 'Portfolio showcasing relevant work']
    },
    {
      title: 'Supply Chain Specialist',
      department: 'Operations',
      location: 'Istanbul, Turkey',
      type: 'Full-time',
      posted: '1 week ago',
      description: 'Optimize our supply chain operations between Turkey and African markets.',
      requirements: ['3+ years in supply chain management', 'Experience with international logistics', 'Knowledge of customs and import/export regulations', 'Strong problem-solving skills']
    },
    {
      title: 'Customer Support Specialist',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      posted: '3 days ago',
      description: 'Provide exceptional support to our customers across Africa.',
      requirements: ['2+ years in customer support', 'Fluent in English and French', 'Experience with e-commerce platforms', 'Excellent communication skills']
    }
  ];

  const benefits = [
    {
      title: 'Competitive Salary',
      description: 'We offer competitive compensation packages benchmarked against industry standards.',
      icon: <Award className="w-8 h-8" />,
      color: 'text-green-500'
    },
    {
      title: 'Health Insurance',
      description: 'Comprehensive health, dental, and vision insurance for you and your dependents.',
      icon: <Heart className="w-8 h-8" />,
      color: 'text-red-500'
    },
    {
      title: 'Remote Work',
      description: 'Flexible work arrangements with remote options available for many positions.',
      icon: <Globe className="w-8 h-8" />,
      color: 'text-blue-500'
    },
    {
      title: 'Professional Development',
      description: 'Continuous learning opportunities with education stipends and conference budgets.',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'text-purple-500'
    },
    {
      title: 'Team Retreats',
      description: 'Regular team retreats to connect, collaborate, and celebrate our achievements.',
      icon: <Users className="w-8 h-8" />,
      color: 'text-amber-500'
    },
    {
      title: 'Wellness Program',
      description: 'Comprehensive wellness program including gym memberships and mental health support.',
      icon: <Coffee className="w-8 h-8" />,
      color: 'text-teal-500'
    }
  ];

  const values = [
    {
      title: 'Customer Obsession',
      description: 'We start with the customer and work backwards. We work vigorously to earn and keep customer trust.',
      icon: <Star className="w-6 h-6" />
    },
    {
      title: 'Innovation',
      description: 'We constantly seek new ways to solve problems and create value for our customers and partners.',
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: 'Integrity',
      description: 'We are honest, transparent, and committed to doing what\'s best for our customers and our company.',
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: 'Diversity & Inclusion',
      description: 'We value diverse perspectives and create an environment where everyone can do their best work.',
      icon: <Users className="w-6 h-6" />
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
        <section className="bg-gradient-to-r from-purple-600 to-purple-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <Briefcase className="w-4 h-4 mr-2" />
                Join Our Team
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">Careers at NubiaGo</h1>
              
              <p className="text-xl text-purple-100 mb-6">
                Join our mission to connect Turkish excellence with African markets. Build your career with a purpose-driven company that's transforming cross-continental trade.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Diverse Team</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Global Impact</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Fast Growth</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job Search */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Find Your Perfect Role
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Join our team of passionate professionals building the bridge between Turkish suppliers and African markets
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-12">
              <Card variant="default" padding="lg">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search for jobs..."
                      leftIcon={<Search className="w-4 h-4" />}
                    />
                  </div>
                  <div className="w-full md:w-auto">
                    <select className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800">
                      <option value="">All Departments</option>
                      <option value="engineering">Engineering</option>
                      <option value="product">Product</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="operations">Operations</option>
                      <option value="business">Business Development</option>
                    </select>
                  </div>
                  <div className="w-full md:w-auto">
                    <select className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800">
                      <option value="">All Locations</option>
                      <option value="istanbul">Istanbul, Turkey</option>
                      <option value="lagos">Lagos, Nigeria</option>
                      <option value="remote">Remote</option>
                    </select>
                  </div>
                  <Button
                    variant="primary"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Search
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Job Listings */}
            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                            {job.title}
                          </h3>
                          <Badge variant="primary" size="sm">{job.department}</Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Posted {job.posted}</span>
                          </div>
                        </div>
                        
                        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                          {job.description}
                        </p>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Requirements:
                          </p>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                            {job.requirements.map((req, i) => (
                              <li key={i} className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <Button
                          variant="primary"
                          rightIcon={<ArrowRight className="w-4 h-4" />}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          Apply Now
                        </Button>
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
                View All Openings
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Benefits */}
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
                  Why Work With Us
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  We offer competitive compensation and benefits to help you thrive both personally and professionally
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg" className="h-full">
                      <div className={`${benefit.color} mb-6 flex justify-center`}>
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 text-center">
                        {benefit.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-center">
                        {benefit.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Values */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Our Values
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg text-purple-600">
                        {value.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                          {value.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Testimonials */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-700 py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  What Our Team Says
                </h2>
                <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                  Hear from the people who make NubiaGo an amazing place to work
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    quote: "Working at NubiaGo has been an incredible journey. I've grown professionally while making a real impact connecting Turkish suppliers with African markets.",
                    name: "Ayşe Demir",
                    role: "Senior Product Manager",
                    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
                  },
                  {
                    quote: "The culture at NubiaGo is truly special. We're a diverse team united by our mission to transform cross-continental trade.",
                    name: "Kwame Asante",
                    role: "Business Development Lead",
                    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
                  },
                  {
                    quote: "I love that we're building technology that creates real economic opportunities across Africa while showcasing the best of Turkish craftsmanship.",
                    name: "Fatima Al-Rashid",
                    role: "Software Engineer",
                    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
                  }
                ].map((testimonial, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
                      <div className="flex flex-col h-full">
                        <p className="text-white mb-6 flex-1">
                          "{testimonial.quote}"
                        </p>
                        <div className="flex items-center space-x-3">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-white">{testimonial.name}</p>
                            <p className="text-sm text-purple-200">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Application Process */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Our Application Process
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                What to expect when you apply for a role at NubiaGo
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-purple-200 dark:bg-purple-800"></div>
              
              <div className="space-y-12">
                {[
                  { title: 'Application Review', description: 'Our recruitment team reviews your application and resume' },
                  { title: 'Initial Interview', description: 'A 30-minute call with a recruiter to discuss your background and the role' },
                  { title: 'Technical Assessment', description: 'A skills assessment relevant to the position you\'re applying for' },
                  { title: 'Team Interviews', description: 'Meet with potential team members and managers' },
                  { title: 'Final Interview', description: 'A conversation with a senior leader about your fit with our culture and mission' },
                  { title: 'Offer', description: 'If successful, you\'ll receive an offer to join our team' }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative"
                  >
                    <div className="flex items-center">
                      <div className={clsx(
                        "w-1/2",
                        index % 2 === 0 ? "pr-12 text-right" : "order-2 pl-12"
                      )}>
                        <Card variant="default" padding="lg">
                          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                            {step.title}
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {step.description}
                          </p>
                        </Card>
                      </div>
                      
                      <div className="relative z-10 w-10 h-10 bg-purple-600 rounded-full border-4 border-white dark:border-neutral-900 flex items-center justify-center text-white">
                        <span className="font-bold">{index + 1}</span>
                      </div>
                      
                      <div className={clsx(
                        "w-1/2",
                        index % 2 === 0 ? "order-2 pl-12" : "pr-12"
                      )}></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-700 py-16 mb-16">
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
                  Ready to Join Our Team?
                </h2>
                <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                  Explore our open positions and take the next step in your career journey with NubiaGo.
                </p>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-neutral-100"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  View All Job Openings
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Custom Zap Icon
const Zap: React.FC<{ className?: string }> = ({ className }) => (
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
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

export default CareersPage;