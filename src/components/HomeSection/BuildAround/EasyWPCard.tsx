"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SeePlanButton from "./SeePlan";
import { useState } from "react";

const EasyWPCard = () => {
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
      transition={{ delay: 0.3, duration: 0.8 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden h-[400px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[720px] flex flex-col transition-all duration-500 ease-in-out touch-manipulation">
        {/* Top - 3D geometric shapes */}
        <div className="h-1/3 sm:h-2/5 bg-gradient-to-r from-green-600 to-teal-500 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image 
              src="/3d3.png" 
              alt="The Cloudaro" 
              fill
              className="object-cover opacity-90" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/40 to-teal-500/40" />
          </div>
        </div>
        
        {/* Bottom - Content */}
        <div className="h-2/3 sm:h-3/5 p-3 sm:p-5 md:p-6 lg:pl-12 flex flex-col justify-center items-start text-left font-sans">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded mr-2 sm:mr-3"></div>
            <p className="text-xs sm:text-sm md:text-base uppercase tracking-widest text-white font-normal">easywp</p>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1.5 sm:mb-2 leading-tight">No stress hosting <br/> for WordPress</h3>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed items-start text-left max-w-xl">
            Give your site a head start with the fastest <br/> 
            hosting for WordPress on next-gen cloud <br/>
            technology.
          </p>

          {/* See Plan Button - always visible on mobile, animated on desktop */}
          <div className="mt-2 block lg:hidden">
            <SeePlanButton href="/pricing" className="px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm" />
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
            <SeePlanButton href="/pricing" className="px-4 py-2 text-sm" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default EasyWPCard;
