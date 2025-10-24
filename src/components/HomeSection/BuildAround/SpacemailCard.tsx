"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SeePlanButton from "./SeePlan";
import { useState } from "react";

const SpacemailCard = () => {
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
      transition={{ delay: 0.5, duration: 0.8 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden h-auto lg:h-[500px] flex flex-col lg:flex-row gap-4 transition-all duration-500 ease-in-out touch-manipulation">
        {/* Left side - Content */}
        <div className="w-full lg:w-1/2 lg:h-full p-4 sm:p-6 md:p-8 lg:pl-16 flex flex-col justify-center items-start text-left font-sans">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-purple-500 rounded mr-2 sm:mr-3"></div>
            <p className="text-xs sm:text-sm md:text-base uppercase tracking-widest text-white font-normal">spacemail</p>
          </div>
          <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 leading-tight">Effortless email</h3>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed items-start text-left max-w-xl mb-4 sm:mb-6">
            Send the right message with ultra-simple and <br/>
            full-service business email for your<br/> Domain.
          </p>
          
          {/* See Plan Button - always visible on mobile, animated on desktop */}
          <div className="mt-2 block lg:hidden">
            <SeePlanButton href="/pricing" />
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
            <SeePlanButton href="/pricing" />
          </motion.div>
        </div>

        {/* Right side - Image */}
        <div className="w-full lg:w-1/2 order-first lg:order-none lg:h-full min-h-40 sm:min-h-56 bg-gradient-to-br from-purple-500 to-purple-700 relative overflow-hidden">
          <Image
            src="/3d5.jpeg"
            alt="Email Service"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-purple-700/40" />
        </div>
      </div>
    </motion.div>
  );
};

export default SpacemailCard;
