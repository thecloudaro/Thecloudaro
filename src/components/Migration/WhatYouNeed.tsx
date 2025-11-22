"use client";

import type { ReactNode } from "react";
import ContentHeading from "@/components/ui/content-heading";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArchiveRestore, FileText, Mail, Lock, Database, Wifi } from "lucide-react";

type EssentialItem = {
  title: string;
  description: ReactNode;
  icon: LucideIcon;
};

const essentials: EssentialItem[] = [
  {
    title: "Backup file",
    description:
      "Make a cPanel backup file for your website, with all your essential data, files, and databases.",
    icon: ArchiveRestore
  },
  {
    title: "File type and size limit",
    description:
      "cPanel backups support tar.gz and zip files that are less than 20 GB in size.",
    icon: FileText
  },
  {
    title: "Email accounts",
    description: (
      <>
        Email should be migrated separately after you create email accounts in
        Spacemail. Learn how to{" "}
        <Link
          href="#"
          className="hover:underline transition"
          style={{ color: 'rgb(var(--migration-whatyouneed-link))' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgb(var(--migration-whatyouneed-link-hover))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgb(var(--migration-whatyouneed-link))';
          }}
        >
          import your<br/>cPanel emails
        </Link>
        .
      </>
    ),
    icon: Mail
  },
  {
    title: "SSLs",
    description: (
      <>
        Manually install your existing SSL keys when these are migrated,
        and make use of free SSLs for the first year with<br/>Web Hosting.
      </>
    ),
    icon: Lock
  },
  {
    title: "Databases",
    description: (
      <>
        MySQL and MariaDB databases are supported for migration, but other databases will not be migrated.
      </>
    ),
    icon: Database
  },
  {
    title: "Internet connection",
    description:
      "Your connection will need to be stable to avoid any disruptions during backup file upload and migration.",
    icon: Wifi
  }
];

const WhatYouNeed = () => {
  return (
    <section className="py-24" style={{ backgroundColor: 'rgb(var(--migration-whatyouneed-bg))', color: 'rgb(var(--migration-whatyouneed-text))' }}>
      <div className="mx-auto max-w-6.5xl px-6 sm:px-10">
        <div className="space-y-6 text-center">
          <ContentHeading
            title="What you need for migration"
            className="!text-[2.5rem] sm:!text-[3.25rem] md:!text-[4rem] font-bold pb-16 !text-[rgb(var(--migration-whatyouneed-heading))]"
          />

        </div>

        <ul className="mt-16 space-y-10">
          {essentials.map(({ title, description, icon: Icon }, index) => (
            <li key={title} className="flex flex-col items-center">
              <div className="flex w-full max-w-4xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:items-start sm:gap-8 sm:text-left">
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: 'rgb(var(--migration-whatyouneed-icon))' }} strokeWidth={1.5} />

                <div className="space-y-1 sm:max-w-4xl sm:text-left">
                  <h3 className="text-sm font-semibold sm:text-base !text-[rgb(var(--migration-whatyouneed-title))]">
                  {title}
                </h3>
                  <p className="text-xs leading-relaxed sm:text-sm !text-[rgba(var(--migration-whatyouneed-description))]">
                  {description}
                </p>
              </div>
              </div>

              {index !== essentials.length - 1 && (
                <div className="mt-10 h-px w-full max-w-4xl border-t" style={{ borderColor: 'rgba(var(--migration-whatyouneed-border))' }} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhatYouNeed;


