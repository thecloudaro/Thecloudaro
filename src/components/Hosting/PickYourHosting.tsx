"use client";

import { motion } from "framer-motion";
import { forwardRef, useState } from "react";
import { Info, Plus } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import HostingPlanControls, { BillingCycle } from "./HostingPlanControls";

const PickYourHosting = forwardRef<HTMLElement>((props, ref) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const [dataCenter, setDataCenter] = useState("US");
  const [selectedAddons, setSelectedAddons] = useState<{
    [key: string]: { storage: string; price: number };
  }>({});

  const plans = [
    {
      name: "Essential",
      description: "Perfect for starting out",
      pricing: {
        monthly: {
          price: 3.88,
          renewal: 3.88,
          original: 5.88,
          discountLabel: "31% OFF*",
          perMonth: 3.88,
        },
        yearly: {
          price: 19.88,
          renewal: 19.88,
          original: 28.88,
          discountLabel: "31% OFF*",
          perMonth: 1.66,
        },
        biyearly: {
          price: 34.88,
          renewal: 34.88,
          original: 48.88,
          discountLabel: "29% OFF*",
          perMonth: 1.45,
        },
      },
      popular: false,
      features: {
        cpu: "1x CPU",
        storage: "20 GB SSD Cloud storage",
        domains: "5 hosted domains",
        websites: "Unlimited websites",
        ssl: true,
        mailboxes: "5 mailboxes per domain free for 1 year",
        spacemail: true,
        imunify360: true,
        websiteBuilder: true,
        wordpressAI: false,
      },
    },
    {
      name: "Pro",
      description: "Ideal for taking ideas further",
      pricing: {
        monthly: {
          price: 4.88,
          renewal: 4.88,
          original: 6.88,
          discountLabel: "29% OFF*",
          perMonth: 4.88,
        },
        yearly: {
          price: 28.88,
          renewal: 28.88,
          original: 48.88,
          discountLabel: "41% OFF*",
          perMonth: 2.41,
        },
        biyearly: {
          price: 54.88,
          renewal: 54.88,
          original: 88.88,
          discountLabel: "38% OFF*",
          perMonth: 2.29,
        },
      },
      popular: true,
      features: {
        cpu: "2x CPU",
        storage: "50 GB SSD Cloud storage",
        domains: "Unlimited hosted domains",
        websites: "Unlimited websites",
        ssl: true,
        mailboxes: "5 mailboxes per domain free for 1 year",
        spacemail: true,
        imunify360: true,
        websiteBuilder: true,
        wordpressAI: true,
      },
    },
    {
      name: "Supreme",
      description: "Best for boosting businesses",
      pricing: {
        monthly: {
          price: 6.88,
          renewal: 6.88,
          original: 9.88,
          discountLabel: "30% OFF*",
          perMonth: 6.88,
        },
        yearly: {
          price: 38.88,
          renewal: 38.88,
          original: 68.88,
          discountLabel: "44% OFF*",
          perMonth: 3.24,
        },
        biyearly: {
          price: 72.88,
          renewal: 72.88,
          original: 118.88,
          discountLabel: "39% OFF*",
          perMonth: 3.04,
        },
      },
      popular: false,
      features: {
        cpu: "4x CPU",
        storage: "Unmetered SSD Cloud storage",
        domains: "Unlimited hosted domains",
        websites: "Unlimited websites",
        ssl: true,
        mailboxes: "5 mailboxes per domain free for 1 year",
        spacemail: true,
        imunify360: true,
        websiteBuilder: true,
        wordpressAI: true,
      },
    },
  ];

  const getPricing = (plan: (typeof plans)[0]) => {
    return plan.pricing[billingCycle];
  };

  const getBillingSuffix = () => {
    switch (billingCycle) {
      case "monthly":
        return "/mo";
      case "yearly":
        return "/yr";
      case "biyearly":
        return "/2yr";
      default:
        return "/mo";
    }
  };

  const toggleAddon = (planName: string, storage: string, price: number) => {
    setSelectedAddons((prev) => {
      const key = `${planName}-autobackup`;
      if (prev[key]?.storage === storage) {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      }
      return {
        ...prev,
        [key]: { storage, price },
      };
    });
  };

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: "rgb(var(--hosting-bg))" }}
    >
      {/* Upper Half - Circular Gradient Background */}
      <div
        className="relative w-full h-[40vh] sm:h-[45vh] md:h-[50vh] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex items-center justify-center"
        style={{ backgroundColor: "rgb(var(--hosting-bg))" }}
      >
        {/* Spotlight Gradient Effect - #4dd0e1 color only in center, gray sides */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 50% 0%, rgba(var(--hosting-spotlight-cyan), 0.5) 0%, rgba(var(--hosting-spotlight-cyan), 0.35) 18%, rgba(var(--hosting-spotlight-cyan), 0.2) 32%, rgba(var(--hosting-spotlight-cyan), 0.1) 48%, rgba(var(--hosting-spotlight-bg), 0.6) 62%, rgba(var(--hosting-spotlight-bg), 1) 75%)`,
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 xl:-mt-32">
          <div className="text-center mb-12 pt-24">
            {/* Heading - Using Reusable Component */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <ContentHeading
                title="Pick your Web Hosting"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center"
              />
            </motion.div>

            {/* Description - Using Reusable Component */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <ContentDescription
                text="Start building your online presence."
                className="text-lg sm:text-xl md:text-2xl text-center text-white"
              />
            </motion.div>

            {/* Blur Div with Billing Cycle and Data Center */}
            <div className="mt-12 flex w-full flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-14">
              <HostingPlanControls
                billing={billingCycle}
                onBillingChange={setBillingCycle}
                dataCenter={dataCenter}
                onDataCenterChange={setDataCenter}
                variant="plain" // Changed from "blur" to "plain" to match ChooseYourHosting
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lower Half - Pricing Cards */}
      <div
        className="relative w-full pb-12 sm:pb-16 pt-16 sm:pt-20"
        style={{ backgroundColor: "rgb(var(--hosting-section-bg))" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-6 sm:gap-8 md:gap-10 -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-32 relative z-20">
            {plans.map((plan, index) => {
              const pricing = getPricing(plan);
              const addonKey = `${plan.name}-autobackup`;
              const selectedAddon = selectedAddons[addonKey];
              const billingSuffix = getBillingSuffix();
              const originalSuffix =
                billingCycle === "monthly"
                  ? "/mo"
                  : billingCycle === "biyearly"
                    ? "/2yr"
                    : "/yr";
              const perMonthLabel =
                billingCycle === "monthly"
                  ? `Renews for $${pricing.renewal.toFixed(2)}/mo`
                  : `$${pricing.perMonth.toFixed(2)}/mo`;
              const renewalSuffix =
                billingCycle === "monthly" ? "/mo" : billingSuffix;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className={`relative rounded-2xl p-6 sm:p-8 w-full max-w-sm mx-auto md:max-w-none md:w-[320px] md:mx-1 ${
                    plan.popular
                      ? "md:scale-105 md:-mt-4 shadow-[0px_20px_80px_rgba(77,208,225,0.15)]"
                      : ""
                  }`}
                  style={{
                    borderRadius: "16px",
                    backgroundColor: "rgb(var(--hosting-bg))",
                    width: "100%",
                  }}
                >
                  <div className="space-y-6">
                    {/* Most Popular Label */}
                    {plan.popular && (
                      <div className="text-center">
                        <span
                          className="text-sm font-semibold"
                          style={{
                            color: "rgb(var(--hosting-pick-popular-badge))",
                          }}
                        >
                          MOST POPULAR
                        </span>
                      </div>
                    )}

                    {/* Plan Heading */}
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-bold text-[rgb(var(--hosting-text-white))]">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-[rgb(var(--hosting-choose-text-gray-400))]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="text-center space-y-3 mb-8">
                      <div className="flex items-center justify-center gap-2 text-xs font-semibold">
                        <span className="line-through text-[rgb(var(--hosting-choose-text-gray-500))]">
                          ${pricing.original.toFixed(2)}
                          {originalSuffix}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full text-[11px]"
                          style={{
                            backgroundColor:
                              "rgba(var(--hosting-pick-discount-bg))",
                            color: "rgb(var(--hosting-accent-cyan))",
                          }}
                        >
                          {pricing.discountLabel}
                        </span>
                      </div>
                      <div className="text-[rgb(var(--hosting-text-white))] text-5xl font-bold tracking-tight">
                        ${pricing.price.toFixed(2)}
                        <span className="text-2xl font-semibold text-[rgb(var(--hosting-choose-text-gray-400))]">
                          {billingSuffix}
                        </span>
                      </div>
                      <div className="text-sm text-[rgb(var(--hosting-choose-text-gray-400))]">
                        {perMonthLabel}
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 text-sm mt-20">
                      <div className="text-[rgb(var(--hosting-choose-text-gray-300))]">
                        {plan.features.cpu}
                      </div>
                      <div className="text-[rgb(var(--hosting-choose-text-gray-300))]">
                        {plan.features.storage}
                      </div>
                      <div className="text-[rgb(var(--hosting-choose-text-gray-300))]">
                        {plan.features.domains.startsWith("Unlimited") ? (
                          <strong className="text-[rgb(var(--hosting-text-white))]">
                            {plan.features.domains}
                          </strong>
                        ) : (
                          plan.features.domains
                        )}
                      </div>
                      <div className="text-[rgb(var(--hosting-text-white))] font-semibold">
                        {plan.features.websites}
                      </div>
                      <div className="text-[rgb(var(--hosting-choose-text-gray-300))]">
                        Secured by{" "}
                        <span className="text-[rgb(var(--hosting-pick-text-green))]">
                          SSL
                        </span>
                      </div>
                      <div className="text-[rgb(var(--hosting-choose-text-gray-300))]">
                        {plan.features.mailboxes}
                      </div>
                      <div className="text-[rgb(var(--hosting-choose-text-gray-300))]">
                        Powered by{" "}
                        <span className="text-[rgb(var(--hosting-pick-text-purple))]">
                          SPACEMAIL®
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[rgb(var(--hosting-choose-text-gray-300))]">
                        Imunify360 Protection
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                          style={{
                            backgroundColor:
                              "rgb(var(--hosting-pick-popular-badge))",
                            color: "rgb(var(--hosting-pick-button-text))",
                          }}
                        >
                          NEW
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[rgb(var(--hosting-choose-text-gray-300))]">
                        Website Builder
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                          style={{
                            backgroundColor:
                              "rgb(var(--hosting-pick-popular-badge))",
                            color: "rgb(var(--hosting-pick-button-text))",
                          }}
                        >
                          NEW
                        </span>
                      </div>

                      {plan.features.wordpressAI && (
                        <div className="flex items-center gap-2 text-[rgb(var(--hosting-choose-text-gray-300))]">
                          WordPress AI Tools
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{
                              backgroundColor:
                                "rgb(var(--hosting-pick-popular-badge))",
                              color: "rgb(var(--hosting-pick-button-text))",
                            }}
                          >
                            NEW
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-[rgb(var(--hosting-choose-border-gray-800))] mt-15" />

                    {/* Suggested Add-ons Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-center text-xs font-semibold uppercase tracking-wide text-[rgb(var(--hosting-choose-text-gray-400))]">
                        <span>Suggested add-ons</span>
                      </div>
                      <div className="rounded-xl p-4 border border-[rgb(var(--hosting-choose-border-gray-800))]">
                        <div className="flex items-center justify-between text-sm font-medium text-[rgb(var(--hosting-text-white))]">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center border border-[rgb(var(--hosting-choose-border-gray-800))]">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M8 2L2 6V14H14V6L8 2Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  fill="none"
                                />
                                <path
                                  d="M6 10L8 12L10 10"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  fill="none"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span>AutoBackup</span>
                                <Info className="w-3 h-3 text-[rgb(var(--hosting-choose-text-gray-400))]" />
                              </div>

                              <div className="flex items-center gap-2 mt-1">
                                <select
                                  className="text-md rounded px-2 py-1 focus:outline-none focus:ring-0 focus:border-none hover:border-none hover:bg-transparent"
                                  style={{
                                    color: "rgb(var(--hosting-text-white))",
                                    border: "none",
                                    outline: "none",
                                    backgroundColor: "transparent",
                                  }}
                                  onFocus={(e) => {
                                    e.target.style.outline = "none";
                                    e.target.style.border = "none";
                                    e.target.style.boxShadow = "none";
                                    e.target.style.backgroundColor =
                                      "transparent";
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.border = "none";
                                    e.currentTarget.style.outline = "none";
                                    e.currentTarget.style.backgroundColor =
                                      "transparent";
                                    e.currentTarget.style.background =
                                      "transparent";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "transparent";
                                    e.currentTarget.style.background =
                                      "transparent";
                                  }}
                                  onMouseDown={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "transparent";
                                    e.currentTarget.style.background =
                                      "transparent";
                                  }}
                                  defaultValue="5 GB"
                                >
                                  <option>5 GB</option>
                                  <option>10 GB</option>
                                  <option>20 GB</option>
                                </select>
                                <span className="text-md text-[rgb(var(--hosting-choose-text-gray-400))]">
                                  +$0.88
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleAddon(plan.name, "5 GB", 0.88)}
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                            style={{
                              backgroundColor: selectedAddon
                                ? "rgb(var(--hosting-pick-addon-button-active))"
                                : "rgb(var(--hosting-pick-addon-button-bg))",
                              color: "rgb(var(--hosting-pick-button-text))",
                            }}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div>
                      <button
                        className="w-full py-3 rounded-full text-sm font-semibold transition-all"
                        style={{
                          backgroundColor: "rgb(var(--hosting-pick-button-bg))",
                          color: "rgb(var(--hosting-pick-button-text))",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgb(var(--hosting-choose-button-hover))";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgb(var(--hosting-pick-button-bg))";
                        }}
                      >
                        Add to cart
                      </button>
                    </div>

                    {/* Renewal Information */}
                    <div className="text-xs text-center text-[rgb(var(--hosting-choose-text-gray-400))]">
                      You pay ${pricing.price.toFixed(2)} — renews for $
                      {pricing.renewal.toFixed(2)}
                      {renewalSuffix}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p
              className="text-sm mb-4"
              style={{ color: "rgb(var(--hosting-text-muted))" }}
            >
              *Prices reflect discount on the first billing cycle.
            </p>
            <button
              className="px-6 py-3 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor: "rgb(var(--hosting-bg))",
                color: "rgb(var(--hosting-pick-compare-button-text))",
              }}
            >
              Compare plans in detail
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

PickYourHosting.displayName = "PickYourHosting";

export { PickYourHosting };
