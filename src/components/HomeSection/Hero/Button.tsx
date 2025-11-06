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
                      ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
    >
      {label}
    </button>
  );
}
