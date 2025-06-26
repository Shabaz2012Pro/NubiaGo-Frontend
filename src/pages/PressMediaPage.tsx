import React from 'react';
import { motion } from 'framer-motion';
import { 
  Newspaper, 
  Calendar, 
  Download, 
  Image, 
  Mail, 
  Phone,
  FileText,
  Globe,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  Camera,
  Video,
  Mic
} from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

interface PressRelease {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
}

interface MediaMention {
  id: string;
  title: string;
  publication: string;
  date: string;
  logo: string;
  link: string;
}

const PressMediaPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Press & Media', current: true }
  ];

  const pressReleases: PressRelease[] = [
    {
      id: 'pr-1',
      title: 'NubiaGO Announces Expansion to 10 New African Countries',
      date: 'March 15, 2024',
      excerpt: 'NubiaGO, the leading marketplace connecting Turkish suppliers with African markets, today announced its expansion to 10 additional African countries, bringing its total market presence to all 54 African nations.',
      category: 'Expansion'
    },
    {
      id: 'pr-2',
      title: 'NubiaGO Secures $25 Million in Series B Funding',
      date: 'February 8, 2024',
      excerpt: 'NubiaGO has secured $25 million in Series B funding led by Global Ventures with participation from existing investors. The funding will accelerate growth and enhance platform capabilities.',
      category: 'Funding'
    },
    {
      id: 'pr-3',
      title: 'NubiaGO Launches AI-Powered Product Recommendations',
      date: 'January 22, 2024',
      excerpt: 'NubiaGO has introduced advanced AI-powered product recommendations to enhance the shopping experience for its customers across Africa.',
      category: 'Product'
    },
    {
      id: 'pr-4',
      title: 'NubiaGO Partners with Major African Payment Providers',
      date: 'December 10, 2023',
      excerpt: 'NubiaGO has announced strategic partnerships with leading African payment providers to offer more localized payment options for customers across the continent.',
      category: 'Partnership'
    }
  ];

  const mediaMentions: MediaMention[] = [
    {
      id: 'media-1',
      title: 'How NubiaGO is Revolutionizing Turkey-Africa Trade',
      publication: 'TechCrunch',
      date: 'March 10, 2024',
      logo: 'https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      link: '#'
    },
    {
      id: 'media-2',
      title: 'NubiaGO Named in "Top 50 E-commerce Startups to Watch"',
      publication: 'Forbes Africa',
      date: 'February 15, 2024',
      logo: 'https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      link: '#'
    },
    {
      id: 'media-3',
      title: 'Turkish Exports to Africa Surge Thanks to Digital Platforms',
      publication: 'Financial Times',
      date: 'January 28, 2024',
      logo: 'https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      link: '#'
    },
    {
      id: 'media-4',
      title: 'E-commerce Bridges Continental Divide Between Turkey and Africa',
      publication: 'CNN Business',
      date: 'December 5, 2023',
      logo: 'https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      link: '#'
    }
  ];

  const mediaKitItems = [
    { title: 'Company Fact Sheet', icon: <FileText className="w-6 h-6" />, size: '1.2 MB' },
    { title: 'Brand Guidelines', icon: <FileText className="w-6 h-6" />, size: '3.5 MB' },
    { title: 'Logo Package', icon: <Image className="w-6 h-6" />, size: '8.7 MB' },
    { title: 'Executive Headshots', icon: <Camera className="w-6 h-6" />, size: '15.2 MB' },
    { title: 'Product Images', icon: <Image className="w-6 h-6" />, size: '22.8 MB' },
    { title: 'B-Roll Footage', icon: <Video className="w-6 h-6" />, size: '45.6 MB' }
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
        <section className="bg-gradient-to-r from-neutral-800 to-neutral-900 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <Newspaper className="w-4 h-4 mr-2" />
                Press & Media Resources
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">Press & Media Center</h1>
              
              <p className="text-xl text-neutral-300 mb-6">
                Find the latest news, press releases, media resources, and contact information for NubiaGO.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="secondary" 
                  className="bg-white text-neutral-900 hover:bg-neutral-100"
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

        {/* Latest Press Releases */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Latest Press Releases
              </h2>
              <Button 
                variant="ghost" 
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View All
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pressReleases.map((release) => (
                <motion.div key={release.id} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="p-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 rounded-lg flex-shrink-0">
                        <Newspaper className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm text-neutral-500">{release.date}</span>
                          <Badge variant="primary" size="sm">{release.category}</Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                          {release.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      {release.excerpt}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Read More
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Media Mentions */}
        <section className="bg-neutral-50 dark:bg-neutral-800/30 py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  NubiaGO in the News
                </h2>
                <Button 
                  variant="ghost" 
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  View All Coverage
                </Button>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mediaMentions.map((mention) => (
                  <motion.div key={mention.id} variants={itemVariants}>
                    <Card 
                      variant="default" 
                      padding="lg" 
                      className="h-full hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                          <img 
                            src={mention.logo} 
                            alt={mention.publication} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm text-neutral-500">{mention.date}</span>
                      </div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2">
                        {mention.title}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                        {mention.publication}
                      </p>
                      <a 
                        href={mention.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Read Article
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Media Kit */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Media Kit
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Download official NubiaGO assets for media use
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaKitItems.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 rounded-lg">
                        {item.icon}
                      </div>
                      <span className="text-sm text-neutral-500">{item.size}</span>
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                      {item.title}
                    </h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      fullWidth
                      leftIcon={<Download className="w-4 h-4" />}
                    >
                      Download
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="text-center mt-8">
              <Button 
                variant="primary" 
                size="lg"
                leftIcon={<Download className="w-5 h-5" />}
                className="bg-neutral-800 hover:bg-neutral-900"
              >
                Download Complete Media Kit
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Press Contact */}
        <section className="bg-gradient-to-r from-neutral-800 to-neutral-900 py-16 mb-16">
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
                  Press Contact
                </h2>
                <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
                  For press inquiries, interview requests, or additional information, please contact our media relations team.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                  <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                    <div className="text-center">
                      <Mail className="w-8 h-8 mx-auto mb-4 text-neutral-300" />
                      <h3 className="font-semibold mb-2">Email</h3>
                      <p className="text-neutral-300">press@nubiago.com</p>
                    </div>
                  </Card>
                  
                  <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                    <div className="text-center">
                      <Phone className="w-8 h-8 mx-auto mb-4 text-neutral-300" />
                      <h3 className="font-semibold mb-2">Phone</h3>
                      <p className="text-neutral-300">+90 212 XXX XXXX</p>
                    </div>
                  </Card>
                  
                  <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                    <div className="text-center">
                      <MessageSquare className="w-8 h-8 mx-auto mb-4 text-neutral-300" />
                      <h3 className="font-semibold mb-2">Response Time</h3>
                      <p className="text-neutral-300">Within 24 hours</p>
                    </div>
                  </Card>
                </div>
                
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-neutral-900 hover:bg-neutral-100"
                  onClick={() => window.location.hash = 'contact'}
                >
                  Contact Press Team
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Press Kit Request */}
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
                      Need Custom Press Materials?
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      If you need specific information, high-resolution images, or would like to arrange an interview with our executives, please fill out our press request form.
                    </p>
                    <Button 
                      variant="primary" 
                      className="bg-neutral-800 hover:bg-neutral-900"
                      onClick={() => window.location.hash = 'contact'}
                    >
                      Submit Press Request
                    </Button>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-32 h-32 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                      <Mic className="w-16 h-16 text-neutral-400" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Company Facts */}
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
                  Company Facts
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Key information about NubiaGO for media reference
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                      About NubiaGo
                    </h3>
                    <div className="space-y-3 text-neutral-600 dark:text-neutral-400">
                      <p>
                        NubiaGo is the leading marketplace connecting Turkish suppliers with African markets, facilitating cross-continental trade with a focus on quality, trust, and innovation.
                      </p>
                      <p>
                        Founded in 2020, NubiaGo has grown to serve customers in all 54 African countries, with offices in Istanbul, Turkey and Lagos, Nigeria.
                      </p>
                      <p>
                        The platform features over 10 million products from 5,000+ verified Turkish suppliers across categories including electronics, fashion, home appliances, and more.
                      </p>
                    </div>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                      Key Statistics
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                        <span className="text-neutral-600 dark:text-neutral-400">Founded</span>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">2020</span>
                      </div>
                      <div className="flex justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                        <span className="text-neutral-600 dark:text-neutral-400">Headquarters</span>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">Istanbul, Turkey</span>
                      </div>
                      <div className="flex justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                        <span className="text-neutral-600 dark:text-neutral-400">Active Customers</span>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">1M+</span>
                      </div>
                      <div className="flex justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                        <span className="text-neutral-600 dark:text-neutral-400">Verified Suppliers</span>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">5,000+</span>
                      </div>
                      <div className="flex justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                        <span className="text-neutral-600 dark:text-neutral-400">Countries Served</span>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">54 African Countries</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PressMediaPage;