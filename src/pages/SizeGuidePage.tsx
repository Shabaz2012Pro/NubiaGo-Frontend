import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Ruler, 
  Shirt, 
  Footprints, 
  Briefcase, 
  HelpCircle, 
  ArrowRight,
  Tape,
  User,
  Info
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const SizeGuidePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('clothing');

  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Size Guide', current: true }
  ];

  const categories = [
    { id: 'clothing', label: 'Clothing', icon: <Shirt className="w-5 h-5" /> },
    { id: 'shoes', label: 'Shoes', icon: <Footprints className="w-5 h-5" /> },
    { id: 'bags', label: 'Bags & Accessories', icon: <Briefcase className="w-5 h-5" /> }
  ];

  // Clothing size charts
  const menClothingSizes = [
    { size: 'XS', chest: '34-36', waist: '28-30', hips: '34-36', eu: '44-46', tr: 'S' },
    { size: 'S', chest: '36-38', waist: '30-32', hips: '36-38', eu: '46-48', tr: 'M' },
    { size: 'M', chest: '38-40', waist: '32-34', hips: '38-40', eu: '48-50', tr: 'L' },
    { size: 'L', chest: '40-42', waist: '34-36', hips: '40-42', eu: '50-52', tr: 'XL' },
    { size: 'XL', chest: '42-44', waist: '36-38', hips: '42-44', eu: '52-54', tr: '2XL' },
    { size: '2XL', chest: '44-46', waist: '38-40', hips: '44-46', eu: '54-56', tr: '3XL' }
  ];

  const womenClothingSizes = [
    { size: 'XS', bust: '32-33', waist: '25-26', hips: '35-36', eu: '34-36', tr: 'S' },
    { size: 'S', bust: '34-35', waist: '27-28', hips: '37-38', eu: '36-38', tr: 'M' },
    { size: 'M', bust: '36-37', waist: '29-30', hips: '39-40', eu: '38-40', tr: 'L' },
    { size: 'L', bust: '38-40', waist: '31-33', hips: '41-43', eu: '40-42', tr: 'XL' },
    { size: 'XL', bust: '41-43', waist: '34-36', hips: '44-46', eu: '42-44', tr: '2XL' },
    { size: '2XL', bust: '44-46', waist: '37-39', hips: '47-49', eu: '44-46', tr: '3XL' }
  ];

  // Shoe size charts
  const menShoeSizes = [
    { us: '7', uk: '6', eu: '39-40', tr: '39', inches: '9.6', cm: '24.4' },
    { us: '8', uk: '7', eu: '41', tr: '40', inches: '9.9', cm: '25.1' },
    { us: '9', uk: '8', eu: '42', tr: '41', inches: '10.2', cm: '26.0' },
    { us: '10', uk: '9', eu: '43', tr: '42', inches: '10.6', cm: '26.8' },
    { us: '11', uk: '10', eu: '44-45', tr: '43', inches: '10.9', cm: '27.6' },
    { us: '12', uk: '11', eu: '46', tr: '44', inches: '11.2', cm: '28.4' }
  ];

  const womenShoeSizes = [
    { us: '5', uk: '3', eu: '35-36', tr: '35', inches: '8.5', cm: '21.6' },
    { us: '6', uk: '4', eu: '36-37', tr: '36', inches: '8.8', cm: '22.4' },
    { us: '7', uk: '5', eu: '37-38', tr: '37', inches: '9.1', cm: '23.1' },
    { us: '8', uk: '6', eu: '38-39', tr: '38', inches: '9.5', cm: '24.0' },
    { us: '9', uk: '7', eu: '39-40', tr: '39', inches: '9.8', cm: '24.9' },
    { us: '10', uk: '8', eu: '40-41', tr: '40', inches: '10.2', cm: '25.9' }
  ];

  // Bag size information
  const bagSizes = [
    { size: 'Small', width: '6-10', height: '5-8', depth: '2-4', capacity: '1-5', example: 'Clutch, Mini Bag' },
    { size: 'Medium', width: '10-14', height: '8-12', depth: '4-6', capacity: '5-15', example: 'Shoulder Bag, Satchel' },
    { size: 'Large', width: '14-18', height: '12-16', depth: '6-8', capacity: '15-25', example: 'Tote, Weekender' },
    { size: 'Extra Large', width: '18+', height: '16+', depth: '8+', capacity: '25+', example: 'Travel Bag, Luggage' }
  ];

  const measurementTips = [
    {
      title: 'Chest/Bust',
      description: 'Measure around the fullest part of your chest/bust, keeping the tape measure horizontal.',
      icon: <User className="w-6 h-6" />
    },
    {
      title: 'Waist',
      description: 'Measure around your natural waistline, keeping the tape measure comfortably loose.',
      icon: <User className="w-6 h-6" />
    },
    {
      title: 'Hips',
      description: 'Measure around the fullest part of your hips, keeping the tape measure horizontal.',
      icon: <User className="w-6 h-6" />
    },
    {
      title: 'Foot Length',
      description: 'Measure from the heel to the longest toe while standing with weight evenly distributed.',
      icon: <Footprints className="w-6 h-6" />
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
        <section className="bg-gradient-to-r from-teal-600 to-teal-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <Ruler className="w-4 h-4 mr-2" />
                Size Guide
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">Find Your Perfect Fit</h1>
              
              <p className="text-xl text-teal-100 mb-6">
                Use our comprehensive size guides to ensure you order the right size every time. Turkish sizes may differ from what you're used to.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={clsx(
                      'flex items-center space-x-2 px-4 py-2 rounded-full transition-colors',
                      activeCategory === category.id
                        ? 'bg-white text-teal-700'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    )}
                  >
                    {category.icon}
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Size Charts */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Clothing Size Charts */}
            {activeCategory === 'clothing' && (
              <>
                <motion.div variants={itemVariants} className="mb-12">
                  <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Clothing Size Charts
                  </h2>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                    Find your perfect fit with our comprehensive clothing size guides. Measurements are in inches unless otherwise noted.
                  </p>

                  <div className="space-y-8">
                    {/* Men's Clothing Sizes */}
                    <Card variant="default" padding="lg">
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center">
                        <Shirt className="w-6 h-6 mr-2 text-blue-600" />
                        Men's Clothing Sizes
                      </h3>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                          <thead className="bg-neutral-100 dark:bg-neutral-700">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                US Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Chest (in)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Waist (in)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Hips (in)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                EU Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Turkish Size
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                            {menClothingSizes.map((size, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800/50' : ''}>
                                <td className="px-4 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                  {size.size}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.chest}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.waist}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.hips}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.eu}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.tr}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>

                    {/* Women's Clothing Sizes */}
                    <Card variant="default" padding="lg">
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center">
                        <Shirt className="w-6 h-6 mr-2 text-pink-600" />
                        Women's Clothing Sizes
                      </h3>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                          <thead className="bg-neutral-100 dark:bg-neutral-700">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                US Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Bust (in)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Waist (in)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Hips (in)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                EU Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Turkish Size
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                            {womenClothingSizes.map((size, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800/50' : ''}>
                                <td className="px-4 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                  {size.size}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.bust}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.waist}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.hips}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.eu}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.tr}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              </>
            )}

            {/* Shoe Size Charts */}
            {activeCategory === 'shoes' && (
              <>
                <motion.div variants={itemVariants} className="mb-12">
                  <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Shoe Size Charts
                  </h2>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                    Find your perfect shoe size with our comprehensive conversion charts. Measurements are in inches and centimeters.
                  </p>

                  <div className="space-y-8">
                    {/* Men's Shoe Sizes */}
                    <Card variant="default" padding="lg">
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center">
                        <Footprints className="w-6 h-6 mr-2 text-blue-600" />
                        Men's Shoe Sizes
                      </h3>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                          <thead className="bg-neutral-100 dark:bg-neutral-700">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                US Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                UK Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                EU Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Turkish Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Inches
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Centimeters
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                            {menShoeSizes.map((size, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800/50' : ''}>
                                <td className="px-4 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                  {size.us}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.uk}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.eu}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.tr}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.inches}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.cm}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>

                    {/* Women's Shoe Sizes */}
                    <Card variant="default" padding="lg">
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center">
                        <Footprints className="w-6 h-6 mr-2 text-pink-600" />
                        Women's Shoe Sizes
                      </h3>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                          <thead className="bg-neutral-100 dark:bg-neutral-700">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                US Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                UK Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                EU Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Turkish Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Inches
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Centimeters
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                            {womenShoeSizes.map((size, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800/50' : ''}>
                                <td className="px-4 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                  {size.us}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.uk}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.eu}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.tr}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.inches}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.cm}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              </>
            )}

            {/* Bags & Accessories Size Charts */}
            {activeCategory === 'bags' && (
              <>
                <motion.div variants={itemVariants} className="mb-12">
                  <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Bags & Accessories Size Guide
                  </h2>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                    Find the right size for bags, belts, and other accessories. Measurements are in inches unless otherwise noted.
                  </p>

                  <div className="space-y-8">
                    {/* Bag Sizes */}
                    <Card variant="default" padding="lg">
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center">
                        <Briefcase className="w-6 h-6 mr-2 text-amber-600" />
                        Bag Sizes
                      </h3>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                          <thead className="bg-neutral-100 dark:bg-neutral-700">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Width (in)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Height (in)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Depth (in)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Capacity (L)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Example
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                            {bagSizes.map((size, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800/50' : ''}>
                                <td className="px-4 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                  {size.size}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.width}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.height}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.depth}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.capacity}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.example}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>

                    {/* Belt Sizes */}
                    <Card variant="default" padding="lg">
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center">
                        <Ruler className="w-6 h-6 mr-2 text-amber-600" />
                        Belt Sizes
                      </h3>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                          <thead className="bg-neutral-100 dark:bg-neutral-700">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Waist Size (in)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Belt Size (in)
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                US Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                EU Size
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700">
                                Turkish Size
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                            {[
                              { waist: '28-30', belt: '30-32', us: 'S', eu: '80-85', tr: '80-85' },
                              { waist: '32-34', belt: '34-36', us: 'M', eu: '90-95', tr: '90-95' },
                              { waist: '36-38', belt: '38-40', us: 'L', eu: '100-105', tr: '100-105' },
                              { waist: '40-42', belt: '42-44', us: 'XL', eu: '110-115', tr: '110-115' },
                              { waist: '44-46', belt: '46-48', us: 'XXL', eu: '120-125', tr: '120-125' }
                            ].map((size, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800/50' : ''}>
                                <td className="px-4 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                  {size.waist}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.belt}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.us}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.eu}
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                                  {size.tr}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg">
                        <p className="text-sm text-amber-700 dark:text-amber-300 flex items-start">
                          <Info className="w-5 h-5 mr-2 flex-shrink-0" />
                          <span>Belt size is typically 2 inches larger than your waist size to allow for proper fit.</span>
                        </p>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        </section>

        {/* How to Measure */}
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
                  How to Measure Yourself
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Follow these simple steps to get accurate measurements
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="md:col-span-2">
                  <Card variant="default" padding="lg">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                      <div className="mb-6 md:mb-0 md:w-1/3">
                        <div className="p-6 bg-teal-100 dark:bg-teal-900/20 rounded-xl flex items-center justify-center">
                          <Tape className="w-16 h-16 text-teal-600" />
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                          Measurement Tips
                        </h3>
                        <div className="space-y-4">
                          {measurementTips.map((tip, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold">{index + 1}</span>
                              </div>
                              <div>
                                <p className="font-medium text-neutral-900 dark:text-neutral-100">{tip.title}</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                  {tip.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-900/10 rounded-lg">
                          <p className="text-sm text-teal-700 dark:text-teal-300 flex items-start">
                            <Info className="w-5 h-5 mr-2 flex-shrink-0" />
                            <span>For the most accurate measurements, use a soft measuring tape and wear minimal clothing. Have someone help you if possible.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Size Conversion Tips */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Size Conversion Tips
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Helpful advice for finding the right size when shopping from Turkish suppliers
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg" className="h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                      <Shirt className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      Turkish Clothing Sizing
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
                    <li>Turkish clothing sizes typically run 1-2 sizes smaller than US sizes</li>
                    <li>When in doubt, order one size larger than your usual size</li>
                    <li>Turkish sizes are more closely aligned with European sizing</li>
                    <li>Pay attention to the specific measurements rather than the size label</li>
                    <li>Different brands may have slight variations in their sizing</li>
                  </ul>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg" className="h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                      <Footprints className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      Turkish Shoe Sizing
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
                    <li>Turkish shoe sizes follow the European sizing system</li>
                    <li>Measure your foot length in centimeters for the most accurate size</li>
                    <li>Turkish shoes may run narrower than US or UK shoes</li>
                    <li>For wider feet, consider ordering a half size larger</li>
                    <li>Different styles (dress shoes, sneakers, boots) may fit differently</li>
                  </ul>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg" className="h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                      <HelpCircle className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      When to Size Up
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
                    <li>If you're between sizes, always size up</li>
                    <li>For fitted or tailored clothing styles</li>
                    <li>For items made from non-stretch fabrics</li>
                    <li>If you prefer a looser, more comfortable fit</li>
                    <li>For winter clothing that may be worn over other layers</li>
                  </ul>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg" className="h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                      <Briefcase className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      Accessory Sizing
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
                    <li>For belts, measure your waist where you'll wear the belt and add 2 inches</li>
                    <li>For hats, measure the circumference of your head just above your ears</li>
                    <li>For gloves, measure around the widest part of your hand excluding your thumb</li>
                    <li>For scarves and shawls, check the dimensions in the product description</li>
                    <li>For watches, measure your wrist circumference for band size</li>
                  </ul>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Need Help CTA */}
        <section className="bg-gradient-to-r from-teal-600 to-teal-700 py-16 mb-16">
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
                  Still Not Sure About Your Size?
                </h2>
                <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
                  Our customer support team is here to help you find the perfect fit.
                </p>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-neutral-100"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => window.location.hash = 'contact'}
                >
                  Contact Support
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SizeGuidePage;