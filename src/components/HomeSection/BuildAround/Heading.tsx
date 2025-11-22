"use client";

import { FC } from "react";

interface SectionHeadingProps {
  title: string;
  className?: string;
}

const Heading: FC<SectionHeadingProps> = ({ title, className }) => {
  return (
    <h1
    className={`text-3xl sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] xl:text-[5rem] font-bold text-[hsl(var(--buildaround-heading-text))] leading-[0.95] tracking-tight font-sans ${className || ""}`}
    >
      {title.split("<br/>").map((line, index) => (
        <span key={index}>
          {line}
          {index !== title.split("<br/>").length - 1 && <br />}
        </span>
      ))}
    </h1>
  );
};

export default Heading;
