'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dropdown from '@/components/Navbar/DynamicDropdown';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleDropdown = (menu: string) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  // Close dropdown when mobile menu closes
  useEffect(() => {
    if (!isMenuOpen) setActiveDropdown(null);
  }, [isMenuOpen]);

  const menuItems = ['Domains', 'Hosting', 'Email', 'Cloud', 'Security', 'Explore All'];

  return (
    <motion.nav
      className="bg-transparent fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isLoaded ? 0 : -100, opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* 🔹 Top Banner */}
      <div className="bg-[#0b1b3d] text-white text-center py-2 text-xs sm:text-sm">
        Create your site using AI, included with our Web Hosting →
      </div>

      {/* 🔹 Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 🔹 Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-sm mr-2 flex items-center justify-center">
              <div className="w-4 h-4 bg-[#0a0e27] transform rotate-45"></div>
            </div>
            <Link href="/" className="text-white text-xl font-bold">
              Cloud Aro
            </Link>
          </div>

          {/* 🔹 Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {menuItems.map((item) => (
              <Dropdown
                key={item}
                section={item}
                activeDropdown={activeDropdown}
                toggleDropdown={toggleDropdown}
              />
            ))}
          </div>

          {/* 🔹 Right Side Icons */}
          <div className="hidden md:flex items-center space-x-2">
            {['💱', '🛒', '👤'].map((icon, i) => (
              <button
                key={i}
                className="text-white hover:text-[#60a5fa] p-2 hover:bg-gray-800 rounded-md"
              >
                {icon}
              </button>
            ))}
          </div>

          {/* 🔹 Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-md hover:bg-gray-800"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Mobile Dropdowns */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="lg:hidden bg-[#111] border-t border-gray-800 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <Dropdown
                  key={item}
                  section={item}
                  activeDropdown={activeDropdown}
                  toggleDropdown={toggleDropdown}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
