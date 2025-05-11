import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md w-full p-8 bg-card border border-ash rounded-xl shadow-lg">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-alabaster mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-ash mb-6">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <div className="space-y-4">
                <Link
                  to="/"
                  className="inline-block w-full px-6 py-3 text-center font-medium text-alabaster bg-imperial rounded-lg hover:bg-imperial/90 transition-colors"
                >
                  Return Home
                </Link>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-block w-full px-6 py-3 text-center font-medium text-alabaster bg-charcoal rounded-lg hover:bg-ash/10 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const APIErrorFallback: React.FC<{ error: Error; retry?: () => void }> = ({
  error,
  retry,
}) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            API Error
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error.message || 'Failed to fetch data from the server'}
          </p>
          {retry && (
            <button
              onClick={retry}
              className="inline-block px-6 py-3 text-center font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const EmptyState: React.FC<{
  title: string;
  description: string;
  action?: ReactNode;
}> = ({ title, description, action }) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        {action}
      </div>
    </div>
  );
};

export default ErrorBoundary; 