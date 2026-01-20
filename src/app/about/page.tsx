"use client";

import AboutHero from "@/components/About/AboutHero";
import Primary from "@/components/About/Primary";
import Pushing from "@/components/About/Pushing";
import Building from "@/components/About/Building";
import Integrity from "@/components/About/Integrity";
import Privacy from "@/components/About/Privacy";
import Rated from "@/components/About/Rated";

export default function AboutPage() {
  const showRatedSection = false;

  return (
    <div className="min-h-screen">
      <AboutHero />
      <Primary />
      <Pushing />
      <Building />
      <Integrity />
      <Privacy />
      {showRatedSection && <Rated />}
    </div>
  );
}
