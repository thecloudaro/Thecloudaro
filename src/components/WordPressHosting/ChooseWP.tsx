"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Info, ShoppingCart } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import HostingPlanControls, {
  BillingCycle
} from "@/components/Hosting/HostingPlanControls";

type PlanKey = "starter" | "turbo" | "supersonic";

interface PlanConfig {
  key: PlanKey;
  name: string;
  pricing: Record<"monthly" | "yearly", number>;
}

interface FeatureValue {
  primary: string;
  secondary?: string;
}

interface FeatureRow {
  label: string;
  values: Record<PlanKey, FeatureValue>;
  helper?: {
    prefix?: string;
    highlight?: string;
    suffix?: string;
  };
  showInfo?: boolean;
}

const plans: PlanConfig[] = [
  {
    key: "starter",
    name: "Starter",
    pricing: {
      monthly: 5.88,
      yearly: 4.88
    }
  },
  {
    key: "turbo",
    name: "Turbo",
    pricing: {
      monthly: 9.88,
      yearly: 7.88
    }
  },
  {
    key: "supersonic",
    name: "Supersonic",
    pricing: {
      monthly: 12.88,
      yearly: 9.88
    }
  }
];

const featureRows: FeatureRow[] = [
  {
    label: "NVMe-powered storage",
    values: {
      starter: { primary: "10 GB" },
      turbo: { primary: "50 GB" },
      supersonic: { primary: "100 GB" }
    },
    showInfo: true
  },
  {
    label: "Monthly visits",
    values: {
      starter: { primary: "50K" },
      turbo: { primary: "200K" },
      supersonic: { primary: "500K" }
    },
    showInfo: true
  },
  {
    label: "CPU",
    values: {
      starter: { primary: "x1 CPU" },
      turbo: { primary: "x1.5 CPU" },
      supersonic: { primary: "x2 CPU" }
    },
    showInfo: true
  },
  {
    label: "Uptime",
    values: {
      starter: { primary: "99.99%" },
      turbo: { primary: "99.99%" },
      supersonic: { primary: "99.99%" }
    },
    showInfo: true
  },
  {
    label: "Bandwidth",
    values: {
      starter: { primary: "Unlimited" },
      turbo: { primary: "Unlimited" },
      supersonic: { primary: "Unlimited" }
    },
    showInfo: true
  },
  {
    label: "Email accounts",
    values: {
      starter: {
        primary: "1",
        secondary: "Free mailbox · first subscription period"
      },
      turbo: {
        primary: "1",
        secondary: "Free mailbox · first subscription period"
      },
      supersonic: {
        primary: "1",
        secondary: "Free mailbox · first subscription period"
      }
    },
    helper: {
      prefix: "1 free mailbox per domain ",
      highlight: "SPACEMAIL®"
    },
    showInfo: true
  },
  {
    label: "Free PositiveSSL",
    values: {
      starter: {
        primary: "1",
        secondary: "Free SSL certificate · first subscription period"
      },
      turbo: {
        primary: "1",
        secondary: "Free SSL certificate · first subscription period"
      },
      supersonic: {
        primary: "1",
        secondary: "Free SSL certificate · first subscription period"
      }
    },
    showInfo: true
  },
  {
    label: "HackGuardian",
    values: {
      starter: { primary: "Free site protection" },
      turbo: { primary: "Free site protection" },
      supersonic: { primary: "Free site protection" }
    },
    showInfo: true
  },
  {
    label: "MalwareGuardian",
    values: {
      starter: { primary: "Free 24/7 malware scanning" },
      turbo: {
        primary: "Free 24/7 malware scanning",
        secondary: "Automatic cleaning"
      },
      supersonic: {
        primary: "Free 24/7 malware scanning",
        secondary: "Automatic cleaning"
      }
    },
    showInfo: true
  }
];

const priceSuffix: Record<BillingCycle, string> = {
  monthly: "/mo",
  yearly: "/mo* billed yearly",
  biyearly: "/mo"
};

