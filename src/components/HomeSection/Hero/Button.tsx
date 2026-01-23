"use client";
import React from "react";

interface ButtonProps {
  label: string;           
  isActive?: boolean;       
  onClick?: () => void;     
}

export default function Button({ label, isActive, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 sm:px-3.5 md:px-4 
                  py-1 sm:py-1.5 md:py-1.5 
                  rounded-full 
                  text-[11px] sm:text-xs md:text-sm 
                  font-medium transition-colors duration-200
                  ${
                    isActive
                      ? "text-white shadow-sm"
                      : "text-[hsl(var(--hero-button-inactive-text))] hover:text-[hsl(var(--hero-button-inactive-hover-text))] hover:bg-[hsl(var(--hero-button-inactive-hover-bg))]"
                  }`}
      style={isActive ? {
        backgroundImage: `linear-gradient(90deg, hsl(var(--header-banner-gradient-1)), hsl(var(--header-banner-gradient-2)), hsl(var(--header-banner-gradient-3)), hsl(var(--header-banner-gradient-4)), hsl(var(--header-banner-gradient-5)))`,
        backgroundSize: '100% 100%',
      } : undefined}
    >
      {label}
    </button>
  );
}
