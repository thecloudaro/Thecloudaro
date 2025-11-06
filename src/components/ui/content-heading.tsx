"use client";

import { FC } from "react";

interface ContentHeadingProps {
  title: string;
  className?: string;
}

const ContentHeading: FC<ContentHeadingProps> = ({ title, className = "" }) => {
  return (
    <h2
      className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight font-sans ${className}`}
    >
      {title}
    </h2>
  );
};

export default ContentHeading;

