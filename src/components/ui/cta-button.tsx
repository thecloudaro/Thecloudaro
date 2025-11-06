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
  const buttonClasses = `bg-white text-black px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-gray-50 shadow-sm border border-gray-200 ${className}`;

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          href={href}
          className={buttonClasses}
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
    >
      {children}
    </motion.button>
  );
};

export default CTAButton;

