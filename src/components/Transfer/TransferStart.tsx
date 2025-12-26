"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const TransferStart = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-transfer-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Two-Column Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left Column - Arrow Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center items-center min-h-[300px] lg:min-h-[400px]"
          >
            {/* Subtle radiating glow behind */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 100% 80% at 70% 30%, hsl(var(--gradient-teal) / 0.3) 0%, transparent 60%)',
                filter: 'blur(40px)'
              }}
            />
            
            {/* Dashed line segment (diagonal) */}
            <motion.div
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute top-20 right-16 lg:top-24 lg:right-20"
            >
              <svg width="80" height="80" viewBox="0 0 80 80" className="transform -rotate-45">
                <line
                  x1="10"
                  y1="40"
                  x2="70"
                  y2="40"
                  stroke="hsl(var(--gradient-teal))"
                  strokeWidth="3"
                  strokeDasharray="8 4"
                  opacity="0.8"
                  style={{
                    filter: 'drop-shadow(0 0 8px hsl(var(--gradient-teal)))'
                  }}
                />
              </svg>
            </motion.div>

            {/* Large downward-pointing arrow */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative z-10"
              style={{
                filter: 'drop-shadow(0 0 30px hsl(var(--gradient-teal) / 0.8)) drop-shadow(0 0 60px hsl(var(--gradient-teal) / 0.5))'
              }}
            >
              <ArrowDown 
                className="w-32 h-32 lg:w-40 lg:h-40"
                style={{
                  color: 'hsl(var(--gradient-teal))',
                  filter: 'brightness(1.2)'
                }}
                strokeWidth="3"
              />
            </motion.div>

            {/* Additional glow rays effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-0 right-0 w-32 h-32"
                style={{
                  background: 'conic-gradient(from 45deg, transparent, hsl(var(--gradient-teal) / 0.2), transparent)',
                  filter: 'blur(20px)',
                  transform: 'translate(20%, -20%)'
                }}
              />
            </div>
          </motion.div>

          {/* Right Column - Text Content (using reusable structure) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-left"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 whitespace-nowrap text-transfer-start-heading">
              Start your transfer
            </h3>
            <div className="space-y-3">
              <p className="text-xl sm:text-2xl leading-relaxed text-transfer-start-description">
                Use the search bar to find your domain.
              </p>
              <p className="text-xl sm:text-2xl leading-relaxed text-transfer-start-description">
                Enter your auth code and check out.
              </p>
              <p className="text-xl sm:text-2xl leading-relaxed text-transfer-start-description">
                Normally, transfers autocomplete in 30 minutes, but no longer than 5 days max.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransferStart;

