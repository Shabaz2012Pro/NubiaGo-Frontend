import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  BarChart,
  Globe,
  Shield,
  Bell
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { clsx } from 'clsx';

interface AdminSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { signOut, user } = useAuthStore();
  
  const navigationItems = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Products', href: '/admin/products', icon: <Package className="w-5 h-5" /> },
    { name: 'Orders', href: '/admin/orders', icon: <ShoppingBag className="w-5 h-5" /> },
    { name: 'Users', href: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { name: 'Reports', href: '/admin/reports', icon: <BarChart className="w-5 h-5" /> },
    { name: 'Settings', href: '/admin/settings', icon: <Settings className="w-5 h-5" /> }
  ];

  const secondaryNavItems = [
    { name: 'View Website', href: '/', icon: <Globe className="w-5 h-5" /> },
    { name: 'Security', href: '/admin/security', icon: <Shield className="w-5 h-5" /> },
    { name: 'Notifications', href: '/admin/notifications', icon: <Bell className="w-5 h-5" /> }
  ];

  return (
    <div 
      className={clsx(
        'fixed inset-y-0 left-0 z-50 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 transition-all duration-300 transform',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-700">
        <Link to="/admin" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-600 flex items-center justify-center rounded">
            <span className="text-white text-lg font-bold">n</span>
          </div>
          {isOpen && (
            <span className="font-bold text-neutral-900 dark:text-neutral-100">
              NubiaGo Admin
            </span>
          )}
        </Link>
        <button 
          onClick={toggleSidebar}
          className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
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
                {isOpen && (
                  <span className="font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Secondary Navigation */}
        {isOpen && (
          <div>
            <div className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              System
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
        {isOpen && (
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
              <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        )}
        
        <button
          onClick={() => signOut()}
          className={clsx(
            'flex items-center space-x-3 w-full px-3 py-2 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors',
            !isOpen && 'justify-center'
          )}
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;