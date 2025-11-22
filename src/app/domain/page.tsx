"use client";

import DomainFAQ from "@/components/Domain/DomainFAQ";
import DomainHero from "@/components/Domain/Hero/HeroSection";
import DomainGuide5 from "@/components/Domain/DomainGuide5";
import DomainGuide4 from "@/components/Domain/DomainGuide4";
import DomainGuide3 from "@/components/Domain/DomainGuide3";
import DomainGuide1 from "@/components/Domain/DomainGuide1";
import DomainPricingNavbar from "@/components/Domain/DomainPricingNavbar";
import DomainPricingPage from "@/components/Domain/DomainPricingPage";
import RelatedProducts from "@/components/Domain/RelatedProducts";

export default function DomainNamePage() {
  return (
    <div className="min-h-screen overflow-hidden ">
      <DomainHero />
      <DomainGuide5 />
        <DomainGuide4 />
        <DomainGuide3 />
        <DomainGuide1 />

        {/* New Domain Pricing Page */}
        <DomainPricingNavbar />
        <DomainPricingPage />

        {/* Related Products */}
        <RelatedProducts />

        {/* Domain FAQ */}
        <DomainFAQ />
    </div>
  );
}