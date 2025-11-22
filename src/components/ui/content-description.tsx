"use client";

import React, { FC } from "react";

interface ContentDescriptionProps {
  text?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  children?: React.ReactNode;
}

const sizeClasses: Record<NonNullable<ContentDescriptionProps["size"]>, string> = {
  sm: "text-sm sm:text-base",
  md: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl md:text-2xl lg:text-2xl",
  xl: "text-xl sm:text-2xl md:text-3xl lg:text-3xl"
};

const ContentDescription: FC<ContentDescriptionProps> = ({
  text,
  className = "",
  size = "lg",
  children
}) => {
  const renderedContent = children
    ? children
    : typeof text === "string"
      ? text
          .split(/<br\s*\/?>/i)
          .map((line, index, arr) => (
            <React.Fragment key={index}>
              {line}
              {index !== arr.length - 1 && <br />}
            </React.Fragment>
          ))
      : text;

  return (
    <p
      className={`text-[rgb(var(--hosting-text-gray-300))] ${sizeClasses[size]} leading-relaxed ${className}`}
    >
      {renderedContent}
    </p>
  );
};

export default ContentDescription;

