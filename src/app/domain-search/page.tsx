"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, XCircle, Star } from "lucide-react";
import DomainPricingTable from "@/components/Domain/DomainPricingTable";
import BackToTopButton from "@/components/BackToTopButton";
import Script from "next/script";

interface DomainResult {
  name: string;
  available: boolean;
  price: number;
  currency: string;
  originalPrice?: number;
  popular?: boolean;
  premium?: boolean;
}

interface TldItem {
  tld: string;
  registerPrice?: number;
  renewPrice?: number;
  transferPrice?: number;
}

const DomainSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DomainResult[]>([]);
  const [activeTab, setActiveTab] = useState("domains");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [widgetError, setWidgetError] = useState<string | null>(null);
  const [domainNames, setDomainNames] = useState<TldItem[]>([]);
  const [domainNamesLoading, setDomainNamesLoading] = useState(false);

  // Load Upmind Domain Availability Checker widget
  useEffect(() => {
    // Check if script is already loaded
    if (typeof window !== 'undefined' && (window as any).UpmDac) {
      setWidgetLoaded(true);
      return;
    }

    // Script will be loaded via Next.js Script component
    const checkWidget = setInterval(() => {
      if (typeof window !== 'undefined' && (window as any).UpmDac) {
        setWidgetLoaded(true);
        clearInterval(checkWidget);
      }
    }, 100);

    return () => clearInterval(checkWidget);
  }, []);

  // Fetch domain names from Upmind Store catalogue (same as Admin → Store catalogue → Domain Names)
  useEffect(() => {
    if (activeTab !== "domains") return;
    const fetchDomainNames = async () => {
      setDomainNamesLoading(true);
      try {
        const res = await fetch("/api/domain-search?term=example", { cache: "no-store" });
        const data = await res.json();
        if (data?.success && Array.isArray(data.domains) && data.domains.length > 0) {
          const seen = new Set<string>();
          const list: TldItem[] = [];
          for (const d of data.domains as { tld: string; price?: number }[]) {
            const tld = d.tld || "";
            if (tld && !seen.has(tld)) {
              seen.add(tld);
              list.push({
                tld,
                registerPrice: typeof d.price === "number" ? d.price : undefined,
              });
            }
          }
          setDomainNames(list);
        }
      } catch {
        setDomainNames([]);
      } finally {
        setDomainNamesLoading(false);
      }
    };
    fetchDomainNames();
  }, [activeTab]);

  const handleSearch = async (term: string) => {
    // Allow empty search term - will show all available domains
    const searchTerm = term.trim() || 'example';
    
    console.log('🔍 [DomainSearchPage] Starting search for:', searchTerm);
    setIsSearching(true);
    setSearchError(null);

    try {
      const searchUrl = `/api/domain-search?term=${encodeURIComponent(searchTerm)}`;
      console.log(`🔍 [DomainSearchPage] Fetching from: ${searchUrl}`);
      console.log(`🔍 [DomainSearchPage] Full URL: ${window.location.origin}${searchUrl}`);
      
      // Fetch domain names from Upmind API
      const response = await fetch(searchUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Ensure fresh request
      });
      
      console.log(`📡 [DomainSearchPage] Response status: ${response.status}`);
      console.log(`📡 [DomainSearchPage] Response ok: ${response.ok}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ [DomainSearchPage] HTTP Error: ${response.status}`, errorText);
        setSearchError(`Server error: ${response.status}. Please try again.`);
        setSearchResults([]);
        return;
      }
      
      const data = await response.json();

      console.log(`📥 [DomainSearchPage] API Response:`, {
        ok: response.ok,
        status: response.status,
        success: data.success,
        domainsCount: data.domains?.length || 0,
        error: data.error
      });

      if (!response.ok || !data.success) {
        const errorMsg = data?.error || "Failed to search domains. Please try again.";
        setSearchError(errorMsg);
        setSearchResults([]);
        console.error('[DomainSearchPage] ❌ API error:', errorMsg);
        console.error('[DomainSearchPage] ❌ Full response:', data);
        return;
      }

      if (data.domains && Array.isArray(data.domains)) {
        if (data.domains.length > 0) {
          setSearchResults(data.domains);
          setSearchError(null);
          console.log(`✅ [DomainSearchPage] Loaded ${data.domains.length} domain results from Upmind API`);
          console.log(`📋 [DomainSearchPage] Sample results:`, data.domains.slice(0, 3));
        } else {
          setSearchResults([]);
          setSearchError("No domains found. Please try a different search term.");
          console.warn('[DomainSearchPage] ⚠️ No domains in response array');
        }
      } else {
        setSearchResults([]);
        setSearchError("No domains found. Please try a different search term.");
        console.warn('[DomainSearchPage] ⚠️ Invalid response structure:', data);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to search domains. Please try again.";
      setSearchError(errorMsg);
      setSearchResults([]);
      console.error('[DomainSearchPage] ❌ Network/Fetch Error:', errorMsg);
      console.error('[DomainSearchPage] ❌ Full error object:', error);
      
      // Check if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('[DomainSearchPage] ❌ This appears to be a network error. Check if the API route exists.');
        setSearchError("Network error: Could not reach the server. Please check your connection and try again.");
      }
    } finally {
      setIsSearching(false);
      console.log('🔍 [DomainSearchPage] Search completed');
    }
  };

  // Get order config URL from environment or use default
  // Format: https://{brand}.myupmindbrand.com/order/product
  // Based on codebase, the shop URL is: https://my.thecloudaro.com
  // You can set this in .env.local as NEXT_PUBLIC_UPMIND_ORDER_CONFIG_URL
  const [orderConfigUrl, setOrderConfigUrl] = useState<string>('');
  const currencyCode = 'USD';

  useEffect(() => {
    // Get order config URL from environment variable (client-side)
    // Default to thecloudaro shop URL based on codebase usage
    const configUrl = process.env.NEXT_PUBLIC_UPMIND_ORDER_CONFIG_URL || 'https://my.thecloudaro.com/order/product';
    setOrderConfigUrl(configUrl);
    console.log('🔧 [DomainSearchPage] Upmind order config URL:', configUrl);
    console.log('🔧 [DomainSearchPage] Current domain:', window.location.hostname);
    console.log('🔧 [DomainSearchPage] Widget will use order-config-url:', configUrl);
    console.log('⚠️ [DomainSearchPage] IMPORTANT: Ensure this domain is registered in Upmind Settings → Domains');
    
    // Monitor for 401 errors from Upmind API
    const originalFetch = window.fetch;
    let errorCheckTimeout: NodeJS.Timeout;
    
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      
      // Check if this is an Upmind OAuth/API call with 401 error
      if (args[0] && typeof args[0] === 'string' && args[0].includes('api.upmind.io')) {
        const url = args[0];
        console.log(`📡 [DomainSearchPage] Upmind API Call: ${url} - Status: ${response.status}`);
        
        if (response.status === 401) {
          console.error('❌ [DomainSearchPage] ============================================');
          console.error('❌ [DomainSearchPage] WIDGET ERROR: 401 Unauthorized');
          console.error('❌ [DomainSearchPage] ============================================');
          console.error('❌ [DomainSearchPage] Failed URL:', url);
          console.error('❌ [DomainSearchPage] Current Domain:', window.location.hostname);
          console.error('❌ [DomainSearchPage] Reason: Domain not registered in Upmind');
          console.error('❌ [DomainSearchPage] Solution: Add domain in Upmind Admin → Settings → Domains');
          console.error('❌ [DomainSearchPage] Note: localhost cannot be registered');
          console.error('❌ [DomainSearchPage] ============================================');
          
          clearTimeout(errorCheckTimeout);
          errorCheckTimeout = setTimeout(() => {
            const currentDomain = window.location.hostname;
            const isLocalhost = currentDomain === 'localhost' || currentDomain === '127.0.0.1';
            
            if (isLocalhost) {
              setWidgetError(`401 Error: localhost cannot be registered in Upmind. Widget requires a production domain (e.g., thecloudaro.com). Use custom search below for development.`);
            } else {
              setWidgetError(`401 Error: Domain "${currentDomain}" is not registered in Upmind. Please add it in Upmind Admin → Settings → Domains.`);
            }
          }, 1000);
        } else if (response.status === 200) {
          console.log('✅ [DomainSearchPage] Upmind API call successful');
        }
      }
      
      return response;
    };
    
    // Listen for widget custom events (if widget emits them)
    const handleWidgetError = (event: any) => {
      console.error('❌ [DomainSearchPage] Widget error event:', event);
      console.error('❌ [DomainSearchPage] Widget error details:', JSON.stringify(event.detail || event, null, 2));
      
      const errorMessage = event.detail?.message || event.detail?.error || event.error || event.message || 'Widget error occurred';
      setWidgetError(`Widget Error: ${errorMessage}. Please ensure your domain is registered in Upmind Settings → Domains.`);
    };

    // Listen for multiple possible widget error events
    window.addEventListener('upm-dac-error', handleWidgetError);
    window.addEventListener('error', (event) => {
      // Check if error is from widget
      if (event.message && (event.message.includes('upm-dac') || event.message.includes('upmind'))) {
        console.error('❌ [DomainSearchPage] Widget runtime error:', event);
        setWidgetError('Widget runtime error. Please check console for details.');
      }
    });
    
    return () => {
      clearTimeout(errorCheckTimeout);
      window.fetch = originalFetch;
      window.removeEventListener('upm-dac-error', handleWidgetError);
    };
  }, []);

  return (
    <>
      {/* Load Upmind Domain Availability Checker Widget Script */}
      <Script
        src="https://widgets.upmind.app/dac/upm-dac.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log('✅ [DomainSearchPage] ============================================');
          console.log('✅ [DomainSearchPage] Upmind DAC Widget Script Loaded Successfully');
          console.log('✅ [DomainSearchPage] ============================================');
          console.log('✅ [DomainSearchPage] Order Config URL:', orderConfigUrl);
          console.log('✅ [DomainSearchPage] Currency Code:', currencyCode);
          console.log('✅ [DomainSearchPage] Current Domain:', typeof window !== 'undefined' ? window.location.hostname : 'N/A');
          console.log('✅ [DomainSearchPage] Widget will attempt to load...');
          console.log('✅ [DomainSearchPage] ============================================');
          setWidgetLoaded(true);
        }}
        onError={(e) => {
          console.error('❌ [DomainSearchPage] ============================================');
          console.error('❌ [DomainSearchPage] FAILED TO LOAD WIDGET SCRIPT');
          console.error('❌ [DomainSearchPage] ============================================');
          console.error('❌ [DomainSearchPage] Error:', e);
          console.error('❌ [DomainSearchPage] Script URL: https://widgets.upmind.app/dac/upm-dac.min.js');
          console.error('❌ [DomainSearchPage] Check network connection and script availability');
          console.error('❌ [DomainSearchPage] ============================================');
          setWidgetError('Failed to load widget script. Please check your network connection.');
        }}
      />

      <div className="min-h-screen overflow-hidden" style={{ backgroundColor: 'rgb(var(--domain-search-bg))', color: 'rgb(var(--domain-search-text))' }}>
      
      {/* Sub-navigation Tabs */}
      <div className="pt-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative border-b pb-4" style={{ borderColor: 'rgb(var(--domain-search-tab-border))' }}>
            <div className="flex items-center space-x-8">
              {/* Domains Tab */}
              <div 
                className="flex items-center space-x-2 pb-2 cursor-pointer transition-colors"
                onClick={() => setActiveTab("domains")}
              >
                <div 
                  className="w-2 h-2 rounded-full transition-colors"
                  style={{ backgroundColor: activeTab === "domains" ? 'rgb(var(--domain-search-tab-active-dot))' : 'rgb(var(--domain-search-tab-inactive-dot))' }}
                ></div>
                <span 
                  className="font-medium transition-colors"
                  style={{ color: activeTab === "domains" ? 'rgb(var(--domain-search-tab-active-text))' : 'rgb(var(--domain-search-tab-inactive-text))' }}
                >Domains</span>
              </div>
              
              {/* Pricing Tab */}
              <div 
                className="flex items-center space-x-2 pb-2 cursor-pointer transition-colors"
                onClick={() => setActiveTab("pricing")}
              >
                <div 
                  className="w-2 h-2 rounded-full transition-colors"
                  style={{ backgroundColor: activeTab === "pricing" ? 'rgb(var(--domain-search-tab-active-dot))' : 'rgb(var(--domain-search-tab-inactive-dot))' }}
                ></div>
                <span 
                  className="font-medium transition-colors"
                  style={{ color: activeTab === "pricing" ? 'rgb(var(--domain-search-tab-active-text))' : 'rgb(var(--domain-search-tab-inactive-text))' }}
                >Pricing</span>
              </div>
            </div>
            
            {/* Sliding Blue Line */}
            <motion.div
              className="absolute bottom-0 h-0.5"
              style={{ backgroundColor: 'rgb(var(--domain-search-tab-indicator))' }}
              initial={false}
              animate={{
                x: activeTab === "domains" ? 0 : 120,
                width: activeTab === "domains" ? 80 : 70
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-4 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Upmind Domain Availability Checker Widget - Main Interface */}
            {activeTab === "domains" && (
              <div className="w-full space-y-4">
                {/* Domain names (TLDs) from Upmind - show above widget */}
                <div
                  className="rounded-xl p-5"
                  style={{
                    backgroundColor: "rgba(var(--domain-search-card-bg))",
                    border: "1px solid rgb(var(--domain-search-card-border))",
                  }}
                >
                  <h3 className="text-base font-semibold mb-3" style={{ color: "rgb(var(--domain-search-heading))" }}>
                    {domainNames.length > 0
                      ? `Domain names in your store (${domainNames.length})`
                      : "Domain names in your store (Upmind Store catalogue)"}
                  </h3>
                  {domainNamesLoading ? (
                    <p className="text-sm" style={{ color: "rgb(var(--domain-search-info-text))" }}>
                      Loading domain names…
                    </p>
                  ) : domainNames.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {domainNames.map((item) => (
                        <span
                          key={item.tld}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: "rgba(var(--domain-search-info-bg))",
                            border: "1px solid rgba(var(--domain-search-info-border))",
                            color: "rgb(var(--domain-search-text))",
                          }}
                        >
                          {item.tld}
                          {item.registerPrice != null && (
                            <span className="ml-2 opacity-80" style={{ color: "rgb(var(--domain-search-info-text))" }}>
                              ${Number(item.registerPrice).toFixed(2)}/yr
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm" style={{ color: "rgb(var(--domain-search-info-text))" }}>
                      Domain list will appear when available.
                    </p>
                  )}
                </div>

                {/* Localhost notice: widget needs a registered domain in Upmind */}
                {typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && (
                  <div
                    className="rounded-xl p-4 flex items-center gap-3"
                    style={{
                      backgroundColor: "rgba(var(--domain-search-info-bg))",
                      border: "1px solid rgba(var(--domain-search-info-border))",
                    }}
                  >
                    <span className="text-sm" style={{ color: "rgb(var(--domain-search-info-text))" }}>
                      <strong>Local:</strong> Upmind widget sirf production domain pe chalega (Upmind → Settings → Domains me add karein). Yahan neeche <strong>custom search</strong> use karein.
                    </span>
                  </div>
                )}

                {/* Widget Error Message */}
                {widgetError && (
                  <div 
                    className="rounded-xl p-5 flex flex-col space-y-3"
                    style={{ 
                      backgroundColor: 'rgba(var(--domain-search-info-bg))',
                      border: '1px solid rgba(var(--domain-search-info-border))'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <XCircle className="w-5 h-5" style={{ color: 'rgb(var(--domain-search-unavailable-icon))' }} />
                      <span className="text-base font-semibold" style={{ color: 'rgb(var(--domain-search-info-text))' }}>
                        Widget 401 Error - Kyun Nahi Chal Raha?
                      </span>
                    </div>
                    <div className="bg-red-900/20 border border-red-600/50 rounded-lg p-4 space-y-3">
                      {/* Error Details */}
                      <div>
                        <p className="text-sm font-semibold mb-2" style={{ color: 'rgb(var(--domain-search-text))' }}>
                          ❌ Error Details:
                        </p>
                        <div className="bg-black/30 rounded p-2 mb-2">
                          <code className="text-xs" style={{ color: 'rgb(var(--domain-search-text-muted))' }}>
                            {typeof window !== 'undefined' && window.location.hostname === 'localhost' 
                              ? 'localhost (Not Supported)'
                              : typeof window !== 'undefined' 
                                ? window.location.hostname 
                                : 'Unknown Domain'}
                          </code>
                        </div>
                        <p className="text-xs" style={{ color: 'rgb(var(--domain-search-text-muted))' }}>
                          Widget <code className="bg-black/30 px-1 rounded">api.upmind.io/oauth/access_token</code> se <strong>guest token</strong> create karne ki koshish karta hai, lekin <strong>401 Unauthorized</strong> error aa raha hai.
                        </p>
                      </div>
                      
                      {/* Technical Reason */}
                      <div>
                        <p className="text-sm font-semibold mb-2" style={{ color: 'rgb(var(--domain-search-text))' }}>
                          🔍 Technical Reason:
                        </p>
                        <ol className="list-decimal list-inside space-y-1 text-xs mb-2" style={{ color: 'rgb(var(--domain-search-text-muted))' }}>
                          <li>Widget ko domain Upmind me <strong>registered</strong> chahiye</li>
                          <li><strong>localhost</strong> ko Upmind valid domain nahi maanta</li>
                          <li>Sirf production domains (e.g., thecloudaro.com) register ho sakti hain</li>
                          <li>Isliye widget localhost par kaam nahi karta</li>
                        </ol>
                        <p className="text-xs mt-2 p-2 bg-yellow-900/20 border border-yellow-600/50 rounded" style={{ color: 'rgb(var(--domain-search-text-muted))' }}>
                          <strong>⚠️ Console me check karein:</strong> Browser console (F12) me detailed error logs milenge.
                        </p>
                      </div>

                      {/* Solution */}
                      <div>
                        <p className="text-sm font-semibold mb-2" style={{ color: 'rgb(var(--domain-search-text))' }}>
                          ✅ Solution:
                        </p>
                        <div className="space-y-2">
                          <div className="p-2 bg-green-900/20 border border-green-600/50 rounded">
                            <p className="text-xs font-semibold mb-1" style={{ color: 'rgb(var(--domain-search-text))' }}>
                              Production me:
                            </p>
                            <p className="text-xs" style={{ color: 'rgb(var(--domain-search-text-muted))' }}>
                              Apni actual domain (e.g., thecloudaro.com) <strong>Upmind Admin → Settings → Domains</strong> me add karein. Tab widget kaam karega.
                            </p>
                          </div>
                          <div className="p-2 bg-blue-900/20 border border-blue-600/50 rounded">
                            <p className="text-xs font-semibold mb-1" style={{ color: 'rgb(var(--domain-search-text))' }}>
                              Development me:
                            </p>
                            <p className="text-xs" style={{ color: 'rgb(var(--domain-search-text-muted))' }}>
                              Custom search use karein (neeche available hai) - ye bina domain registration ke kaam karta hai.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Upmind Widget */}
                {widgetLoaded && orderConfigUrl ? (
                  <div className="rounded-xl p-6" style={{ 
                    backgroundColor: 'rgba(var(--domain-search-card-bg))',
                    border: '1px solid rgb(var(--domain-search-card-border))'
                  }}>
                    {/* @ts-ignore - Upmind custom element */}
                    <upm-dac
                      order-config-url={orderConfigUrl}
                      currency-code={currencyCode}
                      onError={(e: any) => {
                        console.error('❌ [DomainSearchPage] Widget onError callback:', e);
                        setWidgetError('Widget failed to load. Using fallback search.');
                      }}
                    />
                    {/* Widget error monitoring is handled via useEffect */}
                  </div>
                ) : (
                  <div 
                    className="rounded-full p-5 flex items-center space-x-3"
                    style={{ 
                      backgroundColor: 'rgba(var(--domain-search-info-bg))',
                      border: '1px solid rgba(var(--domain-search-info-border))'
                    }}
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(var(--domain-search-info-icon-bg))' }}>
                      <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'rgb(var(--domain-search-info-icon-text))' }}></div>
                    </div>
                    <span className="text-base font-semibold" style={{ color: 'rgb(var(--domain-search-info-text))' }}>
                      {!orderConfigUrl ? 'Configuring domain search widget...' : 'Loading Upmind domain search widget...'}
                    </span>
                  </div>
                )}

                {/* Fallback: Custom Search (always available as alternative) */}
                <div className="w-full space-y-4 pt-4 border-t" style={{ borderColor: 'rgba(var(--domain-search-info-border))' }}>
                  <p className="text-sm font-medium" style={{ color: 'rgb(var(--domain-search-text))' }}>
                    {widgetError ? 'Alternative: Use custom search below' : 'Or use custom search:'}
                  </p>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'rgb(var(--domain-search-input-icon))' }} />
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSearch(searchTerm);
                            }
                          }}
                          placeholder="Search for a domain name (e.g., example)..."
                          className="w-full pl-12 pr-4 py-5 text-base bg-transparent border rounded-full focus:outline-none hover:transition-all duration-300 placeholder:text-[rgb(var(--domain-search-input-placeholder))]"
                          style={{ 
                            borderColor: 'rgb(var(--domain-search-input-border))',
                            color: 'rgb(var(--domain-search-input-text))'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = 'rgb(var(--domain-search-input-border-focus))';
                            e.currentTarget.style.boxShadow = `0 0 0 1px rgba(var(--domain-search-input-focus-ring))`;
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'rgb(var(--domain-search-input-border))';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSearch(searchTerm || 'example')}
                        disabled={isSearching}
                        className="px-8 py-5 rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ 
                          backgroundColor: 'rgb(var(--domain-search-button-bg))',
                          color: 'rgb(var(--domain-search-button-text))'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSearching) {
                            e.currentTarget.style.backgroundColor = 'rgb(var(--domain-search-button-hover))';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgb(var(--domain-search-button-bg))';
                        }}
                      >
                        {isSearching ? "Searching..." : "Search"}
                      </motion.button>
                    </div>
                    
                    {/* Show search results if available */}
                    {searchError && (
                      <div className="mt-4 rounded-lg p-4" style={{ 
                        backgroundColor: 'rgba(var(--domain-search-info-bg))',
                        border: '1px solid rgba(var(--domain-search-info-border))'
                      }}>
                        <div className="flex items-center space-x-2">
                          <XCircle className="w-4 h-4" style={{ color: 'rgb(var(--domain-search-unavailable-icon))' }} />
                          <span className="text-sm" style={{ color: 'rgb(var(--domain-search-info-text))' }}>{searchError}</span>
                        </div>
                      </div>
                    )}
                    
                    {isSearching && (
                      <div className="mt-4 rounded-lg p-4 flex items-center space-x-3" style={{ 
                        backgroundColor: 'rgba(var(--domain-search-info-bg))',
                        border: '1px solid rgba(var(--domain-search-info-border))'
                      }}>
                        <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'rgb(var(--domain-search-info-icon-text))' }}></div>
                        <span className="text-sm" style={{ color: 'rgb(var(--domain-search-info-text))' }}>Searching...</span>
                      </div>
                    )}
                  </div>
                </div>
            )}

          </motion.div>
        </div>
      </div>

      {/* Search Results Section */}
      {!isSearching && searchTerm.trim() && searchResults.length === 0 && !searchError && (
        <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-lg" style={{ color: 'rgb(var(--domain-search-text))' }}>
                No domains found for "{searchTerm}". Please try a different search term.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {searchResults.length > 0 && (
        <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2" style={{ color: 'rgb(var(--domain-search-heading))' }}>
                  Available Domains
                </h2>
                <p className="text-sm" style={{ color: 'rgb(var(--domain-search-text))' }}>
                  Found {searchResults.length} domain{searchResults.length !== 1 ? 's' : ''} for "{searchTerm}"
                </p>
              </div>
              
              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((result, index) => (
                  <motion.div
                    key={result.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="backdrop-blur-sm rounded-xl p-6 transition-all duration-300"
                    style={{ 
                      backgroundColor: 'rgba(var(--domain-search-card-bg))',
                      border: '1px solid rgb(var(--domain-search-card-border))'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(var(--domain-search-card-border-hover))';
                      e.currentTarget.style.boxShadow = `0 10px 15px -3px rgba(var(--domain-search-card-shadow-hover)), 0 4px 6px -2px rgba(var(--domain-search-card-shadow-hover))`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgb(var(--domain-search-card-border))';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold" style={{ color: 'rgb(var(--domain-search-card-name))' }}>{result.name}</h3>
                      <div className="flex items-center space-x-2">
                        {result.popular && (
                          <div className="flex items-center" style={{ color: 'rgb(var(--domain-search-popular-text))' }}>
                            <Star className="w-4 h-4 mr-1" style={{ color: 'rgb(var(--domain-search-popular-icon))' }} />
                            <span className="text-sm font-medium">Popular</span>
                          </div>
                        )}
                        {result.premium && (
                          <div className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(var(--domain-search-premium-bg))', color: 'rgb(var(--domain-search-premium-text))' }}>
                            Premium
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        {result.available ? (
                          <CheckCircle className="w-5 h-5 mr-2" style={{ color: 'rgb(var(--domain-search-available-icon))' }} />
                        ) : (
                          <XCircle className="w-5 h-5 mr-2" style={{ color: 'rgb(var(--domain-search-unavailable-icon))' }} />
                        )}
                        <span
                          className="font-medium"
                          style={{ color: result.available ? 'rgb(var(--domain-search-available-text))' : 'rgb(var(--domain-search-unavailable-text))' }}
                        >
                          {result.available ? "Available" : "Taken"}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <div className="text-2xl font-bold" style={{ color: 'rgb(var(--domain-search-price))' }}>
                            {result.currency === 'USD' ? '$' : result.currency + ' '}
                            {typeof result.price === 'number' ? result.price.toFixed(2) : result.price}
                          </div>
                          {result.originalPrice && result.originalPrice > result.price && (
                            <div className="text-sm line-through" style={{ color: 'rgb(var(--domain-search-original-price))' }}>
                              {result.currency === 'USD' ? '$' : result.currency + ' '}
                              {typeof result.originalPrice === 'number' ? result.originalPrice.toFixed(2) : result.originalPrice}
                            </div>
                          )}
                        </div>
                        <div className="text-sm" style={{ color: 'rgb(var(--domain-search-price-label))' }}>per year</div>
                      </div>
                    </div>

                    {result.available && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 rounded-lg font-medium transition-all duration-300"
                        style={{ 
                          backgroundColor: 'rgb(var(--domain-search-button-bg))',
                          color: 'rgb(var(--domain-search-button-text))'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgb(var(--domain-search-button-hover))';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgb(var(--domain-search-button-bg))';
                        }}
                      >
                        Add to Cart
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Domain Pricing Table - Only show when pricing tab is active */}
      {activeTab === "pricing" && (
        <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DomainPricingTable />
            </motion.div>
          </div>
        </section>
      )}

      {/* Back to Top Button */}
      <BackToTopButton />

      </div>
    </>
  );
};

export default DomainSearchPage;
