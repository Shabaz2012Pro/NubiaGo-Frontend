import React, { useState } from 'react';
import { 
  Save, 
  Globe, 
  Mail, 
  DollarSign, 
  Truck, 
  Shield, 
  Bell, 
  Palette,
  Database,
  HardDrive,
  Server,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Badge from '../../components/atoms/Badge';
import PerformanceMonitor from '../../components/molecules/PerformanceMonitor';
import { clsx } from 'clsx';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  
  const tabs = [
    { id: 'general', label: 'General', icon: <Globe className="w-5 h-5" /> },
    { id: 'email', label: 'Email', icon: <Mail className="w-5 h-5" /> },
    { id: 'payment', label: 'Payment', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'shipping', label: 'Shipping', icon: <Truck className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette className="w-5 h-5" /> },
    { id: 'system', label: 'System', icon: <Server className="w-5 h-5" /> }
  ];

  return (
    <AdminLayout title="Settings" subtitle="Configure system settings">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card variant="default" padding="md" className="sticky top-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
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
                  <div className={clsx(
                    activeTab === tab.id
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-neutral-500 dark:text-neutral-400'
                  )}>
                    {tab.icon}
                  </div>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* General Settings */}
          {activeTab === 'general' && (
            <Card variant="default" padding="lg">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                General Settings
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    Site Information
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    <Input
                      label="Site Name"
                      value="NubiaGo"
                      onChange={() => {}}
                    />
                    <Input
                      label="Site URL"
                      value="https://nubiago.com"
                      onChange={() => {}}
                    />
                    <Input
                      label="Admin Email"
                      value="admin@nubiago.com"
                      onChange={() => {}}
                    />
                    <Input
                      label="Support Email"
                      value="support@nubiago.com"
                      onChange={() => {}}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    Localization
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Default Language
                      </label>
                      <select className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg">
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        <option value="ar">Arabic</option>
                        <option value="tr">Turkish</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Default Currency
                      </label>
                      <select className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg">
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="NGN">NGN (₦)</option>
                        <option value="TRY">TRY (₺)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Timezone
                      </label>
                      <select className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg">
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="Europe/London">London (GMT)</option>
                        <option value="Europe/Istanbul">Istanbul (TRT)</option>
                        <option value="Africa/Lagos">Lagos (WAT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Date Format
                      </label>
                      <select className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg">
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <Button
                    variant="primary"
                    leftIcon={<Save className="w-4 h-4" />}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* System Settings */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <Card variant="default" padding="lg">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                  System Settings
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                      Performance
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">
                            Enable Caching
                          </p>
                          <p className="text-sm text-neutral-500">
                            Improve performance by caching frequently accessed data
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">
                            Image Optimization
                          </p>
                          <p className="text-sm text-neutral-500">
                            Automatically optimize images for better performance
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">
                            Performance Monitoring
                          </p>
                          <p className="text-sm text-neutral-500">
                            Track and analyze system performance metrics
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowPerformanceMonitor(!showPerformanceMonitor)}
                        >
                          {showPerformanceMonitor ? 'Hide Monitor' : 'Show Monitor'}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                      Database
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <Database className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">
                              Database Status
                            </p>
                            <p className="text-sm text-neutral-500">
                              Current status of the database connection
                            </p>
                          </div>
                        </div>
                        <Badge variant="success" size="sm">Connected</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                            <HardDrive className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">
                              Storage Usage
                            </p>
                            <p className="text-sm text-neutral-500">
                              Current database storage usage
                            </p>
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          2.4 GB / 10 GB
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                            <RefreshCw className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">
                              Last Backup
                            </p>
                            <p className="text-sm text-neutral-500">
                              Time of the last database backup
                            </p>
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          Today, 04:30 AM
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <Button
                      variant="primary"
                      leftIcon={<Save className="w-4 h-4" />}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </Card>
              
              {showPerformanceMonitor && (
                <Card variant="default" padding="lg">
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                    Performance Monitor
                  </h2>
                  <PerformanceMonitor />
                </Card>
              )}
              
              <Card variant="default" padding="lg">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                  System Maintenance
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Clear Cache
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                        Clear system cache to refresh data and fix potential issues.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<RefreshCw className="w-4 h-4" />}
                      >
                        Clear Cache
                      </Button>
                    </div>
                    
                    <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Database Backup
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                        Create a manual backup of the database.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Database className="w-4 h-4" />}
                      >
                        Create Backup
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                          Scheduled Maintenance
                        </h3>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">
                          System maintenance is scheduled for July 1st, 2024 from 2:00 AM to 4:00 AM UTC.
                          The system may experience brief downtime during this period.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
          
          {/* Other tabs would be implemented similarly */}
          {(activeTab !== 'general' && activeTab !== 'system') && (
            <Card variant="default" padding="lg">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                {tabs.find(tab => tab.id === activeTab)?.label} Settings
              </h2>
              
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  {tabs.find(tab => tab.id === activeTab)?.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  {tabs.find(tab => tab.id === activeTab)?.label} Settings
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                  This section allows you to configure {tabs.find(tab => tab.id === activeTab)?.label.toLowerCase()} settings for your marketplace.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;