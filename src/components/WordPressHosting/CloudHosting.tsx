"use client";

import { useState, forwardRef, ForwardedRef } from "react";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import CloudHostingPlans from "./CloudHostingPlans";

type BillingCycle = "monthly" | "yearly";

interface CloudHostingProps {
  heading?: string;
  subtitle?: string;
  onCompareClick?: () => void;
}

const CloudHosting = forwardRef<HTMLElement, CloudHostingProps>(({ heading = "Packages WordPress Hosting", subtitle = "Terms Monthly and Yearly.", onCompareClick }, ref: ForwardedRef<HTMLElement>) => {
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ color: 'rgb(var(--wp-cloudhosting-heading))' }}>
      {/* Background layers should not block clicks */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-[500px] overflow-hidden sm:h-[540px] lg:h-[600px]">
          <Image
            src="/WordPress/CloudHostingBg.jpeg"
            alt="Cloud hosting background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(var(--wp-cloudhosting-overlay))' }} />
        </div>
        <div className="absolute inset-0 top-[500px] sm:top-[540px] lg:top-[600px]" style={{ backgroundColor: 'rgb(var(--wp-cloudhosting-bg))' }} />
      </div>

      <div className="relative pointer-events-auto mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-12 text-center sm:px-10 sm:pt-16 lg:pb-[56px] lg:pt-[64px]">
       

        <ContentHeading
          title={heading}
          className="!text-[2.75rem] sm:!text-[3.5rem] md:!text-[4.5rem] font-bold !text-[rgb(var(--wp-cloudhosting-heading))]"
        />

        <ContentDescription
          size="lg"
          text={subtitle}
          className="mt-6 max-w-3xl sm:text-xl leading-relaxed !text-[rgb(var(--wp-cloudhosting-description))]"
        />

        <div
          className="relative isolate z-[9999] mt-10 inline-flex items-center gap-2 rounded-full p-2 backdrop-blur pointer-events-auto"
          style={{ backgroundColor: 'rgba(var(--wp-cloudhosting-toggle-bg))' }}
        >
          {(["monthly", "yearly"] as BillingCycle[]).map((cycle) => {
            const isActive = billing === cycle;
            return (
              <button
                key={cycle}
                type="button"
                onClick={() => {
                  console.log('[CloudHosting] Toggle clicked:', cycle);
                  setBilling(cycle);
                }}
                className="relative z-[9999] cursor-pointer rounded-full px-6 py-2 text-sm font-semibold capitalize transition-all duration-200 ease-in-out pointer-events-auto"
                style={{
                  backgroundColor: isActive ? 'rgb(var(--wp-cloudhosting-button-active-bg))' : 'transparent',
                  color: isActive ? 'rgb(var(--wp-cloudhosting-button-active-text))' : 'rgba(var(--wp-cloudhosting-button-inactive))',
                  pointerEvents: 'auto',
                }}
                aria-pressed={isActive}
                aria-label={`Switch to ${cycle} billing`}
              >
                {cycle}
              </button>
            );
          })}
        </div>
      </div>

      <CloudHostingPlans
        billing={billing}
        onCompareClick={onCompareClick}
      />
    </section>
  );
});

CloudHosting.displayName = 'CloudHosting';

export default CloudHosting;


