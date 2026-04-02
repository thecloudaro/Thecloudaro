"use client";

import { useState, useEffect, forwardRef } from "react";
import ContentHeading from "@/components/ui/content-heading";
import HostingPlanControls, { BillingCycle } from "./HostingPlanControls";
import { Info, ChevronDown } from "lucide-react";
import {
  hostingPlanProductIds,
  businessPlanProductIds,
  ecommercePlanProductIds,
} from "@/config/hosting-plans";

type HostingVariant = "shared" | "business" | "ecommerce";

const SHARED_BUY_NOW_URLS: Record<string, string> = {
  Essential:
    "https://my.thecloudaro.com/order/product?pid=052d137e-08d2-410d-e07b-0495163789e6",
  Pro: "https://my.thecloudaro.com/order/product?pid=2e071d93-1d5e-4687-100f-046028758396",
  Supreme:
    "https://my.thecloudaro.com/order/product?pid=196e02e5-136d-4205-39dc-9429807875d3",
};

const BUSINESS_BUY_NOW_URLS: Record<string, string> = {
  Essential:
    "https://my.thecloudaro.com/order/product?pid=7831d635-0d82-4908-538f-049e176259e0",
  Pro: "https://my.thecloudaro.com/order/product?pid=d5308768-251d-4859-3e3b-747e390921e6",
  Supreme:
    "https://my.thecloudaro.com/order/product?pid=2e071d93-1d5e-4685-693a-046028758396",
};

const ECOMMERCE_BUY_NOW_URLS: Record<string, string> = {
  Essential:
    "https://my.thecloudaro.com/order/product?pid=196e02e5-136d-4201-7e2b-9429807875d3",
  Pro: "https://my.thecloudaro.com/order/product?pid=052d137e-08d2-4101-670f-0495163789e6",
  Supreme:
    "https://my.thecloudaro.com/order/product?pid=61e50989-73d2-4750-792b-745e610832d7",
};

function buyNowUrlForPlan(
  planName: string,
  variant: HostingVariant
): string {
  const map =
    variant === "business"
      ? BUSINESS_BUY_NOW_URLS
      : variant === "ecommerce"
        ? ECOMMERCE_BUY_NOW_URLS
        : SHARED_BUY_NOW_URLS;
  return map[planName] ?? SHARED_BUY_NOW_URLS[planName] ?? "#";
}

/** Same fallback as PickYourHosting when API fails */
const FALLBACK_PRICING: Record<
  string,
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

interface PricingInfo {
  price: number;
  original: number;
  renewal: number;
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
  description: string;
  popular?: boolean;
  pricing: PlanPricing;
  features: {
    disk: string;
    domains: string;
  };
}

// Default plans structure (pricing will come from Upmind API only)
const defaultPlans: HostingPlan[] = [
  {
    name: "Essential",
    description: "Perfect for starting out",
    pricing: {
      monthly: undefined,
      yearly: undefined,
      biyearly: undefined,
    },
    features: {
      disk: "20 GB NVMe SSD cloud storage",
      domains: "5 domains or subdomains",
    },
  },
  {
    name: "Pro",
    description: "Ideal for taking ideas further",
    popular: true,
    pricing: {
      monthly: undefined,
      yearly: undefined,
      biyearly: undefined,
    },
    features: {
      disk: "50 GB NVMe SSD cloud storage",
      domains: "∞ domains or subdomains",
    },
  },
  {
    name: "Supreme",
    description: "Best for boosting businesses",
    pricing: {
      monthly: undefined,
      yearly: undefined,
      biyearly: undefined,
    },
    features: {
      disk: "Unmetered NVMe SSD cloud storage",
      domains: "∞ domains or subdomains",
    },
  },
];

