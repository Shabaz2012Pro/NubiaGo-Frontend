import React, { useEffect, useState, useCallback } from 'react';
import { AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  ttfb: number | null;
  memoryUsage: number | null;
  longTasks: number;
  slowResources: number;
}

interface ResourceTiming {
  name: string;
  duration: number;
  startTime: number;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
    memoryUsage: null,
    longTasks: 0,
    slowResources: 0,
  });

  const [isMonitoring, setIsMonitoring] = useState(false);
  const [slowResources, setSlowResources] = useState<ResourceTiming[]>([]);

  const startMonitoring = useCallback(() => {
    if (!isMonitoring) {
      setIsMonitoring(true);
      initializePerformanceObservers();
      loadWebVitals();
    }
  }, [isMonitoring]);

  const loadWebVitals = async () => {
    try {
      const { getCLS, getFID, getLCP, getFCP, getTTFB } = await import('web-vitals');

      getCLS((metric) => {
        setMetrics(prev => ({ ...prev, cls: metric.value }));
      });

      getFID((metric) => {
        setMetrics(prev => ({ ...prev, fid: metric.value }));
      });

      getLCP((metric) => {
        setMetrics(prev => ({ ...prev, lcp: metric.value }));
      });

      getFCP((metric) => {
        setMetrics(prev => ({ ...prev, fcp: metric.value }));
      });

      getTTFB((metric) => {
        setMetrics(prev => ({ ...prev, ttfb: metric.value }));
      });
    } catch (error) {
      console.warn('Web Vitals not available:', error);
    }
  };

  const initializePerformanceObservers = () => {
    if (!('PerformanceObserver' in window)) return;

    // Long Task Observer
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        const longTaskCount = list.getEntries().length;
        setMetrics(prev => ({ 
          ...prev, 
          longTasks: prev.longTasks + longTaskCount 
        }));
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.warn('Long task observer not supported');
    }

    // Resource Observer
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        const slowResourceEntries = list.getEntries()
          .filter((entry: any) => entry.duration > 1000)
          .map((entry: any) => ({
            name: entry.name.split('/').pop() || entry.name,
            duration: Math.round(entry.duration),
            startTime: Math.round(entry.startTime),
          }));

        if (slowResourceEntries.length > 0) {
          setSlowResources(prev => [...prev, ...slowResourceEntries]);
          setMetrics(prev => ({ 
            ...prev, 
            slowResources: prev.slowResources + slowResourceEntries.length 
          }));
        }
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.warn('Resource observer not supported');
    }
  };

  // Memory monitoring
  useEffect(() => {
    if (!isMonitoring) return;

    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
        setMetrics(prev => ({ ...prev, memoryUsage: usedMB }));
      }
    };

    updateMemoryUsage();
    const interval = setInterval(updateMemoryUsage, 5000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const getMetricStatus = (metric: string, value: number | null) => {
    if (value === null) return 'neutral';

    switch (metric) {
      case 'fcp':
        return value < 1800 ? 'good' : value < 3000 ? 'needs-improvement' : 'poor';
      case 'lcp':
        return value < 2500 ? 'good' : value < 4000 ? 'needs-improvement' : 'poor';
      case 'cls':
        return value < 0.1 ? 'good' : value < 0.25 ? 'needs-improvement' : 'poor';
      case 'fid':
        return value < 100 ? 'good' : value < 300 ? 'needs-improvement' : 'poor';
      case 'ttfb':
        return value < 600 ? 'good' : value < 1500 ? 'needs-improvement' : 'poor';
      default:
        return 'neutral';
    }
  };

  const formatMetricValue = (metric: string, value: number | null) => {
    if (value === null) return '--';

    if (metric === 'cls') {
      return value.toFixed(3);
    }
    if (metric === 'memoryUsage') {
      return `${value}MB`;
    }
    return `${Math.round(value)}ms`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'needs-improvement':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'poor':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Zap className="w-4 h-4 text-neutral-400" />;
    }
  };

  const metricDefinitions = [
    { key: 'fcp', name: 'First Contentful Paint', description: 'Time until first content appears' },
    { key: 'lcp', name: 'Largest Contentful Paint', description: 'Time until largest content appears' },
    { key: 'cls', name: 'Cumulative Layout Shift', description: 'Visual stability of the page' },
    { key: 'fid', name: 'First Input Delay', description: 'Responsiveness to user input' },
    { key: 'ttfb', name: 'Time to First Byte', description: 'Server response time' },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
            Performance Monitor
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            Real-time performance metrics and optimization insights
          </p>
        </div>

        <button
          onClick={startMonitoring}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isMonitoring
              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          disabled={isMonitoring}
        >
          {isMonitoring ? 'Monitoring Active' : 'Start Monitoring'}
        </button>
      </div>

      {isMonitoring && (
        <>
          {/* Web Vitals Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {metricDefinitions.map(({ key, name, description }) => {
              const value = metrics[key as keyof PerformanceMetrics];
              const status = getMetricStatus(key, value as number);

              return (
                <div 
                  key={key}
                  className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border"
                  title={description}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                      {key.toUpperCase()}
                    </span>
                    {getStatusIcon(status)}
                  </div>

                  <div className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
                    {formatMetricValue(key, value as number)}
                  </div>

                  <Badge
                    variant={
                      status === 'good' ? 'success' : 
                      status === 'needs-improvement' ? 'warning' : 
                      status === 'poor' ? 'destructive' : 'secondary'
                    }
                    className="text-xs"
                  >
                    {status === 'good' ? 'Good' : 
                     status === 'needs-improvement' ? 'Needs Work' : 
                     status === 'poor' ? 'Poor' : 'Measuring...'}
                  </Badge>
                </div>
              );
            })}
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Memory Usage
                </span>
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-xl font-bold text-neutral-900 dark:text-white">
                {formatMetricValue('memoryUsage', metrics.memoryUsage)}
              </div>
            </div>

            <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Long Tasks
                </span>
                <AlertTriangle className={`w-4 h-4 ${
                  metrics.longTasks > 0 ? 'text-red-600' : 'text-green-600'
                }`} />
              </div>
              <div className="text-xl font-bold text-neutral-900 dark:text-white">
                {metrics.longTasks}
              </div>
            </div>

            <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Slow Resources
                </span>
                <Clock className={`w-4 h-4 ${
                  metrics.slowResources > 0 ? 'text-yellow-600' : 'text-green-600'
                }`} />
              </div>
              <div className="text-xl font-bold text-neutral-900 dark:text-white">
                {metrics.slowResources}
              </div>
            </div>
          </div>

          {/* Slow Resources List */}
          {slowResources.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                Slow Loading Resources
              </h3>
              <div className="space-y-2">
                {slowResources.slice(-5).map((resource, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                  >
                    <span className="text-sm font-medium text-yellow-800 dark:text-yellow-400 truncate">
                      {resource.name}
                    </span>
                    <Badge variant="warning" className="text-xs">
                      {resource.duration}ms
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!isMonitoring && (
        <div className="text-center py-8">
          <Zap className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
          <p className="text-neutral-600 dark:text-neutral-400">
            Click "Start Monitoring" to begin tracking performance metrics
          </p>
        </div>
      )}
    </Card>
  );
};

export default PerformanceMonitor;