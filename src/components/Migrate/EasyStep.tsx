"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const EasyStep = () => {
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          {/* Main Heading */}
          <ContentHeading
            title="3 easy steps to migrate<br/>your website hosting"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl !text-white font-bold leading-tight"
          />
        </motion.div>

        {/* Image and Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 sm:mt-16 md:mt-20 lg:mt-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
            {/* Left Side - Image and Second Content */}
            <div className="flex flex-col">
              {/* Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[650px] h-[450px] sm:h-[550px] md:h-[650px]">
                  <Image
                    src="/Migrate/SetUp.png"
                    alt="Set up your EasyWP"
                    fill
                    className="object-contain"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              {/* Second Step Content - Below Image */}
              <div className="flex flex-col justify-center space-y-4 sm:space-y-6 mt-8 sm:mt-10 md:mt-12">
                <ContentDescription
                  text="2. Start your website migration"
                  size="xl"
                  className="!text-white font-bold text-left"
                />
                <ContentDescription
                  text="Enter your current site credentials to set up an automatic transfer."
                  size="sm"
                  className="!text-white text-left"
                />
              </div>

            </div>

            {/* Right Side - First Content */}
            <div className="flex flex-col justify-center space-y-4 sm:space-y-6 mt-60">
              <ContentDescription
                text="1. Set up your EasyWP"
                size="xl"
                className="!text-white font-bold text-left"
              />
              <ContentDescription
                text="Select the option to migrate your existing website."
                size="sm"
                className="!text-white text-left"
              />
            </div>
          </div>

          {/* Third Step Section - Image and Content Side by Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 sm:mt-16 md:mt-20 lg:mt-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
              {/* Left Side - Third Step Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[650px] h-[450px] sm:h-[550px] md:h-[650px]">
                  <Image
                    src="/Migrate/Connect.png"
                    alt="Connect your domain"
                    fill
                    className="object-contain"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              {/* Right Side - Third Step Content */}
              <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
                <ContentDescription
                  text="3. Connect your domain"
                  size="xl"
                  className="!text-white font-bold text-left"
                />
                <ContentDescription
                  text="Once migrated, you can connect your domain and start managing your website."
                  size="sm"
                  className="!text-white text-left"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EasyStep;

