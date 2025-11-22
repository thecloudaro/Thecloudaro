"use client";

import { FC } from "react";

interface ContentHeadingProps {
  title: string;
  className?: string;
}

const ContentHeading: FC<ContentHeadingProps> = ({ title, className = "" }) => {
  const segments = title.split("<br/>");

  return (
    <h2
      className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--hosting-text-white))] leading-tight tracking-tight font-sans ${className}`}
    >
      {segments.map((segment, index) => (
        <span key={index}>
          {segment}
          {index !== segments.length - 1 && <br />}
        </span>
      ))}
    </h2>
  );
};

export default ContentHeading;

