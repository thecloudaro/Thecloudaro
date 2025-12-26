"use client";

import { Cpu, LayoutDashboard, Lock, ShieldCheck } from "lucide-react";
import DomainTransferHero from "@/components/Domain/DomainTransferHero";
import type { Feature } from "@/components/Domain/DomainTransferHero";

const features: Feature[] = [
  {
    icon: Cpu,
    title: "Powerful hosting",
    description:
      "With lightning-fast performance, your websites will load instantly and without disruption."
  },
  {
    icon: LayoutDashboard,
    title: "Easy to manage",
    description:
      "Hosting Manager makes dealing with your websites and domains much easier."
  },
  {
    icon: Lock,
    title: "SSL certificates and SPACEMAIL®",
    description:
      "Enjoy SSL by Let’s Encrypt free forever or PositiveSSL free for a year then $4.99/year, plus SPACEMAIL® professional email free for a year then $3.88/year."
  },
  {
    icon: ShieldCheck,
    title: "Completely secure",
    description:
      "Stay protected at all times with the advanced security of your hosting environment."
  }
];

const GetMore = () => {
  return (
    <DomainTransferHero
      showHeader={false}
      heroTitle="Get more with TheCloudAro"
      heroSubtitle="Move your website to us and enjoy hosting with extra benefits."
      features={features}
      sectionClassName="bg-migration-getmore"
      featureContainerClassName="max-w-4xl mx-auto"
      featureGridClassName="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-y-20 md:gap-x-16"
    />
  );
};

export default GetMore;



