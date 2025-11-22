"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const DomainNameHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/DomainNamePrivacy/bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Breadcrumbs */}
      <div className="relative z-40 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 text-sm" style={{ color: 'rgb(var(--domain-name-privacy-breadcrumb-inactive))' }}>
            <span className="opacity-80">Domains</span>
            <span className="mx-2">›</span>
            <span style={{ color: 'rgb(var(--domain-name-privacy-breadcrumb-active))' }}>Privacy</span>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-30 flex flex-col items-center justify-start pt-12 sm:pt-16 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-8 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-5xl mx-auto"
        >
          <ContentHeading 
            title="Free domain privacy"
            className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl"
          />
          <ContentDescription 
            text="Keeping your domain registration info private."
            size="lg"
            className="text-[hsl(var(--domain-name-privacy-hero-description))] text-xl sm:text-2xl md:text-3xl lg:text-2xl"
          />
        </motion.div>
      </div>
      
    </div>
  );
};

export default DomainNameHero;

