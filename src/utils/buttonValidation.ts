
export interface ButtonValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ButtonElement {
  element: HTMLButtonElement | HTMLAnchorElement;
  type: 'button' | 'link';
  id?: string;
  text: string;
}

/**
 * Validates button accessibility and functionality
 */
export const validateButton = (button: HTMLButtonElement | HTMLAnchorElement): ButtonValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if button has accessible text
  const hasText = button.textContent && button.textContent.trim() !== '';
  const hasAriaLabel = button.hasAttribute('aria-label');
  const hasAriaLabelledBy = button.hasAttribute('aria-labelledby');
  const hasTitle = button.hasAttribute('title');

  if (!hasText && !hasAriaLabel && !hasAriaLabelledBy && !hasTitle) {
    errors.push('Button lacks accessible text content');
  }

  // Check if button has click handler (for non-submit buttons)
  if (button instanceof HTMLButtonElement && button.type !== 'submit') {
    const hasOnClick = button.onclick !== null;
    const hasEventListener = button.hasAttribute('onclick');
    
    if (!hasOnClick && !hasEventListener) {
      warnings.push('Button may lack click handler');
    }
  }

  // Check if link button has href or click handler
  if (button instanceof HTMLAnchorElement) {
    const hasHref = button.hasAttribute('href');
    const hasOnClick = button.onclick !== null;
    const hasEventListener = button.hasAttribute('onclick');
    
    if (!hasHref && !hasOnClick && !hasEventListener) {
      errors.push('Link button lacks href or click handler');
    }
  }

  // Check for proper ARIA attributes
  if (button.hasAttribute('aria-disabled') && button.hasAttribute('disabled')) {
    warnings.push('Both aria-disabled and disabled attributes present');
  }

  // Check button size (minimum 44x44px for touch targets)
  const rect = button.getBoundingClientRect();
  if (rect.width < 44 || rect.height < 44) {
    warnings.push('Button may be too small for touch interaction (minimum 44x44px recommended)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Validates all buttons on the current page
 */
export const validateAllButtons = (): { buttonCount: number; validButtons: number; results: Array<ButtonValidationResult & { element: string }> } => {
  const buttons = document.querySelectorAll('button, a[role="button"]');
  const results: Array<ButtonValidationResult & { element: string }> = [];
  let validButtons = 0;

  buttons.forEach((button, index) => {
    const validation = validateButton(button as HTMLButtonElement | HTMLAnchorElement);
    const elementInfo = `${button.tagName.toLowerCase()}${button.id ? `#${button.id}` : `[${index}]`}`;
    
    results.push({
      ...validation,
      element: elementInfo
    });

    if (validation.isValid) {
      validButtons++;
    }
  });

  return {
    buttonCount: buttons.length,
    validButtons,
    results
  };
};

/**
 * React hook for button validation
 */
export const useButtonValidation = () => {
  const [validationResults, setValidationResults] = useState<ReturnType<typeof validateAllButtons> | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const validateButtons = () => {
    setIsValidating(true);
    // Use setTimeout to avoid blocking the UI
    setTimeout(() => {
      const results = validateAllButtons();
      setValidationResults(results);
      setIsValidating(false);
    }, 100);
  };

  return {
    validationResults,
    isValidating,
    validateButtons
  };
};
