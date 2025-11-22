"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import { migrateEmailStyles } from "@/lib/migrateEmailUtils";

const Find = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28" style={{ backgroundColor: migrateEmailStyles.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 xl:gap-32 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <div className="space-y-4 sm:space-y-6">
              <ContentHeading
                title="Find migration in the Settings menu"
                className="!text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl !text-[rgb(var(--migrate-email-simple-text-white))]"
              />
              
              <ContentDescription
                size="md"
                className="!text-[rgba(var(--migrate-email-hero-text-85))]"
              >
                Click &apos;Migrate to Spacemail&apos; to launch our migration tool.
              </ContentDescription>
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-full max-w-lg h-auto">
              {/* Purple Gradient Background */}
              <div 
                className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-60 blur-3xl"
                style={{
                  background: `radial-gradient(ellipse at center, ${migrateEmailStyles.purpleGradientFrom} 0%, ${migrateEmailStyles.purpleGradientTo} 50%, transparent 70%)`
                }}
              />
              
              {/* Image */}
              <div className="relative z-10 w-full h-auto">
                <Image
                  src="/MigrationEmail/find.svg"
                  alt="Find Migration in Settings"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Find;

