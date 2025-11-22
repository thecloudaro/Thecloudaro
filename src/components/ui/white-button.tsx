"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface WhiteButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const WhiteButton = ({ children, onClick, href, className = "" }: WhiteButtonProps) => {
  const buttonClasses = `px-8 py-4 rounded-full font-semibold transition-all duration-300 ${className}`;
  
  const buttonStyle = {
    backgroundColor: 'rgb(var(--ui-white-button-bg))',
    color: 'rgb(var(--ui-white-button-text))'
  } as React.CSSProperties;

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          href={href}
          className={buttonClasses}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(var(--ui-white-button-hover))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(var(--ui-white-button-bg))';
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={buttonClasses}
      style={buttonStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgb(var(--ui-white-button-hover))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgb(var(--ui-white-button-bg))';
      }}
    >
      {children}
    </motion.button>
  );
};

export default WhiteButton;

