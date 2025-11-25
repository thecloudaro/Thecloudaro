"use client";

import { motion } from "framer-motion";
import { Search, CheckCircle, ShoppingCart, MessageCircle, Shield, RotateCcw, Link } from "lucide-react";

const DomainGuide = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24" style={{ backgroundColor: 'rgb(var(--domain-guide-bg))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* First Section - Domain Name Guide */}
          <div className="mb-16 sm:mb-20 md:mb-24 lg:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: 'rgb(var(--domain-guide-text-white))' }}>
              Find a domain name that&apos;s right for you
            </h2>
            <p className="text-xl" style={{ color: 'rgb(var(--domain-guide-text-gray-400))' }}>
              How to choose the best fit.
            </p>
          </div>
          
          {/* Teal graphic element in bottom-left */}
          <div className="relative">
            <div 
              className="absolute bottom-0 left-0 w-32 h-32 rounded-bl-3xl"
              style={{ backgroundColor: 'rgba(var(--domain-guide-teal-500-opacity))' }}
            ></div>
            <div className="absolute bottom-0 right-0 text-2xl font-bold" style={{ color: 'rgb(var(--domain-guide-text-white))' }}>
              Keep it simple
            </div>
          </div>
        </div>

        {/* Second Section - Keep it Simple */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-16 sm:mb-20 md:mb-24 lg:mb-32">
          {/* Left - Search Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div 
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{
                background: `linear-gradient(to bottom right, rgb(var(--domain-guide-teal-400)), rgb(var(--domain-guide-teal-500)), rgb(var(--domain-guide-green-600)))`
              }}
            >
              {/* Organic curved shapes */}
              <div 
                className="absolute top-0 right-0 w-20 h-20 rounded-full blur-xl"
                style={{ backgroundColor: 'rgba(var(--domain-guide-teal-300-opacity))' }}
              ></div>
              <div 
                className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl"
                style={{ backgroundColor: 'rgba(var(--domain-guide-green-500-opacity))' }}
              ></div>
              <div 
                className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full blur-lg"
                style={{ backgroundColor: 'rgba(var(--domain-guide-teal-400-opacity))' }}
              ></div>
              
              {/* Search Bar */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="rounded-2xl p-4 w-full max-w-md" style={{ backgroundColor: 'rgb(var(--domain-guide-gray-900))' }}>
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="myidea.com"
                      className="flex-1 bg-transparent text-lg focus:outline-none placeholder:text-[rgb(var(--domain-guide-text-gray-400))]"
                      style={{ color: 'rgb(var(--domain-guide-text-white))' }}
                    />
                    <button 
                      className="p-3 rounded-full transition-colors duration-300"
                      style={{ backgroundColor: 'rgb(var(--domain-guide-blue-500))', color: 'rgb(var(--domain-guide-text-white))' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide-blue-600))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide-blue-500))';
                      }}
                    >
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
            style={{ color: 'rgb(var(--domain-guide-text-white))' }}
          >
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              Keep it simple
            </h3>
            <p className="text-lg leading-relaxed" style={{ color: 'rgb(var(--domain-guide-text-gray-300))' }}>
              When you register a domain, choose one that&apos;s easy to spell and keep it short. 
              Ask for honest feedback from people you know.
            </p>
          </motion.div>
        </div>

        {/* Third Section - Check Availability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-16 sm:mb-20 md:mb-24 lg:mb-32">
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
            <div className="rounded-2xl p-6 relative overflow-hidden" style={{ backgroundColor: 'rgb(var(--domain-guide-gray-800))' }}>
              {/* Green Glow Effect */}
              <div 
                className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl"
                style={{ backgroundColor: 'rgba(var(--domain-guide-green-500-opacity))' }}
              ></div>
              
              {/* Available Domain */}
              <div 
                className="border rounded-xl p-4 mb-4 flex items-center justify-between"
                style={{
                  backgroundColor: 'rgba(var(--domain-guide-green-400-opacity))',
                  borderColor: 'rgba(var(--domain-guide-green-500-border))'
                }}
              >
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'rgb(var(--domain-guide-green-400))' }} />
                  <span className="font-medium" style={{ color: 'rgb(var(--domain-guide-text-white))' }}>myidea.com is available</span>
                </div>
                <button 
                  className="p-2 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: 'rgb(var(--domain-guide-blue-500))', color: 'rgb(var(--domain-guide-text-white))' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide-blue-600))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide-blue-500))';
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>

              {/* Alternative Domains */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span style={{ color: 'rgb(var(--domain-guide-text-gray-300))' }}>myidea.ai</span>
                  <button 
                    className="p-2 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: 'rgb(var(--domain-guide-blue-500))', color: 'rgb(var(--domain-guide-text-white))' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide-blue-600))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide-blue-500))';
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span style={{ color: 'rgb(var(--domain-guide-text-gray-300))' }}>myidea.online</span>
                  <button 
                    className="p-2 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: 'rgb(var(--domain-guide-blue-500))', color: 'rgb(var(--domain-guide-text-white))' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide-blue-600))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide-blue-500))';
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span style={{ color: 'rgb(var(--domain-guide-text-gray-300))' }}>myidea.info</span>
                  <button 
                    className="p-2 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: 'rgb(var(--domain-guide-blue-500))', color: 'rgb(var(--domain-guide-text-white))' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide-blue-600))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide-blue-500))';
                    }}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fourth Section - Protect Your Future */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-16 sm:mb-20 md:mb-24 lg:mb-32">
          {/* Left - Domain Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-2xl p-6 relative" style={{ backgroundColor: 'rgb(var(--domain-guide-gray-800))' }}>
              {/* Domain Cards */}
              <div className="space-y-4">
                {/* myidea.website */}
                <div 
                  className="rounded-xl p-4 relative"
                  style={{
                    background: `linear-gradient(to bottom right, rgb(var(--domain-guide-green-400)), rgb(var(--domain-guide-teal-500)))`
                  }}
                >
                  <div 
                    className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded"
                    style={{ backgroundColor: 'rgb(var(--domain-guide-green-300))', color: 'rgb(var(--domain-guide-green-900))' }}
                  >
                    20% OFF
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" style={{ color: 'rgb(var(--domain-guide-text-white))' }} />
                      <span className="font-bold" style={{ color: 'rgb(var(--domain-guide-text-white))' }}>myidea.website</span>
                    </div>
                    <button 
                      className="p-2 rounded-full transition-colors duration-300"
                      style={{ backgroundColor: 'rgba(var(--domain-guide-white-opacity-20))', color: 'rgb(var(--domain-guide-text-white))' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(var(--domain-guide-white-opacity-30))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(var(--domain-guide-white-opacity-20))';
                      }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* myidea.shop */}
                  <div 
                    className="rounded-xl p-4 relative"
                    style={{
                      background: `linear-gradient(to bottom right, rgb(var(--domain-guide-green-400)), rgb(var(--domain-guide-teal-500)))`
                    }}
                  >
                    <div 
                      className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded"
                      style={{ backgroundColor: 'rgb(var(--domain-guide-green-300))', color: 'rgb(var(--domain-guide-green-900))' }}
                    >
                      20% OFF
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" style={{ color: 'rgb(var(--domain-guide-text-white))' }} />
                        <span className="font-bold text-sm" style={{ color: 'rgb(var(--domain-guide-text-white))' }}>myidea.shop</span>
                      </div>
                      <button 
                        className="p-2 rounded-full transition-colors duration-300"
                        style={{ backgroundColor: 'rgba(var(--domain-guide-white-opacity-20))', color: 'rgb(var(--domain-guide-text-white))' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(var(--domain-guide-white-opacity-30))';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(var(--domain-guide-white-opacity-20))';
                        }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* myidea.blog */}
                  <div 
                    className="rounded-xl p-4"
                    style={{
                      background: `linear-gradient(to bottom right, rgb(var(--domain-guide-green-400)), rgb(var(--domain-guide-teal-500)))`
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" style={{ color: 'rgb(var(--domain-guide-text-white))' }} />
                        <span className="font-bold text-sm" style={{ color: 'rgb(var(--domain-guide-text-white))' }}>myidea.blog</span>
                      </div>
                      <button 
                        className="p-2 rounded-full transition-colors duration-300"
                        style={{ backgroundColor: 'rgba(var(--domain-guide-white-opacity-20))', color: 'rgb(var(--domain-guide-text-white))' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(var(--domain-guide-white-opacity-30))';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(var(--domain-guide-white-opacity-20))';
                        }}
                      >
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
          <h2 className="text-[2.5rem] sm:text-[3.25rem] lg:text-6xl font-bold mb-20 sm:mb-24 md:mb-28 lg:mb-32" style={{ color: 'rgb(var(--domain-guide-text-white))' }}>
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
                    <IconComponent className="w-8 h-8" style={{ color: 'rgb(var(--domain-guide-text-white))' }} />
                  </div>
                  <h3 className="text-2xl sm:text-2xl font-bold mb-4" style={{ color: 'rgb(var(--domain-guide-text-white))' }}>
                    {feature.title}
                  </h3>
                  <p className="text-lg leading-relaxed whitespace-pre-line" style={{ color: 'rgb(var(--domain-guide-text-gray-400))' }}>
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
