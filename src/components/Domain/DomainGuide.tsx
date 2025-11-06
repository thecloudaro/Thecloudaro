"use client";

import { motion } from "framer-motion";
import { Search, CheckCircle, ShoppingCart, MessageCircle, Shield, RotateCcw, Link } from "lucide-react";

const DomainGuide = () => {
  return (
    <section className="py-20 bg-[#191c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Section - Domain Name Guide */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Find a domain name that&apos;s right for you
            </h2>
            <p className="text-gray-400 text-xl">
              How to choose the best fit.
            </p>
          </div>
          
          {/* Teal graphic element in bottom-left */}
          <div className="relative">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500 rounded-bl-3xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 text-white text-2xl font-bold">
              Keep it simple
            </div>
          </div>
        </div>

        {/* Second Section - Keep it Simple */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
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

        {/* Third Section - Check Availability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              Check availability
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Use our domain search to see if your ideal domain is available. 
              If it&apos;s already been taken, check out the suggested alternatives.
            </p>
          </motion.div>

          {/* Right - Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gray-800 rounded-2xl p-6 relative overflow-hidden">
              {/* Green Glow Effect */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl"></div>
              
              {/* Available Domain */}
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-white font-medium">myidea.com is available</span>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-300">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>

              {/* Alternative Domains */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-300">myidea.ai</span>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-300">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-300">myidea.online</span>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-300">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-300">myidea.info</span>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-300">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fourth Section - Protect Your Future */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Left - Domain Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gray-800 rounded-2xl p-6 relative">
              {/* Domain Cards */}
              <div className="space-y-4">
                {/* myidea.website */}
                <div className="bg-gradient-to-br from-green-400 to-teal-600 rounded-xl p-4 relative">
                  <div className="absolute top-2 left-2 bg-green-300 text-green-900 text-xs font-bold px-2 py-1 rounded">
                    20% OFF
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-white mr-2" />
                      <span className="text-white font-bold">myidea.website</span>
                    </div>
                    <button className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-300">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* myidea.shop */}
                  <div className="bg-gradient-to-br from-green-400 to-teal-600 rounded-xl p-4 relative">
                    <div className="absolute top-2 left-2 bg-green-300 text-green-900 text-xs font-bold px-2 py-1 rounded">
                      20% OFF
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-white mr-2" />
                        <span className="text-white font-bold text-sm">myidea.shop</span>
                      </div>
                      <button className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-300">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* myidea.blog */}
                  <div className="bg-gradient-to-br from-green-400 to-teal-600 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-white mr-2" />
                        <span className="text-white font-bold text-sm">myidea.blog</span>
                      </div>
                      <button className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-300">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
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
              Protect your future
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Aim for a timeless and powerfully brandable domain name. 
              Avoid on-trend words and buy a domain that allows your business to grow.
            </p>
          </motion.div>
        </div>

        {/* Fifth Section - More than just a domain */}
        <div className="text-center">
          <h2 className="text-[2.5rem] sm:text-[3.25rem] lg:text-6xl font-bold text-white mb-20 sm:mb-24 md:mb-28 lg:mb-32">
            More than just a domain
          </h2>
          
          <div className="flex justify-center mt-8 md:mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-5xl">
            {[
              {
                icon: Shield,
                title: "Free domain privacy",
                description: (
                  <>
                    <span className="whitespace-nowrap">Keep personal details hidden and your</span><br /><span className="whitespace-nowrap">inbox free from spam.</span>
                  </>
                ),
                delay: 0
              },
              {
                icon: RotateCcw,
                title: "Easy auto-renewal",
                description: (
                  <>
                    <span className="whitespace-nowrap">Make sure your domain stays yours with</span><br /><span className="whitespace-nowrap">automatic domain renewal.</span>
                  </>
                ),
                delay: 0.2
              },
              {
                icon: Link,
                title: "Simple setup",
                description: (
                  <>
                    <span className="whitespace-nowrap">All our products are seamlessly</span><br /><span className="whitespace-nowrap">connected and ready for you to activate.</span>
                  </>
                ),
                delay: 0.4
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainGuide;
