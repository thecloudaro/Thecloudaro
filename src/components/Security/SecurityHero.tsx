"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { ChevronDown } from "lucide-react";
import ContentDescription from "@/components/ui/content-description";

const SecurityHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'rgb(var(--security-hero-bg))' }}
    >
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-16 sm:pb-20">
        {/* Heading with Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
            <div className="text-center">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString('<span style="color: rgb(var(--security-hero-heading-green))">Security</span> <span style="background: linear-gradient(to right, rgb(var(--security-hero-heading-green)), rgb(var(--security-hero-heading-teal))); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">as standard</span>')
                    .start();
                }}
                options={{
                  delay: 80,
                  cursor: '',
                  autoStart: true,
                  wrapperClassName: 'inline-block',
                  cursorClassName: 'hidden',
                  deleteSpeed: 50,
                }}
              />
            </div>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-20"
        >
          <ContentDescription
            text="Grow your online presence with Spaceship, where secure<br>is the default setting."
            size="lg"
            className="!text-[rgb(var(--security-hero-description-text))]"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-28 flex flex-col items-center gap-2"
      >
        <p 
          className="text-xs sm:text-xs"
          style={{ color: 'rgb(var(--security-hero-scroll-text))' }}
        >
          Scroll to explore
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <ChevronDown 
            className="w-5 h-5 sm:w-6 sm:h-6"
            style={{ color: 'rgb(var(--security-hero-scroll-text))' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SecurityHero;

