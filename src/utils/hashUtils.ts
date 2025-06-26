
/**
 * Utility functions for handling hash-based routing and URL parameters
 */

import { smartIdResolver } from './idResolver';

export const getHashParams = (): URLSearchParams => {
  const hash = window.location.hash.slice(1); // Remove the #
  const queryString = hash.includes('?') ? hash.split('?')[1] : '';
  return new URLSearchParams(queryString);
};

export const getProductIdFromHash = (): string | null => {
  try {
    const params = getHashParams();
    const productId = params.get('id');
    
    if (!productId) {
      console.warn('No product ID found in hash parameters');
      return null;
    }
    
    // Validate and clean the product ID
    const cleanId = productId.trim();
    
    if (cleanId === '') {
      console.warn('Empty product ID found in hash parameters');
      return null;
    }
    
    // Use smart ID resolver to ensure we return a valid ID
    if (smartIdResolver.canResolve(cleanId)) {
      console.log('Extracted and validated product ID from hash:', cleanId);
      return cleanId;
    } else {
      console.warn('Product ID from hash cannot be resolved:', cleanId);
      return cleanId; // Still return it, let the API handle the resolution
    }
    
  } catch (error) {
    console.error('Error extracting product ID from hash:', error);
    return null;
  }
};

export const setProductHash = (productId: string): void => {
  // Use the most user-friendly ID format for the URL
  const resolution = smartIdResolver.resolve(productId);
  const displayId = smartIdResolver.getDisplayId(resolution.uuid);
  window.location.hash = `product?id=${encodeURIComponent(displayId)}`;
};

export const navigateToProduct = (productId: string): void => {
  setProductHash(productId);
};

export const isProductRoute = (): boolean => {
  const hash = window.location.hash.slice(1);
  return hash.startsWith('product?id=');
};

export const isAuthRoute = (): boolean => {
  const hash = window.location.hash.slice(1);
  return hash.includes('auth');
};
