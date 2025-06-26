import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Image, 
  Code, 
  Package, 
  Layers, 
  Cpu, 
  BarChart, 
  Smartphone,
  RefreshCw,
  Clock,
  Download,
  CheckCircle
} from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';
import LazyImage from '../components/atoms/LazyImage';
import VirtualizedList from '../components/molecules/VirtualizedList';
import { optimizeImage, preloadCriticalImages } from '../utils/imageOptimizer';
import { initPerformanceMonitoring, reportWebVitals } from '../utils/performance';
import { clsx } from 'clsx';

// Lazy-loaded components
const ProductCardOptimized = lazy(() => import('../components/molecules/ProductCardOptimized'));
const InfiniteProductGrid = lazy(() => import('../components/molecules/InfiniteProductGrid'));

// Mock products for demo
const mockProducts = Array.from({ length: 100 }, (_, i) => ({
  id: `product-${i}`,
  name: `Product ${i + 1}`,
  description: 'Product description goes here with details about the product features and benefits.',
  price: 99.99 + i,
  originalPrice: i % 3 === 0 ? 129.99 + i : undefined,
  currency: 'USD',
  images: [
    'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400'
  ],
  category: i % 5 === 0 ? 'electronics' : i % 5 === 1 ? 'fashion' : i % 5 === 2 ? 'home-appliances' : i % 5 === 3 ? 'beauty' : 'sports',
  supplier: {
    id: '1',
    name: 'Supplier Name',
    country: 'Turkey',
    rating: 4.5,
    verified: true,
    totalProducts: 100,
    responseTime: '< 2 hours',
    memberSince: '2020'
  },
  rating: 4.5,
  reviews: 100,
  inStock: true,
  minOrder: 1,
  tags: ['tag1', 'tag2', 'tag3'],
  isNew: i % 7 === 0,
  isFeatured: i % 11 === 0
}));

