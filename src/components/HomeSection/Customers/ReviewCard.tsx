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
    <div className="bg-review-card-bg text-review-card-text rounded-2xl p-5 w-[320px] h-[250px] flex-shrink-0 border border-review-card-border hover:border-review-card-border-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-review-card-shadow flex flex-col justify-between">
      {/* Top Content */}
      <div>
        {/* Rating + Verified */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-[2px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                fill={i < Math.round(rating) ? "hsl(var(--review-card-star-filled))" : "none"}
                stroke={i < Math.round(rating) ? "hsl(var(--review-card-star-filled))" : "hsl(var(--review-card-star-empty-stroke))"}
                className="w-4 h-4"
              />
            ))}
          </div>

          <div className="flex items-center text-review-card-text-muted text-[11px] space-x-1">
            <CheckCircle className="w-3 h-3 text-review-card-success" />
            <span>Verified</span>
          </div>
        </div>

        {/* Title (optional) */}
        {title && (
          <h3 className="text-[16px] font-semibold mb-1 leading-tight text-[hsl(var(--review-card-title-text))] line-clamp-1">
            {title}
          </h3>
        )}

        {/* Review Text */}
        <p className="text-[14px] text-[hsl(var(--review-card-review-text))] leading-snug line-clamp-4">
          {review}
        </p>
      </div>

      {/* Bottom Section (Author) */}
      <div className="text-[11px] text-review-card-text-muted pt-1 border-t border-review-card-border mt-2">
        <span className="font-medium text-[hsl(var(--review-card-name-text))]">{name}</span> • {date}
      </div>
    </div>
  );
};

export default ReviewCard;
