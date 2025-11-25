"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";

const DomainExtensions = () => {
  const domainExtensions = [
    {
      extension: ".com",
      price: 8.88,
      originalPrice: 17.76,
      discount: "50% OFF",
      description: "Most popular domain extension"
    },
    {
      extension: ".net",
      price: 11.20,
      originalPrice: null,
      discount: "50% OFF",
      description: "Network-focused domains"
    },
    {
      extension: ".org",
      price: 6.48,
      originalPrice: 12.96,
      discount: "50% OFF",
      description: "Organization domains"
    },
    {
      extension: ".xyz",
      price: 1.86,
      originalPrice: 18.60,
      discount: "90% OFF",
      description: "Creative and modern"
    },
    {
      extension: ".online",
      price: 0.98,
      originalPrice: 9.80,
      discount: "90% OFF",
      description: "Perfect for online presence"
    },
    {
      extension: ".io",
      price: 31.05,
      originalPrice: 44.35,
      discount: "30% OFF",
      description: "Tech startup favorite"
    }
  ];

  return (
    <section className="relative" style={{ backgroundColor: 'rgb(var(--domain-hero-section-bg))' }}>
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <SectionHeading
              heading="Register a domain"
              description="Discover the perfect match for your needs."
              headingTag="h2"
              headingClassName="text-5xl sm:text-6xl md:text-7xl font-bold text-[rgb(var(--hosting-text-white))] mb-6"
              descriptionClassName="text-[rgb(var(--domain-hero-text-gray-400))] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl max-w-3xl mx-auto leading-relaxed"
            />
          </div>
{/* Domain Extensions Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-6xl mx-auto min-h-[400px] sm:min-h-[500px] md:min-h-[600px] place-items-center">
  {domainExtensions.map((domain, index) => (
    <motion.div
      key={domain.extension}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-[hsl(var(--gradient-dark-teal))] to-[hsl(var(--gradient-teal))] rounded-2xl p-4 sm:p-6 hover:scale-105 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between h-[240px] sm:h-[260px] md:h-[280px] w-full shadow-lg"
    >
      {/* Discount Badge */}
      {domain.discount && (
        <div className="absolute top-3 right-3 bg-[hsl(var(--gradient-bright-green))] text-white w-16 h-7 flex items-center justify-center rounded-full text-xs font-semibold shadow-md">
          {domain.discount}
        </div>
      )}

      {/* Domain Extension */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-[rgb(var(--hosting-text-white))] mb-1">
          {domain.extension}
        </h3>
        <p className="text-sm leading-snug" style={{ color: 'rgb(var(--domain-extensions-text-gray-200))' }}>
          {domain.description}
        </p>
      </div>

      {/* Pricing */}
      <div className="text-center">
        <div className="flex justify-center items-baseline mb-1">
          <span className="text-3xl font-bold text-[rgb(var(--hosting-text-white))]">
            ${domain.price}
          </span>
          <span className="ml-1 text-sm" style={{ color: 'rgb(var(--domain-extensions-text-gray-300))' }}>/yr</span>
        </div>
        {domain.originalPrice && (
          <div className="line-through text-sm" style={{ color: 'rgb(var(--domain-hero-text-gray-400))' }}>
            ${domain.originalPrice}/yr
          </div>
        )}
      </div>
    </motion.div>
  ))}
        </div>

        {/* See All Domains Button */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full font-semibold transition-all duration-300"
            style={{
              backgroundColor: 'rgb(var(--domain-extensions-button-bg))',
              color: 'rgb(var(--domain-extensions-button-text))'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgb(var(--domain-extensions-button-hover))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgb(var(--domain-extensions-button-bg))';
            }}
          >
            See all domains
          </motion.button>
        </div>

        </div>
      </div>

      
    </section>
  );
};

export default DomainExtensions;
