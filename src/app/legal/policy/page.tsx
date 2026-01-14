"use client";

import Policy from "@/components/TermsAndConditions/Policy";
import { privacyPolicyData } from "@/lib/privacy-policy-data";

export default function PolicyPage() {
  return (
    <div className="min-h-screen">
      <Policy policyData={privacyPolicyData} />
    </div>
  );
}

