import { useEffect, useState } from 'react';

/**
 * Utility for checking and validating routes in the application
 */

// Types for route checking
export interface RouteStatus {
  path: string;
  exists: boolean;
  isProtected: boolean;
  component?: string;
  error?: string;
}

// List of all defined routes in the application
// This should be updated whenever routes are added or removed
const definedRoutes = [
  { path: '', component: 'Home' },
  { path: 'home', component: 'Home' },
  { path: 'product', component: 'ProductDetailPage' },
  { path: 'products', component: 'ProductsPage' },
  { path: 'categories/:category', component: 'CategoryPage' },
  { path: 'categories/:category/:subcategory', component: 'CategoryPage' },
  { path: 'search', component: 'SearchPage' },
  { path: 'auth', component: 'AuthPage' },
  { path: 'dashboard', component: 'UserDashboardPage', protected: true },
  { path: 'admin', component: 'AdminDashboardPage', protected: true },
  { path: 'contact', component: 'ContactPage' },
  { path: 'about', component: 'AboutPage' },
  { path: 'careers', component: 'CareersPage' },
  { path: 'suppliers', component: 'SuppliersPage' },
  { path: 'help', component: 'HelpPage' },
  { path: 'shipping-info', component: 'ShippingInfoPage' },
  { path: 'returns-refunds', component: 'ReturnsRefundsPage' },
  { path: 'size-guide', component: 'SizeGuidePage' },
  { path: 'track-order', component: 'TrackOrderPage' },
  { path: 'faq', component: 'FAQPage' },
  { path: 'sustainability', component: 'SustainabilityPage' },
  { path: 'affiliate', component: 'AffiliateProgram' },
  { path: 'investors', component: 'InvestorRelations' },
  { path: 'press-media', component: 'PressMediaPage' },
  { path: 'become-supplier', component: 'BecomeSupplierPage' },
  { path: 'wishlist', component: 'ComingSoonPage', protected: true },
  { path: 'orders', component: 'ComingSoonPage', protected: true },
  { path: 'profile', component: 'ComingSoonPage', protected: true },
  { path: 'settings', component: 'ComingSoonPage', protected: true },
  { path: 'payment', component: 'ComingSoonPage', protected: true },
  { path: 'shipping', component: 'ComingSoonPage', protected: true },
  { path: 'returns', component: 'ComingSoonPage', protected: true },
  { path: 'reviews', component: 'ComingSoonPage', protected: true },
  { path: 'blog', component: 'ComingSoonPage' },
  { path: 'news', component: 'ComingSoonPage' },
  { path: 'press', component: 'ComingSoonPage' },
  { path: 'partnerships', component: 'ComingSoonPage' },
  { path: 'api', component: 'ComingSoonPage' },
  { path: 'developers', component: 'ComingSoonPage' },
  { path: 'enhancements', component: 'EnhancementsDemo' },
  { path: 'forms', component: 'FormDemoPage' },
  { path: 'recommendations', component: 'RecommendationsDemo' },
  { path: 'notifications', component: 'NotificationPage' },
  { path: 'performance', component: 'PerformanceDemo' },
  { path: 'connectivity-analysis', component: 'ConnectivityAnalysisPage' }
];

// Check if a route exists
export const routeExists = (path: string): boolean => {
  if (!path || typeof path !== 'string') return false;
  
  // Remove leading # if present
  const normalizedPath = path.startsWith('#') ? path.substring(1) : path;
  
  // Check if the route is defined
  return definedRoutes.some(route => {
    // For static routes, exact match
    if (!route.path.includes(':')) {
      return route.path === normalizedPath;
    }
    
    // For dynamic routes, check pattern
    const routeParts = route.path.split('/');
    const pathParts = normalizedPath.split('/');
    
    if (routeParts.length !== pathParts.length) {
      return false;
    }
    
    return routeParts.every((part, index) => {
      if (part.startsWith(':')) {
        // This is a parameter, any value is valid
        return true;
      }
      return part === pathParts[index];
    });
  });
};

