"use client";

import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import type { DomainTransferInsight } from "@/lib/domain/fetchDomainTransferInsight";

type Props = {
  loading: boolean;
  insight: Extract<DomainTransferInsight, { ok: true }> | null;
  error: string | null;
  /** `domain` = /domain/transfer styling; `submit` = submit page */
  variant?: "domain" | "submit";
};

function formatMoney(amount: number, cur: string) {
  if (cur === "USD") return `$${amount.toFixed(2)}`;
  return `${amount.toFixed(2)} ${cur}`;
}

/**
 * GoDaddy-style transfer result: domain + status + transfer price before checkout.
 */
export default function TransferResultPanel({
  loading,
  insight,
  error,
  variant = "domain",
}: Props) {
  const isSubmit = variant === "submit";
  const cardStyle = isSubmit
    ? {
        backgroundColor: "rgba(var(--domain-transfer-submit-card-bg))",
        borderColor: "rgb(var(--domain-transfer-submit-card-border))",
      }
    : {
        backgroundColor: "rgba(var(--domain-transfer-page-search-bg))",
        borderColor: "rgb(var(--domain-transfer-page-divider))",
      };
  const titleColor = isSubmit
    ? "rgb(var(--domain-transfer-submit-card-title))"
    : "rgb(var(--domain-transfer-page-hero-heading))";
  const descColor = isSubmit
    ? "rgb(var(--domain-transfer-submit-description))"
    : "rgb(var(--domain-transfer-page-hero-description))";
  const priceColor = isSubmit
    ? "rgb(var(--domain-transfer-submit-item-price))"
    : "rgb(var(--domain-transfer-page-button-bg))";

  if (loading) {
    return (
      <div
        className="flex items-center gap-3 rounded-xl border px-4 py-4 text-sm"
        style={cardStyle}
      >
        <Loader2 className="h-5 w-5 shrink-0 animate-spin opacity-80" style={{ color: descColor }} />
        <span style={{ color: descColor }}>Checking transfer price and eligibility…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100"
        role="alert"
      >
        {error}
      </div>
    );
  }

  if (!insight) {
    return null;
  }

  return (
    <div className="rounded-xl border-2 p-4 sm:p-5 text-left shadow-lg" style={cardStyle}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide opacity-80" style={{ color: descColor }}>
            Transfer search result
          </p>
          <p className="mt-1 font-mono text-lg font-semibold sm:text-xl break-all" style={{ color: titleColor }}>
            {insight.domain}
          </p>
        </div>
        <div
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
            insight.eligibleForTransfer
              ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-100"
              : "border-amber-400/50 bg-amber-500/10 text-amber-100"
          }`}
        >
          {insight.eligibleForTransfer ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" />
              Eligible for transfer
            </>
          ) : (
            <>
              <AlertTriangle className="h-3.5 w-3.5" />
              Review required
            </>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-4">
        <div>
          <p className="text-xs opacity-80" style={{ color: descColor }}>
            Transfer price (estimate)
          </p>
          <p className="text-3xl font-bold tabular-nums" style={{ color: priceColor }}>
            {insight.transferPrice != null
              ? formatMoney(insight.transferPrice, insight.currency)
              : "—"}
            {insight.transferPrice != null ? (
              <span className="text-base font-medium opacity-90"> / yr</span>
            ) : null}
          </p>
          <p className="mt-2 text-xs leading-relaxed opacity-90" style={{ color: descColor }}>
            {insight.detail}
          </p>
        </div>
        <p className="max-w-xs text-xs opacity-75" style={{ color: descColor }}>
          Final price, taxes, and renewal are confirmed at Upmind checkout. Unlock domain and get your
          auth code from your current registrar before paying.
        </p>
      </div>
    </div>
  );
}
