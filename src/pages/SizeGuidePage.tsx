import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ruler, Shirt, Footprints, HelpCircle, Info, MessageSquare, Briefcase, Scissors, Grape as Tape, CheckCircle, Globe, Scissors as Cut } from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
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
    { id: 'shoes', label: 'Shoes & Footwear', icon: <Footprints className="w-5 h-5" /> },
    { id: 'accessories', label: 'Accessories', icon: <Briefcase className="w-5 h-5" /> }
  ];

  // Clothing size charts
  const menClothingSizes = [
    { size: 'XS', chest: '34-36', waist: '28-30', hips: '34-36', euSize: '44-46', turkishSize: 'S' },
    { size: 'S', chest: '36-38', waist: '30-32', hips: '36-38', euSize: '46-48', turkishSize: 'M' },
    { size: 'M', chest: '38-40', waist: '32-34', hips: '38-40', euSize: '48-50', turkishSize: 'L' },
    { size: 'L', chest: '40-42', waist: '34-36', hips: '40-42', euSize: '50-52', turkishSize: 'XL' },
    { size: 'XL', chest: '42-44', waist: '36-38', hips: '42-44', euSize: '52-54', turkishSize: '2XL' },
    { size: '2XL', chest: '44-46', waist: '38-40', hips: '44-46', euSize: '54-56', turkishSize: '3XL' }
  ];

  const womenClothingSizes = [
    { size: 'XS', bust: '32-34', waist: '24-26', hips: '34-36', euSize: '34-36', turkishSize: 'S' },
    { size: 'S', bust: '34-36', waist: '26-28', hips: '36-38', euSize: '36-38', turkishSize: 'M' },
    { size: 'M', bust: '36-38', waist: '28-30', hips: '38-40', euSize: '38-40', turkishSize: 'L' },
    { size: 'L', bust: '38-40', waist: '30-32', hips: '40-42', euSize: '40-42', turkishSize: 'XL' },
    { size: 'XL', bust: '40-42', waist: '32-34', hips: '42-44', euSize: '42-44', turkishSize: '2XL' },
    { size: '2XL', bust: '42-44', waist: '34-36', hips: '44-46', euSize: '44-46', turkishSize: '3XL' }
  ];

  // Shoe size charts
  const menShoeSizes = [
    { us: '7', uk: '6', eu: '39-40', cm: '25' },
    { us: '8', uk: '7', eu: '41', cm: '26' },
    { us: '9', uk: '8', eu: '42', cm: '27' },
    { us: '10', uk: '9', eu: '43', cm: '28' },
    { us: '11', uk: '10', eu: '44-45', cm: '29' },
    { us: '12', uk: '11', eu: '46', cm: '30' },
    { us: '13', uk: '12', eu: '47', cm: '31' }
  ];

  const womenShoeSizes = [
    { us: '5', uk: '3', eu: '35-36', cm: '22' },
    { us: '6', uk: '4', eu: '37', cm: '23' },
    { us: '7', uk: '5', eu: '38', cm: '24' },
    { us: '8', uk: '6', eu: '39', cm: '25' },
    { us: '9', uk: '7', eu: '40', cm: '26' },
    { us: '10', uk: '8', eu: '41', cm: '27' },
    { us: '11', uk: '9', eu: '42', cm: '28' }
  ];

  // Accessory size charts
  const beltSizes = [
    { waist: '28-30', size: 'S', cm: '85-90' },
    { waist: '32-34', size: 'M', cm: '95-100' },
    { waist: '36-38', size: 'L', cm: '105-110' },
    { waist: '40-42', size: 'XL', cm: '115-120' },
    { waist: '44-46', size: '2XL', cm: '125-130' }
  ];

  const hatSizes = [
    { inches: '21 1/4 - 21 1/2', cm: '54-55', size: 'S' },
    { inches: '22 - 22 3/8', cm: '56-57', size: 'M' },
    { inches: '22 3/4 - 23 1/8', cm: '58-59', size: 'L' },
    { inches: '23 1/2 - 23 7/8', cm: '60-61', size: 'XL' },
    { inches: '24 1/4 - 24 5/8', cm: '62-63', size: '2XL' }
  ];

  const measurementTips = [
    {
      title: 'Chest/Bust',
      description: 'Measure around the fullest part of your chest/bust, keeping the tape horizontal.',
      icon: <Tape className="w-5 h-5" />
    },
    {
      title: 'Waist',
      description: 'Measure around your natural waistline, keeping the tape comfortably loose.',
      icon: <Tape className="w-5 h-5" />
    },
    {
      title: 'Hips',
      description: 'Measure around the fullest part of your hips, keeping the tape horizontal.',
      icon: <Tape className="w-5 h-5" />
    },
    {
      title: 'Inseam',
      description: 'Measure from the crotch to the bottom of the leg along the inner seam.',
      icon: <Ruler className="w-5 h-5" />
    },
    {
      title: 'Foot Length',
      description: 'Measure from the back of your heel to the tip of your longest toe.',
      icon: <Ruler className="w-5 h-5" />
    },
    {
      title: 'Head Circumference',
      description: 'Measure around your head, just above your eyebrows.',
      icon: <Tape className="w-5 h-5" />
    }
  ];

  const faqs = [
    {
      question: 'How do I measure myself accurately?',
      answer: 'For the most accurate measurements, use a soft measuring tape. Wear lightweight clothes or measure directly on your body. Keep the tape snug but not tight, and stand naturally. For height, stand against a wall without shoes.'
    },
    {
      question: 'What if I\'m between sizes?',
      answer: 'If you\'re between sizes, we recommend sizing up for a more comfortable fit. For fitted items, consider your body type and personal preference for how you like your clothes to fit.'
    },
    {
      question: 'Do Turkish sizes run smaller or larger than US/EU sizes?',
      answer: 'Turkish clothing sizes generally run 1-2 sizes smaller than US sizes and are more aligned with European sizing. Our size charts provide conversions to help you find the right fit.'
    },
    {
      question: 'How do I measure my ring size?',
      answer: 'To measure your ring size at home, wrap a piece of string or paper around your finger, mark where it overlaps, and measure the length in millimeters. Compare this measurement to our ring size chart to find your size.'
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
      <Header />

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
                <Ruler className="w-4 h-4 mr-2" />
                Find Your Perfect Fit
              </Badge>

              <h1 className="text-4xl font-bold mb-4">Size Guide</h1>

              <p className="text-xl text-purple-100 mb-6">
                Use our comprehensive size guides to find the perfect fit for clothing, shoes, and accessories from our Turkish suppliers.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="secondary" 
                  className="bg-white text-purple-600 hover:bg-neutral-100"
                  onClick={() => window.location.hash = 'products'}
                >
                  Shop Now
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => window.location.hash = 'contact'}
                >
                  Need Help?
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'primary' : 'outline'}
                onClick={() => setActiveCategory(category.id)}
                leftIcon={category.icon}
                className={activeCategory === category.id ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </section>

        {/* Size Charts */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Clothing Size Charts */}
            {activeCategory === 'clothing' && (
              <>
                <motion.div variants={itemVariants} className="mb-12">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                    Men's Clothing Sizes
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-neutral-100 dark:bg-neutral-800">
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">US Size</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Chest (inches)</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Waist (inches)</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Hips (inches)</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">EU Size</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Turkish Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        {menClothingSizes.map((size, index) => (
                          <tr 
                            key={index} 
                            className={clsx(
                              index % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-800/50',
                              'hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors'
                            )}
                          >
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 font-medium">{size.size}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.chest}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.waist}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.hips}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.euSize}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.turkishSize}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-12">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                    Women's Clothing Sizes
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-neutral-100 dark:bg-neutral-800">
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">US Size</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Bust (inches)</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Waist (inches)</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Hips (inches)</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">EU Size</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Turkish Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        {womenClothingSizes.map((size, index) => (
                          <tr 
                            key={index} 
                            className={clsx(
                              index % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-800/50',
                              'hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors'
                            )}
                          >
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 font-medium">{size.size}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.bust}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.waist}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.hips}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.euSize}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.turkishSize}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </>
            )}

            {/* Shoe Size Charts */}
            {activeCategory === 'shoes' && (
              <>
                <motion.div variants={itemVariants} className="mb-12">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                    Men's Shoe Sizes
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-neutral-100 dark:bg-neutral-800">
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">US Size</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">UK Size</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">EU Size</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Foot Length (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {menShoeSizes.map((size, index) => (
                          <tr 
                            key={index} 
                            className={clsx(
                              index % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-800/50',
                              'hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors'
                            )}
                          >
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 font-medium">{size.us}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.uk}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.eu}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.cm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-12">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                    Women's Shoe Sizes
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-neutral-100 dark:bg-neutral-800">
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">US Size</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">UK Size</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">EU Size</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Foot Length (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {womenShoeSizes.map((size, index) => (
                          <tr 
                            key={index} 
                            className={clsx(
                              index % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-800/50',
                              'hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors'
                            )}
                          >
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 font-medium">{size.us}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.uk}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.eu}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.cm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg" className="max-w-3xl mx-auto">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 rounded-lg flex-shrink-0">
                        <Info className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                          How to Measure Your Foot
                        </h3>
                        <ol className="space-y-3 text-neutral-600 dark:text-neutral-400">
                          <li className="flex items-start">
                            <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                            <span>Place a piece of paper on a hard floor against a wall.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                            <span>Stand on the paper with your heel against the wall.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                            <span>Mark the longest part of your foot on the paper.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                            <span>Measure the distance from the wall to the mark in centimeters.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center mr-2 flex-shrink-0">5</span>
                            <span>Use this measurement to find your size in the chart above.</span>
                          </li>
                        </ol>
                        <p className="mt-4 text-sm text-neutral-500">
                          For the most accurate fit, measure your feet in the evening when they are at their largest.
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </>
            )}

            {/* Accessories Size Charts */}
            {activeCategory === 'accessories' && (
              <>
                <motion.div variants={itemVariants} className="mb-12">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                    Belt Sizes
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-neutral-100 dark:bg-neutral-800">
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Waist Size (inches)</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Belt Size</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Belt Length (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {beltSizes.map((size, index) => (
                          <tr 
                            key={index} 
                            className={clsx(
                              index % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-800/50',
                              'hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors'
                            )}
                          >
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 font-medium">{size.waist}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.size}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.cm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-12">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                    Hat Sizes
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-neutral-100 dark:bg-neutral-800">
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Head Circumference (inches)</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Head Circumference (cm)</th>
                          <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-left">Hat Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hatSizes.map((size, index) => (
                          <tr 
                            key={index} 
                            className={clsx(
                              index % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-800/50',
                              'hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors'
                            )}
                          >
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3 font-medium">{size.inches}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.cm}</td>
                            <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-3">{size.size}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg" className="max-w-3xl mx-auto">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-lg flex-shrink-0">
                        <Info className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                          Accessory Sizing Tips
                        </h3>
                        <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>For belts, measure where you typically wear your belt around your waist and add 2 inches.</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>For hats, measure the circumference of your head about 1 inch above your ears.</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>For gloves, measure around your dominant hand at the widest part (excluding thumb).</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>For scarves and shawls, dimensions are typically provided in the product description.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Card>
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
                  Follow these tips for accurate measurements to find your perfect fit
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {measurementTips.map((tip, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg" className="h-full">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-lg flex-shrink-0">
                          {tip.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                            {tip.title}
                          </h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {tip.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="mt-12 text-center">
                <Card variant="default" padding="lg" className="max-w-3xl mx-auto">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-full">
                      <Cut className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                        Need a measuring tape?
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                        You can use a piece of string and a ruler if you don't have a measuring tape.
                      </p>
                      <Button 
                        variant="primary" 
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => window.open('https://www.youtube.com/watch?v=measurement-tutorial', '_blank')}
                      >
                        Watch Measurement Tutorial
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Size Conversion */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                International Size Conversion
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Understanding how Turkish sizes compare to international standards
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="max-w-3xl mx-auto">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center">
                      <Globe className="w-5 h-5 text-purple-600 mr-2" />
                      Turkish Sizing Overview
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      Turkish clothing sizes generally follow European standards but may have some variations. Here's what you need to know:
                    </p>
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Turkish sizes typically run 1-2 sizes smaller than US sizes</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Turkish shoe sizes follow the European numbering system</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>For the best fit, always refer to the measurements in centimeters or inches</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>When in doubt, we recommend sizing up rather than down</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        <span className="font-medium">Pro Tip:</span> Each product on NubiaGo includes specific size information from the manufacturer. Always check the product details for the most accurate sizing guidance.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* FAQs */}
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
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Find answers to common questions about sizing
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {faqs.map((faq, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-lg flex-shrink-0">
                          <HelpCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            {faq.answer}
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

        {/* Need Help CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800/30">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-xl mb-1">
                        Still Need Help with Sizing?
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Our customer support team is ready to assist you with any sizing questions.
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="primary" 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => window.location.hash = 'contact'}
                  >
                    Contact Support
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default SizeGuidePage;