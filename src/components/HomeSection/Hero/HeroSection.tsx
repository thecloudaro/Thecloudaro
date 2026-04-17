'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from './Button';
import ChatButton from '../ChatButton';
import { buildDomainBuyUrl } from '@/lib/upmind/domainCheckoutUrl';

interface DomainResult {
  name: string;
  available: boolean;
  price: number;
  renewPrice?: number;
  transferPrice?: number;
  currency: string;
  tld?: string;
  productId?: string;
  billingCycleMonths?: number;
  popular?: boolean;
}

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [results, setResults] = useState<DomainResult[]>([]);
  const heroSearchRequestId = useRef(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sortDomainResults = (items: DomainResult[]): DomainResult[] => {
    return [...items].sort((a, b) => {
      if (a.available !== b.available) return a.available ? -1 : 1;
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return a.price - b.price;
    });
  };

  const handleSearch = async () => {
    const value = searchTerm.trim();
    if (!value) return;

    const id = ++heroSearchRequestId.current;
    setIsSearching(true);
    setSearchError(null);
    setResults([]);

    try {
      const res = await fetch(`/api/domain-search?term=${encodeURIComponent(value)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      });
      const data = await res.json();

      if (!res.ok || !data?.success || !Array.isArray(data?.domains)) {
        if (id !== heroSearchRequestId.current) return;
        setSearchError(data?.error || 'Unable to search domain right now.');
        return;
      }

      const list = data.domains as DomainResult[];
      if (!list.length) {
        if (id !== heroSearchRequestId.current) return;
        setSearchError('No domain result found for this search.');
        return;
      }

      if (id !== heroSearchRequestId.current) return;
      setResults(sortDomainResults(list));
    } catch {
      if (id !== heroSearchRequestId.current) return;
      setSearchError('Network error while searching domain.');
    } finally {
      if (id === heroSearchRequestId.current) {
        setIsSearching(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-visible pt-2 sm:pt-6 lg:pt-10 bg-transparent transition-colors duration-500">
      {/* Background Image - Fixed to cover entire viewport from top */}
      <motion.div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/BgPics/bg3.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          zIndex: 0
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Main Content — no scroll-linked fade/scale so copy stays visible when scrolling up/down */}
      <motion.div
        className="relative z-30 flex flex-col items-center justify-start pt-20 sm:pt-24 md:pt-28 lg:pt-40 px-4 sm:px-6 md:px-8 lg:px-10 text-center"
      >
        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight text-[hsl(var(--hero-text))]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Register your domain
        </motion.h1>

        {/* Domain Search Section */}
        <motion.div
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
         {/* Tabs */}
         <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
  <div className="backdrop-blur-md transition rounded-full p-1 flex shadow-md bg-[hsl(var(--hero-tab-bg))] border border-[hsl(var(--hero-search-border))]">
    {["register", "transfer"].map((tab) => (
      <Button
        key={tab}
        label={tab.charAt(0).toUpperCase() + tab.slice(1)}
        isActive={activeTab === tab}
        onClick={() => setActiveTab(tab)}
      />
    ))}
  </div>
</div>


          {/* Search Bar */}
          <div className="relative w-full mb-4 sm:mb-6 md:mb-8">
            <div className="flex items-stretch backdrop-blur-md rounded-full p-1 sm:p-2 border shadow-lg bg-[hsl(var(--hero-search-bg))] border-[hsl(var(--hero-search-border))]">
              <div className="flex items-center flex-1 px-2 sm:px-4">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(var(--hero-section-search-icon))] mr-2 sm:mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSearchTerm(v);
                    if (!v.trim()) {
                      heroSearchRequestId.current += 1;
                      setResults([]);
                      setSearchError(null);
                      setIsSearching(false);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                  placeholder="Search for a domain name..."
                  className="flex-1 bg-transparent text-sm sm:text-base focus:outline-none placeholder:text-xs sm:placeholder:text-sm text-[hsl(var(--hero-text))] placeholder:text-[hsl(var(--hero-text-muted))]"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="text-[hsl(var(--hero-section-search-button-text))] px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-base relative"
                style={{
                  background: 'hsl(var(--hero-section-search-button-bg))',
                  border: '1px solid rgba(var(--hero-section-search-button-border-rgb))',
                }}
              >
                <span 
                  className="absolute inset-0 rounded-full opacity-40"
                  style={{
                    background:
                      'radial-gradient(circle at top, rgba(var(--hero-section-search-button-glow)) 0%, transparent 70%)',
                  }}
                />
                <span className="relative z-10">{isSearching ? 'Searching...' : 'Search'}</span>
              </button>
            </div>
          </div>

          {(searchError || results.length > 0) && (
            <div className="mb-4 sm:mb-6 md:mb-8 w-full rounded-2xl border backdrop-blur-md px-4 py-3 text-left border-[hsl(var(--hero-search-border))] bg-[hsl(var(--hero-search-bg))]">
              {searchError ? (
                <p className="text-xs sm:text-sm text-[hsl(var(--hero-text-muted))]">{searchError}</p>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-xs sm:text-sm text-[hsl(var(--hero-text-muted))]">
                      {results.length} extension{results.length !== 1 ? 's' : ''} ·{' '}
                      {results.filter((r) => r.available).length} available ·{' '}
                      {results.filter((r) => !r.available).length} unavailable
                    </p>
                    <Link
                      href={`/domain-search?term=${encodeURIComponent(searchTerm.trim())}`}
                      className="text-xs sm:text-sm font-medium underline underline-offset-2 hover:opacity-90 text-[hsl(var(--hero-text))]"
                    >
                      Open full page
                    </Link>
                  </div>
                  <div className="max-h-64 sm:max-h-80 overflow-y-auto space-y-2 pr-1 -mr-1">
                    {results.map((row) => (
                      <div
                        key={row.name}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl border px-3 py-2 border-[hsl(var(--hero-search-border)/0.55)] bg-[hsl(0_0%_100%/0.06)] backdrop-blur-sm"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm sm:text-base font-semibold truncate text-[hsl(var(--hero-text))]">
                            {row.name}
                          </p>
                          <p className="text-xs text-[hsl(var(--hero-text-muted))]">
                            {row.available ? (
                              <>
                                <span className="font-medium text-[hsl(var(--hero-text))]">Available</span>
                                {activeTab === 'transfer' ? (
                                  <>
                                    {' · '}Transfer {row.currency}{' '}
                                    {(row.transferPrice ?? row.price).toFixed(2)}
                                  </>
                                ) : (
                                  <>
                                    {' · '}Register {row.currency} {row.price.toFixed(2)}
                                    {' · '}Transfer {row.currency}{' '}
                                    {(row.transferPrice ?? row.price).toFixed(2)}
                                    {' · '}Renew {row.currency}{' '}
                                    {(row.renewPrice ?? row.price).toFixed(2)}
                                  </>
                                )}
                              </>
                            ) : (
                              <span className="font-medium text-[hsl(var(--hero-text))] opacity-70">Unavailable</span>
                            )}
                          </p>
                        </div>
                        <div className="shrink-0 flex sm:justify-end">
                          {activeTab === 'transfer' ? (
                            <Link
                              href={`/domain/transfer/submit?domain=${encodeURIComponent(row.name)}`}
                              className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold text-[hsl(var(--hero-section-search-button-text))]"
                              style={{
                                background: 'hsl(var(--hero-section-search-button-bg))',
                                border: '1px solid rgba(var(--hero-section-search-button-border-rgb))',
                              }}
                            >
                              Transfer
                            </Link>
                          ) : row.available ? (
                            <a
                              href={buildDomainBuyUrl({
                                domainName: row.name,
                                productId: row.productId,
                                billingCycleMonths: row.billingCycleMonths,
                              })}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold text-[hsl(var(--hero-section-search-button-text))]"
                              style={{
                                background: 'hsl(var(--hero-section-search-button-bg))',
                                border: '1px solid rgba(var(--hero-section-search-button-border-rgb))',
                              }}
                            >
                              Add to cart
                            </a>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1.5 text-xs text-[hsl(var(--hero-text-muted))]">
                              —
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}


         {/* Price snippet */}
<motion.div
  className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 flex-wrap"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
  transition={{ duration: 0.6, delay: 1.6 }}
>
  {[
    { label: ".com only $8.88", variant: "domain-pill--com" },
    { label: ".net only $11.20", variant: "domain-pill--com" },
    { label: ".org only $9.88", variant: "domain-pill--com" },
    { label: ".io only $39.00", variant: "domain-pill--com" },
  ].map((item, idx) => (
    <div
      key={idx}
      className={`domain-pill ${item.variant} backdrop-blur-md border rounded-2xl shadow-md border-[hsl(var(--hero-price-border))]`}
    >
      <Button label={item.label} />
    </div>
  ))}
        </motion.div>
      </motion.div>
    </motion.div>

    <ChatButton onClick={() => console.log("Chat opened")} isLoaded={isLoaded} />
  </div>
  );
};

export default HeroSection;
