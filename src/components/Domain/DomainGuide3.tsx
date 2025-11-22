"use client";

import { motion } from "framer-motion";
import { CheckCircle, ShoppingCart, MessageCircle } from "lucide-react";

const DomainGuide3 = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 min-h-screen flex items-center" style={{ backgroundColor: 'rgb(var(--domain-hero-section-bg))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ color: 'rgb(var(--hosting-text-white))' }}
          >
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              Check availability
            </h3>
            <p className="text-lg leading-relaxed" style={{ color: 'rgb(var(--domain-hero-text-gray-300))' }}>
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
            <div className="rounded-2xl p-6 relative overflow-hidden" style={{ backgroundColor: 'rgb(var(--domain-guide3-card-bg))' }}>
              {/* Green Glow Effect */}
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(var(--domain-guide3-glow-green))' }}></div>
              
              {/* Available Domain */}
              <div className="border rounded-xl p-4 mb-4 flex items-center justify-between" style={{ backgroundColor: 'rgba(var(--domain-guide3-available-bg))', borderColor: 'rgba(var(--domain-guide3-available-border))' }}>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'rgb(var(--domain-guide3-available-icon))' }} />
                  <span className="text-[rgb(var(--hosting-text-white))] font-medium">myidea.com is available</span>
                </div>
                <button 
                  className="p-2 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: 'rgb(var(--domain-guide3-button-blue-bg))', color: 'rgb(var(--hosting-text-white))' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide3-button-blue-hover))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide3-button-blue-bg))';
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>

              {/* Alternative Domains */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span style={{ color: 'rgb(var(--domain-hero-text-gray-300))' }}>myidea.ai</span>
                  <button 
                    className="p-2 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: 'rgb(var(--domain-guide3-button-blue-bg))', color: 'rgb(var(--hosting-text-white))' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide3-button-blue-hover))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide3-button-blue-bg))';
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span style={{ color: 'rgb(var(--domain-hero-text-gray-300))' }}>myidea.online</span>
                  <button 
                    className="p-2 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: 'rgb(var(--domain-guide3-button-blue-bg))', color: 'rgb(var(--hosting-text-white))' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide3-button-blue-hover))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide3-button-blue-bg))';
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span style={{ color: 'rgb(var(--domain-hero-text-gray-300))' }}>myidea.info</span>
                  <button 
                    className="p-2 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: 'rgb(var(--domain-guide3-button-blue-bg))', color: 'rgb(var(--hosting-text-white))' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide3-button-blue-hover))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(var(--domain-guide3-button-blue-bg))';
                    }}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DomainGuide3;
