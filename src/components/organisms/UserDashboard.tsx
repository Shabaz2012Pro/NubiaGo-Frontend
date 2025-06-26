import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Shield, 
  Bell, 
  Moon, 
  Sun, 
  Settings, 
  Edit, 
  Trash2, 
  Plus,
  Eye,
  Star,
  Truck,
  CreditCard,
  Phone,
  Mail,
  Building,
  Globe,
  Camera,
  Save,
  X,
  Check,
  Clock,
  AlertCircle,
  LogOut
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import Input from '../atoms/Input';
import { clsx } from 'clsx';

interface UserDashboardProps {
  className?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  trackingNumber?: string;
}

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  supplier: string;
  inStock: boolean;
  addedAt: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);

  // Mock user data
  const [userProfile, setUserProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'user@example.com',
    phone: '+234 XXX XXX XXXX',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    company: 'Lagos Trading Co.',
    memberSince: '2023',
    totalOrders: 24,
    totalSpent: 4250.00
  });

  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 299.98,
      items: 2,
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-002',
      date: '2024-01-12',
      status: 'shipped',
      total: 149.99,
      items: 1,
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD-003',
      date: '2024-01-08',
      status: 'processing',
      total: 299.99,
      items: 1
    }
  ]);

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      name: 'Home Address',
      address: '123 Victoria Island Road',
      city: 'Lagos',
      country: 'Nigeria',
      postalCode: '100001',
      phone: '+234 XXX XXX XXXX',
      isDefault: true
    },
    {
      id: '2',
      type: 'work',
      name: 'Office Address',
      address: '456 Business District',
      city: 'Lagos',
      country: 'Nigeria',
      postalCode: '100002',
      phone: '+234 XXX XXX XXXX',
      isDefault: false
    }
  ]);

  const [wishlist] = useState<WishlistItem[]>([
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 199.99,
      images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300'],
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
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 299.99,
      images: ['https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300'],
      category: 'electronics',
      supplier: {
        id: '2',
        name: 'Smart Devices TR',
        country: 'Turkey',
        rating: 4.6,
        verified: true,
        totalProducts: 85,
        responseTime: '< 4 hours',
        memberSince: '2019'
      },
      rating: 4.3,
      reviews: 89,
      inStock: true,
      minOrder: 1,
      tags: ['smart', 'fitness'],
      currency: 'USD',
      description: 'Advanced smart watch'
    },
    {
      id: '3',
      name: 'Leather Bag',
      price: 129.99,
      images: ['https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300'],
      category: 'fashion',
      supplier: {
        id: '3',
        name: 'Istanbul Leather',
        country: 'Turkey',
        rating: 4.7,
        verified: true,
        totalProducts: 95,
        responseTime: '< 2 hours',
        memberSince: '2017'
      },
      rating: 4.6,
      reviews: 156,
      inStock: true,
      minOrder: 1,
      tags: ['leather', 'handcrafted'],
      currency: 'USD',
      description: 'Handcrafted leather bag'
    }
  ]);

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newProducts: false,
    priceDrops: true,
    newsletter: true
  });

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: <User className="w-4 h-4" />, href: '#dashboard?tab=profile' },
    { id: 'orders', label: 'My Orders', icon: <Package className="w-4 h-4" />, href: '#dashboard?tab=orders' },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart className="w-4 h-4" />, href: '#dashboard?tab=wishlist' },
    { id: 'payment', label: 'Payment Methods', icon: <CreditCard className="w-4 h-4" />, href: '#dashboard?tab=payment' },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" />, href: '#dashboard?tab=security' },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" />, href: '#dashboard?tab=settings' }
  ];

  // Check for tab parameter in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('?tab=')) {
      const tabParam = hash.split('?tab=')[1].split('&')[0];
      if (tabs.some(tab => tab.id === tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const africanCountries = [
    'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Egypt', 'Morocco'
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'primary';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const updateProfile = (field: string, value: string) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const updateNotification = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const removeFromWishlist = (id: string) => {
    // Implementation would remove item from wishlist
    console.log('Remove from wishlist:', id);
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
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

  return (
    <div className={clsx('min-h-screen bg-white dark:bg-neutral-900', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              My Dashboard
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Welcome back, {userProfile.firstName}! Manage your account, orders, and preferences.
            </p>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              leftIcon={<Bell className="w-4 h-4" />}
              onClick={() => window.location.hash = 'notifications'}
            >
              Notifications
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              leftIcon={<LogOut className="w-4 h-4" />}
              onClick={() => console.log('Logout clicked')}
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
                    src={userProfile.avatar}
                    alt={`${userProfile.firstName} ${userProfile.lastName}`}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                    <Edit className="w-3 h-3" />
                  </button>
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {userProfile.firstName} {userProfile.lastName}
                </h3>
                <p className="text-sm text-neutral-500">{userProfile.email}</p>
                <div className="flex justify-center space-x-4 mt-3 text-xs text-neutral-500">
                  <span>Member since {userProfile.memberSince}</span>
                  <span>•</span>
                  <span>{userProfile.totalOrders} orders</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <a
                    key={tab.id}
                    href={tab.href}
                    className={clsx(
                      'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors',
                      activeTab === tab.id
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    )}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </a>
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
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <Card variant="default" padding="lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                      Profile Information
                    </h2>
                    <Button
                      variant={isEditing ? "primary" : "outline"}
                      onClick={() => setIsEditing(!isEditing)}
                      leftIcon={isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      value={userProfile.firstName}
                      onChange={(value) => updateProfile('firstName', value)}
                      disabled={!isEditing}
                      leftIcon={<User className="w-4 h-4" />}
                    />
                    <Input
                      label="Last Name"
                      value={userProfile.lastName}
                      onChange={(value) => updateProfile('lastName', value)}
                      disabled={!isEditing}
                      leftIcon={<User className="w-4 h-4" />}
                    />
                    <Input
                      label="Email Address"
                      value={userProfile.email}
                      onChange={(value) => updateProfile('email', value)}
                      disabled={!isEditing}
                      leftIcon={<Mail className="w-4 h-4" />}
                    />
                    <Input
                      label="Phone Number"
                      value={userProfile.phone}
                      onChange={(value) => updateProfile('phone', value)}
                      disabled={!isEditing}
                      leftIcon={<Phone className="w-4 h-4" />}
                    />
                    <Input
                      label="Company"
                      value={userProfile.company}
                      onChange={(value) => updateProfile('company', value)}
                      disabled={!isEditing}
                      leftIcon={<Building className="w-4 h-4" />}
                    />
                  </div>

                  {/* Account Stats */}
                  <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                      Account Statistics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{userProfile.totalOrders}</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">Total Orders</div>
                      </div>
                      <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">${userProfile.totalSpent.toFixed(2)}</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">Total Spent</div>
                      </div>
                      <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{wishlist.length}</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">Wishlist Items</div>
                      </div>
                    </div>
                  </div>
                </Card>
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
                            <p className="font-medium">{order.trackingNumber || 'N/A'}</p>
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

              {/* Security Tab */}
              {activeTab === 'security' && (
                <Card variant="default" padding="lg">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                      Account Security
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Security Overview */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Security Score */}
                        <Card variant="default" padding="lg">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                              Security Score
                            </h3>
                            <Badge variant="success" size="sm">Good</Badge>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-neutral-600 dark:text-neutral-400">75%</span>
                              <span className="text-neutral-600 dark:text-neutral-400">100%</span>
                            </div>
                            <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Enable two-factor authentication to increase your security score.
                          </p>
                        </Card>
                        
                        {/* Security Features */}
                        <Card variant="default" padding="lg">
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                            Security Features
                          </h3>
                          
                          <div className="space-y-4">
                            <div 
                              className="flex items-start justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600">
                                  <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                    Two-Factor Authentication
                                  </h4>
                                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                    Add an extra layer of security to your account
                                  </p>
                                </div>
                              </div>
                              
                              <Badge variant="primary" size="sm">Recommended</Badge>
                            </div>
                            
                            <div 
                              className="flex items-start justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-600">
                                  <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                    Email Verification
                                  </h4>
                                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                    Verify your email address
                                  </p>
                                </div>
                              </div>
                              
                              <Badge variant="success" size="sm">Enabled</Badge>
                            </div>
                            
                            <div 
                              className="flex items-start justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                                  <Bell className="w-5 h-5" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                    Login Notifications
                                  </h4>
                                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                    Get notified of new login attempts
                                  </p>
                                </div>
                              </div>
                              
                              <Badge variant="default" size="sm">Disabled</Badge>
                            </div>
                          </div>
                        </Card>
                      </div>
                      
                      {/* Password Management */}
                      <div className="space-y-6">
                        <Card variant="default" padding="lg">
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                            Change Password
                          </h3>
                          
                          <form className="space-y-4">
                            <div className="relative">
                              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Current Password
                              </label>
                              <input
                                type="password"
                                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-neutral-800"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                New Password
                              </label>
                              <input
                                type="password"
                                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-neutral-800"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-neutral-800"
                                required
                              />
                            </div>
                            
                            <Button
                              type="submit"
                              variant="primary"
                              className="w-full bg-red-600 hover:bg-red-700"
                            >
                              Update Password
                            </Button>
                          </form>
                        </Card>
                        
                        <Card variant="outlined" padding="md" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                          <h3 className="font-semibold text-red-700 dark:text-red-300 flex items-center space-x-2 mb-3">
                            <AlertCircle className="w-5 h-5" />
                            <span>Danger Zone</span>
                          </h3>
                          
                          <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                            These actions are permanent and cannot be undone.
                          </p>
                          
                          <div className="space-y-3">
                            <Button
                              variant="outline"
                              size="sm"
                              fullWidth
                              className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/30"
                            >
                              Deactivate Account
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              fullWidth
                              className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/30"
                            >
                              Delete Account
                            </Button>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                </Card>
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
                      onClick={() => setActiveTab('profile')}
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
    </div>
  );
};

export default UserDashboard;