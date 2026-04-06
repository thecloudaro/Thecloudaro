import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/Footer";
import NavbarWrapper from "@/components/Navbar/NavbarWrapper";
import Preloader from "@/components/Preloader";
import { CartProvider } from "@/components/Cart/CartContext";
import CartSidebar from "@/components/Cart/CartSidebar";
import { LoginProvider } from "@/components/Login/LoginContext";
import LoginModalWrapper from "@/components/Login/LoginModalWrapper";
import { SignupProvider } from "@/components/Signup/SignupContext";
import SignupModalWrapper from "@/components/Signup/SignupModalWrapper";
import { Toaster } from "react-hot-toast";
import ErrorHandler from "@/components/ErrorHandler";
import UpmindLiveChatWidget from "@/components/UpmindLiveChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Web Hosting - Professional Hosting Solutions",
  description: "Professional web hosting and domain services",
  icons: {
    icon: [
      { url: '/logo/icon.png', sizes: '80x120', type: 'image/png' },
      { url: '/logo/icon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/logo/icon.png',
    apple: [
      { url: '/logo/icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  const chatwootBaseUrl = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL?.trim();
  const chatwootWebsiteToken =
    process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN?.trim();

  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased`}
        style={{ backgroundColor: 'transparent' }}
      >
        {/* Upmind docs pattern: use GTM for custom JS / chat widgets. */}
        {gtmId ? (
          <>
            <Script id="gtm-init" strategy="afterInteractive">{`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}</Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="gtm"
              />
            </noscript>
          </>
        ) : null}

        {/* Direct (non-GTM) live chat widget injection (Chatwoot format from Upmind docs example). */}
        <UpmindLiveChatWidget
          baseUrl={chatwootBaseUrl}
          websiteToken={chatwootWebsiteToken}
        />

        <CartProvider>
          <LoginProvider>
            <SignupProvider>
              <ErrorHandler />
              <Preloader />
              <Toaster />
              <NavbarWrapper />
              {children}
              <Footer/>
              <CartSidebar />
              <LoginModalWrapper />
              <SignupModalWrapper />
            </SignupProvider>
          </LoginProvider>
        </CartProvider>
      </body>
    </html>
  );
}
