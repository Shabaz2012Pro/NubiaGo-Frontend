// Error tracking and monitoring utilities

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

  logError(error: Error, metadata?: Record<string, any>): void {
    const errorEvent: ErrorEvent = {
      id: this.generateId(),
      timestamp: new Date(),
      level: 'error',
      message: error.message,
      stack: error.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      metadata
    };

    this.addError(errorEvent);
    this.sendToService(errorEvent);
  }

  logWarning(message: string, metadata?: Record<string, any>): void {
    const errorEvent: ErrorEvent = {
      id: this.generateId(),
      timestamp: new Date(),
      level: 'warning',
      message,
      userAgent: navigator.userAgent,
      url: window.location.href,
      metadata
    };

    this.addError(errorEvent);
  }

  logInfo(message: string, metadata?: Record<string, any>): void {
    const errorEvent: ErrorEvent = {
      id: this.generateId(),
      timestamp: new Date(),
      level: 'info',
      message,
      userAgent: navigator.userAgent,
      url: window.location.href,
      metadata
    };

    this.addError(errorEvent);
  }

  trackError(error: Partial<ErrorReport>) {
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
      this.originalConsoleError('Details:', fullError);
    }

    // Send to monitoring service in production
    if (!import.meta.env.DEV) {
      this.sendErrorToService(fullError);
    }
  }

  private addError(errorEvent: ErrorEvent): void {
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

  private async sendToService(errorEvent: ErrorEvent): Promise<void> {
    try {
      // In production, send to error tracking service like Sentry
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorEvent)
      });
    } catch (e) {
      this.originalConsoleError('Failed to send error to tracking service:', e);
    }
  }

  private async sendErrorToService(error: ErrorReport): Promise<void> {
    try {
      // Replace with your actual error reporting service
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(error),
      });
    } catch (e) {
      this.originalConsoleError('Failed to send error to tracking service:', e);
    }
  }

  getErrors(): ErrorReport[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }

  // Track custom application errors
  trackCustomError(message: string, context?: any) {
    this.trackError({
      message: `Custom Error: ${message}`,
      stack: new Error().stack,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      ...context,
    });
  }

  // Track performance issues
  trackPerformanceIssue(metric: string, value: number, threshold: number) {
    if (value > threshold) {
      this.trackError({
        message: `Performance Issue: ${metric} exceeded threshold (${value} > ${threshold})`,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        url: window.location.href,
      });
    }
  }
}

// Global error tracker instance
const errorTracker = new ErrorTracker();

// Performance monitoring
export const performanceMonitor = {
  measurePageLoad: () => {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        const metrics = {
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
          firstByte: perfData.responseStart - perfData.requestStart,
          pageLoad: perfData.loadEventEnd - perfData.navigationStart
        };

        errorTracker.logInfo('Page performance metrics', metrics);
      }, 0);
    });
  },

  measureApiCall: async <T>(
    name: string,
    apiCall: () => Promise<T>
  ): Promise<T> => {
    const start = performance.now();
    try {
      const result = await apiCall();
      const duration = performance.now() - start;
      
      errorTracker.logInfo(`API call: ${name}`, {
        duration: Math.round(duration),
        success: true
      });
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      
      errorTracker.logError(error as Error, {
        apiCall: name,
        duration: Math.round(duration)
      });
      
      throw error;
    }
  }
};

// Export functions for use throughout the app
export const initErrorTracking = () => {
  console.log('Error tracking initialized');
  performanceMonitor.measurePageLoad();
  return errorTracker;
};

export const trackError = (message: string, context?: any) => {
  errorTracker.trackCustomError(message, context);
};

export const trackPerformanceIssue = (metric: string, value: number, threshold: number) => {
  errorTracker.trackPerformanceIssue(metric, value, threshold);
};

export const getErrorHistory = () => {
  return errorTracker.getErrors();
};

export const clearErrorHistory = () => {
  errorTracker.clearErrors();
};

export { errorTracker };
export default errorTracker;