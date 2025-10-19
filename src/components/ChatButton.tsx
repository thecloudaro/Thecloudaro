"use client";
import { motion } from "framer-motion";
import React from "react";

interface ChatButtonProps {
  onClick?: () => void;     // Optional click handler
  delay?: number;           // Animation delay (default 1.9s)
  isLoaded?: boolean;       // Control animation externally if needed
}

export default function ChatButton({
  onClick,
  delay = 1.9,
  isLoaded = true,
}: ChatButtonProps) {
  return (
    <motion.div
      className="fixed bottom-3 right-3 xs:bottom-4 xs:right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <button
        onClick={onClick}
        className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 
                   bg-blue-600 hover:bg-blue-700 
                   rounded-full flex items-center justify-center 
                   shadow-lg transition"
      >
        <svg
          className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white"
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
  );
}
