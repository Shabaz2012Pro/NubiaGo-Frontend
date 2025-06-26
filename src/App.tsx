import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';

// Contexts
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

// Components
import { RouteErrorBoundary } from './components/molecules/RouteErrorBoundary';
import { LoadingScreen } from './components/molecules/LoadingScreen';
import OfflineIndicator from './components/molecules/OfflineIndicator';
import PWAInstallPrompt from './components/molecules/PWAInstallPrompt';
import { PerformanceMonitor } from './components/molecules/PerformanceMonitor';

// Lazy-loaded components for code splitting
const Header = React.lazy(() => import('./components/organisms/Header'));
const Footer = React.lazy(() => import('./components/organisms/Footer'));

// Pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const UserDashboardPage = React.lazy(() => import('./pages/UserDashboardPage'));
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const FAQPage = React.lazy(() => import('./pages/FAQPage'));
const SuppliersPage = React.lazy(() => import('./pages/SuppliersPage'));
const BecomeSupplierPage = React.lazy(() => import('./pages/BecomeSupplierPage'));
const NotFoundPage = React.lazy(() => import('./components/molecules/NotFoundPage'));

// Utility imports
import { enterprisePerformance } from './utils/enterprisePerformance';
import { injectResourceHints, reportWebVitals, initPerformanceMonitoring } from './utils/performance';

// Create optimized QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        if (error?.status === 404) return false;
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Error fallback component
const ErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({
  error,
  resetErrorBoundary,
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
        <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
        Something went wrong
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
        {error.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
      >
        Try again
      </button>
    </div>
  </div>
);

const App: React.FC = () => {
  useEffect(() => {
    // Initialize enterprise performance monitoring
    enterprisePerformance.initializeMemoryManagement();
    enterprisePerformance.initializeEnterpriseErrorTracking();
    enterprisePerformance.preloadCriticalResources();
    enterprisePerformance.optimizeImageDelivery();

    // Initialize performance monitoring
    initPerformanceMonitoring();

    // Inject resource hints
    injectResourceHints();

    // Report web vitals
    reportWebVitals();

    // Service Worker registration
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Performance monitoring
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          console.log('Navigation timing:', entry);
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['navigation', 'resource'] });
    } catch (error) {
      console.warn('Performance observer not supported');
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('App Error Boundary:', error, errorInfo);
        // Send to error tracking service
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
                {/* Performance Monitor (development only) */}
                {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}

                {/* PWA Features */}
                <PWAInstallPrompt />
                <OfflineIndicator />

                {/* Main Layout */}
                <Suspense fallback={<LoadingScreen />}>
                  <Header />
                </Suspense>

                <main className="flex-1">
                  <Suspense fallback={<LoadingScreen />}>
                    <Routes>
                      {/* Main Routes */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/products/:id" element={<ProductDetailPage />} />
                      <Route path="/category/:category" element={<CategoryPage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/dashboard" element={<UserDashboardPage />} />
                      <Route path="/auth" element={<AuthPage />} />

                      {/* Company Pages */}
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/faq" element={<FAQPage />} />
                      <Route path="/suppliers" element={<SuppliersPage />} />
                      <Route path="/become-supplier" element={<BecomeSupplierPage />} />

                      {/* Redirects for SEO */}
                      <Route path="/home" element={<Navigate to="/" replace />} />
                      <Route path="/product/:id" element={<Navigate to="/products/$1" replace />} />

                      {/* 404 Page */}
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                </main>

                <Suspense fallback={<div className="h-16" />}>
                  <Footer />
                </Suspense>

                {/* Global Toast Notifications */}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'var(--toast-bg)',
                      color: 'var(--toast-color)',
                    },
                  }}
                />
              </div>
            </Router>
          </AuthProvider>
        </ThemeProvider>

        {/* React Query DevTools (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;