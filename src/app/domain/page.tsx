"use client";

import DomainFAQ from "@/components/Domain/DomainFAQ";
import DomainHero from "@/components/Domain/Hero/HeroSection";
import DomainPricingPage from "@/components/Domain/DomainPricingPage";

export default function DomainNamePage() {
  return (
    <div className="min-h-screen overflow-hidden ">
      <DomainHero />
        {/* New Domain Pricing Page */}
        <DomainPricingPage />
        {/* Domain FAQ */}
        <DomainFAQ />
    </div>
  );
}