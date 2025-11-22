"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const CdnHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div 
      className="relative min-h-screen flex items-start overflow-hidden"
      style={{ backgroundColor: 'rgb(var(--cdn-hero-bg))' }}
    >
      {/* Very Light Gradient Background Effect - Full Page */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right, 
            rgba(var(--cdn-hero-gradient-blue-500-03)) 0%, 
            rgba(var(--cdn-hero-gradient-cyan-500-02)) 50%,
            transparent 100%)`
        }}
      />

      {/* Gradient Background Effect - Left Side */}
      <div 
        className="absolute left-0 top-0 w-1/2 h-full pointer-events-none"
        style={{
          background: `linear-gradient(to right, 
            rgba(var(--cdn-hero-gradient-blue-500-08)) 0%, 
            rgba(var(--cdn-hero-gradient-cyan-500-05)) 50%,
            transparent 100%)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-start mt-4 sm:mt-6 md:mt-8 lg:mt-6"
          >
            <ContentHeading 
              title="Supercharged site performance"
              className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-left"
            />
            <ContentDescription 
              text="Get a secure and efficient content delivery network (CDN) fully integrated into Spaceship."
              size="md"
              className="mb-6 sm:mb-8 text-left text-white"
            />
            <div className="mt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full font-semibold text-sm sm:text-sm transition-all duration-300"
                style={{
                  backgroundColor: 'rgb(var(--cdn-hero-button-bg))',
                  color: 'rgb(var(--cdn-hero-button-text))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(var(--cdn-hero-button-hover))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(var(--cdn-hero-button-bg))';
                }}
              >
                Choose your plan
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px] xl:h-[800px] flex items-start justify-center -mt-24 sm:-mt-28 md:-mt-32 lg:-mt-50"
          >
            <div className="relative w-full h-full">
              <Image
                src="/cdn/Hero.png"
                alt="CDN Hero Graphic"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CdnHero;

