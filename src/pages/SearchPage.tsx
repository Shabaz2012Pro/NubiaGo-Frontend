import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchResults from '../components/organisms/SearchResults';
import { Product } from '../types';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  // Mock search results
  const mockResults: Product[] = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones with active noise cancellation',
      price: 199.99,
      originalPrice: 249.99,
      currency: 'USD',
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
      isNew: true,
      isFeatured: true
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      description: 'Advanced fitness tracking with health monitoring',
      price: 299.99,
      currency: 'USD',
      images: ['https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400'],
      category: 'electronics',
      supplier: {
        id: '2',
        name: 'FitTech Istanbul',
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
      tags: ['fitness', 'smart', 'health'],
      isNew: true
    },
    {
      id: '3',
      name: 'Handcrafted Leather Bag',
      description: 'Premium leather bag handcrafted by Turkish artisans',
      price: 129.99,
      currency: 'USD',
      images: ['https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400'],
      category: 'fashion',
      supplier: {
        id: '3',
        name: 'Istanbul Leather Co.',
        country: 'Turkey',
        rating: 4.9,
        verified: true,
        totalProducts: 95,
        responseTime: '< 2 hours',
        memberSince: '2017'
      },
      rating: 4.8,
      reviews: 156,
      inStock: true,
      minOrder: 1,
      tags: ['leather', 'handcrafted', 'premium']
    }
  ];

  useEffect(() => {
    // Get query from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q') || '';
    setQuery(searchQuery);
    
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, []);

  const performSearch = async (searchQuery: string, filters?: any) => {
    setLoading(true);
    setQuery(searchQuery);
    
    // Simulate API call
    setTimeout(() => {
      if (searchQuery.toLowerCase().includes('headphone') || 
          searchQuery.toLowerCase().includes('audio') ||
          searchQuery.toLowerCase().includes('wireless')) {
        setResults(mockResults);
        setTotalResults(mockResults.length);
      } else if (searchQuery.toLowerCase().includes('watch') ||
                 searchQuery.toLowerCase().includes('fitness')) {
        setResults([mockResults[1]]);
        setTotalResults(1);
      } else if (searchQuery.toLowerCase().includes('bag') ||
                 searchQuery.toLowerCase().includes('leather')) {
        setResults([mockResults[2]]);
        setTotalResults(1);
      } else {
        setResults([]);
        setTotalResults(0);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <main>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SearchResults
            query={query}
            results={results}
            totalResults={totalResults}
            loading={loading}
            onSearch={performSearch}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default SearchPage;