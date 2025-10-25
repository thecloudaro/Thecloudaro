"use client";

import { Globe, ShoppingCart, User } from "lucide-react";

const RightIcons = () => {
  return (
    <div className="hidden sm:flex items-center space-x-1 sm:space-x-2">
      {[Globe, ShoppingCart, User].map((Icon, i) => (
        <button
          key={i}
          className="text-slate-200 hover:text-white font-medium transition-all hover:bg-gray-600/50 px-2 py-2 rounded-full"
        >
          <Icon size={16} className="sm:w-5 sm:h-5" />
        </button>
      ))}
    </div>
  );
};

export default RightIcons;
