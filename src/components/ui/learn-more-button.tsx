"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type LearnMoreButtonProps = {
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
};

const LearnMoreButton = forwardRef<HTMLButtonElement, LearnMoreButtonProps>(
  ({ href, onClick, children = "Learn more", className = "" }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition duration-300 hover:translate-y-[-2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgba(var(--ui-learn-more-button-ring))] focus-visible:ring-offset-[rgb(var(--ui-learn-more-button-ring-offset))]";

    const buttonStyle = {
      backgroundColor: 'rgb(var(--ui-learn-more-button-bg))',
      color: 'rgb(var(--ui-learn-more-button-text))',
      boxShadow: '0 12px 28px rgba(var(--ui-learn-more-button-shadow))'
    } as React.CSSProperties;

    if (href) {
      return (
        <motion.div whileTap={{ scale: 0.96 }}>
          <Link 
            href={href} 
            className={`${baseClasses} ${className}`}
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 18px 36px rgba(var(--ui-learn-more-button-shadow-hover))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(var(--ui-learn-more-button-shadow))';
            }}
          >
            {children}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        onClick={onClick}
        className={`${baseClasses} ${className}`}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 18px 36px rgba(var(--ui-learn-more-button-shadow-hover))';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(var(--ui-learn-more-button-shadow))';
        }}
      >
        {children}
      </motion.button>
    );
  }
);

LearnMoreButton.displayName = "LearnMoreButton";

export default LearnMoreButton;


