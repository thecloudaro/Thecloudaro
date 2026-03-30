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
    const configUrl = process.env.NEXT_PUBLIC_UPMIND_ORDER_CONFIG_URL || 'https://my.thecloudaro.com/order/product';
    setOrderConfigUrl(configUrl);
    addTestResult(`Order Config URL: ${configUrl}`);
    addTestResult(`Current Domain: ${window.location.hostname}`);
    addTestResult(`Current Origin: ${window.location.origin}`);

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
    <div className="min-h-screen bg-[rgb(var(--test-widget-page-bg))] p-8 text-[rgb(var(--test-widget-text))]">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">Upmind Widget Test Page</h1>

        <div className="mb-6 rounded-lg bg-[rgb(var(--test-widget-panel-bg))] p-6">
          <h2 className="mb-4 text-xl font-semibold">Test Configuration</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Order Config URL:</strong> {orderConfigUrl || 'Loading...'}</p>
            <p><strong>Currency:</strong> USD</p>
            <p><strong>Widget Loaded:</strong> {widgetLoaded ? '✅ Yes' : '⏳ Loading...'}</p>
            <p><strong>Current Domain:</strong> {typeof window !== 'undefined' ? window.location.hostname : 'N/A'}</p>
          </div>
        </div>

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

        <div className="mb-6 rounded-lg bg-[rgb(var(--test-widget-panel-bg))] p-6">
          <h2 className="mb-4 text-xl font-semibold">Widget Display</h2>
          {widgetError ? (
            <div className="mb-4 rounded-lg border border-[rgb(var(--test-widget-alert-border))] bg-[rgba(var(--test-widget-alert-bg))] p-4">
              <p className="font-semibold text-[rgb(var(--test-widget-error-label))]">Error Detected:</p>
              <p className="mt-2 text-sm text-[rgb(var(--test-widget-error-text))]">{widgetError}</p>
            </div>
          ) : null}

          {widgetLoaded && orderConfigUrl ? (
            <div className="rounded-lg bg-[rgb(var(--test-widget-card-light-bg))] p-6">
              {/* @ts-ignore - Upmind custom element */}
              <upm-dac
                order-config-url={orderConfigUrl}
                currency-code="USD"
              />
            </div>
          ) : (
            <div className="rounded-lg bg-[rgb(var(--test-widget-panel-inner))] p-6 text-center">
              <p className="text-[rgb(var(--test-widget-text-muted))]">
                {!orderConfigUrl ? 'Configuring...' : 'Loading widget...'}
              </p>
            </div>
          )}
        </div>

        <div className="rounded-lg bg-[rgb(var(--test-widget-panel-bg))] p-6">
          <h2 className="mb-4 text-xl font-semibold">Test Results Log</h2>
          <div className="h-64 overflow-y-auto rounded-lg bg-[rgb(var(--test-widget-console-bg))] p-4 font-mono text-xs">
            {testResults.length === 0 ? (
              <p className="text-[rgb(var(--test-widget-text-subtle))]">Waiting for test results...</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="mb-1 text-[rgb(var(--test-widget-success))]">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-[rgb(var(--test-widget-info-panel-border))] bg-[rgba(var(--test-widget-info-panel-bg))] p-6">
          <h2 className="mb-4 text-xl font-semibold">Testing Instructions</h2>
          <ol className="list-inside list-decimal space-y-2 text-sm">
            <li>Check if widget script loads successfully</li>
            <li>Verify order-config-url is correct</li>
            <li>Test domain search functionality</li>
            <li>Check for any 401 errors (domain registration issue)</li>
            <li>Monitor console for detailed error messages</li>
            <li>If widget works here, it can be implemented on main page</li>
          </ol>
          <div className="mt-4 rounded bg-[rgba(var(--test-widget-info-inner-bg))] p-4">
            <p className="mb-2 font-semibold">⚠️ Important:</p>
            <p className="text-sm">
              If you see 401 errors, you need to register this domain in Upmind Admin Panel:
              <br />
              <strong>Settings → Domains → Add Domain</strong>
              <br />
              Domain:{' '}
              <code className="rounded bg-[rgb(var(--test-widget-code-bg))] px-2 py-1 text-[rgb(var(--test-widget-code-text))]">
                {typeof window !== 'undefined' ? window.location.hostname : 'your-domain'}
              </code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestWidgetPage;
