"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Heading from "@/components/HomeSection/BuildAround/Heading";
import ContentDescription from "@/components/ui/content-description";

interface WordPressHeroProps {
  onPickPlanClick: () => void;
}

const WordPressHero = ({ onPickPlanClick }: WordPressHeroProps) => {
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
          backgroundImage: "url('/WordPress/HomeWordpress.png')"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-3xl space-y-4 sm:space-y-6 pb-12 sm:pb-16 md:pb-20 pt-16 sm:pt-20 md:pt-24 lg:pt-28">
             

              <Heading
                title="Speedy, simplified hosting for WordPress"
                className="text-left !text-[2.75rem] sm:!text-[3.5rem] md:!text-[4.25rem] lg:!text-[5rem] leading-[1.15] font-[650] !text-[rgb(var(--wp-hero-heading))]"
              />

              <ContentDescription size="xl" className="max-w-4xl !text-[rgba(var(--wp-hero-description))]">
                Give your website a head start with cloud hosting for
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
                  onClick={onPickPlanClick}
                >
                  Pick plan
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

