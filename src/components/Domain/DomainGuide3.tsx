"use client";

import { motion } from "framer-motion";
import { CheckCircle, ShoppingCart, MessageCircle } from "lucide-react";

const DomainGuide3 = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 min-h-screen flex items-center bg-[#191c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
      </div>
    </section>
  );
};

export default DomainGuide3;
