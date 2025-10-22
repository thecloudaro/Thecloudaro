"use client";

import React from "react";

interface SectionHeadingProps {
  title: string;
  showLine?: boolean; // optional
  lineWidth?: string | number; // optional line width
}

export default function SectionHeading({
  title,
  showLine = true,
  lineWidth = "180px",
}: SectionHeadingProps) {
  // Agar number diya ho to px me convert kar de
  const normalizedWidth =
    typeof lineWidth === "number" ? `${lineWidth}px` : lineWidth;

  return (
    <div className="flex items-center mb-1 whitespace-nowrap overflow-hidden">
      <h3 className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">
        {title}
      </h3>
      {showLine && (
        <div
          className="h-[1px] bg-slate-700 ml-2 flex-shrink"
          style={{ width: normalizedWidth }}
        ></div>
      )}
    </div>
  );
}
