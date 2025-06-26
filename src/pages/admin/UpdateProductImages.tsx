import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Image, 
  Upload, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  Save,
  Database
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import Badge from '../../components/atoms/Badge';
import { supabase } from '../../api/supabaseClient';
import { clsx } from 'clsx';

interface Product {
  id: string;
  name: string;
  images: string[];
  category: string;
}

const aiGeneratedImages = {
  'electronics': [
    'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'fashion': [
    'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1078958/pexels-photo-1078958.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'home-appliances': [
    'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/6758773/pexels-photo-6758773.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/6758771/pexels-photo-6758771.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/6957889/pexels-photo-6957889.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'beauty': [
    'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2253834/pexels-photo-2253834.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'sports': [
    'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/4753987/pexels-photo-4753987.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'automotive': [
    'https://images.pexels.com/photos/1028742/pexels-photo-1028742.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'food-beverage': [
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'default': [
    'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2292953/pexels-photo-2292953.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800'
  ]
};

const UpdateProductImages: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<{
    success: boolean;
    message: string;
    updatedCount: number;
  } | null>(null);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, name, images, category')
          .limit(20);

        if (error) {
          throw error;
        }

        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to mock data if Supabase fetch fails
        setProducts([
          { id: '1', name: 'Wireless Headphones', images: ['/brandmark-design-1024x0 (3) copy.png'], category: 'electronics' },
          { id: '2', name: 'Smart Watch', images: ['/brandmark-design-1024x0 (3) copy.png'], category: 'electronics' },
          { id: '3', name: 'Leather Bag', images: ['/brandmark-design-1024x0 (3) copy.png'], category: 'fashion' },
          { id: '4', name: 'Kitchen Knife Set', images: ['/brandmark-design-1024x0 (3) copy.png'], category: 'home-appliances' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get AI-generated image for a product based on its category
  const getAiGeneratedImage = (category: string): string => {
    const categoryImages = aiGeneratedImages[category as keyof typeof aiGeneratedImages] || aiGeneratedImages.default;
    const randomIndex = Math.floor(Math.random() * categoryImages.length);
    return categoryImages[randomIndex];
  };

  // Update product images in Supabase
  const updateProductImages = async () => {
    setIsUpdating(true);
    setUpdateStatus(null);
    
    try {
      let updatedCount = 0;
      
      for (const product of products) {
        const newImage = getAiGeneratedImage(product.category);
        
        const { error } = await supabase
          .from('products')
          .update({ images: [newImage] })
          .eq('id', product.id);
          
        if (error) {
          console.error(`Error updating product ${product.id}:`, error);
        } else {
          updatedCount++;
        }
      }
      
      // Update local state with new images
      setProducts(products.map(product => ({
        ...product,
        images: [getAiGeneratedImage(product.category)]
      })));
      
      setUpdateStatus({
        success: true,
        message: 'Product images updated successfully!',
        updatedCount
      });
    } catch (error) {
      console.error('Error updating product images:', error);
      setUpdateStatus({
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred while updating product images',
        updatedCount: 0
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AdminLayout title="Update Product Images" subtitle="Replace product images with AI-generated alternatives">
      <Card variant="default" padding="lg" className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Image className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                Update Product Images
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Replace current product images with high-quality AI-generated alternatives
              </p>
            </div>
          </div>
          
          <Button
            variant="primary"
            onClick={updateProductImages}
            loading={isUpdating}
            leftIcon={isUpdating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            className="bg-red-600 hover:bg-red-700"
            disabled={isLoading || products.length === 0}
          >
            {isUpdating ? 'Updating Images...' : 'Update All Images'}
          </Button>
        </div>
        
        {updateStatus && (
          <div className={clsx(
            'p-4 rounded-lg mb-6',
            updateStatus.success ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
          )}>
            <div className="flex items-start space-x-3">
              {updateStatus.success ? (
                <Check className={clsx(
                  'w-5 h-5 mt-0.5',
                  updateStatus.success ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                )} />
              ) : (
                <AlertCircle className="w-5 h-5 mt-0.5 text-red-600 dark:text-red-400" />
              )}
              <div>
                <p className={clsx(
                  'font-medium',
                  updateStatus.success ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'
                )}>
                  {updateStatus.success ? 'Success!' : 'Error!'}
                </p>
                <p className={clsx(
                  'text-sm',
                  updateStatus.success ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                )}>
                  {updateStatus.message}
                </p>
                {updateStatus.success && (
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    Updated {updateStatus.updatedCount} of {products.length} products.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-3 mb-4">
          <Database className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
            Database Connection
          </h3>
        </div>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
          <div className="flex items-start space-x-3">
            <div>
              <p className="font-medium text-blue-800 dark:text-blue-300">
                Using Supabase for image storage
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                This tool will update product images in your Supabase database. Make sure your database connection is properly configured.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Products ({products.length})
          </h3>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-neutral-200 dark:bg-neutral-700 rounded-lg aspect-square mb-2"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden"
                >
                  <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="primary" size="sm">{product.category}</Badge>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-neutral-500">ID: {product.id.substring(0, 8)}...</span>
                      <Button
                        variant="ghost"
                        size="xs"
                        leftIcon={<RefreshCw className="w-3 h-3" />}
                        onClick={() => {
                          const updatedProducts = [...products];
                          const index = updatedProducts.findIndex(p => p.id === product.id);
                          if (index !== -1) {
                            updatedProducts[index] = {
                              ...updatedProducts[index],
                              images: [getAiGeneratedImage(product.category)]
                            };
                            setProducts(updatedProducts);
                          }
                        }}
                      >
                        Preview
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Image className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                No Products Found
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                There are no products in the database to update.
              </p>
              <Button
                variant="outline"
                leftIcon={<RefreshCw className="w-4 h-4" />}
                onClick={() => window.location.reload()}
              >
                Refresh
              </Button>
            </div>
          )}
        </div>
      </Card>
    </AdminLayout>
  );
};

export default UpdateProductImages;