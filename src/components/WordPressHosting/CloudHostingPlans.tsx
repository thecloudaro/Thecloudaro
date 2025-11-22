"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

type BillingCycle = "monthly" | "yearly";

interface CloudHostingPlansProps {
  billing: BillingCycle;
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

const planContent: Record<PlanKey, PlanConfig> = {
  starter: {
    name: "EasyWP Starter",
    subtitle: "Build your first website",
    regularPrice: "$9.88/mo",
    promoLabel: "40% OFF*",
    promoPrice: "$5.88",
    features: [
      { label: "10 GB", emphasis: "SSD Storage" },
      { label: "Unlimited", emphasis: "bandwidth" },
      { label: "Unlimited", emphasis: "number of visitors" },
      { label: "FREE", emphasis: "SSL" },
      {
        label: "FREE",
        emphasis: "mailbox",
        subNote: "Powered by SPACEMAIL®",
        subNoteClassName: ""
      },
      { emphasis: "HackGuardian" }
    ],
    coupon: "EASYWPDEAL",
    ctaLabel: "Add to cart",
    renewsLabel: "Renews for $9.88/mo",
    showPromoNote: true
  },
  turbo: {
    name: "EasyWP Turbo",
    subtitle: "Propel your website to new places",
    regularPrice: "$18.88/mo",
    promoLabel: "48% OFF*",
    promoPrice: "$9.88",
    badge: "BEST CHOICE",
    features: [
      { label: "50 GB", emphasis: "SSD Storage" },
      { label: "Unlimited", emphasis: "bandwidth" },
      { label: "Unlimited", emphasis: "number of visitors" },
      { label: "1.5x", emphasis: "more CPU & RAM" },
      { label: "FREE", emphasis: "SSL" },
      {
        label: "FREE",
        emphasis: "mailbox",
        subNote: "Powered by SPACEMAIL®",
        subNoteClassName: ""
      },
      { emphasis: "HackGuardian" },
      { label: "MalwareGuardian", emphasis: "Autoclean protection" }
    ],
    ctaLabel: "Add to cart",
    renewsLabel: "Renews for $18.88/mo"
  },
  supersonic: {
    name: "EasyWP Supersonic",
    subtitle: "Innovate and scale up your website",
    regularPrice: "$26.88/mo",
    promoLabel: "52% OFF*",
    promoPrice: "$12.88",
    features: [
      { label: "100 GB", emphasis: "SSD Storage" },
      { label: "Unlimited", emphasis: "bandwidth" },
      { label: "Unlimited", emphasis: "number of visitors" },
      { label: "2x", emphasis: "more CPU & RAM" },
      { label: "FREE", emphasis: "SSL" },
      {
        label: "FREE",
        emphasis: "mailbox",
        subNote: "Powered by SPACEMAIL®",
        subNoteClassName: ""
      },
      { emphasis: "HackGuardian" },
      { label: "MalwareGuardian", emphasis: "Autoclean protection" }
    ],
    ctaLabel: "Add to cart",
    renewsLabel: "Renews for $26.88/mo"
  }
};

const emptyOverrides: Record<PlanKey, Partial<PlanConfig>> = {
  starter: {},
  turbo: {},
  supersonic: {}
};

const billingCopy: Record<BillingCycle, Record<PlanKey, Partial<PlanConfig>>> = {
  monthly: emptyOverrides,
  yearly: emptyOverrides
};

const formatPrice = (basePrice: string, billing: BillingCycle) => {
  if (billing === "yearly") {
    return basePrice.replace("/mo", "/mo (yearly)");
  }
  return basePrice;
};

const CloudHostingPlans = ({ billing }: CloudHostingPlansProps) => {
  const plans = useMemo(() => {
    return (Object.keys(planContent) as PlanKey[]).map((key) => {
      const defaultPlan = planContent[key];
      const cycleOverrides = billingCopy[billing][key] ?? {};

      return {
        key,
        ...defaultPlan,
        ...cycleOverrides
      } as PlanConfig & { key: PlanKey };
    });
  }, [billing]);

  return (
    <div className="relative z-10 mx-auto max-w-6xl -mt-6 px-6 pb-24 pt-10 sm:-mt-20 sm:px-10 sm:pt-12 lg:-mt-30 lg:pt-16">
      
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
          <span className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: 'rgb(var(--cloud-hosting-badge-text))' }}>
            {plan.promoLabel}
          </span>
        </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold leading-none tracking-tight">
            {plan.promoPrice}
          </span>
            <span className="text-xs font-semibold text-white/70">
            {billing === "yearly" ? "/mo* billed yearly" : "/mo"}
          </span>
        </div>
        {plan.showPromoNote ? (
          <p className="text-xs text-white/50">First month free with promo code</p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 text-xs leading-relaxed text-white/80">
        {plan.features.map((feature, index) => (
          <div key={index} className="pb-3 last:pb-0">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              {feature.label ? (
                <span className="font-semibold text-white text-sm">{feature.label}</span>
              ) : null}
              <span className="font-medium text-white underline decoration-dotted decoration-white/40 underline-offset-4 text-sm">
                {feature.emphasis}
              </span>
            </div>
            {feature.subNote ? (
              <span
                className="mt-1 block text-xs"
                style={{ color: feature.subNoteClassName ? 'rgb(var(--cloud-hosting-subnote))' : 'rgba(var(--cloud-hosting-subnote-default))' }}
              >
                {feature.subNote}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      {plan.coupon ? (
        <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">
            Use this to get 1 month free
          </p>
          <div className="mt-2 flex items-center justify-between text-xs font-semibold">
            <span>{plan.coupon}</span>
            <button className="rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-wide text-white/90 transition hover:bg-white/30">
              Copy
            </button>
          </div>
        </div>
      ) : null}

      <button className="mt-6 rounded-full bg-white px-5 py-2 text-xs font-semibold text-black transition hover:bg-white/90">
        {plan.ctaLabel}
      </button>
      <p className="mt-2 text-center text-[10px] text-white/40">
        {billing === "yearly"
          ? formatPrice(plan.renewsLabel, billing)
          : plan.renewsLabel}
      </p>
    </div>
  );
};


