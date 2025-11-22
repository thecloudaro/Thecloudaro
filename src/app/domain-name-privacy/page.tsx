"use client";

import DomainNameHero from "@/components/DomainNamePrivacy/DomainNameHero";
import Private from "@/components/DomainNamePrivacy/Private";
import Avoid from "@/components/DomainNamePrivacy/Avoid";
import NoSetup from "@/components/DomainNamePrivacy/NoSetup";
import YourPrivacy from "@/components/DomainNamePrivacy/YourPrivacy";
import HowItWork from "@/components/DomainNamePrivacy/HowItWork";
import Register from "@/components/DomainNamePrivacy/Register";

export default function DomainNamePrivacyPage() {
  return (
    <div className="min-h-screen">
      <DomainNameHero />
      <Private />
      <Avoid />
      <NoSetup />
      <YourPrivacy />
      <HowItWork />
      <Register />
    </div>
  );
}