const featureRows = [
  {
    label: "Disk space",
    helper: "",
    sideNote: "",
    values: [
      { stat: "20", description: "GB NVMe SSD cloud storage" },
      { stat: "50", description: "GB NVMe SSD cloud storage" },
      { stat: "∞", description: "Unmetered NVMe SSD cloud storage" },
    ],
  },
  {
    label: "Hosted domains",
    helper: "",
    sideNote: "",
    values: [
      { stat: "5", description: "domains or subdomains" },
      { stat: "∞", description: "domains or subdomains" },
      { stat: "∞", description: "domains or subdomains" },
    ],
  },
  {
    label: "Email accounts",
    helper: "5 free mailboxes per domain",
    sideNote: "",
    values: [
      { stat: "25", description: "free mailboxes for 1 year" },
      { stat: "∞", description: "free mailboxes for 1 year" },
      { stat: "∞", description: "free mailboxes for 1 year" },
    ],
  },
  {
    label: "SSL certificates",
    helper: "1 free certificate per domain",
    sideNote: "",
    values: [
      { stat: "5", description: "SSL certificates" },
      { stat: "∞", description: "SSL certificates" },
      { stat: "∞", description: "SSL certificates" },
    ],
  },
  {
    label: "File limit",
    helper: "",
    sideNote: "",
    values: [
      { stat: "300,000", description: "files" },
      { stat: "500,000", description: "files" },
      { stat: "700,000", description: "files" },
    ],
  },
  {
    label: "CPU",
    helper: "",
    sideNote: "",
    values: [
      { stat: "Up to 1", description: "core" },
      { stat: "Up to 2", description: "cores" },
      { stat: "Up to 4", description: "cores" },
    ],
  },
  {
    label: "Memory limit",
    helper: "",
    sideNote: "",
    values: [
      { stat: "1", description: "GB" },
      { stat: "2", description: "GB" },
      { stat: "3", description: "GB" },
    ],
  },
  {
    label: "MySQL databases",
    helper: "",
    sideNote: "",
    values: [
      { stat: "50", description: "databases" },
      { stat: "∞", description: "databases" },
      { stat: "∞", description: "databases" },
    ],
  },
  {
    label: "FTP accounts",
    helper: "",
    sideNote: "",
    values: [
      { stat: "50", description: "FTP accounts" },
      { stat: "∞", description: "FTP accounts" },
      { stat: "∞", description: "FTP accounts" },
    ],
  },
  {
    label: "WordPress AI Tools",
    helper: "",
    sideNote: "",
    values: [
      { stat: "×", description: "" },
      { stat: "✓", description: "" },
      { stat: "✓", description: "" },
    ],
  },
];

type AllPlansItem = {
  label: string;
  info?: boolean;
};

type AllPlansSection = {
  label: string;
  helper?: string;
  items: AllPlansItem[];
  initialVisible?: number;
};

const allPlansSections: AllPlansSection[] = [
  {
    label: "Websites",
    helper: "Unlimited number of websites",
    items: [],
  },
  {
    label: "Control panel features",
    initialVisible: 6,
    items: [
      { label: "cPanel", info: true },
      { label: "Softaculous App Installer", info: true },
      { label: "Website Builder", info: true },
      { label: "AWStats Tool", info: true },
      { label: "Backup Manager", info: true },
      { label: "Customizable php.ini", info: true },
      { label: "Database Manager", info: true },
      { label: "File/FTP Manager", info: true },
      { label: "Redirects", info: true },
      { label: "SSL/TLS Manager", info: true },
      { label: "Cron Jobs", info: true },
      { label: "Directory Privacy", info: true },
      { label: "Hotlink Protection", info: true },
      { label: "Images", info: true },
      { label: "Indexes", info: true },
      { label: "IP Blocker", info: true },
      { label: "Leech Protect", info: true },
      { label: "MIME Types", info: true },
      { label: "Track DNS", info: true },
      { label: "Server Information", info: true },
      { label: "Change Language", info: true },
      { label: "Web Disk", info: true },
      { label: "PHP PEAR Packages", info: true },
      { label: "Perl Modules", info: true },
    ],
  },
  {
    label: "Server features",
    initialVisible: 5,
    items: [
      { label: "Data Center Location", info: true },
      { label: "Cloud Storage", info: true },
      { label: "Litespeed Web Server", info: true },
      { label: "CloudLinux", info: true },
      { label: "Timely updates", info: true },
      { label: "Firewall", info: true },
      { label: "Virus Protection", info: true },
      { label: "Web Application Firewall", info: true },
      { label: "Website Brute Force Protection", info: true },
    ],
  },
  {
    label: "Web development tools",
    initialVisible: 6,
    items: [
      { label: "PHP 5.X - 8.X", info: true },
      { label: "Node.JS 6.X - 24.X", info: true },
      { label: "Python 2.X - 3.X", info: true },
      { label: "Ruby 1.X - 3.X", info: true },
      { label: "MariaDB 10.X.X", info: true },
      { label: "CGI", info: true },
      { label: "LSAPI", info: true },
      { label: "Perl", info: true },
      { label: "Javascript", info: true },
      { label: "SSI", info: true },
      { label: "SSH Access (Jailed)", info: true },
      { label: "PHP MyAdmin", info: true },
    ],
  },
  {
    label: "Security",
    items: [{ label: "Imunify360 protection included", info: true }],
  },
];

