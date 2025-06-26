import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Shield, 
  Bell, 
  Settings, 
  LogOut, 
  ShoppingCart,
  CreditCard,
  Clock,
  TrendingUp,
  ChevronRight,
  Edit,
  Truck,
  CheckCircle,
  AlertCircle,
  Star,
  Plus,
  Trash2,
  Download,
  Eye
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';
import { useAuth } from '../contexts/AuthContext';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { clsx } from 'clsx';
import UserDashboard from '../components/organisms/UserDashboard';
import AccountSecurityDashboard from '../components/molecules/AccountSecurityDashboard';
import NotificationCenter from '../components/molecules/NotificationCenter';

const UserDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuth();
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  // Mock orders data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-12345',
      date: '2024-05-15',
      status: 'delivered',
      total: 299.98,
      items: 2
    },
    {
      id: 'ORD-12346',
      date: '2024-05-10',
      status: 'shipped',
      total: 149.99,
      items: 1
    },
    {
      id: 'ORD-12347',
      date: '2024-05-05',
      status: 'processing',
      total: 89.99,
      items: 1
    }
  ]);

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'primary';
      case 'processing': return 'warning';
      case 'cancelled': return 'error';
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

  if (!user) {
    // Redirect to login if not authenticated
    window.location.hash = 'auth?action=login';
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                My Dashboard
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Welcome back, {user.firstName}! Manage your account, orders, and preferences.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                leftIcon={<Bell className="w-4 h-4" />}
              >
                Notifications
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                leftIcon={<LogOut className="w-4 h-4" />}
                onClick={logout}
              >
                Sign Out
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card variant="default" padding="md" className="sticky top-4">
                {/* User Info */}
                <div className="text-center mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-700">
                  <div className="relative inline-block mb-4">
                    <img
                      src={user.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <button className="absolute bottom-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                      <Edit className="w-3 h-3" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-neutral-500">{user.email}</p>
                  <div className="flex justify-center space-x-4 mt-3 text-xs text-neutral-500">
                    <span>Member since {user.memberSince || '2023'}</span>
                    <span>•</span>
                    <span>{orders.length} orders</span>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {[
                    { id: 'overview', label: 'Overview', icon: <User className="w-4 h-4" /> },
                    { id: 'orders', label: 'Orders', icon: <Package className="w-4 h-4" /> },
                    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
                    { id: 'wishlist', label: 'Wishlist', icon: <Heart className="w-4 h-4" /> },
                    { id: 'addresses', label: 'Addresses', icon: <MapPin className="w-4 h-4" /> },
                    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
                    { id: 'payment', label: 'Payment Methods', icon: <CreditCard className="w-4 h-4" /> },
                    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={clsx(
                        'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors',
                        activeTab === tab.id
                          ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                      )}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeTab}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card variant="default" padding="lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                            Recent Orders
                          </h3>
                          <Badge variant="primary" size="sm">{orders.length}</Badge>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                          Track your recent purchases
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          fullWidth
                          rightIcon={<ChevronRight className="w-4 h-4" />}
                          onClick={() => setActiveTab('orders')}
                        >
                          View Orders
                        </Button>
                      </Card>
                      
                      <Card variant="default" padding="lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                            Wishlist
                          </h3>
                          <Badge variant="primary" size="sm">{wishlistItems.length}</Badge>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                          Items saved for later
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          fullWidth
                          rightIcon={<ChevronRight className="w-4 h-4" />}
                          onClick={() => setActiveTab('wishlist')}
                        >
                          View Wishlist
                        </Button>
                      </Card>
                      
                      <Card variant="default" padding="lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                            Shopping Cart
                          </h3>
                          <Badge variant="primary" size="sm">{cartItems.length}</Badge>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                          Items in your cart
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          fullWidth
                          rightIcon={<ChevronRight className="w-4 h-4" />}
                          onClick={() => useCartStore.getState().openCart()}
                        >
                          View Cart
                        </Button>
                      </Card>
                    </div>
                    
                    {/* Recent Orders */}
                    <Card variant="default" padding="lg">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                          Recent Orders
                        </h3>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          rightIcon={<ChevronRight className="w-4 h-4" />}
                          onClick={() => setActiveTab('orders')}
                        >
                          View All
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        {orders.slice(0, 3).map((order) => (
                          <div 
                            key={order.id}
                            className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                          >
                            <div>
                              <div className="flex items-center space-x-3 mb-1">
                                <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                  {order.id}
                                </h4>
                                <Badge variant={getStatusColor(order.status)} size="sm">
                                  {order.status}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-3 text-sm text-neutral-500">
                                <span>{order.date}</span>
                                <span>•</span>
                                <span>{order.items} {order.items === 1 ? 'item' : 'items'}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                                ${order.total.toFixed(2)}
                              </div>
                              <Button variant="ghost" size="xs">
                                Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                    
                    {/* Account Activity */}
                    <Card variant="default" padding="lg">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                        Recent Activity
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <div className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                Order Delivered
                              </h4>
                              <span className="text-xs text-neutral-500">Today, 10:45 AM</span>
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                              Your order #ORD-12345 has been delivered successfully.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                            <Truck className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                Order Shipped
                              </h4>
                              <span className="text-xs text-neutral-500">Yesterday, 3:20 PM</span>
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                              Your order #ORD-12346 has been shipped. Track your package.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-lg">
                            <Heart className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                Item Added to Wishlist
                              </h4>
                              <span className="text-xs text-neutral-500">3 days ago</span>
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                              You added "Smart Fitness Watch" to your wishlist.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <Card variant="default" padding="lg">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                      Order History
                    </h2>

                    <div className="space-y-4">
                      {orders.map((order) => (
                        <motion.div
                          key={order.id}
                          variants={itemVariants}
                          className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-6"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                                Order {order.id}
                              </h3>
                              <Badge variant={getStatusColor(order.status)} size="sm">
                                <div className="capitalize">{order.status}</div>
                              </Badge>
                            </div>
                            <span className="font-bold text-neutral-900 dark:text-neutral-100">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-neutral-500">Date:</span>
                              <p className="font-medium">{order.date}</p>
                            </div>
                            <div>
                              <span className="text-neutral-500">Items:</span>
                              <p className="font-medium">{order.items} item{order.items > 1 ? 's' : ''}</p>
                            </div>
                            <div>
                              <span className="text-neutral-500">Status:</span>
                              <p className="font-medium capitalize">{order.status}</p>
                            </div>
                            <div>
                              <span className="text-neutral-500">Tracking:</span>
                              <p className="font-medium">{order.status === 'shipped' || order.status === 'delivered' ? 'TRK-123456789' : 'N/A'}</p>
                            </div>
                          </div>

                          <div className="flex space-x-3 mt-4">
                            <Button variant="outline" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                              View Details
                            </Button>
                            {(order.status === 'shipped' || order.status === 'processing') && (
                              <Button variant="outline" size="sm" leftIcon={<Truck className="w-4 h-4" />}>
                                Track Order
                              </Button>
                            )}
                            {order.status === 'delivered' && (
                              <Button variant="outline" size="sm" leftIcon={<Star className="w-4 h-4" />}>
                                Leave Review
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        Notification Center
                      </h2>
                      <Button 
                        variant="outline" 
                        size="sm"
                        leftIcon={<Settings className="w-4 h-4" />}
                        onClick={() => window.location.hash = 'settings?tab=notifications'}
                      >
                        Preferences
                      </Button>
                    </div>
                    
                    <Card variant="default" padding="none" className="overflow-hidden">
                      <div className="h-[600px]">
                        <NotificationCenter 
                          isOpen={true} 
                          onClose={() => {}} 
                          className="relative h-full w-full max-w-none shadow-none border-0 bg-transparent"
                        />
                      </div>
                    </Card>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <AccountSecurityDashboard />
                )}

                {/* Other tabs would be implemented similarly */}
                {(activeTab === 'wishlist' || activeTab === 'addresses' || activeTab === 'payment' || activeTab === 'settings') && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      {activeTab === 'wishlist' && <Heart className="w-8 h-8 text-neutral-400" />}
                      {activeTab === 'addresses' && <MapPin className="w-8 h-8 text-neutral-400" />}
                      {activeTab === 'payment' && <CreditCard className="w-8 h-8 text-neutral-400" />}
                      {activeTab === 'settings' && <Settings className="w-8 h-8 text-neutral-400" />}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
                      We're developing comprehensive user account features to enhance your marketplace experience.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        variant="primary" 
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => setActiveTab('overview')}
                      >
                        Back to Dashboard
                      </Button>
                      <Button variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboardPage;