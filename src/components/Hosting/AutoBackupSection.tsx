"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import { GaugeCircle, ShieldCheck, ToggleLeft } from "lucide-react";

const features = [
  {
    title: "No setup",
    description: "Just select AutoBackup when you sign up and it's ready to go.",
    Icon: ToggleLeft,
    gradient: "from-[rgb(var(--hosting-autobackup-gradient-1-from))] via-[rgb(var(--hosting-autobackup-gradient-1-via))] to-[rgb(var(--hosting-autobackup-gradient-1-to))]"
  },
  {
    title: "Always secure",
    description: "Save up to 1 monthly, 4 weekly, and 6 daily backups on a separate server.",
    Icon: ShieldCheck,
    gradient: "from-[rgb(var(--hosting-autobackup-gradient-2-from))] via-[rgb(var(--hosting-autobackup-gradient-2-via))] to-[rgb(var(--hosting-autobackup-gradient-2-to))]"
  },
  {
    title: "Quick access",
    description: "Choose and restore the backup version you want in just a few clicks.",
    Icon: GaugeCircle,
    gradient: "from-[rgb(var(--hosting-autobackup-gradient-3-from))] via-[rgb(var(--hosting-autobackup-gradient-3-via))] to-[rgb(var(--hosting-autobackup-gradient-3-to))]"
  }
];

const AutoBackupSection = () => {
  return (
    <section
      className="relative w-full py-24"
      style={{ backgroundColor: "rgb(var(--hosting-section-bg))" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <ContentHeading
            title="AutoBackup"
            className="!text-3xl sm:!text-4xl md:!text-[4.25rem]"
          />

          <ContentDescription
            text="Keep your website fully backed up and ready for anything."
            className="mx-auto max-w-4xl text-[rgb(var(--hosting-choose-text-gray-300))]"
            size="xl"
          />
        </div>

        <div className="pt-20 grid gap-12 sm:grid-cols-2 sm:gap-10 md:grid-cols-3">
          {features.map(({ title, description, Icon, gradient }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-5 text-center"
            >
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-[32px] bg-gradient-to-br ${gradient}`}
                style={{
                  boxShadow: '0 18px 45px rgba(var(--hosting-autobackup-shadow))'
                }}
              >
                <Icon className="h-12 w-12 text-[rgb(var(--hosting-text-white))]" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold text-[rgb(var(--hosting-text-white))]">{title}</h3>
              <p className="text-xl leading-relaxed text-[rgb(var(--hosting-choose-text-gray-300))] sm:text-lg">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutoBackupSection;


