"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SeePlanButton from "./SeePlan";
import { useState } from "react";

const StarlightCard = () => {
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
      transition={{ delay: 0.4, duration: 0.8 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-[hsl(var(--starlight-card-bg))] rounded-2xl sm:rounded-3xl overflow-hidden h-[400px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[720px] flex flex-col transition-all duration-500 ease-in-out touch-manipulation">
        <div className="h-1/3 sm:h-2/5 bg-[hsl(var(--starlight-card-header-bg))] relative overflow-hidden flex items-center justify-center">
          <Image 
            src="/Home/VirtualMachine.png" 
            alt="Profile Fan" 
            fill
            className="object-cover"
          />
        </div>
        
        <div className="h-2/3 sm:h-3/5 p-3 sm:p-5 md:p-6 lg:pl-12 flex flex-col justify-center items-start text-left font-sans">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1.5 sm:mb-2 leading-tight">Virtual machines</h3>
          <p className="text-[hsl(var(--starlight-card-text-muted))] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed items-start text-left max-w-xl">
            Power more possibilities through extra server<br/> 
             muscle matched with flexible control and <br/> 
             scalability.
          </p>

          {/* See Plan button intentionally removed from this (Starlight) card */}
        </div>
      </div>
    </motion.div>
  );
};

export default StarlightCard;