export interface ChooseHostingProps {
  /** Must match PickYourHosting on the same page so package cards and compare use the same Upmind products */
  variant?: HostingVariant;
}

const ChooseHosting = forwardRef<HTMLElement, ChooseHostingProps>(
  ({ variant = "shared" }, ref) => {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [dataCenter, setDataCenter] = useState("US");
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [plans, setPlans] = useState<HostingPlan[]>(defaultPlans);
  const [loading, setLoading] = useState(true);

  // Same fetch + merge logic as PickYourHosting (ids JSON → /api/hosting-pricing)
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const productIds =
          variant === "business"
            ? businessPlanProductIds
            : variant === "ecommerce"
              ? ecommercePlanProductIds
              : hostingPlanProductIds;

        const productIdEntries = Object.entries(productIds).filter(
          ([planName, productId]) =>
            planName.trim().length > 0 &&
            typeof productId === "string" &&
            productId.trim().length > 0
        );

        if (productIdEntries.length === 0) {
          console.error("[ChooseHosting] Product IDs not configured");
          setLoading(false);
          return;
        }

        const idsParam = encodeURIComponent(
          JSON.stringify(Object.fromEntries(productIdEntries))
        );

        const response = await fetch(
          `/api/hosting-pricing?ids=${idsParam}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
          }
        );

        const responseData = await response.json();

        const applyFallbackPlans = () => {
          setPlans(
            defaultPlans.map((plan) => {
              const fallback = FALLBACK_PRICING[plan.name];
              if (!fallback) return plan;
              return {
                ...plan,
                pricing: {
                  monthly: {
                    price: fallback.monthly,
                    renewal: fallback.monthly,
                    original:
                      fallback.originalMonthly ?? fallback.monthly * 1.5,
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
            })
          );
        };

        if (!response.ok || !responseData.pricing) {
          console.error("[ChooseHosting] API error:", responseData.error);
          applyFallbackPlans();
          setLoading(false);
          return;
        }

        const updatedPlans = defaultPlans.map((plan) => {
          const fetchedPricing = responseData.pricing[plan.name];

          if (!fetchedPricing) {
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
                  original:
                    fallback.originalMonthly ?? fallback.monthly * 1.5,
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

          const monthlyPrice =
            fetchedPricing.monthly && fetchedPricing.monthly > 0
              ? fetchedPricing.monthly
              : null;
          const yearlyPrice =
            fetchedPricing.yearly && fetchedPricing.yearly > 0
              ? fetchedPricing.yearly
              : null;
          const biyearlyPrice =
            fetchedPricing.biyearly && fetchedPricing.biyearly > 0
              ? fetchedPricing.biyearly
              : null;

          if (monthlyPrice || yearlyPrice || biyearlyPrice) {
            return {
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
          }

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
                original:
                  fallback.originalMonthly ?? fallback.monthly * 1.5,
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
      } catch (error) {
        console.error("[ChooseHosting] Fetch failed:", error);
        setPlans(
          defaultPlans.map((plan) => {
            const fallback = FALLBACK_PRICING[plan.name];
            if (!fallback) return plan;
            return {
              ...plan,
              pricing: {
                monthly: {
                  price: fallback.monthly,
                  renewal: fallback.monthly,
                  original:
                    fallback.originalMonthly ?? fallback.monthly * 1.5,
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
          })
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, [variant]);

  const suffixMap: Record<BillingCycle, string> = {
    monthly: "/mo",
    yearly: "/yr",
    biyearly: "/2yr",
  };

  return (
    <section
      ref={ref}
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "rgb(var(--hosting-section-bg))" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-8 sm:space-y-10 md:space-y-12">
        <div className="space-y-6 text-center">
          <ContentHeading
            title="Choose your Web Hosting plan"
            className="!text-4xl sm:!text-[3rem] md:!text-[3.75rem]"
          />

          <div className="mt-12 flex w-full flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-14">
            <HostingPlanControls
              billing={billing}
              onBillingChange={setBilling}
              dataCenter={dataCenter}
              onDataCenterChange={setDataCenter}
              variant="flat"
              className="gap-10"
              showDivider={false}
              hideDataCenter={true}
            />
          </div>
        </div>

        <div className="pt-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-end md:gap-8 lg:gap-12 md:w-full lg:w-[726px] md:ml-auto md:mr-0 lg:mr-24">
            {plans.map((plan) => {
              const pricing = plan.pricing[billing];
              const hasPricing = pricing !== undefined && pricing !== null;
              
              const originalSuffix = billing === "monthly" ? "/mo" : billing === "biyearly" ? "/2yr" : "/yr";
              const renewalSuffix = suffixMap[billing];
              
              return (
                <div key={plan.name} className="w-[210px] text-center space-y-4">
                  {plan.popular && (
                    <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgb(var(--hosting-pick-popular-badge))' }}>
                      MOST POPULAR
                    </div>
                  )}
                  <div className="space-y-1 leading-tight">
                    <h3 className="text-[1.9rem] font-semibold text-[rgb(var(--hosting-text-white))]">
                      {plan.name}
                    </h3>
                    {plan.description && (
                      <p className="text-sm text-[rgb(var(--hosting-choose-text-gray-400))]">
                        {plan.description}
                      </p>
                    )}
                    {loading ? (
                      <div className="text-[rgb(var(--hosting-choose-text-gray-400))] text-sm">
                        Loading...
                      </div>
                    ) : hasPricing ? (
                      <div className="space-y-2">
                        {pricing.original && (
                          <div className="flex items-center justify-center gap-2 text-xs font-semibold">
                            <span className="line-through text-[rgb(var(--hosting-choose-text-gray-500))]">
                              ${pricing.original.toFixed(2)}{originalSuffix}
                            </span>
                            {pricing.discountLabel && (
                              <span
                                className="px-2 py-0.5 rounded-full text-[11px]"
                                style={{
                                  backgroundColor: "rgba(var(--hosting-pick-discount-bg))",
                                  color: "rgb(var(--hosting-accent-cyan))",
                                }}
                              >
                                {pricing.discountLabel}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="text-[rgb(var(--hosting-text-white))] text-xl font-semibold tracking-tight">
                          ${pricing.price.toFixed(2)}
                          <span className="text-sm text-[rgb(var(--hosting-choose-text-gray-400))] ml-1">
                            {suffixMap[billing]}
                          </span>
                        </div>
                        {pricing.renewal && (
                          <div className="text-xs text-[rgb(var(--hosting-choose-text-gray-400))]">
                            Renews for ${pricing.renewal.toFixed(2)}{renewalSuffix}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-[rgb(var(--hosting-choose-text-gray-400))] text-xs space-y-1">
                        <div>Pricing unavailable</div>
                        <div className="text-[10px] opacity-75">Check console for details</div>
                      </div>
                    )}
                  </div>
                <a
                  href={buyNowUrlForPlan(plan.name, variant)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2.5 rounded-full text-xs font-semibold transition md:ml-auto text-center"
                  style={{
                    backgroundColor: "rgb(var(--hosting-choose-button-bg))",
                    color: "rgb(var(--hosting-text-white))",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgb(var(--hosting-choose-button-hover))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgb(var(--hosting-choose-button-bg))";
                  }}
                >
                  Buy Now
                </a>
              </div>
            );
            })}
          </div>
        </div>

        <div className="space-y-12 pt-2">
          {featureRows.map((row) => (
            <div
              key={row.label}
              className="text-sm text-[rgb(var(--hosting-choose-text-gray-300))] md:mr-0 lg:mr-24"
            >
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 text-[rgb(var(--hosting-text-white))] font-semibold text-base md:text-lg whitespace-nowrap">
                  {row.label}
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-[rgb(var(--hosting-choose-border-gray-600))]">
                    <Info
                      className="w-3 h-3 text-[rgb(var(--hosting-choose-text-gray-400))]"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="hidden md:block flex-1 border-t border-[rgb(var(--hosting-choose-border-gray-800))]" />
                </div>

                {row.helper && (
                  <div className="pl-7 text-xs uppercase tracking-wide text-[rgb(var(--hosting-choose-text-gray-400))]">
                    <span className="font-semibold text-[rgb(var(--hosting-text-white))]">
                      {row.helper.split(" ")[0]}
                    </span>{" "}
                    {row.helper.replace(row.helper.split(" ")[0], "").trim()}
                  </div>
                )}
                {row.sideNote && (
                  <div className="pl-7 text-[11px] uppercase tracking-[0.2em] text-[rgb(var(--hosting-choose-text-purple))]">
                    {row.sideNote}
                  </div>
                )}

                <div className="flex flex-col items-center gap-6 md:flex-row md:justify-end md:gap-8 lg:gap-12 md:ml-auto md:w-full lg:w-[726px]">
                  {row.values.map((value, idx) => {
                    const isCheck = value.stat === "✓";
                    const isCross = value.stat === "×";
                    const statClass = isCheck
                      ? "text-[rgb(var(--hosting-choose-text-green))]"
                      : isCross
                        ? "text-[rgb(var(--hosting-choose-text-gray-500))]"
                        : "text-[rgb(var(--hosting-text-white))]";
                    return (
                      <div
                        key={`${row.label}-${idx}`}
                        className="w-[210px] text-center space-y-2"
                      >
                        <div className={`text-2xl font-semibold ${statClass}`}>
                          {value.stat}
                        </div>
                        {value.description && (
                          <div className="text-[rgb(var(--hosting-choose-text-gray-400))] text-sm leading-relaxed">
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

        <div className="space-y-8 sm:space-y-10 pt-8 sm:pt-10 md:mr-0 lg:mr-24">
          <div className="flex items-center gap-2 text-[rgb(var(--hosting-text-white))] font-semibold text-base md:text-lg whitespace-nowrap">
            All plans include
            <span
              className="hidden md:block flex-1 border-t"
              style={{
                borderColor: "rgb(var(--hosting-choose-divider-border))",
              }}
            />
          </div>

          <div className="space-y-12">
            {allPlansSections.map((section) => {
              const initialCount =
                section.initialVisible ?? section.items.length;
              const isExpandable = section.items.length > initialCount;
              const isExpanded = expandedSections[section.label] ?? false;
              const visibleItems =
                isExpanded || !isExpandable
                  ? section.items
                  : section.items.slice(0, initialCount);

              return (
                <div key={section.label} className="space-y-4">
                  <div className="flex items-center gap-2 text-[rgb(var(--hosting-text-white))] font-semibold text-base md:text-lg whitespace-nowrap">
                    {section.label}
                    <span
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full border"
                      style={{
                        borderColor:
                          "rgb(var(--hosting-choose-border-gray-600))",
                      }}
                    >
                      <Info
                        className="w-3 h-3"
                        style={{
                          color: "rgb(var(--hosting-choose-text-gray-400))",
                        }}
                        strokeWidth={1.8}
                      />
                    </span>
                  </div>

                  {section.helper && (
                    <div className="pl-7 text-sm text-[rgb(var(--hosting-choose-text-gray-300))]">
                      {section.helper}
                    </div>
                  )}

                  {visibleItems.length > 0 && (
                    <div className="space-y-4 pl-7">
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-[rgb(var(--hosting-choose-text-gray-300))]">
                        {visibleItems.map((item, idx) => (
                          <div
                            key={`${section.label}-${idx}`}
                            className="flex items-center gap-1"
                          >
                            <span>{item.label}</span>
                            {item.info && (
                              <span
                                className="inline-flex items-center justify-center w-4 h-4 rounded-full border"
                                style={{
                                  borderColor:
                                    "rgb(var(--hosting-choose-border-gray-600))",
                                }}
                              >
                                <Info
                                  className="w-3 h-3"
                                  style={{
                                    color:
                                      "rgb(var(--hosting-choose-text-gray-400))",
                                  }}
                                  strokeWidth={1.8}
                                />
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      {isExpandable && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedSections((prev) => ({
                              ...prev,
                              [section.label]: !isExpanded,
                            }))
                          }
                          className="inline-flex items-center gap-1 rounded-full px-5 py-1.5 text-xs font-semibold text-[rgb(var(--hosting-text-white))] transition"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "rgba(var(--hosting-choose-showmore-hover))";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }}
                        >
                          {isExpanded ? "Show less" : "Show more"}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
  }
);

ChooseHosting.displayName = "ChooseHosting";

export default ChooseHosting;
