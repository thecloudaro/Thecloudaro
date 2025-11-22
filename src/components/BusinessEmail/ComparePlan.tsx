"use client";

import { useState } from "react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import HostingPlanControls, { BillingCycle } from "@/components/Hosting/HostingPlanControls";
import { Info } from "lucide-react";

const ComparePlan = () => {
  const [billing, setBilling] = useState<BillingCycle>("yearly");

  const plans = [
    {
      name: "Advanced",
      pricing: {
        monthly: 2.5,
        yearly: 20.08,
        biyearly: 38.0,
      },
    },
    {
      name: "Pro",
      pricing: {
        monthly: 0.99,
        yearly: 6.88,
        biyearly: 12.0,
      },
    },
    {
      name: "Starter",
      pricing: {
        monthly: 0.79,
        yearly: 5.64,
        biyearly: 10.0,
      },
    },
  ];

  const suffixMap: Record<BillingCycle, string> = {
    monthly: "/mo",
    yearly: "/yr",
    biyearly: "/2yr",
  };

  const featureRows = [
    {
      label: "For your custom domain",
      helper: "",
      sideNote: "",
      values: [
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
      ],
      hasInfo: true,
    },
    {
      label: "Mailboxes included",
      helper: "",
      sideNote: "",
      values: [
        { stat: "5", description: "" },
        { stat: "1", description: "" },
        { stat: "1", description: "" },
      ],
      hasInfo: true,
    },
    {
      label: "Price for an additional mailbox",
      helper: "",
      sideNote: "",
      values: [
        { stat: "$6.88", description: "" },
        { stat: "$8.88", description: "" },
        { stat: "$8.88", description: "" },
      ],
      hasInfo: true,
    },
    {
      label: "Storage per mailbox",
      helper: "",
      sideNote: "",
      values: [
        { stat: "10", description: "GB" },
        { stat: "5", description: "GB" },
        { stat: "3", description: "GB" },
      ],
      hasInfo: false,
    },
    {
      label: "Additional mailbox storage",
      helper: "",
      sideNote: "",
      values: [
        { stat: "$10.00", description: "per 10 GB" },
        { stat: "$10.00", description: "per 10 GB" },
        { stat: "$10.00", description: "per 10 GB" },
      ],
      hasInfo: true,
    },
    {
      label: "Aliases",
      helper: "",
      sideNote: "",
      values: [
        { stat: "Unlimited", description: "" },
        { stat: "10", description: "" },
        { stat: "5", description: "" },
      ],
      hasInfo: true,
    },
    {
      label: "Catch-all",
      helper: "",
      sideNote: "",
      values: [
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
      ],
      hasInfo: true,
    },
    {
      label: "Built-in Calendar",
      helper: "",
      sideNote: "",
      values: [
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
      ],
      hasInfo: false,
    },
    {
      label: "IMAP/SMTP/POP3",
      helper: "",
      sideNote: "",
      values: [
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
      ],
      hasInfo: false,
    },
    {
      label: "AI email assistant",
      helper: "",
      sideNote: "",
      values: [
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
      ],
      hasInfo: false,
    },
    {
      label: "Jellyfish Anti-Spam Protection",
      helper: "",
      sideNote: "",
      values: [
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
      ],
      hasInfo: false,
    },
    {
      label: "2FA protection",
      helper: "",
      sideNote: "",
      values: [
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
      ],
      hasInfo: true,
    },
    {
      label: "Password-protected emails",
      helper: "",
      sideNote: "",
      values: [
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
      ],
      hasInfo: true,
    },
    {
      label: "Storage encryption",
      helper: "",
      sideNote: "",
      values: [
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
        { stat: "✓", description: "" },
      ],
      hasInfo: false,
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 text-[rgb(var(--hosting-text-white))]" style={{ backgroundColor: 'rgb(var(--business-productivity-bg))' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-6 text-center">
          <ContentHeading
            title="Compare plans in detail"
            className="!text-4xl sm:!text-[3rem] md:!text-[3.75rem]"
          />

          <ContentDescription
            text="Select the business email account that suits you best"
            size="md"
            className="text-[rgb(var(--hosting-choose-text-gray-300))] text-lg sm:text-xl max-w-2xl mx-auto"
          />

          <div className="flex justify-center">
            <HostingPlanControls
              billing={billing}
              onBillingChange={setBilling}
              dataCenter="US"
              onDataCenterChange={() => {}}
              variant="flat"
              className="gap-10"
              showDivider={false}
              hideDataCenter={true}
            />
          </div>
        </div>

        <div className="pt-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-end md:gap-12 md:w-full md:max-w-[726px] md:ml-auto md:mr-0 lg:mr-24">
            {plans.map((plan) => (
              <div key={plan.name} className="w-full max-w-[210px] text-center space-y-4">
                <div className="space-y-1 leading-tight">
                  <h3 className="text-xl sm:text-2xl md:text-[1.9rem] font-semibold text-[rgb(var(--hosting-text-white))]">{plan.name}</h3>
                  <div className="text-[rgb(var(--hosting-text-white))] text-lg sm:text-xl font-semibold tracking-tight">
                    ${plan.pricing[billing].toFixed(2)}
                    <span className="text-xs sm:text-sm text-[rgb(var(--hosting-choose-text-gray-400))] ml-1">
                      {suffixMap[billing]}
                    </span>
                  </div>
                </div>
                <button 
                  className="w-full px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[rgb(var(--hosting-text-white))] transition-colors"
                  style={{ backgroundColor: 'rgb(var(--business-compare-button-bg))' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--business-compare-button-hover))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--business-compare-button-bg))';
                  }}
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8 sm:space-y-12 pt-2">
          {featureRows.map((row) => (
            <div key={row.label} className="text-sm text-[rgb(var(--hosting-choose-text-gray-300))] md:mr-0 lg:mr-24">
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 text-[rgb(var(--hosting-text-white))] font-semibold text-sm sm:text-base md:text-lg">
                  <span className="break-words">{row.label}</span>
                  {row.hasInfo && (
                    <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex-shrink-0" style={{ borderColor: 'rgb(var(--business-compare-border-gray-600))' }}>
                      <Info className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[rgb(var(--hosting-choose-text-gray-400))]" strokeWidth={1.8} />
                    </span>
                  )}
                  <span className="hidden md:block flex-1 border-t" style={{ borderColor: 'rgb(var(--business-compare-border-gray-800))' }} />
                </div>

                {row.helper && (
                  <div className="pl-7 text-xs uppercase tracking-wide text-[rgb(var(--hosting-choose-text-gray-400))]">
                    <span className="font-semibold text-[rgb(var(--hosting-text-white))]">{row.helper.split(" ")[0]}</span>{" "}
                    {row.helper.replace(row.helper.split(" ")[0], "").trim()}
                  </div>
                )}
                {row.sideNote && (
                  <div className="pl-7 text-[11px] uppercase tracking-[0.2em]" style={{ color: 'rgb(var(--business-compare-text-purple-300))' }}>
                    {row.sideNote}
                  </div>
                )}

                <div className="flex flex-col items-center gap-6 md:flex-row md:justify-end md:gap-12 md:ml-auto md:w-full md:max-w-[726px]">
                  {row.values.map((value, idx) => {
                    return (
                      <div key={`${row.label}-${idx}`} className="w-full max-w-[210px] text-center space-y-2">
                        <div className="text-xl sm:text-2xl font-semibold text-[rgb(var(--hosting-text-white))]">{value.stat}</div>
                        {value.description && (
                          <div className="text-[rgb(var(--hosting-choose-text-gray-400))] text-xs sm:text-sm leading-relaxed">
                            {value.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparePlan;

