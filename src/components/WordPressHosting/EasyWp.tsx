"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

type ToolKey = "hack" | "malware" | "updates";

const tools: Record<
  ToolKey,
  {
    title: string;
    description: string;
    image: string;
  }
> = {
  hack: {
    title: "HackGuardian",
    description:
      "Shield your website from cybercriminals with a free tool built by EasyWP. Easily toggle your WordPress file system to a partial, read-only mode from the EasyWP Dashboard. Your website will be protected without impacting file permissions or ownership.",
    image: "/WordPress/HackGuardian.png"
  },
  malware: {
    title: "MalwareGuardian",
    description:
      "Protect your website 24/7 from malicious activity. Get detailed reports to clearly understand your website’s security status. Plus, EasyWP Turbo and Supersonic plans get Autoclean protection, which cleans files automatically.",
    image: "/WordPress/MalwareGuardian.png"
  },
  updates: {
    title: "Automatic WordPress Updates <span class='uppercase text-[#7affc0]'>New</span>",
    description:
      "Keep your WordPress site safe with automatic updates. If automatic updates are deactivated, they may need to be manuallyupdated.",
    image: "/WordPress/AutomaticWP.png"
  }
};

const items: ToolKey[] = ["hack", "malware", "updates"];

const EasyWp = () => {
  const [active, setActive] = useState<ToolKey>("hack");

  const current = useMemo(() => tools[active], [active]);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24" style={{ backgroundColor: 'rgb(var(--wp-easywp-bg))', color: 'rgb(var(--wp-easywp-heading))' }}>
      <div className="mx-auto max-w-[82rem] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="text-center">
          <ContentHeading
            title="EasyWP Guardian security tools"
            className="text-4xl font-bold sm:text-5xl md:text-6xl !text-[rgb(var(--wp-easywp-heading))]"
          />

          <ContentDescription
            size="lg"
            className="mt-6 text-base sm:text-lg !text-[rgba(var(--wp-easywp-description))]"
          >
            Powerful defenses that won&apos;t disrupt your day
          </ContentDescription>
        </div>

        <div className="mt-20 flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-2">
          <div className="flex w-full gap-4 lg:max-w-xl">
            <div className="hidden flex-col items-center gap-4 pt-2 lg:flex">
              {items.map((key) => {
                const isActive = key === active;
                return (
                  <span
                    key={key}
                    className="h-2 w-2 rounded-full transition"
                    style={{ 
                      backgroundColor: isActive ? 'rgb(var(--wp-easywp-dot-active))' : 'rgba(var(--wp-easywp-dot-inactive))'
                    }}
                  />
                );
              })}
            </div>

            <div className="space-y-6">
              {items.map((key) => {
                const tool = tools[key];
                const isActive = key === active;

                return (
                  <button
                    key={key}
                    onClick={() => setActive(key)}
                    className="w-full text-left transition"
                    style={{ 
                      color: isActive ? 'rgb(var(--wp-easywp-button-active))' : 'rgba(var(--wp-easywp-button-inactive))'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'rgb(var(--wp-easywp-button-active))';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'rgba(var(--wp-easywp-button-inactive))';
                      }
                    }}
                  >
                    <div
                      className={`font-semibold transition ${
                        isActive ? "text-2xl" : "text-lg"
                      }`}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: tool.title.replace("class='uppercase text-[#7affc0]'", `class='uppercase' style="color: rgb(var(--wp-easywp-badge-new))"`)
                        }}
                      />
                    </div>
                    {isActive ? (
                      <p
                        className="mt-4 text-sm"
                        style={{ color: 'rgba(var(--wp-easywp-button-text))' }}
                        dangerouslySetInnerHTML={{ __html: tool.description }}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative flex w-full items-center justify-center lg:flex-1 lg:pl-4">
            <div className="relative w-full max-w-[840px] lg:max-w-[1060px]">
              <Image
                key={current.image}
                src={current.image}
                alt={current.title.replace(/<[^>]+>/g, "")}
                width={2280}
                height={1440}
                className="h-full w-full rounded-md border object-cover transition duration-500"
                style={{
                  borderColor: 'rgba(var(--wp-easywp-image-border))',
                  backgroundColor: 'rgb(var(--wp-easywp-image-bg))',
                  boxShadow: `0 24px 80px rgba(var(--wp-easywp-image-shadow))`
                }}
                priority
              />
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default EasyWp;

