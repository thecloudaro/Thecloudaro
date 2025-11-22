"use client";

import SecurityHero from "@/components/Security/SecurityHero";
import Safeguarded from "@/components/Security/Safeguarded";
import Protected from "@/components/Security/Protected";
import BuiltIn from "@/components/Security/BuiltIn";
import WebHostingSecurity from "@/components/Security/WebHostingSecurity";
import SpacemailSecurity from "@/components/Security/SpacemailSecurity";
import FAQSecurity from "@/components/Security/FAQSecurity";

export default function SecurityPage() {
  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: 'rgb(var(--security-bg))' }}
    >
      <SecurityHero />
      <Safeguarded />
      <Protected />
      <BuiltIn />
      <WebHostingSecurity />
      <SpacemailSecurity />
      <FAQSecurity />
    </div>
  );
}

