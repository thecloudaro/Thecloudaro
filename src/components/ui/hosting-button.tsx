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
      button: "border",
      style: {
        backgroundColor: 'rgb(var(--hosting-bg-white))',
        color: 'rgb(var(--hosting-text-gray-800))',
        borderColor: 'rgb(var(--hosting-bg-gray-200))',
        borderWidth: '1px'
      },
      hoverStyle: {
        scale: 1.02,
        backgroundColor: 'rgb(var(--hosting-bg-gray-100))'
      }
    },
    white: {
      button: "border",
      style: {
        backgroundColor: 'rgb(var(--hosting-bg-white))',
        color: 'rgb(var(--hosting-text-black))',
        borderColor: 'rgb(var(--hosting-bg-gray-200))',
        borderWidth: '1px'
      },
      hoverStyle: {
        scale: 1.02,
        backgroundColor: 'rgb(var(--hosting-bg-gray-50))'
      }
    }
  };
  
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant].button} ${className}`;
  const buttonStyle = variantClasses[variant].style;

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          href={href}
          className={`${buttonClasses} hover:transition-colors`}
          style={buttonStyle}
          onMouseEnter={(e) => {
            if (variant === 'default') {
              e.currentTarget.style.backgroundColor = 'rgb(var(--hosting-bg-gray-100))';
            } else {
              e.currentTarget.style.backgroundColor = 'rgb(var(--hosting-bg-gray-50))';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(var(--hosting-bg-white))';
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
      className={`${buttonClasses} hover:transition-colors`}
      style={buttonStyle}
      onMouseEnter={(e) => {
        if (variant === 'default') {
          e.currentTarget.style.backgroundColor = 'rgb(var(--hosting-bg-gray-100))';
        } else {
          e.currentTarget.style.backgroundColor = 'rgb(var(--hosting-bg-gray-50))';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgb(var(--hosting-bg-white))';
      }}
    >
      {children}
    </motion.button>
  );
};

export default HostingButton;

