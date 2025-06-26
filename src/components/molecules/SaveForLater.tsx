import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Plus, X, Folder, Grid, List, Search } from 'lucide-react';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import { clsx } from 'clsx';

interface Collection {
  id: string;
  name: string;
  description?: string;
  products: Product[];
  createdAt: Date;
  isPublic: boolean;
}

interface SaveForLaterProps {
  className?: string;
}

const SaveForLater: React.FC<SaveForLaterProps> = ({ className }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');

  // Mock data
  useEffect(() => {
    const mockCollections: Collection[] = [
      {
        id: '1',
        name: 'Electronics Wishlist',
        description: 'Latest tech gadgets I want to buy',
        products: [
          {
            id: '1',
            name: 'Wireless Headphones',
            price: 199.99,
            images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'],
            category: 'electronics',
            supplier: {
              id: '1',
              name: 'TechCorp Turkey',
              country: 'Turkey',
              rating: 4.8,
              verified: true,
              totalProducts: 150,
              responseTime: '< 2 hours',
              memberSince: '2020'
            },
            rating: 4.5,
            reviews: 128,
            inStock: true,
            minOrder: 1,
            tags: ['wireless', 'premium'],
            currency: 'USD',
            description: 'Premium wireless headphones'
          }
        ],
        createdAt: new Date('2024-01-15'),
        isPublic: false
      },
      {
        id: '2',
        name: 'Home Decor Ideas',
        description: 'Beautiful items for home decoration',
        products: [],
        createdAt: new Date('2024-01-20'),
        isPublic: true
      }
    ];

    setCollections(mockCollections);
    if (mockCollections.length > 0) {
      setSelectedCollection(mockCollections[0].id);
    }
  }, []);

  const createCollection = () => {
    if (!newCollectionName.trim()) return;

    const newCollection: Collection = {
      id: Date.now().toString(),
      name: newCollectionName.trim(),
      description: newCollectionDescription.trim(),
      products: [],
      createdAt: new Date(),
      isPublic: false
    };

    setCollections(prev => [...prev, newCollection]);
    setSelectedCollection(newCollection.id);
    setNewCollectionName('');
    setNewCollectionDescription('');
    setShowCreateForm(false);
  };

  const deleteCollection = (collectionId: string) => {
    setCollections(prev => prev.filter(c => c.id !== collectionId));
    if (selectedCollection === collectionId) {
      setSelectedCollection(collections[0]?.id || null);
    }
  };

  const removeFromCollection = (collectionId: string, productId: string) => {
    setCollections(prev => prev.map(collection => 
      collection.id === collectionId
        ? { ...collection, products: collection.products.filter(p => p.id !== productId) }
        : collection
    ));
  };

  const selectedCollectionData = collections.find(c => c.id === selectedCollection);
  const filteredProducts = selectedCollectionData?.products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8', className)}>
      <div className="flex items-center space-x-3 mb-8">
        <Bookmark className="w-6 h-6 text-blue-500" />
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Saved Collections
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Collections Sidebar */}
        <div className="lg:col-span-1">
          <Card variant="default" padding="md" className="sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">
                Collections
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreateForm(true)}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                New
              </Button>
            </div>

            <div className="space-y-2">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => setSelectedCollection(collection.id)}
                  className={clsx(
                    'w-full text-left p-3 rounded-lg transition-colors group',
                    selectedCollection === collection.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{collection.name}</h3>
                      <p className="text-xs text-neutral-500 mt-1">
                        {collection.products.length} items
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {collection.isPublic && (
                        <Badge variant="success" size="sm">Public</Badge>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCollection(collection.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-500 transition-all"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Create Collection Form */}
            <AnimatePresence>
              {showCreateForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700"
                >
                  <div className="space-y-3">
                    <Input
                      placeholder="Collection name"
                      value={newCollectionName}
                      onChange={setNewCollectionName}
                      leftIcon={<Folder className="w-4 h-4" />}
                    />
                    <Input
                      placeholder="Description (optional)"
                      value={newCollectionDescription}
                      onChange={setNewCollectionDescription}
                    />
                    <div className="flex space-x-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={createCollection}
                        disabled={!newCollectionName.trim()}
                      >
                        Create
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCreateForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>

        {/* Collection Content */}
        <div className="lg:col-span-3">
          {selectedCollectionData ? (
            <>
              {/* Collection Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                      {selectedCollectionData.name}
                    </h2>
                    {selectedCollectionData.description && (
                      <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                        {selectedCollectionData.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' ? 'bg-neutral-100 dark:bg-neutral-700' : ''}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 'bg-neutral-100 dark:bg-neutral-700' : ''}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Search */}
                <Input
                  placeholder="Search in this collection..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                  leftIcon={<Search className="w-4 h-4" />}
                  className="max-w-md"
                />
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={clsx(
                    'grid gap-6',
                    viewMode === 'grid'
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                      : 'grid-cols-1'
                  )}
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={itemVariants}
                      className="relative group"
                    >
                      <button
                        onClick={() => removeFromCollection(selectedCollectionData.id, product.id)}
                        className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 dark:bg-neutral-800/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                      
                      <ProductCard
                        product={product}
                        onAddToCart={(p) => console.log('Add to cart:', p.name)}
                        onAddToWishlist={(p) => console.log('Add to wishlist:', p.name)}
                        onQuickView={(p) => console.log('Quick view:', p.name)}
                        compact={viewMode === 'list'}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <Bookmark className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    {searchQuery ? 'No products found' : 'Collection is empty'}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {searchQuery 
                      ? 'Try adjusting your search terms'
                      : 'Start adding products to this collection'
                    }
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Folder className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                No collections yet
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Create your first collection to save products for later
              </p>
              <Button
                variant="primary"
                onClick={() => setShowCreateForm(true)}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Create Collection
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaveForLater;