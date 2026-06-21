"use client";

import { Cpu, LayoutDashboard, Lock, ShieldCheck } from "lucide-react";
import DomainTransferHero from "@/components/Domain/DomainTransferHero";
import type { Feature } from "@/components/Domain/DomainTransferHero";

const features: Feature[] = [
  {
    icon: Cpu,
    title: "Beast hosting",
    description:
      "Extremely fast servers makes your websites load instantly."
  },
  {
    icon: LayoutDashboard,
    title: "Simple Management",
    description:
      "Easy to use hosting panel with modern UI."
  },
  {
    icon: Lock,
    title: "SSL certificates",
    description:
      "Enjoy free SSL forever."
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    description:
      "Hosting environment is secure with advance security."
  }
];

const GetMore = () => {
  return (
    <DomainTransferHero
      showHeader={false}
      heroTitle="Move to The Cloud Aro"
      heroSubtitle="Migrate your website to us and enjoy awesome benefits."
      features={features}
      sectionClassName="!bg-[rgb(var(--migration-getmore-bg))]"
      featureContainerClassName="max-w-4xl mx-auto"
      featureGridClassName="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-y-20 md:gap-x-16"
    />
  );
};

export default GetMore;



