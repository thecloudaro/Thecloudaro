"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import HostingPlanControls, {
  type BillingCycle
} from "@/components/Hosting/HostingPlanControls";

import { getCSSVariable, getCSSVariableRGBA, createHoverHandler } from "@/lib/migrateEmailUtils";

// Mailbox Counter Component
interface MailboxCounterProps {
  value: number;
  min: number;
  extraPrice: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const MailboxCounter = ({ value, min, extraPrice, onDecrease, onIncrease }: MailboxCounterProps) => {
  const borderColor = getCSSVariableRGBA('choose-email-border-white-20');
  const textColor = getCSSVariableRGBA('migrate-email-hero-text-85');
  const textColorWhite = getCSSVariable('migrate-email-simple-text-white');

  const buttonBaseStyle = {
    border: `1px solid ${borderColor}`,
    color: textColor,
    transition: 'all 0.2s'
  };

  const decreaseHover = createHoverHandler({ 
    color: value > min ? textColorWhite : textColor 
  });

  const increaseHover = createHoverHandler({ 
    color: textColorWhite 
  });

  return (
    <div className="mb-6 pt-4 pb-4 border-t border-b" style={{ borderColor: getCSSVariableRGBA('choose-email-border-white-10') }}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm mb-1" style={{ color: textColor }}>Mailboxes</div>
          <div className="text-xs whitespace-nowrap -ml-2" style={{ color: textColor }}>
            +${extraPrice.toFixed(2)}/mo per extra mailbox
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onDecrease}
            disabled={value <= min}
            className="flex h-5 w-5 items-center justify-center rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed border"
            style={buttonBaseStyle}
            {...(value > min ? decreaseHover : {})}
          >
            <Minus size={12} />
          </button>
          <span className="text-lg font-semibold min-w-[24px] text-center" style={{ color: textColorWhite }}>
            {value}
          </span>
          <button
            onClick={onIncrease}
            className="flex h-5 w-5 items-center justify-center rounded-full transition border"
            style={buttonBaseStyle}
            {...increaseHover}
          >
            <Plus size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Feature List Component
interface FeatureListProps {
  features: {
    emailCalendar: string;
    twoFA: string;
    aiAssistant: string;
    aliases: string;
    mailboxes: string;
    storage: string;
  };
}

const FeatureList = ({ features }: FeatureListProps) => {
  const textColor = getCSSVariableRGBA('migrate-email-hero-text-85');
  const textColorWhite = getCSSVariable('migrate-email-simple-text-white');

  const renderFeature = (text: string, boldWords: number = 1) => {
    const words = text.split(' ');
    const boldPart = words.slice(0, boldWords).join(' ');
    const rest = words.slice(boldWords).join(' ');
    
    return (
      <span>
        <span className="font-semibold" style={{ color: textColorWhite }}>
          {boldPart}{" "}
        </span>
        {rest}
      </span>
    );
  };

  return (
    <ul className="flex flex-1 flex-col gap-3 text-sm mb-8" style={{ color: textColor }}>
      <li>{features.emailCalendar}</li>
      <li>{features.twoFA}</li>
      <li>{features.aiAssistant}</li>
      <li>{renderFeature(features.aliases)}</li>
      <li>{renderFeature(features.mailboxes)}</li>
      <li>{renderFeature(features.storage, 2)}</li>
    </ul>
  );
};

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
        price: 2.32,
        renewal: 2.32,
        original: 2.32,
        discountLabel: "",
        perMonth: 2.32
      },
      yearly: {
        price: 20.08,
        renewal: 27.88,
        original: 27.88,
        discountLabel: "28% OFF *",
        perMonth: 1.67
      },
      biyearly: {
        price: 40.16,
        renewal: 55.76,
        original: 55.76,
        discountLabel: "28% OFF *",
        perMonth: 1.67
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
        price: 0.74,
        renewal: 0.74,
        original: 0.74,
        discountLabel: "",
        perMonth: 0.74
      },
      yearly: {
        price: 6.88,
        renewal: 8.88,
        original: 8.88,
        discountLabel: "23% OFF *",
        perMonth: 0.57
      },
      biyearly: {
        price: 13.76,
        renewal: 17.76,
        original: 17.76,
        discountLabel: "23% OFF *",
        perMonth: 0.57
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
        price: 0.57,
        renewal: 0.57,
        original: 0.57,
        discountLabel: "",
        perMonth: 0.57
      },
      yearly: {
        price: 5.64,
        renewal: 6.88,
        original: 6.88,
        discountLabel: "18% OFF *",
        perMonth: 0.47
      },
      biyearly: {
        price: 11.28,
        renewal: 13.76,
        original: 13.76,
        discountLabel: "18% OFF *",
        perMonth: 0.47
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

const ChooseEmail = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const [mailboxCounts, setMailboxCounts] = useState<Record<string, number>>(
    plans.reduce((acc, plan) => ({ ...acc, [plan.name]: plan.defaultMailboxes }), {})
  );


  const updateMailboxCount = useCallback((planName: string, delta: number) => {
    setMailboxCounts((prev) => {
      const current = prev[planName] || 0;
      const newCount = Math.max(1, current + delta);
      return { ...prev, [planName]: newCount };
    });
  }, []);

  const calculateTotalPrice = useCallback((plan: EmailPlan, mailboxCount: number) => {
    const pricing = plan.pricing[billingCycle];
    const extraMailboxes = Math.max(0, mailboxCount - plan.defaultMailboxes);
    const monthsMultiplier = billingCycle === "yearly" ? 12 : billingCycle === "biyearly" ? 24 : 1;
    const extraCost = extraMailboxes * plan.extraMailboxPrice * monthsMultiplier;
    return pricing.price + extraCost;
  }, [billingCycle]);

  const calculateRenewalPrice = useCallback((plan: EmailPlan, mailboxCount: number) => {
    const pricing = plan.pricing[billingCycle];
    const extraMailboxes = Math.max(0, mailboxCount - plan.defaultMailboxes);
    const monthsMultiplier = billingCycle === "yearly" ? 12 : billingCycle === "biyearly" ? 24 : 1;
    const extraCost = extraMailboxes * plan.extraMailboxPrice * monthsMultiplier;
    return pricing.renewal + extraCost;
  }, [billingCycle]);

  return (
    <section className="relative overflow-hidden" style={{ color: 'rgb(var(--migrate-email-simple-text-white))' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[450px] overflow-hidden sm:h-[480px] lg:h-[540px]">
          <Image
            src="/MIgrationEmail/ChooseEmailBg.avif"
            alt="Choose email background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(var(--migrate-email-hero-overlay-from))' }} />
        </div>
        <div className="absolute inset-0 top-[450px] sm:top-[480px] lg:top-[540px]" style={{ backgroundColor: 'rgb(var(--migrate-email-simple-bg))' }} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-20 lg:px-8 lg:pb-12 lg:pt-24">
        <div className="mb-6 text-md font-semibold uppercase tracking-[0.35em]" style={{ color: 'rgba(var(--migrate-email-hero-brand-text))' }}>
          SPACEMAIL™
        </div>

        <ContentHeading
          title="Choose your plan"
          className="!text-[2.5rem] font-bold text-[rgb(var(--migrate-email-simple-text-white))] sm:!text-[3.5rem] md:!text-[5rem]"
        />

        <ContentDescription
          size="xl"
          className="mt-4 text-lg sm:text-xl md:text-2xl max-w-4xl text-[rgba(var(--migrate-email-hero-text-85))]"
        >
          Whatever you need it for, you&apos;ll find the right Spacemail plan for you.
        </ContentDescription>

        <div className="mt-10 flex w-full flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-14">
          <HostingPlanControls
            billing={billingCycle}
            onBillingChange={setBillingCycle}
            dataCenter="US"
            onDataCenterChange={() => {}}
            variant="plain"
            hideDataCenter
          />
        </div>

        <div className="mt-6 sm:mt-8 md:mt-14 grid w-full gap-8 justify-center grid-cols-1 md:[grid-template-columns:repeat(3,320px)]">
          {plans.map((plan, index) => {
            const pricing = plan.pricing[billingCycle];
            const mailboxCount = mailboxCounts[plan.name] || plan.defaultMailboxes;
            const totalPrice = calculateTotalPrice(plan, mailboxCount);
            const renewalPrice = calculateRenewalPrice(plan, mailboxCount);

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
                  backgroundColor: 'rgb(var(--choose-email-card-bg))',
                  boxShadow: plan.popular 
                    ? `0 32px 80px rgba(var(--choose-email-card-shadow-popular))`
                    : `0 24px 48px rgba(var(--choose-email-card-shadow-regular))`
                }}
              >
                {plan.popular && (
                  <span className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'rgb(var(--choose-email-popular-badge))' }}>
                    MOST POPULAR
                  </span>
                )}

                <header className="space-y-2 text-center">
                  <h3 className="text-2xl font-bold text-[rgb(var(--migrate-email-simple-text-white))]">{plan.name}</h3>
                  <p className="text-sm" style={{ color: 'rgba(var(--migrate-email-hero-text-85))' }}>{plan.description}</p>
                </header>

                <div className="my-8 space-y-4 text-center">
                  {pricing.discountLabel && (
                    <div className="flex items-center justify-center gap-2 text-xs font-semibold">
                      <span className="line-through" style={{ color: 'rgba(var(--migrate-email-hero-text-85))' }}>
                        ${pricing.original.toFixed(2)}/mo
                      </span>
                      <span className="rounded-md px-2 py-0.5 text-[rgb(var(--migrate-email-simple-text-white))] text-[10px] font-bold" style={{ backgroundColor: 'rgb(var(--choose-email-discount-bg))' }}>
                        {pricing.discountLabel}
                      </span>
                    </div>
                  )}

                  <div className="text-4xl font-bold text-[rgb(var(--migrate-email-simple-text-white))]">
                    ${pricing.perMonth.toFixed(2)}
                    <span className="ml-1 text-lg" style={{ color: 'rgba(var(--migrate-email-hero-text-85))' }}>/mo</span>
                  </div>
                  {billingCycle === "yearly" && (
                    <p className="text-sm" style={{ color: 'rgba(var(--migrate-email-hero-text-85))' }}>${totalPrice.toFixed(2)}/yr</p>
                  )}
                </div>

                {/* Mailbox Selector */}
                <MailboxCounter
                  value={mailboxCount}
                  min={1}
                  extraPrice={plan.extraMailboxPrice}
                  onDecrease={() => updateMailboxCount(plan.name, -1)}
                  onIncrease={() => updateMailboxCount(plan.name, 1)}
                />

                {/* Features List */}
                <FeatureList features={plan.features} />

                {/* Buttons */}
                <button 
                  className="w-full rounded-full px-4 py-2.5 text-sm font-semibold transition"
                  style={{
                    backgroundColor: getCSSVariable('choose-email-button-white-bg'),
                    color: getCSSVariable('choose-email-button-white-text')
                  }}
                  {...createHoverHandler({
                    backgroundColor: getCSSVariableRGBA('choose-email-button-hover-white')
                  })}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = getCSSVariable('choose-email-button-white-bg');
                  }}
                >
                  Add to cart
                </button>

                {/* Renewal Info */}
                {billingCycle === "yearly" && (
                  <p className="mt-4 text-center text-xs" style={{ color: 'rgba(var(--migrate-email-hero-text-85))' }}>
                    You pay ${totalPrice.toFixed(2)} - Renews for ${renewalPrice.toFixed(2)}/yr
                  </p>
                )}
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-xs" style={{ color: 'rgba(var(--migrate-email-hero-text-85))' }}>
            *Prices reflect discount on the first billing cycle.
          </p>
          <button 
            className="rounded-full px-6 py-2.5 text-sm font-semibold transition"
            style={{
              backgroundColor: getCSSVariable('choose-email-explore-button-bg'),
              color: getCSSVariable('migrate-email-simple-text-white')
            }}
            {...createHoverHandler({ opacity: '0.9' })}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Explore Spacemail
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChooseEmail;
