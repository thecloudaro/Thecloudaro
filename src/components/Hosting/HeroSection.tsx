'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import HostingButton from '@/components/ui/hosting-button';

interface HostingHeroSectionProps {
  onChoosePlanClick: () => void;
}

const HostingHeroSection = ({ onChoosePlanClick }: HostingHeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ boxShadow: 'none', zIndex: 1 }}>
      {/* Background Gradient - Soft teal in top-right corner, blending into deep gray */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 100% 70% at top right, rgba(var(--hosting-gradient-teal-rgba), 0.5) 0%, rgba(var(--hosting-gradient-teal-rgba), 0.3) 15%, rgba(var(--hosting-gradient-teal-rgba), 0.1) 30%, rgba(var(--hosting-gradient-teal-rgba), 0.03) 50%, transparent 70%, rgb(var(--hosting-bg)) 100%)`
        }}
      />
      
      {/* Left Content - Text */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-screen py-12 sm:py-16 md:py-20 lg:py-0">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6 pl-0 lg:pl-0 xl:pl-0"
          >
            {/* Main Heading */}
            <SectionHeading
              heading="Web Hosting"
              headingTag="h1"
              headingClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5.5rem] font-bold leading-tight tracking-tight"
              headingStyle={{ color: 'rgb(var(--hosting-text-white))' }}
              containerClassName="text-left"
            />

            {/* Description */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-2xl mt-4 sm:mt-6" style={{ color: 'rgb(var(--hosting-text-white))' }}>
              Speed, security, stability... powerfully simple shared<br />hosting that&apos;s ready to go.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <HostingButton variant="default" size="md" onClick={onChoosePlanClick}>
                Choose a plan
              </HostingButton>
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative w-full h-[400px] lg:h-full flex items-center justify-center lg:justify-end pr-0 lg:pr-0 xl:pr-0"
          >
            <div className="relative w-full max-w-md lg:max-w-2xl xl:max-w-3xl h-full flex items-center justify-center">
              <motion.img
                src="/Hosting/hostingHero.svg"
                alt="Web Hosting"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full h-full object-contain max-w-full max-h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HostingHeroSection;

