import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Grid, 
  List, 
  ArrowRight, 
  ChevronRight,
  Package,
  Star,
  Truck,
  Shield,
  Tag,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X
} from 'lucide-react';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import Card from '../atoms/Card';
import Input from '../atoms/Input';
import CategoryFilter from '../molecules/CategoryFilter';
import { Product } from '../../types';
import { clsx } from 'clsx';
import { useWishlistStore } from '../../store';
import ProductCardOptimized from '../molecules/ProductCardOptimized';
import ProductQuickView from './ProductQuickView';
import { productApi } from '../../api/productApi';

interface ProductsGridProps {
  products?: Product[];
  loading?: boolean;
  initialCategory?: string;
  title?: string;
  description?: string;
  onProductClick?: (product: Product) => void;
  className?: string;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products: initialProducts,
  loading: initialLoading = false,
  initialCategory = '',
  title = 'All Products',
  description = 'Discover premium products from verified Turkish suppliers',
  onProductClick,
  className
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(initialLoading);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Get wishlist state
  const { addItem: addToWishlist } = useWishlistStore();

  // Mock categories for filter
  const categories = [
    { id: 'electronics', label: 'Electronics', count: 2500 },
    { id: 'fashion', label: 'Fashion', count: 3200 },
    { id: 'home-appliances', label: 'Home Appliances', count: 1800 },
    { id: 'beauty', label: 'Beauty & Personal Care', count: 950 },
    { id: 'sports', label: 'Sports & Fitness', count: 720 },
    { id: 'automotive', label: 'Automotive', count: 580 },
    { id: 'food-beverage', label: 'Food & Beverage', count: 450 },
    { id: 'baby-kids', label: 'Baby & Kids', count: 380 }
  ];

  // Mock suppliers for filter
  const suppliers = [
    { id: '1', label: 'AudioTech Turkey', count: 150 },
    { id: '2', label: 'FitTech Istanbul', count: 85 },
    { id: '3', label: 'Istanbul Leather Co.', count: 95 },
    { id: '4', label: 'Anatolian Delights', count: 120 },
    { id: '5', label: 'Beauty Pro Turkey', count: 120 }
  ];

  // Mock price ranges for filter
  const priceRanges = [
    { id: '0-50', label: 'Under $50', count: 1200 },
    { id: '50-100', label: '$50 - $100', count: 2300 },
    { id: '100-200', label: '$100 - $200', count: 1800 },
    { id: '200-500', label: '$200 - $500', count: 950 },
    { id: '500-1000', label: '$500 - $1000', count: 420 },
    { id: '1000+', label: 'Over $1000', count: 180 }
  ];

  // Mock ratings for filter
  const ratings = [
    { id: '4', label: '4★ & up', count: 3500 },
    { id: '3', label: '3★ & up', count: 4800 },
    { id: '2', label: '2★ & up', count: 5200 },
    { id: '1', label: '1★ & up', count: 5500 }
  ];

  // Fetch products based on category
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const filters: any = {};
      
      if (initialCategory) {
        filters.category = initialCategory;
      }
      
