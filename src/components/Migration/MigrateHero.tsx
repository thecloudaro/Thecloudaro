"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import KeepMigration from "./KeepMigration";

const MigrateHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] overflow-x-hidden" style={{ backgroundColor: 'rgb(var(--migration-hero-bg))', color: 'rgb(var(--migration-hero-text))' }}>
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/WordPressHosting/CloudHostingBg.jpeg')"
        }}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom right, rgba(var(--migration-hero-overlay-from)), rgba(var(--migration-hero-overlay-via)), rgba(var(--migration-hero-overlay-to)))`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      />

      <div className="relative z-10 flex min-h-[90vh] flex-col">
        <div className="flex flex-1 items-center mb-32 pt-16 sm:pt-24">
          <div className="mx-auto max-w-5xl px-6 text-center sm:px-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 32 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="space-y-6"
            >
              <ContentHeading
                title="Migrate your hosting"
                className="!text-[2.75rem] sm:!text-[3.5rem] md:!text-[4.75rem] font-bold tracking-tight !text-[rgb(var(--migration-hero-text))]"
              />

              <ContentDescription
                size="lg"
                className="text-sm sm:text-base md:text-lg !text-[rgba(var(--migration-hero-text-85))]"
              >
                Make the quick and easy move to The Cloudaro that won&apos;t cost you anything.
              </ContentDescription>
            </motion.div>
          </div>
        </div>
        </div>
        {/* Diagonal Section Divider */}
        <div className="relative">
          <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120L1200,5L1200,120L0,120Z" 
                  fill="rgb(var(--migration-hero-divider))" 
                  opacity="1" />
          </svg>
        </div>
        {/* Transfer Pricing Section */}
        <div style={{ backgroundColor: 'rgb(var(--migration-hero-divider))', position: 'relative' }}>
          <KeepMigration />
        </div>

      {/* </div> */}
      
    </section>
  );
};

export default MigrateHero;


