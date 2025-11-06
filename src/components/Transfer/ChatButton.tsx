'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ChatButtonProps {
  onClick: () => void;
  isLoaded: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isLoaded }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50 transition-colors duration-300"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isLoaded ? 1 : 0, 
        scale: isLoaded ? 1 : 0 
      }}
      transition={{ duration: 0.5, delay: 2 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        className="w-6 h-6"
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
    </motion.button>
  );
};

export default ChatButton;
