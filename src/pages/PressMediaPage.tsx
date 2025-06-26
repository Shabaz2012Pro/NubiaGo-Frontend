import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Image, 
  Download, 
  Mail, 
  Phone, 
  Calendar, 
  ArrowRight,
  Globe,
  Award,
  TrendingUp,
  Users,
  ExternalLink
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const PressMediaPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Press & Media', current: true }
  ];

  const pressReleases = [
    {
      title: 'NubiaGo Raises $10M Series A to Expand African Market Presence',
      date: 'June 15, 2024',
      summary: 'Funding will accelerate growth and enhance logistics infrastructure connecting Turkish suppliers with African markets.',
      category: 'Funding',
      link: '#'
    },
    {
      title: 'NubiaGo Launches Operations in 5 New African Countries',
      date: 'May 22, 2024',
      summary: 'Expansion brings total market coverage to 25 African countries, with plans to reach all 54 by 2026.',
      category: 'Expansion',
      link: '#'
    },
    {
      title: 'NubiaGo Partners with Major Turkish Manufacturers Association',
      date: 'April 10, 2024',
      summary: 'Strategic partnership will bring 500+ new verified suppliers to the platform, focusing on electronics and home goods.',
      category: 'Partnership',
      link: '#'
    },
    {
      title: 'NubiaGo Introduces AI-Powered Product Recommendations',
      date: 'March 5, 2024',
      summary: 'New feature uses machine learning to provide personalized product recommendations based on regional preferences.',
      category: 'Product',
      link: '#'
    }
  ];

  const mediaAssets = [
    {
      title: 'NubiaGo Logo Pack',
      description: 'Official logos in various formats (PNG, SVG, EPS)',
      type: 'Brand Assets',
      fileSize: '5.2 MB',
      link: '#'
    },
    {
      title: 'Executive Headshots',
      description: 'High-resolution photos of NubiaGo leadership team',
      type: 'Images',
      fileSize: '12.8 MB',
      link: '#'
    },
    {
      title: 'Product Images',
      description: 'Selection of marketplace product images for media use',
      type: 'Images',
      fileSize: '18.5 MB',
      link: '#'
    },
    {
      title: 'Company Fact Sheet',
      description: 'Key facts and figures about NubiaGo',
      type: 'Document',
      fileSize: '1.2 MB',
      link: '#'
    },
    {
      title: 'Brand Guidelines',
      description: 'Official brand guidelines and usage rules',
      type: 'Document',
      fileSize: '3.7 MB',
      link: '#'
    },
    {
      title: 'Office Photos',
      description: 'Images of NubiaGo offices in Istanbul and Lagos',
      type: 'Images',
      fileSize: '8.9 MB',
      link: '#'
    }
  ];

  const newsFeatures = [
    {
      title: 'How NubiaGo is Revolutionizing Turkey-Africa Trade',
      publication: 'TechCrunch',
      date: 'June 10, 2024',
      image: 'https://images.pexels.com/photos/6347707/pexels-photo-6347707.jpeg?auto=compress&cs=tinysrgb&w=300',
      link: '#'
    },
    {
      title: 'The Rise of Cross-Continental E-Commerce: NubiaGo Case Study',
      publication: 'Forbes Africa',
      date: 'May 18, 2024',
      image: 'https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg?auto=compress&cs=tinysrgb&w=300',
      link: '#'
    },
    {
      title: 'Turkish Exports to Africa Grow 35% Thanks to Digital Platforms',
      publication: 'Bloomberg',
      date: 'April 25, 2024',
      image: 'https://images.pexels.com/photos/3943882/pexels-photo-3943882.jpeg?auto=compress&cs=tinysrgb&w=300',
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
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <FileText className="w-4 h-4 mr-2" />
                Press & Media
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">NubiaGo Newsroom</h1>
              
              <p className="text-xl text-indigo-100 mb-6">
                Latest news, press releases, and media resources about NubiaGo's mission to connect Turkish suppliers with African markets.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <Button 
                  variant="secondary" 
                  className="bg-white text-indigo-600 hover:bg-neutral-100"
                >
                  Press Releases
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                >
                  Media Kit
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                      About NubiaGo
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      NubiaGo is a premium marketplace connecting Turkish suppliers with African markets. Founded in 2022, we've quickly grown to become the leading platform for cross-continental trade between Turkey and Africa.
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      Our mission is to simplify international trade by providing a secure, efficient platform that enables African businesses and consumers to access high-quality Turkish products while helping Turkish manufacturers expand their global footprint.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">5,000+</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">Verified Suppliers</div>
                      </div>
                      <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">25</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">African Countries</div>
                      </div>
                      <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">1M+</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">Active Users</div>
                      </div>
                      <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">$50M+</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">Annual GMV</div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
                      <img 
                        src="https://images.pexels.com/photos/6347707/pexels-photo-6347707.jpeg?auto=compress&cs=tinysrgb&w=800" 
                        alt="NubiaGo Team" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
                        <img 
                          src="https://images.pexels.com/photos/3943882/pexels-photo-3943882.jpeg?auto=compress&cs=tinysrgb&w=300" 
                          alt="NubiaGo Office" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
                        <img 
                          src="https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg?auto=compress&cs=tinysrgb&w=300" 
                          alt="NubiaGo Products" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
                        <img 
                          src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300" 
                          alt="NubiaGo Team" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Press Releases */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  Press Releases
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  View All
                </Button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pressReleases.map((release, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="primary" size="sm">{release.category}</Badge>
                        <span className="text-sm text-neutral-500">{release.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                        {release.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4 flex-1">
                        {release.summary}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                        className="self-start"
                      >
                        Read More
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Media Coverage */}
        <section className="bg-neutral-50 dark:bg-neutral-800/30 py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="mb-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    In The News
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    View All Coverage
                  </Button>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newsFeatures.map((news, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg" className="h-full">
                      <div className="flex flex-col h-full">
                        <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden mb-4">
                          <img 
                            src={news.image} 
                            alt={news.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-indigo-600 dark:text-indigo-400">{news.publication}</span>
                          <span className="text-sm text-neutral-500">{news.date}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                          {news.title}
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          rightIcon={<ExternalLink className="w-4 h-4" />}
                          className="self-start mt-auto"
                        >
                          Read Article
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Media Assets */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Media Resources
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Download official NubiaGo assets for media use
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaAssets.map((asset, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                          {asset.type === 'Brand Assets' ? (
                            <Image className="w-6 h-6 text-indigo-600" />
                          ) : asset.type === 'Images' ? (
                            <Image className="w-6 h-6 text-indigo-600" />
                          ) : (
                            <FileText className="w-6 h-6 text-indigo-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                            {asset.title}
                          </h3>
                          <Badge variant="primary" size="sm">{asset.type}</Badge>
                        </div>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4 flex-1">
                        {asset.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-500">{asset.fileSize}</span>
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

        {/* Media Contact */}
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Media Contact
                </h2>
                <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                  For press inquiries, interview requests, or additional information
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg" className="max-w-3xl mx-auto">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                        Press Contact
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 rounded-lg">
                            <Mail className="w-5 h-5" />
                          </div>
                          <span className="text-neutral-600 dark:text-neutral-400">
                            press@nubiago.com
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 rounded-lg">
                            <Phone className="w-5 h-5" />
                          </div>
                          <span className="text-neutral-600 dark:text-neutral-400">
                            +90 212 XXX XXXX
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 rounded-lg">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <span className="text-neutral-600 dark:text-neutral-400">
                            Response within 24 hours
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                        Media Relations Team
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                            alt="Fatima Al-Rashid" 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">Fatima Al-Rashid</p>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">Head of Communications</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                            alt="Kwame Asante" 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">Kwame Asante</p>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">Media Relations Manager</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700 text-center">
                    <Button
                      variant="primary"
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      Contact Press Team
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Events */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
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
                Meet the NubiaGo team at these upcoming events
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Africa E-Commerce Summit',
                  date: 'July 15-17, 2024',
                  location: 'Lagos, Nigeria',
                  description: 'NubiaGo will be exhibiting and our CEO will be speaking on the future of cross-continental e-commerce.',
                  link: '#'
                },
                {
                  title: 'Turkish Export Forum',
                  date: 'August 5-7, 2024',
                  location: 'Istanbul, Turkey',
                  description: 'Join us for a panel discussion on digital transformation in export businesses.',
                  link: '#'
                },
                {
                  title: 'International Trade Expo',
                  date: 'September 20-22, 2024',
                  location: 'Cairo, Egypt',
                  description: 'Visit our booth to learn about our platform and meet our business development team.',
                  link: '#'
                }
              ].map((event, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center space-x-2 mb-3">
                        <Calendar className="w-5 h-5 text-indigo-600" />
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">{event.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        {event.title}
                      </h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <Globe className="w-4 h-4 text-neutral-500" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">{event.location}</span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4 flex-1">
                        {event.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                        className="self-start mt-auto"
                      >
                        Event Details
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default PressMediaPage;