"use client";

import { Search } from "lucide-react";

interface TLDSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  containerClassName?: string;
  inputClassName?: string;
  bgColor?: string;
  borderColor?: string;
}

const TLDSearchBar = ({
  value,
  onChange,
  placeholder = "Search a TLD",
  containerClassName = "",
  inputClassName = "",
  bgColor,
  borderColor,
}: TLDSearchBarProps) => {
  return (
    <div 
      className={`flex items-center rounded-lg px-4 py-2 ${containerClassName}`} 
      style={{ 
        backgroundColor: bgColor,
        ...(borderColor && { border: `1px solid ${borderColor}` })
      }}
    >
      <Search className="w-3 h-3 mr-1.5 sm:mr-2 flex-shrink-0" style={{ color: 'rgb(var(--ui-tld-search-icon))' }} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`flex-1 bg-transparent text-hero-text placeholder-hero-text-muted text-sm sm:text-base focus:outline-none ${inputClassName}`}
      />
    </div>
  );
};

export default TLDSearchBar;

