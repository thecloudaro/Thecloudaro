'use client';

import React from 'react';

interface ButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, isActive = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-hero-text-muted hover:text-hero-text hover:bg-white/10'
      }`}
    >
      {label}
    </button>
  );
};

export default Button;
