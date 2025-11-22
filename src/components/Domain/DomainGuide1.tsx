"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

const DomainGuide1 = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 min-h-screen flex items-center" style={{ backgroundColor: 'rgb(var(--domain-hero-section-bg))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* First Section - Domain Name Guide */}
        <div className="text-center mb-20">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[rgb(var(--hosting-text-white))] mb-6">
  Find a domain name that&apos;s
  <span className="hidden lg:block" /> right for you
</h2>

          <p className="text-xl" style={{ color: 'rgb(var(--domain-hero-text-gray-400))' }}>
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
            <div className="rounded-3xl p-8 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, rgb(var(--domain-guide1-gradient-from)), rgb(var(--domain-guide1-gradient-via)), rgb(var(--domain-guide1-gradient-to)))' }}>
              {/* Organic curved shapes */}
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-xl" style={{ backgroundColor: 'rgba(var(--domain-guide1-glow-teal-300))' }}></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(var(--domain-guide1-glow-green-500))' }}></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full blur-lg" style={{ backgroundColor: 'rgba(var(--domain-guide1-glow-teal-400))' }}></div>
              
              {/* Search Bar */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="rounded-2xl p-4 w-full max-w-md" style={{ backgroundColor: 'rgb(var(--domain-guide1-search-bg))' }}>
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="myidea.com"
                      className="flex-1 bg-transparent text-lg focus:outline-none placeholder:text-[rgb(var(--domain-guide1-search-placeholder))]"
                      style={{ 
                        color: 'rgb(var(--hosting-text-white))'
                      }}
                    />
                    <button 
                      className="p-3 rounded-full transition-colors duration-300"
                      style={{ 
                        backgroundColor: 'rgb(var(--domain-guide1-search-button-bg))',
                        color: 'rgb(var(--hosting-text-white))'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide1-search-button-hover))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide1-search-button-bg))';
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
            style={{ color: 'rgb(var(--hosting-text-white))' }}
          >
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              Keep it simple
            </h3>
            <p className="text-lg leading-relaxed" style={{ color: 'rgb(var(--domain-hero-text-gray-300))' }}>
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
