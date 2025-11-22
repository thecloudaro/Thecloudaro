"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import MigrationIcon from "../ui/migration-icon";

const steps: Array<{
  title: string;
  description: string;
  icon: "upload" | "check" | "connect";
}> = [
  {
    title: "Upload your backup",
    description:
      "Begin migration by uploading your cPanel backup file in a few simple steps.",
    icon: "upload"
  },
  {
    title: "Get your file checked",
    description:
      "Check your backup file’s data compatibility and integrity easily by simply following the Unbox™ process.",
    icon: "check"
  },
  {
    title: "Restore and connect",
    description:
      "Recover all your data then manually connect your domains in Hosting Manager, your center for hosting products.",
    icon: "connect"
  }
];

const KeepMigration = () => {
  return (
    <section className="py-24 -mt-px" style={{ backgroundColor: 'rgb(var(--migration-keep-bg))', color: 'rgb(var(--migration-keep-text))' }}>
      <div className="mx-auto max-w-8xl px-6 text-center sm:px-10">
        <ContentHeading
          title="Keep migration simple"
          className="!text-[2.5rem] sm:!text-[3.25rem] md:!text-[4rem] font-bold !text-[rgb(var(--migration-keep-heading))]"
        />

        <ContentDescription
          size="xl"
          className="mt-6 text-sm sm:text-base md:text-xl !text-[rgba(var(--migration-keep-description))]"
        >
          {"Unbox™ is our solution that helps you seamlessly get started with all your products, including migration — no special skills needed."}
        </ContentDescription>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-10 px-6 text-center sm:px-10 md:grid-cols-3 mt-30">
        {steps.map((step) => (
          <div key={step.title} className="space-y-6">
            <MigrationIcon variant={step.icon} size="lg" />

            <div className="space-y-3">
              <h3 className="text-xl font-bold !text-[rgb(var(--migration-keep-step-title))]">
                {step.title}
              </h3>
              <p className="text-base md:text-lg !text-[rgba(var(--migration-keep-step-description))]">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeepMigration;


