"use client";

import { motion } from "framer-motion";
import { CheckCircle, ShoppingCart } from "lucide-react";

const DomainGuide4 = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 min-h-screen flex items-center" style={{ backgroundColor: 'rgb(var(--domain-hero-section-bg))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Domain Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-2xl p-6 relative" style={{ backgroundColor: 'rgb(var(--domain-guide4-card-bg))' }}>
              {/* Domain Cards */}
              <div className="space-y-4">
                {/* myidea.website */}
                <div className="rounded-xl p-4 relative" style={{ background: 'linear-gradient(to bottom right, rgb(var(--domain-guide4-gradient-from)), rgb(var(--domain-guide4-gradient-to)))' }}>
                  <div className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: 'rgb(var(--domain-guide4-badge-bg))', color: 'rgb(var(--domain-guide4-badge-text))' }}>
                    20% OFF
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-[rgb(var(--hosting-text-white))] mr-2" />
                      <span className="text-[rgb(var(--hosting-text-white))] font-bold">myidea.website</span>
                    </div>
                    <button 
                      className="p-2 rounded-full transition-colors duration-300"
                      style={{ backgroundColor: 'rgba(var(--domain-guide4-button-bg))', color: 'rgb(var(--hosting-text-white))' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(var(--domain-guide4-button-hover))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(var(--domain-guide4-button-bg))';
                      }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* myidea.shop */}
                  <div className="rounded-xl p-4 relative" style={{ background: 'linear-gradient(to bottom right, rgb(var(--domain-guide4-gradient-from)), rgb(var(--domain-guide4-gradient-to)))' }}>
                    <div className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: 'rgb(var(--domain-guide4-badge-bg))', color: 'rgb(var(--domain-guide4-badge-text))' }}>
                      20% OFF
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-[rgb(var(--hosting-text-white))] mr-2" />
                        <span className="text-[rgb(var(--hosting-text-white))] font-bold text-sm">myidea.shop</span>
                      </div>
                      <button 
                        className="p-2 rounded-full transition-colors duration-300"
                        style={{ backgroundColor: 'rgba(var(--domain-guide4-button-bg))', color: 'rgb(var(--hosting-text-white))' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(var(--domain-guide4-button-hover))';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(var(--domain-guide4-button-bg))';
                        }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* myidea.blog */}
                  <div className="rounded-xl p-4" style={{ background: 'linear-gradient(to bottom right, rgb(var(--domain-guide4-gradient-from)), rgb(var(--domain-guide4-gradient-to)))' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-[rgb(var(--hosting-text-white))] mr-2" />
                        <span className="text-[rgb(var(--hosting-text-white))] font-bold text-sm">myidea.blog</span>
                      </div>
                      <button 
                        className="p-2 rounded-full transition-colors duration-300"
                        style={{ backgroundColor: 'rgba(var(--domain-guide4-button-bg))', color: 'rgb(var(--hosting-text-white))' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(var(--domain-guide4-button-hover))';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(var(--domain-guide4-button-bg))';
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
            style={{ color: 'rgb(var(--hosting-text-white))' }}
          >
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              Protect your future
            </h3>
            <p className="text-lg leading-relaxed" style={{ color: 'rgb(var(--domain-hero-text-gray-300))' }}>
              Aim for a timeless and powerfully brandable domain name. 
              Avoid on-trend words and buy a domain that allows your business to grow.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DomainGuide4;
