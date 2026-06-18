"use client";

import { RotateCcw, Settings, Shield } from "lucide-react";
import DomainTransferHero, { Feature } from "../Domain/DomainTransferHero";

const TransferGetMore = () => {
  const features: Feature[] = [
    {
      icon: RotateCcw,
      title: "Yours to manage",
      description: "Your domain stays under your control, with renewals handled automatically unless you choose otherwise..",
    },
    {
      icon: Settings,
      title: "Works together",
      description: "Hosting, email, and other tools connect to your domain without extra setup.",
    },
    {
      icon: Shield,
      title: "Privacy included",
      description: "Personal details stay out of public records, helping reduce unwanted contact.",
    },
  ];

  return (
    <DomainTransferHero
      showHeader={false}
      heroTitle="Everything in one place."
      heroSubtitle="When you transfer your domain, it becomes part of a setup that’s easier to manage and ready to grow with you."
      features={features}
    />
  );
};

export default TransferGetMore;

