import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, X, Plus, Check, Minus, Star, Shield, Truck } from 'lucide-react';
import { Product } from '../../types';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import { clsx } from 'clsx';

interface ProductComparisonProps {
  maxProducts?: number;
  className?: string;
}

const ProductComparison: React.FC<ProductComparisonProps> = ({
  maxProducts = 4,
  className
}) => {
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Mock products for demonstration
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      originalPrice: 249.99,
      images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'],
      category: 'electronics',
      supplier: {
        id: '1',
        name: 'AudioTech Turkey',
        country: 'Turkey',
        rating: 4.8,
        verified: true,
        totalProducts: 150,
        responseTime: '< 2 hours',
        memberSince: '2020'
      },
      rating: 4.7,
      reviews: 234,
      inStock: true,
      minOrder: 1,
      tags: ['wireless', 'premium', 'noise-cancelling'],
      currency: 'USD',
      description: 'Premium wireless headphones with active noise cancellation',
      specifications: {
        'Battery Life': '30 hours',
        'Connectivity': 'Bluetooth 5.0',
        'Weight': '250g',
        'Warranty': '2 years',
        'Noise Cancellation': 'Active',
        'Driver Size': '40mm'
      }
    },
    {
      id: '2',
      name: 'Professional Audio Headset',
      price: 149.99,
      images: ['https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400'],
      category: 'electronics',
      supplier: {
        id: '2',
        name: 'ProAudio Istanbul',
        country: 'Turkey',
        rating: 4.6,
        verified: true,
        totalProducts: 85,
        responseTime: '< 4 hours',
        memberSince: '2019'
      },
      rating: 4.5,
      reviews: 189,
      inStock: true,
      minOrder: 1,
      tags: ['professional', 'studio', 'wired'],
      currency: 'USD',
      description: 'Professional studio headphones for audio production',
      specifications: {
        'Battery Life': 'N/A (Wired)',
        'Connectivity': '3.5mm Jack',
        'Weight': '320g',
        'Warranty': '1 year',
        'Noise Cancellation': 'Passive',
        'Driver Size': '50mm'
      }
    }
  ];

  const addToComparison = (product: Product) => {
    if (compareProducts.length < maxProducts && !compareProducts.find(p => p.id === product.id)) {
      setCompareProducts(prev => [...prev, product]);
    }
  };

  const removeFromComparison = (productId: string) => {
    setCompareProducts(prev => prev.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setCompareProducts([]);
  };

  // Get all unique specification keys
  const allSpecs = Array.from(
    new Set(
      compareProducts.flatMap(product => 
        Object.keys(product.specifications || {})
      )
    )
  );

  const getSpecValue = (product: Product, spec: string) => {
    return product.specifications?.[spec] || 'N/A';
  };

  const renderSpecComparison = (spec: string, values: string[]) => {
    // Simple comparison logic - you can enhance this
    const uniqueValues = Array.from(new Set(values.filter(v => v !== 'N/A')));
    
    return values.map((value, index) => {
      let status: 'best' | 'good' | 'neutral' = 'neutral';
      
      if (uniqueValues.length > 1 && value !== 'N/A') {
        // For numeric values, try to determine best/worst
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          const numericValues = values.map(v => parseFloat(v)).filter(v => !isNaN(v));
          const max = Math.max(...numericValues);
          const min = Math.min(...numericValues);
          
          if (spec.toLowerCase().includes('battery') || spec.toLowerCase().includes('warranty')) {
            status = numericValue === max ? 'best' : numericValue === min ? 'neutral' : 'good';
          } else if (spec.toLowerCase().includes('weight')) {
            status = numericValue === min ? 'best' : numericValue === max ? 'neutral' : 'good';
          }
        }
      }

      return (
        <td key={index} className="px-4 py-3 text-center">
          <span className={clsx(
            'inline-flex items-center px-2 py-1 rounded-full text-sm',
            status === 'best' && 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
            status === 'good' && 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
            status === 'neutral' && 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300'
          )}>
            {value}
          </span>
        </td>
      );
    });
  };

  return (
    <>
      {/* Comparison Trigger */}
      <div className={clsx('fixed bottom-4 right-4 z-40', className)}>
        <AnimatePresence>
          {compareProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 p-4 min-w-[300px]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Scale className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    Compare Products
                  </span>
                </div>
                <button
                  onClick={clearComparison}
                  className="text-neutral-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex space-x-2 mb-3">
                {compareProducts.map((product) => (
                  <div key={product.id} className="relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeFromComparison(product.id)}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                    >
                      <X className="w-2 h-2" />
                    </button>
                  </div>
                ))}
                
                {compareProducts.length < maxProducts && (
                  <div className="w-12 h-12 border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg flex items-center justify-center">
                    <Plus className="w-4 h-4 text-neutral-400" />
                  </div>
                )}
              </div>

              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => setIsOpen(true)}
                disabled={compareProducts.length < 2}
              >
                Compare ({compareProducts.length})
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Demo Add Buttons */}
      <div className="fixed bottom-4 left-4 space-y-2">
        {mockProducts.map((product) => (
          <Button
            key={product.id}
            variant="outline"
            size="sm"
            onClick={() => addToComparison(product)}
            disabled={compareProducts.find(p => p.id === product.id) !== undefined}
            leftIcon={<Plus className="w-3 h-3" />}
          >
            Add {product.name.split(' ')[0]}
          </Button>
        ))}
      </div>

      {/* Comparison Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl max-h-[90vh] overflow-hidden"
            >
              <Card variant="default" padding="lg" className="relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    Product Comparison
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Compare features, specifications, and prices side by side
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-4 font-medium text-neutral-900 dark:text-neutral-100">
                          Product
                        </th>
                        {compareProducts.map((product) => (
                          <th key={product.id} className="p-4 text-center min-w-[250px]">
                            <div className="space-y-3">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-24 h-24 object-cover rounded-lg mx-auto"
                              />
                              <div>
                                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                                  {product.name}
                                </h3>
                                <p className="text-xs text-neutral-500 mt-1">
                                  by {product.supplier.name}
                                </p>
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                      {/* Price */}
                      <tr>
                        <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                          Price
                        </td>
                        {compareProducts.map((product) => (
                          <td key={product.id} className="px-4 py-3 text-center">
                            <div className="space-y-1">
                              <div className="text-lg font-bold text-red-600">
                                ${product.price}
                              </div>
                              {product.originalPrice && (
                                <div className="text-sm text-neutral-500 line-through">
                                  ${product.originalPrice}
                                </div>
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Rating */}
                      <tr>
                        <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                          Rating
                        </td>
                        {compareProducts.map((product) => (
                          <td key={product.id} className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="font-medium">{product.rating}</span>
                              <span className="text-sm text-neutral-500">
                                ({product.reviews})
                              </span>
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Supplier */}
                      <tr>
                        <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                          Supplier
                        </td>
                        {compareProducts.map((product) => (
                          <td key={product.id} className="px-4 py-3 text-center">
                            <div className="space-y-1">
                              <div className="flex items-center justify-center space-x-1">
                                <span className="font-medium">{product.supplier.name}</span>
                                {product.supplier.verified && (
                                  <Shield className="w-4 h-4 text-green-500" />
                                )}
                              </div>
                              <div className="text-xs text-neutral-500">
                                {product.supplier.country}
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Stock Status */}
                      <tr>
                        <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                          Availability
                        </td>
                        {compareProducts.map((product) => (
                          <td key={product.id} className="px-4 py-3 text-center">
                            <Badge
                              variant={product.inStock ? 'success' : 'error'}
                              size="sm"
                            >
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                          </td>
                        ))}
                      </tr>

                      {/* Specifications */}
                      {allSpecs.map((spec) => (
                        <tr key={spec}>
                          <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                            {spec}
                          </td>
                          {renderSpecComparison(
                            spec,
                            compareProducts.map(product => getSpecValue(product, spec))
                          )}
                        </tr>
                      ))}

                      {/* Actions */}
                      <tr>
                        <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                          Actions
                        </td>
                        {compareProducts.map((product) => (
                          <td key={product.id} className="px-4 py-3 text-center">
                            <div className="space-y-2">
                              <Button
                                variant="primary"
                                size="sm"
                                fullWidth
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Add to Cart
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                fullWidth
                              >
                                View Details
                              </Button>
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductComparison;