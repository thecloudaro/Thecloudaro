"use client";

import Script from "next/script";

type UpmindLiveChatWidgetProps = {
  baseUrl?: string;
  websiteToken?: string;
};

/**
 * Upmind docs "Adding JS / Live Chat Widget" aligns with injecting custom JS (often Chatwoot).
 * This component loads the Chatwoot SDK globally when tokens are configured.
 */
export default function UpmindLiveChatWidget({
  baseUrl,
  websiteToken,
}: UpmindLiveChatWidgetProps) {
  const chatwootBaseUrl = baseUrl?.trim();
  const chatwootWebsiteToken = websiteToken?.trim();

  if (!chatwootBaseUrl || !chatwootWebsiteToken) {
    return null;
  }

  return (
    <>
      <Script id="chatwoot-sdk-loader" strategy="afterInteractive">
        {`
          (function(d,t){
            var BASE_URL=${JSON.stringify(chatwootBaseUrl)};
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL + "/packs/js/sdk.js";
            g.defer=true;
            g.async=true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.chatwootSDK.run({
                websiteToken: ${JSON.stringify(chatwootWebsiteToken)},
                baseUrl: BASE_URL
              });
            };
          })(document,"script");
        `}
      </Script>
    </>
  );
}
