'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Button from './Button';
import ChatButton from '../ChatButton';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollY } = useScroll();

  // Zoom-out animation for hero
  const rawScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const scale = useSpring(rawScale, { stiffness: 80, damping: 20 });

  // Base shadow fade
  const rawBaseShadow = useTransform(scrollY, [0, 100], [0, 0.25]);
  const baseShadow = useSpring(rawBaseShadow, { stiffness: 80, damping: 20 });

  // Scroll transition overlay
  const rawTransitionShadow = useTransform(scrollY, [200, 700], [0, 1]);
  const transitionShadow = useSpring(rawTransitionShadow, { stiffness: 80, damping: 20 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden pt-2 sm:pt-6 lg:pt-10 bg-hero-bg transition-colors duration-500">
      {/* Background Image - Fixed to cover entire viewport from top */}
      <motion.div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/BgPics/bg3.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          zIndex: -1
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Base Overlay */}
      <motion.div
        className="absolute inset-0 bg-hero-bg z-10 pointer-events-none transition-colors duration-500"
        style={{ opacity: baseShadow }}
      />

      {/* Scroll Transition Overlay */}
      <motion.div
        className="absolute inset-0 bg-hero-bg z-20 pointer-events-none transition-colors duration-500"
        style={{ opacity: transitionShadow }}
      />


      {/* Main Content */}
      <motion.div
        className="relative z-30 flex flex-col items-center justify-start pt-20 sm:pt-24 md:pt-28 lg:pt-40 px-4 sm:px-6 md:px-8 lg:px-10 text-center"
        style={{ scale }}
      >
        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-hero-text mb-4 sm:mb-6 md:mb-8 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Register your domain
        </motion.h1>

        {/* Domain Search Section */}
        <motion.div
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
         {/* Tabs */}
         <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
  <div className="bg-hero-tab-bg backdrop-blur-md transition 
                  rounded-full p-1 flex shadow-md border border-hero-search-border">
    {["register", "transfer"].map((tab) => (
      <Button
        key={tab}
        label={tab.charAt(0).toUpperCase() + tab.slice(1)}
        isActive={activeTab === tab}
        onClick={() => setActiveTab(tab)}
      />
    ))}
  </div>
</div>


          {/* Search Bar */}
          <div className="relative w-full mb-4 sm:mb-6 md:mb-8">
            <div className="flex items-stretch bg-hero-search-bg backdrop-blur-md rounded-full p-1 sm:p-2 border border-hero-search-border shadow-lg">
              <div className="flex items-center flex-1 px-2 sm:px-4">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(var(--hero-section-search-icon))] mr-2 sm:mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for a domain name..."
                  className="flex-1 bg-transparent text-hero-text placeholder-hero-text-muted text-sm sm:text-base focus:outline-none placeholder:text-xs sm:placeholder:text-sm"
                />
              </div>
              <button 
                className="text-white px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-base relative"
                style={{
                  background: `hsl(var(--header-banner-gradient-1))`,
                  border: `1px solid hsl(var(--header-banner-gradient-3) / 0.4)`,
                }}
              >
                <span 
                  className="absolute inset-0 rounded-full opacity-40"
                  style={{
                    background: `radial-gradient(circle at top, hsl(var(--header-banner-gradient-3)) 0%, transparent 70%)`,
                  }}
                />
                <span className="relative z-10">Search</span>
              </button>
            </div>
          </div>


         {/* Price snippet */}
<motion.div
  className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 flex-wrap"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
  transition={{ duration: 0.6, delay: 1.6 }}
>
  {[
    { label: ".com only $8.88", variant: "domain-pill--com", isCom: true },
    { label: ".net only $11.20", variant: "domain-pill--purple", isCom: false },
    { label: ".org only $9.88", variant: "domain-pill--purple", isCom: false },
  ].map((item, idx) => (
    item.isCom ? (
      <motion.div
        key={idx}
        className="domain-pill domain-pill--com backdrop-blur-md border border-hero-price-border rounded-2xl shadow-md"
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.5, delay: 1.8 }}
      >
        <motion.span
          className="com-pill-inner block px-3 sm:px-3.5 md:px-4 py-1 sm:py-1.5 md:py-1.5 rounded-full text-[11px] sm:text-xs md:text-sm font-medium text-white cursor-pointer"
          animate={{
            opacity: [1, 0.88, 1],
            y: [0, -4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          {item.label}
        </motion.span>
      </motion.div>
    ) : (
      <div
        key={idx}
        className={`domain-pill ${item.variant} backdrop-blur-md border border-hero-price-border rounded-2xl shadow-md`}
      >
        <Button label={item.label} />
      </div>
    )
  ))}
        </motion.div>
      </motion.div>
    </motion.div>

    <ChatButton onClick={() => console.log("Chat opened")} isLoaded={isLoaded} />
  </div>
  );
};

export default HeroSection;
