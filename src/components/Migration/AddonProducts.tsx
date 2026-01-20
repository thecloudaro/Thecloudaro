"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

interface ProductPricing {
  price: number;
  renewal: number;
}

interface AddonProduct {
  id: string;
  name: string;
  description?: string;
  pricing: ProductPricing;
  // When API is ready, these will come from API
}

const defaultProducts: AddonProduct[] = [
  {
    id: "website-builder",
    name: "Website Builder",
    pricing: {
      price: 3.88,
      renewal: 3.88,
    },
  },
  {
    id: "wordpress-ai-tools",
    name: "WordPress AI Tools",
    pricing: {
      price: 4.88,
      renewal: 4.88,
    },
  },
  {
    id: "wordpress-ai-tools-pro",
    name: "WordPress AI Tools",
    pricing: {
      price: 6.88,
      renewal: 6.88,
    },
  },
];

const AddonProducts = () => {
  const [products, setProducts] = useState<AddonProduct[]>(defaultProducts);
  const [loading, setLoading] = useState(false);

  // TODO: When backend API is ready, fetch pricing from API
  // useEffect(() => {
  //   const fetchPricing = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch('/api/addon-products-pricing');
  //       const data = await response.json();
  //       if (data.success && data.products) {
  //         setProducts(data.products);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch addon products pricing:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchPricing();
  // }, []);

  return (
    <section
      className="py-24"
      style={{
        backgroundColor: "rgb(var(--migration-choose-bg))",
        color: "rgb(var(--migration-choose-text))",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <ContentHeading
            title="Add-ons and Tools"
            className="!text-[2.75rem] font-bold sm:!text-[3.5rem] md:!text-[4.25rem] !text-[rgb(var(--migration-choose-heading))]"
          />
          <ContentDescription
            text="Enhance your hosting with these powerful tools"
            className="mt-4 text-base text-[rgb(var(--migration-choose-description))] sm:text-lg"
            size="md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative flex w-full flex-col rounded-md px-8 py-10 text-left md:w-[320px] md:mx-auto"
              style={{
                backgroundColor: "rgb(var(--migration-choose-card-bg))",
                boxShadow: "0 24px 48px rgba(var(--migration-choose-card-shadow))",
              }}
            >
              <header className="space-y-2 text-center mb-6">
                <h3 className="text-2xl font-bold !text-[rgb(var(--migration-choose-plan-name))]">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-sm !text-[rgba(var(--migration-choose-description))]">
                    {product.description}
                  </p>
                )}
              </header>

              <div className="flex-1" />

              <button
                className="mt-10 w-full rounded-full py-3 text-sm font-semibold transition"
                style={{
                  backgroundColor: "rgb(var(--migration-choose-button-bg))",
                  color: "rgb(var(--migration-choose-button-text))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgb(var(--migration-choose-button-hover))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgb(var(--migration-choose-button-bg))";
                }}
              >
                Add to cart
              </button>

              <p className="mt-4 text-center text-xs !text-[rgba(var(--migration-choose-disclaimer))]">
                You pay ${product.pricing.price.toFixed(2)} — renews for $
                {product.pricing.renewal.toFixed(2)}/mo
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-5 text-center">
          <p className="text-xs !text-[rgba(var(--migration-choose-note))]">
            *Prices reflect discount on the first billing cycle.
          </p>
          <Link href="/web-hosting">
            <button
              className="rounded-full px-7 py-3 text-sm font-semibold transition"
              style={{
                backgroundColor: "rgb(var(--migration-choose-bottom-button-bg))",
                color: "rgb(var(--migration-choose-bottom-button-text))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgb(var(--migration-choose-bottom-button-hover-bg))";
                e.currentTarget.style.color =
                  "rgb(var(--migration-choose-bottom-button-hover-text))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgb(var(--migration-choose-bottom-button-bg))";
                e.currentTarget.style.color =
                  "rgb(var(--migration-choose-bottom-button-text))";
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

export default AddonProducts;
