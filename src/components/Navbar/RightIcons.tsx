"use client";

import { Globe, ShoppingCart, User } from "lucide-react";

const RightIcons = () => {
  return (
    <div className="hidden sm:flex items-center space-x-1 sm:space-x-2">
      {[Globe, ShoppingCart, User].map((Icon, i) => (
        <button
          key={i}
          className="font-medium transition-all px-2 py-2 rounded-full"
          style={{ color: 'rgb(var(--navbar-right-icons-text))' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgb(var(--navbar-right-icons-hover-text))';
            e.currentTarget.style.backgroundColor = 'rgba(var(--navbar-right-icons-hover-bg))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgb(var(--navbar-right-icons-text))';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Icon size={16} className="sm:w-5 sm:h-5" />
        </button>
      ))}
    </div>
  );
};

export default RightIcons;
