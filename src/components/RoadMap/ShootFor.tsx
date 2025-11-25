"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ContentDescription from "@/components/ui/content-description";

const ShootFor = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className="relative w-full min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(to bottom, rgb(17 24 39) 0%, #17181a 20%, #17181a 100%)'
      }}
    >
      
      {/* Blue Light Beam Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main vertical beam from top right */}
        <div 
          className="absolute top-0 right-[20%] w-[40%] sm:w-[35%] md:w-[30%] h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.7) 20%, rgba(96, 165, 250, 0.5) 50%, rgba(147, 197, 253, 0.2) 80%, transparent 100%)',
            filter: 'blur(100px)',
          }}
        />
        {/* Brighter center core */}
        <div 
          className="absolute top-0 right-[35%] w-[15%] h-full"
          style={{
            background: 'linear-gradient(to bottom, rgba(59, 130, 246, 1) 0%, rgba(37, 99, 235, 0.8) 30%, rgba(96, 165, 250, 0.4) 70%, transparent 100%)',
            filter: 'blur(70px)',
          }}
        />
        {/* Wider glow effect */}
        <div 
          className="absolute top-0 right-[10%] w-[50%] h-full"
          style={{
            background: 'linear-gradient(to bottom, rgba(37, 99, 235, 0.4) 0%, rgba(59, 130, 246, 0.3) 40%, rgba(96, 165, 250, 0.15) 80%, transparent 100%)',
            filter: 'blur(120px)',
          }}
        />
      </div>

      {/* Main Content - Text */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 sm:py-14 md:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <ContentDescription
            text="Shoot for the stars"
            size="xl"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight !text-white"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ShootFor;

