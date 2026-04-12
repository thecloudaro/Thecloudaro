"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, Loader2, CheckCircle2, XCircle } from "lucide-react";
import UpmindTransferWidget from "@/components/Transfer/UpmindTransferWidget";
import { fetchDomainTransferInsight } from "@/lib/domain/fetchDomainTransferInsight";
import { buildDomainTransferUrl } from "@/lib/upmind/domainCheckoutUrl";

type ReadinessState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "error"; message: string }
  | {
      phase: "ready";
      eligibility: "eligible" | "not_eligible";
      detail: string;
      transferPrice: number | null;
      currency: string;
      productId: string | null;
      billingCycleMonths: number | null;
    };

const DomainTransferSubmitContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedDomain = (searchParams.get("domain") || "").trim();
  const eligibleParam = searchParams.get("eligible");
  const isEligibleLegacy = eligibleParam === "1";
  const statusMessage =
    (searchParams.get("message") || "").trim() ||
    (eligibleParam
      ? isEligibleLegacy
        ? "Your domain is eligible for transfer to us."
        : "Your domain is not eligible for transfer to us."
      : "");

  const [authCode, setAuthCode] = useState("");
  const [registerLock, setRegisterLock] = useState(true);
  const [cartItems, setCartItems] = useState<
    { name: string; price: number; currency: string; type: string }[]
  >([]);
  const [readiness, setReadiness] = useState<ReadinessState>({ phase: "idle" });

  useEffect(() => {
    const d = selectedDomain.trim().toLowerCase();
    if (!d || !d.includes(".")) {
      setReadiness({ phase: "idle" });
      setCartItems([]);
      return;
    }

    let cancelled = false;

    (async () => {
      setReadiness({ phase: "loading" });
      const result = await fetchDomainTransferInsight(d);
      if (cancelled) return;

      if (!result.ok) {
        setReadiness({
          phase: "error",
          message: result.error,
        });
        setCartItems([]);
        return;
      }

      const eligible = result.eligibleForTransfer;

      setReadiness({
        phase: "ready",
        eligibility: eligible ? "eligible" : "not_eligible",
        detail: result.detail,
        transferPrice: result.transferPrice,
        currency: result.currency,
        productId: result.productId,
        billingCycleMonths: result.billingCycleMonths,
      });

      if (eligible) {
        setCartItems([
          {
            name: d,
            price: result.transferPrice ?? 0,
            currency: result.currency,
            type: "transfer",
          },
        ]);
      } else {
        setCartItems([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedDomain]);

  const removeFromCart = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const blockWidgetCheckout =
    readiness.phase === "loading" ||
    readiness.phase === "error" ||
    (readiness.phase === "ready" && readiness.eligibility === "not_eligible");

  const formatMoney = (amount: number, cur: string) => {
    if (amount <= 0) return "—";
    if (cur === "USD") return `$${amount.toFixed(2)}`;
    return `${amount.toFixed(2)} ${cur}`;
  };

  /** Upmind transfer checkout — only when registry check says transfer-in eligible. */
  const transferPortalCheckoutUrl = useMemo(() => {
    const d = selectedDomain.trim().toLowerCase();
    if (!d || !d.includes(".")) return null;
    if (readiness.phase !== "ready" || readiness.eligibility !== "eligible") {
      return null;
    }
    return buildDomainTransferUrl({
      domainName: d,
      authCode: authCode.trim() || undefined,
      productId: readiness.productId,
      billingCycleMonths: readiness.billingCycleMonths,
    });
  }, [readiness, selectedDomain, authCode]);

  const handleTransferDomainReset = () => {
    router.replace(pathname || "/domain/transfer/submit");
  };

  return (
    <div
      className="min-h-screen overflow-hidden pt-14"
      style={{
        backgroundColor: "rgb(var(--domain-transfer-submit-bg))",
        color: "rgb(var(--domain-transfer-submit-text))",
      }}
    >
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-40 pb-16 sm:pb-20 md:pb-24 lg:pb-28 xl:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              style={{ color: "rgb(var(--domain-transfer-submit-heading))" }}
            >
              Complete Your Domain Transfer
            </h1>
            <p
              className="text-lg sm:text-xl max-w-3xl mx-auto"
              style={{ color: "rgb(var(--domain-transfer-submit-description))" }}
            >
              Review eligibility and transfer pricing below, then continue to Upmind checkout when
              you are ready.
            </p>
            {statusMessage ? (
              <div
                className={`mt-6 inline-flex max-w-3xl items-center justify-center rounded-lg border px-4 py-3 text-sm sm:text-base ${
                  isEligibleLegacy
                    ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
                    : "border-rose-400/40 bg-rose-500/10 text-rose-200"
                }`}
              >
                {selectedDomain ? `${selectedDomain}: ` : ""}
                {statusMessage}
              </div>
            ) : null}
          </div>

          {/* Eligibility + pricing (before widget / checkout) */}
          {selectedDomain ? (
            <div
              className="max-w-3xl mx-auto mb-10 rounded-xl border p-5 sm:p-6 text-left"
              style={{
                backgroundColor: "rgba(var(--domain-transfer-submit-card-bg))",
                borderColor: "rgb(var(--domain-transfer-submit-card-border))",
              }}
            >
              <h2
                className="text-lg font-semibold mb-3 flex items-center gap-2"
                style={{ color: "rgb(var(--domain-transfer-submit-card-title))" }}
              >
                Transfer check for{" "}
                <span className="font-mono text-base">{selectedDomain}</span>
              </h2>

              {readiness.phase === "loading" && (
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "rgb(var(--domain-transfer-submit-description))" }}
                >
                  <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                  Checking registry catalogue and transfer price…
                </div>
              )}

              {readiness.phase === "error" && (
                <p
                  className="text-sm border rounded-lg px-3 py-2 border-rose-500/40 bg-rose-500/10 text-rose-100"
                  role="alert"
                >
                  {readiness.message}
                </p>
              )}

              {readiness.phase === "ready" && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {readiness.eligibility === "eligible" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-sm text-emerald-100">
                        <CheckCircle2 className="h-4 w-4" />
                        Eligible for transfer-in (typical)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-sm text-amber-100">
                        <XCircle className="h-4 w-4" />
                        Not flagged as transfer-in
                      </span>
                    )}
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgb(var(--domain-transfer-submit-description))" }}
                  >
                    {readiness.detail}
                  </p>
                  <div
                    className="rounded-lg border px-4 py-3 text-sm"
                    style={{
                      borderColor: "rgb(var(--domain-transfer-submit-card-border))",
                      color: "rgb(var(--domain-transfer-submit-card-title))",
                    }}
                  >
                    <div className="flex flex-wrap justify-between gap-2">
                      <span style={{ color: "rgb(var(--domain-transfer-submit-description))" }}>
                        Transfer price (estimate)
                      </span>
                      <span className="font-semibold">
                        {readiness.transferPrice != null
                          ? `${formatMoney(readiness.transferPrice, readiness.currency)} / yr`
                          : "See checkout (Upmind)"}
                      </span>
                    </div>
                    <p
                      className="mt-2 text-xs opacity-90"
                      style={{ color: "rgb(var(--domain-transfer-submit-description))" }}
                    >
                      Final price and taxes are confirmed on Upmind checkout. Add auth code at your
                      registrar before completing transfer.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Search and Cart */}
            <div>
              <div className="mb-8">
                <div id="upmind-transfer-checkout" className="space-y-3 scroll-mt-24">
                  <UpmindTransferWidget
                    currencyCode="USD"
                    variant="submit"
                    initialDomain={selectedDomain}
                    blockCheckout={blockWidgetCheckout}
                    onTransferDomainReset={handleTransferDomainReset}
                  />
                  <p
                    className="text-sm"
                    style={{ color: "rgb(var(--domain-transfer-submit-description))" }}
                  >
                    After you confirm eligibility and price above, use checkout to complete the
                    order in Upmind (cart, payment, and transfer steps).
                  </p>
                </div>
              </div>

              <div
                className="backdrop-blur-sm rounded-xl p-6"
                style={{
                  backgroundColor: "rgba(var(--domain-transfer-submit-card-bg))",
                  border: "1px solid rgb(var(--domain-transfer-submit-card-border))",
                }}
              >
                <h3
                  className="text-xl font-semibold mb-6"
                  style={{ color: "rgb(var(--domain-transfer-submit-card-title))" }}
                >
                  Domains eligible for transfer
                </h3>

                {cartItems.length === 0 ? (
                  <div
                    className="rounded-lg p-4 text-sm"
                    style={{
                      backgroundColor: "rgba(var(--domain-transfer-submit-item-bg))",
                      color: "rgb(var(--domain-transfer-submit-item-label))",
                    }}
                  >
                    {selectedDomain
                      ? readiness.phase === "loading"
                        ? "Loading…"
                        : readiness.phase === "ready" && readiness.eligibility === "not_eligible"
                          ? "This domain is not listed for transfer-in here. You can still register or speak to support."
                          : "No domain added for transfer summary yet."
                      : "Open this page with ?domain=yourdomain.com or use the field above."}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="rounded-lg p-4"
                        style={{
                          backgroundColor: "rgba(var(--domain-transfer-submit-item-bg))",
                        }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4
                            className="text-lg font-semibold"
                            style={{ color: "rgb(var(--domain-transfer-submit-item-name))" }}
                          >
                            {item.name}
                          </h4>
                          <div className="text-right">
                            <div
                              className="text-xl font-bold"
                              style={{ color: "rgb(var(--domain-transfer-submit-item-price))" }}
                            >
                              {item.price > 0
                                ? formatMoney(item.price, item.currency)
                                : "See checkout"}
                            </div>
                            <div
                              className="text-sm"
                              style={{ color: "rgb(var(--domain-transfer-submit-item-label))" }}
                            >
                              transfer (est.)
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label
                              className="block text-sm font-medium mb-2"
                              style={{ color: "rgb(var(--domain-transfer-submit-item-label))" }}
                            >
                              Authorization code
                            </label>
                            <input
                              type="text"
                              value={authCode}
                              onChange={(e) => setAuthCode(e.target.value)}
                              placeholder="Enter authorization code"
                              className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-all duration-300 placeholder:text-[rgb(var(--domain-transfer-submit-input-placeholder))]"
                              style={{
                                backgroundColor:
                                  "rgba(var(--domain-transfer-submit-auth-input-bg))",
                                borderColor: "rgb(var(--domain-transfer-submit-auth-input-border))",
                                color: "rgb(var(--domain-transfer-submit-input-text))",
                              }}
                              onFocus={(e) => {
                                e.currentTarget.style.borderColor = "hsl(var(--gradient-teal))";
                                e.currentTarget.style.boxShadow =
                                  "0 0 0 2px hsl(var(--gradient-teal) / 0.2)";
                              }}
                              onBlur={(e) => {
                                e.currentTarget.style.borderColor =
                                  "rgb(var(--domain-transfer-submit-auth-input-border))";
                                e.currentTarget.style.boxShadow = "none";
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span
                                className="text-sm mr-2"
                                style={{ color: "rgb(var(--domain-transfer-submit-item-label))" }}
                              >
                                Register Lock
                              </span>
                              <button
                                type="button"
                                onClick={() => setRegisterLock(!registerLock)}
                                className="w-12 h-6 rounded-full transition-all duration-300"
                                style={{
                                  backgroundColor: registerLock
                                    ? "rgb(var(--domain-transfer-submit-toggle-active))"
                                    : "rgb(var(--domain-transfer-submit-toggle-inactive))",
                                }}
                              >
                                <div
                                  className="w-5 h-5 rounded-full transition-all duration-300"
                                  style={{
                                    backgroundColor:
                                      "rgb(var(--domain-transfer-submit-toggle-thumb))",
                                    transform: registerLock
                                      ? "translateX(24px)"
                                      : "translateX(4px)",
                                  }}
                                />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(index)}
                              className="text-sm font-medium"
                              style={{ color: "rgb(var(--domain-transfer-submit-remove-text))" }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color =
                                  "rgb(var(--domain-transfer-submit-remove-hover))";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color =
                                  "rgb(var(--domain-transfer-submit-remove-text))";
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div
                className="backdrop-blur-sm rounded-xl p-6"
                style={{
                  backgroundColor: "rgba(var(--domain-transfer-submit-card-bg))",
                  border: "1px solid rgb(var(--domain-transfer-submit-card-border))",
                }}
              >
                <h3
                  className="text-xl font-semibold mb-6"
                  style={{ color: "rgb(var(--domain-transfer-submit-card-title))" }}
                >
                  Transfer Process
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                      style={{ backgroundColor: "rgb(var(--domain-transfer-submit-step-bg))" }}
                    >
                      <span
                        className="font-bold text-sm"
                        style={{ color: "rgb(var(--domain-transfer-submit-step-text))" }}
                      >
                        1
                      </span>
                    </div>
                    <div>
                      <h4
                        className="font-semibold mb-1"
                        style={{ color: "rgb(var(--domain-transfer-submit-step-title))" }}
                      >
                        Unlock your domain
                      </h4>
                      <p
                        className="text-sm"
                        style={{ color: "rgb(var(--domain-transfer-submit-step-description))" }}
                      >
                        Remove domain lock at your current registrar
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                      style={{ backgroundColor: "rgb(var(--domain-transfer-submit-step-bg))" }}
                    >
                      <span
                        className="font-bold text-sm"
                        style={{ color: "rgb(var(--domain-transfer-submit-step-text))" }}
                      >
                        2
                      </span>
                    </div>
                    <div>
                      <h4
                        className="font-semibold mb-1"
                        style={{ color: "rgb(var(--domain-transfer-submit-step-title))" }}
                      >
                        Get ready to transfer
                      </h4>
                      <p
                        className="text-sm"
                        style={{ color: "rgb(var(--domain-transfer-submit-step-description))" }}
                      >
                        Disable privacy protection and get auth code
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                      style={{ backgroundColor: "rgb(var(--domain-transfer-submit-step-bg))" }}
                    >
                      <span
                        className="font-bold text-sm"
                        style={{ color: "rgb(var(--domain-transfer-submit-step-text))" }}
                      >
                        3
                      </span>
                    </div>
                    <div>
                      <h4
                        className="font-semibold mb-1"
                        style={{ color: "rgb(var(--domain-transfer-submit-step-title))" }}
                      >
                        Get your authorization code
                      </h4>
                      <p
                        className="text-sm"
                        style={{ color: "rgb(var(--domain-transfer-submit-step-description))" }}
                      >
                        Request EPP code from current registrar
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "rgba(var(--domain-transfer-submit-warning-bg))",
                  border: "1px solid rgba(var(--domain-transfer-submit-warning-border))",
                }}
              >
                <div className="flex items-start mb-3">
                  <AlertCircle
                    className="w-5 h-5 mr-3 mt-1 flex-shrink-0"
                    style={{ color: "rgb(var(--domain-transfer-submit-warning-icon))" }}
                  />
                  <h4
                    className="text-lg font-semibold"
                    style={{ color: "rgb(var(--domain-transfer-submit-warning-title))" }}
                  >
                    Important Notes
                  </h4>
                </div>
                <ul
                  className="text-sm space-y-2"
                  style={{ color: "rgb(var(--domain-transfer-submit-warning-text))" }}
                >
                  <li>• Domain must be unlocked at current registrar</li>
                  <li>• Privacy protection must be disabled</li>
                  <li>• Domain must be older than 60 days</li>
                  <li>• No pending transfers or disputes</li>
                  <li>• Valid authorization code required</li>
                </ul>
              </div>

              <div
                className="backdrop-blur-sm rounded-xl p-6"
                style={{
                  backgroundColor: "rgba(var(--domain-transfer-submit-card-bg))",
                  border: "1px solid rgb(var(--domain-transfer-submit-card-border))",
                }}
              >
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: "rgb(var(--domain-transfer-submit-card-title))" }}
                >
                  Transfer Summary
                </h3>

                <div className="space-y-3 mb-6">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between"
                      style={{ color: "rgb(var(--domain-transfer-submit-summary-item))" }}
                    >
                      <span>{item.name}</span>
                      <span>
                        {item.price > 0 ? formatMoney(item.price, item.currency) : "—"}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="border-t pt-4"
                  style={{ borderColor: "rgb(var(--domain-transfer-submit-summary-border))" }}
                >
                  <div
                    className="flex justify-between text-lg font-semibold"
                    style={{ color: "rgb(var(--domain-transfer-submit-summary-total))" }}
                  >
                    <span>Total</span>
                    <span>
                      {cartItems.length &&
                      cartItems.some((i) => i.price > 0)
                        ? formatMoney(
                            cartItems.reduce((sum, item) => sum + item.price, 0),
                            cartItems[0]?.currency || "USD"
                          )
                        : "—"}
                    </span>
                  </div>
                </div>

                <a
                  href={transferPortalCheckoutUrl ?? undefined}
                  aria-disabled={!transferPortalCheckoutUrl}
                  className={`w-full mt-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                    transferPortalCheckoutUrl
                      ? "cursor-pointer hover:opacity-95"
                      : "cursor-not-allowed opacity-50 pointer-events-none"
                  }`}
                  style={{
                    backgroundColor: "rgb(var(--domain-transfer-submit-button-bg))",
                    color: "rgb(var(--domain-transfer-submit-button-text))",
                  }}
                  onMouseEnter={(e) => {
                    if (!transferPortalCheckoutUrl) return;
                    e.currentTarget.style.backgroundColor =
                      "rgba(var(--domain-transfer-submit-button-hover))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgb(var(--domain-transfer-submit-button-bg))";
                  }}
                >
                  Continue to checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DomainTransferSubmitPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-14" />}>
      <DomainTransferSubmitContent />
    </Suspense>
  );
}
