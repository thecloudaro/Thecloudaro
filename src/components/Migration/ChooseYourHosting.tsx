"use client";

import { useMemo, useState } from "react";
import ContentHeading from "@/components/ui/content-heading";
import HostingPlanControls, {
  type BillingCycle
} from "@/components/Hosting/HostingPlanControls";
import { motion } from "framer-motion";
import Link from "next/link";


type HostingPlan = {
  name: string;
  description: string;
  pricing: Record<
    BillingCycle,
    {
      price: number;
      renewal: number;
      original: number;
      discountLabel: string;
      perMonth: number;
    }
  >;
  popular?: boolean;
  features: {
    cpu: string;
    storage: string;
    domains: string;
    websites: string;
    ssl: boolean;
    mailboxes: string;
    spacemail: boolean;
    imunify360: boolean;
    websiteBuilder: boolean;
    wordpressAI: boolean;
  };
};

const plans: HostingPlan[] = [
  {
    name: "Essential",
    description: "Perfect for starting out",
    pricing: {
      monthly: {
        price: 3.88,
        renewal: 3.88,
        original: 5.88,
        discountLabel: "31% OFF*",
        perMonth: 3.88
      },
      yearly: {
        price: 19.88,
        renewal: 19.88,
        original: 28.88,
        discountLabel: "31% OFF*",
        perMonth: 1.66
      },
      biyearly: {
        price: 34.88,
        renewal: 34.88,
        original: 48.88,
        discountLabel: "29% OFF*",
        perMonth: 1.45
      }
    },
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
      wordpressAI: false
    }
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
        perMonth: 4.88
      },
      yearly: {
        price: 28.88,
        renewal: 28.88,
        original: 48.88,
        discountLabel: "41% OFF*",
        perMonth: 2.41
      },
      biyearly: {
        price: 54.88,
        renewal: 54.88,
        original: 88.88,
        discountLabel: "38% OFF*",
        perMonth: 2.29
      }
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
      wordpressAI: true
    }
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
        perMonth: 6.88
      },
      yearly: {
        price: 38.88,
        renewal: 38.88,
        original: 68.88,
        discountLabel: "44% OFF*",
        perMonth: 3.24
      },
      biyearly: {
        price: 72.88,
        renewal: 72.88,
        original: 118.88,
        discountLabel: "39% OFF*",
        perMonth: 3.04
      }
    },
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
      wordpressAI: true
    }
  }
];

