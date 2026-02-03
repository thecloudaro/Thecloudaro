"use client";

import { motion } from "framer-motion";
import { forwardRef, useState, useEffect } from "react";
import { Info, Plus } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import HostingPlanControls, { BillingCycle } from "./HostingPlanControls";
import { hostingPlanProductIds } from "@/config/hosting-plans";

// Buy Now URLs for web hosting packages (order product page by plan)
const BUY_NOW_URLS: Record<string, string> = {
  Essential: "https://my.thecloudaro.com/order/product?pid=052d137e-08d2-410d-e07b-0495163789e6",
  Pro: "https://my.thecloudaro.com/order/product?pid=2e071d93-1d5e-4687-100f-046028758396",
  Supreme: "https://my.thecloudaro.com/order/product?pid=196e02e5-136d-4205-39dc-9429807875d3",
};

interface PickYourHostingProps {
  onCompareClick?: () => void;
}

interface PricingInfo {
  price: number;
  renewal: number;
  original: number;
  discountLabel: string;
  perMonth: number;
}

interface PlanPricing {
  monthly?: PricingInfo;
  yearly?: PricingInfo;
  biyearly?: PricingInfo;
}

interface HostingPlan {
  name: string;
  displayName: string;
  description: string;
  pricing: PlanPricing;
  popular: boolean;
  features: {
    storage: string;
    websites: string;
    ssl: string;
    backup: string;
    mailboxes: string;
    apps: string;
    support: string;
    bandwidth: string;
    freeDomain?: string;
    migration?: string;
  };
}

// Fallback pricing used when Upmind API is unavailable or misconfigured
// These numbers are temporary frontend-only values and should be replaced
// by real pricing from Upmind in production environments.
const FALLBACK_PRICING: Record<
  HostingPlan["name"],
  { monthly: number; yearly: number; biyearly: number; originalMonthly?: number }
> = {
  Essential: {
    monthly: 1,
    yearly: 12,
    biyearly: 24,
    originalMonthly: 5,
  },
  Pro: {
    monthly: 10,
    yearly: 120,
    biyearly: 240,
  },
  Supreme: {
    monthly: 15,
    yearly: 180,
    biyearly: 360,
  },
};

