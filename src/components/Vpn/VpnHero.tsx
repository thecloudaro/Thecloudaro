"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const VpnHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div 
      className="relative h-[85vh] lg:h-[90vh] flex items-start overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/vpn/HeroBg.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Overlay for better text readability */}
      <div 
        className="absolute inset-0 bg-white/10 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-12 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-start mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24"
          >
            {/* Subtitle */}
            <p 
              className="text-sm sm:text-base font-medium mb-2 sm:mb-3"
              style={{ color: 'rgb(var(--vpn-hero-subtitle-text))' }}
            >
              FASTVPN™
            </p>

            {/* Main Heading */}
            <ContentHeading
              title="Instant freedom"
              className="mb-3 sm:mb-4 md:mb-4 lg:mb-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl text-left !text-[rgb(var(--vpn-hero-heading-text))]"
            />

            {/* Description */}
            <ContentDescription
              text="Get prime VPN protection for secure, unrestricted browsing."
              size="lg"
              className="mb-4 sm:mb-5 md:mb-6 lg:mb-4 text-lg sm:text-xl md:text-2xl lg:text-2xl text-left font-semibold !text-[rgb(var(--vpn-hero-description-text))]"
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Primary Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300"
                style={{
                  backgroundColor: 'rgb(var(--vpn-hero-button-primary-bg))',
                  color: 'rgb(var(--vpn-hero-button-primary-text))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(var(--vpn-hero-button-primary-hover))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(var(--vpn-hero-button-primary-bg))';
                }}
              >
                Choose your plan option
              </motion.button>

              {/* Secondary Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'rgb(var(--vpn-hero-button-secondary-bg))',
                  color: 'rgb(var(--vpn-hero-button-secondary-text))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(var(--vpn-hero-button-secondary-hover))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(var(--vpn-hero-button-secondary-bg))';
                }}
              >
                Access dashboard
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] flex items-start justify-center -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-12"
          >
            <div className="relative w-full h-full">
              <Image
                src="/vpn/VpnHero.png"
                alt="VPN Hero Graphic"
                fill
                className="object-contain object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VpnHero;

