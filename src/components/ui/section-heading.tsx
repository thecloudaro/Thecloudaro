import React from "react";

interface SectionHeadingProps {
  heading: string | React.ReactNode;
  description?: string | React.ReactNode;
  headingClassName?: string;
  descriptionClassName?: string;
  containerClassName?: string;
  align?: "left" | "center" | "right";
  headingTag?: "h1" | "h2" | "h3" | "div";
  headingStyle?: React.CSSProperties;
  descriptionStyle?: React.CSSProperties;
}

const SectionHeading = ({
  heading,
  description,
  headingClassName = "",
  descriptionClassName = "",
  containerClassName = "",
  align = "center",
  headingTag = "h2",
  headingStyle,
  descriptionStyle
}: SectionHeadingProps) => {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };

  const HeadingTag = headingTag;

  return (
    <div className={`${alignClasses[align]} ${containerClassName}`}>
      {typeof heading === "string" ? (
        <HeadingTag className={headingClassName} style={headingStyle}>
          {heading}
        </HeadingTag>
      ) : (
        <div className={headingClassName} style={headingStyle}>
          {heading}
        </div>
      )}
      {description && (
        typeof description === "string" ? (
          <p className={descriptionClassName} style={descriptionStyle}>
            {description}
          </p>
        ) : (
          <div className={descriptionClassName} style={descriptionStyle}>
            {description}
          </div>
        )
      )}
    </div>
  );
};

export default SectionHeading;

