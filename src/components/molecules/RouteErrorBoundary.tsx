import React, { Component, ErrorInfo, ReactNode } from 'react';
import NotFoundPage from './NotFoundPage';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  is404: boolean;
}

class RouteErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      is404: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Check if this is a 404 error
    const is404 = error.message.includes('404') || 
                 error.message.includes('not found') || 
                 error.message.includes('route not found');
    
    return {
      hasError: true,
      error,
      is404
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error('Route error caught:', error, errorInfo);
    
    this.setState({
      errorInfo,
      is404: error.message.includes('404') || 
             error.message.includes('not found') || 
             error.message.includes('route not found')
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // If it's a 404 error, show the NotFoundPage
      if (this.state.is404) {
        return <NotFoundPage />;
      }
      
      // Otherwise, show the fallback or a generic error message
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900 p-4">
          <div className="max-w-md w-full bg-white dark:bg-neutral-800 rounded-xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Something went wrong
            </h2>
            
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-6">
              <p className="text-red-700 dark:text-red-300 text-sm font-mono break-words">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Reload Page
              </button>
              
              <button
                onClick={() => {
                  window.location.hash = '';
                  window.location.reload();
                }}
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;