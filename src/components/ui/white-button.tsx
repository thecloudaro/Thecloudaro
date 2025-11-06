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
  const buttonClasses = `bg-white text-gray-800 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-gray-100 ${className}`;

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={buttonClasses}
    >
      {children}
    </motion.button>
  );
};

export default WhiteButton;

