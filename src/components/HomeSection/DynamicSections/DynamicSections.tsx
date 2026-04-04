'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRevealOnceInView } from '@/hooks/useRevealOnceInView';

interface SectionProps {
  heading: string;
  text: string;
  bgImage?: string;
}

const DynamicSection: React.FC<SectionProps> = ({ heading, text, bgImage = '/BgPics/black.jpg' }) => {
  const { ref, revealed } = useRevealOnceInView({ amount: 0.2, margin: '-8% 0px' });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[hsl(var(--dynamic-section-bg))] transition-colors duration-500"
    >
      <motion.img
        src={bgImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        loading="lazy"
        initial={false}
        animate={
          revealed
            ? { scale: 1, opacity: 1 }
            : { scale: 1.06, opacity: 0.88 }
        }
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[hsl(var(--dynamic-section-bg))] to-transparent z-20 pointer-events-none"
        initial={false}
        animate={revealed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      />

      <motion.div
        className="relative z-30 text-center text-[hsl(var(--dynamic-section-text))] px-4 sm:px-8 max-w-xl sm:max-w-2xl transition-colors duration-500"
        initial={false}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.65, ease: 'easeOut', delay: 0.08 }}
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[hsl(var(--dynamic-section-heading))]">
          {heading}
        </h1>
        <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-xl">
          {text}
        </p>
      </motion.div>
    </section>
  );
};

export default DynamicSection;
