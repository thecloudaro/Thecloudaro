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
      className="px-4 py-2 rounded-full font-medium text-sm transition-all duration-300"
      style={{
        backgroundColor: isActive ? 'rgb(var(--transfer-hero-button-active-bg))' : 'transparent',
        color: isActive ? 'rgb(var(--transfer-hero-button-active-text))' : undefined,
        boxShadow: isActive ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : undefined
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'rgba(var(--transfer-hero-button-inactive-hover-bg))';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      {label}
    </button>
  );
};

export default Button;
