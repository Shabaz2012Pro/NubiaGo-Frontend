import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Performance utilities
import { 
  reportWebVitals, 
  registerServiceWorker, 
  injectResourceHints,
  preloadCriticalImages 
} from './utils/performance';

// Error tracking
import { initErrorTracking } from './utils/errorTracking';

// Enterprise systems
import { enterprisePerformance } from './utils/enterprisePerformance';

// Supabase test
import { testSupabaseConnection } from './utils/supabaseTest';

// Inject resource hints early
injectResourceHints();

// Initialize error tracking
initErrorTracking();

// Initialize enterprise performance management
enterprisePerformance.initializeMemoryManagement();
enterprisePerformance.initializeEnterpriseMonitoring();

// Preload critical enterprise resources
enterprisePerformance.preloadCriticalResources();

// Preload critical images
preloadCriticalImages([
  '/brandmark-design-1024x0 (3).png',
  'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800'
]);

// Register service worker for PWA functionality
registerServiceWorker();

// Performance monitoring
reportWebVitals();

// React 18 concurrent features
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Performance cleanup on page unload
window.addEventListener('beforeunload', () => {
  // Clean up any performance observers
  if ('performance' in window && 'clearResourceTimings' in performance) {
    performance.clearResourceTimings();
  }
});

// Monitor and log first input delay
let firstInputProcessed = false;
['keydown', 'mousedown', 'pointerdown', 'touchstart'].forEach(type => {
  document.addEventListener(type, () => {
    if (!firstInputProcessed) {
      firstInputProcessed = true;
      console.log('First user interaction detected');
    }
  }, { once: true, passive: true });
});

// Development only: React DevTools performance profiler
if (import.meta.env.DEV) {
  console.log('🚀 Development mode active - Performance monitoring enabled');
}

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Test Supabase connection on startup
testSupabaseConnection();