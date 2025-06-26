import React from 'react';
import { 
  Leaf, 
  Globe, 
  Heart, 
  Sun, 
  CheckCircle, 
  Recycle,
  Users,
  ArrowRight,
  Download,
  Zap
} from 'lucide-react';
import Button from '../components/atoms/Button';
import PageHeader from '../components/shared/PageHeader';
import ContentSection from '../components/shared/ContentSection';
import StatsGrid from '../components/shared/StatsGrid';
import SustainabilityPillars from '../components/features/SustainabilityPillars';
import SustainabilityGoals from '../components/features/SustainabilityGoals';
import SustainabilityActions from '../components/features/SustainabilityActions';
import { motion } from 'framer-motion';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/atoms/Card';
import Badge from '../components/atoms/Badge';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const SustainabilityPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Sustainability', current: true }
  ];

  const sustainabilityPillarsData = [
    {
      title: 'Environmental Responsibility',
      description: 'Minimizing our environmental footprint through sustainable practices',
      icon: <Leaf className="w-8 h-8" />,
      color: 'text-green-500'
    },
    {
      title: 'Ethical Sourcing',
      description: 'Working with suppliers who uphold fair labor practices and ethical standards',
      icon: <Globe className="w-8 h-8" />,
      color: 'text-blue-500'
    },
    {
      title: 'Community Impact',
      description: 'Supporting local communities in both Turkey and Africa',
      icon: <Heart className="w-8 h-8" />,
      color: 'text-red-500'
    },
    {
      title: 'Sustainable Innovation',
      description: 'Developing innovative solutions for a more sustainable future',
      icon: <Sun className="w-8 h-8" />,
      color: 'text-yellow-500'
    }
  ];

  const initiatives = [
    {
      title: 'Carbon-Neutral Shipping',
      description: 'We offset 100% of carbon emissions from shipping through investments in renewable energy and reforestation projects.',
      icon: <Truck className="w-6 h-6" />,
      metrics: '5,000+ tons of CO2 offset in 2023',
      color: 'bg-green-100 dark:bg-green-900/20 text-green-600'
    },
    {
      title: 'Sustainable Packaging',
      description: 'Our packaging is made from recycled materials and is fully recyclable or biodegradable.',
      icon: <Package className="w-6 h-6" />,
      metrics: '80% reduction in plastic packaging',
      color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
    },
    {
      title: 'Ethical Supplier Program',
      description: 'We verify and support suppliers who meet our ethical standards for labor practices, environmental responsibility, and quality.',
      icon: <CheckCircle className="w-6 h-6" />,
      metrics: '100% of suppliers ethically verified',
      color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600'
    },
    {
      title: 'Renewable Energy',
      description: 'Our offices and warehouses are powered by renewable energy sources.',
      icon: <Wind className="w-6 h-6" />,
      metrics: '75% renewable energy usage',
      color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600'
    },
    {
      title: 'Water Conservation',
      description: 'We work with suppliers who implement water conservation practices in their manufacturing processes.',
      icon: <Droplet className="w-6 h-6" />,
      metrics: '40% reduction in water usage',
      color: 'bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600'
    },
    {
      title: 'Community Development',
      description: 'We invest in educational and economic development programs in the communities where we operate.',
      icon: <Users className="w-6 h-6" />,
      metrics: '25 community projects funded',
      color: 'bg-red-100 dark:bg-red-900/20 text-red-600'
    }
  ];

  const certifications = [
    { name: 'ISO 14001 Environmental Management', icon: <Leaf className="w-6 h-6" /> },
    { name: 'Fair Trade Certified', icon: <Globe className="w-6 h-6" /> },
    { name: 'GOTS Organic Textile Standard', icon: <Recycle className="w-6 h-6" /> },
    { name: 'Carbon Trust Standard', icon: <Wind className="w-6 h-6" /> }
  ];

  const goals = [
    { year: 2025, goal: 'Carbon-neutral operations across all facilities' },
    { year: 2026, goal: '100% sustainable packaging for all shipments' },
    { year: 2027, goal: '50% reduction in water usage across our supply chain' },
    { year: 2028, goal: '100% renewable energy for all operations' },
    { year: 2030, goal: 'Zero waste to landfill from all operations' }
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
        <section className="bg-gradient-to-r from-green-600 to-green-700 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white">
                <Leaf className="w-4 h-4 mr-2" />
                Our Commitment to Sustainability
              </Badge>

              <h1 className="text-4xl font-bold mb-4">Building a Sustainable Future</h1>

              <p className="text-xl text-green-100 mb-6">
                At NubiaGo, we're committed to sustainable practices that benefit our planet, our partners, and our customers. Discover how we're making a positive impact.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="secondary" 
                  className="bg-white text-green-600 hover:bg-neutral-100"
                >
                  Our Initiatives
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => window.location.hash = 'contact'}
                >
                  Partner With Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability Pillars */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Our Sustainability Pillars
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Four key areas guide our approach to sustainability and responsible business
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sustainabilityPillarsData.map((pillar, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className={`${pillar.color} mb-6 flex justify-center`}>
                      {pillar.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 text-center">
                      {pillar.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-center">
                      {pillar.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Our Approach */}
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
                  Our Approach to Sustainability
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  We integrate sustainability into every aspect of our business
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                      <Recycle className="w-5 h-5 text-green-500 mr-2" />
                      Circular Economy
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      We embrace circular economy principles by designing out waste and pollution, keeping products and materials in use, and regenerating natural systems.
                    </p>
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Promoting products with longer lifecycles</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Encouraging repair and reuse</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Minimizing packaging waste</span>
                      </li>
                    </ul>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                      <Users className="w-5 h-5 text-blue-500 mr-2" />
                      Social Responsibility
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      We ensure that our business practices positively impact people and communities throughout our value chain.
                    </p>
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Fair labor practices across our supply chain</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Supporting local economic development</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Investing in education and skills training</span>
                      </li>
                    </ul>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                      <Globe className="w-5 h-5 text-purple-500 mr-2" />
                      Environmental Stewardship
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      We actively work to reduce our environmental impact and protect natural resources.
                    </p>
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Reducing carbon emissions across operations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Minimizing water usage and waste</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Promoting biodiversity conservation</span>
                      </li>
                    </ul>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card variant="default" padding="lg">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                      <BarChart className="w-5 h-5 text-orange-500 mr-2" />
                      Transparent Reporting
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      We believe in transparency and accountability in our sustainability efforts.
                    </p>
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Annual sustainability reports</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Third-party verification of metrics</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Open communication about challenges</span>
                      </li>
                    </ul>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Initiatives */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Our Key Initiatives
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Concrete actions we're taking to create positive environmental and social impact
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {initiatives.map((initiative, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="default" padding="lg" className="h-full">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={clsx("p-3 rounded-lg flex-shrink-0", initiative.color)}>
                        {initiative.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                        {initiative.title}
                      </h3>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      {initiative.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-center space-x-2">
                        <BarChart className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          {initiative.metrics}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Certifications */}
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
                  Our Certifications
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Third-party verification of our sustainability commitments
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {certifications.map((cert, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card variant="default" padding="lg" className="text-center h-full">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                        {cert.icon}
                      </div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {cert.name}
                      </h3>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="text-center mt-8">
                <p className="text-neutral-600 dark:text-neutral-400">
                  We're continuously working to expand our certifications and improve our sustainability performance.
                </p>
              </motion.div>
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
                Ambitious targets we've set to drive our sustainability journey forward
              </p>
            </motion.div>

            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-200 dark:bg-green-800"></div>

              <div className="space-y-12">
                {goals.map((goal, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative"
                  >
                    <div className="flex items-center">
                      <div className="w-1/2 pr-8 text-right">
                        <div className="inline-block p-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mt-2">
                          {goal.year}
                        </h3>
                      </div>

                      <div className="relative z-10 w-4 h-4 bg-green-600 rounded-full border-4 border-white dark:border-neutral-900"></div>

                      <div className="w-1/2 pl-8">
                        <Card variant="default" padding="md">
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">
                            {goal.goal}
                          </p>
                        </Card>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Join Our Efforts */}
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
                  Join Our Sustainability Efforts
                </h2>
                <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                  Together, we can make a bigger impact. Here's how you can participate in our sustainability journey.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                  <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                    <div className="text-center">
                      <Recycle className="w-8 h-8 mx-auto mb-4 text-green-300" />
                      <h3 className="font-semibold mb-2">Recycle Packaging</h3>
                      <p className="text-sm text-green-100">
                        Recycle or reuse the packaging materials from your orders to reduce waste.
                      </p>
                    </div>
                  </Card>

                  <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                    <div className="text-center">
                      <Heart className="w-8 h-8 mx-auto mb-4 text-green-300" />
                      <h3 className="font-semibold mb-2">Choose Sustainable Products</h3>
                      <p className="text-sm text-green-100">
                        Look for our "Eco-Friendly" badge when shopping to support sustainable products.
                      </p>
                    </div>
                  </Card>

                  <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                    <div className="text-center">
                      <Users className="w-8 h-8 mx-auto mb-4 text-green-300" />
                      <h3 className="font-semibold mb-2">Spread the Word</h3>
                      <p className="text-sm text-green-100">
                        Share our sustainability initiatives with your network to amplify our impact.
                      </p>
                    </div>
                  </Card>
                </div>

                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-green-600 hover:bg-neutral-100"
                  onClick={() => window.location.hash = 'contact'}
                >
                  Contact Our Sustainability Team
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Annual Report */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800/50 dark:to-neutral-800/30">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Award className="w-6 h-6 text-green-600" />
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        2023 Sustainability Report
                      </h2>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      Our annual sustainability report details our environmental and social impact, progress toward our goals, and plans for the future. Download the full report to learn more about our sustainability journey.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        variant="primary" 
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Download Report
                      </Button>
                      <Button variant="outline">
                        View Highlights
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-48 h-64 bg-white dark:bg-neutral-800 rounded-lg shadow-lg flex items-center justify-center p-4 transform rotate-3">
                      <div className="text-center">
                        <Leaf className="w-12 h-12 text-green-500 mx-auto mb-2" />
                        <h3 className="font-bold text-green-600">Sustainability Report</h3>
                        <p className="text-sm text-neutral-500">2023</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SustainabilityPage;