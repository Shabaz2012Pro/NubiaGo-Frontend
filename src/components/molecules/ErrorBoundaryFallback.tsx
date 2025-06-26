import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '../atoms/Button';

interface ErrorBoundaryFallbackProps {
  error?: Error;
  resetError?: () => void;
  errorInfo?: React.ErrorInfo;
}

const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({
  error,
  resetError,
  errorInfo
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [reportSent, setReportSent] = useState(false);

  const handleReportError = async () => {
    try {
      // Send error report to monitoring service
      console.error('Error reported:', { error, errorInfo });
      setReportSent(true);
    } catch (e) {
      console.error('Failed to report error:', e);
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 p-4">
      <div className="max-w-lg w-full bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <AlertTriangle className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {error?.message || 'An unexpected error occurred. Please try again.'}
          </p>

          <div className="space-y-3 mb-6">
            <Button onClick={resetError} variant="primary" fullWidth>
              Try Again
            </Button>
            <Button onClick={reloadPage} variant="outline" fullWidth>
              Reload Page
            </Button>
            {!reportSent && (
              <Button onClick={handleReportError} variant="ghost" size="sm">
                Report This Issue
              </Button>
            )}
            {reportSent && (
              <p className="text-green-600 text-sm">Thank you for reporting this issue!</p>
            )}
          </div>

          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4">
              <Button 
                onClick={() => setShowDetails(!showDetails)} 
                variant="ghost" 
                size="sm"
              >
                {showDetails ? 'Hide' : 'Show'} Error Details
              </Button>
              {showDetails && (
                <pre className="mt-2 text-xs text-left bg-neutral-100 dark:bg-neutral-700 p-3 rounded overflow-auto max-h-40">
                  {error?.stack}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundaryFallback;