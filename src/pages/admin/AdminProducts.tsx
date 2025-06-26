import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowUp, 
  ArrowDown,
  CheckCircle,
  XCircle,
  Tag,
  Download,
  Upload
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Badge from '../../components/atoms/Badge';
import { Product } from '../../types';
import { clsx } from 'clsx';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProducts = [
        {
          id: '1',
          name: 'Premium Wireless Headphones',
          description: 'High-quality wireless headphones with noise cancellation',
          price: 199.99,
          category: 'Electronics',
          images: ['/brandmark-design-1024x0 (3) copy.png'],
          rating: 4.5,
          reviewCount: 124,
          inStock: true,
          isFeatured: true,
          tags: ['wireless', 'headphones', 'audio'],
          supplier: {
            id: 'supplier-1',
            name: 'TechSupplier Co.',
            rating: 4.8
          },
          variants: [],
          specifications: {},
          dimensions: {},
          weight: 250,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-15T00:00:00Z'
        },
        {
          id: '2',
          name: 'Smart Fitness Watch',
          description: 'Advanced fitness tracking with heart rate monitor',
          price: 299.99,
          category: 'Electronics',
          images: ['/brandmark-design-1024x0 (3) copy.png'],
          rating: 4.3,
          reviewCount: 89,
          inStock: true,
          isFeatured: true,
          tags: ['fitness', 'watch', 'smart'],
          supplier: {
            id: 'supplier-2',
            name: 'FitTech Solutions',
            rating: 4.6
          },
          variants: [],
          specifications: {},
          dimensions: {},
          weight: 45,
          createdAt: '2024-01-02T00:00:00Z',
          updatedAt: '2024-01-16T00:00:00Z'
        },
        {
          id: '3',
          name: 'Organic Cotton T-Shirt',
          description: 'Comfortable and sustainable organic cotton t-shirt',
          price: 29.99,
          category: 'Clothing',
          images: ['/brandmark-design-1024x0 (3) copy.png'],
          rating: 4.7,
          reviewCount: 203,
          inStock: true,
          isFeatured: false,
          tags: ['organic', 'cotton', 'clothing'],
          supplier: {
            id: 'supplier-3',
            name: 'EcoClothing Ltd.',
            rating: 4.9
          },
          variants: [],
          specifications: {},
          dimensions: {},
          weight: 150,
          createdAt: '2024-01-03T00:00:00Z',
          updatedAt: '2024-01-17T00:00:00Z'
        },
        {
          id: '4',
          name: 'Kitchen Knife Set',
          description: 'Professional chef knife set with wooden block',
          price: 149.99,
          category: 'Home & Kitchen',
          images: ['/brandmark-design-1024x0 (3) copy.png'],
          rating: 4.6,
          reviewCount: 67,
          inStock: true,
          isFeatured: true,
          tags: ['kitchen', 'knives', 'cooking'],
          supplier: {
            id: 'supplier-4',
            name: 'ChefTools Pro',
            rating: 4.7
          },
          variants: [],
          specifications: {},
          dimensions: {},
          weight: 1200,
          createdAt: '2024-01-04T00:00:00Z',
          updatedAt: '2024-01-18T00:00:00Z'
        }
      ];

      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || 
                           (selectedStatus === 'in-stock' && product.inStock) ||
                           (selectedStatus === 'out-of-stock' && !product.inStock) ||
                           (selectedStatus === 'featured' && product.isFeatured);
      
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const categories = ['all', 'Electronics', 'Clothing', 'Home & Kitchen'];
  const statuses = [
    { value: 'all', label: 'All' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' },
    { value: 'featured', label: 'Featured' }
  ];

  return (
    <AdminLayout title="Products" subtitle="Manage your product catalog">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={setSearchQuery}
            leftIcon={<Search className="w-4 h-4" />}
            className="w-full sm:w-64"
          />
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Upload className="w-4 h-4" />}
          >
            Import
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export
          </Button>
          
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            className="bg-red-600 hover:bg-red-700"
          >
            Add Product
          </Button>
        </div>
      </div>
      
      {/* Products Table */}
      <Card variant="default" padding="md">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-16 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-800 text-left">
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('name')}>
                      <span>Product</span>
                      {sortBy === 'name' && (
                        sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('price')}>
                      <span>Price</span>
                      {sortBy === 'price' && (
                        sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Category</th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('rating')}>
                      <span>Rating</span>
                      {sortBy === 'rating' && (
                        sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Status</th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('date')}>
                      <span>Date Added</span>
                      {sortBy === 'date' && (
                        sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">{product.name}</p>
                          <p className="text-xs text-neutral-500 truncate max-w-xs">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="primary" size="sm">{product.category}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">{product.rating}</span>
                        <span className="text-xs text-neutral-500">({product.reviewCount})</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        {product.inStock ? (
                          <Badge variant="success" size="sm" className="flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3" />
                            <span>In Stock</span>
                          </Badge>
                        ) : (
                          <Badge variant="error" size="sm" className="flex items-center space-x-1">
                            <XCircle className="w-3 h-3" />
                            <span>Out of Stock</span>
                          </Badge>
                        )}
                        {product.isFeatured && (
                          <Badge variant="gold" size="sm" className="flex items-center space-x-1">
                            <Tag className="w-3 h-3" />
                            <span>Featured</span>
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-500">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="p-1">
                          <Eye className="w-4 h-4 text-neutral-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Edit className="w-4 h-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-500 dark:text-neutral-400">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
        
        {/* Pagination */}
        {!isLoading && filteredProducts.length > 0 && (
          <div className="flex items-center justify-between border-t border-neutral-200 dark:border-neutral-700 px-4 py-3 sm:px-6">
            <div className="flex items-center">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{products.length}</span> results
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>
    </AdminLayout>
  );
};

export default AdminProducts;