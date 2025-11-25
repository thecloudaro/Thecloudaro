"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ContentDescription from "@/components/ui/content-description";

export default function ContactUsPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div 
      className="relative flex flex-col items-start justify-start overflow-hidden lg:min-h-screen"
      style={{ backgroundColor: '#252626' }}
    >
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-8 sm:pt-10 md:pt-12 lg:pt-16 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-1 sm:space-y-2"
          >
            {/* Main Heading */}
            <ContentDescription
              text="Contact us"
              size="md"
              className="text-xl sm:text-2xl md:text-2xl lg:text-2xl text-left !text-white font-bold"
            />

            {/* Description */}
            <ContentDescription
              text="If you have any questions or need some help, please email us at support@thecloudaro.com or start a chat."
              size="sm"
              className="!text-sm sm:!text-base md:!text-base text-left max-w-2xl !text-white"
            />
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
              <Image
                src="/ContactUs/Hero.svg"
                alt="Contact Us"
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

