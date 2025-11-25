"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

type ProductCard = {
  name: string;
  subtitle: string;
  features: string[];
  price: string;
  originalPrice?: string;
  theme: "purple" | "green";
  icon: "mail" | "easywp" | "mailShield";
};

const products: ProductCard[] = [
  {
    name: "Spacemail",
    subtitle: "Pro",
    features: [
      "1 mailbox per domain",
      "5 GB of storage per mailbox",
      "10 aliases"
    ],
    price: "$0.88/mo",
    theme: "purple",
    icon: "mail"
  },
  {
    name: "EasyWP",
    subtitle: "Turbo",
    features: [
      "1 cloud-powered WordPress website",
      "50 GB SSD storage",
      "200K monthly visitors"
    ],
    price: "$9.88/mo",
    originalPrice: "$18.88/mo",
    theme: "green",
    icon: "easywp"
  },
  {
    name: "Spacemail",
    subtitle: "Advanced",
    features: [
      "5 mailboxes per domain",
      "10 GB of storage per mailbox",
      "Unlimited aliases"
    ],
    price: "$2.48/mo",
    theme: "purple",
    icon: "mailShield"
  }
];

const gradientStyles: Record<ProductCard["theme"], React.CSSProperties> = {
  purple: {
    background: `linear-gradient(to bottom right, rgb(var(--wp-frequentlybtwp-gradient-purple-from)), rgb(var(--wp-frequentlybtwp-gradient-purple-via)), rgb(var(--wp-frequentlybtwp-gradient-purple-to)))`
  },
  green: {
    background: `linear-gradient(to bottom right, rgb(var(--wp-frequentlybtwp-gradient-green-from)), rgb(var(--wp-frequentlybtwp-gradient-green-via)), rgb(var(--wp-frequentlybtwp-gradient-green-to)))`
  }
};

const SvgIcon = ({ card }: { card: ProductCard }) => {
  if (card.icon === "easywp") {
    return (
      <svg
        viewBox="0 0 64 64"
        aria-hidden
        className="h-14 w-14"
        style={{ color: 'rgba(var(--wp-frequentlybtwp-icon))' }}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
      >
        <path d="M32 10c6.627 0 12 5.373 12 12 0 5.096-3.206 9.443-7.695 11.081L32 42" />
        <path d="M32 10c-6.627 0-12 5.373-12 12 0 5.096 3.206 9.443 7.695 11.081L32 42" />
        <path d="M20 38s4 16 12 16 12-16 12-16" />
      </svg>
    );
  }

  if (card.icon === "mailShield") {
    return (
      <svg
        viewBox="0 0 64 64"
        aria-hidden
        className="h-14 w-14"
        style={{ color: 'rgba(var(--wp-frequentlybtwp-icon))' }}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path d="M32 12 12 20v10c0 13.255 8.955 25.003 20 28 11.045-2.997 20-14.745 20-28V20L32 12Z" />
        <path d="M22 30h20" />
        <path d="M22 38h11" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      className="h-14 w-14 text-white/90"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
    >
      <path d="M18 18h15.5c3.59 0 6.5 2.91 6.5 6.5S37.09 31 33.5 31H22" />
      <path d="M28 33h15.5c3.59 0 6.5 2.91 6.5 6.5S47.09 46 43.5 46H32" />
      <path d="m24 14-12 18 12 18" />
      <path d="m40 14 12 18-12 18" />
    </svg>
  );
};

const FrequentlyBTWP = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 pt-16 sm:pt-24 md:pt-32 lg:pt-40 xl:pt-48" style={{ backgroundColor: 'rgb(var(--wp-frequentlybtwp-bg))', color: 'rgb(var(--wp-frequentlybtwp-heading))' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="text-center space-y-6">
          <ContentHeading
            title="Frequently bought together"
            className="!text-[2.75rem] sm:!text-[3.5rem] md:!text-[4rem] font-bold !text-[rgb(var(--wp-frequentlybtwp-heading))]"
          />
          <ContentDescription
            size="md"
            className="text-xs sm:text-base pt-20 !text-[rgba(var(--wp-frequentlybtwp-description))]"
          >
            Products that other customers buy with EasyWP hosting for WordPress
            and we also recommend for you.
          </ContentDescription>
        </div>

        <div className="mt-2 flex flex-col items-center justify-center space-y-8 md:flex-row md:space-y-0 md:gap-6">
          {products.map((product) => (
            <div
              key={`${product.name}-${product.subtitle}`}
              className="group relative flex h-[300px] w-[380px] min-w-[380px] flex-col justify-between overflow-hidden rounded-lg border transition hover:-translate-y-1"
              style={{
                borderColor: 'rgba(var(--wp-frequentlybtwp-card-border))',
                backgroundColor: 'rgb(var(--wp-frequentlybtwp-card-bg))',
                boxShadow: `0 22px 65px rgba(var(--wp-frequentlybtwp-card-shadow))`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 34px 96px rgba(var(--wp-frequentlybtwp-card-shadow-hover))`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 22px 65px rgba(var(--wp-frequentlybtwp-card-shadow))`;
              }}
            >
              <div className="flex h-[160px] items-center justify-center" style={gradientStyles[product.theme]}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl">
                  <SvgIcon card={product} />
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between px-7 pb-7 pt-6 text-left">
                <div className="space-y-0.5">
                  <h3 className="text-md font-semibold" style={{ color: 'rgb(var(--wp-frequentlybtwp-card-name))' }}>
                    {product.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'rgba(var(--wp-frequentlybtwp-card-subtitle))' }}>
                    {product.subtitle}
                  </p>
                </div>

                <ul className="mt-2 space-y-1 text-xs" style={{ color: 'rgba(var(--wp-frequentlybtwp-card-feature))' }}>
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <div className="mt-auto space-y-2 pt-4">
                  {product.originalPrice ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] line-through" style={{ color: 'rgba(var(--wp-frequentlybtwp-card-original-price))' }}>
                      {product.originalPrice}
                    </p>
                  ) : null}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold" style={{ color: 'rgb(var(--wp-frequentlybtwp-card-price))' }}>
                      {product.price}
                    </p>
                  <button 
                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-wide transition"
                    style={{ 
                      backgroundColor: 'rgb(var(--wp-frequentlybtwp-button-bg))',
                      color: 'rgb(var(--wp-frequentlybtwp-button-text))',
                      boxShadow: `0 12px 26px rgba(var(--wp-frequentlybtwp-button-shadow))`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(var(--wp-frequentlybtwp-button-hover))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(var(--wp-frequentlybtwp-button-bg))';
                    }}
                  >
                      Buy now
                      <span className="text-base leading-none" style={{ color: 'rgba(var(--wp-frequentlybtwp-button-arrow))' }}>&#709;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrequentlyBTWP;


