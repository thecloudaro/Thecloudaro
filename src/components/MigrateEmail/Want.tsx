"use client";

import { motion } from "framer-motion";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import { migrateEmailStyles, getCSSVariable } from "@/lib/migrateEmailUtils";

const Want = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28" style={{ backgroundColor: migrateEmailStyles.bg }}>
      {/* Purple Gradient Organic Shapes Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Top Left Purple Shape - Behind Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] sm:w-[1000px] sm:h-[700px] md:w-[1200px] md:h-[800px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(ellipse at center, ${migrateEmailStyles.purpleGradientFrom} 0%, ${migrateEmailStyles.purpleGradientTo} 40%, transparent 65%)`
          }}
        />
        
        {/* Top Right Purple Shape - Overlapping */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] md:w-[1100px] md:h-[1100px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(ellipse at center, ${migrateEmailStyles.purpleGradientFrom} 0%, ${migrateEmailStyles.purpleGradientTo} 50%, transparent 70%)`
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 sm:space-y-6"
        >
          {/* Heading */}
          <ContentHeading
            title="Want 12 months free?"
            className="!text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl xl:!text-7xl !text-[rgb(var(--migrate-email-simple-text-white))]"
          />

          {/* Description */}
          <ContentDescription
            size="xl"
            className="max-w-4xl mx-auto !text-[rgba(var(--migrate-email-hero-text-85))]"
          >
            Migrate a domain into Spaceship and you&apos;ll get a year of<br/>Spacemail — absolutely free.
          </ContentDescription>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-8 sm:pt-12 md:pt-20"
          >
            <button
              className="rounded-full px-6 sm:px-6 py-3 sm:py-3.5 font-semibold text-sm sm:text-base transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: getCSSVariable('choose-email-button-white-bg'),
                color: getCSSVariable('choose-email-button-white-text')
              }}
            >
              Migrate domain
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Want;

