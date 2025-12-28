"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const RoadmapHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div 
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#252626' }}
    >
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-1 sm:pt-6 md:pt-12 lg:pt-20 pb-6 sm:pb-8 md:pb-12 lg:pb-16">
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
              title="The Cloud Aro Roadmap"
              className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl text-left !text-white"
            />

            {/* Description */}
            <ContentDescription
              text="See what we have planned and what is already here for you to explore."
              size="md"
              className="!text-sm sm:!text-base md:!text-lg text-left max-w-2xl !text-white"
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
                src="/Roadmap/Hero.svg"
                alt="The Cloud Aro Roadmap"
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
            fill="#17181a" 
            opacity="1" />
        </svg>
      </div>
    </div>
  );
};

export default RoadmapHero;

