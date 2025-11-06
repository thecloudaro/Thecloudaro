"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar/Navbar";
import Typewriter from "typewriter-effect";
import { CircleDesign } from "./CircleDesign";
import DomainExtensions from "@/components/Domain/DomainExtensions";
import DomainGuide1 from "@/components/Domain/DomainGuide1";
import DomainGuide3 from "@/components/Domain/DomainGuide3";
import DomainGuide4 from "@/components/Domain/DomainGuide4";
import DomainGuide5 from "@/components/Domain/DomainGuide5";
import DomainPricingPage from "@/components/Domain/DomainPricingPage";
import DomainPricingNavbar from "@/components/Domain/DomainPricingNavbar";
import DomainFAQ from "@/components/Domain/DomainFAQ";
import RelatedProducts from "@/components/Domain/RelatedProducts";

export default function DomainHeroSection() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [domainValue, setDomainValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTypewriterMode, setIsTypewriterMode] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => {
      if (window.scrollY > 50) setShowNavbar(false);
      else setShowNavbar(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[hsl(var(--footer-bg-primary))]
     via-[hsl(var(--footer-bg-secondary))] to-[hsl(var(--footer-bg-secondary))] 
     text-gray-300 overflow-hidden pt-14">
      <div className="">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showNavbar ? 1 : 0, y: showNavbar ? 0 : -50 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <Navbar hideBanner />
      </motion.div>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-2 sm:px-4 md:px-6 lg:px-14 xl:px-22 pt-20 sm:pt-22 md:pt-24 lg:pt-26 xl:pt-28 pb-1 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 space-y-6 text-left max-w-2xl"
        >
          <h2 className="text-gray-400 text-xl sm:text-2xl md:text-3xl">
            Start typing...
          </h2>

          {/* Domain Input Field with Typewriter Effect */}
          <div className="relative">
            {isTypewriterMode ? (
              <div 
                className="w-full text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-100/50 leading-tight cursor-pointer"
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
                className="w-full text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight bg-transparent border-transparent outline-none transition-all duration-300"
                placeholder="youridea.com"
                autoFocus
              />
            )}
          </div>

          <p className="text-gray-400 text-xl sm:text-2xl md:text-3xl">
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
          <path d="M0,125L1200,5V120H0Z" 
                fill="hsl(var(--domain-pages-bg))" 
                opacity="1" />
        </svg>
      </div>

      {/* All other domain components */}
      <div className="bg-[#191c1c]">
        <DomainExtensions />
        <DomainGuide5 />
        <DomainGuide4 />
        <DomainGuide3 />
        <DomainGuide1 />

        {/* New Domain Pricing Page */}
        <DomainPricingNavbar />
        <DomainPricingPage />

        {/* Related Products */}
        <RelatedProducts />

        {/* Domain FAQ */}
        <DomainFAQ />
      </div>
    </div>
  );
}