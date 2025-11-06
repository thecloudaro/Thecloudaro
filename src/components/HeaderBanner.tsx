'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeaderBannerProps {
  text?: string | React.ReactNode;
  backgroundColor?: string;
}

const HeaderBanner = ({ 
  text = (
    <>
      Create your site using <span className="font-semibold">AI</span>, included with{' '}
      <span className="font-semibold">Spaceship Web Hosting</span>
    </>
  ),
  backgroundColor = '#001b55'
}: HeaderBannerProps) => {
  return (
    <motion.div
      className="text-white text-center py-2 text-sm font-medium tracking-wide"
      style={{ backgroundColor, boxShadow: 'none' }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {text}
      {' '}
      <ArrowRight className="inline-block w-4 h-4 ml-1" />
    </motion.div>
  );
};

export default HeaderBanner;
