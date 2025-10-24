"use client";

import { Globe, ShoppingCart, User } from "lucide-react";

const RightIcons = () => {
  return (
    <div className="hidden sm:flex items-center space-x-1 sm:space-x-2">
      {[Globe, ShoppingCart, User].map((Icon, i) => (
        <button
          key={i}
          className="text-white hover:text-white p-1.5 sm:p-2 hover:bg-gray-800/50 rounded-full transition-colors"
        >
          <Icon size={16} className="sm:w-5 sm:h-5" />
        </button>
      ))}
    </div>
  );
};

export default RightIcons;
