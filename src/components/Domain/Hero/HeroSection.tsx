"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { CircleDesign } from "./CircleDesign";
import DomainExtensions from "@/components/Domain/DomainExtensions";


export default function DomainHeroSection() {
  const [domainValue, setDomainValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTypewriterMode, setIsTypewriterMode] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[hsl(var(--footer-bg-primary))]
     via-[hsl(var(--footer-bg-secondary))] to-[hsl(var(--footer-bg-secondary))] 
     overflow-hidden pt-12 sm:pt-14 md:pt-16"
     style={{ color: 'rgb(var(--domain-hero-text-gray-300))' }}>
      <div className="">

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-4 sm:pb-6 md:pb-8 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 space-y-6 text-left max-w-2xl"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl" style={{ color: 'rgb(var(--domain-hero-text-gray-400))' }}>
            Start typing...
          </h2>

          {/* Domain Input Field with Typewriter Effect */}
          <div className="relative">
            {isTypewriterMode ? (
              <div 
                className="w-full text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight cursor-pointer"
                style={{ color: 'rgba(var(--domain-hero-text-gray-100-50))' }}
                onClick={() => {
                  setIsTypewriterMode(false);
                  setDomainValue("");
                }}
              >
                <Typewriter
                  options={{
                    strings: [
                      "youridea.com"
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 100,
                    deleteSpeed: 50,
                    cursor: "|"
                  }}
                />
              </div>
            ) : (
              <input
                type="text"
                value={domainValue}
                onChange={(e) => setDomainValue(e.target.value)}
                onBlur={() => {
                  if (domainValue.trim() === '') {
                    setIsTypewriterMode(true);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsTypewriterMode(true);
                  }
                }}
                className="w-full text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight bg-transparent border-transparent outline-none transition-all duration-300"
                style={{ color: 'rgb(var(--hosting-text-white))' }}
                placeholder="youridea.com"
                autoFocus
              />
            )}
          </div>

          <p className="text-xl sm:text-2xl md:text-3xl" style={{ color: 'rgb(var(--domain-hero-text-gray-400))' }}>
            Start your online story. Register a domain.
          </p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[hsl(var(--gradient-teal))] hover:bg-[hsl(var(--gradient-teal))]/80 px-8 py-4 rounded-full text-white transition-all duration-300 text-lg font-medium"
          >
            Search
          </motion.button>
        </motion.div>

        <CircleDesign 
          className="mr-1 sm:mr-2 md:mr-3 lg:mr-4 xl:mr-5 mt-6"
        />
      </div>
      </div>

      {/* Diagonal Section Divider */}
      <div className="relative">
        <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,120L1200,5L1200,120L0,120Z" 
                fill="rgb(var(--domain-hero-section-bg))" 
                opacity="1" />
        </svg>
      </div>
        {/* Transfer Pricing Section */}
        <div style={{ backgroundColor: 'rgb(var(--domain-hero-section-bg))', position: 'relative' }}>
                
        <DomainExtensions />

        </div>

       
      </div>
    // </div>
  );
}