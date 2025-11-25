"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Folder } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const WhatYou = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div 
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#17181a' }}
    >
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <ContentHeading
            title="What you need for<br/>migration to EasyWP"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl !text-white font-bold leading-tight"
          />
        </motion.div>

        {/* Content Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 text-left ml-20 sm:ml-24 md:ml-28 lg:ml-48"
        >
          {/* Section 1: Website details */}
          <div className="mb-6 sm:mb-8 md:mb-10">
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <Folder className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <ContentDescription
                text="Website details"
                size="lg"
                className="!text-lg sm:!text-xl md:!text-2xl !text-white font-bold"
              />
            </div>
            <ul className="space-y-2 sm:space-y-3 pl-0 sm:pl-8 text-xs" style={{ color: 'rgb(156 163 175)' }}>
              <li className="flex items-start gap-2">
                <span className="mt-2">•</span>
                <span>The full web address (URL) of your current website, e.g., https://yourdomain.com.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2">•</span>
                <span>Your WordPress admin login details for your current website. You will not be able to log in using social media accounts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2">•</span>
                <span>CAPTCHA verification and Two-factor authentication (2FA) deactivated.</span>
              </li>
            </ul>
          </div>

          {/* Horizontal Line */}
          <div className="border-t mb-6 sm:mb-8 md:mb-10 block max-w-2xl" style={{ borderColor: 'rgb(55 65 81)' }}></div>

          {/* Section 2: File size and database account limits */}
          <div>
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <Folder className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <ContentDescription
                text="File size and database account limits"
                size="lg"
                className="!text-lg sm:!text-xl md:!text-2xl !text-white font-bold"
              />
            </div>
            <p className="mb-2 sm:mb-3 text-xs" style={{ color: 'rgb(156 163 175)' }}>
              Before automatically migrating your website, we recommend checking that the size of your files and database are within<br/>the limits of your EasyWP account.
            
              The maximum available server disk space for your account depends on the EasyWP plan:
            </p>
            <ul className="space-y-2 sm:space-y-3 pl-0 sm:pl-8 mb-2 sm:mb-3 text-xs" style={{ color: 'rgb(156 163 175)' }}>
              <li className="flex items-start gap-2">
                <span className="mt-2">•</span>
                <span>EasyWP Starter: 10 GB</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2">•</span>
                <span>EasyWP Turbo 50 GB</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2">•</span>
                <span>EasyWP Supersonic 100 GB</span>
              </li>
            </ul>
            <p className="text-xs" style={{ color: 'rgb(156 163 175)' }}>
              The database size for each EasyWP plan is restricted to 3 GB.
              
              The database size does not count towards the subscription&apos;s<br/>overall disk usage.
            </p>
          </div>

          {/* Horizontal Line at the end */}
          <div className="border-t mt-6 sm:mt-8 md:mt-10 block max-w-2xl" style={{ borderColor: 'rgb(55 65 81)' }}></div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhatYou;