      const fetchedProducts = await productApi.getProducts(filters);
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [initialCategory]);

  // Initialize products
  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
      setLoading(false);
    } else {
      fetchProducts();
    }
  }, [initialProducts, fetchProducts]);

  // Apply filters when they change
  useEffect(() => {
    if (products.length === 0) return;

    setLoading(true);

    // Simulate API call with delay
    setTimeout(() => {
      let filtered = [...products];

      // Apply category filter
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(product => selectedCategories.includes(product.category));
      }

      // Apply price range filter
      filtered = filtered.filter(product => 
        product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]
      );

      // Apply rating filter
      if (selectedRating > 0) {
        filtered = filtered.filter(product => product.rating >= selectedRating);
      }

      // Apply supplier filter
      if (selectedSuppliers.length > 0) {
        filtered = filtered.filter(product => 
          selectedSuppliers.includes(product.supplier.id)
        );
      }

      // Apply in stock filter
      if (inStockOnly) {
        filtered = filtered.filter(product => product.inStock);
      }

      // Apply on sale filter
      if (onSaleOnly) {
        filtered = filtered.filter(product => product.originalPrice !== undefined);
      }

      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }

      // Apply sorting
      switch (sortBy) {
        case 'price_low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // Assuming newer products have higher IDs or are marked as "new"
          filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
        default:
          // Default sorting (relevance)
          break;
      }

      setFilteredProducts(filtered);
      setLoading(false);
    }, 500);
  }, [
    products, 
    selectedCategories, 
    selectedPriceRange, 
    selectedRating, 
    selectedSuppliers, 
    inStockOnly, 
    onSaleOnly, 
    searchQuery, 
    sortBy
  ]);

  const handleProductClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      // Default behavior - navigate to product detail
      window.location.hash = `product?id=${product.id}`;
    }
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCategoryChange = (selected: string[]) => {
    setSelectedCategories(selected);
  };

  const handleSupplierChange = (selected: string[]) => {
    setSelectedSuppliers(selected);
  };

  const handlePriceRangeChange = (selected: string[]) => {
    if (selected.length === 0) {
      setSelectedPriceRange([0, 1000]);
      return;
    }

    // Get min and max from selected ranges
    let min = 1000;
    let max = 0;

    selected.forEach(range => {
      if (range === '0-50') {
        min = Math.min(min, 0);
        max = Math.max(max, 50);
      } else if (range === '50-100') {
        min = Math.min(min, 50);
        max = Math.max(max, 100);
      } else if (range === '100-200') {
        min = Math.min(min, 100);
        max = Math.max(max, 200);
      } else if (range === '200-500') {
        min = Math.min(min, 200);
        max = Math.max(max, 500);
      } else if (range === '500-1000') {
        min = Math.min(min, 500);
        max = Math.max(max, 1000);
      } else if (range === '1000+') {
        min = Math.min(min, 1000);
        max = Math.max(max, 10000);
      }
    });

    setSelectedPriceRange([min, max]);
  };

  const handleRatingChange = (selected: string[]) => {
    if (selected.length === 0) {
      setSelectedRating(0);
      return;
    }

    // Get minimum rating from selected
    const minRating = Math.min(...selected.map(r => parseInt(r)));
    setSelectedRating(minRating);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearAllFilters = () => {
    setSelectedCategories(initialCategory ? [initialCategory] : []);
    setSelectedPriceRange([0, 1000]);
    setSelectedRating(0);
    setSelectedSuppliers([]);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSearchQuery('');
  };

  const hasActiveFilters = () => {
    return (
      (selectedCategories.length > (initialCategory ? 1 : 0)) ||
      selectedPriceRange[0] > 0 ||
      selectedPriceRange[1] < 1000 ||
      selectedRating > 0 ||
      selectedSuppliers.length > 0 ||
      inStockOnly ||
      onSaleOnly ||
      searchQuery !== ''
    );
  };

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
    <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          {title}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
          {description}
        </p>

        {!loading && (
          <div className="flex items-center space-x-4 text-sm text-neutral-600 dark:text-neutral-400">
            <span>{filteredProducts.length.toLocaleString()} products found</span>
            {hasActiveFilters() && (
              <Badge variant="primary" size="sm">
                Filtered
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                leftIcon={<Filter className="w-4 h-4" />}
                fullWidth
              >
                Filters {hasActiveFilters() && `(Active)`}
              </Button>
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
              {(showFilters || window.innerWidth >= 1024) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:opacity-100 lg:h-auto"
                >
                  <Card variant="default" padding="lg">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Filters
                      </h2>
                      {hasActiveFilters() && (
                        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                          Clear All
                        </Button>
                      )}
                    </div>

                    <div className="space-y-6">
                      {/* Search */}
                      <div>
                        <Input
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={setSearchQuery}
                          leftIcon={<Search className="w-4 h-4" />}
                        />
                      </div>

                      {/* Categories */}
                      <CategoryFilter
                        title="Categories"
                        options={categories}
                        selectedOptions={selectedCategories}
                        onChange={handleCategoryChange}
                      />

                      {/* Price Range */}
                      <CategoryFilter
                        title="Price Range"
                        options={priceRanges}
                        selectedOptions={[]}
                        onChange={handlePriceRangeChange}
                      />

                      {/* Rating */}
                      <CategoryFilter
                        title="Rating"
                        options={ratings}
                        selectedOptions={[]}
                        onChange={handleRatingChange}
                      />

                      {/* Suppliers */}
                      <CategoryFilter
                        title="Suppliers"
                        options={suppliers}
                        selectedOptions={selectedSuppliers}
                        onChange={handleSupplierChange}
                      />

                      {/* Quick Filters */}
                      <div>
                        <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3 flex items-center">
                          <SlidersHorizontal className="w-4 h-4 mr-2 text-neutral-500" />
                          Quick Filters
                        </h3>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={inStockOnly}
                              onChange={(e) => setInStockOnly(e.target.checked)}
                              className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm text-neutral-700 dark:text-neutral-300">
                              In Stock Only
                            </span>
                          </label>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={onSaleOnly}
                              onChange={(e) => setOnSaleOnly(e.target.checked)}
                              className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm text-neutral-700 dark:text-neutral-300">
                              On Sale Only
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Products Section */}
        <div className="lg:col-span-3">
          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {/* Sort */}
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="w-4 h-4 text-neutral-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-neutral-300 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-800 text-sm"
                >
                  <option value="relevance">Best Match</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Active Filters */}
              {hasActiveFilters() && (
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Active filters:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedCategories.map((category) => {
                      const categoryObj = categories.find(c => c.id === category);
                      return (
                        <Badge 
                          key={category} 
                          variant="primary" 
                          size="sm" 
                          className="cursor-pointer flex items-center"
                          onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== category))}
                        >
                          {categoryObj?.label || category}
                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      );
                    })}
                    {inStockOnly && (
                      <Badge 
                        variant="success" 
                        size="sm"
                        className="cursor-pointer flex items-center"
                        onClick={() => setInStockOnly(false)}
                      >
                        In Stock
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    )}
                    {onSaleOnly && (
                      <Badge 
                        variant="error" 
                        size="sm"
                        className="cursor-pointer flex items-center"
                        onClick={() => setOnSaleOnly(false)}
                      >
                        On Sale
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* View Toggle */}
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

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-neutral-200 dark:bg-neutral-700 rounded-xl h-80"></div>
                </div>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {!loading && (
            <>
              {filteredProducts.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={clsx(
                    'grid gap-6 mb-8',
                    viewMode === 'grid'
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                      : 'grid-cols-1'
                  )}
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div key={product.id} variants={itemVariants}>
                      <ProductCardOptimized
                        product={product}
                        variant={viewMode === 'list' ? 'compact' : 'default'}
                        onQuickView={() => handleQuickView(product)}
                        priority={index < 3} // Only prioritize the first 3 images
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    No products found
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button variant="primary" onClick={clearAllFilters} className="bg-red-600 hover:bg-red-700">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {!loading && filteredProducts.length > 0 && (
            <div className="flex justify-center mt-8">              <nav className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="primary" size="sm" className="bg-red-600">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <span className="px-2">...</span>
                <Button variant="outline" size="sm">
                  10
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView 
          product={quickViewProduct} 
          isOpen={!!quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
        />
      )}
    </div>
  );
};

export default ProductsGrid;