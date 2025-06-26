import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Clock, 
  Globe, 
  Package,
  AlertCircle,
  CheckCircle,
  Zap,
  RefreshCw,
  ArrowRight,
  Settings,
  Database as DatabaseIcon,
  HardDrive as HardDriveIcon,
  Server
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import Badge from '../../components/atoms/Badge';
import AdminLayout from './AdminLayout';
import PerformanceMonitor from '../../components/molecules/PerformanceMonitor';
import SupabaseConnectionTest from '../../components/SupabaseConnectionTest';

const AdminDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  const [showSupabaseTest, setShowSupabaseTest] = useState(false);
  
  // Mock data for dashboard
  const [dashboardData, setDashboardData] = useState({
    revenue: {
      total: 125750.45,
      growth: 12.5,
      period: 'month'
    },
    orders: {
      total: 1254,
      growth: 8.3,
      period: 'month'
    },
    users: {
      total: 8750,
      growth: 15.2,
      period: 'month'
    },
    products: {
      total: 12500,
      growth: 5.7,
      period: 'month'
    },
    recentOrders: [
      { id: 'ORD-12345', customer: 'John Doe', date: '2024-06-24', status: 'delivered', total: 299.99 },
      { id: 'ORD-12346', customer: 'Jane Smith', date: '2024-06-24', status: 'processing', total: 149.50 },
      { id: 'ORD-12347', customer: 'Robert Johnson', date: '2024-06-23', status: 'shipped', total: 524.75 },
      { id: 'ORD-12348', customer: 'Emily Davis', date: '2024-06-23', status: 'pending', total: 89.99 },
      { id: 'ORD-12349', customer: 'Michael Brown', date: '2024-06-22', status: 'delivered', total: 199.99 }
    ],
    topProducts: [
      { id: '1', name: 'Wireless Headphones', sales: 245, revenue: 48755.55 },
      { id: '2', name: 'Smart Watch', sales: 189, revenue: 37800.00 },
      { id: '3', name: 'Laptop Pro', sales: 156, revenue: 187200.00 },
      { id: '4', name: 'Smartphone X', sales: 134, revenue: 134000.00 },
      { id: '5', name: 'Bluetooth Speaker', sales: 98, revenue: 9800.00 }
    ],
    systemStatus: {
      server: 'healthy',
      database: 'healthy',
      storage: 'warning',
      cache: 'healthy',
      queue: 'healthy'
    }
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'primary';
      case 'processing': return 'warning';
      case 'pending': return 'default';
      case 'cancelled': return 'error';
      case 'healthy': return 'success';
      case 'warning': return 'warning';
      case 'critical': return 'error';
      default: return 'default';
    }
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
    <AdminLayout title="Dashboard" subtitle="Overview of your marketplace performance">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-neutral-200 dark:bg-neutral-700 rounded-xl h-32"></div>
            </div>
          ))}
          <div className="lg:col-span-2 animate-pulse">
            <div className="bg-neutral-200 dark:bg-neutral-700 rounded-xl h-80"></div>
          </div>
          <div className="lg:col-span-2 animate-pulse">
            <div className="bg-neutral-200 dark:bg-neutral-700 rounded-xl h-80"></div>
          </div>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <Badge variant={dashboardData.revenue.growth > 0 ? 'success' : 'error'} size="sm">
                    {dashboardData.revenue.growth > 0 ? '+' : ''}{dashboardData.revenue.growth}%
                  </Badge>
                </div>
                <h3 className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                  Total Revenue
                </h3>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  ${dashboardData.revenue.total.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  vs previous {dashboardData.revenue.period}
                </p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <ShoppingBag className="w-6 h-6 text-blue-600" />
                  </div>
                  <Badge variant={dashboardData.orders.growth > 0 ? 'success' : 'error'} size="sm">
                    {dashboardData.orders.growth > 0 ? '+' : ''}{dashboardData.orders.growth}%
                  </Badge>
                </div>
                <h3 className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                  Total Orders
                </h3>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {dashboardData.orders.total.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  vs previous {dashboardData.orders.period}
                </p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <Badge variant={dashboardData.users.growth > 0 ? 'success' : 'error'} size="sm">
                    {dashboardData.users.growth > 0 ? '+' : ''}{dashboardData.users.growth}%
                  </Badge>
                </div>
                <h3 className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                  Total Users
                </h3>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {dashboardData.users.total.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  vs previous {dashboardData.users.period}
                </p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                    <Package className="w-6 h-6 text-amber-600" />
                  </div>
                  <Badge variant={dashboardData.products.growth > 0 ? 'success' : 'error'} size="sm">
                    {dashboardData.products.growth > 0 ? '+' : ''}{dashboardData.products.growth}%
                  </Badge>
                </div>
                <h3 className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                  Total Products
                </h3>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {dashboardData.products.total.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  vs previous {dashboardData.products.period}
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Recent Orders & Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                    Recent Orders
                  </h3>
                  <Link to="/admin/orders">
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      View All
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {dashboardData.recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-neutral-900 dark:text-neutral-100">
                            {order.id}
                          </span>
                          <Badge variant={getStatusColor(order.status)} size="sm">
                            {order.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-neutral-500">
                          {order.customer} • {order.date}
                        </div>
                      </div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                        ${order.total.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                    Top Products
                  </h3>
                  <Link to="/admin/products">
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      View All
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {dashboardData.topProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <div>
                        <div className="font-medium text-neutral-900 dark:text-neutral-100">
                          {product.name}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {product.sales} sales
                        </div>
                      </div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                        ${product.revenue.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* System Status & Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div variants={itemVariants}>
              <Card variant="default" padding="lg" className="h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                    System Status
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    leftIcon={<RefreshCw className="w-4 h-4" />}
                  >
                    Refresh
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                        <Zap className="w-4 h-4 text-neutral-500" />
                      </div>
                      <span className="text-neutral-700 dark:text-neutral-300">Server</span>
                    </div>
                    <Badge variant={getStatusColor(dashboardData.systemStatus.server)} size="sm">
                      {dashboardData.systemStatus.server}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                        <DatabaseIcon className="w-4 h-4 text-neutral-500" />
                      </div>
                      <span className="text-neutral-700 dark:text-neutral-300">Database</span>
                    </div>
                    <Badge variant={getStatusColor(dashboardData.systemStatus.database)} size="sm">
                      {dashboardData.systemStatus.database}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                        <HardDriveIcon className="w-4 h-4 text-neutral-500" />
                      </div>
                      <span className="text-neutral-700 dark:text-neutral-300">Storage</span>
                    </div>
                    <Badge variant={getStatusColor(dashboardData.systemStatus.storage)} size="sm">
                      {dashboardData.systemStatus.storage}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                        <Clock className="w-4 h-4 text-neutral-500" />
                      </div>
                      <span className="text-neutral-700 dark:text-neutral-300">Cache</span>
                    </div>
                    <Badge variant={getStatusColor(dashboardData.systemStatus.cache)} size="sm">
                      {dashboardData.systemStatus.cache}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                        <Server className="w-4 h-4 text-neutral-500" />
                      </div>
                      <span className="text-neutral-700 dark:text-neutral-300">Queue</span>
                    </div>
                    <Badge variant={getStatusColor(dashboardData.systemStatus.queue)} size="sm">
                      {dashboardData.systemStatus.queue}
                    </Badge>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    fullWidth
                    onClick={() => setShowPerformanceMonitor(!showPerformanceMonitor)}
                  >
                    {showPerformanceMonitor ? 'Hide Performance Monitor' : 'Show Performance Monitor'}
                  </Button>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2">
              {showPerformanceMonitor ? (
                <PerformanceMonitor />
              ) : showSupabaseTest ? (
                <SupabaseConnectionTest />
              ) : (
                <Card variant="default" padding="lg" className="h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                      Quick Actions
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/admin/products/new">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        fullWidth
                        leftIcon={<Package className="w-5 h-5" />}
                      >
                        Add New Product
                      </Button>
                    </Link>

                    <Link to="/admin/users">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        fullWidth
                        leftIcon={<Users className="w-5 h-5" />}
                      >
                        Manage Users
                      </Button>
                    </Link>

                    <Link to="/admin/orders">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        fullWidth
                        leftIcon={<ShoppingBag className="w-5 h-5" />}
                      >
                        View Orders
                      </Button>
                    </Link>

                    <Link to="/admin/settings">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        fullWidth
                        leftIcon={<Settings className="w-5 h-5" />}
                      >
                        System Settings
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="outline" 
                      size="lg" 
                      fullWidth
                      leftIcon={<DatabaseIcon className="w-5 h-5" />}
                      onClick={() => setShowSupabaseTest(true)}
                    >
                      Test Database Connection
                    </Button>
                    
                    <Link to="/admin/update-images">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        fullWidth
                        leftIcon={<RefreshCw className="w-5 h-5" />}
                      >
                        Update Product Images
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-full">
                        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                          System Notification
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                          Scheduled maintenance will occur on July 1st, 2024 from 2:00 AM to 4:00 AM UTC. 
                          The system may experience brief downtime during this period.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;