'use client';

import { useEffect } from 'react';

/**
 * Global Error Handler Component
 * Handles external script errors (browser extensions, third-party scripts)
 * that are not part of our codebase
 */
export default function ErrorHandler() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Handle unhandled errors (including external scripts)
    const handleError = (event: ErrorEvent) => {
      // Suppress errors from external scripts (browser extensions, third-party services)
      const errorSource = event.filename || event.message || '';
      
      // Known external script errors to suppress
      const externalScriptPatterns = [
        'webpage_content_reporter.js',
        'chrome-extension://',
        'moz-extension://',
        'safari-extension://',
        'edge-extension://',
        'extension://',
        'moz-extension://',
      ];

      const isExternalScript = externalScriptPatterns.some(pattern => 
        errorSource.includes(pattern)
      );

      if (isExternalScript) {
        // Suppress external script errors silently
        event.preventDefault();
        return;
      }

      // Log other errors for debugging (but don't break the app)
      if (process.env.NODE_ENV === 'development') {
        console.warn('[ErrorHandler] Non-critical error:', {
          message: event.message,
          source: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        });
      }
    };

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.toString() || '';
      
      // Suppress external script promise rejections
      if (reason.includes('webpage_content_reporter') || 
          reason.includes('chrome-extension') ||
          reason.includes('moz-extension')) {
        event.preventDefault();
        return;
      }

      // Log other promise rejections in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('[ErrorHandler] Unhandled promise rejection:', reason);
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
}
