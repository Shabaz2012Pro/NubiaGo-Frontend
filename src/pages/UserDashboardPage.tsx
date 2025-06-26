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
  AlertTriangle,
  Save,
  Mail,
  Phone,
  Building,
  Home,
  FileText,
  Eye
} from 'lucide-react';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Badge from '../components/atoms/Badge';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { clsx } from 'clsx';
import AccountSecurityDashboard from '../components/molecules/AccountSecurityDashboard';
import NotificationCenter from '../components/molecules/NotificationCenter';
import { supabase } from '../api/supabaseClient';
import { useUIStore } from '../store/useUIStore';

const UserDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, signOut, updateProfile } = useAuthStore();
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { addNotification } = useUIStore();
  
  // Profile editing state
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    avatar: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Nigeria'
  });

  // Load user data into form
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  // Mock orders data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-12345',
      date: '2024-06-15',
      status: 'delivered',
      total: 299.98,
      items: 2,
      products: [
        { name: 'Wireless Headphones', price: 199.99, image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100' },
        { name: 'Smart Watch', price: 99.99, image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=100' }
      ]
    },
    {
      id: 'ORD-12346',
      date: '2024-06-10',
      status: 'shipped',
      total: 149.99,
      items: 1,
      products: [
        { name: 'Premium Leather Bag', price: 149.99, image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=100' }
      ]
    },
    {
      id: 'ORD-12347',
      date: '2024-06-05',
      status: 'processing',
      total: 89.99,
      items: 1,
      products: [
        { name: 'Turkish Coffee Set', price: 89.99, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100' }
      ]
    }
  ]);

  // Mock addresses
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      type: 'home',
      name: 'Home Address',
      street: '123 Victoria Island Road',
      city: 'Lagos',
      state: 'Lagos State',
      country: 'Nigeria',
      postalCode: '100001',
      phone: '+234 XXX XXX XXXX',
      isDefault: true
    },
    {
      id: '2',
      type: 'work',
      name: 'Office Address',
      street: '456 Business District',
      city: 'Lagos',
      state: 'Lagos State',
      country: 'Nigeria',
      postalCode: '100002',
      phone: '+234 XXX XXX XXXX',
      isDefault: false
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

  // Handle profile update
  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    
    try {
      await updateProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        company: profileData.company
      });
      
      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          phone: profileData.phone,
          company: profileData.company,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setIsEditing(false);
      addNotification({
        type: 'success',
        message: 'Profile updated successfully',
        autoClose: true
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      addNotification({
        type: 'error',
        message: 'Failed to update profile',
        autoClose: true
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Add new address
  const [showAddAddress, setShowAddAddress] = useState(false);
  
  const handleAddAddress = () => {
    const newAddress = {
      id: `${addresses.length + 1}`,
      type: 'home',
      name: 'New Address',
      street: addressData.street,
      city: addressData.city,
      state: addressData.state,
      country: addressData.country,
      postalCode: addressData.postalCode,
      phone: user?.phone || '',
      isDefault: false
    };
    
    setAddresses([...addresses, newAddress]);
    setShowAddAddress(false);
    setAddressData({
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Nigeria'
    });
    
    addNotification({
      type: 'success',
      message: 'Address added successfully',
      autoClose: true
    });
  };

  // Delete address
  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(address => address.id !== id));
    
    addNotification({
      type: 'success',
      message: 'Address deleted successfully',
      autoClose: true
    });
  };

  // Set default address
  const handleSetDefaultAddress = (id: string) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
    
    addNotification({
      type: 'success',
      message: 'Default address updated',
      autoClose: true
    });
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
                Welcome back, {user.firstName || 'User'}! Manage your account, orders, and preferences.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                leftIcon={<Bell className="w-4 h-4" />}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                leftIcon={<LogOut className="w-4 h-4" />}
                onClick={signOut}
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
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={`${user.firstName || ''} ${user.lastName || ''}`}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto">
                        {(user.firstName?.[0] || '?')}{(user.lastName?.[0] || '?')}
                      </div>
                    )}
                    <button 
                      className="absolute bottom-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      onClick={() => setActiveTab('profile')}
                    >
                      <Edit className="w-3 h-3" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {user.firstName || ''} {user.lastName || ''}
                  </h3>
                  <p className="text-sm text-neutral-500">{user.email}</p>
                  <div className="flex justify-center space-x-4 mt-3 text-xs text-neutral-500">
                    <span>Member since {user.memberSince || new Date().getFullYear()}</span>
                    <span>•</span>
                    <span>{orders.length} orders</span>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {[
                    { id: 'overview', label: 'Overview', icon: <User className="w-4 h-4" /> },
                    { id: 'orders', label: 'My Orders', icon: <Package className="w-4 h-4" /> },
                    { id: 'wishlist', label: 'Wishlist', icon: <Heart className="w-4 h-4" /> },
                    { id: 'addresses', label: 'Addresses', icon: <MapPin className="w-4 h-4" /> },
                    { id: 'payment', label: 'Payment Methods', icon: <CreditCard className="w-4 h-4" /> },
                    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
                    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
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

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <Card variant="default" padding="lg">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        Profile Information
                      </h2>
                      <Button
                        variant={isEditing ? "primary" : "outline"}
                        onClick={() => isEditing ? handleUpdateProfile() : setIsEditing(true)}
                        leftIcon={isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                        loading={isUpdating}
                        className={isEditing ? "bg-red-600 hover:bg-red-700" : ""}
                      >
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="First Name"
                        value={profileData.firstName}
                        onChange={(value) => setProfileData({...profileData, firstName: value})}
                        disabled={!isEditing}
                        leftIcon={<User className="w-4 h-4" />}
                      />
                      <Input
                        label="Last Name"
                        value={profileData.lastName}
                        onChange={(value) => setProfileData({...profileData, lastName: value})}
                        disabled={!isEditing}
                        leftIcon={<User className="w-4 h-4" />}
                      />
                      <Input
                        label="Email Address"
                        value={profileData.email}
                        onChange={(value) => setProfileData({...profileData, email: value})}
                        disabled={true} // Email cannot be changed
                        leftIcon={<Mail className="w-4 h-4" />}
                      />
                      <Input
                        label="Phone Number"
                        value={profileData.phone}
                        onChange={(value) => setProfileData({...profileData, phone: value})}
                        disabled={!isEditing}
                        leftIcon={<Phone className="w-4 h-4" />}
                      />
                      <Input
                        label="Company (Optional)"
                        value={profileData.company}
                        onChange={(value) => setProfileData({...profileData, company: value})}
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
                          <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{orders.length}</div>
                          <div className="text-xs text-neutral-500">Total Orders</div>
                        </div>
                        <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</div>
                          <div className="text-xs text-neutral-500">Total Spent</div>
                        </div>
                        <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{wishlistItems.length}</div>
                          <div className="text-xs text-neutral-500">Wishlist Items</div>
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

                    <div className="space-y-6">
                      {orders.map((order) => (
                        <motion.div
                          key={order.id}
                          variants={itemVariants}
                          className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden"
                        >
                          <div className="p-6">
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

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
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

                            {/* Order Items */}
                            <div className="mt-4 space-y-3">
                              {order.products.map((product, idx) => (
                                <div key={idx} className="flex items-center space-x-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                                  <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-12 h-12 object-cover rounded-md"
                                  />
                                  <div className="flex-1">
                                    <p className="font-medium text-neutral-900 dark:text-neutral-100">{product.name}</p>
                                    <p className="text-sm text-neutral-500">${product.price.toFixed(2)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="flex space-x-3 mt-4">
                              <Button variant="outline" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                                View Details
                              </Button>
                              {(order.status === 'shipped' || order.status === 'processing') && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  leftIcon={<Truck className="w-4 h-4" />}
                                  onClick={() => window.location.hash = 'track-order'}
                                >
                                  Track Order
                                </Button>
                              )}
                              {order.status === 'delivered' && (
                                <Button variant="outline" size="sm" leftIcon={<Star className="w-4 h-4" />}>
                                  Leave Review
                                </Button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Wishlist Tab */}
                {activeTab === 'wishlist' && (
                  <Card variant="default" padding="lg">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                      My Wishlist
                    </h2>

                    {wishlistItems.length > 0 ? (
                      <div className="space-y-4">
                        {wishlistItems.map((item) => (
                          <div 
                            key={item.id}
                            className="flex items-center space-x-4 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                          >
                            <img 
                              src={item.images[0]} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                                {item.name}
                              </h3>
                              <p className="text-sm text-neutral-500 mb-2">
                                {item.supplier.name}
                              </p>
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-red-600">${item.price.toFixed(2)}</span>
                                {item.originalPrice && (
                                  <span className="text-sm text-neutral-500 line-through">
                                    ${item.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                variant="primary" 
                                size="sm"
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => {
                                  useCartStore.getState().addItem(item);
                                  addNotification({
                                    type: 'success',
                                    message: 'Added to cart',
                                    autoClose: true
                                  });
                                }}
                              >
                                Add to Cart
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  useWishlistStore.getState().removeItem(item.id);
                                  addNotification({
                                    type: 'success',
                                    message: 'Removed from wishlist',
                                    autoClose: true
                                  });
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                          Your wishlist is empty
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                          Save items you like to your wishlist so you can easily find them later.
                        </p>
                        <Button 
                          variant="primary" 
                          onClick={() => window.location.hash = 'products'}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Browse Products
                        </Button>
                      </div>
                    )}
                  </Card>
                )}

                {/* Addresses Tab */}
                {activeTab === 'addresses' && (
                  <Card variant="default" padding="lg">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        My Addresses
                      </h2>
                      <Button
                        variant="primary"
                        onClick={() => setShowAddAddress(true)}
                        leftIcon={<Plus className="w-4 h-4" />}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Add New Address
                      </Button>
                    </div>

                    {showAddAddress ? (
                      <div className="mb-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                          Add New Address
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <Input
                            label="Street Address"
                            value={addressData.street}
                            onChange={(value) => setAddressData({...addressData, street: value})}
                            leftIcon={<Home className="w-4 h-4" />}
                            required
                          />
                          <Input
                            label="City"
                            value={addressData.city}
                            onChange={(value) => setAddressData({...addressData, city: value})}
                            leftIcon={<Building className="w-4 h-4" />}
                            required
                          />
                          <Input
                            label="State/Province"
                            value={addressData.state}
                            onChange={(value) => setAddressData({...addressData, state: value})}
                            leftIcon={<MapPin className="w-4 h-4" />}
                            required
                          />
                          <Input
                            label="Postal Code"
                            value={addressData.postalCode}
                            onChange={(value) => setAddressData({...addressData, postalCode: value})}
                            leftIcon={<FileText className="w-4 h-4" />}
                          />
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                              Country
                            </label>
                            <select
                              value={addressData.country}
                              onChange={(e) => setAddressData({...addressData, country: e.target.value})}
                              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"
                            >
                              <option value="Nigeria">Nigeria</option>
                              <option value="Ghana">Ghana</option>
                              <option value="Kenya">Kenya</option>
                              <option value="South Africa">South Africa</option>
                              <option value="Egypt">Egypt</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <Button
                            variant="primary"
                            onClick={handleAddAddress}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Save Address
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setShowAddAddress(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : null}

                    <div className="space-y-4">
                      {addresses.map((address) => (
                        <div 
                          key={address.id}
                          className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                                  {address.name}
                                </h3>
                                {address.isDefault && (
                                  <Badge variant="success" size="sm">Default</Badge>
                                )}
                              </div>
                              <p className="text-sm text-neutral-500 capitalize">
                                {address.type} Address
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                leftIcon={<Edit className="w-4 h-4" />}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                leftIcon={<Trash2 className="w-4 h-4" />}
                                onClick={() => handleDeleteAddress(address.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                          <div className="text-neutral-600 dark:text-neutral-400 text-sm space-y-1">
                            <p>{address.street}</p>
                            <p>{address.city}, {address.state} {address.postalCode}</p>
                            <p>{address.country}</p>
                            <p>{address.phone}</p>
                          </div>
                          {!address.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-3"
                              onClick={() => handleSetDefaultAddress(address.id)}
                            >
                              Set as Default
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <AccountSecurityDashboard />
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
                        onClick={() => setActiveTab('settings')}
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

                {/* Payment Methods Tab */}
                {activeTab === 'payment' && (
                  <Card variant="default" padding="lg">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                      Payment Methods
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                              <CreditCard className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                                Visa ending in 4242
                              </h3>
                              <p className="text-sm text-neutral-500">
                                Expires 12/25
                              </p>
                            </div>
                          </div>
                          <Badge variant="success" size="sm">Default</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                              <CreditCard className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                                Mastercard ending in 5678
                              </h3>
                              <p className="text-sm text-neutral-500">
                                Expires 09/24
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                          <Button variant="outline" size="sm">
                            Set as Default
                          </Button>
                        </div>
                      </div>
                      
                      <Button
                        variant="primary"
                        leftIcon={<Plus className="w-4 h-4" />}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Add Payment Method
                      </Button>
                    </div>
                  </Card>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <Card variant="default" padding="lg">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                      Account Settings
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                          Notification Preferences
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                            <div>
                              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                                Order Updates
                              </p>
                              <p className="text-sm text-neutral-500">
                                Receive notifications about your orders
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" checked />
                              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-red-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                            <div>
                              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                                Promotions & Deals
                              </p>
                              <p className="text-sm text-neutral-500">
                                Receive notifications about promotions and special offers
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" checked />
                              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-red-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                            <div>
                              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                                New Products
                              </p>
                              <p className="text-sm text-neutral-500">
                                Receive notifications about new products
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-red-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                            <div>
                              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                                Price Drops
                              </p>
                              <p className="text-sm text-neutral-500">
                                Receive notifications when items in your wishlist drop in price
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" checked />
                              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-red-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                          Language & Currency
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                              Language
                            </label>
                            <select className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800">
                              <option value="en">English</option>
                              <option value="fr">French</option>
                              <option value="ar">Arabic</option>
                              <option value="tr">Turkish</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                              Currency
                            </label>
                            <select className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800">
                              <option value="USD">USD ($)</option>
                              <option value="EUR">EUR (€)</option>
                              <option value="GBP">GBP (£)</option>
                              <option value="NGN">NGN (₦)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                          Account Actions
                        </h3>
                        <div className="space-y-3">
                          <Button
                            variant="outline"
                            leftIcon={<Download className="w-4 h-4" />}
                            fullWidth
                          >
                            Download My Data
                          </Button>
                          <Button
                            variant="outline"
                            leftIcon={<AlertTriangle className="w-4 h-4" />}
                            fullWidth
                            className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            Delete My Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
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