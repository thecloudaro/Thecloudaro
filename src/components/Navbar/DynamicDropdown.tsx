'use client';

import { motion, AnimatePresence } from 'framer-motion';
import UniversalLayout from './UniversalLayout';
import { useEffect } from 'react';

interface DropdownProps {
  section: string;
  activeDropdown: string | null;
  toggleDropdown: (menu: string) => void;
}

const Dropdown = ({ section, activeDropdown, toggleDropdown }: DropdownProps) => {
  const isActive = activeDropdown === section;

  // 🔹 Scroll lock when dropdown is active
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden'; // lock background scroll
    } else {
      document.body.style.overflow = 'auto';   // unlock scroll
    }

    return () => {
      document.body.style.overflow = 'auto';   // cleanup on unmount
    };
  }, [isActive]);

  return (
    <div className="relative">
      {/* 🔹 Button */}
      <button
        onClick={() => toggleDropdown(section)}
        className="text-white hover:text-[#60a5fa] px-3 py-2 text-sm md:text-base font-medium transition-colors duration-200 flex items-center"
      >
        {section}
        <motion.svg
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-1 w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      {/* 🔹 Dropdown Content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 top-[90px] w-full h-[calc(100vh-90px)] bg-[#111] border-t border-gray-800 overflow-y-auto z-[60] px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10"
          >
            <UniversalLayout section={section} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
