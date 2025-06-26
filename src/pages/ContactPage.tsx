import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle, Headphones, Globe, Users, Award, Shield } from 'lucide-react';
import ContactForm from '../components/organisms/ContactForm';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import { clsx } from 'clsx';

interface ContactPageProps {
  className?: string;
}

const contactMethods = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Phone Support',
    description: 'Speak directly with our team',
    contact: '+90 212 XXX XXXX',
    availability: '24/7 Available',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Email Support',
    description: 'Send us a detailed message',
    contact: 'hello@nubiago.com',
    availability: 'Response within 2 hours',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: 'Live Chat',
    description: 'Chat with our support team',
    contact: 'Start Live Chat',
    availability: 'Available 9 AM - 6 PM GMT',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: 'WhatsApp',
    description: 'Message us on WhatsApp',
    contact: '+90 XXX XXX XXXX',
    availability: 'Quick responses',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  }
];

const offices = [
  {
    city: 'Istanbul',
    country: 'Turkey',
    address: 'Maslak Mahallesi, Büyükdere Cd. No:123, 34485 Sarıyer/İstanbul',
    phone: '+90 212 XXX XXXX',
    email: 'istanbul@nubiago.com',
    flag: '🇹🇷',
    timezone: 'GMT+3',
    manager: 'Ahmet Yılmaz',
    specialties: ['Electronics', 'Fashion', 'Home Appliances']
  },
  {
    city: 'Lagos',
    country: 'Nigeria',
    address: 'Victoria Island, Lagos State, Nigeria',
    phone: '+234 XXX XXX XXXX',
    email: 'lagos@nubiago.com',
    flag: '🇳🇬',
    timezone: 'GMT+1',
    manager: 'Adaora Okafor',
    specialties: ['Market Development', 'Customer Relations', 'Logistics']
  }
];

const teamMembers = [
  {
    name: 'Mehmet Özkan',
    role: 'CEO & Founder',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    bio: '15+ years in international trade',
    location: 'Istanbul, Turkey'
  },
  {
    name: 'Fatima Al-Rashid',
    role: 'Head of African Markets',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    bio: 'Expert in African market dynamics',
    location: 'Cairo, Egypt'
  },
  {
    name: 'Kwame Asante',
    role: 'Business Development Director',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    bio: 'Connecting suppliers with buyers',
    location: 'Accra, Ghana'
  },
  {
    name: 'Ayşe Demir',
    role: 'Quality Assurance Manager',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    bio: 'Ensuring premium product standards',
    location: 'Istanbul, Turkey'
  }
];

const ContactPage: React.FC<ContactPageProps> = ({ className }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <div className={clsx('min-h-screen bg-white dark:bg-neutral-900', className)}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
              Contact Our Team
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
              Ready to start your trading journey? Our experts are here to help you succeed in connecting Turkish suppliers with African markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="gold" size="lg" className="text-lg px-6 py-3">
                <Globe className="w-5 h-5 mr-2" />
                54 African Countries Served
              </Badge>
              <Badge variant="primary" size="lg" className="text-lg px-6 py-3 bg-white/20">
                <Users className="w-5 h-5 mr-2" />
                5,000+ Verified Suppliers
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <ContactForm />
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Methods */}
              <Card variant="default" padding="lg">
                <h3 className="font-display font-bold text-2xl text-neutral-900 dark:text-neutral-100 mb-6">
                  Get in Touch
                </h3>
                
                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={clsx(
                        'p-4 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-lg',
                        method.bgColor
                      )}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={clsx('p-3 rounded-lg bg-white dark:bg-neutral-800 shadow-sm', method.color)}>
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                            {method.title}
                          </h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                            {method.description}
                          </p>
                          <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                            {method.contact}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {method.availability}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Business Hours */}
              <Card variant="default" padding="lg">
                <h3 className="font-display font-bold text-xl text-neutral-900 dark:text-neutral-100 mb-6">
                  Business Hours
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Monday - Friday</span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">9:00 AM - 6:00 PM GMT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Saturday</span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">10:00 AM - 4:00 PM GMT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Sunday</span>
                    <span className="text-sm font-medium text-red-600">Closed</span>
                  </div>
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                        Emergency support available 24/7 for urgent matters
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 dark:text-neutral-100 mb-4">
              Our Global Offices
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Strategically located to serve both Turkish suppliers and African markets
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card variant="default" padding="lg" className="h-full">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-3xl">{office.flag}</span>
                    <div>
                      <h3 className="font-display font-bold text-xl text-neutral-900 dark:text-neutral-100">
                        {office.city}, {office.country}
                      </h3>
                      <p className="text-sm text-neutral-500">{office.timezone}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">{office.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-neutral-400" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">{office.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-neutral-400" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">{office.email}</span>
                    </div>
                    
                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                        Office Manager: {office.manager}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {office.specialties.map((specialty) => (
                          <Badge key={specialty} variant="primary" size="sm">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 dark:text-neutral-100 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Experienced professionals dedicated to connecting Turkish excellence with African markets
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="default" padding="lg" className="text-center h-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-red-600 font-medium text-sm mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                    {member.bio}
                  </p>
                  <p className="text-xs text-neutral-500">
                    📍 {member.location}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display font-bold text-3xl mb-8">
              Why Choose NubiaGO?
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div variants={itemVariants} className="text-center">
                <div className="text-4xl font-bold mb-2">10M+</div>
                <div className="text-red-200">Products Available</div>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center">
                <div className="text-4xl font-bold mb-2">5,000+</div>
                <div className="text-red-200">Verified Suppliers</div>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-red-200">Customer Satisfaction</div>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-red-200">Customer Support</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;