const PickYourHosting = forwardRef<HTMLElement, PickYourHostingProps>(({ onCompareClick }, ref) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [dataCenter, setDataCenter] = useState("US");
  const [selectedAddons, setSelectedAddons] = useState<{
    [key: string]: { storage: string; price: number };
  }>({});
  const [loading, setLoading] = useState(true);

  // Default plans structure (pricing from Upmind API). Content: Packages Web Hosting — Terms Monthly, Yearly and Biennially.
  const defaultPlans: HostingPlan[] = [
    {
      name: "Essential",
      displayName: "Shared Essential",
      description: "Perfect for starting out",
      pricing: {
        monthly: undefined,
        yearly: undefined,
        biyearly: undefined,
      },
      popular: false,
      features: {
        storage: "5 GB SSD Storage",
        websites: "1 website",
        ssl: "Free SSL",
        backup: "Manual Backup",
        mailboxes: "5 Mailboxes",
        apps: "Softaculous Apps",
        support: "Standard Support",
        bandwidth: "10 GB Bandwidth",
      },
    },
    {
      name: "Pro",
      displayName: "Shared Professional",
      description: "Ideal for taking ideas further",
      pricing: {
        monthly: undefined,
        yearly: undefined,
        biyearly: undefined,
      },
      popular: true,
      features: {
        storage: "10 GB SSD Storage",
        websites: "3 websites",
        ssl: "Free SSL",
        backup: "Backup - Weekly",
        mailboxes: "10 Mailboxes",
        apps: "Softaculous Apps",
        support: "Standard Support",
        bandwidth: "Unlimited Bandwidth",
      },
    },
    {
      name: "Supreme",
      displayName: "Shared Premier",
      description: "Best for boosting businesses",
      pricing: {
        monthly: undefined,
        yearly: undefined,
        biyearly: undefined,
      },
      popular: false,
      features: {
        storage: "15 GB SSD Storage",
        websites: "5 websites",
        ssl: "Free SSL",
        backup: "Backup - Weekly",
        mailboxes: "20 Mailboxes",
        apps: "Softaculous Apps",
        support: "Standard Support",
        bandwidth: "Unlimited Bandwidth",
        freeDomain: "Free Domain (.com, .org, .xyz)",
        migration: "Free Migration",
      },
    },
  ];

  const [plans, setPlans] = useState<HostingPlan[]>(defaultPlans);

  // Fetch pricing from API
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const essentialProductId = hostingPlanProductIds.Essential;
        const proProductId = hostingPlanProductIds.Pro;
        const supremeProductId = hostingPlanProductIds.Supreme;

        if (!essentialProductId || !proProductId || !supremeProductId) {
          console.error('[PickYourHosting] ❌ Product IDs not configured');
          setLoading(false);
          return;
        }

        console.log('[PickYourHosting] 🚀 Fetching pricing from Upmind API...');

        const response = await fetch(
          `/api/hosting-pricing?essential=${essentialProductId}&pro=${proProductId}&supreme=${supremeProductId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          // Handle error response - log the actual error message
          const errorMessage = responseData.error || responseData.message || `HTTP ${response.status}: ${response.statusText}`;
          console.error('[PickYourHosting] ❌ API Error:', errorMessage);
          console.error('[PickYourHosting] ❌ Full error response:', JSON.stringify(responseData, null, 2));
          // Fall back to static pricing so UI still shows prices
          console.warn('[PickYourHosting] ⚠️ Falling back to static pricing');
          const fallbackPlans = defaultPlans.map((plan) => {
            const fallback = FALLBACK_PRICING[plan.name];
            if (!fallback) return plan;

            return {
              ...plan,
              pricing: {
                monthly: {
                  price: fallback.monthly,
                  renewal: fallback.monthly,
                  original: (fallback as { originalMonthly?: number }).originalMonthly ?? fallback.monthly * 1.5,
                  discountLabel: "",
                  perMonth: fallback.monthly,
                },
                yearly: {
                  price: fallback.yearly,
                  renewal: fallback.yearly,
                  original: fallback.yearly * 1.5,
                  discountLabel: "",
                  perMonth: fallback.yearly / 12,
                },
                biyearly: {
                  price: fallback.biyearly,
                  renewal: fallback.biyearly,
                  original: fallback.biyearly * 1.5,
                  discountLabel: "",
                  perMonth: fallback.biyearly / 24,
                },
              },
            };
          });

          setPlans(fallbackPlans);
          setLoading(false);
          return;
        }

        if (!responseData.pricing) {
          console.error('[PickYourHosting] ❌ No pricing data in response');
          console.error('[PickYourHosting] ❌ Full response:', JSON.stringify(responseData, null, 2));
          // Fall back to static pricing so UI still shows prices
          console.warn('[PickYourHosting] ⚠️ Falling back to static pricing (no pricing field)');
          const fallbackPlans = defaultPlans.map((plan) => {
            const fallback = FALLBACK_PRICING[plan.name];
            if (!fallback) return plan;

            return {
              ...plan,
              pricing: {
                monthly: {
                  price: fallback.monthly,
                  renewal: fallback.monthly,
                  original: (fallback as { originalMonthly?: number }).originalMonthly ?? fallback.monthly * 1.5,
                  discountLabel: "",
                  perMonth: fallback.monthly,
                },
                yearly: {
                  price: fallback.yearly,
                  renewal: fallback.yearly,
                  original: fallback.yearly * 1.5,
                  discountLabel: "",
                  perMonth: fallback.yearly / 12,
                },
                biyearly: {
                  price: fallback.biyearly,
                  renewal: fallback.biyearly,
                  original: fallback.biyearly * 1.5,
                  discountLabel: "",
                  perMonth: fallback.biyearly / 24,
                },
              },
            };
          });

          setPlans(fallbackPlans);
          setLoading(false);
          return;
        }

        console.log('[PickYourHosting] ✅ Pricing data received:', responseData.pricing);

        // Update plans with fetched pricing from Upmind API
        const updatedPlans = defaultPlans.map((plan) => {
          const fetchedPricing = responseData.pricing[plan.name];

          if (!fetchedPricing) {
            console.warn(`[PickYourHosting] ⚠️ No pricing found for ${plan.name} in API response, using fallback pricing.`);
            const fallback = FALLBACK_PRICING[plan.name];
            if (!fallback) {
              return {
                ...plan,
                pricing: {
                  monthly: undefined,
                  yearly: undefined,
                  biyearly: undefined,
                },
              };
            }

            return {
              ...plan,
              pricing: {
                monthly: {
                  price: fallback.monthly,
                  renewal: fallback.monthly,
                  original: (fallback as { originalMonthly?: number }).originalMonthly ?? fallback.monthly * 1.5,
                  discountLabel: "",
                  perMonth: fallback.monthly,
                },
                yearly: {
                  price: fallback.yearly,
                  renewal: fallback.yearly,
                  original: fallback.yearly * 1.5,
                  discountLabel: "",
                  perMonth: fallback.yearly / 12,
                },
                biyearly: {
                  price: fallback.biyearly,
                  renewal: fallback.biyearly,
                  original: fallback.biyearly * 1.5,
                  discountLabel: "",
                  perMonth: fallback.biyearly / 24,
                },
              },
            };
          }

          // Extract valid pricing values
          const monthlyPrice = fetchedPricing.monthly && fetchedPricing.monthly > 0 ? fetchedPricing.monthly : null;
          const yearlyPrice = fetchedPricing.yearly && fetchedPricing.yearly > 0 ? fetchedPricing.yearly : null;
          const biyearlyPrice = fetchedPricing.biyearly && fetchedPricing.biyearly > 0 ? fetchedPricing.biyearly : null;

          // Only update if at least one pricing value exists, otherwise use fallback
          if (monthlyPrice || yearlyPrice || biyearlyPrice) {
            const updatedPlan = {
              ...plan,
              pricing: {
                monthly: monthlyPrice
                  ? {
                      price: monthlyPrice,
                      renewal: monthlyPrice,
                      original: monthlyPrice * 1.5,
                      discountLabel: "",
                      perMonth: monthlyPrice,
                    }
                  : undefined,
                yearly: yearlyPrice
                  ? {
                      price: yearlyPrice,
                      renewal: yearlyPrice,
                      original: yearlyPrice * 1.5,
                      discountLabel: "",
                      perMonth: yearlyPrice / 12,
                    }
                  : undefined,
                biyearly: biyearlyPrice
                  ? {
                      price: biyearlyPrice,
                      renewal: biyearlyPrice,
                      original: biyearlyPrice * 1.5,
                      discountLabel: "",
                      perMonth: biyearlyPrice / 24,
                    }
                  : undefined,
              },
            };

            console.log(`[PickYourHosting] ✅ Updated ${plan.name} pricing from API`);
            return updatedPlan;
          }

          console.warn(
            `[PickYourHosting] ⚠️ No valid pricing values for ${plan.name} in API response, using fallback pricing.`
          );
          const fallback = FALLBACK_PRICING[plan.name];
          if (!fallback) {
            return {
              ...plan,
              pricing: {
                monthly: undefined,
                yearly: undefined,
                biyearly: undefined,
              },
            };
          }

          return {
            ...plan,
            pricing: {
              monthly: {
                price: fallback.monthly,
                renewal: fallback.monthly,
                original: (fallback as { originalMonthly?: number }).originalMonthly ?? fallback.monthly * 1.5,
                discountLabel: "",
                perMonth: fallback.monthly,
              },
              yearly: {
                price: fallback.yearly,
                renewal: fallback.yearly,
                original: fallback.yearly * 1.5,
                discountLabel: "",
                perMonth: fallback.yearly / 12,
              },
              biyearly: {
                price: fallback.biyearly,
                renewal: fallback.biyearly,
                original: fallback.biyearly * 1.5,
                discountLabel: "",
                perMonth: fallback.biyearly / 24,
              },
            },
          };
        });

        setPlans(updatedPlans);
        console.log('[PickYourHosting] ✅ Plans updated with Upmind pricing');
      } catch (error) {
        // Handle network errors or JSON parsing errors
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('[PickYourHosting] ❌ Failed to fetch pricing:', errorMessage);
        console.error('[PickYourHosting] ❌ Error details:', error);
        // Fall back to static pricing so UI still shows prices
        console.warn('[PickYourHosting] ⚠️ Falling back to static pricing due to fetch error');
        const fallbackPlans = defaultPlans.map((plan) => {
          const fallback = FALLBACK_PRICING[plan.name];
          if (!fallback) return plan;

          return {
            ...plan,
            pricing: {
              monthly: {
                price: fallback.monthly,
                renewal: fallback.monthly,
                original: (fallback as { originalMonthly?: number }).originalMonthly ?? fallback.monthly * 1.5,
                discountLabel: "",
                perMonth: fallback.monthly,
              },
              yearly: {
                price: fallback.yearly,
                renewal: fallback.yearly,
                original: fallback.yearly * 1.5,
                discountLabel: "",
                perMonth: fallback.yearly / 12,
              },
              biyearly: {
                price: fallback.biyearly,
                renewal: fallback.biyearly,
                original: fallback.biyearly * 1.5,
                discountLabel: "",
                perMonth: fallback.biyearly / 24,
              },
            },
          };
        });

        setPlans(fallbackPlans);
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

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
                title="Packages Web Hosting"
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
                text="Terms Monthly, Yearly and Biennially."
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
                hideDataCenter={true}
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
              const hasPricing = pricing !== undefined && pricing !== null;
              
              const originalSuffix =
                billingCycle === "monthly"
                  ? "/mo"
                  : billingCycle === "biyearly"
                    ? "/2yr"
                    : "/yr";
              const perMonthLabel = hasPricing
                ? billingCycle === "monthly"
                  ? `Renews for $${pricing.renewal.toFixed(2)}/mo`
                  : `$${pricing.perMonth.toFixed(2)}/mo`
                : "";
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
                        {plan.displayName}
                      </h3>
                      <p className="text-sm text-[rgb(var(--hosting-choose-text-gray-400))]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="text-center space-y-3 mb-8">
                      {loading ? (
                        <div className="text-[rgb(var(--hosting-choose-text-gray-400))] text-sm">
                          Loading pricing...
                        </div>
                      ) : hasPricing ? (
                        <>
                          <div className="flex items-center justify-center gap-2 text-xs font-semibold">
                            <span className="line-through text-[rgb(var(--hosting-choose-text-gray-500))]">
                              ${pricing.original.toFixed(2)}
                              {originalSuffix}
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
                        </>
                      ) : (
                        <div className="text-[rgb(var(--hosting-choose-text-gray-400))] text-xs space-y-1">
                          <div>Pricing unavailable</div>
                          <div className="text-[10px] opacity-75">Check console for details</div>
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 text-sm mt-20">
                      <div className="text-[rgb(var(--hosting-choose-text-gray-300))]">
                        {plan.features.storage}
                      </div>
                      <div className="text-[rgb(var(--hosting-text-white))] font-semibold">
                        {plan.features.websites}
                      </div>
                      <div className="text-[rgb(var(--hosting-choose-text-gray-300))]">
                        <span className="text-[rgb(var(--hosting-pick-text-green))]">
                          {plan.features.ssl}
                        </span>
                      </div>
                      <div className="text-[rgb(var(--hosting-choose-text-gray-300))]">
                        {plan.features.backup}
                      </div>
                      <div className="text-[rgb(var(--hosting-choose-text-gray-300))]">
                        {plan.features.mailboxes}
                      </div>
                      <div className="text-[rgb(var(--hosting-choose-text-gray-300))]">
                        {plan.features.apps}
                      </div>
                      <div className="text-[rgb(var(--hosting-choose-text-gray-300))]">
                        {plan.features.support}
                      </div>
                      <div className="text-[rgb(var(--hosting-choose-text-gray-300))]">
                        {plan.features.bandwidth}
                      </div>
                      {plan.features.freeDomain && (
                        <div className="text-[rgb(var(--hosting-choose-text-gray-300))]">
                          {plan.features.freeDomain}
                        </div>
                      )}
                      {plan.features.migration && (
                        <div className="text-[rgb(var(--hosting-choose-text-gray-300))]">
                          {plan.features.migration}
                        </div>
                      )}
                    </div>

                    <div className="border-t border-[rgb(var(--hosting-choose-border-gray-800))] mt-15" />

                    {/* Suggested Add-ons Section */}
                    {false && (
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
                    )}

                    {/* Buy Now */}
                    <div>
                      <a
                        href={BUY_NOW_URLS[plan.name] ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 rounded-full text-sm font-semibold transition-all text-center"
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
                        Buy Now
                      </a>
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
              onClick={onCompareClick}
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
