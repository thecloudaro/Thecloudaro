"use client";

import { motion } from "framer-motion";
import ContentHeading from "@/components/ui/content-heading";

const AboutHero = () => {

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Simple Background Color */}
      <div 
        className="absolute inset-0 bg-customer-bg"
      />

      {/* Abstract Swirling Blue/Teal Graphic - Radial Gradients with Blur */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Large swirling blue/teal gradient - main center effect */}
        <div 
          className="absolute top-1/2 left-1/2 w-[1200px] h-[1000px]"
          style={{
            background: `radial-gradient(ellipse at center, rgba(var(--about-hero-gradient-blue-500-25)) 0%, rgba(var(--about-hero-gradient-cyan-500-20)) 20%, rgba(var(--about-hero-gradient-sky-500-15)) 40%, rgba(var(--about-hero-gradient-blue-500-10)) 60%, transparent 80%)`,
            filter: 'blur(120px)',
            transform: 'translate(-50%, -50%) rotate(-25deg)'
          }}
        />
        
        {/* Upper right swirling arc */}
        <div 
          className="absolute top-0 right-0 w-[900px] h-[700px]"
          style={{
            background: `radial-gradient(ellipse at 70% 30%, rgba(var(--about-hero-gradient-cyan-500-22)) 0%, rgba(var(--about-hero-gradient-blue-500-18)) 25%, rgba(var(--about-hero-gradient-sky-500-12)) 50%, transparent 75%)`,
            filter: 'blur(100px)',
            transform: 'translate(15%, -15%) rotate(15deg)'
          }}
        />
        
        {/* Upper left teal gradient */}
        <div 
          className="absolute top-0 left-0 w-[800px] h-[600px]"
          style={{
            background: `radial-gradient(ellipse at 30% 25%, rgba(var(--about-hero-gradient-sky-500-20)) 0%, rgba(var(--about-hero-gradient-cyan-500-15)) 30%, rgba(var(--about-hero-gradient-blue-500-10)) 55%, transparent 80%)`,
            filter: 'blur(110px)',
            transform: 'translate(-20%, -20%) rotate(-10deg)'
          }}
        />
        
        {/* Additional concentric arcs for depth */}
        <div 
          className="absolute top-[15%] right-[25%] w-[700px] h-[600px]"
          style={{
            background: `radial-gradient(circle, rgba(var(--about-hero-gradient-blue-500-18)) 0%, rgba(var(--about-hero-gradient-cyan-500-12)) 35%, transparent 70%)`,
            filter: 'blur(130px)',
            transform: 'rotate(30deg)'
          }}
        />
        
        {/* Lower center accent */}
        <div 
          className="absolute bottom-[20%] left-1/2 w-[600px] h-[500px]"
          style={{
            background: `radial-gradient(ellipse, rgba(var(--about-hero-gradient-cyan-500-15)) 0%, rgba(var(--about-hero-gradient-blue-500-10)) 40%, transparent 75%)`,
            filter: 'blur(100px)',
            transform: 'translate(-50%, 0) rotate(-20deg)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-24 sm:py-28 md:py-32 lg:py-36">
        <div className="flex flex-col items-center text-center">
          {/* Heading - Large white text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 sm:mb-8"
          >
            <ContentHeading
              title="Launching digital<br/>futures further, faster"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold leading-tight tracking-tight"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;