const ChooseYourHosting = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const [dataCenter, setDataCenter] = useState("US");

  const billingSuffix = useMemo(() => {
    switch (billingCycle) {
      case "monthly":
        return "/mo";
      case "biyearly":
        return "/2yr";
      default:
        return "/yr";
    }
  }, [billingCycle]);

  return (
    <section className="py-24" style={{ backgroundColor: 'rgb(var(--migration-choose-bg))', color: 'rgb(var(--migration-choose-text))' }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <ContentHeading
          title="Choose your hosting"
          className="!text-[2.75rem] font-bold sm:!text-[3.5rem] md:!text-[4.25rem] !text-[rgb(var(--migration-choose-heading))]"
        />

        <div className="mt-12 flex w-full flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-14">
          <HostingPlanControls
            billing={billingCycle}
            onBillingChange={setBillingCycle}
            dataCenter={dataCenter}
            onDataCenterChange={setDataCenter}
            variant="plain"
          />
        </div>

        <div className="mt-24 grid w-full gap-14 justify-center grid-cols-1 md:[grid-template-columns:repeat(3,320px)]">
          {plans.map((plan, index) => {
            const pricing = plan.pricing[billingCycle];
            const perMonthLabel =
              billingCycle === "monthly"
                ? `Renews for $${pricing.renewal.toFixed(2)}/mo`
                : `$${pricing.perMonth.toFixed(2)}/mo`;

            return (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative flex w-full flex-col rounded-md px-8 py-10 text-left md:mx-1 md:w-[320px] ${
                  plan.popular
                    ? "md:-mt-4 md:scale-[1.04]"
                    : ""
                }`}
                style={{
                  backgroundColor: 'rgb(var(--migration-choose-card-bg))',
                  boxShadow: plan.popular 
                    ? `0 32px 80px rgba(var(--migration-choose-card-popular-shadow))`
                    : `0 24px 48px rgba(var(--migration-choose-card-shadow))`
                }}
              >
                {plan.popular && (
                  <span className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.18em] !text-[rgb(var(--migration-choose-popular-badge))]">
                    Most popular
                  </span>
                )}

                <header className="space-y-2 text-center">
                  <h3 className="text-2xl font-bold !text-[rgb(var(--migration-choose-plan-name))]">{plan.name}</h3>
                  <p className="text-sm !text-[rgba(var(--migration-choose-description))]">{plan.description}</p>
                </header>

                <div className="my-8 space-y-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase !text-[rgba(var(--migration-choose-price-suffix))]">
                    <span className="line-through !text-[rgba(var(--migration-choose-original-price))]">
                      ${pricing.original.toFixed(2)}
                      {billingCycle === "monthly"
                        ? "/mo"
                        : billingCycle === "biyearly"
                        ? "/2yr"
                        : "/yr"}
                    </span>
                    <span className="rounded-full px-2 py-0.5" style={{ backgroundColor: 'rgba(var(--migration-choose-discount-bg))', color: 'rgb(var(--migration-choose-discount-text))' }}>
                      {pricing.discountLabel}
                    </span>
                  </div>

                  <div className="text-5xl font-semibold !text-[rgb(var(--migration-choose-price))]">
                    ${pricing.price.toFixed(2)}
                    <span className="ml-1 text-2xl !text-[rgba(var(--migration-choose-price-suffix))]">
                      {billingSuffix}
                    </span>
                  </div>

                  <p className="text-sm !text-[rgba(var(--migration-choose-permonth))]">{perMonthLabel}</p>
                </div>

                <ul className="flex flex-1 flex-col gap-3 text-sm !text-[rgba(var(--migration-choose-features))]">
                  <li>{plan.features.cpu}</li>
                  <li>{plan.features.storage}</li>
                  <li>{plan.features.domains}</li>
                  <li className="font-semibold !text-[rgb(var(--migration-choose-feature-highlight))]">
                    {plan.features.websites}
                  </li>
                  <li className="!text-[rgb(var(--migration-choose-feature-highlight))]">
                    Secured by <span className="!text-[rgb(var(--migration-choose-ssl))]">SSL</span>
                  </li>
                  <li>{plan.features.mailboxes}</li>
                  <li>
                    Powered by{" "}
                    <span className="!text-[rgb(var(--migration-choose-spacemail))]">SPACEMAIL®</span>
                  </li>
                  {plan.features.imunify360 && <li>Imunify360 Protection</li>}
                  {plan.features.websiteBuilder && <li>Website Builder</li>}
                  {plan.features.wordpressAI && <li>WordPress AI Tools</li>}
                </ul>

                <button 
                  className="mt-10 w-full rounded-full py-3 text-sm font-semibold transition"
                  style={{ 
                    backgroundColor: 'rgb(var(--migration-choose-button-bg))',
                    color: 'rgb(var(--migration-choose-button-text))'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--migration-choose-button-hover))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--migration-choose-button-bg))';
                  }}
                >
                  Add to cart
                </button>

                <p className="mt-4 text-center text-xs !text-[rgba(var(--migration-choose-disclaimer))]">
                  You pay ${pricing.price.toFixed(2)} — renews for $
                  {pricing.renewal.toFixed(2)}
                  {billingCycle === "monthly" ? "/mo" : billingSuffix}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-5 text-center mt-20">
          <p className="text-xs !text-[rgba(var(--migration-choose-note))]">
            *Prices reflect discount on the first billing cycle.
          </p>
          <Link href="/web-hosting">
  <button 
    className="rounded-full px-7 py-3 text-sm font-semibold transition"
    style={{ 
      backgroundColor: 'rgb(var(--migration-choose-bottom-button-bg))',
      color: 'rgb(var(--migration-choose-bottom-button-text))'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor =
        'rgb(var(--migration-choose-bottom-button-hover-bg))';
      e.currentTarget.style.color =
        'rgb(var(--migration-choose-bottom-button-hover-text))';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor =
        'rgb(var(--migration-choose-bottom-button-bg))';
      e.currentTarget.style.color =
        'rgb(var(--migration-choose-bottom-button-text))';
    }}
  >
    Go to Web Hosting
  </button>
</Link>

        </div>
      </div>
    </section>
  );
};

export default ChooseYourHosting;


