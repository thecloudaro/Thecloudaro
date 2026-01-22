"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

/**
 * Test page for Upmind Domain Availability Checker Widget
 * This page is used to test the widget configuration before implementing it on the main domain-search page
 */
const TestWidgetPage = () => {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [orderConfigUrl, setOrderConfigUrl] = useState<string>('');
  const [widgetError, setWidgetError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addTestResult = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTestResults(prev => [...prev, `[${timestamp}] ${message}`]);
    console.log(`🧪 [Widget Test] ${message}`);
  };

  useEffect(() => {
    // Get order config URL
    const configUrl = process.env.NEXT_PUBLIC_UPMIND_ORDER_CONFIG_URL || 'https://my.thecloudaro.com/order/product';
    setOrderConfigUrl(configUrl);
    addTestResult(`Order Config URL: ${configUrl}`);
    addTestResult(`Current Domain: ${window.location.hostname}`);
    addTestResult(`Current Origin: ${window.location.origin}`);

    // Monitor for errors
    const handleError = (event: ErrorEvent) => {
      if (event.message && (event.message.includes('upm-dac') || event.message.includes('upmind'))) {
        addTestResult(`❌ Runtime Error: ${event.message}`);
        setWidgetError(event.message);
      }
    };

    const handleWidgetError = (event: any) => {
      addTestResult(`❌ Widget Error Event: ${JSON.stringify(event.detail || event)}`);
      setWidgetError('Widget error event detected');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('upm-dac-error', handleWidgetError);

    // Monitor fetch requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      
      if (args[0] && typeof args[0] === 'string' && args[0].includes('api.upmind.io')) {
        addTestResult(`📡 API Call: ${args[0]} - Status: ${response.status}`);
        if (response.status === 401) {
          addTestResult(`❌ 401 Unauthorized - Domain may not be registered in Upmind`);
          setWidgetError('401 Unauthorized - Check domain registration in Upmind Settings → Domains');
        }
      }
      
      return response;
    };

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('upm-dac-error', handleWidgetError);
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Upmind Widget Test Page</h1>
        
        {/* Test Information */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Configuration</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Order Config URL:</strong> {orderConfigUrl || 'Loading...'}</p>
            <p><strong>Currency:</strong> USD</p>
            <p><strong>Widget Loaded:</strong> {widgetLoaded ? '✅ Yes' : '⏳ Loading...'}</p>
            <p><strong>Current Domain:</strong> {typeof window !== 'undefined' ? window.location.hostname : 'N/A'}</p>
          </div>
        </div>

        {/* Widget Script */}
        <Script
          src="https://widgets.upmind.app/dac/upm-dac.min.js"
          strategy="lazyOnload"
          onLoad={() => {
            addTestResult('✅ Widget script loaded successfully');
            setWidgetLoaded(true);
          }}
          onError={(e) => {
            addTestResult(`❌ Failed to load widget script: ${e}`);
            setWidgetError('Failed to load widget script');
          }}
        />

        {/* Widget Container */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Widget Display</h2>
          {widgetError && (
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-4">
              <p className="text-red-200 font-semibold">Error Detected:</p>
              <p className="text-red-300 text-sm mt-2">{widgetError}</p>
            </div>
          )}
          
          {widgetLoaded && orderConfigUrl ? (
            <div className="bg-white rounded-lg p-6">
              {/* @ts-ignore - Upmind custom element */}
              <upm-dac
                order-config-url={orderConfigUrl}
                currency-code="USD"
              />
            </div>
          ) : (
            <div className="bg-gray-700 rounded-lg p-6 text-center">
              <p className="text-gray-300">
                {!orderConfigUrl ? 'Configuring...' : 'Loading widget...'}
              </p>
            </div>
          )}
        </div>

        {/* Test Results Log */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results Log</h2>
          <div className="bg-black rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs">
            {testResults.length === 0 ? (
              <p className="text-gray-500">Waiting for test results...</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="mb-1 text-green-400">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-900/50 border border-blue-500 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Testing Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Check if widget script loads successfully</li>
            <li>Verify order-config-url is correct</li>
            <li>Test domain search functionality</li>
            <li>Check for any 401 errors (domain registration issue)</li>
            <li>Monitor console for detailed error messages</li>
            <li>If widget works here, it can be implemented on main page</li>
          </ol>
          <div className="mt-4 p-4 bg-blue-800/50 rounded">
            <p className="font-semibold mb-2">⚠️ Important:</p>
            <p className="text-sm">
              If you see 401 errors, you need to register this domain in Upmind Admin Panel:
              <br />
              <strong>Settings → Domains → Add Domain</strong>
              <br />
              Domain: <code className="bg-black px-2 py-1 rounded">{typeof window !== 'undefined' ? window.location.hostname : 'your-domain'}</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestWidgetPage;
