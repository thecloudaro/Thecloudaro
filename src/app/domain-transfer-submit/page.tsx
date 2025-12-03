"use client";

import React, { useState } from "react";
import SectionHeading from "@/components/ui/section-heading";
import TransferInstructionCard from "@/components/DomainTransferSubmit/TransferInstructionCard";
import TransferEmptyState from "@/components/DomainTransferSubmit/TransferEmptyState";
import EligibleDomainCard from "@/components/DomainTransferSubmit/EligibleDomainCard";
import NonEligibleDomainCard from "@/components/DomainTransferSubmit/NonEligibleDomainCard";

interface DomainData {
  domain: string;
  eligible: boolean;
  originalPrice?: string;
  currentPrice?: string;
  registrarLock?: "LOCKED" | "UNLOCKED";
  reason?: string;
}

export default function DomainTransferSubmitPage() {
  const [domainInput, setDomainInput] = useState("");
  const [domains, setDomains] = useState<DomainData[]>([]);

  const handleTransfer = () => {
    if (domainInput.trim()) {
      // In real app, this would check domain eligibility via API
      // For now, we'll just add it to the list if it's not already there
      const domainExists = domains.some((d) => d.domain === domainInput.trim());
      if (!domainExists) {
        // Simulate checking - you can modify this logic
        const isEligible = domainInput.trim() !== "test2.com";
        setDomains([
          ...domains,
          {
            domain: domainInput.trim(),
            eligible: isEligible,
            originalPrice: "US$9.98",
            currentPrice: "US$9.48",
            registrarLock: "LOCKED",
            reason: isEligible
              ? undefined
              : "This domain has not been registered and cannot be transferred.",
          },
        ]);
        setDomainInput("");
      }
    }
  };

  const handleRemoveDomain = (domain: string) => {
    setDomains(domains.filter((d) => d.domain !== domain));
  };

  const handleRemoveNonEligible = () => {
    setDomains(domains.filter((d) => d.eligible));
  };

  const eligibleDomains = domains.filter((d) => d.eligible);
  const nonEligibleDomains = domains.filter((d) => !d.eligible);

  return (
    <div
      className="min-h-screen pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 sm:pb-12 md:pb-16 relative"
      style={{ 
        backgroundColor: "rgb(var(--domain-transfer-submit-bg))",
        position: 'relative'
      }}
    >
      {/* Teal Gradient Background Effect for Upper Portion - Similar to reference image */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(130% 90% at 50% 20%, hsl(var(--gradient-teal) / 0.25) 0%, rgba(0,0,0,0) 60%),
            radial-gradient(90% 70% at 50% 15%, hsl(var(--gradient-turquoise) / 0.15) 0%, rgba(0,0,0,0) 55%)
          `
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Domain Input Section - Reusing Transfer Hero Search Bar */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto">
            <div 
              className="flex items-stretch backdrop-blur-md rounded-full p-1.5 sm:p-2 border shadow-lg"
              style={{
                backgroundColor: "#1d1f1d",
                borderColor: "rgb(var(--hero-search-border))"
              }}
            >
              <div className="flex items-center flex-1 px-3 sm:px-4">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3"
                  style={{ color: 'rgb(var(--transfer-hero-icon))' }}
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
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleTransfer();
                    }
                  }}
                  placeholder="Type your domain to transfer..."
                  className="flex-1 bg-transparent text-hero-text placeholder-hero-text-muted text-sm sm:text-base focus:outline-none"
                />
              </div>
              <button 
                onClick={handleTransfer}
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-sm sm:text-base transition whitespace-nowrap"
                style={{ 
                  backgroundColor: 'rgb(var(--transfer-hero-button-bg))',
                  color: 'rgb(var(--transfer-hero-button-text))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(var(--transfer-hero-button-hover))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(var(--transfer-hero-button-bg))';
                }}
              >
                Transfer
              </button>
            </div>
          </div>
        </div>

         {/* Get Ready to Transfer Section */}
         <div className="mb-8 sm:mb-10 md:mb-12">
           <SectionHeading
             heading="Get ready to transfer"
             headingTag="h2"
             headingClassName="text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 !text-[rgb(var(--domain-transfer-submit-heading))]"
             align="center"
           />

           {/* Instruction Cards */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 max-w-2xl mx-auto">
             <TransferInstructionCard
               title="Unlock your domains"
               description="If your domain has a registrar lock enabled to prevent unauthorised transfers, this must be disabled at your current registrar."
             />
             <TransferInstructionCard
               title="Get your authorisation code"
               description="The authorisation code (also known as EPP, auth code, or transfer code) is provided by your current registrar."
             />
           </div>
         </div>

         {/* Non-Eligible Domains Section */}
        {nonEligibleDomains.length > 0 && (
          <div className="mb-4 sm:mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <SectionHeading
                heading="Not eligible for transfer"
                headingTag="h2"
                headingClassName="text-sm font-bold !text-[rgb(var(--domain-transfer-submit-heading))]"
                align="left"
              />
              <button
                onClick={handleRemoveNonEligible}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition"
                style={{
                  color: "rgb(var(--domain-transfer-submit-item-label))",
                  backgroundColor: "rgba(var(--domain-transfer-submit-item-bg))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(var(--domain-transfer-submit-card-bg))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(var(--domain-transfer-submit-item-bg))";
                }}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span className="hidden sm:inline">Remove non-eligible</span>
                <span className="sm:hidden">Remove</span>
              </button>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {nonEligibleDomains.map((domain, index) => (
                <NonEligibleDomainCard
                  key={index}
                  domain={domain.domain}
                  reason={domain.reason || "This domain is not eligible for transfer."}
                  onRemove={() => handleRemoveDomain(domain.domain)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State - Show only when no domains */}
        {domains.length === 0 && <TransferEmptyState />}

        {/* Eligible Domains Section - Below Empty State */}
        {eligibleDomains.length > 0 && (
          <div className="mb-4 sm:mb-6 md:mb-8">
            <SectionHeading
              heading="Domains eligible for transfer"
              headingTag="h2"
              headingClassName="text-sm font-bold mb-2 sm:mb-3 !text-[rgb(var(--domain-transfer-submit-heading))]"
              align="left"
            />
            <div className="space-y-2 sm:space-y-3">
              {eligibleDomains.map((domain, index) => (
                <EligibleDomainCard
                  key={index}
                  domain={domain.domain}
                  originalPrice={domain.originalPrice || ""}
                  currentPrice={domain.currentPrice || ""}
                  registrarLock={domain.registrarLock || "LOCKED"}
                  onRemove={() => handleRemoveDomain(domain.domain)}
                />
              ))}
            </div>
            
            {/* Footer - Add to cart and Total pricing (Outside card) */}
            <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t" style={{ borderColor: "rgb(var(--domain-transfer-submit-summary-border))" }}>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs line-through"
                  style={{ color: "rgb(var(--domain-transfer-submit-summary-item))" }}
                >
                  {eligibleDomains[0]?.originalPrice || ''}
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: "rgb(var(--domain-transfer-submit-summary-total))" }}
                >
                  {eligibleDomains[0]?.currentPrice || ''}
                </span>
              </div>
              <button
                className="px-4 py-2 rounded-lg font-medium text-sm transition whitespace-nowrap flex items-center gap-1.5"
                style={{
                  backgroundColor: "rgb(var(--domain-transfer-submit-button-bg))",
                  color: "rgb(var(--domain-transfer-submit-button-text))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(var(--domain-transfer-submit-button-hover))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgb(var(--domain-transfer-submit-button-bg))";
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Add to cart</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