// Check if a route is protected
export const isProtectedRoute = (path: string): boolean => {
  // Remove leading # if present
  const normalizedPath = path.startsWith('#') ? path.substring(1) : path;
  
  // Find the route
  const route = definedRoutes.find(route => {
    // For static routes, exact match
    if (!route.path.includes(':')) {
      return route.path === normalizedPath;
    }
    
    // For dynamic routes, check pattern
    const routeParts = route.path.split('/');
    const pathParts = normalizedPath.split('/');
    
    if (routeParts.length !== pathParts.length) {
      return false;
    }
    
    return routeParts.every((part, index) => {
      if (part.startsWith(':')) {
        // This is a parameter, any value is valid
        return true;
      }
      return part === pathParts[index];
    });
  });
  
  return route?.protected || false;
};

// Get route status
export const getRouteStatus = (path: string): RouteStatus => {
  // Remove leading # if present
  const normalizedPath = path.startsWith('#') ? path.substring(1) : path;
  
  // Find the route
  const route = definedRoutes.find(route => {
    // For static routes, exact match
    if (!route.path.includes(':')) {
      return route.path === normalizedPath;
    }
    
    // For dynamic routes, check pattern
    const routeParts = route.path.split('/');
    const pathParts = normalizedPath.split('/');
    
    if (routeParts.length !== pathParts.length) {
      return false;
    }
    
    return routeParts.every((part, index) => {
      if (part.startsWith(':')) {
        // This is a parameter, any value is valid
        return true;
      }
      return part === pathParts[index];
    });
  });
  
  if (!route) {
    return {
      path,
      exists: false,
      isProtected: false,
      error: 'Route not found'
    };
  }
  
  return {
    path,
    exists: true,
    isProtected: route.protected || false,
    component: route.component
  };
};

// Validate all links on a page to check if they point to valid routes
export const validatePageRoutes = (): Promise<RouteStatus[]> => {
  return new Promise((resolve) => {
    const links: string[] = [];
    const anchorElements = document.querySelectorAll('a');
    
    anchorElements.forEach((anchor) => {
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        links.push(href);
      }
    });
    
    // Remove duplicates
    const uniqueLinks = [...new Set(links)];
    
    // Check each link
    const results: RouteStatus[] = uniqueLinks.map(link => getRouteStatus(link));
    
    resolve(results);
  });
};

// Hook for checking routes on a page
export const useRouteChecker = () => {
  const [routeStatuses, setRouteStatuses] = useState<RouteStatus[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [invalidRoutes, setInvalidRoutes] = useState<RouteStatus[]>([]);
  
  const checkRoutes = async () => {
    setIsChecking(true);
    const results = await validatePageRoutes();
    setRouteStatuses(results);
    setInvalidRoutes(results.filter(route => !route.exists));
    setIsChecking(false);
    return results;
  };
  
  return {
    routeStatuses,
    invalidRoutes,
    isChecking,
    checkRoutes
  };
};

// Hook for checking a specific set of routes
export const useSpecificRouteChecker = (paths: string[]) => {
  const [routeStatuses, setRouteStatuses] = useState<RouteStatus[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [invalidRoutes, setInvalidRoutes] = useState<RouteStatus[]>([]);
  
  const checkRoutes = async () => {
    setIsChecking(true);
    const results = paths.map(path => getRouteStatus(path));
    setRouteStatuses(results);
    setInvalidRoutes(results.filter(route => !route.exists));
    setIsChecking(false);
    return results;
  };
  
  useEffect(() => {
    if (paths.length > 0) {
      checkRoutes();
    }
  }, [paths]);
  
  return {
    routeStatuses,
    invalidRoutes,
    isChecking,
    checkRoutes
  };
};

export default {
  routeExists,
  isProtectedRoute,
  getRouteStatus,
  validatePageRoutes,
  useRouteChecker,
  useSpecificRouteChecker
};