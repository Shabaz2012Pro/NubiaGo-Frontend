import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  Menu, 
  Bell, 
  Search,
  HelpCircle,
  BarChart,
  Globe,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/atoms/Button';
import { ThemeToggle } from '../../components/molecules/ThemeToggle';
import { clsx } from 'clsx';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if user is admin, if not redirect to home
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navigationItems = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Products', href: '/admin/products', icon: <Package className="w-5 h-5" /> },
    { name: 'Orders', href: '/admin/orders', icon: <ShoppingBag className="w-5 h-5" /> },
    { name: 'Users', href: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { name: 'Reports', href: '/admin/reports', icon: <BarChart className="w-5 h-5" /> },
    { name: 'Settings', href: '/admin/settings', icon: <Settings className="w-5 h-5" /> }
  ];

  const secondaryNavItems = [
    { name: 'Help Center', href: '/admin/help', icon: <HelpCircle className="w-5 h-5" /> },
    { name: 'Website', href: '/', icon: <Globe className="w-5 h-5" /> },
    { name: 'Security', href: '/admin/security', icon: <Shield className="w-5 h-5" /> }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Sidebar */}
      <div 
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 transition-all duration-300 transform',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
        )}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-700">
          <Link to="/admin" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 flex items-center justify-center rounded">
              <span className="text-white text-lg font-bold">n</span>
            </div>
            {sidebarOpen && (
              <span className="font-bold text-neutral-900 dark:text-neutral-100">
                NubiaGo Admin
              </span>
            )}
          </Link>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 space-y-8">
          {/* Main Navigation */}
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                    isActive 
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-100'
                  )}
                >
                  <div className={clsx(
                    'flex-shrink-0',
                    isActive ? 'text-red-600 dark:text-red-400' : 'text-neutral-500 dark:text-neutral-400'
                  )}>
                    {item.icon}
                  </div>
                  {sidebarOpen && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Secondary Navigation */}
          {sidebarOpen && (
            <div>
              <div className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Support
              </div>
              <nav className="mt-2 space-y-1">
                {secondaryNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-3 px-3 py-2 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                  >
                    <div className="flex-shrink-0 text-neutral-500 dark:text-neutral-400">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200 dark:border-neutral-700">
          <button
            onClick={() => logout()}
            className={clsx(
              'flex items-center space-x-3 w-full px-3 py-2 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors',
              !sidebarOpen && 'justify-center'
            )}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={clsx(
        'transition-all duration-300',
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      )}>
        {/* Top Bar */}
        <header className="h-16 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-40 lg:w-64 px-3 py-2 pl-9 text-sm bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <button className="relative p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <ThemeToggle />

            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"}
                alt="Admin"
                className="w-8 h-8 rounded-full object-cover"
              />
              {!isMobile && (
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Administrator
                  </p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;