const PerformanceDemo: React.FC = () => {
  const [webVitals, setWebVitals] = useState<Record<string, number>>({
    FCP: 0,
    LCP: 0,
    CLS: 0,
    FID: 0,
    TTFB: 0
  });

  const [isMonitoring, setIsMonitoring] = useState(false);
  const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [virtualizedItems, setVirtualizedItems] = useState<string[]>([]);

  // Initialize performance monitoring
  useEffect(() => {
    if (isMonitoring) {
      initPerformanceMonitoring();

      // Simulate web vitals data
      setTimeout(() => {
        setWebVitals({
          FCP: 350,
          LCP: 850,
          CLS: 0.05,
          FID: 25,
          TTFB: 120
        });
      }, 2000);
    }
  }, [isMonitoring]);

  // Generate virtualized list items
  useEffect(() => {
    const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
    setVirtualizedItems(items);
  }, []);

  // Preload critical images
  useEffect(() => {
    preloadCriticalImages([
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'
    ]);
  }, []);

  const handleLoadTest = async () => {
    setLoadingState('loading');
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoadingState('success');
    } catch (error) {
      setLoadingState('error');
    }
  };

  const performanceFeatures = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Code Splitting",
      description: "Dynamic imports and lazy loading for optimal bundle sizes",
      status: "active"
    },
    {
      icon: <Image className="w-6 h-6" />,
      title: "Image Optimization",
      description: "WebP format, lazy loading, and responsive images",
      status: "active"
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Bundle Analysis",
      description: "Tree shaking and dead code elimination",
      status: "active"
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Virtual Scrolling",
      description: "Efficient rendering of large lists",
      status: "active"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Performance Monitoring",
      description: "Real-time Web Vitals tracking",
      status: isMonitoring ? "active" : "inactive"
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Caching Strategy",
      description: "Service worker and browser caching",
      status: "active"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              Performance Optimization Demo
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore advanced performance optimization techniques including code splitting, 
            lazy loading, image optimization, and real-time monitoring.
          </p>
        </motion.div>

        {/* Performance Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {performanceFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <Badge 
                    variant={feature.status === 'active' ? 'success' : 'secondary'}
                    className="text-xs"
                  >
                    {feature.status}
                  </Badge>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Web Vitals Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Web Vitals Monitor</h2>
              <Button
                onClick={() => setIsMonitoring(!isMonitoring)}
                variant={isMonitoring ? 'secondary' : 'primary'}
                className="flex items-center"
              >
                <BarChart className="w-4 h-4 mr-2" />
                {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
              </Button>
            </div>

            {isMonitoring && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(webVitals).map(([metric, value]) => (
                  <div key={metric} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {value > 0 ? `${value}${metric === 'CLS' ? '' : 'ms'}` : '--'}
                    </div>
                    <div className="text-sm text-gray-600">{metric}</div>
                    <div className="mt-2">
                      {value > 0 && (
                        <Badge 
                          variant={
                            (metric === 'FCP' && value < 1800) ||
                            (metric === 'LCP' && value < 2500) ||
                            (metric === 'CLS' && value < 0.1) ||
                            (metric === 'FID' && value < 100) ||
                            (metric === 'TTFB' && value < 600)
                              ? 'success' 
                              : 'warning'
                          }
                          className="text-xs"
                        >
                          {(metric === 'FCP' && value < 1800) ||
                           (metric === 'LCP' && value < 2500) ||
                           (metric === 'CLS' && value < 0.1) ||
                           (metric === 'FID' && value < 100) ||
                           (metric === 'TTFB' && value < 600)
                            ? 'Good' 
                            : 'Needs Improvement'}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Code Splitting Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Code Splitting & Lazy Loading</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Lazy-Loaded Product Grid</h3>
                <Suspense fallback={
                  <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                    <div className="flex items-center">
                      <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                      Loading component...
                    </div>
                  </div>
                }>
                  <InfiniteProductGrid products={mockProducts.slice(0, 6)} />
                </Suspense>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Optimized Product Cards</h3>
                <div className="space-y-4">
                  {mockProducts.slice(0, 3).map((product) => (
                    <Suspense 
                      key={product.id}
                      fallback={
                        <div className="h-24 bg-gray-100 rounded-lg animate-pulse" />
                      }
                    >
                      <ProductCardOptimized product={product} />
                    </Suspense>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Virtual Scrolling Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Virtual Scrolling</h2>
            <p className="text-gray-600 mb-4">
              Efficiently render 10,000+ items using virtualization
            </p>

            <div className="h-96 border rounded-lg">
              <VirtualizedList 
                items={virtualizedItems}
                itemHeight={50}
                renderItem={(item, index) => (
                  <div className="flex items-center px-4 py-3 border-b border-gray-100">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    <span className="text-gray-900">{item}</span>
                  </div>
                )}
              />
            </div>
          </Card>
        </motion.div>

        {/* Image Optimization Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Image Optimization</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Lazy Loading Images</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <LazyImage
                      key={i}
                      src={`https://images.pexels.com/photos/339460${i}/pexels-photo-339460${i}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                      alt={`Product ${i}`}
                      className="w-full h-32 object-cover rounded-lg"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Optimization Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">WebP Format</span>
                    <Badge variant="success">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Lazy Loading</span>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Responsive Images</span>
                    <Badge variant="success">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Compression</span>
                    <Badge variant="success">85% Quality</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Loading Performance Test */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Loading Performance Test</h2>

            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-600 mb-2">
                  Test async loading with proper loading states and error handling
                </p>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">
                    Simulates 2-second network request
                  </span>
                </div>
              </div>

              <Button
                onClick={handleLoadTest}
                disabled={loadingState === 'loading'}
                className="flex items-center"
              >
                {loadingState === 'loading' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                    Loading...
                  </>
                ) : loadingState === 'success' ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Success!
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Start Test
                  </>
                )}
              </Button>
            </div>

            {loadingState !== 'idle' && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Loading Progress
                  </span>
                  <span className="text-sm text-gray-500">
                    {loadingState === 'loading' ? 'In Progress' : 
                     loadingState === 'success' ? 'Completed' : 'Failed'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={clsx(
                      "h-2 rounded-full transition-all duration-300",
                      loadingState === 'loading' && "bg-blue-500 w-1/2",
                      loadingState === 'success' && "bg-green-500 w-full",
                      loadingState === 'error' && "bg-red-500 w-1/4"
                    )}
                  />
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Performance Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Best Practices</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-green-600">✅ Implemented</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Code splitting with dynamic imports</li>
                  <li>• Lazy loading for images and components</li>
                  <li>• Virtual scrolling for large lists</li>
                  <li>• Image optimization (WebP, compression)</li>
                  <li>• Bundle size optimization</li>
                  <li>• Performance monitoring</li>
                  <li>• Proper loading states</li>
                  <li>• Error boundaries</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">🚀 Additional Optimizations</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Service Worker caching</li>
                  <li>• CDN for static assets</li>
                  <li>• HTTP/2 server push</li>
                  <li>• Critical CSS inlining</li>
                  <li>• Resource preloading</li>
                  <li>• Database query optimization</li>
                  <li>• API response caching</li>
                  <li>• Progressive Web App features</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default PerformanceDemo;