import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Plus, 
  Edit, 
  Eye, 
  BarChart3,
  Upload,
  Settings,
  Bell,
  MessageSquare,
  Star,
  Shield
} from 'lucide-react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import StatsCard from '../molecules/StatsCard';
import { clsx } from 'clsx';

interface SupplierDashboardProps {
  className?: string;
}

const SupplierDashboard: React.FC<SupplierDashboardProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Products',
      value: '1,247',
      change: { value: 12, type: 'increase' as const, period: 'last month' },
      icon: <Package className="w-6 h-6" />
    },
    {
      title: 'Monthly Revenue',
      value: '$45,230',
      change: { value: 8.5, type: 'increase' as const, period: 'last month' },
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: 'Active Orders',
      value: '89',
      change: { value: 3, type: 'decrease' as const, period: 'last week' },
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: 'Customer Rating',
      value: '4.8',
      change: { value: 0.2, type: 'increase' as const, period: 'last month' },
      icon: <Star className="w-6 h-6" />
    }
  ];

  const recentProducts = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      category: 'Electronics',
      price: 199.99,
      stock: 45,
      status: 'active',
      views: 1234,
      orders: 23
    },
    {
      id: '2',
      name: 'Turkish Coffee Set',
      category: 'Food & Beverage',
      price: 45.99,
      stock: 12,
      status: 'low_stock',
      views: 567,
      orders: 8
    },
    {
      id: '3',
      name: 'Handcrafted Leather Bag',
      category: 'Fashion',
      price: 129.99,
      stock: 0,
      status: 'out_of_stock',
      views: 890,
      orders: 15
    }
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'Amara Okafor',
      country: 'Nigeria',
      amount: 299.97,
      status: 'processing',
      date: '2024-01-15'
    },
    {
      id: 'ORD-002',
      customer: 'Kwame Asante',
      country: 'Ghana',
      amount: 149.99,
      status: 'shipped',
      date: '2024-01-14'
    },
    {
      id: 'ORD-003',
      customer: 'Fatima Al-Rashid',
      country: 'Egypt',
      amount: 89.99,
      status: 'delivered',
      date: '2024-01-13'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'low_stock': return 'warning';
      case 'out_of_stock': return 'error';
      case 'processing': return 'warning';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'low_stock': return 'Low Stock';
      case 'out_of_stock': return 'Out of Stock';
      case 'processing': return 'Processing';
      case 'shipped': return 'Shipped';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  return (
    <div className={clsx('min-h-screen bg-neutral-50 dark:bg-neutral-900', className)}>
      {/* Header */}
      <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Supplier Dashboard
                </h1>
                <p className="text-sm text-neutral-500">
                  Welcome back, Istanbul Leather Co.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge variant="error" size="sm" className="absolute -top-1 -right-1 w-5 h-5 p-0">
                  3
                </Badge>
              </Button>
              <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
                Add Product
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-neutral-200 dark:border-neutral-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  )}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  icon={stat.icon}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Products */}
              <Card variant="default" padding="lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Recent Products
                  </h3>
                  <Button variant="ghost" size="sm" rightIcon={<Plus className="w-4 h-4" />}>
                    Add New
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                          {product.name}
                        </h4>
                        <p className="text-sm text-neutral-500">
                          {product.category} • ${product.price}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-neutral-500">
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{product.views}</span>
                          </span>
                          <span>{product.orders} orders</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge variant={getStatusColor(product.status)} size="sm">
                          {getStatusLabel(product.status)}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Orders */}
              <Card variant="default" padding="lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Recent Orders
                  </h3>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                            {order.id}
                          </h4>
                          <Badge variant={getStatusColor(order.status)} size="sm">
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-neutral-500">
                          {order.customer} • {order.country}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {order.date}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                          ${order.amount}
                        </p>
                        <Button variant="ghost" size="sm" className="mt-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card variant="default" padding="lg">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
                Quick Actions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Upload className="w-5 h-5" />}
                  className="h-20 flex-col space-y-2"
                >
                  <span>Bulk Upload</span>
                  <span className="text-sm text-neutral-500">Upload multiple products</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<BarChart3 className="w-5 h-5" />}
                  className="h-20 flex-col space-y-2"
                >
                  <span>View Analytics</span>
                  <span className="text-sm text-neutral-500">Detailed performance metrics</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<MessageSquare className="w-5 h-5" />}
                  className="h-20 flex-col space-y-2"
                >
                  <span>Customer Messages</span>
                  <span className="text-sm text-neutral-500">Respond to inquiries</span>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
        {activeTab !== 'overview' && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              {tabs.find(t => t.id === activeTab)?.label} Section
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              This section is under development. Full supplier dashboard features coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierDashboard;