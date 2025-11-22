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
                      ? "bg-[hsl(var(--hero-button-active-bg))] text-[hsl(var(--hero-button-active-text))] shadow-sm hover:bg-[hsl(var(--hero-button-active-hover-bg))]"
                      : "text-[hsl(var(--hero-button-inactive-text))] hover:text-[hsl(var(--hero-button-inactive-hover-text))] hover:bg-[hsl(var(--hero-button-inactive-hover-bg))]"
                  }`}
    >
      {label}
    </button>
  );
}
