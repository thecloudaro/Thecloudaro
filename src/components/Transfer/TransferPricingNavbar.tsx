'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TransferPricingNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      const scrollThreshold = 5;
      if (Math.abs(scrollY - lastScrollY) > scrollThreshold) {
        if (scrollY > lastScrollY) {
          setIsScrollingUp(false); // Scrolling down
        } else {
          setIsScrollingUp(true); // Scrolling up
        }
        setLastScrollY(scrollY);
      }

      setIsVisible(scrollY > heroHeight);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Always show navbar when visible (don't hide on scroll up)
  if (!isVisible) return null;

  // Match Spaceship behavior exactly:
  // - Scroll up: pricing navbar below main navbar (responsive heights)
  // - Scroll down: pricing navbar at very top (0px, no margins)
  const topOffsetClass = isScrollingUp 
    ? 'top-14 sm:top-16 md:top-20' // Below main navbar when scrolling up
    : ''; // No class when scrolling down - use inline style only

  // Z-index: main navbar always above pricing navbar
  const zIndexClass = isScrollingUp ? 'z-[90]' : 'z-[110]';

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 right-0 transition-all duration-300 ease-out shadow-lg ${topOffsetClass} ${zIndexClass}`}
      style={{ 
        backgroundColor: 'hsl(var(--domain-new-navbar-bg))',
        top: isScrollingUp ? undefined : 0, // Force 0px when scrolling down
        left: 0,
        right: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        // Ensure perfect top alignment when scrolling down
        transform: isScrollingUp ? 'none' : 'translateY(0)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-24 flex items-center justify-center">
          {/* Only Search Bar - Wider */}
          <div className="w-full max-w-6xl">
            <div className="flex items-stretch bg-hero-search-bg backdrop-blur-md rounded-full p-2 border border-hero-search-border shadow-lg">
              <div className="flex items-center flex-1 px-4">
                <svg
                  className="w-5 h-5 text-gray-400 mr-3"
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
                  placeholder="Enter domain name to transfer..."
                  className="flex-1 bg-transparent text-hero-text placeholder-hero-text-muted text-base focus:outline-none"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium text-base transition">
                Transfer Domain
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default TransferPricingNavbar;
