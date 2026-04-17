"use client";

import { useEffect, useMemo, useState } from "react";
import TLDSearchBar from "@/components/ui/tld-search-bar";
import SectionHeading from "@/components/ui/section-heading";

interface TransferPricingRow {
  tld: string;
  transferPrice: number;
  renewPrice: number;
  currency: string;
}

const TransferPricing = () => {
  const [tldSearchTerm, setTldSearchTerm] = useState("");
  const [allRows, setAllRows] = useState<TransferPricingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const res = await fetch("/api/domain-tld-pricing", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok || !data?.success || !Array.isArray(data?.tlds)) {
          setLoadError(data?.error || "Unable to load transfer pricing right now.");
          setAllRows([]);
          return;
        }

        const rows: TransferPricingRow[] = data.tlds
          .map((item: Record<string, unknown>) => ({
            tld: String(item.tld || "").toLowerCase(),
            transferPrice: Number(item.transferPrice ?? 0),
            renewPrice: Number(item.renewPrice ?? 0),
            currency: String(item.currency || "USD").toUpperCase(),
          }))
          .filter((row: TransferPricingRow) => row.tld.startsWith("."));

        setAllRows(rows);
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : "Failed to load transfer pricing.");
        setAllRows([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredRows = useMemo(
    () =>
      allRows.filter((row) =>
        row.tld.toLowerCase().includes(tldSearchTerm.trim().toLowerCase())
      ),
    [allRows, tldSearchTerm]
  );

  useEffect(() => {
    setVisibleCount(20);
  }, [tldSearchTerm, allRows.length]);

  const visibleRows = filteredRows.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRows.length;

  const formatPrice = (value: number, currency: string) =>
    Number.isFinite(value) && value > 0 ? `${currency} ${value.toFixed(2)}` : "—";

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32 relative bg-transfer-pricing">
      {/* Teal gradient at bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bottom-0 z-0"
        style={{
          background: `
            radial-gradient(130% 90% at 50% 115%, hsl(var(--gradient-teal) / 0.34) 0%, transparent 64%)
          `
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading + Description (same component style as hero) */}
        <div className="mb-10 sm:mb-12 md:mb-14">
          <SectionHeading
            heading="Domain transfer prices"
            description="Lower rates, higher savings."
            headingTag="h2"
            headingClassName="text-[3.2rem] sm:text-[3.5rem] md:text-[4rem] font-bold leading-tight text-transfer-pricing-heading"
            descriptionClassName="text-xl sm:text-2xl md:text-3xl max-w-4xl mx-auto mt-2 text-transfer-pricing-description"
          />
        </div>

        {/* Get 1-year renewal note */}
        <p className="text-xs sm:text-base md:text-lg text-center mb-6 mt-30 text-transfer-pricing-note">
          Get 1-year renewal with every transfer.
        </p>

        {/* Controls row: TLD search + Recommended button */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10">
            <div className="relative w-full sm:w-54" style={{ height: '32px' }}>
              <TLDSearchBar
                value={tldSearchTerm}
                onChange={setTldSearchTerm}
                containerClassName="!p-0 !py-1 !px-2 !pl-3 h-full"
                inputClassName="text-xs h-full text-transfer-pricing-search-text placeholder-transfer-pricing-search"
                bgColor="rgb(var(--transfer-pricing-search-bg))"
                borderColor="rgb(var(--transfer-pricing-search-border))"
              />
            </div>
            <div>
              <button 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] bg-transfer-pricing-recommended text-transfer-pricing-recommended hover:bg-transfer-pricing-recommended-hover"
                style={{ 
                  border: 'none',
                }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7l4-4 4 4M8 17l4 4 4-4"/></svg>
                Recommended
              </button>
            </div>
          </div>
        </div>

        {/* TLD Pricing table-like list */}
        <div className="flex justify-center mt-2">
          <div className="w-fit rounded-lg overflow-hidden" style={{ backgroundColor: 'transparent', border: 'none' }}>
            {loading && (
              <div className="px-4 py-6 text-sm text-transfer-pricing-note">Loading transfer pricing...</div>
            )}
            {loadError && !loading && (
              <div className="px-4 py-6 text-sm text-transfer-pricing-note">{loadError}</div>
            )}
            {!loading && !loadError && visibleRows.length === 0 && (
              <div className="px-4 py-6 text-sm text-transfer-pricing-note">No TLDs found for this filter.</div>
            )}
            {!loading && !loadError &&
              visibleRows.map((row, idx) => (
                <div key={`${row.tld}-${idx}`} className="flex flex-col md:flex-row md:gap-4 items-center px-4 py-4 relative">
                  <div className="w-full md:w-4/12 flex items-center justify-center md:justify-start gap-3">
                    <span className="font-semibold text-2xl text-transfer-pricing-tld">{row.tld}</span>
                    <svg className="w-4 h-4 text-transfer-pricing-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <div className="w-full md:w-8/12 flex flex-col items-center md:items-start mt-4 md:mt-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-transfer-pricing-label">Transfer</span>
                    </div>
                    <div className="font-semibold text-transfer-pricing-price">
                      {formatPrice(row.transferPrice, row.currency)}
                    </div>
                    <div className="mt-1 text-sm text-transfer-pricing-label">
                      Renew: {formatPrice(row.renewPrice, row.currency)}
                    </div>
                  </div>
                  {idx < visibleRows.length - 1 && (
                    <div className="absolute bottom-0 left-4 right-4" style={{ 
                      height: '1px', 
                      background: 'rgb(var(--transfer-pricing-divider))' 
                    }}></div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* See More Button */}
        {hasMore && !loading && !loadError && (
          <div className="text-center mt-12">
            <button
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm sm:text-base font-semibold transition-all bg-transfer-pricing-recommended text-transfer-pricing-recommended hover:bg-transfer-pricing-recommended-hover"
              onClick={() => setVisibleCount((prev) => prev + 20)}
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferPricing;

