"use client";

import MigrateHero from "@/components/Migrate/MigrateHero";
import Free from "@/components/Migrate/Free";
import EasyStep from "@/components/Migrate/EasyStep";
import WhatYou from "@/components/Migrate/WhatYou";
import CloudHosting from "@/components/WordPressHosting/CloudHosting";
import AllInOne from "@/components/WordPressHosting/All-in_one";
import FAQWP from "@/components/WordPressHosting/FAQWP";

export default function MigratePage() {
  return (
    <div className="min-h-screen">
      <MigrateHero />
      <Free />
      <EasyStep />
      <WhatYou />
      <CloudHosting 
        heading="No-fuss WordPress<br/>Hosting price plans"
        subtitle="Skip over cost barriers with the most affordable hosting for WordPress around."
      />
      <AllInOne />
      <FAQWP />

    </div>
  );
}

