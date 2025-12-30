import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Web Hosting - Professional Hosting Solutions",
  description: "Professional web hosting and domain services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased`}
        style={{ backgroundColor: 'transparent' }}
      >
        <CartProvider>
          <LoginProvider>
            <SignupProvider>
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
