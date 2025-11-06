"use client";

import DomainPricingTable from "./DomainPricingTable";
import SectionHeading from "@/components/ui/section-heading";

const DomainPricingPage = () => {
  return (
    <section className="min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 bg-[#191c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="mb-28">
          <SectionHeading
            heading="Domain registration prices"
            description="Check domain name availability and begin your digital life."
            headingTag="h1"
            headingClassName="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            descriptionClassName="text-xl text-gray-300 max-w-3xl mx-auto"
          />
        </div>

        {/* Domain Pricing Table Component */}
        <DomainPricingTable />
      </div>
    </section>
  );
};

export default DomainPricingPage;
