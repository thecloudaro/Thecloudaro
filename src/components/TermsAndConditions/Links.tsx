"use client";

import Policy from "@/components/TermsAndConditions/Policy";
import { termsOfServiceData } from "@/lib/terms-of-service-data";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen">
      <Policy policyData={termsOfServiceData} />
    </div>
  );
}