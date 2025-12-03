"use client";

import React, { useState } from "react";

interface EligibleDomainCardProps {
  domain: string;
  originalPrice: string;
  currentPrice: string;
  registrarLock: "LOCKED" | "UNLOCKED";
  onRemove?: () => void;
}

const EligibleDomainCard: React.FC<EligibleDomainCardProps> = ({
  domain,
  originalPrice,
  currentPrice,
  registrarLock,
  onRemove,
}) => {
  const [authCode, setAuthCode] = useState("");
  const [isLocked, setIsLocked] = useState(registrarLock === "LOCKED");

  return (
    <div
      className="rounded-lg p-4 sm:p-5 pt-4 sm:pt-5 border"
      style={{
        backgroundColor: "#1d1f1d",
        borderColor: "rgb(var(--domain-transfer-submit-card-border))",
      }}
    >
      {/* Top Row - Domain Name and Pricing in same line */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          {/* Green Circle Icon with Target - White target symbol */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: "hsl(var(--gradient-teal) / 0.2)",
              border: "1px solid hsl(var(--gradient-teal))",
            }}
          >
            <svg
              className="w-4 h-4"
              style={{ color: "rgb(255, 255, 255)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" strokeWidth="2" />
            </svg>
          </div>
          <h4
            className="text-sm font-semibold"
            style={{ color: "rgb(var(--domain-transfer-submit-item-name))" }}
          >
            {domain}
          </h4>
        </div>
        <div className="flex items-center gap-2.5">
          <span
            className="text-xs line-through"
            style={{ color: "rgb(var(--domain-transfer-submit-item-label))" }}
          >
            {originalPrice}
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: "rgb(var(--domain-transfer-submit-item-price))" }}
          >
            {currentPrice}
          </span>
        </div>
      </div>

      {/* Authorization Code Input and Registrar Lock - Same line */}
      <div className="mb-4">
        <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <label
              className="text-xs font-medium whitespace-nowrap"
              style={{ color: "rgb(var(--domain-transfer-submit-item-label))" }}
            >
              Authorisation code
            </label>
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
          </div>
          <input
            type="text"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            placeholder="Enter your authorisation code"
            className="w-auto max-w-xs px-2.5 py-1.5 rounded-lg text-xs focus:outline-none transition-all"
            style={{
              backgroundColor: "rgba(var(--domain-transfer-submit-auth-input-bg))",
              borderColor: "rgb(var(--domain-transfer-submit-auth-input-border))",
              color: "rgb(var(--domain-transfer-submit-input-text))",
              border: "1px solid",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgb(var(--domain-transfer-submit-button-bg))";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgb(var(--domain-transfer-submit-auth-input-border))";
            }}
          />
          {/* Registrar Lock - Positioned further right */}
          <div className="flex items-center gap-1.5 ml-6">
            <div className="flex items-center gap-1.5">
              <span
                className="text-xs font-medium whitespace-nowrap"
                style={{ color: "rgb(var(--domain-transfer-submit-item-label))" }}
              >
                Registrar Lock
              </span>
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
            </div>
            <div className="flex items-center gap-1">
              {isLocked ? (
                <>
                  <div
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#f97316", color: "rgb(255, 255, 255)" }}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs font-medium">LOCKED</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "hsl(var(--gradient-teal) / 0.2)", color: "hsl(var(--gradient-teal))" }}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-xs font-medium">UNLOCKED</span>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => setIsLocked(!isLocked)}
              className="p-1 rounded hover:bg-opacity-20 transition"
              style={{ color: "rgb(var(--domain-transfer-submit-item-label))" }}
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>
        <p
          className="text-xs mt-1"
          style={{ color: "rgb(var(--domain-transfer-submit-item-label))" }}
        >
          Get your authorisation code from your current registrar.
        </p>
      </div>

      {/* Bottom Row - Remove button only */}
      <div className="flex items-center">
        <button
          onClick={onRemove}
          className="flex items-center gap-1.5 text-xs font-medium transition"
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
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
};

export default EligibleDomainCard;

