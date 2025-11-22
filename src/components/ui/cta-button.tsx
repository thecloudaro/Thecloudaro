"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const CTAButton = ({ children, onClick, href, className = "" }: CTAButtonProps) => {
  const buttonClasses = `px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-sm border ${className}`;
  
  const buttonStyle = {
    backgroundColor: 'rgb(var(--ui-cta-button-bg))',
    color: 'rgb(var(--ui-cta-button-text))',
    borderColor: 'rgb(var(--ui-cta-button-border))'
  } as React.CSSProperties;

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          href={href}
          className={buttonClasses}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(var(--ui-cta-button-hover))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(var(--ui-cta-button-bg))';
          }}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={buttonClasses}
      style={buttonStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgb(var(--ui-cta-button-hover))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgb(var(--ui-cta-button-bg))';
      }}
    >
      {children}
    </motion.button>
  );
};

export default CTAButton;

