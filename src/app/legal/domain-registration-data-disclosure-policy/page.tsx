"use client";

import Policy from "@/components/TermsAndConditions/Policy";
import { domainPolicyData } from "@/lib/domain-policy-data";

export default function DomainRegistrationDataDisclosurePolicyPage() {
  return (
    <div className="min-h-screen">
      <Policy policyData={domainPolicyData} />
    </div>
  );
}
