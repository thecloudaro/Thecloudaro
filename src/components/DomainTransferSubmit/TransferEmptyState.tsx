"use client";

import React from "react";

const TransferEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-10">
      {/* Icon - Broken/Incomplete Square Arrow pointing down-left */}
      <div
        className="mb-4 sm:mb-5"
        style={{ color: "rgb(var(--domain-transfer-submit-empty-state-icon))" }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 opacity-60"
        >
          {/* Broken/incomplete square arrow pointing down-left */}
          <path d="M4 4h12v12" strokeDasharray="3 2" />
          <path d="M16 4l-8 8" />
          <path d="M16 16v4H4" strokeDasharray="3 2" />
        </svg>
      </div>

      {/* Text */}
      <h3
        className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-center"
        style={{ color: "rgb(var(--domain-transfer-submit-empty-state-text))" }}
      >
        No domain transfers to show
      </h3>
      <p
        className="text-xs sm:text-sm md:text-base text-center max-w-md px-4"
        style={{ color: "rgb(var(--domain-transfer-submit-empty-state-description))" }}
      >
        Type the domain you want to transfer above and we&apos;ll make the process seamless.
      </p>
    </div>
  );
};

export default TransferEmptyState;

