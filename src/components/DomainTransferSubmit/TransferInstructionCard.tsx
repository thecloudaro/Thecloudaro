"use client";

import React from "react";

interface TransferInstructionCardProps {
  title: string;
  description: string;
}

const TransferInstructionCard: React.FC<TransferInstructionCardProps> = ({
  title,
  description,
}) => {
  return (
    <div
      className="rounded-lg p-3 sm:p-4 border transition-all duration-300 hover:border-opacity-70 relative overflow-hidden"
      style={{
        backgroundColor: "#1d1f1d",
        borderColor: "rgb(var(--domain-transfer-submit-instruction-card-border))",
      }}
    >
      {/* Teal Gradient Accent */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{
          background: "linear-gradient(to right, hsl(var(--gradient-teal)), hsl(var(--gradient-turquoise)))",
        }}
      />
      
      <h3
        className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2"
        style={{ color: "rgb(var(--domain-transfer-submit-instruction-card-title))" }}
      >
        {title}
      </h3>
      <p
        className="text-xs leading-relaxed"
        style={{ color: "rgb(var(--domain-transfer-submit-instruction-card-text))" }}
      >
        {description}
      </p>
    </div>
  );
};

export default TransferInstructionCard;

