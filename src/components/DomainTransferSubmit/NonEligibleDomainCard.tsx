"use client";

import React from "react";

interface NonEligibleDomainCardProps {
  domain: string;
  reason: string;
  onRemove: () => void;
}

const NonEligibleDomainCard: React.FC<NonEligibleDomainCardProps> = ({
  domain,
  reason,
  onRemove,
}) => {
  return (
    <div
      className="rounded-lg p-4 sm:p-5 border flex items-center justify-between gap-2.5"
      style={{
        backgroundColor: 'rgb(var(--domain-transfer-card-bg))',
        borderColor: "rgb(var(--domain-transfer-submit-card-border))",
      }}
    >
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        {/* Eye/Target Icon */}
        <div className="flex-shrink-0">
          <svg
            className="w-4 h-4"
            style={{ color: "rgb(var(--domain-transfer-submit-item-name))" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>

        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <h4
            className="text-sm font-semibold whitespace-nowrap"
            style={{ color: "rgb(var(--domain-transfer-submit-item-name))" }}
          >
            {domain}
          </h4>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              style={{ color: "rgb(var(--domain-transfer-submit-button-bg))" }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p
              className="text-xs"
              style={{ color: "rgb(var(--domain-transfer-submit-item-label))" }}
            >
              {reason}
            </p>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="p-1 rounded hover:bg-opacity-20 transition flex-shrink-0"
        style={{ color: "rgb(var(--domain-transfer-submit-remove-text))" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "rgb(var(--domain-transfer-submit-remove-hover))";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgb(var(--domain-transfer-submit-remove-text))";
        }}
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default NonEligibleDomainCard;

