"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import HostingPlanControls, { BillingCycle } from "@/components/Hosting/HostingPlanControls";

const SuperSonic = () => {
  const [billing, setBilling] = useState<BillingCycle>("yearly");

  return (
    <section 
      className="relative flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 overflow-hidden"
      style={{
        background: `linear-gradient(to right, 
          rgba(var(--cdn-supersonic-gradient-from)) 0%, 
          rgba(var(--cdn-supersonic-gradient-to)) 100%)`
      }}
    >
      {/* Diagonal lines pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(var(--cdn-supersonic-pattern-white-10)) 10px,
            rgba(var(--cdn-supersonic-pattern-white-10)) 20px
          )`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 sm:gap-8"
        >
          {/* Heading */}
          <ContentHeading 
            title="Supersonic CDN Plans"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold"
          />

          {/* Description */}
          <ContentDescription 
            text="Get enterprise-level performance and security at lower prices with Supersonic CDN, no hidden charges."
            size="lg"
            className="max-w-3xl text-white"
          />

          {/* Billing Cycle Toggle */}
          <div className="mt-4 sm:mt-6">
            <HostingPlanControls
              billing={billing}
              onBillingChange={setBilling}
              dataCenter="US"
              onDataCenterChange={() => {}}
              variant="plain"
              hideDataCenter={true}
              cycles={["monthly", "yearly", "biyearly"]}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SuperSonic;

