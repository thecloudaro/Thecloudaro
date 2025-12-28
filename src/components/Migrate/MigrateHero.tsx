"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ContentDescription from "@/components/ui/content-description";

const MigrateHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden min-h-screen"
      style={{
        background: "linear-gradient(to right, #16a34a 0%, #2563eb 100%)",
      }}
    >
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-8 sm:pb-10 md:pb-12 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center space-y-4 sm:space-y-2"
        >
          {/* Main Heading */}
          <ContentDescription
            text="Migrate your WordPress website"
            size="xl"
            className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !text-white font-bold leading-tight"
          />

          {/* Description */}
          <ContentDescription
            text="Move your website and files in a few simple steps."
            size="lg"
            className="!text-xl sm:!text-xl md:!text-2xl lg:!text-2xl !text-white max-w-2xl mx-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MigrateHero;
