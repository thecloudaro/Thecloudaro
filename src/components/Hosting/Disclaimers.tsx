"use client";

import ContentHeading from "@/components/ui/content-heading";
import Link from "next/link";

const disclaimers = [
  {
    text: (
      <>
        Our Supreme plan offers unmetered disk space, intended only for your
        website. This space must be used in accordance with our{" "}
        <Link
          href="#"
          className="text-[rgb(var(--hosting-disclaimers-link))] underline-offset-4 hover:underline"
        >
          Acceptable Use Policy (AUP)
        </Link>
        , and in particular the Disk Usage Provision paragraph.
      </>
    )
  },
  {
    text: (
      <>
        Our CPU and RAM resource limits are for burst allowance, which helps
        your website cope with high traffic. This allowance is only for a
        limited time, as shown in our{" "}
        <Link
          href="#"
          className="text-[rgb(var(--hosting-disclaimers-link))] underline-offset-4 hover:underline"
        >
          AUP
        </Link>
        .
      </>
    )
  },
  {
    text:
      "Spacemail is provided free with Web Hosting for one year. It can be used with domains but not with subdomains."
  },
  {
    text:
      "The Cloud Aro provides unlimited free SSL certificates for Pro and Supreme Web Hosting plans, and 5 SSL certificates for Essential Web Hosting plans. When hosting subscriptions are canceled, the free SSL certificates are automatically canceled."
  },
  {
    text:
      "The transfer of hosting accounts to The Cloud Aro must be completed by the customer. Our support team can provide additional guidance if it’s needed."
  },
  {
    text:
      "Cloud storage architecture used on our shared servers should not be confused with cloud hosting."
  },
  {
    text:
      "Our advertised discount offer only applies to purchases of annual and biennial plans. This discount offer does not apply to renewals."
  }
];

const Disclaimers = () => {
  return (
    <section
      className="relative w-full py-20"
      style={{ backgroundColor: "rgb(var(--hosting-section-bg))" }}
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <ContentHeading
          title="Disclaimers"
          className="!text-[1.75rem] font-semibold tracking-tight text-[rgb(var(--hosting-text-white))] sm:!text-[1.25rem]"
        />

        <div className="mt-6 space-y-4">
          {disclaimers.map((item, index) => (
            <p
              key={index}
              className="text-xs leading-6 text-[rgb(var(--hosting-disclaimers-text))] sm:text-sm"
            >
              {item.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Disclaimers;


