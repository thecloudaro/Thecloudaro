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
      className="relative h-[50vh] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'rgb(var(--roadmap-hero-bg))' }}
    >
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 sm:pb-12 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Main Heading */}
            <ContentHeading
              title="The Cloud Aro Roadmap"
              className="text-4xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl !text-[rgb(var(--roadmap-hero-heading-text))] text-left"
            />

            {/* Description */}
            <ContentDescription
              text="See what we have planned and what is already here for you to explore."
              className="text-base sm:text-lg md:text-xl !text-[rgb(var(--roadmap-hero-description-text))] text-left max-w-2xl"
            />
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[600px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
              <Image
                src="/Roadmap/Hero.svg"
                alt="Spaceship Roadmap"
                width={600}
                height={700}
                className="w-full h-full object-contain"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapHero;

