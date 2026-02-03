"use client";

import { useMemo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { wordpressPlanProductIds } from "@/config/hosting-plans";

type BillingCycle = "monthly" | "yearly";

interface CloudHostingPlansProps {
  billing: BillingCycle;
  onCompareClick?: () => void;
}

type PlanKey = "starter" | "turbo" | "supersonic";

interface PlanFeature {
  label?: string;
  emphasis: string;
  subNote?: string;
  subNoteClassName?: string;
}

interface PlanConfig {
  name: string;
  subtitle: string;
  promoPrice: string;
  promoLabel: string;
  regularPrice: string;
  badge?: string;
  features: PlanFeature[];
  coupon?: string;
  ctaLabel: string;
  renewsLabel: string;
  showPromoNote?: boolean;
}

// Buy Now URLs for WordPress hosting packages (order product page by plan)
const BUY_NOW_URLS: Record<PlanKey, string> = {
  starter: "https://my.thecloudaro.com/order/product?pid=93e8d569-d072-4568-03ea-64e853121607",
  turbo: "https://my.thecloudaro.com/order/product?pid=5983e230-6e75-4003-7edc-d4981d210d76",
  supersonic: "https://my.thecloudaro.com/order/product?pid=7831d635-0d82-490d-630a-049e176259e0",
};

const planContent: Record<PlanKey, PlanConfig> = {
  starter: {
    name: "WordPress Basic",
    subtitle: "Build your first website",
    regularPrice: "$9.88/mo",
    promoLabel: "",
    promoPrice: "$5.88",
    features: [
      { label: "5 GB", emphasis: "SSD Storage" },
      { label: "Unlimited", emphasis: "Bandwidth" },
      { label: "Unlimited", emphasis: "visitors" },
      { label: "Free", emphasis: "SSL" },
      { label: "5", emphasis: "Mailbox" },
      { label: "Backups Retention", emphasis: "x3" },
      { label: "1", emphasis: "Website" },
      { label: "Standard", emphasis: "Support" },
      { label: "WP", emphasis: "Staging" },
      { label: "WP Basic", emphasis: "Optimization" },
    ],
    ctaLabel: "Buy Now",
    renewsLabel: "Renews for $9.88/mo",
    showPromoNote: false,
  },
  turbo: {
    name: "WordPress Business",
    subtitle: "Propel your website to new places",
    regularPrice: "$18.88/mo",
    promoLabel: "",
    promoPrice: "$9.88",
    badge: "BEST CHOICE",
    features: [
      { label: "10 GB", emphasis: "SSD Storage" },
      { label: "Unlimited", emphasis: "Bandwidth" },
      { label: "Unlimited", emphasis: "visitors" },
      { label: "1x more", emphasis: "CPU & RAM" },
      { label: "Free", emphasis: "SSL" },
      { label: "10", emphasis: "Mailbox" },
      { label: "Backups Retention", emphasis: "x5" },
      { label: "3", emphasis: "Websites" },
      { label: "Free Domain 1 Year", emphasis: "(.com, .org, .xyz)" },
      { label: "WP", emphasis: "Staging" },
      { label: "Priority", emphasis: "Support" },
    ],
    ctaLabel: "Buy Now",
    renewsLabel: "Renews for $18.88/mo",
  },
  supersonic: {
    name: "WordPress Business Pro",
    subtitle: "Innovate and scale up your website",
    regularPrice: "$26.88/mo",
    promoLabel: "",
    promoPrice: "$12.88",
    features: [
      { label: "20 GB", emphasis: "SSD Storage" },
      { label: "Unlimited", emphasis: "Bandwidth" },
      { label: "Unlimited", emphasis: "visitors" },
      { label: "2x more", emphasis: "CPU & RAM" },
      { label: "Free", emphasis: "SSL" },
      { label: "20", emphasis: "Mailbox" },
      { label: "Backups Retention", emphasis: "x15" },
      { label: "5", emphasis: "Websites" },
      { label: "Free Domain 1 Year", emphasis: "(.com, .org, .xyz)" },
      { label: "WP", emphasis: "Staging" },
      { label: "Redis", emphasis: "Caching" },
      { label: "Priority", emphasis: "Support" },
    ],
    ctaLabel: "Buy Now",
    renewsLabel: "Renews for $26.88/mo",
  },
};

const emptyOverrides: Record<PlanKey, Partial<PlanConfig>> = {
  starter: {},
  turbo: {},
  supersonic: {}
};

const billingCopy: Record<BillingCycle, Record<PlanKey, Partial<PlanConfig>>> = {
  monthly: emptyOverrides,
  yearly: {
    starter: {
      regularPrice: "$118.56/yr",
      promoLabel: "50% OFF*",
      promoPrice: "$59.88",
      renewsLabel: "Renews for $118.56/yr",
    },
    turbo: {
      regularPrice: "$226.56/yr",
      promoLabel: "56% OFF*",
      promoPrice: "$99.88",
      renewsLabel: "Renews for $226.56/yr",
    },
    supersonic: {
      regularPrice: "$322.56/yr",
      promoLabel: "60% OFF*",
      promoPrice: "$129.88",
      renewsLabel: "Renews for $322.56/yr",
    }
  }
};

interface ApiPricing {
  monthly?: number | null;
  yearly?: number | null;
}

interface ApiPricingData {
  Starter?: ApiPricing;
  Turbo?: ApiPricing;
  Supersonic?: ApiPricing;
}

const CloudHostingPlans = ({ billing, onCompareClick }: CloudHostingPlansProps) => {
  const [apiPricing, setApiPricing] = useState<ApiPricingData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch pricing from API
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const starterProductId = wordpressPlanProductIds.Starter;
        const turboProductId = wordpressPlanProductIds.Turbo;
        const supersonicProductId = wordpressPlanProductIds.Supersonic;

        if (!starterProductId || !turboProductId || !supersonicProductId) {
          console.error('[CloudHostingPlans] ❌ Product IDs not configured');
          setLoading(false);
          return;
        }

        console.log('[CloudHostingPlans] 🚀 Fetching pricing from Upmind API...');

        const response = await fetch(
          `/api/wordpress-pricing?starter=${starterProductId}&turbo=${turboProductId}&supersonic=${supersonicProductId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const responseData = await response.json();

        if (!response.ok || !responseData.pricing) {
          console.warn('[CloudHostingPlans] ⚠️ API error or no pricing data, using static pricing');
          setApiPricing(null);
        } else {
          console.log('[CloudHostingPlans] ✅ Pricing data received:', responseData.pricing);
          setApiPricing(responseData.pricing);
        }
      } catch (error) {
        console.error('[CloudHostingPlans] ❌ Failed to fetch pricing:', error);
        setApiPricing(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  const plans = useMemo(() => {
    return (Object.keys(planContent) as PlanKey[]).map((key) => {
      const defaultPlan = planContent[key];
      const cycleOverrides = billingCopy[billing][key] ?? {};

      // Map plan key to API pricing key
      const apiKey = key === 'starter' ? 'Starter' : key === 'turbo' ? 'Turbo' : 'Supersonic';
      const pricing = apiPricing?.[apiKey as keyof ApiPricingData];

      // Use API pricing if available, otherwise use static pricing
      let finalPlan = {
        key,
        ...defaultPlan,
        ...cycleOverrides
      } as PlanConfig & { key: PlanKey };

      if (pricing && !loading) {
        // Prefer real Upmind yearly price if available.
        // If yearly is missing, fall back to 12 × monthly so toggle always works.
        const monthlyFromApi =
          pricing.monthly && pricing.monthly > 0 ? pricing.monthly : null;
        const yearlyFromApi =
          pricing.yearly && pricing.yearly > 0
            ? pricing.yearly
            : monthlyFromApi
            ? monthlyFromApi * 12
            : null;

        const price =
          billing === "yearly" ? yearlyFromApi : monthlyFromApi;

        if (price && price > 0) {
          const regularPrice = price * 1.5;
          const discountPercent = Math.round(
            ((regularPrice - price) / regularPrice) * 100
          );

          const promoPriceFormatted = `$${price.toFixed(2)}`;
          const regularPriceFormatted =
            billing === "yearly"
              ? `$${regularPrice.toFixed(2)}/yr`
              : `$${regularPrice.toFixed(2)}/mo`;

          finalPlan = {
            ...finalPlan,
            promoPrice: promoPriceFormatted,
            regularPrice: regularPriceFormatted,
            promoLabel: `${discountPercent}% OFF*`,
            renewsLabel:
              billing === "yearly"
                ? `Renews for $${price.toFixed(2)}/yr`
                : `Renews for $${price.toFixed(2)}/mo`,
          };
        }
      }

      return finalPlan;
    });
  }, [billing, apiPricing, loading]);

  return (
    <div className="relative z-10 mx-auto max-w-6xl -mt-6 px-6 pb-24 pt-10 sm:-mt-16 sm:px-10 sm:pt-12 lg:-mt-24 lg:pt-16">
      
      <div className="mt-12 grid gap-8 lg:grid-cols-[repeat(3,max-content)] lg:justify-center">
        {plans.map((plan) => (
          <div
            key={plan.key}
            className={cn(
              "flex w-full justify-center",
              plan.key === "turbo" ? "" : "lg:translate-y-5"
            )}
          >
            <PlanCard plan={plan} billing={billing} />
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-xs uppercase tracking-widest text-white/40">
        *Prices reflect discount on the first year.
      </p>

      <div className="mt-6 flex justify-center">
        <button 
          onClick={onCompareClick}
          className="rounded-full px-7 py-3 text-sm font-semibold transition"
          style={{
            backgroundColor: 'rgb(var(--cloud-hosting-button-bg))',
            color: 'rgb(var(--hosting-text-white))'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(var(--cloud-hosting-button-hover))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(var(--cloud-hosting-button-bg))';
          }}
        >
          Compare plans in detail
        </button>
      </div>
    </div>
  );
};

export default CloudHostingPlans;

interface PlanCardProps {
  plan: PlanConfig & { key: PlanKey };
  billing: BillingCycle;
}

const PlanCard = ({ plan, billing }: PlanCardProps) => {
  const isFeatured = plan.key === "turbo";

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col justify-between border border-white/10 p-8 text-left transition duration-300 hover:-translate-y-2 lg:min-w-[240px] lg:max-w-[280px]",
        isFeatured && "lg:scale-[1.015] lg:min-w-[260px] lg:max-w-[300px]"
      )}
      style={{
        backgroundColor: isFeatured ? 'rgb(var(--cloud-hosting-card-featured-bg))' : 'rgb(var(--cloud-hosting-card-bg))',
        color: 'rgb(var(--hosting-text-white))',
        boxShadow: '0 18px 60px rgba(var(--cloud-hosting-card-shadow))',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 28px 90px rgba(var(--cloud-hosting-card-shadow-hover))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 18px 60px rgba(var(--cloud-hosting-card-shadow))';
      }}
    >
      {plan.badge ? (
        <div className="absolute left-1/2 top-6 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: 'rgb(var(--cloud-hosting-badge))' }}>
          {plan.badge}
        </div>
      ) : null}

      <div className={cn("space-y-2", plan.badge ? "pt-10" : "")}>
        <h3 className="text-2xl font-semibold">{plan.name}</h3>
        <p className="text-sm text-white/70">{plan.subtitle}</p>
      </div>

      <div className="mt-6 space-y-2 text-xs text-white/60">
        <div className="flex items-center gap-3">
          <span className="text-base line-through">{plan.regularPrice}</span>
        </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold leading-none tracking-tight">
            {plan.promoPrice}
          </span>
            <span className="text-xs font-semibold text-white/70">
            {billing === "yearly" ? "/yr" : "/mo"}
          </span>
        </div>
        {billing === "yearly" && (
          <p className="text-xs text-white/50">
            ${(parseFloat(plan.promoPrice.replace('$', '')) / 12).toFixed(2)}/mo billed yearly
          </p>
        )}
        {plan.showPromoNote ? (
          <p className="text-xs text-white/50">First month free with promo code</p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 text-xs leading-relaxed text-white/80">
        {plan.features.map((feature, index) => (
          <div key={index} className="pb-3 last:pb-0">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              {feature.label ? (
                <span className="font-semibold text-white text-sm">
                  {feature.label}
                </span>
              ) : null}
              <span className="font-medium text-white underline decoration-dotted decoration-white/40 underline-offset-4 text-sm">
                {feature.emphasis}
              </span>
            </div>
            {feature.subNote ? (
              <span
                className="mt-1 block text-xs"
                style={{
                  color: feature.subNoteClassName
                    ? "rgb(var(--cloud-hosting-subnote))"
                    : "rgba(var(--cloud-hosting-subnote-default))",
                }}
              >
                {feature.subNote}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      {/* Buy Now */}
      <a
        href={BUY_NOW_URLS[plan.key]}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded-full bg-white px-5 py-2 text-xs font-semibold text-center transition hover:bg-white/90"
        style={{ color: "#000" }}
      >
        Buy Now
      </a>
    </div>
  );
};