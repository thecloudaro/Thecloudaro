'use client';

import { motion } from 'framer-motion';

const HeaderBanner = () => {
  return (
    <motion.div
      className="bg-[#001F3F] text-white text-center py-2 text-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      Create your site using AI, included with Spaceship Web Hosting →
    </motion.div>
  );
};

export default HeaderBanner;
