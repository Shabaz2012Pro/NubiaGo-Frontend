import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ShoppingCart, User, Bell, Heart, Globe, Smartphone, Laptop, Home, Shirt, Sparkles, Dumbbell, Car, Utensils, Baby } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import SearchBar from './SearchBar';
import UserMenu from '../molecules/UserMenu';
import { NotificationBell } from '../molecules/NotificationBell';
import { ThemeToggle } from '../molecules/ThemeToggle';
import { PWAInstallPrompt } from '../molecules/PWAInstallPrompt';
import { debounce } from '../../utils/performance';
import { clsx } from 'clsx';
import AuthButton from '../auth/AuthButton';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Store hooks
  const cartItems = useCartStore(state => state.items);
  const wishlistItems = useWishlistStore(state => state.items);
  const notifications = useNotificationStore(state => state.notifications);

  // Local state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Memoized values
  const cartItemCount = useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.quantity, 0), 
    [cartItems]
  );

  const unreadNotificationCount = useMemo(() => 
    notifications.filter(n => !n.read).length, 
    [notifications]
  );

  // Navigation items
  const navigationItems = useMemo(() => [
    { name: 'Electronics', href: '/products?category=electronics', icon: <Smartphone className="w-5 h-5" /> },
    { name: 'Appliances', href: '/products?category=home-appliances', icon: <Home className="w-5 h-5" /> },
    { name: 'Fashion', href: '/products?category=fashion', icon: <Shirt className="w-5 h-5" /> },
    { name: 'Personal Care', href: '/products?category=beauty', icon: <Sparkles className="w-5 h-5" /> },
    { name: 'Sports', href: '/products?category=sports', icon: <Dumbbell className="w-5 h-5" /> },
    { name: 'Automotive', href: '/products?category=automotive', icon: <Car className="w-5 h-5" /> },
    { name: 'Food & Beverage', href: '/products?category=food-beverage', icon: <Utensils className="w-5 h-5" /> },
    { name: 'Baby & Kids', href: '/products?category=baby-kids', icon: <Baby className="w-5 h-5" /> },
    { name: 'All Products', href: '/products', icon: null }
  ], []);

  // Scroll handler with debouncing
  const handleScroll = useCallback(
    debounce(() => {
      setIsScrolled(window.scrollY > 0);
    }, 100),
    []
  );

  // Effects
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsCategoryMenuOpen(false);
  }, [location.pathname]);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key closes mobile menu and search
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
        setIsCategoryMenuOpen(false);
      }

      // Ctrl/Cmd + K opens search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Event handlers
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev);
  }, []);

  const handleLogoClick = useCallback(() => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${category}`);
    setIsCategoryMenuOpen(false);
  };

  // Check if current path is admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Don't show admin-specific links for regular users
  if (isAdminRoute && user?.role !== 'admin') {
    return null;
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-sm">Free shipping on orders over $100</span>
            <span className="mx-4 text-gray-500">|</span>
            <div className="flex items-center">
              <span className="mr-2">24/7 Support</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              <span className="text-sm mr-1">TR</span>
              <span className="text-sm">Turkish Quality</span>
              <span className="mx-2">•</span>
              <span className="text-sm">African Markets</span>
            </div>
            
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              <span className="text-sm">US</span>
              <span className="text-sm ml-1">English</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <header 
        className={`
          sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 
          transition-all duration-200 ${isScrolled ? 'shadow-md' : ''} ${className}
        `}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={handleLogoClick}
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
                aria-label="NubiaGo - Home"
              >
                <div className="w-10 h-10 bg-red-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">n</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                  NubiaGo
                </span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </button>
            </div>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search 10M+ products from verified suppliers..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button className="absolute right-0 top-0 h-full bg-red-600 text-white px-6 rounded-r-full">
                  Search
                </button>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Toggle (Mobile) */}
              <button
                onClick={toggleSearch}
                className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                aria-label="Toggle search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Admin Link - Only show for admin users */}
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors duration-200"
                  aria-label="Admin Dashboard"
                >
                  <User className="h-5 w-5" />
                </Link>
              )}
              
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors duration-200"
                aria-label={`Wishlist (${wishlistItems.length} items)`}
              >
                <Heart className="h-5 w-5" />
              </Link>

              {/* Shopping Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors duration-200"
                aria-label={`Shopping cart (${cartItemCount} items)`}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Link>

              {/* Notifications */}
              {user && (
                <NotificationBell 
                  count={unreadNotificationCount}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                />
              )}

              {/* Auth Button - Sign In/Sign Up */}
              <AuthButton />

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="px-4 py-3">
              <SearchBar 
                placeholder="Search products..."
                className="w-full"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Category Navigation */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              <nav className="flex space-x-8 overflow-x-auto scrollbar-hide" role="navigation" aria-label="Categories">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-1 px-1 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 whitespace-nowrap"
                  >
                    {item.icon && <span>{item.icon}</span>}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
              
              <Link
                to="/contact"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 whitespace-nowrap border border-gray-300 rounded-md px-4 py-1"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <nav className="px-4 py-3 space-y-1" role="navigation" aria-label="Mobile navigation">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-2 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.name}</span>
                </Link>
              ))}

              {/* Admin Link - Only show for admin users */}
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <User className="w-5 h-5" />
                  <span>Admin Dashboard</span>
                </Link>
              )}

              {user && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                  >
                    Orders
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </>
  );
};

export default React.memo(Header);