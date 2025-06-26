import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Star, 
  MapPin, 
  Shield, 
  Clock, 
  Package, 
  Users, 
  TrendingUp,
  Search,
  Filter,
  Grid,
  List,
  Award,
  Verified,
  Phone,
  Mail,
  Globe,
  ArrowRight
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import { clsx } from 'clsx';

interface Supplier {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  memberSince: string;
  totalProducts: number;
  responseTime: string;
  categories: string[];
  specialties: string[];
  certifications: string[];
  contact: {
    phone: string;
    email: string;
    website: string;
  };
}

const SuppliersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('rating');

  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'AudioTech Turkey',
      description: 'Leading manufacturer of premium audio equipment and electronics with 15+ years of experience in international markets.',
      logo: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      coverImage: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
      location: 'Istanbul, Turkey',
      rating: 4.8,
      reviews: 234,
      verified: true,
      memberSince: '2020',
      totalProducts: 150,
      responseTime: '< 2 hours',
      categories: ['Electronics', 'Audio Equipment'],
      specialties: ['Wireless Headphones', 'Bluetooth Speakers', 'Gaming Audio'],
      certifications: ['ISO 9001', 'CE Certified', 'FCC Approved'],
      contact: {
        phone: '+90 212 XXX XXXX',
        email: 'info@audiotech.com.tr',
        website: 'www.audiotech.com.tr'
      }
    },
    {
      id: '2',
      name: 'Istanbul Leather Co.',
      description: 'Traditional Turkish leather craftsmanship meets modern design. Handcrafted leather goods for the global market.',
      logo: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      coverImage: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
      location: 'Istanbul, Turkey',
      rating: 4.9,
      reviews: 156,
      verified: true,
      memberSince: '2017',
      totalProducts: 95,
      responseTime: '< 2 hours',
      categories: ['Fashion', 'Leather Goods'],
      specialties: ['Handbags', 'Wallets', 'Belts', 'Jackets'],
      certifications: ['Leather Working Group', 'OEKO-TEX'],
      contact: {
        phone: '+90 212 XXX XXXX',
        email: 'sales@istanbulleather.com',
        website: 'www.istanbulleather.com'
      }
    },
    {
      id: '3',
      name: 'Anatolian Textiles',
      description: 'Premium textile manufacturer specializing in organic cotton and sustainable fabrics for fashion and home industries.',
      logo: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      coverImage: 'https://images.pexels.com/photos/6045086/pexels-photo-6045086.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
      location: 'Bursa, Turkey',
      rating: 4.7,
      reviews: 189,
      verified: true,
      memberSince: '2018',
      totalProducts: 200,
      responseTime: '< 3 hours',
      categories: ['Textiles', 'Home & Garden'],
      specialties: ['Organic Cotton', 'Towels', 'Bedding', 'Fabrics'],
      certifications: ['GOTS Certified', 'OEKO-TEX Standard 100'],
      contact: {
        phone: '+90 224 XXX XXXX',
        email: 'export@anatoliantextiles.com',
        website: 'www.anatoliantextiles.com'
      }
    },
    {
      id: '4',
      name: 'TechCorp Turkey',
      description: 'Innovative technology solutions provider specializing in smart home devices and IoT products for modern living.',
      logo: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      coverImage: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
      location: 'Ankara, Turkey',
      rating: 4.6,
      reviews: 98,
      verified: true,
      memberSince: '2021',
      totalProducts: 75,
      responseTime: '< 4 hours',
      categories: ['Electronics', 'Smart Home'],
      specialties: ['Smart Devices', 'IoT Solutions', 'Home Automation'],
      certifications: ['ISO 27001', 'CE Certified'],
      contact: {
        phone: '+90 312 XXX XXXX',
        email: 'business@techcorp.com.tr',
        website: 'www.techcorp.com.tr'
      }
    }
  ];

  const categories = ['all', 'Electronics', 'Fashion', 'Textiles', 'Home & Garden', 'Smart Home'];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || supplier.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'products':
        return b.totalProducts - a.totalProducts;
      case 'newest':
        return parseInt(b.memberSince) - parseInt(a.memberSince);
      default:
        return 0;
    }
  });

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
                Verified Turkish Suppliers
              </h1>
              <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
                Connect with premium Turkish manufacturers and suppliers. All verified, all trusted, all ready to serve African markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="gold" size="lg" className="text-lg px-6 py-3">
                  <Shield className="w-5 h-5 mr-2" />
                  {suppliers.length} Verified Suppliers
                </Badge>
                <Badge variant="primary" size="lg" className="text-lg px-6 py-3 bg-white/20">
                  <Package className="w-5 h-5 mr-2" />
                  10M+ Products Available
                </Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-8 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search suppliers..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                  leftIcon={<Search className="w-4 h-4" />}
                />
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="products">Most Products</option>
                  <option value="newest">Newest Members</option>
                </select>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-neutral-200 dark:bg-neutral-700' : ''}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-neutral-200 dark:bg-neutral-700' : ''}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Suppliers Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={clsx(
                'grid gap-8',
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              )}
            >
              {sortedSuppliers.map((supplier) => (
                <motion.div key={supplier.id} variants={itemVariants}>
                  <Card variant="default" padding="sm" className="overflow-hidden h-full">
                    {/* Cover Image */}
                    <div className="relative h-32 bg-gradient-to-r from-red-500 to-red-600 overflow-hidden">
                      <img
                        src={supplier.coverImage}
                        alt={supplier.name}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute top-4 right-4">
                        {supplier.verified && (
                          <Badge variant="success" size="sm">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Supplier Info */}
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start space-x-4 mb-4">
                        <img
                          src={supplier.logo}
                          alt={supplier.name}
                          className="w-16 h-16 rounded-lg object-cover border-2 border-white shadow-lg -mt-8 relative z-10"
                        />
                        <div className="flex-1 pt-2">
                          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                            {supplier.name}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <MapPin className="w-4 h-4" />
                            <span>{supplier.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Rating & Stats */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-gold-500 fill-current" />
                            <span className="font-semibold">{supplier.rating}</span>
                          </div>
                          <span className="text-sm text-neutral-500">
                            ({supplier.reviews} reviews)
                          </span>
                        </div>
                        <Badge variant="primary" size="sm">
                          Since {supplier.memberSince}
                        </Badge>
                      </div>

                      {/* Description */}
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
                        {supplier.description}
                      </p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <div className="font-bold text-lg text-neutral-900 dark:text-neutral-100">
                            {supplier.totalProducts}
                          </div>
                          <div className="text-xs text-neutral-500">Products</div>
                        </div>
                        <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <div className="font-bold text-lg text-neutral-900 dark:text-neutral-100">
                            {supplier.responseTime}
                          </div>
                          <div className="text-xs text-neutral-500">Response</div>
                        </div>
                      </div>

                      {/* Specialties */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                          Specialties
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {supplier.specialties.slice(0, 3).map((specialty) => (
                            <Badge key={specialty} variant="primary" size="sm" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                          {supplier.specialties.length > 3 && (
                            <Badge variant="default" size="sm" className="text-xs">
                              +{supplier.specialties.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                          Certifications
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {supplier.certifications.map((cert) => (
                            <Badge key={cert} variant="success" size="sm" className="text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button variant="primary" size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                          View Products
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Contact
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* No Results */}
            {sortedSuppliers.length === 0 && (
              <div className="text-center py-12">
                <Building className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  No suppliers found
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Try adjusting your search criteria or browse all categories
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Become a Supplier CTA */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Are You a Turkish Supplier?
              </h2>
              <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                Join thousands of verified suppliers already serving African markets through our platform. 
                Expand your business globally with NubiaGo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-red-600 hover:bg-neutral-100"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Become a Supplier
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-red-600"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SuppliersPage;