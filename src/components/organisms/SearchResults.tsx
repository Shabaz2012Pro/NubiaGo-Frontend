import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  SlidersHorizontal, 
  Star, 
  MapPin, 
  Truck, 
  X,
  ChevronDown,
  ArrowUpDown,
  Zap,
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Product } from '../../types';
import ProductCard from '../molecules/ProductCard';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import Card from '../atoms/Card';
import Input from '../atoms/Input';
import { clsx } from 'clsx';

interface SearchResultsProps {
  query: string;
  results: Product[];
  totalResults: number;
  loading?: boolean;
  onSearch?: (query: string, filters?: any) => void;
  className?: string;
}

interface FilterState {
  priceRange: [number, number];
  categories: string[];
  suppliers: string[];
  rating: number;
  inStock: boolean;
  freeShipping: boolean;
  verified: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  results,
  totalResults,
  loading = false,
  onSearch,
  className
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    categories: [],
    suppliers: [],
    rating: 0,
    inStock: false,
    freeShipping: false,
    verified: false
  });

  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  // Mock trending searches and suggestions
  const trendingSearches = [
    'Wireless Headphones',
    'Smart Watch',
    'Turkish Coffee',
    'Leather Bags',
    'Home Appliances'
  ];

  const searchSuggestions = [
    'wireless bluetooth headphones',
    'premium audio equipment',
    'noise cancelling headphones',
    'gaming headsets',
    'sports earbuds'
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Best Match' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Beauty',
    'Sports',
    'Automotive'
  ];

  const suppliers = [
    'AudioTech Turkey',
    'FitTech Istanbul',
    'Istanbul Leather Co.',
    'TechCorp Turkey',
    'Anatolian Textiles'
  ];

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      categories: [],
      suppliers: [],
      rating: 0,
      inStock: false,
      freeShipping: false,
      verified: false
    });
  };

  const hasActiveFilters = () => {
    return filters.categories.length > 0 ||
           filters.suppliers.length > 0 ||
           filters.rating > 0 ||
           filters.inStock ||
           filters.freeShipping ||
           filters.verified ||
           filters.priceRange[0] > 0 ||
           filters.priceRange[1] < 1000;
  };

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

  // No results state
  if (!loading && results.length === 0 && query) {
    return (
      <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8', className)}>
        <Card variant="default" padding="lg" className="text-center">
          <div className="max-w-md mx-auto">
            <AlertCircle className="w-16 h-16 text-neutral-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              No results found for "{query}"
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              We couldn't find any products matching your search. Try adjusting your search terms or browse our categories.
            </p>
            
            {/* Search Suggestions */}
            <div className="mb-6">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                Try searching for:
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {searchSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => onSearch?.(suggestion)}
                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full text-sm hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Searches */}
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                Trending Searches:
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {trendingSearches.map((trend, index) => (
                  <button
                    key={trend}
                    onClick={() => onSearch?.(trend)}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors"
                  >
                    <TrendingUp className="w-3 h-3" />
                    <span>{trend}</span>
                    <Badge variant="primary" size="sm" className="ml-1">
                      {index + 1}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8', className)}>
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-5 h-5 text-neutral-500" />
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Search Results
          </h1>
          {query && (
            <span className="text-neutral-600 dark:text-neutral-400">
              for "{query}"
            </span>
          )}
        </div>
        
        {!loading && (
          <p className="text-neutral-600 dark:text-neutral-400">
            {totalResults.toLocaleString()} products found
            {hasActiveFilters() && ' (filtered)'}
          </p>
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
                Filters {hasActiveFilters() && `(${Object.values(filters).filter(Boolean).length})`}
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
                        <Button variant="ghost" size="sm" onClick={clearFilters}>
                          Clear All
                        </Button>
                      )}
                    </div>

                    <div className="space-y-6">
                      {/* Price Range */}
                      <div>
                        <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                          Price Range
                        </h3>
                        <div className="space-y-3">
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Min"
                              value={filters.priceRange[0].toString()}
                              onChange={(value) => updateFilter('priceRange', [parseInt(value) || 0, filters.priceRange[1]])}
                            />
                            <Input
                              placeholder="Max"
                              value={filters.priceRange[1].toString()}
                              onChange={(value) => updateFilter('priceRange', [filters.priceRange[0], parseInt(value) || 1000])}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Categories */}
                      <div>
                        <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                          Categories
                        </h3>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <label key={category} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={filters.categories.includes(category)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    updateFilter('categories', [...filters.categories, category]);
                                  } else {
                                    updateFilter('categories', filters.categories.filter(c => c !== category));
                                  }
                                }}
                                className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                              />
                              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                {category}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Rating */}
                      <div>
                        <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                          Customer Rating
                        </h3>
                        <div className="space-y-2">
                          {[4, 3, 2, 1].map((rating) => (
                            <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="rating"
                                checked={filters.rating === rating}
                                onChange={() => updateFilter('rating', rating)}
                                className="text-red-600 focus:ring-red-500"
                              />
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={clsx(
                                      'w-4 h-4',
                                      i < rating ? 'text-gold-500 fill-current' : 'text-neutral-300'
                                    )}
                                  />
                                ))}
                                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                  & up
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Quick Filters */}
                      <div>
                        <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                          Quick Filters
                        </h3>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filters.inStock}
                              onChange={(e) => updateFilter('inStock', e.target.checked)}
                              className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm text-neutral-700 dark:text-neutral-300">
                              In Stock Only
                            </span>
                          </label>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filters.freeShipping}
                              onChange={(e) => updateFilter('freeShipping', e.target.checked)}
                              className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm text-neutral-700 dark:text-neutral-300">
                              Free Shipping
                            </span>
                          </label>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filters.verified}
                              onChange={(e) => updateFilter('verified', e.target.checked)}
                              className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm text-neutral-700 dark:text-neutral-300">
                              Verified Suppliers
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Suppliers */}
                      <div>
                        <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                          Suppliers
                        </h3>
                        <div className="space-y-2">
                          {suppliers.slice(0, 5).map((supplier) => (
                            <label key={supplier} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={filters.suppliers.includes(supplier)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    updateFilter('suppliers', [...filters.suppliers, supplier]);
                                  } else {
                                    updateFilter('suppliers', filters.suppliers.filter(s => s !== supplier));
                                  }
                                }}
                                className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                              />
                              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                {supplier}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {/* Results Header */}
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
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Active Filters */}
              {hasActiveFilters() && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Filters:</span>
                  <div className="flex flex-wrap gap-1">
                    {filters.categories.map((category) => (
                      <Badge key={category} variant="primary" size="sm" className="cursor-pointer">
                        {category}
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                    {filters.inStock && (
                      <Badge variant="success" size="sm">In Stock</Badge>
                    )}
                    {filters.verified && (
                      <Badge variant="gold" size="sm">Verified</Badge>
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

          {/* Results Grid */}
          {!loading && results.length > 0 && (
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
              {results.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
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
          )}

          {/* Pagination */}
          {!loading && results.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              >
                Previous
              </Button>
              
              {[...Array(Math.min(5, totalPages))].map((_, index) => {
                const page = index + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "primary" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className="w-10 h-10"
                  >
                    {page}
                  </Button>
                );
              })}
              
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;