"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const LegalHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div 
      className="relative flex flex-col items-center justify-center overflow-hidden bg-[rgb(var(--legal-hero-bg))]"
    >
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-6 sm:pb-8 md:pb-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 sm:gap-2 md:gap-2 lg:gap-4 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-1 sm:space-y-2"
          >
            {/* Main Heading */}
            <ContentHeading
              title="Terms & Conditions"
              className="text-4xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl text-left text-[rgb(var(--legal-hero-text-white))]"
            />

            {/* Description */}
            <ContentDescription
              text="Here you will find the documentation regarding terms of use, acceptable use policy, registration agreement, privacy policy and other product agreements. If you have any further questions, please, contact us."
              size="md"
              className="text-md text-left max-w-2xl text-[rgb(var(--legal-hero-text-white))]"
            />
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[450px] h-[150px] sm:h-[200px] md:h-[250px] lg:h-[280px]">
              <Image
                src="/Legal/Hero.svg"
                alt="The Cloud Aro Legal"
                width={450}
                height={280}
                className="w-full h-full object-contain"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      </div>
      {/* Diagonal Section Divider */}
      <div className="relative w-full">
        <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,120L1200,5L1200,120L0,120Z" 
            fill="rgb(var(--legal-hero-divider-fill))" 
            opacity="1" />
        </svg>
      </div>
    </div>
  );
};

export default LegalHero;

