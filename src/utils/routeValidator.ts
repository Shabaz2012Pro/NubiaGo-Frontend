/**
 * Utility for validating and fixing route issues
 */

// Types
export interface RouteInfo {
  path: string;
  exists: boolean;
  isProtected: boolean;
  component?: string;
  params?: Record<string, string>;
  issues?: string[];
}

// List of all defined routes in the application
export const definedRoutes = [
  { path: '', component: 'Home' },
  { path: 'home', component: 'Home' },
  { path: 'product', component: 'ProductDetailPage', params: ['id'] },
  { path: 'products', component: 'ProductsPage' },
  { path: 'categories/:category', component: 'CategoryPage' },
  { path: 'categories/:category/:subcategory', component: 'CategoryPage' },
  { path: 'search', component: 'SearchPage', params: ['q'] },
  { path: 'auth', component: 'AuthPage', params: ['action'] },
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
  { path: 'connectivity-analysis', component: 'ConnectivityAnalysisPage' },
  { path: 'auth-test', component: 'AuthTestPage' },
  { path: 'privacy-policy', component: 'PrivacyPolicyPage' },
  { path: 'terms-of-service', component: 'TermsOfServicePage' },
  { path: 'cookie-policy', component: 'CookiePolicyPage' }
];

// Function to check if a route exists
export const routeExists = (path: string): boolean => {
  if (!path || typeof path !== 'string') return false;
  
  // Remove leading # if present
  const normalizedPath = path.startsWith('#') ? path.substring(1) : path;
  
  // Extract base path and query parameters
  const [basePath, queryString] = normalizedPath.split('?');
  
  // Check if the route is defined
  return definedRoutes.some(route => {
    // For static routes, exact match
    if (!route.path.includes(':')) {
      return route.path === basePath;
    }
    
    // For dynamic routes, check pattern
    const routeParts = route.path.split('/');
    const pathParts = basePath.split('/');
    
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

// Function to check if a route is protected
export const isProtectedRoute = (path: string): boolean => {
  // Remove leading # if present
  const normalizedPath = path.startsWith('#') ? path.substring(1) : path;
  
  // Extract base path and query parameters
  const [basePath] = normalizedPath.split('?');
  
  // Find the route
  const route = definedRoutes.find(route => {
    // For static routes, exact match
    if (!route.path.includes(':')) {
      return route.path === basePath;
    }
    
    // For dynamic routes, check pattern
    const routeParts = route.path.split('/');
    const pathParts = basePath.split('/');
    
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

// Function to get route info
export const getRouteInfo = (path: string): RouteInfo => {
  // Remove leading # if present
  const normalizedPath = path.startsWith('#') ? path.substring(1) : path;
  
  // Extract base path and query parameters
  const [basePath, queryString] = normalizedPath.split('?');
  
  // Parse query parameters
  const params: Record<string, string> = {};
  if (queryString) {
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      if (key && value) {
        params[key] = decodeURIComponent(value);
      }
    });
  }
  
  // Find the route
  const route = definedRoutes.find(route => {
    // For static routes, exact match
    if (!route.path.includes(':')) {
      return route.path === basePath;
    }
    
    // For dynamic routes, check pattern
    const routeParts = route.path.split('/');
    const pathParts = basePath.split('/');
    
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
      issues: ['Route not found']
    };
  }
  
  // Check if required parameters are present
  const issues: string[] = [];
  if (route.params) {
    route.params.forEach(param => {
      if (!params[param]) {
        issues.push(`Missing required parameter: ${param}`);
      }
    });
  }
  
  return {
    path,
    exists: true,
    isProtected: route.protected || false,
    component: route.component,
    params,
    issues: issues.length > 0 ? issues : undefined
  };
};

// Function to get all links on a page
export const getAllPageRoutes = (): string[] => {
  const routes: string[] = [];
  const anchors = document.querySelectorAll('a');
  
  anchors.forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('#')) {
      routes.push(href);
    }
  });
  
  return [...new Set(routes)]; // Remove duplicates
};

// Function to validate all routes on a page
export const validateAllRoutes = (): { valid: RouteInfo[], invalid: RouteInfo[] } => {
  const routes = getAllPageRoutes();
  const valid: RouteInfo[] = [];
  const invalid: RouteInfo[] = [];
  
  routes.forEach(route => {
    const info = getRouteInfo(route);
    if (info.exists && !info.issues) {
      valid.push(info);
    } else {
      invalid.push(info);
    }
  });
  
  return { valid, invalid };
};

// Function to fix common route issues
export const fixRoute = (path: string): string => {
  // Remove leading # if present for processing
  const normalizedPath = path.startsWith('#') ? path.substring(1) : path;
  
  // Fix common issues
  let fixedPath = normalizedPath;
  
  // Fix double slashes
  fixedPath = fixedPath.replace(/\/+/g, '/');
  
  // Fix missing parameters
  const routeInfo = getRouteInfo(`#${fixedPath}`);
  if (routeInfo.issues && routeInfo.issues.some(issue => issue.includes('Missing required parameter'))) {
    // Find the matching route definition
    const route = definedRoutes.find(r => {
      const routeParts = r.path.split('/');
      const pathParts = fixedPath.split('/');
      
      if (routeParts.length !== pathParts.length) {
        return false;
      }
      
      return routeParts.every((part, index) => {
        if (part.startsWith(':')) {
          return true;
        }
        return part === pathParts[index];
      });
    });
    
    if (route && route.params) {
      // Extract existing query params
      const [basePath, queryString] = fixedPath.split('?');
      const params: Record<string, string> = {};
      
      if (queryString) {
        queryString.split('&').forEach(param => {
          const [key, value] = param.split('=');
          if (key && value) {
            params[key] = value;
          }
        });
      }
      
      // Add missing required params with placeholder values
      route.params.forEach(param => {
        if (!params[param]) {
          params[param] = 'placeholder';
        }
      });
      
      // Rebuild query string
      const newQueryString = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
      
      fixedPath = `${basePath}?${newQueryString}`;
    }
  }
  
  // Add back the # if it was present
  return path.startsWith('#') ? `#${fixedPath}` : fixedPath;
};

export default {
  routeExists,
  isProtectedRoute,
  getRouteInfo,
  getAllPageRoutes,
  validateAllRoutes,
  fixRoute
};