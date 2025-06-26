import { useEffect, useState } from 'react';

/**
 * Utility for checking and validating links in the application
 */

// Types for link checking
export interface LinkStatus {
  url: string;
  isValid: boolean;
  error?: string;
  type: 'internal' | 'external' | 'anchor';
}

// Check if a link is internal or external
export const isExternalLink = (url: string): boolean => {
  if (!url) return false;
  
  // Handle anchor links
  if (url.startsWith('#')) return false;
  
  // Handle relative paths
  if (!url.startsWith('http://') && !url.startsWith('https://')) return false;
  
  // Check if the link is to the same domain
  try {
    const urlObj = new URL(url);
    return urlObj.hostname !== window.location.hostname;
  } catch (e) {
    return false;
  }
};

// Check if a link is an anchor link
export const isAnchorLink = (url: string): boolean => {
  return url && url.startsWith('#');
};

// Get link type
export const getLinkType = (url: string): 'internal' | 'external' | 'anchor' => {
  if (isAnchorLink(url)) return 'anchor';
  if (isExternalLink(url)) return 'external';
  return 'internal';
};

// Validate an internal link
export const validateInternalLink = (url: string): Promise<LinkStatus> => {
  return new Promise((resolve) => {
    // For hash-based routing, we can't really validate if the route exists
    // We can only check if it's a valid format
    const isValid = url.startsWith('#') || url.startsWith('/');
    
    resolve({
      url,
      isValid,
      type: 'internal',
      error: isValid ? undefined : 'Invalid internal link format'
    });
  });
};

// Validate an external link
export const validateExternalLink = (url: string): Promise<LinkStatus> => {
  return new Promise((resolve) => {
    // We can't directly check external links due to CORS
    // But we can validate the URL format
    try {
      new URL(url);
      resolve({
        url,
        isValid: true,
        type: 'external'
      });
    } catch (e) {
      resolve({
        url,
        isValid: false,
        type: 'external',
        error: 'Invalid URL format'
      });
    }
  });
};

// Validate an anchor link
export const validateAnchorLink = (url: string): Promise<LinkStatus> => {
  return new Promise((resolve) => {
    // Check if the anchor exists on the page
    const anchorId = url.substring(1); // Remove the # character
    const element = document.getElementById(anchorId);
    
    resolve({
      url,
      isValid: !!element,
      type: 'anchor',
      error: element ? undefined : `Anchor "${anchorId}" not found on page`
    });
  });
};

// Validate a single link
export const validateLink = async (url: string): Promise<LinkStatus> => {
  const type = getLinkType(url);
  
  switch (type) {
    case 'internal':
      return validateInternalLink(url);
    case 'external':
      return validateExternalLink(url);
    case 'anchor':
      return validateAnchorLink(url);
    default:
      return {
        url,
        isValid: false,
        type: 'internal',
        error: 'Unknown link type'
      };
  }
};

// Scan a page for all links
export const scanPageLinks = (): string[] => {
  const links: string[] = [];
  const anchorElements = document.querySelectorAll('a');
  
  anchorElements.forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (href) {
      links.push(href);
    }
  });
  
  // Remove duplicates
  return [...new Set(links)];
};

// Validate all links on a page
export const validatePageLinks = async (): Promise<LinkStatus[]> => {
  const links = scanPageLinks();
  const results: LinkStatus[] = [];
  
  for (const link of links) {
    const status = await validateLink(link);
    results.push(status);
  }
  
  return results;
};

// Hook for checking links on a page
export const useLinkChecker = () => {
  const [linkStatuses, setLinkStatuses] = useState<LinkStatus[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [invalidLinks, setInvalidLinks] = useState<LinkStatus[]>([]);
  
  const checkLinks = async () => {
    setIsChecking(true);
    const results = await validatePageLinks();
    setLinkStatuses(results);
    setInvalidLinks(results.filter(link => !link.isValid));
    setIsChecking(false);
    return results;
  };
  
  return {
    linkStatuses,
    invalidLinks,
    isChecking,
    checkLinks
  };
};

// Hook for checking a specific set of links
export const useSpecificLinkChecker = (links: string[]) => {
  const [linkStatuses, setLinkStatuses] = useState<LinkStatus[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [invalidLinks, setInvalidLinks] = useState<LinkStatus[]>([]);
  
  const checkLinks = async () => {
    setIsChecking(true);
    const results: LinkStatus[] = [];
    
    for (const link of links) {
      const status = await validateLink(link);
      results.push(status);
    }
    
    setLinkStatuses(results);
    setInvalidLinks(results.filter(link => !link.isValid));
    setIsChecking(false);
    return results;
  };
  
  useEffect(() => {
    if (links.length > 0) {
      checkLinks();
    }
  }, [links]);
  
  return {
    linkStatuses,
    invalidLinks,
    isChecking,
    checkLinks
  };
};

export default {
  validateLink,
  validatePageLinks,
  scanPageLinks,
  useLinkChecker,
  useSpecificLinkChecker
};