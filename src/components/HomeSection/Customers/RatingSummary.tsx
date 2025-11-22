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
    <div className="flex flex-col items-start space-y-4 text-[hsl(var(--rating-summary-text))]">
      <p className="text-xl font-semibold">{label}</p>

      {/* Stars */}
      <div className="flex space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            fill={i < Math.round(rating) ? "hsl(var(--rating-summary-star-filled))" : "hsl(var(--rating-summary-star-empty))"}
            stroke="none"
            className="w-8 h-8"
          />
        ))}
      </div>

      <p className="text-sm text-[hsl(var(--rating-summary-text-muted))]">
        Showing our favorite reviews
      </p>
      
      <p className="text-sm text-[hsl(var(--rating-summary-text-muted))]">
        Based on <span className="underline cursor-pointer hover:text-[hsl(var(--rating-summary-text-hover))]">{totalReviews} reviews</span>
      </p>

      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="hsl(var(--rating-summary-star-filled))" viewBox="0 0 24 24">
          <path d="M12 .288l2.833 8.718h9.167l-7.416 5.389 2.833 8.718L12 17.424l-7.417 5.689L7.416 14.395 0 9.006h9.167z"/>
        </svg>
        <span className="text-sm font-semibold text-[hsl(var(--rating-summary-text))]">Trustpilot</span>
      </div>
    </div>
  );
};

export default RatingSummary;
