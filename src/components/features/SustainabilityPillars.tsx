
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Globe, Heart, Sun } from 'lucide-react';
import Card from '../atoms/Card';

const SustainabilityPillars: React.FC = () => {
  const sustainabilityPillars = [
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {sustainabilityPillars.map((pillar, index) => (
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
    </motion.div>
  );
};

export default SustainabilityPillars;
