"use client";

import { motion } from "framer-motion";

const TransferUnlock = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28" style={{ backgroundColor: 'rgb(var(--transfer-unlock-bg))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Two-Column Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 whitespace-nowrap !text-[rgb(var(--transfer-unlock-heading))]">
              Unlock your domains
            </h3>
            <p className="text-xl sm:text-2xl leading-relaxed !text-[rgb(var(--transfer-unlock-description))]">
              You may need to disable the registrar lock with your current registrar. Head there to check before transferring.
            </p>
          </motion.div>

          {/* Right Column - Glowing 3D Teal Circular Abstract Design */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center items-center min-h-[400px] lg:min-h-[500px]"
          >
            {/* Outer swirling forms - Layer 3 */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-80 h-80 lg:w-96 lg:h-96"
            >
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <path
                  d="M200,200 Q250,150 300,200 T400,200 Q350,250 300,200 T200,200 Q150,150 100,200 T0,200 Q50,250 100,200 T200,200"
                  fill="none"
                  stroke="hsl(var(--gradient-teal))"
                  strokeWidth="2"
                  opacity="0.4"
                  className="blur-sm"
                />
              </svg>
            </motion.div>

            {/* Middle swirling forms - Layer 2 */}
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 h-64 lg:w-80 lg:h-80"
            >
              <div
                className="w-full h-full rounded-full border-2"
                style={{
                  borderColor: 'hsl(var(--gradient-teal) / 0.5)',
                  boxShadow: '0 0 60px hsl(var(--gradient-teal) / 0.4), inset 0 0 40px hsl(var(--gradient-teal) / 0.2)'
                }}
              />
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
                style={{
                  background: 'radial-gradient(circle, hsl(var(--gradient-teal) / 0.6) 0%, transparent 70%)',
                  filter: 'blur(20px)'
                }}
              />
            </motion.div>

            {/* Central luminous orb - Layer 1 */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              {/* Outer glow */}
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background: 'radial-gradient(circle, hsl(var(--gradient-teal)) 0%, hsl(var(--gradient-dark-teal)) 50%, transparent 80%)',
                  width: '200%',
                  height: '200%',
                  left: '-50%',
                  top: '-50%',
                  opacity: 0.6
                }}
              />
              
              {/* Main orb */}
              <div
                className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, hsl(var(--gradient-bright-green)), hsl(var(--gradient-teal)), hsl(var(--gradient-dark-teal)))',
                  boxShadow: '0 0 80px hsl(var(--gradient-teal) / 0.9), 0 0 40px hsl(var(--gradient-teal) / 0.7), inset 0 0 30px hsl(var(--gradient-bright-green) / 0.5)'
                }}
              />
              
              {/* Inner highlight */}
              <div
                className="absolute top-1/4 left-1/4 w-12 h-12 lg:w-16 lg:h-16 rounded-full"
                style={{
                  background: `radial-gradient(circle, rgba(var(--transfer-unlock-inner-highlight)) 0%, transparent 70%)`,
                  filter: 'blur(8px)'
                }}
              />
            </motion.div>

            {/* Additional swirling elements */}
            <motion.div
              animate={{ rotate: [0, -360], scale: [1, 1.2, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-72 h-72 lg:w-88 lg:h-88"
            >
              <div
                className="absolute top-0 left-1/2 w-24 h-24 rounded-full"
                style={{
                  background: 'radial-gradient(circle, hsl(var(--gradient-teal) / 0.5) 0%, transparent 70%)',
                  filter: 'blur(15px)',
                  transform: 'translateX(-50%)'
                }}
              />
              <div
                className="absolute bottom-0 left-1/2 w-24 h-24 rounded-full"
                style={{
                  background: 'radial-gradient(circle, hsl(var(--gradient-dark-teal) / 0.5) 0%, transparent 70%)',
                  filter: 'blur(15px)',
                  transform: 'translateX(-50%)'
                }}
              />
              <div
                className="absolute left-0 top-1/2 w-20 h-20 rounded-full"
                style={{
                  background: 'radial-gradient(circle, hsl(var(--gradient-teal) / 0.4) 0%, transparent 70%)',
                  filter: 'blur(12px)',
                  transform: 'translateY(-50%)'
                }}
              />
              <div
                className="absolute right-0 top-1/2 w-20 h-20 rounded-full"
                style={{
                  background: 'radial-gradient(circle, hsl(var(--gradient-dark-teal) / 0.4) 0%, transparent 70%)',
                  filter: 'blur(12px)',
                  transform: 'translateY(-50%)'
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransferUnlock;

