"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ContentDescription from "@/components/ui/content-description";

const Trust = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div 
      className="relative w-full min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#1a1a1a' }}
    >
      {/* Blue Vertical Gradient on Right Side */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-1/2 h-full"
          style={{
            background: 'linear-gradient(to left, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.6) 30%, rgba(29, 78, 216, 0.4) 60%, rgba(59, 130, 246, 0.2) 100%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Brighter core */}
        <div 
          className="absolute top-0 right-[20%] w-[30%] h-full"
          style={{
            background: 'linear-gradient(to left, rgba(59, 130, 246, 1) 0%, rgba(37, 99, 235, 0.8) 40%, rgba(29, 78, 216, 0.4) 80%, transparent 100%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Main Content - Text */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <ContentDescription
            text="Trust. Truth. Transparency."
            size="xl"
            className="text-3xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight !text-white"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Trust;

