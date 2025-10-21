"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SeePlanButton from "./SeePlan";
import { useState } from "react";

const BuildAroundDomain = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleMouseEnter = (cardId: string) => {
    setHoveredCard(cardId);
  };

  const handleMouseLeave = (cardId: string) => {
    setTimeout(() => {
      setHoveredCard(null);
    }, 2000); // 2 seconds delay before hiding
  };

  return (
    <section className="bg-black text-white py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-start md:justify-between mb-20 gap-8"
        >
        <div className="md:w-1/2 ">
  <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-bold text-white leading-[0.95] tracking-tight font-sans mx-auto">
    Build around <br />
    your domain
  </h1>
</div>

<div className="md:w-1/2 md:pl-8 mb-8">
  <p className="text-gray-300 text-3xl md:text-3.5xl leading-relaxed mx-auto max-w-xl">
    Choose and connect exactly what <br />
    you need to take your domain and <br/> website to the world.
  </p>
</div>


        </motion.div>

        {/* Cards Grid - 3 Rows Layout */}
        <div className="space-y-8">
        
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group"
            onMouseEnter={() => handleMouseEnter('web-hosting')}
            onMouseLeave={() => handleMouseLeave('web-hosting')}
          >
            {/* 🔹 Adjust height here ↓ */}
            <div className="bg-gray-800 rounded-3xl overflow-hidden h-[500px] flex transition-all duration-500 ease-in-out">
              {/* Left side - Abstract graphic */}
              <div className="w-1/2 relative overflow-hidden bg-[#0d1b2a]">
  <div className="absolute inset-0 flex items-center justify-center">
    <img 
      src="/a.svg" 
      alt="Graphic" 
      className="absolute inset-0 w-full h-full object-cover opacity-90" 
    />
    <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a]/40 via-[#1b263b]/40 to-[#415a77]/30" />
  </div>
</div>


             {/* Right side - Content */}
<div className="w-1/2 p-8 pl-16 flex flex-col justify-center items-start text-left font-sans">
  <p className="text-md uppercase tracking-widest text-white font-normal">
    WEB HOSTING
  </p>

  <h3 className="text-6xl font-bold mb-3 leading-tight">
    Powerfully simple
  </h3>

  <p className="text-gray-300 text-xl md:text-3.5xl leading-relaxed items-start text-left max-w-xl mb-6">
    Get everything for launching a successful <br />
    website, from high-performance servers to easy <br />
    management.
  </p>

  {/* See Plan Button */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: hoveredCard === 'web-hosting' ? 1 : 0,
      y: hoveredCard === 'web-hosting' ? 0 : 20
    }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="mt-2"
  >
    <SeePlanButton href="/pricing" />
  </motion.div>
</div>

            </div>
          </motion.div>


          <div className="grid md:grid-cols-2 gap-8">
            {/* EasyWP Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
              onMouseEnter={() => handleMouseEnter('easywp')}
              onMouseLeave={() => handleMouseLeave('easywp')}
            >
              <div className="bg-gray-800 rounded-3xl overflow-hidden h-[780px] flex flex-col transition-all duration-500 ease-in-out">
                {/* Top - 3D geometric shapes */}
                <div className="h-12/32 bg-gradient-to-r from-green-600 to-teal-500 relative overflow-hidden">
  <div className="absolute inset-0 flex items-center justify-center">
    <img 
      src="/3d3.png" 
      alt="The Cloudaro" 
      className="absolute inset-0 w-full h-full object-cover opacity-90" 
    />
    <div className="absolute inset-0 bg-gradient-to-r from-green-600/40 to-teal-500/40" />
  </div>
</div>

                
                {/* Bottom - Content */}
                <div className="h-16/32 p-6 pl-16 flex flex-col justify-center items-start text-left font-sans">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-5 h-5 bg-green-500 rounded mr-3"></div>
                    <p className="text-md uppercase tracking-widest text-white font-normal">easywp</p>
                  </div>
                  <h3 className="text-5xl font-bold mb-3 leading-tight">No stress hosting <br/> for WordPress</h3>
                  <p className="text-gray-300 text-xl md:text-3.5xl leading-relaxed items-start text-left max-w-xl">
                    Give your site a head start with the fastest <br/> 
                    hosting for WordPress on next-gen cloud <br/>
                    technology.
                  </p>

                  {/* See Plan Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: hoveredCard === 'easywp' ? 1 : 0,
                      y: hoveredCard === 'easywp' ? 0 : 20
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mt-8"
                  >
                    <SeePlanButton href="/pricing" />
                  </motion.div>
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
              onMouseEnter={() => handleMouseEnter('starlight')}
              onMouseLeave={() => handleMouseLeave('starlight')}
            >
              <div className="bg-gray-800 rounded-3xl overflow-hidden h-[780px] flex flex-col transition-all duration-500 ease-in-out">
              
                <div className="h-[37.5%] bg-orange-400 relative overflow-hidden flex items-center justify-center">
      <img 
        src="/3d4.png" 
        alt="Profile Fan" 
        className=""
      />
    </div>
  
                
                <div className="h-16/32 p-6 pl-16 flex flex-col justify-center items-start text-left font-sans">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-5 h-5 bg-yellow-400 rounded mr-3"></div>
                    <p className="text-md uppercase tracking-widest text-white font-normal">starlight</p>
                  </div>
                  <h3 className="text-6xl font-bold mb-3 leading-tight">Virtual machines</h3>
                  <p className="text-gray-300 text-base leading-relatext-gray-300 text-xl md:text-3.5xl leading-relaxed items-start text-left max-w-xl mb-6xed">
                    Power more possibilities through extra server<br/> 
                     muscle matched with flexible control and <br/> 
                     scalability.
                  </p>

                  {/* See Plan Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: hoveredCard === 'starlight' ? 1 : 0,
                      y: hoveredCard === 'starlight' ? 0 : 20
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mt-8"
                  >
                    <SeePlanButton href="/pricing" />
                  </motion.div>
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
            onMouseEnter={() => handleMouseEnter('spacemail')}
            onMouseLeave={() => handleMouseLeave('spacemail')}
          >
            <div className="bg-gray-800 rounded-3xl overflow-hidden h-[500px] flex transition-all duration-500 ease-in-out">
              {/* Left side - Content */}
              <div className="w-1/2 p-8 pl-16 flex flex-col justify-center items-start text-left font-sans">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-5 h-5 bg-purple-500 rounded mr-3"></div>
                  <p className="text-md uppercase tracking-widest text-white font-normal">spacemail</p>
                </div>
                <h3 className="text-6xl font-bold mb-3 leading-tight">Effortless email</h3>
                <p className="text-gray-300 text-xl md:text-3.5xl leading-relaxed items-start text-left max-w-xl mb-6">
                  Send the right message with ultra-simple and <br/>
                  full-service business email for your<br/> Domain.
                </p>
                
                {/* See Plan Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredCard === 'spacemail' ? 1 : 0,
                    y: hoveredCard === 'spacemail' ? 0 : 20
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mt-2"
                >
                  <SeePlanButton href="/pricing" />
                </motion.div>
              </div>

              {/* Right side - Image */}
              <div className="w-1/2 bg-gradient-to-br from-purple-500 to-purple-700 relative overflow-hidden">
                <img
                  src="/3d5.jpeg"
                  alt="Email Service"
                  className="absolute inset-0 w-full h-full object-cover"
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
