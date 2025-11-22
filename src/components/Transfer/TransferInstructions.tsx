"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";

const TransferInstructions = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28" style={{ backgroundColor: 'rgb(var(--transfer-instructions-bg))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        {/* Heading and Description */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <SectionHeading
            heading="How to transfer"
            description="What you need for domain migration."
            headingTag="h2"
            headingClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-center !text-[rgb(var(--transfer-instructions-heading))]"
            descriptionClassName="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-center !text-[rgb(var(--transfer-instructions-description))]"
          />
        </div>

        {/* Two-Column Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center justify-center">
          {/* Left Column - 3D-style rounded teal gradient card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            {/* Glow effect behind card */}
            <div
              className="absolute inset-0 rounded-2xl blur-2xl opacity-40"
              style={{
                background: 'radial-gradient(circle, hsl(var(--gradient-teal)) 0%, transparent 70%)',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%) scale(1.3)'
              }}
            />
            
             {/* 3D-style rounded teal gradient card - Square (same as reference) */}
             <div
               className="relative rounded-2xl p-5 sm:p-6 md:p-8 w-full aspect-square max-w-[240px]"
               style={{
                 background: 'linear-gradient(135deg, hsl(var(--gradient-teal)) 0%, hsl(var(--gradient-dark-teal)) 100%)',
                 boxShadow: `0 0 50px hsl(var(--gradient-teal) / 0.7), 0 0 30px hsl(var(--gradient-teal) / 0.5), inset 0 0 40px hsl(var(--gradient-teal) / 0.4), 0 4px 20px rgba(var(--transfer-instructions-shadow))`,
                 transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                 border: '1px solid hsl(var(--gradient-teal) / 0.5)'
               }}
             >
               {/* Glowing inner box */}
               <div
                 className="rounded-xl p-5 sm:p-6 backdrop-blur-sm border-2 h-full flex items-center justify-center"
                 style={{
                   backgroundColor: 'rgba(var(--transfer-instructions-inner-box-bg))',
                   borderColor: 'rgba(var(--transfer-instructions-inner-box-border))',
                   boxShadow: `0 0 25px hsl(var(--gradient-teal) / 0.6), inset 0 0 20px hsl(var(--gradient-teal) / 0.3), inset 0 0 40px rgba(var(--transfer-instructions-shadow))`
                 }}
               >
                 {/* Asterisks (***) */}
                 <div className="text-center">
                   <span className="text-3xl sm:text-4xl md:text-5xl font-mono tracking-wider !text-[rgb(var(--transfer-instructions-asterisks))]">
                     ***
                   </span>
                 </div>
               </div>
             </div>
          </motion.div>

          {/* Right Column - Instructional Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-left"
          >
             <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 whitespace-nowrap !text-[rgb(var(--transfer-instructions-heading))]">
               Get your authorization code
             </h3>
             <p className="text-xl sm:text-2xl leading-relaxed whitespace-pre-line !text-[rgb(var(--transfer-instructions-description))]">
               <span className="whitespace-nowrap">First, you need an authorization code (also</span><br /><span className="whitespace-nowrap">
                 known as an EPP, auth code, or transfer</span><br /><span className="whitespace-nowrap">
                   code).You can find it with your existing </span><br /><span className="whitespace-nowrap">registrar.</span>
             </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransferInstructions;

