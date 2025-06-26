
import React from 'react';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleApiError = (error: any): string => {
  // Network errors
  if (!error.response) {
    return 'Network error. Please check your internet connection and try again.';
  }

  // Server errors
  if (error.response.status >= 500) {
    return 'Server error. Please try again later.';
  }

  // Client errors
  if (error.response.status >= 400) {
    const message = error.response.data?.message || error.response.data?.error;
    if (Array.isArray(message)) {
      return message.join(', ');
    }
    return message || 'Something went wrong. Please try again.';
  }

  return 'An unexpected error occurred. Please try again.';
};

export const logError = (error: any, context?: string) => {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  // In development, log to console
  if (import.meta.env.DEV) {
    console.error('Error logged:', errorInfo);
  }

  // In production, send to error tracking service
  // You can integrate with services like Sentry, LogRocket, etc.
};

export const createErrorBoundary = (fallback: React.ComponentType<any>) => {
  return class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error: any) {
      return { hasError: true, error };
    }

    componentDidCatch(error: any, errorInfo: any) {
      logError(error, 'ErrorBoundary');
    }

    render() {
      if (this.state.hasError) {
        return React.createElement(fallback, { error: this.state.error });
      }

      return this.props.children;
    }
  };
};
