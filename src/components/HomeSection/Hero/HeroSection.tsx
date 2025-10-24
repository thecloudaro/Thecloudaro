'use client';

import React, { useState, useEffect } from 'react';
import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';
import Button from './Button';
import ChatButton from '../ChatButton';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollY } = useViewportScroll();

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
    <div className="relative min-h-screen overflow-hidden pt-20 sm:pt-24 lg:pt-28 bg-gray-900 transition-colors duration-500">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/BgPics/bg3.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Base Overlay */}
      <motion.div
        className="absolute inset-0 bg-gray-900 z-10 pointer-events-none transition-colors duration-500"
        style={{ opacity: baseShadow }}
      />

      {/* Scroll Transition Overlay */}
      <motion.div
        className="absolute inset-0 bg-gray-900 z-20 pointer-events-none transition-colors duration-500"
        style={{ opacity: transitionShadow }}
      />


      {/* Main Content */}
      <motion.div
        className="relative z-30 flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 md:px-8 lg:px-10 text-center"
        style={{ scale }}
      >
        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          A domain odyssey
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
  <div className="bg-gray-800/70  backdrop-blur-md transition 
                  rounded-full p-1 flex shadow-md ">
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
            <div className="flex items-stretch bg-gray-800/90 backdrop-blur-md rounded-full p-1.5 sm:p-2 border border-gray-600 shadow-lg">
              <div className="flex items-center flex-1 px-3 sm:px-4">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3"
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
                  className="flex-1 bg-transparent text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-sm sm:text-base transition">
                Search
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
  {[{ label: ".com only $8.88" }, { label: ".net only $11.20" }].map((item, idx) => (
    <div
      key={idx}
      className="bg-gray-800/70 hover:bg-gray-800/90 backdrop-blur-md transition border border-gray-600 rounded-2xl shadow-md"
    >
      <Button label={item.label} />
    </div>
  ))}
        </motion.div>
      </motion.div>
    </motion.div>

      

        <ChatButton onClick={() => console.log("Chat opened")} isLoaded={isLoaded} />

      
        

      
    </div>
  );
};

export default HeroSection;
