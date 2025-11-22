"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import HostingPlanControls, {
  type BillingCycle
} from "@/components/Hosting/HostingPlanControls";

type EmailPlan = {
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
  defaultMailboxes: number;
  extraMailboxPrice: number;
  features: {
    emailCalendar: string;
    twoFA: string;
    aiAssistant: string;
    aliases: string;
    mailboxes: string;
    storage: string;
  };
};

const plans: EmailPlan[] = [
  {
    name: "Advanced",
    description: "Perfect for businesses",
    pricing: {
      monthly: {
        price: 1.67,
        renewal: 2.32,
        original: 2.32,
        discountLabel: "28% OFF *",
        perMonth: 1.67
      },
      yearly: {
        price: 20.08,
        renewal: 27.88,
        original: 27.88,
        discountLabel: "28% OFF *",
        perMonth: 1.67
      },
      biyearly: {
        price: 38.88,
        renewal: 54.88,
        original: 54.88,
        discountLabel: "29% OFF *",
        perMonth: 1.62
      }
    },
    defaultMailboxes: 5,
    extraMailboxPrice: 0.57,
    features: {
      emailCalendar: "Email & Calendar for your domain",
      twoFA: "2FA protection",
      aiAssistant: "AI email assistant",
      aliases: "Unlimited aliases per mailbox",
      mailboxes: "5 mailboxes",
      storage: "10 GB per mailbox. Expand anytime."
    }
  },
  {
    name: "Pro",
    description: "Ideal for solopreneurs",
    popular: true,
    pricing: {
      monthly: {
        price: 0.57,
        renewal: 0.74,
        original: 0.74,
        discountLabel: "23% OFF *",
        perMonth: 0.57
      },
      yearly: {
        price: 6.88,
        renewal: 8.88,
        original: 8.88,
        discountLabel: "23% OFF *",
        perMonth: 0.57
      },
      biyearly: {
        price: 13.88,
        renewal: 17.88,
        original: 17.88,
        discountLabel: "22% OFF *",
        perMonth: 0.58
      }
    },
    defaultMailboxes: 1,
    extraMailboxPrice: 0.74,
    features: {
      emailCalendar: "Email & Calendar for your domain",
      twoFA: "2FA protection",
      aiAssistant: "AI email assistant",
      aliases: "10 aliases per mailbox",
      mailboxes: "1 mailbox",
      storage: "5 GB per mailbox. Expand anytime."
    }
  },
  {
    name: "Starter",
    description: "Ideal for beginners",
    pricing: {
      monthly: {
        price: 0.47,
        renewal: 0.57,
        original: 0.57,
        discountLabel: "18% OFF *",
        perMonth: 0.47
      },
      yearly: {
        price: 5.64,
        renewal: 6.88,
        original: 6.88,
        discountLabel: "18% OFF *",
        perMonth: 0.47
      },
      biyearly: {
        price: 11.88,
        renewal: 13.88,
        original: 13.88,
        discountLabel: "14% OFF *",
        perMonth: 0.5
      }
    },
    defaultMailboxes: 1,
    extraMailboxPrice: 0.74,
    features: {
      emailCalendar: "Email & Calendar for your domain",
      twoFA: "2FA protection",
      aiAssistant: "AI email assistant",
      aliases: "5 aliases per mailbox",
      mailboxes: "1 mailbox",
      storage: "3 GB per mailbox. Expand anytime."
    }
  }
];

