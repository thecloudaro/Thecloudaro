"use client";

import { Zap, Lock, Globe } from "lucide-react";
import DomainTransferHero, { Feature } from "./DomainTransferHero";

const DomainTransferGuide = () => {
  const features: Feature[] = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience blazing-fast domain transfers with minimal downtime and instant activation.",
    },
    {
      icon: Lock,
      title: "Secure & Protected",
      description: "Enterprise-grade security ensures your domain is safe throughout the transfer process.",
    },
    {
      icon: Globe,
      title: "Global Support",
      description: "24/7 expert support available worldwide to assist you with your domain needs.",
    },
  ];

  return (
    <DomainTransferHero
      heroTitle="Transfer with Confidence."
      heroSubtitle="Experience seamless domain transfers with world-class security and support."
      features={features}
      headerPlaceholder="Type your domain to transfer..."
      bulkTransferLabel="Bulk Transfer"
      transferButtonLabel="Transfer"
      onTransfer={(domain) => {
        console.log("Transfer domain:", domain);
        // Add your transfer logic here
      }}
      onBulkTransfer={() => {
        console.log("Bulk transfer clicked");
        // Add your bulk transfer logic here
      }}
    />
  );
};

export default DomainTransferGuide;

