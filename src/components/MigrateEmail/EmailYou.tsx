"use client";

import { motion } from "framer-motion";
import ContentDescription from "@/components/ui/content-description";
import { migrateEmailStyles, getCSSVariable } from "@/lib/migrateEmailUtils";

const EmailYou = () => {
  const pricingData = [
    {
      name: "Spacemail",
      price: "$6.88/yr",
      save: null,
      highlighted: true
    },
    {
      name: "Google Workspace",
      price: "$84/yr",
      save: "SAVE $77.12 WITH US"
    },
    {
      name: "GoDaddy",
      price: "$95.88/yr",
      save: "SAVE $89 WITH US"
    },
    {
      name: "ProtonMail",
      price: "$95.88/yr",
      save: "SAVE $89 WITH US"
    },
    {
      name: "Fastmail",
      price: "$60/yr",
      save: "SAVE $53.12 WITH US"
    },
    {
      name: "ZohoMail",
      price: "$11.74/yr",
      save: "SAVE $4.86 WITH US"
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28" style={{ backgroundColor: migrateEmailStyles.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        {/* Heading and Description */}
        <div className="text-center max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-[650] leading-tight tracking-tight font-sans"
              style={{ color: migrateEmailStyles.textWhite }}
            >
              Email you&apos;ll love at a price you&apos;ll <br/><em className="italic">really</em> love
            </h2>
            
            <ContentDescription
              size="xl"
              className="!text-[rgba(var(--migrate-email-hero-text-85))]"
            >
              See how our prices compare to our competitors
            </ContentDescription>
          </motion.div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-4 sm:mb-6">
          {pricingData.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-md p-3 sm:p-4 md:p-5 ${
                service.highlighted ? '' : ''
              }`}
            style={{
              backgroundColor: service.highlighted 
                ? getCSSVariable('email-you-card-bg-highlight')
                : getCSSVariable('email-you-card-bg')
            }}
            >
              <div className="text-center">
                <h3 
                  className="text-xm sm:text-sm mb-3 sm:mb-4"
                  style={{ color: migrateEmailStyles.text85 }}
                >
                  {service.name}
                </h3>
                
                <div 
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4"
                  style={{ color: migrateEmailStyles.textWhite }}
                >
                  {service.price}
                </div>
                
                {service.save && (
                  <div 
                    className="text-xs sm:text-xs font-medium"
                    style={{ color: getCSSVariable('email-you-save-text') }}
                  >
                    {service.save}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center max-w-7xl mx-auto mb-8 sm:mb-10"
        >
          <p 
            className="text-xs sm:text-sm leading-relaxed"
            style={{ color: getCSSVariable('email-you-disclaimer-text') }}
          >
            The prices provided for comparison are for starting plans and were updated as of October 14, 2025. They represent pricing as publicly advertised on<br/>competitor sites and, thus, are subject to change by the relevant company at any time.
          </p>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-8 sm:mt-12"
        >
          <button
            className="rounded-full px-2 sm:px-4 md:px-6 py-2.5 sm:py-3 font-semibold text-sm sm:text-sm transition-all duration-300 hover:opacity-90"
            style={{
              backgroundColor: getCSSVariable('email-you-button-bg'),
              color: getCSSVariable('email-you-button-text')
            }}
          >
            Get your Plan
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailYou;

