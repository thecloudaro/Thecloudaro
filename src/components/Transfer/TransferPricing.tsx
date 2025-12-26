"use client";

import { useState } from "react";
import TLDSearchBar from "@/components/ui/tld-search-bar";
import WhiteButton from "@/components/ui/white-button";
import SectionHeading from "@/components/ui/section-heading";

const TransferPricing = () => {
  const [tldSearchTerm, setTldSearchTerm] = useState("");
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32 relative bg-transfer-pricing">
      {/* Teal gradient at bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bottom-0 z-0"
        style={{
          background: `
            radial-gradient(130% 90% at 50% 115%, hsl(var(--gradient-teal) / 0.34) 0%, rgba(0,0,0,0) 64%)
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
        <p className="text-xs sm:text-base md:text-md text-center mb-6 mt-30 text-transfer-pricing-note">
          Get 1-year renewal with every transfer.
        </p>

        {/* Controls row: TLD search + Recommended button */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-4 sm:gap-6 ml-78 mt-10">
            <div className="relative w-54" style={{ height: '32px' }}>
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
                className="inline-flex ml-60 gap-1.5 px-3 py-1.5 rounded-full text-[10px] bg-transfer-pricing-recommended text-transfer-pricing-recommended hover:bg-transfer-pricing-recommended-hover"
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
          <div className="w-fit rounded-lg overflow-hidden ml-60" style={{ backgroundColor: 'transparent', border: 'none' }}>
          {
            (() => {
              const tlds: { tld: string; price: string; original?: string; sale?: boolean }[] = [
                { tld: '.com', price: '$9.48', original: '$9.98', sale: true },
                { tld: '.org', price: '$9.50', original: '$9.80', sale: true },
                { tld: '.net', price: '$10.20' },
                { tld: '.io', price: '$39.00' },
                { tld: '.co', price: '$22.00', original: '$28.00', sale: true },
                { tld: '.ai', price: '$69.00' },
                { tld: '.app', price: '$14.50' },
                { tld: '.dev', price: '$12.80' },
                { tld: '.info', price: '$11.90' },
                { tld: '.biz', price: '$12.40' },
                { tld: '.online', price: '$3.88', original: '$29.00', sale: true },
                { tld: '.shop', price: '$1.99', original: '$35.00', sale: true },
                { tld: '.store', price: '$2.99', original: '$49.00', sale: true },
                { tld: '.me', price: '$16.00' },
                { tld: '.xyz', price: '$1.10', original: '$12.00', sale: true },
                { tld: '.tech', price: '$6.99', original: '$39.99', sale: true },
                { tld: '.cloud', price: '$7.99', original: '$19.99', sale: true },
                { tld: '.site', price: '$1.49', original: '$29.99', sale: true },
                { tld: '.live', price: '$3.99', original: '$21.99', sale: true },
                { tld: '.blog', price: '$4.99', original: '$19.99', sale: true },
                { tld: '.pro', price: '$9.99', original: '$17.99', sale: true },
                { tld: '.space', price: '$1.59', original: '$19.99', sale: true }
              ];
              const filteredTlds = tlds.filter(tld =>
                tld.tld.toLowerCase().includes(tldSearchTerm.toLowerCase())
              );
              return filteredTlds.map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-20 items-center px-4 py-4 relative">
                  <div className="col-span-12 md:col-span-5 flex items-center justify-center md:justify-start gap-3">
                    <span className="font-semibold text-2xl text-transfer-pricing-tld">{row.tld}</span>
                    <svg className="w-4 h-4 text-transfer-pricing-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <div className="col-span-12 md:col-span-7 flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-transfer-pricing-label">Transfer and renew</span>
                      {row.sale && <span className="text-[10px] px-2 py-0.5 rounded bg-transfer-pricing-sale-badge text-transfer-pricing-sale-badge-text">SALE</span>}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-transfer-pricing-price">{row.price}</span>
                      {row.original && <span className="line-through text-sm text-transfer-pricing-original-price">{row.original}</span>}
                    </div>
                  </div>
                  {idx < filteredTlds.length - 1 && (
                    <div className="absolute bottom-0 left-4 md:left-4" style={{ 
                      width: 'calc(41.67% + 5rem + 18% - 1rem)', 
                      height: '1px', 
                      background: 'rgb(var(--transfer-pricing-divider))' 
                    }}></div>
                  )}
                </div>
              ));
            })()
          }
          </div>
        </div>

        {/* See More Button */}
        <div className="text-center mt-12">
          <WhiteButton>
            See More
          </WhiteButton>
        </div>
      </div>
    </div>
  );
};

export default TransferPricing;

