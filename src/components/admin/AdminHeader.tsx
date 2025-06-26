import React from 'react';
import { Bell, Search, User, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { ThemeToggle } from '../molecules/ThemeToggle';
import { clsx } from 'clsx';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onToggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle, onToggleSidebar }) => {
  const { user, signOut } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  return (
    <header className="h-16 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 lg:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
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

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-neutral-500" />
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg py-1 z-10 border border-neutral-200 dark:border-neutral-700">
              <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-neutral-500">
                  {user?.email}
                </p>
              </div>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Settings
              </a>
              <button
                onClick={() => signOut()}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                <LogOut className="w-4 h-4 inline mr-2" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;