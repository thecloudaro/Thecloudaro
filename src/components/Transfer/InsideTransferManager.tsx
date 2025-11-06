"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { ArrowUpDown, CheckCircle, Zap } from "lucide-react";

const InsideTransferManager = () => {
  const features = [
    {
      icon: ArrowUpDown,
      title: "Manage effortlessly",
      description: "Initiate transfers, move multiple domains, and minimize downtime.",
    },
    {
      icon: CheckCircle,
      title: "Stay on track",
      description: "Check DNS summary, auto-complete times, and use refined filtering.",
    },
    {
      icon: Zap,
      title: "Make moves faster",
      description: "Monitor and control every transfer with clarity and simplicity.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28" style={{ backgroundColor: '#1b1d1c' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        {/* Heading and Description */}
        <div className="mb-24 sm:mb-28 md:mb-32 lg:mb-36">
          <SectionHeading
            heading="Inside Transfer Manager"
            description="The only tool you need for smoother, smarter transfers."
            headingTag="h2"
            headingClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center"
            descriptionClassName="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-center"
          />
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mt-16 sm:mt-20 md:mt-24 lg:mt-28">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1 max-w-md mx-auto lg:mx-0">
            <div className="relative">
              {/* Gradient Glow Effect - Static (Always Visible) */}
              <div 
                className="absolute inset-0 rounded-xl blur-3xl -z-10"
                style={{
                  background: 'radial-gradient(circle at center, hsl(var(--gradient-teal)) 0%, hsl(var(--gradient-teal) / 0.3) 50%, transparent 80%)',
                  transform: 'scale(1.3)',
                  opacity: 0.7
                }}
              />
              
              {/* Bottom Left Corner Teal Glow - Static (Always Visible) */}
              <div 
                className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-3xl -z-10"
                style={{
                  background: 'radial-gradient(circle, hsl(var(--gradient-teal)) 0%, hsl(var(--gradient-teal) / 0.4) 40%, transparent 75%)',
                  transform: 'translate(-35%, 35%)',
                  boxShadow: '0 0 60px hsl(var(--gradient-teal) / 0.6), 0 0 100px hsl(var(--gradient-teal) / 0.4)',
                  opacity: 0.6
                }}
              />
              
              {/* Transfer Manager Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 sm:p-5 shadow-xl relative"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg p-2.5 mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowUpDown className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-white text-sm sm:text-base font-semibold">Transfer Manager</h3>
                </div>

                {/* Domains for transfer label */}
                <p className="text-teal-400 text-xs font-medium mb-3">Domains for transfer</p>

                {/* Domain Input Card */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full border-2 border-teal-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      </div>
                      <span className="text-white text-xs sm:text-sm">mydomain.com</span>
                    </div>
                    <span className="text-white font-semibold text-xs sm:text-sm">$7.99</span>
                  </div>

                  {/* Authorization code */}
                  <div className="mt-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <label className="text-white text-xs">Authorization code</label>
                      <div className="w-3.5 h-3.5 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-[8px] text-white">i</span>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        value="••••••••••"
                        readOnly
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-xs pr-8"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button className="mt-3 text-red-400 hover:text-red-300 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Floating Action Button */}
                <div className="flex justify-end">
                  <button className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center shadow-lg transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 space-y-6 md:space-y-7"
          >
            {features.map((feature, index) => {
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InsideTransferManager;

