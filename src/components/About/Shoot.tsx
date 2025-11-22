"use client";

import { motion } from "framer-motion";
import ContentHeading from "@/components/ui/content-heading";

const Shoot = () => {
  return (
    <section
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: 'rgb(var(--about-shoot-bg))' }}
    >
      {/* Abstract curved overlapping shapes - darker blue waves with curved gradient look */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Curved wave shape 1 - top left */}
        <div
          className="absolute top-0 left-0 w-[1200px] h-[800px]"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 25% 20%, rgba(var(--about-shoot-gradient-blue-900-50)) 0%, rgba(var(--about-shoot-gradient-blue-900-25)) 25%, rgba(var(--about-shoot-gradient-blue-900-15)) 50%, transparent 75%)`,
            filter: 'blur(80px)',
            transform: 'translate(-15%, -20%) rotate(-25deg)',
            borderRadius: '50%'
          }}
        />
        
        {/* Curved wave shape 2 - bottom right */}
        <div
          className="absolute bottom-0 right-0 w-[1000px] h-[700px]"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 75% 80%, rgba(var(--about-shoot-gradient-blue-900-45)) 0%, rgba(var(--about-shoot-gradient-blue-900-25)) 30%, rgba(var(--about-shoot-gradient-blue-900-12)) 55%, transparent 80%)`,
            filter: 'blur(90px)',
            transform: 'translate(20%, 25%) rotate(30deg)',
            borderRadius: '50%'
          }}
        />
        
        {/* Curved wave shape 3 - center left */}
        <div
          className="absolute top-1/2 left-0 w-[900px] h-[600px]"
          style={{
            background: `radial-gradient(ellipse 60% 70% at 15% 50%, rgba(var(--about-shoot-gradient-blue-900-40)) 0%, rgba(var(--about-shoot-gradient-blue-900-18)) 35%, transparent 70%)`,
            filter: 'blur(75px)',
            transform: 'translate(-10%, -50%) rotate(-10deg)',
            borderRadius: '50%'
          }}
        />
        
        {/* Curved wave shape 4 - center right */}
        <div
          className="absolute top-1/3 right-0 w-[800px] h-[500px]"
          style={{
            background: `radial-gradient(ellipse 65% 55% at 85% 40%, rgba(var(--about-shoot-gradient-blue-900-35)) 0%, rgba(var(--about-shoot-gradient-blue-900-18)) 40%, transparent 75%)`,
            filter: 'blur(85px)',
            transform: 'translate(15%, -30%) rotate(15deg)',
            borderRadius: '50%'
          }}
        />
        
        {/* Additional curved accent - bottom center */}
        <div
          className="absolute bottom-0 left-1/2 w-[700px] h-[400px]"
          style={{
            background: `radial-gradient(ellipse 50% 60% at 50% 80%, rgba(var(--about-shoot-gradient-blue-900-30)) 0%, rgba(var(--about-shoot-gradient-blue-900-15)) 45%, transparent 80%)`,
            filter: 'blur(70px)',
            transform: 'translate(-50%, 20%) rotate(5deg)',
            borderRadius: '50%'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 sm:mb-10 md:mb-12"
          >
            <ContentHeading
              title="Shoot for the stars, and<br/>launch your online future<br/>now."
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold leading-tight tracking-tight text-center !text-[rgb(var(--about-shoot-text))]"
            />
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full font-semibold text-xs sm:text-xs md:text-sm transition-all duration-300"
              style={{ 
                backgroundColor: 'rgb(var(--about-shoot-button-bg))',
                color: 'rgb(var(--about-shoot-button-text))'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(var(--about-shoot-button-bg-hover))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(var(--about-shoot-button-bg))';
              }}
            >
              Get on board
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Shoot;

