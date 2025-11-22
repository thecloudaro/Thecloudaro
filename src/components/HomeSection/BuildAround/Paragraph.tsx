"use client";

import { FC } from "react";

interface SectionParagraphProps {
  text: string;
  className?: string;
}

const Paragraph: FC<SectionParagraphProps> = ({ text, className }) => {
  return (
    <p
      className={`text-[hsl(var(--buildaround-paragraph-text))] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed max-w-xl ${className || ""}`}
    >
      {text.split("<br/>").map((line, index) => (
        <span key={index}>
          {line}
          {index !== text.split("<br/>").length - 1 && <br />}
        </span>
      ))}
    </p>
  );
};

export default Paragraph;
