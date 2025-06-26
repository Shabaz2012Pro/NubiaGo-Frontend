import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ShoppingCart, User, Bell, Heart, Globe } from 'lucide-react';
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
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Products', href: '/products', current: location.pathname === '/products' },
    { name: 'Categories', href: '/categories', current: location.pathname.startsWith('/category') },
    { name: 'Suppliers', href: '/suppliers', current: location.pathname === '/suppliers' },
    { name: 'About', href: '/about', current: location.pathname === '/about' },
    { name: 'Contact', href: '/contact', current: location.pathname === '/contact' },
  ], [location.pathname]);

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
  }, [location.pathname]);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key closes mobile menu and search
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
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

  return (
    <>
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
                <img
                  src="/brandmark-design-1024x0 (3) copy.png"
                  alt="NubiaGo"
                  className="h-8 w-auto"
                  loading="eager"
                />
                <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                  NubiaGo
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8" role="navigation" aria-label="Main navigation">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                    ${item.current
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }
                  `}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:block flex-1 max-w-lg mx-8">
              <SearchBar 
                placeholder="Search products..."
                className="w-full"
              />
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

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors duration-200"
                aria-label={`Wishlist (${wishlistItems.length} items)`}
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {wishlistItems.length > 99 ? '99+' : wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Shopping Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors duration-200"
                aria-label={`Shopping cart (${cartItemCount} items)`}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
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

              {/* User Menu */}
              {!isLoading && (
                <UserMenu 
                  className="relative"
                />
              )}

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

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <nav className="px-4 py-3 space-y-1" role="navigation" aria-label="Mobile navigation">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200
                    ${item.current
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }
                  `}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}

              {user && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
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