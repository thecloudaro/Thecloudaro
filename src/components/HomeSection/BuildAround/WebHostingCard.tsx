"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SeePlanButton from "./SeePlan";
import { useState } from "react";

const WebHostingCard = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleMouseEnter = () => {
    setHoveredCard('active');
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setHoveredCard(null);
    }, 2000); // 2 seconds delay before hiding
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-[hsl(var(--webhosting-card-main-bg))] rounded-2xl sm:rounded-3xl overflow-hidden h-auto lg:h-[460px] flex flex-col lg:flex-row gap-3 transition-all duration-500 ease-in-out touch-manipulation">
        {/* Left side - Abstract graphic */}
        <div className="w-full lg:w-1/2 lg:h-full min-h-36 sm:min-h-48 relative overflow-hidden bg-webhosting-card-bg">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image 
              src="/Home/WebHosting.png" 
              alt="Graphic" 
              fill
              className="object-cover opacity-90" 
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--webhosting-card-gradient-from))] via-[hsl(var(--webhosting-card-gradient-via))] to-[hsl(var(--webhosting-card-gradient-to))]" />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="w-full lg:w-1/2 lg:h-full p-3 sm:p-5 md:p-6 lg:pl-12 flex flex-col justify-center items-start text-left font-sans">
          <p className="text-xs sm:text-sm md:text-base uppercase tracking-widest text-[hsl(var(--webhosting-card-text))] font-normal">
            WEB HOSTING
          </p>

          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1.5 sm:mb-2 leading-tight">
            Powerfully simple
          </h3>

          <p className="text-[hsl(var(--webhosting-card-text-muted))] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed items-start text-left max-w-xl mb-3 sm:mb-4">
            Get everything for launching a successful <br />
            website, from high-performance servers to easy <br />
            management.
          </p>

          {/* See Plan Button - always visible on mobile, animated on desktop */}
          <div className="mt-1.5 block lg:hidden">
            <SeePlanButton href="/hosting-for-wordpress" className="px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: hoveredCard ? 1 : 0,
              y: hoveredCard ? 0 : 20
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-2 hidden lg:block"
          >
            <SeePlanButton href="/hosting-for-wordpress" className="px-4 py-2 text-sm" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WebHostingCard;
