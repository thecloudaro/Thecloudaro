"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

const DomainGuide1 = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 min-h-screen flex items-center bg-[#191c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* First Section - Domain Name Guide */}
        <div className="text-center mb-20">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
  Find a domain name that&apos;s
  <span className="hidden lg:block" /> right for you
</h2>

          <p className="text-gray-400 text-xl">
            How to choose the best fit.
          </p>
        </div>

        {/* Second Section - Keep it Simple */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Search Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-teal-400 via-teal-500 to-green-600 rounded-3xl p-8 relative overflow-hidden">
              {/* Organic curved shapes */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-teal-300/30 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/20 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-teal-400/20 rounded-full blur-lg"></div>
              
              {/* Search Bar */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="bg-gray-900 rounded-2xl p-4 w-full max-w-md">
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="myidea.com"
                      className="flex-1 bg-transparent text-white text-lg placeholder-gray-400 focus:outline-none"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors duration-300">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              Keep it simple
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              When you register a domain, choose one that&apos;s easy to spell and keep it short. 
              Ask for honest feedback from people you know.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DomainGuide1;
