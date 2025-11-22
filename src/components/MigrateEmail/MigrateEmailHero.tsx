"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import { migrateEmailStyles, getCSSVariableRGBA } from "@/lib/migrateEmailUtils";

const MigrateEmailHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] overflow-x-hidden overflow-y-hidden" style={{ backgroundColor: migrateEmailStyles.heroBg, color: migrateEmailStyles.heroText }}>
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/businessEmail/bg.jpeg')"
        }}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at bottom right, ${migrateEmailStyles.purpleGradientFrom} 0%, ${migrateEmailStyles.purpleGradientTo} 30%, ${getCSSVariableRGBA('migrate-email-hero-overlay-from')} 50%, ${getCSSVariableRGBA('migrate-email-hero-overlay-via')} 70%, ${getCSSVariableRGBA('migrate-email-hero-overlay-to')} 100%)`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      />

      <div className="relative z-10 flex min-h-[90vh] flex-col">
        <div className="flex flex-1 items-center pt-28 sm:pt-24 pb-24 sm:pb-32">
          <div className="mx-auto max-w-5xl px-6 text-center sm:px-10 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 32 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="space-y-4"
            >
              {/* SPACEMAIL™ Branding */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-md font-semibold uppercase tracking-[0.35em] mb-2"
                style={{ color: migrateEmailStyles.heroBrandText }}
              >
                SPACEMAIL™
              </motion.div>

              <ContentHeading
                title="Migrate your emails<br/>to The Cloud Aro"
                className="!text-[2.75rem] sm:!text-[3.5rem] md:!text-[5rem] font-bold tracking-tight !text-[rgb(var(--migrate-email-hero-text))]"
              />

              <ContentDescription
                size="xl"
                className="text-sm sm:text-base md:text-lg !text-[rgba(var(--migrate-email-hero-text-85))]"
              >
                Make a seamless transition for a better email experience.
              </ContentDescription>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default MigrateEmailHero;

