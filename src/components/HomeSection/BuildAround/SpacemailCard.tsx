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
      <div className="bg-[hsl(var(--spacemail-card-bg))] rounded-2xl sm:rounded-3xl overflow-hidden h-auto lg:h-[500px] flex flex-col lg:flex-row gap-4 transition-all duration-500 ease-in-out touch-manipulation">
        {/* Left side - Content */}
        <div className="w-full lg:w-1/2 lg:h-full p-4 sm:p-6 md:p-8 lg:pl-16 flex flex-col justify-center items-start text-left font-sans">
          <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 leading-tight">Effortless email</h3>
          <p className="text-[hsl(var(--spacemail-card-text-muted))] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed items-start text-left max-w-xl mb-4 sm:mb-6">
            Send the right message with ultra-simple and <br/>
            full-service business email for your<br/> Domain.
          </p>
          
          {/* See Plan button and SPACEMAIL badge intentionally removed from this (Spacemail) card */}
        </div>

        {/* Right side - Image */}
        <div className="w-full lg:w-1/2 order-first lg:order-none lg:h-full min-h-40 sm:min-h-56 bg-gradient-to-br from-[hsl(var(--spacemail-card-gradient-from))] to-[hsl(var(--spacemail-card-gradient-to))] relative overflow-hidden">
          <Image
            src="/3d5.jpeg"
            alt="Email Service"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--spacemail-card-gradient-overlay-from))] to-[hsl(var(--spacemail-card-gradient-overlay-to))]" />
        </div>
      </div>
    </motion.div>
  );
};

export default SpacemailCard;
