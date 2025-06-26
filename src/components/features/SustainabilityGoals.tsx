
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Recycle } from 'lucide-react';
import Card from '../atoms/Card';

const SustainabilityGoals: React.FC = () => {
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
      className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
    >
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
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Carbon Neutrality by 2030
          </h3>
          <div className="space-y-4">
            <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Carbon Reduction Progress
                </span>
                <span className="text-sm font-bold text-green-700 dark:text-green-300">
                  65%
                </span>
              </div>
              <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Renewable energy adoption</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Supply chain optimization</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Carbon offset programs</span>
              </li>
            </ul>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SustainabilityGoals;
