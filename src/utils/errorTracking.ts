// Error tracking and monitoring utilities
import { api } from '../api/apiClient';

interface ErrorEvent {
  id: string;
  timestamp: Date;
  level: 'error' | 'warning' | 'info';
  message: string;
  stack?: string;
  userAgent?: string;
  userId?: string;
  url: string;
  metadata?: Record<string, any>;
}

interface ErrorReport {
  message: string;
  stack?: string;
  userAgent: string;
  timestamp: string;
  url: string;
  userId?: string;
  buildVersion?: string;
}

class ErrorTracker {
  private errors: ErrorReport[] = [];
  private maxErrors = 100;
  private originalConsoleError: typeof console.error;

  constructor() {
    this.originalConsoleError = console.error;
    this.setupGlobalErrorHandlers();
  }

  private setupGlobalErrorHandlers() {
    if (typeof window === 'undefined') return;
    
    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      this.trackError({
        message: event.message,
        stack: event.error?.stack,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        url: window.location.href,
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        url: window.location.href,
      });
    });

    // Handle React errors (requires error boundary)
    console.error = (...args) => {
      // Prevent infinite recursion by checking if this is already an error tracking call
      if (args[0]?.includes?.('Error Tracked') || args[0]?.includes?.('trackError')) {
        this.originalConsoleError.apply(console, args);
        return;
      }

      if (args[0]?.includes?.('React')) {
        this.trackError({
          message: `React Error: ${args.join(' ')}`,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          url: window.location.href,
        });
      }
      this.originalConsoleError.apply(console, args);
    };
  }

  logError(error: Error | string, metadata?: Record<string, any>): void {
    const errorMessage = error instanceof Error ? error.message : error;
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    const errorEvent: ErrorEvent = {
      id: this.generateId(),
      timestamp: new Date(),
      level: 'error',
      message: errorMessage,
      stack: errorStack,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : '',
      metadata
    };

    this.addError(errorEvent);
  }

  trackError(error: Partial<ErrorReport>) {
    if (typeof navigator === 'undefined' || typeof window === 'undefined') return;
    
    const fullError: ErrorReport = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      buildVersion: import.meta.env.VITE_BUILD_VERSION,
      ...error,
    };

    this.errors.push(fullError);

    // Keep only the most recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Log error in development using original console.error to prevent recursion
    if (import.meta.env.DEV) {
      this.originalConsoleError('🚨 Error Tracked');
      this.originalConsoleError(fullError.message);
      if (fullError.stack) {
        this.originalConsoleError(fullError.stack);
      }
    }
  }

  private addError(errorEvent: ErrorEvent): void {
    if (typeof navigator === 'undefined') return;
    
    this.errors.unshift({
      message: errorEvent.message,
      stack: errorEvent.stack,
      userAgent: errorEvent.userAgent || navigator.userAgent,
      timestamp: errorEvent.timestamp.toISOString(),
      url: errorEvent.url,
      userId: errorEvent.userId,
    });
    
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors);
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  getErrors(): ErrorReport[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }
}

// Global error tracker instance
const errorTracker = new ErrorTracker();

// Export functions for use throughout the app
export const initErrorTracking = () => {
  return errorTracker;
};

export const trackError = (message: string, context?: any) => {
  errorTracker.logError(message, context);
};

export const getErrorHistory = () => {
  return errorTracker.getErrors();
};

export const clearErrorHistory = () => {
  errorTracker.clearErrors();
};

export { errorTracker };
export default errorTracker;