'use client';

import React from 'react';
import cn from 'clsx';

interface ButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, isActive = false, onClick }) => {
  const buttonClasses = cn(
    "px-4 py-2 rounded-full font-medium text-sm transition-all duration-300",
    {
      'bg-transfer-hero-button-active text-transfer-hero-button-active shadow-lg': isActive,
      'hover:bg-transfer-hero-button-inactive': !isActive,
    }
  );

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
    >
      {label}
    </button>
  );
};

export default Button;
