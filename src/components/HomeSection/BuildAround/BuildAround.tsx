"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SeePlanButton from "./SeePlan";
import { useState } from "react";

const BuildAroundDomain = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleMouseEnter = () => {
    setHoveredCard('active');
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setHoveredCard(null);
    }, 2000); // 2 seconds delay before hiding
  };

  return (
    <section className="bg-black text-white py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-12 sm:mb-16 md:mb-20 gap-6 sm:gap-8"
        >
          <div className="lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] tracking-tight font-sans">
              Build around <br />
              your domain
            </h1>
          </div>

          <div className="lg:w-1/2 lg:pl-8">
            <p className="text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed max-w-xl">
              Choose and connect exactly what <br />
              you need to take your domain and <br/> website to the world.
            </p>
          </div>
        </motion.div>

        {/* Cards Grid - 3 Rows Layout */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
        
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bg-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden h-auto lg:h-[460px] flex flex-col lg:flex-row gap-3 transition-all duration-500 ease-in-out touch-manipulation">
              {/* Left side - Abstract graphic */}
              <div className="w-full lg:w-1/2 lg:h-full min-h-36 sm:min-h-48 relative overflow-hidden bg-[#0d1b2a]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src="/a.svg" 
                    alt="Graphic" 
                    fill
                    className="object-cover opacity-90" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a]/40 via-[#1b263b]/40 to-[#415a77]/30" />
                </div>
              </div>

              {/* Right side - Content */}
              <div className="w-full lg:w-1/2 lg:h-full p-3 sm:p-5 md:p-6 lg:pl-12 flex flex-col justify-center items-start text-left font-sans">
                <p className="text-xs sm:text-sm md:text-base uppercase tracking-widest text-white font-normal">
                  WEB HOSTING
                </p>

                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1.5 sm:mb-2 leading-tight">
                  Powerfully simple
                </h3>

                <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed items-start text-left max-w-xl mb-3 sm:mb-4">
                  Get everything for launching a successful <br />
                  website, from high-performance servers to easy <br />
                  management.
                </p>

                {/* See Plan Button - always visible on mobile, animated on desktop */}
                <div className="mt-1.5 block lg:hidden">
                  <SeePlanButton href="/pricing" className="px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm" />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredCard ? 1 : 0,
                    y: hoveredCard ? 0 : 20
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mt-2 hidden lg:block"
                >
                  <SeePlanButton href="/pricing" className="px-4 py-2 text-sm" />
                </motion.div>
              </div>
            </div>
          </motion.div>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* EasyWP Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
              <div className="bg-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden h-[400px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[720px] flex flex-col transition-all duration-500 ease-in-out touch-manipulation">
                {/* Top - 3D geometric shapes */}
                <div className="h-1/3 sm:h-2/5 bg-gradient-to-r from-green-600 to-teal-500 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image 
                      src="/3d3.png" 
                      alt="The Cloudaro" 
                      fill
                      className="object-cover opacity-90" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600/40 to-teal-500/40" />
                  </div>
                </div>
                
                {/* Bottom - Content */}
                <div className="h-2/3 sm:h-3/5 p-3 sm:p-5 md:p-6 lg:pl-12 flex flex-col justify-center items-start text-left font-sans">
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded mr-2 sm:mr-3"></div>
                    <p className="text-xs sm:text-sm md:text-base uppercase tracking-widest text-white font-normal">easywp</p>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1.5 sm:mb-2 leading-tight">No stress hosting <br/> for WordPress</h3>
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed items-start text-left max-w-xl">
                    Give your site a head start with the fastest <br/> 
                    hosting for WordPress on next-gen cloud <br/>
                    technology.
                  </p>

                  {/* See Plan Button - always visible */}
                  <div className="mt-2">
                    <SeePlanButton href="/pricing" className="px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm lg:px-4 lg:py-2 lg:text-sm" />
                  </div>
                </div>
              </div>
            </motion.div>
            

            {/* Starlight Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
              <div className="bg-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden h-[400px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[720px] flex flex-col transition-all duration-500 ease-in-out touch-manipulation">
                <div className="h-1/3 sm:h-2/5 bg-orange-400 relative overflow-hidden flex items-center justify-center">
                  <Image 
                    src="/3d4.png" 
                    alt="Profile Fan" 
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="h-2/3 sm:h-3/5 p-3 sm:p-5 md:p-6 lg:pl-12 flex flex-col justify-center items-start text-left font-sans">
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-400 rounded mr-2 sm:mr-3"></div>
                    <p className="text-xs sm:text-sm md:text-base uppercase tracking-widest text-white font-normal">starlight</p>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1.5 sm:mb-2 leading-tight">Virtual machines</h3>
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed items-start text-left max-w-xl">
                    Power more possibilities through extra server<br/> 
                     muscle matched with flexible control and <br/> 
                     scalability.
                  </p>

                  {/* See Plan Button - always visible */}
                  <div className="mt-2">
                    <SeePlanButton href="/pricing" className="px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm lg:px-4 lg:py-2 lg:text-sm" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Third Row - Spacemail Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bg-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden h-auto lg:h-[500px] flex flex-col lg:flex-row gap-4 transition-all duration-500 ease-in-out touch-manipulation">
              {/* Left side - Content */}
              <div className="w-full lg:w-1/2 lg:h-full p-4 sm:p-6 md:p-8 lg:pl-16 flex flex-col justify-center items-start text-left font-sans">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-purple-500 rounded mr-2 sm:mr-3"></div>
                  <p className="text-xs sm:text-sm md:text-base uppercase tracking-widest text-white font-normal">spacemail</p>
                </div>
                <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 leading-tight">Effortless email</h3>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed items-start text-left max-w-xl mb-4 sm:mb-6">
                  Send the right message with ultra-simple and <br/>
                  full-service business email for your<br/> Domain.
                </p>
                
                {/* See Plan Button - always visible on mobile, animated on desktop */}
                <div className="mt-2 block lg:hidden">
                  <SeePlanButton href="/pricing" />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredCard ? 1 : 0,
                    y: hoveredCard ? 0 : 20
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mt-2 hidden lg:block"
                >
                  <SeePlanButton href="/pricing" />
                </motion.div>
              </div>

              {/* Right side - Image */}
              <div className="w-full lg:w-1/2 order-first lg:order-none lg:h-full min-h-40 sm:min-h-56 bg-gradient-to-br from-purple-500 to-purple-700 relative overflow-hidden">
                <Image
                  src="/3d5.jpeg"
                  alt="Email Service"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-purple-700/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BuildAroundDomain;
