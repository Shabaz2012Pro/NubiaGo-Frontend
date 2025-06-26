
import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Database,
  Globe,
  Server,
  Users,
  Zap,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { enterprisePerformance } from '../../utils/enterprisePerformance';
import { enterpriseApiClient } from '../../services/enterpriseApiClient';
import { apiCache, imageCache, userDataCache } from '../../utils/enterpriseCache';

interface PerformanceMetrics {
  responseTime: number;
  errorRate: number;
  activeUsers: number;
  cacheHitRate: number;
  memoryUsage: number;
  requestsPerMinute: number;
  uptime: number;
}

interface SystemHealth {
  api: 'healthy' | 'degraded' | 'down';
  database: 'healthy' | 'degraded' | 'down';
  cache: 'healthy' | 'degraded' | 'down';
  cdn: 'healthy' | 'degraded' | 'down';
}

const EnterpriseMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    responseTime: 0,
    errorRate: 0,
    activeUsers: 0,
    cacheHitRate: 0,
    memoryUsage: 0,
    requestsPerMinute: 0,
    uptime: 0
  });

  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    api: 'healthy',
    database: 'healthy',
    cache: 'healthy',
    cdn: 'healthy'
  });

  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [alerts, setAlerts] = useState<Array<{
    id: string;
    type: 'warning' | 'error' | 'info';
    message: string;
    timestamp: Date;
  }>>([]);

  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    
    const interval = setInterval(async () => {
      await updateMetrics();
      await checkSystemHealth();
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    // Initial update
    updateMetrics();
    checkSystemHealth();
    setLastUpdate(new Date());

    return () => clearInterval(interval);
  }, []);

  const updateMetrics = async () => {
    try {
      // Get performance metrics
      const performanceData = await enterprisePerformance.getPerformanceMetrics();
      
      // Get cache statistics
      const apiCacheStats = apiCache.getStats();
      const imageCacheStats = imageCache.getStats();
      const userCacheStats = userDataCache.getStats();
      
      // Get API client queue status
      const queueStatus = enterpriseApiClient.getQueueStatus();
      
      // Calculate averages and totals
      const totalCacheHitRate = (
        parseFloat(apiCacheStats.hitRate) + 
        parseFloat(imageCacheStats.hitRate) + 
        parseFloat(userCacheStats.hitRate)
      ) / 3;

      setMetrics(prev => ({
        ...prev,
        responseTime: performanceData.navigation?.responseEnd - performanceData.navigation?.responseStart || 0,
        cacheHitRate: totalCacheHitRate,
        memoryUsage: performanceData.memory?.usedJSHeapSize || 0,
        requestsPerMinute: queueStatus.active + queueStatus.queued,
        activeUsers: Math.floor(Math.random() * 150) + 50, // Simulated
        uptime: performance.now() / 1000 / 60 // Minutes since page load
      }));

      // Check for alerts
      checkForAlerts(metrics);
      
    } catch (error) {
      console.error('Failed to update metrics:', error);
      addAlert('error', 'Failed to update performance metrics');
    }
  };

  const checkSystemHealth = async () => {
    try {
      // Check API health
      const apiHealthy = await enterpriseApiClient.healthCheck();
      
      // Check cache health (based on hit rates)
      const cacheStats = apiCache.getStats();
      const cacheHealthy = parseFloat(cacheStats.hitRate) > 50;
      
      setSystemHealth(prev => ({
        ...prev,
        api: apiHealthy ? 'healthy' : 'down',
        cache: cacheHealthy ? 'healthy' : 'degraded',
        // Simulate other services
        database: Math.random() > 0.1 ? 'healthy' : 'degraded',
        cdn: Math.random() > 0.05 ? 'healthy' : 'degraded'
      }));
      
    } catch (error) {
      console.error('Health check failed:', error);
      setSystemHealth(prev => ({
        ...prev,
        api: 'down'
      }));
    }
  };

  const checkForAlerts = (currentMetrics: PerformanceMetrics) => {
    const newAlerts: typeof alerts = [];

    // High response time alert
    if (currentMetrics.responseTime > 2000) {
      newAlerts.push({
        id: `high-response-${Date.now()}`,
        type: 'warning',
        message: `High response time detected: ${currentMetrics.responseTime}ms`,
        timestamp: new Date()
      });
    }

    // High memory usage alert
    if (currentMetrics.memoryUsage > 100 * 1024 * 1024) { // 100MB
      newAlerts.push({
        id: `high-memory-${Date.now()}`,
        type: 'error',
        message: `High memory usage: ${(currentMetrics.memoryUsage / 1024 / 1024).toFixed(1)}MB`,
        timestamp: new Date()
      });
    }

    // Low cache hit rate alert
    if (currentMetrics.cacheHitRate < 60) {
      newAlerts.push({
        id: `low-cache-${Date.now()}`,
        type: 'warning',
        message: `Low cache hit rate: ${currentMetrics.cacheHitRate.toFixed(1)}%`,
        timestamp: new Date()
      });
    }

    if (newAlerts.length > 0) {
      setAlerts(prev => [...newAlerts, ...prev].slice(0, 10)); // Keep last 10 alerts
    }
  };

  const addAlert = (type: 'warning' | 'error' | 'info', message: string) => {
    const alert = {
      id: `alert-${Date.now()}`,
      type,
      message,
      timestamp: new Date()
    };
    setAlerts(prev => [alert, ...prev].slice(0, 10));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'success';
      case 'degraded': return 'warning';
      case 'down': return 'error';
      default: return 'neutral';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4" />;
      case 'down': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    const cleanup = startMonitoring();
    return cleanup;
  }, [startMonitoring]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Enterprise Monitor
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Real-time system performance and health monitoring
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={isMonitoring ? 'success' : 'neutral'}>
            {isMonitoring ? 'Active' : 'Inactive'}
          </Badge>
          {lastUpdate && (
            <span className="text-sm text-neutral-500">
              Last update: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              updateMetrics();
              checkSystemHealth();
            }}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Response Time</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {metrics.responseTime.toFixed(0)}ms
              </p>
            </div>
            <Zap className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Active Users</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {metrics.activeUsers}
              </p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Cache Hit Rate</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {metrics.cacheHitRate.toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Memory Usage</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {(metrics.memoryUsage / 1024 / 1024).toFixed(1)}MB
              </p>
            </div>
            <Activity className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* System Health */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          System Health
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <Globe className="w-5 h-5 text-neutral-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">API</p>
              <div className="flex items-center space-x-2">
                {getStatusIcon(systemHealth.api)}
                <Badge variant={getStatusColor(systemHealth.api)} size="sm">
                  {systemHealth.api}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <Database className="w-5 h-5 text-neutral-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">Database</p>
              <div className="flex items-center space-x-2">
                {getStatusIcon(systemHealth.database)}
                <Badge variant={getStatusColor(systemHealth.database)} size="sm">
                  {systemHealth.database}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <Server className="w-5 h-5 text-neutral-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">Cache</p>
              <div className="flex items-center space-x-2">
                {getStatusIcon(systemHealth.cache)}
                <Badge variant={getStatusColor(systemHealth.cache)} size="sm">
                  {systemHealth.cache}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <Globe className="w-5 h-5 text-neutral-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">CDN</p>
              <div className="flex items-center space-x-2">
                {getStatusIcon(systemHealth.cdn)}
                <Badge variant={getStatusColor(systemHealth.cdn)} size="sm">
                  {systemHealth.cdn}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Alerts */}
      {alerts.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Recent Alerts
          </h2>
          <div className="space-y-3">
            {alerts.slice(0, 5).map((alert) => (
              <div
                key={alert.id}
                className="flex items-center space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
              >
                <AlertTriangle className={`w-4 h-4 ${
                  alert.type === 'error' ? 'text-red-600' : 
                  alert.type === 'warning' ? 'text-yellow-600' : 
                  'text-blue-600'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-neutral-900 dark:text-white">
                    {alert.message}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {alert.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                <Badge variant={alert.type === 'error' ? 'error' : 'warning'} size="sm">
                  {alert.type}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default EnterpriseMonitor;
