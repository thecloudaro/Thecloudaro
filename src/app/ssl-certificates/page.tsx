import type { Metadata } from "next";
import SSLHero from "@/components/SSLCertificates/SSLHero";
import SSLBenefits from "@/components/SSLCertificates/SSLBenefits";
import SSLPlansStrip from "@/components/SSLCertificates/SSLPlansStrip";
import SSLFiltersAndCards from "@/components/SSLCertificates/SSLFiltersAndCards";

export const metadata: Metadata = {
  title: "SSL Certificates | The Cloud Aro",
  description:
    "Secure your website with SSL certificates on The Cloud Aro. Encrypt traffic, build trust, and improve SEO with HTTPS on every plan.",
};

export default function SSLCertificatesPage() {
  return (
    <main>
      <SSLHero />
      <SSLBenefits />
      <SSLPlansStrip />
      <SSLFiltersAndCards />
    </main>
  );
}

