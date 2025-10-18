'use client';

import React, { useState, useEffect } from 'react';
import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';
// import NextSection from './NextSecLayout';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollY } = useViewportScroll();

  // Zoom-out animation for hero
  const rawScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const scale = useSpring(rawScale, { stiffness: 80, damping: 20 });

  // Static shadow removed at top, fade transition added below
  const rawBaseShadow = useTransform(scrollY, [0, 100], [0, 0.25]);
  const baseShadow = useSpring(rawBaseShadow, { stiffness: 80, damping: 20 });

  // Cinematic scroll transition overlay
  const rawTransitionShadow = useTransform(scrollY, [200, 700], [0, 1]);
  const transitionShadow = useSpring(rawTransitionShadow, { stiffness: 80, damping: 20 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden pt-20 sm:pt-24 lg:pt-28 bg-black">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/BgPics/bg3.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Light Base Overlay */}
      <motion.div
        className="absolute inset-0 bg-black z-10 pointer-events-none"
        style={{ opacity: baseShadow }}
      />

      {/* Scroll Transition Overlay (rises as you scroll) */}
      <motion.div
        className="absolute inset-0 bg-black z-20 pointer-events-none"
        style={{ opacity: transitionShadow }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-30 flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 md:px-8 lg:px-10 text-center"
        style={{ scale }}
      >
        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-10 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Launch your next idea
        </motion.h1>

        {/* Domain Search Section */}
        <motion.div
          className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          {/* Tabs */}
          <div className="flex justify-center mb-5">
            <div className="bg-gray-200/5 hover:bg-gray-200/10 backdrop-blur-md transition rounded-3xl p-1 flex shadow-md border border-gray-700">
              {['register', 'transfer'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-6 py-2 rounded-3xl text-sm sm:text-base font-medium transition-colors duration-200 ${
                    activeTab === tab
                      ? 'bg-[#0a0e27] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
            <div className="flex flex-col sm:flex-row items-stretch bg-[#1a1a1a]/90 backdrop-blur-md rounded-4xl p-2 sm:p-3 border border-gray-700 shadow-lg space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="flex items-center flex-1 px-3">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2"
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
              <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-5 py-2 sm:py-2.5 rounded-3xl font-medium text-sm sm:text-base transition">
                Search
              </button>
            </div>
          </div>

          {/* Pricing Snippets */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5 mt-6 flex-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            {[{ label: '.com from $8.88' }, { label: '.net from $11.20' }].map(
              (item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-200/5 hover:bg-gray-200/10 backdrop-blur-md transition border border-gray-700 rounded-3xl px-4 py-3 flex items-center shadow-md w-full sm:w-auto justify-center"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#3b82f6] rounded-full flex items-center justify-center mr-2 sm:mr-3">
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-white text-sm sm:text-base font-semibold">
                    {item.label}
                  </div>
                </div>
              )
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Chat Icon */}
      <motion.div
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 1.9 }}
      >
        <button className="w-12 h-12 sm:w-14 sm:h-14 bg-[#3b82f6] hover:bg-[#2563eb] rounded-full flex items-center justify-center shadow-lg transition">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </motion.div>
{/* <PageTransition/>  */}
    </div>

    
  );
};

export default HeroSection;
