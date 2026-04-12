"use client";

import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Script from "next/script";
import { buildDomainTransferUrl } from "@/lib/upmind/domainCheckoutUrl";
import {
  fetchDomainTransferInsight,
  type DomainTransferInsight,
} from "@/lib/domain/fetchDomainTransferInsight";
import TransferResultPanel from "@/components/Transfer/TransferResultPanel";

function isDacRuntimeReady(): boolean {
  if (typeof window === "undefined") return false;
  if (window.customElements?.get("upm-dac")) return true;
  return Boolean((window as unknown as { UpmDac?: unknown }).UpmDac);
}

type Props = {
  currencyCode?: string;
  variant?: "default" | "domain" | "submit";
  initialDomain?: string;
  blockCheckout?: boolean;
  /** When domain was prefilled from URL, first focus on the domain input clears it and calls this (e.g. strip `?domain=`). */
  onTransferDomainReset?: () => void;
};

export default function UpmindTransferWidget({
  currencyCode = "USD",
  variant = "default",
  initialDomain,
  blockCheckout = false,
  onTransferDomainReset,
}: Props) {
  const [scriptReady, setScriptReady] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);
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

  const effectiveProductId =
    envTransferProductId || insight?.productId || "";

  /** Upmind docs: `order-config-url` should point at shop route, e.g. `{origin}/order/product`. */
  const orderConfigUrl = useMemo(() => {
    const transferSpecific =
      process.env.NEXT_PUBLIC_UPMIND_TRANSFER_ORDER_CONFIG_URL?.trim();
    const generic = process.env.NEXT_PUBLIC_UPMIND_ORDER_CONFIG_URL?.trim();
    const base =
      transferSpecific ||
      generic ||
      "https://my.thecloudaro.com/order/product";
    if (!effectiveProductId) return base;
    try {
      const u = new URL(base);
      u.searchParams.set("pid", effectiveProductId);
      return u.toString();
    } catch {
      return base;
    }
  }, [effectiveProductId]);

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

  /**
   * Submit page: if `NEXT_PUBLIC_UPMIND_DOMAIN_TRANSFER_PRODUCT_ID` is set, allow portal link
   * without waiting on eligibility (matches sidebar “Continue to checkout”).
   */
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

  useEffect(() => {
    if (scriptReady || scriptError) return;
    if (isDacRuntimeReady()) {
      setScriptReady(true);
      return;
    }
    const started = Date.now();
    const id = window.setInterval(() => {
      if (isDacRuntimeReady()) {
        window.clearInterval(id);
        setScriptReady(true);
        setScriptError(null);
        return;
      }
      if (Date.now() - started > 8000) {
        window.clearInterval(id);
        setScriptError(
          "Optional Upmind search module did not load. You can still use Check transfer + checkout above."
        );
      }
    }, 150);
    return () => window.clearInterval(id);
  }, [scriptReady, scriptError]);

  const handleScriptLoad = () => {
    if (isDacRuntimeReady()) {
      setScriptReady(true);
      setScriptError(null);
    }
  };

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
  const errorBoxClass = isSubmitVariant
    ? "rounded-lg border p-3 text-left text-xs border-[rgb(var(--domain-transfer-submit-card-border))] bg-black/20 text-[rgb(var(--domain-transfer-submit-description))]"
    : isDomainVariant
      ? "rounded-lg border border-hero-search-border bg-black/20 p-3 text-left text-xs text-hero-text"
      : "rounded-lg border border-transfer-hero-search bg-transfer-hero-tab p-3 text-left text-xs text-transfer-hero";
  const loadingClass = isSubmitVariant
    ? "py-3 text-center text-sm text-[rgb(var(--domain-transfer-submit-description))]"
    : isDomainVariant
      ? "py-3 text-center text-sm text-hero-text"
      : "py-3 text-center text-sm text-transfer-hero";

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
            : "cursor-not-allowed opacity-50 pointer-events-none"
        }`
      : `rounded-xl px-4 py-3 text-center text-sm font-semibold transition ${
          canTransferCheckout
            ? "bg-transfer-hero-button text-transfer-hero-button hover:bg-transfer-hero-button-hover"
            : "cursor-not-allowed bg-transfer-hero-tab text-transfer-hero-text-muted"
        }`;

  return (
    <div className={outerClass} style={outerStyle}>
      <Script
        src="https://widgets.upmind.app/dac/upm-dac.min.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onReady={handleScriptLoad}
        onError={() => {
          setScriptError(
            "Upmind search script failed to load (optional). Check network / adblock."
          );
          setScriptReady(false);
        }}
      />

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
            (isSubmitVariant || isDomainVariant) && canTransferCheckout
              ? isSubmitVariant
                ? {
                    backgroundColor: "rgb(var(--domain-transfer-submit-button-bg))",
                    color: "rgb(var(--domain-transfer-submit-button-text))",
                  }
                : {
                    backgroundColor: "rgb(var(--domain-transfer-page-button-bg))",
                    color: "rgb(var(--domain-transfer-page-button-text))",
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
        <p className={mutedClass}>
          Opens Upmind checkout in a new tab. Review transfer and billing there.
        </p>
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">
        <p
          className={`text-xs font-semibold uppercase tracking-wide opacity-80 ${
            isSubmitVariant
              ? "text-[rgb(var(--domain-transfer-submit-description))]"
              : isDomainVariant
                ? "text-hero-text"
                : "text-transfer-hero"
          }`}
        >
          Search availability &amp; more extensions
        </p>
        <p className={`mt-1 text-xs ${mutedClass}`}>
          Upmind Domain Availability Checker — same script as{" "}
          <code className="rounded bg-black/20 px-1">order-config-url=…/order/product</code> per docs.
        </p>
        {scriptError ? (
          <div className={`mt-3 ${errorBoxClass}`}>{scriptError}</div>
        ) : scriptReady ? (
          <div className="mt-3 text-left" key={orderConfigUrl}>
            {createElement("upm-dac", {
              "order-config-url": orderConfigUrl,
              "currency-code": currencyCode,
            })}
          </div>
        ) : (
          <div className={`mt-3 ${loadingClass}`}>Loading optional search module…</div>
        )}
      </div>
    </div>
  );
}
