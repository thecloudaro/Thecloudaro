"use client";

import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export type BillingCycle = "monthly" | "yearly" | "biyearly";

interface HostingPlanControlsProps {
  billing: BillingCycle;
  onBillingChange: Dispatch<SetStateAction<BillingCycle>> | ((cycle: BillingCycle) => void);
  dataCenter: string;
  onDataCenterChange: Dispatch<SetStateAction<string>> | ((value: string) => void);
  variant?: "blur" | "flat" | "plain";
  className?: string;
  showDivider?: boolean;
  cycles?: BillingCycle[];
  hideDataCenter?: boolean;
}

const cycleLabels: Record<BillingCycle, string> = {
  monthly: "Monthly",
  yearly: "Yearly",
  biyearly: "Biyearly"
};

const HostingPlanControls = ({
  billing,
  onBillingChange,
  dataCenter,
  onDataCenterChange,
  variant = "blur",
  className = "",
  showDivider,
  cycles,
  hideDataCenter = false
}: HostingPlanControlsProps) => {
  const isBlur = variant === "blur";
  const isPlain = variant === "plain";
  const shouldShowDivider = showDivider ?? ((isBlur || isPlain) && !hideDataCenter);
  const availableCycles = cycles ?? (Object.keys(cycleLabels) as BillingCycle[]);

  const containerClass = isBlur
    ? `inline-flex items-center gap-6 px-6 py-3 rounded-2xl ${className}`
    : `flex flex-wrap justify-center items-center gap-6 ${className}`;

  const containerStyle = isBlur
    ? {
        backgroundColor: "rgba(var(--hosting-controls-blur-bg))",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: "16px",
        border: "none"
      }
    : isPlain
    ? { backgroundColor: "transparent" }
    : undefined;

  const toggleWrapperClass = isBlur
    ? "flex items-center rounded-full px-1 py-1"
    : isPlain
    ? "flex items-center rounded-full px-1.5 py-1"
    : "flex items-center rounded-full bg-[rgb(var(--hosting-controls-toggle-bg))] px-1.5 py-1";

  const toggleWrapperStyle = isBlur
    ? {
        color: "rgb(var(--hosting-text-muted))",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)"
      }
    : isPlain
    ? {
        color: "rgb(var(--hosting-text-muted))",
        backgroundColor: "rgb(var(--hosting-controls-toggle-bg-plain))",
        borderRadius: "9999px"
      }
    : undefined;

  const selectBaseClass = isBlur
    ? "appearance-none rounded-lg px-4 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--hosting-blue-500))]"
    : isPlain
    ? "appearance-none rounded-lg border px-4 py-1.5 pr-8 text-sm text-[rgb(var(--hosting-text-white))] bg-transparent focus:outline-none focus:ring-2 focus:ring-[rgb(var(--hosting-controls-focus-ring))]"
    : "appearance-none bg-[rgb(var(--hosting-controls-select-bg))] border border-[rgb(var(--hosting-controls-select-border))] rounded-lg px-4 py-2 pr-8 text-sm text-[rgb(var(--hosting-text-white))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--hosting-controls-focus-ring))]";

  const selectStyle = isBlur
    ? {
        borderRadius: "8px",
        backgroundColor: "rgba(var(--hosting-select-bg), 0.5)",
        borderColor: "rgb(var(--hosting-select-border))",
        borderWidth: "1px",
        color: "rgb(var(--hosting-text-white))"
      }
    : isPlain
    ? {
        borderRadius: "8px",
        backgroundColor: "transparent",
        borderColor: "rgba(var(--hosting-controls-border-white-15))",
        borderWidth: "1px",
        color: "rgb(var(--hosting-text-white))"
      }
    : undefined;

  const labelClass = isBlur
    ? "text-sm font-bold"
    : "text-sm font-medium";

  const labelStyle = isBlur
    ? { color: "rgb(var(--hosting-text-white))" }
    : isPlain
    ? { color: "rgb(var(--hosting-text-white))" }
    : { color: "rgb(var(--hosting-text-white))" };

  const dividerStyle = isBlur
    ? { backgroundColor: "rgb(var(--hosting-divider))" }
    : isPlain
    ? { backgroundColor: "rgba(var(--hosting-controls-border-white-12))" }
    : { backgroundColor: "rgb(var(--hosting-controls-select-border))" };

  const chevronColor = isBlur
    ? "rgb(var(--hosting-text-muted))"
    : isPlain
    ? "rgba(var(--hosting-controls-text-white-50))"
    : "rgb(var(--hosting-controls-chevron-gray))";

  const handleBillingChange = (cycle: BillingCycle) => {
    if (typeof onBillingChange === "function") {
      onBillingChange(cycle);
    }
  };

  const handleDataCenterChange = (value: string) => {
    if (typeof onDataCenterChange === "function") {
      onDataCenterChange(value);
    }
  };

  return (
    <div className={containerClass} style={containerStyle}>
      <div className={toggleWrapperClass} style={toggleWrapperStyle}>
        {availableCycles.map((cycle) => {
          const isActive = billing === cycle;
          return (
            <button
              key={cycle}
              onClick={() => handleBillingChange(cycle)}
              className="px-5 py-1.5 rounded-full font-medium text-sm transition-colors duration-200"
              style={{
                borderRadius: "9999px",
                backgroundColor: isActive
                  ? isBlur
                    ? "rgb(var(--hosting-button-active))"
                    : isPlain
                    ? "rgb(var(--hosting-button-active))"
                    : "rgb(var(--hosting-button-active))"
                  : "transparent",
                color: isActive
                  ? isBlur
                    ? "rgb(var(--hosting-text-white))"
                    : "rgb(var(--hosting-text-white))"
                  : isBlur
                  ? "rgb(var(--hosting-text-gray))"
                  : isPlain
                  ? "rgba(var(--hosting-controls-text-white-60))"
                  : "rgb(var(--hosting-controls-text-gray-300))"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  if (isBlur) {
                    e.currentTarget.style.backgroundColor =
                      `rgba(var(--hosting-button-inactive))`;
                  } else if (isPlain) {
                    e.currentTarget.style.backgroundColor = `rgba(var(--hosting-controls-blue-hover))`;
                    e.currentTarget.style.color = "rgb(var(--hosting-text-white))";
                  } else {
                    // Flat variant hover
                    e.currentTarget.style.backgroundColor = `rgba(var(--hosting-button-inactive))`;
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  if (isBlur) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  } else if (isPlain) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "rgba(var(--hosting-controls-text-white-60))";
                  }
                }
              }}
            >
              {cycleLabels[cycle]}
            </button>
          );
        })}
      </div>

      {shouldShowDivider && (
        <div className="h-6 w-px" style={dividerStyle} />
      )}

      {!hideDataCenter ? (
        <div className="flex items-center gap-3 text-sm">
          <span className={labelClass} style={labelStyle}>
            Data center location
          </span>
          <div className="relative">
            <select
              value={dataCenter}
              onChange={(e) => handleDataCenterChange(e.target.value)}
              className={selectBaseClass}
              style={{
                ...selectStyle,
                color: "rgb(var(--hosting-text-white))"
              }}
            >
              <option value="US">🇺🇸 US</option>
              <option value="UK">🇬🇧 UK</option>
              <option value="EU">🇪🇺 EU</option>
              <option value="ASIA">🌏 ASIA</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: chevronColor }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HostingPlanControls;


