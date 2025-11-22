"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Heading from "@/components/HomeSection/BuildAround/Heading";
import ContentDescription from "@/components/ui/content-description";

const WordPressHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-x-hidden text-white">
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{
          backgroundImage: "url('/WordPressHosting/bg.jpg')"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom right, rgba(var(--wp-hero-gradient-1-from)), rgba(var(--wp-hero-gradient-1-via)), rgba(var(--wp-hero-gradient-1-to)))`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0.6 }}
        transition={{ duration: 1, delay: 0.1 }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom right, rgba(var(--wp-hero-gradient-2-from)), transparent, rgba(var(--wp-hero-gradient-2-to)))`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
            <div className="max-w-3xl space-y-6 pb-16 pt-20 sm:pt-24 lg:pb-20 lg:pt-28">
              <span className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: 'rgba(var(--wp-hero-badge-text))' }}>
                EasyWP™
              </span>

              <Heading
                title="Speedy, simplified<br/>hosting for<br/>WordPress"
                className="text-left !text-[2.75rem] sm:!text-[3.5rem] md:!text-[4.25rem] lg:!text-[5rem] leading-[1.15] font-[650] !text-[rgb(var(--wp-hero-heading))]"
              />

              <ContentDescription size="xl" className="max-w-4xl !text-[rgba(var(--wp-hero-description))]">
                Give your website a head start with cloud hosting for<br />
                WordPress and hassle-free management.
              </ContentDescription>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button 
                  className="rounded-full px-8 py-3 text-base font-semibold transition duration-300 hover:translate-y-[-2px]"
                  style={{ 
                    backgroundColor: 'rgb(var(--wp-hero-button-white-bg))',
                    color: 'rgb(var(--wp-hero-button-white-text))',
                    boxShadow: `0 12px 30px rgba(var(--wp-hero-button-white-shadow))`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 18px 36px rgba(var(--wp-hero-button-white-shadow-hover))`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 12px 30px rgba(var(--wp-hero-button-white-shadow))`;
                  }}
                >
                  Pick plan
                </button>
                <button 
                  className="rounded-full px-8 py-3 text-base font-semibold transition duration-300 hover:translate-y-[-2px]"
                  style={{ 
                    backgroundColor: 'rgb(var(--wp-hero-button-green-bg))',
                    color: 'rgba(var(--wp-hero-button-green-text))',
                    boxShadow: `0 12px 30px rgba(var(--wp-hero-button-green-shadow))`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--wp-hero-button-green-hover))';
                    e.currentTarget.style.boxShadow = `0 18px 36px rgba(var(--wp-hero-button-green-shadow-hover))`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--wp-hero-button-green-bg))';
                    e.currentTarget.style.boxShadow = `0 12px 30px rgba(var(--wp-hero-button-green-shadow))`;
                  }}
                >
                  Explore features
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WordPressHero;

