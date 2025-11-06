"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface HostingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg";
}

const HostingButton = ({ 
  children, 
  onClick, 
  href, 
  className = "",
  variant = "white",
  size = "md"
}: HostingButtonProps) => {
  
  // Base classes
  const baseClasses = "font-medium rounded-full transition-all duration-200 shadow-md";
  
  // Size classes
  const sizeClasses = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg"
  };
  
  // Variant classes
  const variantClasses = {
    default: {
      button: "bg-white text-gray-800 border border-gray-200 hover:bg-gray-100",
      style: {
        backgroundColor: 'rgb(var(--hosting-bg-white))',
        color: 'rgb(var(--hosting-text-gray-800))',
        borderColor: 'rgb(var(--hosting-bg-gray-200))',
        borderWidth: '1px'
      }
    },
    white: {
      button: "bg-white text-black hover:bg-gray-50 border border-gray-200",
      style: {}
    }
  };
  
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant].button} ${className}`;
  const buttonStyle = variant === "default" ? variantClasses[variant].style : {};
  
  const hoverStyle = variant === "default" 
    ? { scale: 1.02, backgroundColor: 'rgb(var(--hosting-bg-gray-100))' }
    : { scale: 1.02 };

  if (href) {
    return (
      <motion.div whileHover={hoverStyle} whileTap={{ scale: 0.98 }}>
        <Link
          href={href}
          className={buttonClasses}
          style={buttonStyle}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={hoverStyle}
      whileTap={{ scale: 0.98 }}
      className={buttonClasses}
      style={buttonStyle}
    >
      {children}
    </motion.button>
  );
};

export default HostingButton;

