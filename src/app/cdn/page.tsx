"use client";

import CdnHero from "@/components/Cdn/CdnHero";
import Accelerate from "@/components/Cdn/Accelerate";
import Amp from "@/components/Cdn/Amp";
import Access from "@/components/Cdn/Access";
import SuperSonic from "@/components/Cdn/SuperSonic";
import SuperSonicCard from "@/components/Cdn/SuperSonicCard";
import Reliability from "@/components/Cdn/Reliability";
import FAQcdn from "@/components/Cdn/FAQcdn";

export default function CDNPage() {
  return (
    <div className="min-h-screen">
      <CdnHero />
      <Accelerate />
      <Amp />
      <Access />
      <SuperSonic />
      <SuperSonicCard />
      <Reliability />
      <FAQcdn />
    </div>
  );
}
