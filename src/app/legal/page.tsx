"use client";

import LegalHero from "@/components/Legal/LegalHero";
import Links from "@/components/Legal/Links";
import Trust from "@/components/Legal/Trust";

export default function LegalPage() {
  return (
    <div className="min-h-screen">
      <LegalHero />
      <Links />
      <Trust />
    </div>
  );
}

