"use client";

import { useMemo, useState } from "react";
import Script from "next/script";

type Props = {
  currencyCode?: string;
};

export default function UpmindTransferWidget({ currencyCode = "USD" }: Props) {
  const [loaded, setLoaded] = useState(false);

  const orderConfigUrl = useMemo(() => {
    const transferSpecific = process.env.NEXT_PUBLIC_UPMIND_TRANSFER_ORDER_CONFIG_URL?.trim();
    const generic = process.env.NEXT_PUBLIC_UPMIND_ORDER_CONFIG_URL?.trim();
    return transferSpecific || generic || "https://my.thecloudaro.com/order/product";
  }, []);

  return (
    <div className="rounded-2xl border border-transfer-hero-search bg-transfer-hero-search p-3 sm:p-4">
      <Script
        src="https://widgets.upmind.app/dac/upm-dac.min.js"
        strategy="lazyOnload"
        onLoad={() => setLoaded(true)}
      />

      {loaded ? (
        <div className="text-left">
          {/* @ts-ignore Upmind web component */}
          <upm-dac order-config-url={orderConfigUrl} currency-code={currencyCode} />
        </div>
      ) : (
        <div className="py-4 text-center text-sm text-transfer-hero">
          Loading transfer widget...
        </div>
      )}
    </div>
  );
}