const ChooseWP = () => {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [dataCenter, setDataCenter] = useState("US");
  const [showAllServerFeatures, setShowAllServerFeatures] = useState(false);

  const formattedPlans = useMemo(
    () =>
      plans.map((plan) => ({
        ...plan,
        displayPrice: `$${plan.pricing[billing as "monthly" | "yearly"].toFixed(2)}`,
        suffix: priceSuffix[billing]
      })),
    [billing]
  );

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24" style={{ backgroundColor: 'rgb(var(--wp-choosewp-bg))', color: 'rgb(var(--wp-choosewp-heading))' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-8 sm:space-y-10 md:space-y-12">
        <div className="space-y-6 text-center">
          <ContentHeading
            title="Choose your plan"
            className="!text-[2.5rem] sm:!text-[3rem] md:!text-[3.5rem] font-bold !text-[rgb(var(--wp-choosewp-heading))]"
          />

          <p className="text-sm sm:text-base" style={{ color: 'rgba(var(--wp-choosewp-description))' }}>
            Select the plan that best fits your needs.
          </p>

          <div className="flex justify-center">
            <HostingPlanControls
              billing={billing}
              onBillingChange={setBilling}
              dataCenter={dataCenter}
              onDataCenterChange={setDataCenter}
              variant="flat"
              className="gap-4"
              showDivider={false}
              cycles={["monthly", "yearly"]}
              hideDataCenter
            />
          </div>
        </div>

        <div className="pt-4 ml-26">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-14">
            {formattedPlans.map((plan) => (
              <div key={plan.key} className="w-[200px] text-center space-y-3">
                <h3 className="text-[1.6rem] font-semibold" style={{ color: 'rgb(var(--wp-choosewp-plan-name))' }}>
                  {plan.name}
                </h3>
                <div className="text-xl font-semibold tracking-tight" style={{ color: 'rgb(var(--wp-choosewp-price))' }}>
                  {plan.displayPrice}
                  <span className="ml-2 text-[0.7rem]" style={{ color: 'rgba(var(--wp-choosewp-price-suffix))' }}>
                    {plan.suffix}
                  </span>
                </div>
                <button 
                  className="mx-auto flex items-center justify-center gap-2 rounded-full px-6 py-2 text-xs font-semibold uppercase tracking-wide transition"
                  style={{ 
                    backgroundColor: 'rgb(var(--wp-choosewp-button-bg))',
                    color: 'rgb(var(--wp-choosewp-button-text))'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(var(--wp-choosewp-button-hover))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--wp-choosewp-button-bg))';
                  }}
                >
                  <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2} />
                  Buy now
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-12 pt-2 ml-20">
          {featureRows.map((row) => (
            <div key={row.label} className="text-xs sm:text-sm" style={{ color: 'rgba(var(--wp-choosewp-feature-text))' }}>
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-semibold text-sm md:text-base" style={{ color: 'rgb(var(--wp-choosewp-feature-label))' }}>
                  {row.label}
                  {row.showInfo ? (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border" style={{ borderColor: 'rgba(var(--wp-choosewp-feature-border))' }}>
                      <Info className="h-3 w-3" style={{ color: 'rgba(var(--wp-choosewp-feature-icon))' }} strokeWidth={1.8} />
                    </span>
                  ) : null}
                  <span className="hidden flex-1 border-t md:block" style={{ borderColor: 'rgba(var(--wp-choosewp-feature-divider))' }} />
                </div>

                {row.helper ? (
                  <div className="pl-7 text-[0.65rem] uppercase tracking-[0.25em] sm:text-xs" style={{ color: 'rgba(var(--wp-choosewp-helper-text))' }}>
                    {row.helper.prefix ?? ""}
                    {row.helper.highlight ? (
                      <span style={{ color: 'rgb(var(--wp-choosewp-helper-highlight))' }}>{row.helper.highlight}</span>
                    ) : null}
                    {row.helper.suffix ?? ""}
                  </div>
                ) : null}

                <div className="flex flex-col gap-4 pl-1 sm:hidden">
                  {formattedPlans.map((plan) => (
                    <div key={`${row.label}-${plan.key}`} className="space-y-1">
                      <div className="text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: 'rgba(var(--wp-choosewp-plan-label))' }}>
                        {plan.name}
                      </div>
                      <div className="text-base font-semibold" style={{ color: 'rgb(var(--wp-choosewp-plan-value))' }}>
                        {row.values[plan.key].primary}
                      </div>
                      {row.values[plan.key].secondary ? (
                        <div className="text-xs" style={{ color: 'rgba(var(--wp-choosewp-plan-secondary))' }}>
                          {row.values[plan.key].secondary}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="hidden items-center justify-center gap-16 md:flex">
                  {formattedPlans.map((plan) => (
                    <div
                      key={`${row.label}-${plan.key}-desktop`}
                      className="w-[200px] text-center"
                    >
                      <div className="space-y-1">
                        <div className="text-xl font-semibold" style={{ color: 'rgb(var(--wp-choosewp-plan-value))' }}>
                          {row.values[plan.key].primary}
                        </div>
                        {row.values[plan.key].secondary ? (
                          <div className="text-xs" style={{ color: 'rgba(var(--wp-choosewp-plan-secondary))' }}>
                            {row.values[plan.key].secondary}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-10 pt-10 ml-20">
          <div className="flex items-center gap-2 font-semibold text-sm md:text-base" style={{ color: 'rgb(var(--wp-choosewp-section-label))' }}>
            All plans include
            <span className="hidden flex-1 border-t md:block" style={{ borderColor: 'rgba(var(--wp-choosewp-feature-divider))' }} />
          </div>

          <div className="space-y-10 text-left text-xs sm:text-sm" style={{ color: 'rgba(var(--wp-choosewp-section-text))' }}>
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-semibold" style={{ color: 'rgb(var(--wp-choosewp-section-label))' }}>
                Control panel features
                <Info className="h-3.5 w-3.5" style={{ color: 'rgba(var(--wp-choosewp-feature-icon))' }} strokeWidth={1.8} />
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-3 pl-6 text-[0.65rem] uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.25em]" style={{ color: 'rgba(var(--wp-choosewp-section-item))' }}>
                <span>Easy-to-use dashboard</span>
                <span>WordPress auto login</span>
                <span>Flexible upgrades and downgrades</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 font-semibold" style={{ color: 'rgb(var(--wp-choosewp-section-label))' }}>
                Websites
                <Info className="h-3.5 w-3.5" style={{ color: 'rgba(var(--wp-choosewp-feature-icon))' }} strokeWidth={1.8} />
              </div>
              <div className="pl-6 text-[0.65rem] uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.25em]" style={{ color: 'rgba(var(--wp-choosewp-section-item))' }}>
                One cloud-based WordPress website
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 font-semibold" style={{ color: 'rgb(var(--wp-choosewp-section-label))' }}>
                Server features
                <Info className="h-3.5 w-3.5" style={{ color: 'rgba(var(--wp-choosewp-feature-icon))' }} strokeWidth={1.8} />
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-3 pl-6 text-[0.65rem] uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.25em]" style={{ color: 'rgba(var(--wp-choosewp-section-item))' }}>
                <span>US Data Center Location</span>
                <span>Best-in-class hardware</span>
                <span>Professional server monitoring</span>
                <span>Advanced caching</span>
                <span>Automated PHP and web server updates</span>
                {showAllServerFeatures ? (
                  <>
                    <span>Container technology</span>
                    <span>Built-in DDoS protection</span>
                  </>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setShowAllServerFeatures((prev) => !prev)}
                className="ml-6 inline-flex items-center gap-1 rounded-full px-4 py-1 text-[0.65rem] font-semibold transition sm:text-xs"
                style={{ 
                  color: 'rgba(var(--wp-choosewp-showmore-text))',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'rgb(var(--wp-choosewp-showmore-hover-text))';
                  e.currentTarget.style.backgroundColor = 'rgba(var(--wp-choosewp-showmore-hover-bg))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(var(--wp-choosewp-showmore-text))';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {showAllServerFeatures ? "Show less" : "Show more"}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${showAllServerFeatures ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-[0.65rem]" style={{ color: 'rgba(var(--wp-choosewp-disclaimer))' }}>
          *Prices shown reflect introductory rates for first billing period.
        </p>
      </div>
    </section>
  );
};

export default ChooseWP;


