"use client";

import React from "react";
import { Star } from "lucide-react";

interface RatingSummaryProps {
  rating: number;
  totalReviews: number;
  label?: string;
}

const RatingSummary: React.FC<RatingSummaryProps> = ({ rating, totalReviews, label = "Excellent" }) => {
  return (
    <div className="flex flex-col items-start space-y-4 text-white">
      <p className="text-xl font-semibold">{label}</p>

      {/* Stars */}
      <div className="flex space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            fill={i < Math.round(rating) ? "#00B67A" : "#1A1A1A"}
            stroke="none"
            className="w-8 h-8"
          />
        ))}
      </div>

      <p className="text-sm text-gray-400">
        Showing our favorite reviews
      </p>
      
      <p className="text-sm text-gray-400">
        Based on <span className="underline cursor-pointer hover:text-gray-300">{totalReviews} reviews</span>
      </p>

      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#00B67A" viewBox="0 0 24 24">
          <path d="M12 .288l2.833 8.718h9.167l-7.416 5.389 2.833 8.718L12 17.424l-7.417 5.689L7.416 14.395 0 9.006h9.167z"/>
        </svg>
        <span className="text-sm font-semibold text-white">Trustpilot</span>
      </div>
    </div>
  );
};

export default RatingSummary;
