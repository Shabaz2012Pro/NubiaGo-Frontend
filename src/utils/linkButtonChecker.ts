
import { useState, useEffect } from 'react';

export interface LinkCheckResult {
  url: string;
  text: string;
  isWorking: boolean;
  error?: string;
  type: 'internal' | 'external' | 'anchor' | 'javascript';
}

export interface ButtonCheckResult {
  id: string;
  text: string;
  isWorking: boolean;
  hasClickHandler: boolean;
  hasHref: boolean;
  error?: string;
  type: 'button' | 'submit' | 'reset' | 'link';
}

// Check if a link is working
export const checkLink = async (url: string, text: string): Promise<LinkCheckResult> => {
  const result: LinkCheckResult = {
    url,
    text,
    isWorking: false,
    type: 'internal'
  };

  // Handle empty or invalid URLs
  if (!url || url.trim() === '') {
    result.error = 'Empty URL';
    return result;
  }

  // Handle JavaScript links
  if (url.startsWith('javascript:')) {
    result.type = 'javascript';
    result.isWorking = true; // Assume JavaScript links work
    return result;
  }

  // Handle anchor links
  if (url.startsWith('#')) {
    result.type = 'anchor';
    const targetId = url.substring(1);
    if (targetId) {
      const element = document.getElementById(targetId);
      result.isWorking = !!element;
      if (!element) {
        result.error = `Anchor target "${targetId}" not found`;
      }
    } else {
      result.isWorking = true; // Empty anchor goes to top
    }
    return result;
  }

  // Handle external links
  if (url.startsWith('http://') || url.startsWith('https://')) {
    result.type = 'external';
    try {
      // For external links, we can only validate URL format due to CORS
      new URL(url);
      result.isWorking = true;
    } catch (e) {
      result.error = 'Invalid URL format';
    }
    return result;
  }

  // Handle internal links (relative paths)
  result.type = 'internal';
  // For hash-based routing, check if the route exists
  if (url.startsWith('/') || !url.includes('://')) {
    // Simple validation for internal routes
    result.isWorking = true; // Assume internal routes work for now
  }

  return result;
};

// Check if a button is working
export const checkButton = (element: HTMLButtonElement | HTMLAnchorElement): ButtonCheckResult => {
  const result: ButtonCheckResult = {
    id: element.id || `${element.tagName.toLowerCase()}-${Math.random().toString(36).substr(2, 9)}`,
    text: element.textContent?.trim() || '',
    isWorking: false,
    hasClickHandler: false,
    hasHref: false,
    type: 'button'
  };

  // Determine button type
  if (element instanceof HTMLButtonElement) {
    result.type = element.type as 'button' | 'submit' | 'reset';
  } else if (element instanceof HTMLAnchorElement) {
    result.type = 'link';
    result.hasHref = !!element.href;
  }

  // Check for click handlers
  const hasOnClick = element.onclick !== null;
  const hasEventListeners = element.hasAttribute('onclick');
  result.hasClickHandler = hasOnClick || hasEventListeners;

  // Check if button is disabled
  const isDisabled = element.hasAttribute('disabled') || 
                    element.getAttribute('aria-disabled') === 'true';

  if (isDisabled) {
    result.isWorking = false;
    result.error = 'Button is disabled';
    return result;
  }

  // Determine if button is working
  if (element instanceof HTMLButtonElement) {
    if (element.type === 'submit') {
      // Submit buttons are considered working if they're in a form
      const form = element.closest('form');
      result.isWorking = !!form;
      if (!form) {
        result.error = 'Submit button not in a form';
      }
    } else {
      // Regular buttons need click handlers
      result.isWorking = result.hasClickHandler;
      if (!result.hasClickHandler) {
        result.error = 'Button has no click handler';
      }
    }
  } else if (element instanceof HTMLAnchorElement) {
    // Link buttons need href or click handlers
    result.isWorking = result.hasHref || result.hasClickHandler;
    if (!result.isWorking) {
      result.error = 'Link has no href or click handler';
    }
  }

  return result;
};

// Scan page for all links and buttons
export const scanPageForIssues = async (): Promise<{
  links: LinkCheckResult[];
  buttons: ButtonCheckResult[];
  summary: {
    totalLinks: number;
    brokenLinks: number;
    totalButtons: number;
    brokenButtons: number;
  };
}> => {
  const links: LinkCheckResult[] = [];
  const buttons: ButtonCheckResult[] = [];

  // Check all links
  const linkElements = document.querySelectorAll('a[href]');
  for (const link of Array.from(linkElements)) {
    const href = link.getAttribute('href') || '';
    const text = link.textContent?.trim() || '';
    const result = await checkLink(href, text);
    links.push(result);
  }

  // Check all buttons
  const buttonElements = document.querySelectorAll('button, a[role="button"], input[type="submit"], input[type="button"]');
  for (const button of Array.from(buttonElements)) {
    if (button instanceof HTMLButtonElement || button instanceof HTMLAnchorElement) {
      const result = checkButton(button);
      buttons.push(result);
    }
  }

  const summary = {
    totalLinks: links.length,
    brokenLinks: links.filter(l => !l.isWorking).length,
    totalButtons: buttons.length,
    brokenButtons: buttons.filter(b => !b.isWorking).length
  };

  return { links, buttons, summary };
};

// React hook for checking links and buttons
export const useLinkButtonChecker = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<{
    links: LinkCheckResult[];
    buttons: ButtonCheckResult[];
    summary: {
      totalLinks: number;
      brokenLinks: number;
      totalButtons: number;
      brokenButtons: number;
    };
  } | null>(null);

  const checkPage = async () => {
    setIsChecking(true);
    try {
      const scanResults = await scanPageForIssues();
      setResults(scanResults);
    } catch (error) {
      console.error('Error checking page:', error);
    } finally {
      setIsChecking(false);
    }
  };

  return {
    isChecking,
    results,
    checkPage,
    brokenLinks: results?.links.filter(l => !l.isWorking) || [],
    brokenButtons: results?.buttons.filter(b => !b.isWorking) || []
  };
};

export default {
  checkLink,
  checkButton,
  scanPageForIssues,
  useLinkButtonChecker
};