const ChooseYourBusiness = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const [mailboxCounts, setMailboxCounts] = useState<Record<string, number>>(
    plans.reduce((acc, plan) => ({ ...acc, [plan.name]: plan.defaultMailboxes }), {})
  );

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

  const updateMailboxCount = (planName: string, delta: number) => {
    setMailboxCounts((prev) => {
      const current = prev[planName] || 0;
      const newCount = Math.max(0, current + delta);
      return { ...prev, [planName]: newCount };
    });
  };

  const calculateTotalPrice = (plan: EmailPlan, mailboxCount: number) => {
    const pricing = plan.pricing[billingCycle];
    const extraMailboxes = Math.max(0, mailboxCount - plan.defaultMailboxes);
    const extraCost =
      extraMailboxes * plan.extraMailboxPrice * (billingCycle === "yearly" ? 12 : billingCycle === "biyearly" ? 24 : 1);
    return pricing.price + extraCost;
  };

  return (
    <section className="relative overflow-hidden py-24 text-[rgb(var(--hosting-text-white))]" style={{ backgroundColor: 'rgb(var(--business-productivity-bg))' }}>
      {/* Purple Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute right-0 bottom-0 w-[800px] h-[800px] rounded-full blur-3xl" 
          style={{
            background: `linear-gradient(to top left, rgba(var(--business-choose-gradient-1-from)), rgba(var(--business-choose-gradient-1-via)), transparent)`
          }}
        />
        <div 
          className="absolute left-0 top-1/2 w-[600px] h-[600px] rounded-full blur-3xl" 
          style={{
            background: `linear-gradient(to bottom right, rgba(var(--business-choose-gradient-2-from)), transparent)`
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <span className="text-lg font-semibold uppercase tracking-[0.35em] mb-2" style={{ color: 'rgba(var(--business-productivity-text-white-70))' }}>
          Spacemail™
        </span>
        <ContentHeading
          title="Choose your business<br/>email plan"
          className="!text-[2.5rem] font-bold text-[rgb(var(--hosting-text-white))] sm:!text-[3.5rem] md:!text-[5rem]"
        />

        <ContentDescription
          size="xl"
          className="mt-4 text-lg sm:text-xl md:text-2xl max-w-4xl text-[rgba(var(--business-productivity-text-white-70))]"
        >
          Benefit from our high-quality, budget-friendly email service
        </ContentDescription>

        <div className="mt-12 flex w-full flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-14">
          <HostingPlanControls
            billing={billingCycle}
            onBillingChange={setBillingCycle}
            dataCenter="US"
            onDataCenterChange={() => {}}
            variant="plain"
            hideDataCenter
          />
        </div>

        <div className="mt-16 grid w-full gap-8 justify-center grid-cols-1 md:[grid-template-columns:repeat(3,320px)]">
          {plans.map((plan, index) => {
            const pricing = plan.pricing[billingCycle];
            const mailboxCount = mailboxCounts[plan.name] || plan.defaultMailboxes;
            const totalPrice = calculateTotalPrice(plan, mailboxCount);
            const renewalPrice = pricing.renewal + (Math.max(0, mailboxCount - plan.defaultMailboxes) * plan.extraMailboxPrice * (billingCycle === "yearly" ? 12 : billingCycle === "biyearly" ? 24 : 1));

            return (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative flex w-full flex-col rounded-lg px-8 py-10 text-left md:mx-1 md:w-[320px] ${
                  plan.popular
                    ? "md:-mt-4 md:scale-[1.05]"
                    : ""
                }`}
                style={{
                  backgroundColor: 'rgb(var(--business-choose-card-bg))',
                  boxShadow: plan.popular 
                    ? '0 32px 80px rgba(var(--business-choose-card-shadow-popular))'
                    : '0 24px 48px rgba(var(--business-choose-card-shadow))'
                }}
              >
                {plan.popular && (
                  <span className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'rgb(var(--business-choose-popular-badge))' }}>
                    MOST POPULAR
                  </span>
                )}

                <header className="space-y-2 text-center">
                  <h3 className="text-2xl font-bold text-[rgb(var(--hosting-text-white))]">{plan.name}</h3>
                  <p className="text-sm" style={{ color: 'rgba(var(--business-choose-text-white-60))' }}>{plan.description}</p>
                </header>

                <div className="my-8 space-y-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold">
                    <span className="line-through" style={{ color: 'rgba(var(--business-choose-text-white-40))' }}>
                      ${pricing.original.toFixed(2)}
                      {billingSuffix}
                    </span>
                    <span className="rounded-md px-2 py-0.5 text-[rgb(var(--hosting-text-white))] text-[10px] font-bold" style={{ backgroundColor: 'rgb(var(--business-choose-discount-badge))' }}>
                      {pricing.discountLabel}
                    </span>
                  </div>

                  <div className="text-4xl font-bold text-[rgb(var(--hosting-text-white))]">
                    ${totalPrice.toFixed(2)}
                    {billingCycle === "yearly" && <span className="ml-1 text-lg" style={{ color: 'rgba(var(--business-choose-text-white-50))' }}>/yr</span>}
                    {billingCycle === "monthly" && <span className="ml-1 text-lg" style={{ color: 'rgba(var(--business-choose-text-white-50))' }}>/mo</span>}
                    {billingCycle === "biyearly" && <span className="ml-1 text-lg" style={{ color: 'rgba(var(--business-choose-text-white-50))' }}>/2yr</span>}
                  </div>
                  {billingCycle === "yearly" && (
                    <p className="text-sm" style={{ color: 'rgba(var(--business-choose-text-white-60))' }}>${pricing.perMonth.toFixed(2)}/mo</p>
                  )}
                </div>

                {/* Mailbox Selector */}
                <div className="mb-6 pt-4 pb-4 border-t border-b" style={{ borderColor: 'rgba(var(--business-choose-border-white-10))' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm mb-1" style={{ color: 'rgba(var(--business-choose-text-white-80))' }}>Mailboxes</div>
                      <div className="text-xs whitespace-nowrap -ml-2" style={{ color: 'rgba(var(--business-choose-text-white-50))' }}>
                        +${plan.extraMailboxPrice.toFixed(2)}/mo per extra mailbox
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateMailboxCount(plan.name, -1)}
                        disabled={mailboxCount <= 0}
                        className="flex h-5 w-5 items-center justify-center rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          borderColor: 'rgba(var(--business-choose-border-white-20))',
                          color: 'rgba(var(--business-productivity-text-white-70))'
                        }}
                        onMouseEnter={(e) => {
                          if (!e.currentTarget.disabled) {
                            e.currentTarget.style.color = 'rgb(var(--hosting-text-white))';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!e.currentTarget.disabled) {
                            e.currentTarget.style.color = 'rgba(var(--business-productivity-text-white-70))';
                          }
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-lg font-semibold text-[rgb(var(--hosting-text-white))] min-w-[24px] text-center">{mailboxCount}</span>
                      <button
                        onClick={() => updateMailboxCount(plan.name, 1)}
                        className="flex h-5 w-5 items-center justify-center rounded-full transition"
                        style={{
                          borderColor: 'rgba(var(--business-choose-border-white-20))',
                          color: 'rgba(var(--business-productivity-text-white-70))'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'rgb(var(--hosting-text-white))';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'rgba(var(--business-productivity-text-white-70))';
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <ul className="flex flex-1 flex-col gap-3 text-sm mb-8" style={{ color: 'rgba(var(--business-productivity-text-white-70))' }}>
                  <li>{plan.features.emailCalendar}</li>
                  <li>{plan.features.twoFA}</li>
                  <li>{plan.features.aiAssistant}</li>
                  <li>{plan.features.aliases}</li>
                  <li>{plan.features.mailboxes}</li>
                  <li>{plan.features.storage}</li>
                </ul>

                {/* Buttons */}
                <button 
                  className="w-full rounded-full px-4 py-2.5 text-sm font-semibold transition"
                  style={{
                    backgroundColor: 'rgb(var(--business-choose-button-white-bg))',
                    color: 'rgb(var(--business-choose-button-white-text))'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--business-choose-button-white-hover))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--business-choose-button-white-bg))';
                  }}
                >
                  Add to cart
                </button>

                {/* Renewal Info */}
                <p className="mt-4 text-center text-xs" style={{ color: 'rgba(var(--business-choose-text-white-50))' }}>
                  You pay ${totalPrice.toFixed(2)} - Renews for ${renewalPrice.toFixed(2)}
                  {billingCycle === "monthly" ? "/mo" : billingSuffix}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-xs" style={{ color: 'rgba(var(--business-choose-text-white-50))' }}>
            *Prices reflect discount on the first billing cycle.
          </p>
          <button 
            className="rounded-full px-6 py-2.5 text-sm font-semibold transition"
            style={{
              backgroundColor: 'rgb(var(--business-choose-compare-bg))',
              color: 'rgb(var(--business-choose-compare-text))'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgb(var(--business-choose-compare-hover-bg))';
              e.currentTarget.style.color = 'rgb(var(--business-choose-compare-hover-text))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgb(var(--business-choose-compare-bg))';
              e.currentTarget.style.color = 'rgb(var(--business-choose-compare-text))';
            }}
          >
            Compare plans in detail
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChooseYourBusiness;

