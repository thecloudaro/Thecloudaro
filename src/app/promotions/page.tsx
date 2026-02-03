"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface PromotionCard {
  id: string;
  productName: string;
  promoName: string;
  promoDescription: string;
  promoCode: string;
}

// Active promos (4 visible). Other promos hidden for now – re-enable when more promos are ready.
const promotions: PromotionCard[] = [
  {
    id: "1",
    productName: "Domain Names",
    promoName: "Pay what we Pay",
    promoDescription: "Applies to New Registrations",
    promoCode: "WelcomeCoupon",
  },
  {
    id: "2",
    productName: "Shared Hosting",
    promoName: "One-Time OFF",
    promoDescription: "Applies to New Customers per month for 2 months",
    promoCode: "LaunchH",
  },
  {
    id: "3",
    productName: "SSL Certificates",
    promoName: "Pay what we Pay",
    promoDescription: "Applies to New Registrations",
    promoCode: "SecureNow",
  },
  {
    id: "4",
    productName: "WordPress Hosting",
    promoName: "One-Time OFF",
    promoDescription: "Applies to New Customers per month for 2 months",
    promoCode: "LaunchWP",
  },
  // Hidden promos (re-enable later when more promos are available):
  // All Website Builder, DNS, Spacemail, Starlight™ Hyperlift, VM, VPN
];

export default function PromotionsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fail silently – no-op
    }
  };

  return (
    <div
      className="min-h-screen py-16 sm:py-20 md:py-24"
      style={{ backgroundColor: "rgb(var(--knowledge-categories-bg))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Page Heading */}
        <div className="mb-10 sm:mb-12 md:mb-14 text-center">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
            style={{ color: "rgb(var(--knowledge-categories-title-text))" }}
          >
            Promotions
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(var(--knowledge-categories-count-text))" }}
          >
            Discover active promotions across our products. Copy a promo code and apply it during checkout.
          </p>
        </div>

        {/* Promotion Cards */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {promotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="h-full p-4 sm:p-5 rounded-lg transition-all cursor-pointer flex flex-col"
                  style={{
                    backgroundColor: "rgb(var(--knowledge-categories-card-bg))",
                    border: "1px solid rgba(var(--knowledge-categories-card-border))",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(var(--knowledge-categories-card-border-hover))";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(var(--knowledge-categories-card-border))";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Product / Promo Name */}
                  <h3
                    className="text-base sm:text-lg font-bold mb-1"
                    style={{
                      color: "rgb(var(--knowledge-categories-title-text))",
                    }}
                  >
                    {promo.productName}
                  </h3>
                  <p
                    className="text-xs sm:text-sm mb-3"
                    style={{
                      color: "rgba(var(--knowledge-categories-count-text))",
                    }}
                  >
                    Promo: {promo.promoName}
                  </p>

                  {/* Description */}
                  <p
                    className="text-xs sm:text-sm mb-4 flex-1"
                    style={{
                      color: "rgba(var(--knowledge-categories-count-text))",
                    }}
                  >
                    {promo.promoDescription}
                  </p>

                  {/* Divider */}
                  <div
                    className="w-full mb-3 sm:mb-4"
                    style={{
                      borderTop:
                        "1px solid rgba(var(--knowledge-categories-card-border))",
                    }}
                  />

                  {/* Promo code + copy button */}
                  <div className="flex items-center justify-between gap-2 mt-auto">
                    <span
                      className="text-xs sm:text-sm font-mono px-2 py-1 rounded-md"
                      style={{
                        color: "rgb(var(--knowledge-categories-link-text))",
                        backgroundColor:
                          "rgba(var(--knowledge-categories-card-border), 0.3)",
                      }}
                    >
                      {promo.promoCode}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(promo.id, promo.promoCode)}
                      className="flex items-center gap-1 text-xs sm:text-sm font-medium px-2.5 py-1.5 rounded-full transition-colors"
                      style={{
                        color: "rgb(var(--knowledge-categories-link-text))",
                        backgroundColor:
                          "rgba(var(--knowledge-categories-card-border))",
                      }}
                    >
                      {copiedId === promo.id ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

