"use client";

import { ShoppingCart, User } from "lucide-react";

const RightIcons = () => {
  const icons = [ShoppingCart, User];

  return (
    <div className="hidden sm:flex items-center space-x-3 sm:space-x-4">
      {icons.map((Icon, index) => (
        <button
          key={index}
          className="font-medium px-2.5 py-2 rounded-full text-[rgb(var(--navbar-right-icons-text))] hover:text-[rgb(var(--navbar-right-icons-hover-text))] hover:bg-[rgba(var(--navbar-right-icons-hover-bg))] transition-colors duration-200 flex items-center justify-center"
        >
          <Icon size={18} className="sm:w-5 sm:h-5" />
        </button>
      ))}
    </div>
  );
};

export default RightIcons;
