"use client";

import { FC } from "react";

interface ContentDescriptionProps {
  text: string;
  className?: string;
}

const ContentDescription: FC<ContentDescriptionProps> = ({ text, className = "" }) => {
  return (
    <p
      className={`text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed ${className}`}
    >
      {text}
    </p>
  );
};

export default ContentDescription;

