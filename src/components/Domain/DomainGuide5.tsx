"use client";

import { Shield, RotateCcw, Link } from "lucide-react";
import DomainTransferHero, { Feature } from "./DomainTransferHero";

const DomainGuide5 = () => {
  const features: Feature[] = [
    {
      icon: Shield,
      title: "Free domain privacy",
      description: "Keep personal details hidden and your inbox free from spam.",
    },
    {
      icon: RotateCcw,
      title: "Easy auto-renewal",
      description: "Make sure your domain stays yours with automatic domain renewal.",
    },
    {
      icon: Link,
      title: "Simple setup",
      description: "All our products are seamlessly connected and ready for you to activate.",
    },
  ];

  return (
    <DomainTransferHero
      showHeader={false}
      heroTitle="More than just a domain"
      features={features}
    />
  );
};

export default DomainGuide5;
