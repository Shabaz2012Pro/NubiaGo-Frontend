
import React from 'react';
import { motion } from 'framer-motion';
import Card from '../atoms/Card';

interface ContentSectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  variant?: 'default' | 'card' | 'fullwidth';
  animate?: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  subtitle,
  children,
  className = '',
  containerClassName = '',
  variant = 'default',
  animate = true
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const content = (
    <>
      {(title || subtitle) && (
        <motion.div 
          variants={animate ? itemVariants : undefined}
          className="text-center mb-12"
        >
          {title && (
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}
      
      <motion.div variants={animate ? itemVariants : undefined}>
        {children}
      </motion.div>
    </>
  );

  const sectionContent = animate ? (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {content}
    </motion.div>
  ) : content;

  if (variant === 'card') {
    return (
      <section className={`py-16 ${className}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
          <Card variant="default" padding="xl">
            {sectionContent}
          </Card>
        </div>
      </section>
    );
  }

  if (variant === 'fullwidth') {
    return (
      <section className={`py-16 ${className}`}>
        <div className={containerClassName}>
          {sectionContent}
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {sectionContent}
      </div>
    </section>
  );
};

export default ContentSection;
