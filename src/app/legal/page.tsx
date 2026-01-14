"use client";

import LegalHero from "@/components/TermsAndConditions/LegalHero";
import Links from "@/components/TermsAndConditions/Links";
import Trust from "@/components/TermsAndConditions/Trust";

export default function LegalPage() {
  return (
    <div className="min-h-screen">
      <LegalHero />
      <Links />
      <Trust />
    </div>
  );
}

