import { useEffect, useState } from 'react';

/**
 * Utility for checking and validating button functionality in the application
 */

// Types for button checking
export interface ButtonStatus {
  id: string;
  text: string;
  type: 'submit' | 'button' | 'reset' | 'link';
  isDisabled: boolean;
  hasClickHandler: boolean;
  hasAriaLabel: boolean;
  isAccessible: boolean;
  error?: string;
}

// Get button type from element
export const getButtonType = (button: HTMLButtonElement | HTMLAnchorElement): 'submit' | 'button' | 'reset' | 'link' => {
  if (button instanceof HTMLButtonElement) {
    return button.type as 'submit' | 'button' | 'reset';
  }
  return 'link';
};

// Check if a button has a click handler
export const hasClickHandler = (button: HTMLButtonElement | HTMLAnchorElement): boolean => {
  // Check for onclick attribute
  if (button.hasAttribute('onclick')) {
    return true;
  }

  // Check for event listeners using a hack (not 100% reliable)
  // This is a limitation of the browser API - we can't directly check for event listeners
  const clickHandlerProp = button.onclick;
  return clickHandlerProp !== null && clickHandlerProp !== undefined;
};

// Check if a button is accessible
export const isButtonAccessible = (button: HTMLButtonElement | HTMLAnchorElement): boolean => {
  // Check for aria-label or aria-labelledby
  if (button.hasAttribute('aria-label') || button.hasAttribute('aria-labelledby')) {
    return true;
  }

  // Check for inner text
  if (button.textContent && button.textContent.trim() !== '') {
    return true;
  }

  // Check for title attribute
  if (button.hasAttribute('title')) {
    return true;
  }

  // Check for aria-hidden="true" (decorative)
  if (button.getAttribute('aria-hidden') === 'true') {
    return true;
  }

  return false;
};



// Scan a page for all buttons
export const scanPageButtons = (): ButtonStatus[] => {
  const buttons: ButtonStatus[] = [];

  // Get all button elements
  const buttonElements = document.querySelectorAll('button');
  buttonElements.forEach((button, index) => {
    const id = button.id || `button-${index}`;
    const text = button.textContent?.trim() || '';
    const type = getButtonType(button);
    const isDisabled = button.hasAttribute('disabled');
    const clickHandler = hasClickHandler(button);
    const ariaLabel = button.hasAttribute('aria-label');
    const accessible = isButtonAccessible(button);

    buttons.push({
      id,
      text,
      type,
      isDisabled,
      hasClickHandler: clickHandler,
      hasAriaLabel: ariaLabel,
      isAccessible: accessible,
      error: !clickHandler && !isDisabled ? 'Button has no click handler' : 
             !accessible ? 'Button is not accessible' : undefined
    });
  });

  // Get all anchor elements that look like buttons
  const anchorButtons = document.querySelectorAll('a[role="button"], a.btn, a.button');
  anchorButtons.forEach((anchor, index) => {
    const id = anchor.id || `anchor-button-${index}`;
    const text = anchor.textContent?.trim() || '';
    const isDisabled = anchor.getAttribute('aria-disabled') === 'true';
    const clickHandler = hasClickHandler(anchor);
    const ariaLabel = anchor.hasAttribute('aria-label');
    const accessible = isButtonAccessible(anchor);

    buttons.push({
      id,
      text,
      type: 'link',
      isDisabled,
      hasClickHandler: clickHandler,
      hasAriaLabel: ariaLabel,
      isAccessible: accessible,
      error: !anchor.hasAttribute('href') && !clickHandler ? 'Button has no href or click handler' : 
             !accessible ? 'Button is not accessible' : undefined
    });
  });

  return buttons;
};

// Check form submission buttons
export const checkFormSubmitButtons = (): ButtonStatus[] => {
  const forms = document.querySelectorAll('form');
  const submitButtons: ButtonStatus[] = [];

  forms.forEach((form, formIndex) => {
    let hasSubmitButton = false;

    // Check for submit buttons within the form
    const buttons = form.querySelectorAll('button');
    buttons.forEach((button, buttonIndex) => {
      if (button.type === 'submit') {
        hasSubmitButton = true;
        const id = button.id || `form-${formIndex}-submit-${buttonIndex}`;
        const text = button.textContent?.trim() || '';
        const isDisabled = button.hasAttribute('disabled');
        const ariaLabel = button.hasAttribute('aria-label');
        const accessible = isButtonAccessible(button);

        submitButtons.push({
          id,
          text,
          type: 'submit',
          isDisabled,
          hasClickHandler: true, // Submit buttons have implicit handlers
          hasAriaLabel: ariaLabel,
          isAccessible: accessible,
          error: !accessible ? 'Submit button is not accessible' : undefined
        });
      }
    });

    // Check for input[type="submit"]
    const submitInputs = form.querySelectorAll('input[type="submit"]');
    submitInputs.forEach((input, inputIndex) => {
      hasSubmitButton = true;
      const id = input.id || `form-${formIndex}-submit-input-${inputIndex}`;
      const text = input.value || '';
      const isDisabled = input.hasAttribute('disabled');
      const ariaLabel = input.hasAttribute('aria-label');
      const accessible = input.hasAttribute('aria-label') || (input.value && input.value.trim() !== '');

      submitButtons.push({
        id,
        text,
        type: 'submit',
        isDisabled,
        hasClickHandler: true, // Submit inputs have implicit handlers
        hasAriaLabel: ariaLabel,
        isAccessible: accessible,
        error: !accessible ? 'Submit input is not accessible' : undefined
      });
    });

    // If no submit button was found, add an error
    if (!hasSubmitButton) {
      submitButtons.push({
        id: `form-${formIndex}`,
        text: 'No submit button',
        type: 'submit',
        isDisabled: false,
        hasClickHandler: false,
        hasAriaLabel: false,
        isAccessible: false,
        error: 'Form has no submit button'
      });
    }
  });

  return submitButtons;
};

// Hook for checking buttons on a page
export const useButtonChecker = () => {
  const [buttonStatuses, setButtonStatuses] = useState<ButtonStatus[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [problematicButtons, setProblematicButtons] = useState<ButtonStatus[]>([]);

  const checkButtons = async () => {
    setIsChecking(true);
    const results = scanPageButtons();
    setButtonStatuses(results);
    setProblematicButtons(results.filter(button => button.error !== undefined));
    setIsChecking(false);
    return results;
  };

  return {
    buttonStatuses,
    problematicButtons,
    isChecking,
    checkButtons
  };
};

// Hook for checking form submission buttons
export const useFormSubmitChecker = () => {
  const [submitButtons, setSubmitButtons] = useState<ButtonStatus[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [problematicForms, setProblematicForms] = useState<ButtonStatus[]>([]);

  const checkForms = async () => {
    setIsChecking(true);
    const results = checkFormSubmitButtons();
    setSubmitButtons(results);
    setProblematicForms(results.filter(button => button.error !== undefined));
    setIsChecking(false);
    return results;
  };

  return {
    submitButtons,
    problematicForms,
    isChecking,
    checkForms
  };
};

export default {
  scanPageButtons,
  checkFormSubmitButtons,
  useButtonChecker,
  useFormSubmitChecker
};