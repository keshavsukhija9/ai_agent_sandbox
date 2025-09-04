// Production-grade error handling
class ErrorHandler {
  constructor() {
    this.isProduction = import.meta.env.VITE_APP_ENV === 'production';
    this.setupGlobalErrorHandling();
  }

  setupGlobalErrorHandling() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError('Unhandled Promise Rejection', event.reason);
      event.preventDefault();
    });

    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError('JavaScript Error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
    });
  }

  logError(type, error, context = {}) {
    const errorData = {
      type,
      error: this.serializeError(error),
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: this.getCurrentUserId()
    };

    if (this.isProduction) {
      // Send to error tracking service (Sentry, LogRocket, etc.)
      this.sendToErrorService(errorData);
    } else {
      // Log to console in development
      console.error(`[${type}]`, errorData);
    }
  }

  serializeError(error) {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: error.stack
      };
    }
    return error;
  }

  getCurrentUserId() {
    try {
      const user = JSON.parse(localStorage.getItem('mockUser'));
      return user?.id || 'anonymous';
    } catch {
      return 'anonymous';
    }
  }

  async sendToErrorService(errorData) {
    try {
      // Replace with your error tracking service
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorData)
      });
    } catch (err) {
      console.error('Failed to send error to tracking service:', err);
    }
  }

  // Wrapper for async operations
  async handleAsync(operation, fallback = null) {
    try {
      return await operation();
    } catch (error) {
      this.logError('Async Operation Failed', error, { operation: operation.name });
      return fallback;
    }
  }

  // Wrapper for API calls
  async apiCall(url, options = {}, fallback = null) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      this.logError('API Call Failed', error, { url, options });
      return fallback;
    }
  }
}

export const errorHandler = new ErrorHandler();