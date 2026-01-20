"use client";

import React from "react";
import { Star, CheckCircle } from "lucide-react";

interface ReviewCardProps {
  name: string;
  date: string;
  review: string;
  rating: number;
  title?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  date,
  review,
  rating,
  title,
}) => {
  return (
    <div className="bg-review-card-bg text-review-card-text rounded-2xl p-4 w-[240px] h-[240px] flex-shrink-0 border border-review-card-border hover:border-review-card-border-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-review-card-shadow flex flex-col justify-between">
      {/* Top Content */}
      <div className="flex-1 overflow-hidden">
        {/* Rating + Verified */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-[2px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                fill={i < Math.round(rating) ? "hsl(var(--review-card-star-filled))" : "none"}
                stroke={i < Math.round(rating) ? "hsl(var(--review-card-star-filled))" : "hsl(var(--review-card-star-empty-stroke))"}
                className="w-3.5 h-3.5"
              />
            ))}
          </div>

          <div className="flex items-center text-review-card-text-muted text-[10px] space-x-1">
            <CheckCircle className="w-3 h-3 text-review-card-success" />
            <span>Verified</span>
          </div>
        </div>

        {/* Title (optional) */}
        {title && (
          <h3 className="text-[14px] font-semibold mb-1.5 leading-tight text-[hsl(var(--review-card-title-text))] line-clamp-1">
            {title}
          </h3>
        )}

        {/* Review Text */}
        <p className="text-[13px] text-[hsl(var(--review-card-review-text))] leading-snug line-clamp-4">
          {review}
        </p>
      </div>

      {/* Bottom Section (Author) */}
      <div className="text-[10px] text-review-card-text-muted pt-2 border-t border-review-card-border mt-auto">
        <span className="font-medium text-[hsl(var(--review-card-name-text))]">{name}</span> • {date}
      </div>
    </div>
  );
};

export default ReviewCard;
