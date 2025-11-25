"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import SendStrong from "./SendStrong";

const BusinessHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden text-white">
      <motion.div
        className="absolute inset-0 -z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <Image
          src="/businessEmail/bg.jpeg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 -z-20"
        style={{
          background: `linear-gradient(to bottom right, rgba(var(--business-hero-gradient-from)), rgba(var(--business-hero-gradient-via)), rgba(var(--business-hero-gradient-to)))`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />

      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0.8 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <div className="absolute right-[-10%] top-[-20%] h-[420px] w-[420px] rounded-[40%] blur-[110px]" style={{ backgroundColor: 'rgba(var(--business-hero-blur-1))' }} />
        <div className="absolute left-[-15%] bottom-[-10%] h-[380px] w-[380px] rounded-[45%] blur-[120px]" style={{ backgroundColor: 'rgba(var(--business-hero-blur-2))' }} />
      </motion.div>

      <div className="relative z-10 flex min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[65vh] flex-col">
        <div className="flex flex-1 items-center">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-40 lg:items-start">
            <div className="max-w-3xl space-y-6 lg:max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-[0.35em]" style={{ color: 'rgba(var(--business-hero-text-white-70))' }}>
                Spacemail™
              </span>

              <ContentHeading
                title="Business email<br/>made effortless"
                className="text-left text-white !text-[2.5rem] sm:!text-[3.35rem] md:!text-[4.05rem] lg:!text-[5rem] font-bold leading-[1.08]"
              />

              <ContentDescription
                size="xl"
                className="max-w-2xl text-left text-lg sm:text-xl text-[rgba(var(--business-hero-text-white-85))]"
              >
                Simple and secure email for your domain.
              </ContentDescription>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button 
                  className="rounded-full px-6 py-2.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'rgb(var(--business-hero-button-white-bg))',
                    color: 'rgb(var(--business-hero-button-white-text))',
                    boxShadow: '0 12px 28px rgba(var(--business-hero-button-white-shadow))'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 16px 32px rgba(var(--business-hero-button-white-shadow-hover))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(var(--business-hero-button-white-shadow))';
                  }}
                >
                  Choose your plan
                </button>
                <a
                  href="#"
                  className="rounded-full px-6 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'rgb(var(--business-hero-button-purple-bg))',
                    boxShadow: '0 12px 28px rgba(var(--business-hero-button-purple-shadow))'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--business-hero-button-purple-hover))';
                    e.currentTarget.style.boxShadow = '0 16px 34px rgba(var(--business-hero-button-purple-shadow-hover))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--business-hero-button-purple-bg))';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(var(--business-hero-button-purple-shadow))';
                  }}
                >
                  Log in to Spacemail
                </a>
              </div>
            </div>

            <div className="hidden lg:block flex-1" />
          </div>
        </div>
      </div>
      {/* Diagonal Section Divider */}
      <div className="relative">
          <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120L1200,5L1200,120L0,120Z" 
                  fill="rgb(var(--business-hero-divider-bg))" 
                  opacity="1" />
          </svg>
        </div>
        {/* Transfer Pricing Section */}
        <div style={{ backgroundColor: 'rgb(var(--business-hero-divider-bg))', position: 'relative' }}>
          <SendStrong />
        </div>

      {/* </div> */}
      
    </section>
  );
};

export default BusinessHero;


