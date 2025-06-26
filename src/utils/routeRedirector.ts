// Types
export interface RedirectRule {
  from: string | RegExp;
  to: string;
  exact?: boolean;
  permanent?: boolean;
}

// Default redirect rules
const defaultRedirects: RedirectRule[] = [
  // Legacy routes
  { from: 'home.html', to: '/home', exact: true },
  { from: 'products.html', to: '/products', exact: true },
  { from: 'about.html', to: '/about', exact: true },
  { from: 'contact.html', to: '/contact', exact: true },
  
  // Common misspellings
  { from: 'categor', to: '/categories', exact: false },
  { from: 'product-detail', to: '/product', exact: false },
  { from: 'checkout', to: '/cart', exact: false },
  
  // Shortened URLs
  { from: 'p', to: '/product', exact: true },
  { from: 'c', to: '/categories', exact: true },
  { from: 's', to: '/search', exact: true },
  
  // Redirects for renamed routes
  { from: 'account', to: '/dashboard', exact: true },
  { from: 'profile', to: '/dashboard', exact: true },
  { from: 'cart', to: '/cart', exact: true },
  
  // Policy pages redirects
  { from: 'privacy', to: '/privacy-policy', exact: true },
  { from: 'terms', to: '/terms-of-service', exact: true },
  { from: 'cookies', to: '/cookie-policy', exact: true },
  
  // Catch-all for missing routes
  { from: /.*/, to: '/404', exact: false }
];

// Function to check if a route should be redirected
export const shouldRedirect = (path: string, rules: RedirectRule[] = defaultRedirects): RedirectRule | null => {
  // Check against redirect rules
  for (const rule of rules) {
    if (typeof rule.from === 'string') {
      if (rule.exact) {
        if (path === rule.from) {
          return rule;
        }
      } else {
        if (path.includes(rule.from)) {
          return rule;
        }
      }
    } else if (rule.from instanceof RegExp) {
      if (rule.from.test(path)) {
        return rule;
      }
    }
  }
  
  // No redirect rule matched
  return null;
};

// Function to handle redirects
export const handleRedirect = (path: string, rules: RedirectRule[] = defaultRedirects): boolean => {
  const rule = shouldRedirect(path, rules);
  
  if (rule) {
    // Perform the redirect
    window.location.href = rule.to;
    return true;
  }
  
  return false;
};

// Function to initialize route handling
export const initRouteHandler = (rules: RedirectRule[] = defaultRedirects): void => {
  // Handle initial route
  const initialPath = window.location.pathname;
  handleRedirect(initialPath, rules);
  
  // Listen for navigation events
  window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    handleRedirect(path, rules);
  });
};

export default {
  shouldRedirect,
  handleRedirect,
  initRouteHandler,
  defaultRedirects
};