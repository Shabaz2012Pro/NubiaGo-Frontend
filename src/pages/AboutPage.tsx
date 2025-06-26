import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Globe, 
  Award, 
  TrendingUp, 
  Heart, 
  Shield, 
  Target,
  Zap,
  Star,
  MapPin,
  Calendar,
  Building
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';

const AboutPage: React.FC = () => {
  const stats = [
    { icon: <Users className="w-8 h-8" />, value: '1M+', label: 'Happy Customers' },
    { icon: <Globe className="w-8 h-8" />, value: '54', label: 'African Countries' },
    { icon: <Award className="w-8 h-8" />, value: '5,000+', label: 'Verified Suppliers' },
    { icon: <TrendingUp className="w-8 h-8" />, value: '$50M+', label: 'Trade Volume' }
  ];

  const values = [
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Quality First',
      description: 'We ensure every product meets the highest standards of Turkish craftsmanship and quality.',
      color: 'text-red-500'
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Trust & Security',
      description: 'All suppliers are verified and transactions are secured with enterprise-grade protection.',
      color: 'text-green-500'
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Customer Success',
      description: 'Your success is our mission. We provide 24/7 support to ensure smooth trading experiences.',
      color: 'text-blue-500'
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology to make international trade simple and efficient.',
      color: 'text-purple-500'
    }
  ];

  const team = [
    {
      name: 'Mehmet Özkan',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: '15+ years in international trade and e-commerce',
      location: 'Istanbul, Turkey'
    },
    {
      name: 'Fatima Al-Rashid',
      role: 'Head of African Markets',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Expert in African market dynamics and business development',
      location: 'Cairo, Egypt'
    },
    {
      name: 'Kwame Asante',
      role: 'Business Development Director',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Connecting suppliers with buyers across Africa',
      location: 'Accra, Ghana'
    },
    {
      name: 'Ayşe Demir',
      role: 'Quality Assurance Manager',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Ensuring premium product standards and supplier verification',
      location: 'Istanbul, Turkey'
    }
  ];

  const milestones = [
    { year: '2020', event: 'NubiaGo Founded', description: 'Started with a vision to connect Turkish suppliers with African markets' },
    { year: '2021', event: 'First 1,000 Suppliers', description: 'Reached our first milestone of verified Turkish suppliers' },
    { year: '2022', event: 'African Expansion', description: 'Expanded to 25 African countries with local partnerships' },
    { year: '2023', event: '1M+ Customers', description: 'Celebrated serving over 1 million customers across Africa' },
    { year: '2024', event: 'AI Integration', description: 'Launched AI-powered recommendations and visual search' }
  ];

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
                About NubiaGo
              </h1>
              <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
                Bridging Turkish excellence with African markets through innovation, trust, and quality
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="gold" size="lg" className="text-lg px-6 py-3">
                  <Globe className="w-5 h-5 mr-2" />
                  Connecting Two Continents
                </Badge>
                <Badge variant="primary" size="lg" className="text-lg px-6 py-3 bg-white/20">
                  <Star className="w-5 h-5 mr-2" />
                  Premium Marketplace
                </Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="text-red-600 mb-4 flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg" className="h-full">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                    Our Mission
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    To create the world's most trusted marketplace connecting Turkish suppliers with African markets, 
                    enabling seamless trade relationships that drive economic growth and prosperity across both continents.
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    We believe in the power of quality Turkish products to transform African markets while providing 
                    Turkish businesses with unprecedented access to one of the world's fastest-growing economic regions.
                  </p>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg" className="h-full">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                    Our Vision
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    To become the leading platform for Turkey-Africa trade, facilitating $1 billion in annual trade 
                    volume by 2030 while maintaining our commitment to quality, trust, and innovation.
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    We envision a future where distance is no barrier to trade, where African businesses have 
                    direct access to premium Turkish products, and where technology makes international commerce 
                    as simple as local shopping.
                  </p>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
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
                Our Values
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="text-center h-full">
                    <div className={`${value.color} mb-6 flex justify-center`}>
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
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
                Our Journey
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Key milestones in our mission to connect Turkish suppliers with African markets
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-red-200 dark:bg-red-800"></div>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-12"
              >
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className="w-1/2 pr-8">
                      {index % 2 === 0 && (
                        <Card variant="default" padding="lg">
                          <div className="flex items-center space-x-3 mb-3">
                            <Calendar className="w-5 h-5 text-red-600" />
                            <span className="text-2xl font-bold text-red-600">{milestone.year}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                            {milestone.event}
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {milestone.description}
                          </p>
                        </Card>
                      )}
                    </div>
                    
                    <div className="relative z-10 w-4 h-4 bg-red-600 rounded-full border-4 border-white dark:border-neutral-900"></div>
                    
                    <div className="w-1/2 pl-8">
                      {index % 2 === 1 && (
                        <Card variant="default" padding="lg">
                          <div className="flex items-center space-x-3 mb-3">
                            <Calendar className="w-5 h-5 text-red-600" />
                            <span className="text-2xl font-bold text-red-600">{milestone.year}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                            {milestone.event}
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {milestone.description}
                          </p>
                        </Card>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team */}
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
                Meet Our Team
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Passionate professionals dedicated to connecting Turkish excellence with African markets
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {team.map((member, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="text-center h-full">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-red-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                      {member.bio}
                    </p>
                    <div className="flex items-center justify-center space-x-1 text-xs text-neutral-500">
                      <MapPin className="w-3 h-3" />
                      <span>{member.location}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
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
                Ready to Join Our Journey?
              </h2>
              <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                Whether you're a supplier looking to expand into African markets or a buyer seeking quality Turkish products, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-red-600 hover:bg-neutral-100">
                  Become a Supplier
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600">
                  Start Shopping
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;