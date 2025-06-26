import React, { Component, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RotateCcw } from "lucide-react";
import Button from '../atoms/Button';

interface Props {
  children: ReactNode;
  productId?: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: string;
}

class ProductErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      errorInfo: error.message 
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Product Error Boundary caught an error:', error, errorInfo);

    // Log specific UUID errors
    if (error.message.includes('uuid') || error.message.includes('UUID')) {
      console.error('UUID-related error detected:', {
        productId: this.props.productId,
        error: error.message,
        stack: error.stack
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });

    // Force a page reload if we have a product ID
    if (this.props.productId) {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-[400px] flex items-center justify-center p-8"
        >
          <div className="text-center max-w-md mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center"
            >
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            </motion.div>

            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Product Not Available
            </h3>

            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              {this.state.error?.message.includes('uuid') || this.state.error?.message.includes('UUID') 
                ? `The product "${this.props.productId}" could not be found. It may have been moved, removed, or is temporarily unavailable. Please try browsing our products or search for something similar.`
                : 'There was an unexpected error while loading this product. Our team has been notified and we\'re working to fix this.'
              }
            </p>

            <div className="space-y-3">
              <Button
                onClick={this.handleRetry}
                className="w-full"
                variant="primary"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>

              <Button
                onClick={() => window.location.hash = '#'}
                variant="outline"
                className="w-full"
              >
                Back to Home
              </Button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-neutral-500 cursor-pointer">
                  Debug Information
                </summary>
                <pre className="mt-2 p-3 bg-neutral-100 dark:bg-neutral-800 rounded text-xs overflow-auto">
                  {this.state.error?.stack}
                </pre>
              </details>
            )}
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ProductErrorBoundary;