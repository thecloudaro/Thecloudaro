"use client";

import { ArrowDownToLine, FileCheck2, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

type MigrationIconVariant = "upload" | "check" | "connect";

interface MigrationIconProps {
  variant: MigrationIconVariant;
  size?: "md" | "lg";
  className?: string;
}

const ICON_MAP: Record<MigrationIconVariant, typeof ArrowDownToLine> = {
  upload: ArrowDownToLine,
  check: FileCheck2,
  connect: Link2
};

const GRADIENT_MAP: Record<MigrationIconVariant, string> = {
  upload: "linear-gradient(to bottom right, rgb(var(--ui-migration-icon-upload-from)), rgb(var(--ui-migration-icon-upload-via)), rgb(var(--ui-migration-icon-upload-to)))",
  check: "linear-gradient(to bottom right, rgb(var(--ui-migration-icon-check-from)), rgb(var(--ui-migration-icon-check-via)), rgb(var(--ui-migration-icon-check-to)))",
  connect: "linear-gradient(to bottom right, rgb(var(--ui-migration-icon-connect-from)), rgb(var(--ui-migration-icon-connect-via)), rgb(var(--ui-migration-icon-connect-to)))"
};

const SIZE_MAP = {
  md: {
    wrapper: "h-16 w-16 rounded-[22px]",
    icon: "h-9 w-9"
  },
  lg: {
    wrapper: "h-20 w-20 rounded-[28px]",
    icon: "h-11 w-11"
  }
};

const MigrationIcon = ({
  variant,
  size = "md",
  className
}: MigrationIconProps) => {
  const Icon = ICON_MAP[variant];
  const sizeConfig = SIZE_MAP[size];

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <span
        className="absolute inset-0 rounded-[32px] bg-gradient-to-br blur-xl opacity-80"
        style={{ 
          background: `linear-gradient(to bottom right, rgba(var(--ui-migration-icon-blur-from)), transparent)`
        }}
        aria-hidden
      />
      <div
        className={cn(
          "relative flex items-center justify-center",
          sizeConfig.wrapper
        )}
        style={{ 
          background: GRADIENT_MAP[variant],
          boxShadow: `0 24px 48px rgba(var(--ui-migration-icon-shadow))`
        }}
      >
        <Icon 
          className={cn(sizeConfig.icon)} 
          style={{ 
            color: 'rgb(var(--ui-migration-icon-text))',
            filter: 'drop-shadow(0 4px 8px rgba(var(--ui-migration-icon-shadow)))'
          }}
          strokeWidth={1.4} 
        />
      </div>
    </div>
  );
};

export default MigrationIcon;


