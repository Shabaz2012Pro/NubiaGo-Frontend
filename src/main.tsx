import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Performance utilities
import { 
  reportWebVitals, 
  registerServiceWorker, 
  injectResourceHints
} from './utils/performance';

// Error tracking
import { initErrorTracking } from './utils/errorTracking';

// Inject resource hints early
injectResourceHints();

// Initialize error tracking
initErrorTracking();

// Preload critical resources
const preloadCriticalResources = () => {
  const criticalResources = [
    '/brandmark-design-1024x0 (3) copy.png'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

preloadCriticalResources();

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

// Performance monitoring
reportWebVitals();

// Register service worker for PWA functionality
registerServiceWorker();