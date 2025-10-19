'use client';

import React from 'react';
import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';

interface SectionProps {
  heading: string;
  text: string;
  bgImage?: string;
}

const DynamicSection: React.FC<SectionProps> = ({ heading, text, bgImage = '/BgPics/black.jpg' }) => {
  const { scrollY } = useViewportScroll();

  // Background zoom + fade
  const rawBgScale = useTransform(scrollY, [0, 500], [1.2, 1]);
  const rawBgOpacity = useTransform(scrollY, [0, 500], [0, 1]);
  const bgScale = useSpring(rawBgScale, { stiffness: 80, damping: 20 });
  const bgOpacity = useSpring(rawBgOpacity, { stiffness: 80, damping: 20 });

  // Bottom fade shadow
  const rawBottomShadow = useTransform(scrollY, [0, 400], [0, 1]);
  const bottomShadowOpacity = useSpring(rawBottomShadow, { stiffness: 80, damping: 20 });

  // Content animation
  const rawContentY = useTransform(scrollY, [0, 500], [60, 0]);
  const rawContentOpacity = useTransform(scrollY, [0, 500], [0, 1]);
  const contentY = useSpring(rawContentY, { stiffness: 80, damping: 20 });
  const contentOpacity = useSpring(rawContentOpacity, { stiffness: 80, damping: 20 });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg transition-colors duration-500">
      {/* Background image */}
      <motion.img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ scale: bgScale, opacity: bgOpacity }}
        loading="lazy"
      />

      {/* Bottom gradient shadow */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent z-20 pointer-events-none"
        style={{ opacity: bottomShadowOpacity }}
      />

      {/* Content */}
      <motion.div
        className="relative z-30 text-center text-text px-4 sm:px-8 max-w-xl sm:max-w-2xl transition-colors duration-500"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-primary">
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
