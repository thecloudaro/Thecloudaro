'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeaderBannerProps {
  text?: string | React.ReactNode;
  backgroundColor?: string;
  href?: string;
}

const HeaderBanner = ({ 
  text = (
    <>
      Create your site using <span className="font-semibold">AI</span>, included with{' '}
      <span className="font-semibold">The Cloud Aro Web Hosting</span>
    </>
  ),
  backgroundColor,
  href = '/web-hosting',
}: HeaderBannerProps) => {
  const hasCustomBackground = Boolean(backgroundColor);

  const bannerContent = (
    <motion.div
      className={`text-center py-2 px-4 sm:px-6 text-xs sm:text-sm font-medium tracking-wide sticky top-0 z-[60] cursor-pointer ${
        hasCustomBackground ? '' : 'header-banner-animated-gradient'
      }`}
      style={{ 
        backgroundColor: hasCustomBackground ? backgroundColor : undefined,
        color: 'rgb(var(--header-banner-text))',
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
        {text}
        <ArrowRight className="inline-block w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
      </div>
    </motion.div>
  );

  // Make the entire top bar clickable to highlight latest offers
  if (href) {
    return (
      <Link href={href} className="block">
        {bannerContent}
      </Link>
    );
  }

  return bannerContent;
};

export default HeaderBanner;
