import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShoppingBag, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Settings,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Badge from '../components/atoms/Badge';
import StatsCard from '../components/molecules/StatsCard';
import { adminApi } from '../api/backendApi';
import { useAuth } from '../contexts/AuthContext';
import ConnectivityChecker from '../components/molecules/ConnectivityChecker';
import LinkButtonChecker from '../components/molecules/LinkButtonChecker';

const AdminDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      loadDashboardData();
    }
  }, [isAuthenticated, user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [dashboardResponse, usersResponse, ordersResponse] = await Promise.all([
        adminApi.getDashboard(),
        adminApi.getUsers(1, 10),
        adminApi.getOrders(1, 10)
      ]);

      setDashboardData(dashboardResponse.dashboard);
      setUsers(usersResponse.users);
      setOrders(ordersResponse.orders);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderStatusUpdate = async (orderId: string, status: string) => {
    try {
      await adminApi.updateOrderStatus(orderId, status);
      // Reload orders
      const ordersResponse = await adminApi.getOrders(1, 10);
      setOrders(ordersResponse.orders);
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    // Redirect to admin login page
    window.location.href = '/admin/login';
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            You need admin privileges to access this page.
          </p>
          <Button
            variant="primary"
            onClick={() => window.location.href = '/admin/login'}
          >
            Go to Admin Login
          </Button>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Admin Dashboard
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            Manage your NubiaGo marketplace
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-neutral-200 dark:border-neutral-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && dashboardData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Users"
                value={dashboardData.overview.totalUsers}
                change={{
                  type: 'increase',
                  value: dashboardData.overview.monthlyGrowth.users,
                  period: 'vs last month'
                }}
                variant="primary"
              />
              <StatsCard
                title="Total Orders"
                value={dashboardData.overview.totalOrders}
                change={{
                  type: 'increase',
                  value: dashboardData.overview.monthlyGrowth.orders,
                  period: 'vs last month'
                }}
                variant="success"
              />
              <StatsCard
                title="Total Products"
                value={dashboardData.overview.totalProducts}
                variant="info"
              />
              <StatsCard
                title="Total Revenue"
                value={`$${dashboardData.overview.totalRevenue.toLocaleString()}`}
                change={{
                  type: 'increase',
                  value: dashboardData.overview.monthlyGrowth.revenue,
                  period: 'vs last month'
                }}
                variant="warning"
              />
            </div>

            {/* Recent Orders */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Recent Orders
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Order</th>
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Customer</th>
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Total</th>
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Status</th>
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentOrders.map((order: any) => (
                      <tr key={order.id} className="border-b border-neutral-100 dark:border-neutral-800">
                        <td className="py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {order.orderNumber}
                        </td>
                        <td className="py-3 text-sm text-neutral-600 dark:text-neutral-400">
                          {order.customer}
                        </td>
                        <td className="py-3 text-sm text-neutral-900 dark:text-neutral-100">
                          ${order.total}
                        </td>
                        <td className="py-3">
                          <Badge
                            variant={order.status === 'processing' ? 'warning' : 'success'}
                            size="sm"
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3 text-sm text-neutral-600 dark:text-neutral-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                User Management
              </h2>
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">User</th>
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Email</th>
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Role</th>
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Status</th>
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Joined</th>
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-neutral-100 dark:border-neutral-800">
                        <td className="py-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-xs font-medium text-red-600">
                                {user.firstName[0]}{user.lastName[0]}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                              {user.firstName} {user.lastName}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 text-sm text-neutral-600 dark:text-neutral-400">
                          {user.email}
                        </td>
                        <td className="py-3">
                          <Badge variant={user.role === 'admin' ? 'error' : 'primary'} size="sm">
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <Badge variant={user.verified ? 'success' : 'warning'} size="sm">
                            {user.verified ? 'Verified' : 'Pending'}
                          </Badge>
                        </td>
                        <td className="py-3 text-sm text-neutral-600 dark:text-neutral-400">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                Order Management
              </h2>
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Order #</th>
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Customer</th>
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Items</th>
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Total</th>
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Status</th>
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Date</th>
                      <th className="text-left py-3 text-sm font-medium text-neutral-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-neutral-100 dark:border-neutral-800">
                        <td className="py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {order.orderNumber}
                        </td>
                        <td className="py-3">
                          <div>
                            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                              {order.customer.name}
                            </div>
                            <div className="text-xs text-neutral-500">
                              {order.customer.email}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-sm text-neutral-600 dark:text-neutral-400">
                          {order.itemCount} items
                        </td>
                        <td className="py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          ${order.total}
                        </td>
                        <td className="py-3">
                          <select
                            value={order.status}
                            onChange={(e) => handleOrderStatusUpdate(order.id, e.target.value)}
                            className="text-xs px-2 py-1 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3 text-sm text-neutral-600 dark:text-neutral-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}
                 <div className="space-y-6">
            <ConnectivityChecker />
            <LinkButtonChecker 
              onComplete={(results) => {
                console.log('Page check complete:', results);
              }}
            />
          </div>
           {/* Quick Navigation */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setActiveSection('products')}
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <span className="text-lg">📦</span>
              <span>Products</span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setActiveSection('users')}
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <span className="text-lg">👥</span>
              <span>Users</span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setActiveSection('orders')}
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <span className="text-lg">📋</span>
              <span>Orders</span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setActiveSection('settings')}
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <span className="text-lg">⚙️</span>
              <span>Settings</span>
            </Button>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;