"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { CircleDesign } from "./CircleDesign";
import DomainExtensions from "@/components/Domain/DomainExtensions";
import { buildDomainBuyUrl } from "@/lib/upmind/domainCheckoutUrl";

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

export default function DomainHeroSection() {
  const [domainValue, setDomainValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTypewriterMode, setIsTypewriterMode] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [results, setResults] = useState<DomainResult[]>([]);
  const [inputMountKey, setInputMountKey] = useState(0);
  const searchRequestId = useRef(0);

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
    const value = domainValue.trim();
    if (!value) {
      return;
    }

    const id = ++searchRequestId.current;
    setIsSearching(true);
    setSearchError(null);
    setResults([]);

    try {
      const res = await fetch(`/api/domain-search?term=${encodeURIComponent(value)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });
      const data = await res.json();

      if (!res.ok || !data?.success || !Array.isArray(data?.domains)) {
        if (id !== searchRequestId.current) return;
        setSearchError(data?.error || "Unable to search domain right now.");
        return;
      }

      const list = data.domains as DomainResult[];
      if (!list.length) {
        if (id !== searchRequestId.current) return;
        setSearchError("No domain result found for this search.");
        return;
      }

      if (id !== searchRequestId.current) return;
      setResults(sortDomainResults(list));
    } catch {
      if (id !== searchRequestId.current) return;
      setSearchError("Network error while searching domain.");
    } finally {
      if (id === searchRequestId.current) {
        setIsSearching(false);
      }
    }
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-[hsl(var(--footer-bg-primary))]
     via-[hsl(var(--footer-bg-secondary))] to-[hsl(var(--footer-bg-secondary))] 
     overflow-hidden pt-12 sm:pt-14 md:pt-16"
      style={{ color: "rgb(var(--domain-hero-text-gray-300))" }}
    >
      <div className="">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-4 sm:pb-6 md:pb-8 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 space-y-6 text-center max-w-2xl mx-auto"
          >
            <h2
              className="text-xl sm:text-2xl md:text-3xl"
              style={{ color: "rgb(var(--domain-hero-text-gray-400))" }}
            >
              Start typing...
            </h2>

            {/* Domain Input Field with Typewriter Effect */}
            <div className="relative">
              {isTypewriterMode ? (
                <div
                  className="w-full text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight cursor-pointer"
                  style={{ color: "rgba(var(--domain-hero-text-gray-100-50))" }}
                  onClick={() => {
                    setIsTypewriterMode(false);
                    setDomainValue("");
                    setInputMountKey((k) => k + 1);
                    searchRequestId.current += 1;
                    setResults([]);
                    setSearchError(null);
                    setIsSearching(false);
                  }}
                >
                  <Typewriter
                    options={{
                      strings: ["youridea.com"],
                      autoStart: true,
                      loop: true,
                      delay: 100,
                      deleteSpeed: 50,
                      cursor: "|",
                    }}
                  />
                </div>
              ) : (
                <input
                  key={inputMountKey}
                  type="text"
                  value={domainValue}
                  onChange={(e) => {
                    const v = e.target.value;
                    setDomainValue(v);
                    if (!v.trim()) {
                      searchRequestId.current += 1;
                      setResults([]);
                      setSearchError(null);
                      setIsSearching(false);
                    }
                  }}
                  onBlur={() => {
                    if (domainValue.trim() === "") {
                      setIsTypewriterMode(true);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setIsTypewriterMode(true);
                    }
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="w-full text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight bg-transparent border-transparent outline-none transition-all duration-300 text-center"
                  style={{ color: "rgb(var(--hosting-text-white))" }}
                  placeholder=""
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  aria-label="Domain or brand name to search"
                  autoFocus
                />
              )}
            </div>

            <p
              className="text-xl sm:text-2xl md:text-3xl"
              style={{ color: "rgb(var(--domain-hero-text-gray-400))" }}
            >
              Start your online story. Register a domain.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[hsl(var(--gradient-teal))] hover:bg-[hsl(var(--gradient-teal))]/80 px-8 py-4 rounded-full text-[rgb(var(--hosting-text-white))] transition-all duration-300 text-lg font-medium mx-auto"
              onClick={handleSearch}
              disabled={isSearching || !domainValue.trim()}
            >
              {isSearching ? "Searching..." : "Search"}
            </motion.button>

            {/* Error / multi-TLD results (same API + behaviour as homepage hero) */}
            {(searchError || results.length > 0) && (
              <div
                className="mt-4 w-full max-w-xl mx-auto rounded-2xl border px-4 py-3 text-left backdrop-blur-md"
                style={{
                  borderColor: "rgba(148, 163, 184, 0.35)",
                  backgroundColor: "rgba(15,23,42,0.65)",
                }}
              >
                {searchError ? (
                  <p className="text-sm sm:text-base" style={{ color: "hsl(var(--domain-hero-error))" }}>
                    {searchError}
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-xs sm:text-sm" style={{ color: "rgb(var(--domain-hero-text-gray-400))" }}>
                        {results.length} extension{results.length !== 1 ? "s" : ""} ·{" "}
                        {results.filter((r) => r.available).length} available ·{" "}
                        {results.filter((r) => !r.available).length} unavailable
                      </p>
                      <Link
                        href={`/domain-search?term=${encodeURIComponent(domainValue.trim())}`}
                        className="text-xs sm:text-sm font-medium underline underline-offset-2 hover:opacity-90"
                        style={{ color: "rgb(var(--hosting-text-white))" }}
                      >
                        Open full page
                      </Link>
                    </div>
                    <div className="max-h-64 sm:max-h-80 overflow-y-auto space-y-2 pr-1 -mr-1 text-left">
                      {results.map((row) => (
                        <div
                          key={row.name}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl border px-3 py-2 backdrop-blur-sm"
                          style={{
                            borderColor: "rgba(148, 163, 184, 0.25)",
                            backgroundColor: "rgba(255,255,255,0.06)",
                          }}
                        >
                          <div className="min-w-0 flex-1">
                            <p
                              className="text-sm sm:text-base font-semibold truncate"
                              style={{ color: "rgb(var(--hosting-text-white))" }}
                            >
                              {row.name}
                            </p>
                            <p className="text-xs" style={{ color: "rgb(var(--domain-hero-text-gray-400))" }}>
                              {row.available ? (
                                <>
                                  <span className="font-medium" style={{ color: "rgb(var(--hosting-text-white))" }}>
                                    Available
                                  </span>
                                  {" · "}Register {row.currency} {row.price.toFixed(2)}
                                  {" · "}Transfer {row.currency} {(row.transferPrice ?? row.price).toFixed(2)}
                                  {" · "}Renew {row.currency} {(row.renewPrice ?? row.price).toFixed(2)}
                                </>
                              ) : (
                                <span className="font-medium opacity-70" style={{ color: "rgb(var(--hosting-text-white))" }}>
                                  Unavailable
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="shrink-0 flex sm:justify-end">
                            {row.available ? (
                              <a
                                href={buildDomainBuyUrl({
                                  domainName: row.name,
                                  productId: row.productId,
                                  billingCycleMonths: row.billingCycleMonths,
                                })}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold text-[rgb(var(--hosting-text-white))] bg-[hsl(var(--gradient-teal))] hover:bg-[hsl(var(--gradient-teal))]/80 transition-colors"
                              >
                                Add to cart
                              </a>
                            ) : (
                              <Link
                                href={`/domain/transfer/submit?domain=${encodeURIComponent(row.name)}`}
                                className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold text-[rgb(var(--hosting-text-white))] bg-[hsl(var(--gradient-teal))] hover:bg-[hsl(var(--gradient-teal))]/80 transition-colors"
                              >
                                Transfer
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          <CircleDesign className="mr-1 sm:mr-2 md:mr-3 lg:mr-4 xl:mr-5 mt-6" />
        </div>
      </div>

      {/* Diagonal Section Divider */}
      <div className="relative">
        <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,120L1200,5L1200,120L0,120Z"
            fill="rgb(var(--domain-hero-section-bg))"
            opacity="1"
          />
        </svg>
      </div>
      {/* Transfer Pricing Section */}
      <div style={{ backgroundColor: "rgb(var(--domain-hero-section-bg))", position: "relative" }}>
        <DomainExtensions />
      </div>
    </div>
    // </div>
  );
}