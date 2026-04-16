"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { buildDomainTransferUrl } from "@/lib/upmind/domainCheckoutUrl";
import {
  fetchDomainTransferInsight,
  type DomainTransferInsight,
} from "@/lib/domain/fetchDomainTransferInsight";
import TransferResultPanel from "@/components/Transfer/TransferResultPanel";

type Props = {
  currencyCode?: string;
  variant?: "default" | "domain" | "submit";
  initialDomain?: string;
  blockCheckout?: boolean;
  /** When domain was prefilled from URL, first focus on the domain input clears it and calls this (e.g. strip `?domain=`). */
  onTransferDomainReset?: () => void;
};

export default function UpmindTransferWidget({
  currencyCode: _currencyCode = "USD",
  variant = "default",
  initialDomain,
  blockCheckout = false,
  onTransferDomainReset,
}: Props) {
  const [domainName, setDomainName] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [insightLoading, setInsightLoading] = useState(false);
  const [insightError, setInsightError] = useState<string | null>(null);
  const [insight, setInsight] = useState<Extract<
    DomainTransferInsight,
    { ok: true }
  > | null>(null);

  /** True while the domain field still reflects `initialDomain` from the parent (URL). First focus clears for a fresh search. */
  const domainSeededFromUrlRef = useRef(false);

  const envTransferProductId =
    process.env.NEXT_PUBLIC_UPMIND_DOMAIN_TRANSFER_PRODUCT_ID?.trim() || "";

  useEffect(() => {
    const v = initialDomain?.trim();
    if (v) {
      setDomainName(v);
      domainSeededFromUrlRef.current = true;
    } else {
      setDomainName("");
      domainSeededFromUrlRef.current = false;
    }
  }, [initialDomain]);

  const handleDomainInputFocus = () => {
    if (!domainSeededFromUrlRef.current) return;
    domainSeededFromUrlRef.current = false;
    setDomainName("");
    setInsight(null);
    setInsightError(null);
    onTransferDomainReset?.();
  };

  const normalizedDomain = useMemo(() => domainName.trim().toLowerCase(), [domainName]);
  const domainIsValid = useMemo(
    () =>
      /^[a-z0-9][a-z0-9-]{0,62}(\.[a-z0-9][a-z0-9-]{0,62})+$/i.test(
        normalizedDomain
      ),
    [normalizedDomain]
  );

  const runTransferCheck = useCallback(async () => {
    if (!domainIsValid) {
      setInsight(null);
      setInsightError(null);
      return;
    }
    setInsightLoading(true);
    setInsightError(null);
    setInsight(null);
    const result = await fetchDomainTransferInsight(normalizedDomain);
    setInsightLoading(false);
    if (!result.ok) {
      setInsightError(result.error);
      return;
    }
    setInsight(result);
  }, [domainIsValid, normalizedDomain]);

  /** Submit page: auto-run once when URL brings a domain. Main transfer page: user clicks Search (GoDaddy-style). */
  useEffect(() => {
    if (!initialDomain?.trim()) return;
    if (!domainIsValid) return;
    runTransferCheck();
  }, [initialDomain, domainIsValid, runTransferCheck]);

  /** Strict mode: checkout only when domain is verified as transfer-eligible. */
  const canTransferCheckout = (() => {
    if (blockCheckout || !domainIsValid) return false;
    const hasPid = Boolean(envTransferProductId || insight?.productId);
    if (!hasPid) return false;
    return (
      insight?.ok === true && insight.eligibleForTransfer === true
    );
  })();

  const transferUrl = useMemo(
    () =>
      buildDomainTransferUrl({
        domainName: normalizedDomain,
        authCode: authCode.trim() || undefined,
        productId: insight?.productId ?? null,
        billingCycleMonths: insight?.billingCycleMonths ?? null,
      }),
    [normalizedDomain, authCode, insight]
  );

  const checkoutBlockedReason = (() => {
    if (canTransferCheckout) return null;
    if (normalizedDomain.length === 0) return null;
    if (!domainIsValid) return "Enter a valid domain first.";
    if (!insight?.ok) return "Click 'Check transfer' first.";
    if (!insight.eligibleForTransfer) {
      return "Checkout is enabled only for domains marked 'Eligible for transfer'.";
    }
    if (!envTransferProductId && !insight.productId) {
      return "Transfer product mapping not found for this TLD.";
    }
    return "Complete transfer check before checkout.";
  })();

  const isDomainVariant = variant === "domain";
  const isSubmitVariant = variant === "submit";
  const outerClass = isSubmitVariant
    ? "rounded-2xl border p-4 sm:p-5"
    : isDomainVariant
      ? "rounded-2xl border border-hero-search-border shadow-lg backdrop-blur-md p-4 sm:p-5"
      : "rounded-2xl border border-transfer-hero-search bg-transfer-hero-search p-4 sm:p-5";
  const outerStyle = isSubmitVariant
    ? {
        backgroundColor: "rgba(var(--domain-transfer-submit-card-bg))",
        borderColor: "rgb(var(--domain-transfer-submit-card-border))",
      }
    : isDomainVariant
      ? { backgroundColor: "rgb(var(--domain-transfer-page-search-bg))" as const }
      : undefined;

  const labelClass = isSubmitVariant
    ? "text-xs font-medium text-[rgb(var(--domain-transfer-submit-description))]"
    : isDomainVariant
      ? "text-xs text-hero-text"
      : "text-xs text-transfer-hero";
  const inputClass = isSubmitVariant
    ? "w-full rounded-xl border bg-transparent px-4 py-3 text-base focus:outline-none text-[rgb(var(--domain-transfer-submit-input-text))] placeholder:text-[rgb(var(--domain-transfer-submit-input-placeholder))] border-[rgb(var(--domain-transfer-submit-auth-input-border))]"
    : isDomainVariant
      ? "w-full rounded-xl border border-hero-search-border bg-transparent px-4 py-3 text-base text-hero-text placeholder-hero-text-muted focus:outline-none"
      : "w-full rounded-xl border border-transfer-hero-search bg-transparent px-4 py-3 text-base text-transfer-hero placeholder-transfer-hero-text-muted focus:outline-none";
  const mutedClass = isSubmitVariant
    ? "text-xs text-[rgb(var(--domain-transfer-submit-description))] opacity-90"
    : isDomainVariant
      ? "text-xs text-hero-text-muted"
      : "text-xs text-transfer-hero-text-muted";
  const primaryBtnClass =
    isSubmitVariant || isDomainVariant
      ? `rounded-xl px-5 py-3 text-center text-sm font-semibold transition ${
          domainIsValid && !insightLoading
            ? ""
            : "cursor-not-allowed opacity-50 pointer-events-none"
        }`
      : `rounded-xl px-5 py-3 text-center text-sm font-semibold transition ${
          domainIsValid && !insightLoading
            ? "bg-transfer-hero-button text-transfer-hero-button hover:bg-transfer-hero-button-hover"
            : "cursor-not-allowed bg-transfer-hero-tab text-transfer-hero-text-muted"
        }`;

  const checkoutBtnClass =
    isSubmitVariant || isDomainVariant
      ? `rounded-xl px-4 py-3 text-center text-sm font-semibold transition ${
          canTransferCheckout
            ? ""
            : "cursor-not-allowed pointer-events-none"
        }`
      : `rounded-xl px-4 py-3 text-center text-sm font-semibold transition ${
          canTransferCheckout
            ? "bg-transfer-hero-button text-transfer-hero-button hover:bg-transfer-hero-button-hover"
            : "cursor-not-allowed bg-transfer-hero-tab text-transfer-hero-text-muted"
        }`;

  return (
    <div className={outerClass} style={outerStyle}>
      <div className="space-y-4 text-left">
        <div>
          <label className={labelClass} htmlFor="transfer-domain-input">
            Enter the domain you want to transfer
          </label>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-stretch">
            <input
              id="transfer-domain-input"
              type="text"
              value={domainName}
              onChange={(e) => {
                domainSeededFromUrlRef.current = false;
                setDomainName(e.target.value);
                setInsight(null);
                setInsightError(null);
              }}
              onFocus={handleDomainInputFocus}
              onKeyDown={(e) => {
                if (e.key === "Enter") void runTransferCheck();
              }}
              placeholder="yourdomain.com"
              className={inputClass}
              autoComplete="off"
            />
            <button
              type="button"
              disabled={!domainIsValid || insightLoading}
              onClick={() => void runTransferCheck()}
              className={primaryBtnClass}
              style={
                isSubmitVariant || isDomainVariant
                  ? {
                      backgroundColor: "rgb(var(--domain-transfer-page-button-bg))",
                      color: "rgb(var(--domain-transfer-page-button-text))",
                      minWidth: "11rem",
                    }
                  : undefined
              }
            >
              {insightLoading ? "Checking…" : "Check transfer"}
            </button>
          </div>
          {!domainIsValid && normalizedDomain.length > 0 && (
            <p className={`mt-2 ${mutedClass}`}>
              Enter a valid domain (e.g. mydomain.com).
            </p>
          )}
        </div>

        <TransferResultPanel
          loading={insightLoading}
          insight={insight}
          error={insightError}
          variant={isSubmitVariant ? "submit" : "domain"}
        />

        {insight?.ok && !insight.eligibleForTransfer && (
          <p className={`${mutedClass} rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2`}>
            Transfer-in usually applies to domains already registered at the registry. If this name is
            free to register, use <strong>Register</strong> instead, or confirm status at your current
            registrar.
          </p>
        )}

        <div>
          <label className={labelClass} htmlFor="transfer-auth-input">
            Authorization / EPP code (optional for price check; required at registrar to move)
          </label>
          <input
            id="transfer-auth-input"
            type="text"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            placeholder="From your current registrar"
            className={`${inputClass} mt-2`}
          />
        </div>

        <a
          href={canTransferCheckout ? transferUrl : undefined}
          target={isSubmitVariant ? undefined : "_blank"}
          rel={isSubmitVariant ? undefined : "noopener noreferrer"}
          className={checkoutBtnClass}
          style={
            isSubmitVariant || isDomainVariant
              ? canTransferCheckout
                ? isSubmitVariant
                  ? {
                      backgroundColor: "rgb(var(--domain-transfer-submit-button-bg))",
                      color: "rgb(var(--domain-transfer-submit-button-text))",
                    }
                  : {
                      backgroundColor: "rgb(var(--domain-transfer-page-button-bg))",
                      color: "rgb(var(--domain-transfer-page-button-text))",
                    }
                : {
                    backgroundColor: isSubmitVariant
                      ? "rgb(var(--domain-transfer-submit-button-bg) / 0.35)"
                      : "rgb(var(--domain-transfer-page-button-bg) / 0.35)",
                    color: isSubmitVariant
                      ? "rgb(var(--domain-transfer-submit-button-text) / 0.75)"
                      : "rgb(var(--domain-transfer-page-button-text) / 0.75)",
                  }
              : undefined
          }
          onMouseEnter={(e) => {
            if ((!isDomainVariant && !isSubmitVariant) || !canTransferCheckout)
              return;
            e.currentTarget.style.backgroundColor = isSubmitVariant
              ? "rgba(var(--domain-transfer-submit-button-hover))"
              : "rgb(var(--domain-transfer-page-button-hover))";
          }}
          onMouseLeave={(e) => {
            if ((!isDomainVariant && !isSubmitVariant) || !canTransferCheckout)
              return;
            e.currentTarget.style.backgroundColor = isSubmitVariant
              ? "rgb(var(--domain-transfer-submit-button-bg))"
              : "rgb(var(--domain-transfer-page-button-bg))";
          }}
          aria-disabled={!canTransferCheckout}
        >
          Add to cart — Continue to checkout
        </a>
        {!canTransferCheckout && checkoutBlockedReason && (
          <p className={`${mutedClass} mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2`}>
            {checkoutBlockedReason}
          </p>
        )}
      </div>
    </div>
  );
}
