"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down more than 300px
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 rounded-full p-2.5 sm:p-3 shadow-lg transition-all duration-300 hover:shadow-xl"
          style={{
            backgroundColor: 'rgb(var(--back-to-top-bg))',
            color: 'rgb(var(--back-to-top-text))'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgb(var(--back-to-top-text-hover))';
            e.currentTarget.style.backgroundColor = 'rgb(var(--back-to-top-bg-hover))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgb(var(--back-to-top-text))';
            e.currentTarget.style.backgroundColor = 'rgb(var(--back-to-top-bg))';
          }}
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;

