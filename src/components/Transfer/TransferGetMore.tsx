"use client";

import { RotateCcw, Settings, Shield } from "lucide-react";
import DomainTransferHero, { Feature } from "../Domain/DomainTransferHero";

const TransferGetMore = () => {
  const features: Feature[] = [
    {
      icon: RotateCcw,
      title: "Yours by default",
      description: "Make sure your domain stays yours with automatic domain renewal.",
    },
    {
      icon: Settings,
      title: "Set up, sped up",
      description: "All your products are automatically connected and ready to activate.",
    },
    {
      icon: Shield,
      title: "Privacy assured",
      description: "Keep personal details hidden and your inbox free from spam.",
    },
  ];

  return (
    <DomainTransferHero
      showHeader={false}
      heroTitle="Get more with The Cloud Aro."
      heroSubtitle="Transfer a domain to have all you need, all in one."
      features={features}
    />
  );
};

export default TransferGetMore;

