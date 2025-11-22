"use client";

import { motion } from "framer-motion";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const Choose = () => {
  const plans = [
    {
      name: "1-Year plan",
      originalPrice: "$2.88/mo",
      currentPrice: "$1.00/mo",
      discount: "65% OFF*",
      renewalText: "*You pay $12.00 — Renews for $34.56"
    },
    {
      name: "Monthly plan",
      originalPrice: "$7.88/mo",
      currentPrice: "$0.99/mo",
      discount: "87% OFF*",
      renewalText: "*Renews at $7.88/month"
    }
  ];

  return (
    <section 
      className="relative min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh] overflow-hidden"
    >
      {/* Top 65% - Gradient Background */}
      <div 
        className="absolute top-0 left-0 right-0 h-[65%]"
        style={{ 
          background: `linear-gradient(to bottom, rgba(var(--vpn-choose-gradient-brown-from)) 0%, rgba(var(--vpn-choose-gradient-brown-1)) 20%, rgba(var(--vpn-choose-gradient-brown-2)) 40%, rgba(var(--vpn-choose-gradient-brown-3)) 60%, rgba(var(--vpn-choose-gradient-brown-1)) 80%, rgba(var(--vpn-choose-gradient-brown-4)) 100%)`
        }}
      />
      
      {/* Bottom 35% - Solid Background */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[35%]"
        style={{ backgroundColor: 'rgb(var(--vpn-section-bg))' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-10 sm:py-12 md:py-16">
        <div className="flex flex-col items-center text-center">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-3 sm:mb-4"
          >
            <ContentHeading
              title="Choose the perfect plan"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-2 sm:mb-3"
            />
          </motion.div>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mb-8 sm:mb-10 max-w-3xl"
          >
            <ContentDescription
              text="Select the ideal package to suit your browsing needs and budget."
              size="md"
              className="text-white/80"
            />
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="w-full max-w-xl mx-auto mt-24 sm:mt-28 md:mt-32 lg:mt-36"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-md p-8 sm:p-9 md:p-10 lg:p-12 border"
                  style={{
                    backgroundColor: 'rgb(var(--vpn-choose-card-bg))',
                    borderColor: 'rgb(var(--vpn-choose-card-border))'
                  }}
                >
                  {/* Plan Name */}
                  <h3 className="text-white text-xs sm:text-sm md:text-base font-semibold mb-5">
                    {plan.name}
                  </h3>

                  {/* Price and Discount */}
                  <div className="mb-6">
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <span className="text-gray-400 line-through text-xs">
                        {plan.originalPrice}
                      </span>
                      <span className="bg-green-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                        {plan.discount}
                      </span>
                    </div>
                    <div className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                      {plan.currentPrice}
                    </div>
                  </div>

                  {/* Renewal Text */}
                  <p className="text-gray-400 text-xs text-center mt-5">
                    {plan.renewalText}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer Guarantee */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="mt-8 sm:mt-10"
          >
            <p className="text-gray-400 text-xs sm:text-sm">
              *30-day money-back guarantee
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Choose;

